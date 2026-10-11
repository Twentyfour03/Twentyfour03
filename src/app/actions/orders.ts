"use server";

import { randomBytes } from "node:crypto";

import {
  cleanCustomer,
  orderMetadata,
  priceOrder,
  REFERENCE,
  sendOrderEmails,
  webhookSendsEmails,
  type Customer,
  type OrderLine,
} from "@/lib/orders";

export type { Customer, OrderLine };

function customerErrors(c: Customer): Record<string, string> {
  const e: Record<string, string> = {};
  if (!c.name) e.name = "Please tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) e.email = "Paystack sends your receipt here, so we need a valid email.";
  if (!c.phone) e.phone = "We call or WhatsApp to arrange delivery.";
  if (!c.address) e.address = "Where should we deliver?";
  if (!c.city) e.city = "Which town or city?";
  return e;
}

export type StartResult =
  | {
      ok: true;
      reference: string;
      amount: number;
      delivery: number;
      email: string;
      publicKey: string;
      /** The order itself, attached to the payment so it shows in the Paystack dashboard. */
      metadata: ReturnType<typeof orderMetadata>;
    }
  | { ok: false; message: string; fieldErrors?: Record<string, string> };

/** Step 1: price the basket and hand the browser what the popup needs. */
export async function startCheckout(lines: OrderLine[], customer: Customer): Promise<StartResult> {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
  if (!publicKey || !process.env.PAYSTACK_SECRET_KEY) {
    return {
      ok: false,
      message: "Online payment is not switched on yet. Please message us to place this order.",
    };
  }

  const c = cleanCustomer(customer);
  const fieldErrors = customerErrors(c);
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, message: "A few details are missing.", fieldErrors };
  }

  const order = await priceOrder(lines);
  if (!order.ok) return { ok: false, message: "Something in your basket has changed. Please refresh the shop." };

  return {
    ok: true,
    reference: `T403-${Date.now()}-${randomBytes(4).toString("hex")}`,
    amount: Math.round(order.total * 100), // pesewas
    delivery: order.delivery,
    email: c.email,
    publicKey,
    metadata: orderMetadata(lines, order, c),
  };
}

/**
 * Step 2: after the popup reports success, ask Paystack directly whether
 * the money arrived, in full, in GHS. Only then is the customer told the
 * order is in. The order emails are sent here unless the Paystack webhook
 * has been switched on to send them (see webhookSendsEmails).
 */
export async function confirmOrder(
  reference: string,
  lines: OrderLine[],
  customer: Customer,
): Promise<{ ok: boolean; message: string }> {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret || typeof reference !== "string" || !REFERENCE.test(reference)) {
    return { ok: false, message: "We could not confirm that payment. Please contact us with your Paystack receipt." };
  }

  const order = await priceOrder(lines);
  const c = cleanCustomer(customer);
  if (!order.ok) {
    return { ok: false, message: "We could not match that payment to your basket. Please contact us with your Paystack receipt." };
  }

  let data: { status?: string; amount?: number; currency?: string } | undefined;
  try {
    const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${secret}` },
      cache: "no-store",
    });
    const body = (await res.json()) as { status?: boolean; data?: typeof data };
    data = body.status ? body.data : undefined;
  } catch (error) {
    console.error("[orders] Paystack verify failed:", error);
  }

  const expected = Math.round(order.total * 100);
  if (!data || data.status !== "success" || data.currency !== "GHS" || data.amount !== expected) {
    console.error("[orders] Payment did not verify:", reference, data);
    return {
      ok: false,
      message: "Your payment could not be verified yet. If you were charged, please contact us with your Paystack receipt and we will sort it out.",
    };
  }

  if (!webhookSendsEmails()) await sendOrderEmails(reference, order, c, order.total);

  return { ok: true, message: `Payment received. Your reference is ${reference}. We will contact you to arrange delivery.` };
}
