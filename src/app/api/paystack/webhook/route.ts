import { createHmac, timingSafeEqual } from "node:crypto";

import { type NextRequest, NextResponse } from "next/server";

import { rowsToHtml, sendMail } from "@/lib/mail";
import { cleanCustomer, priceOrder, REFERENCE, sendOrderEmails, webhookSendsEmails } from "@/lib/orders";

/**
 * Paystack calls this after a payment, whether or not the customer's
 * browser is still open. Register the URL in the Paystack dashboard under
 * Settings > API Keys & Webhooks, then set PAYSTACK_WEBHOOK_ACTIVE=1 so the
 * order emails are sent from here and not from the browser's confirm step.
 *
 * Only a request signed with the secret key is trusted. The order is
 * rebuilt from the lines saved on the transaction and priced again from
 * the server's own price list.
 */

type ChargeEvent = {
  event?: string;
  data?: {
    reference?: string;
    status?: string;
    amount?: number;
    currency?: string;
    customer?: { email?: string };
    metadata?: { order_lines?: unknown; customer?: Record<string, string> } | string | null;
  };
};

function signed(body: string, signature: string | null, secret: string): boolean {
  if (!signature) return false;
  const expected = Buffer.from(createHmac("sha512", secret).update(body).digest("hex"));
  const given = Buffer.from(signature);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

export async function POST(req: NextRequest) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) return NextResponse.json({ ok: false }, { status: 503 });

  const body = await req.text();
  if (!signed(body, req.headers.get("x-paystack-signature"), secret)) {
    return NextResponse.json({ ok: false, message: "Invalid signature" }, { status: 401 });
  }

  let event: ChargeEvent;
  try {
    event = JSON.parse(body) as ChargeEvent;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Everything below answers 200: the event was received, and Paystack
  // should not keep retrying it.
  const data = event.data;
  if (event.event !== "charge.success" || !data || data.status !== "success") {
    return NextResponse.json({ ok: true, handled: false });
  }
  const reference = data.reference ?? "";
  // Payments that did not come from the shop (her own Paystack invoices, for example) are not ours to email.
  if (!REFERENCE.test(reference)) return NextResponse.json({ ok: true, handled: false });

  if (!webhookSendsEmails()) return NextResponse.json({ ok: true, handled: false, reason: "emails sent by checkout" });

  const metadata = typeof data.metadata === "object" && data.metadata !== null ? data.metadata : {};
  const order = await priceOrder(metadata.order_lines);
  const customer = cleanCustomer({ ...metadata.customer, email: metadata.customer?.email || data.customer?.email || "" });
  const paid = (data.amount ?? 0) / 100;

  if (!order.ok || data.currency !== "GHS") {
    // Money arrived but the order cannot be rebuilt. Say so loudly; the
    // payment and its details are still in the Paystack dashboard.
    console.error("[paystack webhook] Paid but could not rebuild the order:", reference, data.currency, metadata.order_lines);
    await sendMail({
      subject: `Paid shop order needs attention: ${reference}`,
      replyTo: customer.email || undefined,
      html: rowsToHtml([
        ["What happened", "A payment arrived but the site could not match it to the items now in the shop. Open this payment in Paystack to see what was ordered."],
        ["Reference", reference],
        ["Paid", `${data.currency ?? ""} ${paid.toFixed(2)}`],
        ["Name", customer.name],
        ["Email", customer.email],
        ["Phone", customer.phone],
      ]),
    });
    return NextResponse.json({ ok: true, handled: false, reason: "order not rebuilt" });
  }

  const sent = await sendOrderEmails(reference, order, customer, paid);
  if (!sent) console.error("[paystack webhook] Order email was not delivered:", reference);
  return NextResponse.json({ ok: true, handled: true, emailed: sent });
}
