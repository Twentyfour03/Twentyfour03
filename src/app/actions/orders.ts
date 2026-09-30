"use server";

import { randomBytes } from "node:crypto";

import { getShopItems, getSiteSettings } from "@/lib/data";
import { escapeHtml, rowsToHtml, sendMail } from "@/lib/mail";

export type OrderLine = { id: string; qty: number };
export type Customer = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
};

type Priced = { name: string; qty: number; unit: number; subtotal: number };
type PricedOrder = { ok: true; items: Priced[]; goods: number; delivery: number; total: number };

/**
 * Prices a basket from the server's own price list. The browser's idea of
 * the price is never trusted: this is what Paystack is asked to charge and
 * what the paid amount is checked against.
 */
async function priceOrder(lines: OrderLine[]): Promise<PricedOrder | { ok: false }> {
  if (!Array.isArray(lines) || lines.length === 0 || lines.length > 50) return { ok: false };
  const [shopItems, settings] = await Promise.all([getShopItems(), getSiteSettings()]);
  const items: Priced[] = [];
  for (const line of lines) {
    const item = shopItems.find((i) => i.id === line.id);
    const qty = Math.trunc(Number(line.qty));
    if (!item || item.price === null || !Number.isFinite(qty) || qty < 1 || qty > 50) return { ok: false };
    items.push({ name: item.name, qty, unit: item.price, subtotal: item.price * qty });
  }
  const goods = items.reduce((n, i) => n + i.subtotal, 0);
  const delivery = settings.deliveryFee ?? 0;
  return { ok: true, items, goods, delivery, total: goods + delivery };
}

function cleanCustomer(c: Customer): Customer {
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
  | { ok: true; reference: string; amount: number; delivery: number; email: string; publicKey: string }
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
  };
}

/**
 * Step 2: after the popup reports success, ask Paystack directly whether
 * the money arrived, in full, in GHS. Only then is the order emailed.
 */
export async function confirmOrder(
  reference: string,
  lines: OrderLine[],
  customer: Customer,
): Promise<{ ok: boolean; message: string }> {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret || typeof reference !== "string" || !/^T403-\d+-[0-9a-f]{8}$/.test(reference)) {
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

  const lineRows: [string, string][] = order.items.map((i, n) => [
    `Item ${n + 1}`,
    `${i.name} × ${i.qty} @ GHS ${i.unit.toFixed(2)} = GHS ${i.subtotal.toFixed(2)}`,
  ]);
  const rows: [string, string][] = [
    ["Reference", reference],
    ["Goods", `GHS ${order.goods.toFixed(2)}`],
    ["Delivery", order.delivery > 0 ? `GHS ${order.delivery.toFixed(2)}` : "Arranged separately"],
    ["Paid", `GHS ${order.total.toFixed(2)}`],
    ...lineRows,
    ["Name", c.name],
    ["Email", c.email],
    ["Phone", c.phone],
    ["Address", c.address],
    ["City", c.city],
    ["Notes", c.notes],
  ];

  await sendMail({ subject: `Shop order ${reference} (paid)`, replyTo: c.email, html: rowsToHtml(rows) });
  await sendMail({
    to: c.email,
    subject: "We have your order, TwentyFour03 Vintage",
    html:
      `<p style="font:15px system-ui;color:#1a1a1a">Thank you, ${escapeHtml(c.name)}. Your payment went through and your order is with us. We will contact you on ${escapeHtml(c.phone)} to arrange delivery.</p>` +
      rowsToHtml([["Reference", reference], ["Paid", `GHS ${order.total.toFixed(2)}`], ...lineRows]),
  });

  return { ok: true, message: `Payment received. Your reference is ${reference}. We will contact you to arrange delivery.` };
}
