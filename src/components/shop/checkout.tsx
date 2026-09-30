"use client";

import { useState, type FormEvent } from "react";

import { confirmOrder, startCheckout, type Customer } from "@/app/actions/orders";
import { Field, TextareaField } from "@/components/forms/fields";
import { ghs, useBasket } from "@/components/shop/basket";

type PaystackPopup = {
  newTransaction: (opts: {
    key: string;
    email: string;
    amount: number;
    currency: string;
    reference: string;
    onSuccess: (tx: { reference: string }) => void;
    onCancel: () => void;
  }) => void;
};

declare global {
  interface Window {
    PaystackPop?: new () => PaystackPopup;
  }
}

/** Loads Paystack's inline script once, on demand. */
function loadPaystack(): Promise<void> {
  if (window.PaystackPop) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v2/inline.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Paystack did not load"));
    document.head.appendChild(script);
  });
}

export function Checkout() {
  const { lines, total, clear } = useBasket();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (done) {
    return (
      <div className="rounded-[1.25rem] bg-cream-sheet p-6">
        <p className="display display-sm">Thank you.</p>
        <p className="mt-3 text-[1rem] text-ink">{done}</p>
      </div>
    );
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const f = new FormData(event.currentTarget);
    const customer: Customer = {
      name: String(f.get("name") ?? ""),
      email: String(f.get("email") ?? ""),
      phone: String(f.get("phone") ?? ""),
      address: String(f.get("address") ?? ""),
      city: String(f.get("city") ?? ""),
      notes: String(f.get("notes") ?? ""),
    };
    const order = lines.map((l) => ({ id: l.id, qty: l.qty }));

    setBusy(true);
    setMessage(null);
    const start = await startCheckout(order, customer);
    if (!start.ok) {
      setErrors(start.fieldErrors ?? {});
      setMessage(start.message);
      setBusy(false);
      return;
    }
    setErrors({});

    try {
      await loadPaystack();
    } catch {
      setMessage("The payment window could not open. Check your connection and try again.");
      setBusy(false);
      return;
    }

    const popup = new window.PaystackPop!();
    popup.newTransaction({
      key: start.publicKey,
      email: start.email,
      amount: start.amount,
      currency: "GHS",
      reference: start.reference,
      onSuccess: async (tx) => {
        const result = await confirmOrder(tx.reference, order, customer);
        setBusy(false);
        if (result.ok) {
          clear();
          setDone(result.message);
        } else {
          setMessage(result.message);
        }
      },
      onCancel: () => {
        setBusy(false);
        setMessage("Payment was cancelled. Your basket is still here.");
      },
    });
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {message ? (
        <p role="alert" className="rounded-[1rem] bg-cream-sheet px-4 py-3 text-[0.9375rem] text-[var(--color-error)]">
          {message}
        </p>
      ) : null}
      <Field name="name" label="Full name" required autoComplete="name" error={errors.name} />
      <Field name="email" label="Email" type="email" required autoComplete="email" error={errors.email} />
      <Field name="phone" label="WhatsApp / phone" type="tel" required autoComplete="tel" error={errors.phone} />
      <Field name="address" label="Delivery address" required autoComplete="street-address" error={errors.address} />
      <Field name="city" label="Town / city" required autoComplete="address-level2" error={errors.city} />
      <TextareaField name="notes" label="Delivery notes" rows={2} />
      <button
        type="submit"
        disabled={busy || lines.length === 0}
        className="pill w-full bg-olive text-cream hover:bg-olive-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy ? "Opening payment…" : `Pay ${ghs(total)}`}
      </button>
      <p className="text-[0.875rem] text-ink">
        Payment is handled securely by Paystack. Card and mobile money accepted.
        Any delivery fee is shown in the payment window before you pay.
      </p>
    </form>
  );
}
