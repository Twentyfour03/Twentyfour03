// Server-side only. Shared by the checkout actions and the Paystack webhook,
// so an order is priced and emailed by exactly the same code either way.
import { getShopItems, getSiteSettings } from "@/lib/data";
import { escapeHtml, rowsToHtml, sendMail } from "@/lib/mail";

export type OrderLine = { id: string; qty: number; colour?: string };
export type Customer = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
};

export type Priced = { name: string; qty: number; unit: number; subtotal: number };
export type PricedOrder = { ok: true; items: Priced[]; goods: number; delivery: number; total: number };

export const REFERENCE = /^T403-\d+-[0-9a-f]{8}$/;

/**
 * Who sends the order emails. Off (the default): the browser's confirm step
 * does, straight after payment. On: only the Paystack webhook does, which
 * also covers a customer who closes the tab before the confirm step runs.
 * Switch it on only once the webhook URL is registered in Paystack, or no
 * order emails are sent at all.
 */
export function webhookSendsEmails(): boolean {
  return process.env.PAYSTACK_WEBHOOK_ACTIVE === "1";
}

/**
 * Prices a basket from the server's own price list. The browser's idea of
 * the price is never trusted: this is what Paystack is asked to charge and
 * what the paid amount is checked against.
 */
export async function priceOrder(lines: unknown): Promise<PricedOrder | { ok: false }> {
  if (!Array.isArray(lines) || lines.length === 0 || lines.length > 50) return { ok: false };
  const [shopItems, settings] = await Promise.all([getShopItems(), getSiteSettings()]);
  const items: Priced[] = [];
  for (const line of lines as OrderLine[]) {
    const item = shopItems.find((i) => i.id === line?.id);
    const qty = Math.trunc(Number(line?.qty));
    if (!item || item.price === null || !Number.isFinite(qty) || qty < 1 || qty > 50) return { ok: false };
    // A piece made in colours must be ordered in one of them, and only those.
    const colour = item.colours ? item.colours.find((c) => c === line.colour) : undefined;
    if (item.colours && !colour) return { ok: false };
    const name = colour ? `${item.name} (${colour})` : item.name;
    items.push({ name, qty, unit: item.price, subtotal: item.price * qty });
  }
  const goods = items.reduce((n, i) => n + i.subtotal, 0);
  const delivery = settings.deliveryFee ?? 0;
  return { ok: true, items, goods, delivery, total: goods + delivery };
}

export function cleanCustomer(c: Partial<Customer> | null | undefined): Customer {
  const s = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, 500) : "");
  return {
    name: s(c?.name),
    email: s(c?.email),
    phone: s(c?.phone),
    address: s(c?.address),
    city: s(c?.city),
    notes: s(c?.notes),
  };
}

/** What is attached to the Paystack transaction: readable rows for her dashboard, plus the raw order for the webhook. */
export function orderMetadata(lines: OrderLine[], order: PricedOrder, c: Customer) {
  return {
    order_lines: lines.map((l) => ({ id: l.id, qty: l.qty, ...(l.colour ? { colour: l.colour } : {}) })),
    customer: c,
    custom_fields: [
      { display_name: "Order", variable_name: "order", value: order.items.map((i) => `${i.qty} × ${i.name}`).join("; ").slice(0, 900) },
      { display_name: "Customer", variable_name: "customer", value: c.name },
      { display_name: "Phone", variable_name: "phone", value: c.phone },
      { display_name: "Deliver to", variable_name: "address", value: `${c.address}, ${c.city}`.slice(0, 300) },
      { display_name: "Notes", variable_name: "notes", value: c.notes.slice(0, 300) || "None" },
    ],
  };
}

/**
 * The two order emails: the full order to the client, a confirmation to the
 * customer. `paid` is what Paystack says arrived, in GHS; when it differs
 * from the priced total the client's copy says so at the top.
 */
export async function sendOrderEmails(reference: string, order: PricedOrder, c: Customer, paid: number): Promise<boolean> {
  const lineRows: [string, string][] = order.items.map((i, n) => [
    `Item ${n + 1}`,
    `${i.name} × ${i.qty} @ GHS ${i.unit.toFixed(2)} = GHS ${i.subtotal.toFixed(2)}`,
  ]);
  const mismatch = Math.round(paid * 100) !== Math.round(order.total * 100);
  const rows: [string, string][] = [
    ...(mismatch
      ? ([["Check this order", `Paystack received GHS ${paid.toFixed(2)} but today's prices total GHS ${order.total.toFixed(2)}. A price may have changed during checkout.`]] as [string, string][])
      : []),
    ["Reference", reference],
    ["Goods", `GHS ${order.goods.toFixed(2)}`],
    ["Delivery", order.delivery > 0 ? `GHS ${order.delivery.toFixed(2)}` : "Included in the price unless the item says otherwise"],
    ["Paid", `GHS ${paid.toFixed(2)}`],
    ...lineRows,
    ["Name", c.name],
    ["Email", c.email],
    ["Phone", c.phone],
    ["Address", c.address],
    ["City", c.city],
    ["Notes", c.notes],
  ];

  const toClient = await sendMail({ subject: `Shop order ${reference} (paid)`, replyTo: c.email || undefined, html: rowsToHtml(rows) });
  if (c.email) {
    await sendMail({
      to: c.email,
      subject: "We have your order, TwentyFour03 Vintage",
      html:
        `<p style="font:15px system-ui;color:#1a1a1a">Thank you, ${escapeHtml(c.name)}. Your payment went through and your order is with us. We will contact you on ${escapeHtml(c.phone)} to arrange delivery.</p>` +
        rowsToHtml([["Reference", reference], ["Paid", `GHS ${paid.toFixed(2)}`], ...lineRows]),
    });
  }
  return toClient.ok;
}
