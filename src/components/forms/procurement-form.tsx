"use client";

import { startTransition, useActionState, useRef, useState, type FormEvent } from "react";

import { submitProcurementRequest, type RequestState } from "@/app/actions/requests";
import {
  Field,
  FileField,
  SelectField,
  SubmitButton,
  TextareaField,
} from "@/components/forms/fields";
import {
  productCategoryNames,
  site,
  sourcingMarkets,
  waLink,
} from "@/lib/content";

const initial: RequestState = { status: "idle" };
const wa = waLink(site.contact.whatsapp);
const MAX_ITEMS = 10;
const MAX_TOTAL_BYTES = 9 * 1024 * 1024;

export function ProcurementForm() {
  const [state, action, pending] = useActionState(submitProcurementRequest, initial);
  const [localError, setLocalError] = useState<string | null>(null);
  // Stable ids so removing a row never shifts another row's inputs.
  const nextId = useRef(1);
  const [rows, setRows] = useState<number[]>([0]);
  const errors = state.fieldErrors ?? {};

  function addRow() {
    if (rows.length >= MAX_ITEMS) return;
    setRows((r) => [...r, nextId.current++]);
  }

  function removeRow(id: number) {
    setRows((r) => (r.length > 1 ? r.filter((x) => x !== id) : r));
  }

  // Submitted by hand rather than through `action`, so React does not reset
  // the form (and every chosen file) when the server sends back an error.
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let total = 0;
    for (const value of data.values()) if (value instanceof File) total += value.size;
    if (total > MAX_TOTAL_BYTES) {
      setLocalError("The images together are over 9MB. Please attach smaller images.");
      return;
    }
    setLocalError(null);
    startTransition(() => action(data));
  }

  if (state.status === "success") {
    return (
      <div className="mt-9 rule-hair pt-10">
        <h3 className="display display-lg">Request received.</h3>
        <p className="prose-measure mt-5 text-[1.0625rem] text-ink">{state.message}</p>
        <ol className="mt-8 space-y-3 text-[1.0625rem] text-ink">
          <li>We research the markets that fit your brief.</li>
          <li>We compare options on price, quality and availability.</li>
          <li>You receive the options and costs before anything is bought.</li>
        </ol>
      </div>
    );
  }

  const banner = localError ?? (state.status === "error" ? (errors.items ?? state.message) : null);

  return (
    <form onSubmit={onSubmit} noValidate className="mt-9 rule-hair pt-10">
      {banner ? (
        <p
          role="alert"
          className="mb-8 rounded-[1rem] bg-cream-sheet px-5 py-4 text-[1.0625rem] text-[var(--color-error)]"
        >
          {banner}
        </p>
      ) : null}

      <p className="micro text-ink">Your details</p>
      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        <Field name="name" label="Full name" required autoComplete="name" error={errors.name} />
        <Field
          name="company"
          label="Company"
          autoComplete="organization"
          hint="Leave blank if this is personal."
        />
        <Field name="email" label="Email" type="email" required autoComplete="email" error={errors.email} />
        <Field
          name="phone"
          label="WhatsApp / phone"
          type="tel"
          required
          autoComplete="tel"
          error={errors.phone}
        />
        <Field name="country" label="Country" autoComplete="country-name" />
      </div>

      <div className="mt-14 flex items-end justify-between gap-4">
        <div>
          <p className="micro text-ink">What you need</p>
          <p className="mt-2 text-[0.9375rem] text-ink">
            List every item, even across different categories. Attach a photo
            or screenshot of each one.
          </p>
        </div>
      </div>

      <ol className="mt-6 space-y-5">
        {rows.map((id, n) => (
          <li key={id} className="rounded-[1.25rem] bg-cream-sheet p-5 ring-1 ring-olive/15 sm:p-7">
            <div className="flex items-center justify-between">
              <span className="micro text-olive" data-numeral>
                Item {n + 1}
              </span>
              {rows.length > 1 ? (
                <button
                  type="button"
                  onClick={() => removeRow(id)}
                  className="micro text-ink underline decoration-ink/30 hover:text-[var(--color-error)]"
                >
                  Remove
                </button>
              ) : null}
            </div>
            <div className="mt-5 grid gap-7 sm:grid-cols-2">
              <Field
                name={`item-${id}-name`}
                label="Item"
                required
                error={errors[`item-${id}-name`]}
                placeholder="e.g. Brake pads, Toyota Corolla 2016"
              />
              <SelectField
                name={`item-${id}-category`}
                label="Category"
                options={productCategoryNames}
              />
              <Field
                name={`item-${id}-quantity`}
                label="Quantity"
                required
                error={errors[`item-${id}-quantity`]}
              />
              <FileField
                name={`item-${id}-file`}
                label="Photo or screenshot"
                required
                error={errors[`item-${id}-file`]}
                hint="Up to 4MB."
              />
              <TextareaField
                name={`item-${id}-details`}
                label="Details"
                rows={2}
                className="sm:col-span-2"
                placeholder="Size, colour, material, model number, anything that matters."
              />
            </div>
          </li>
        ))}
      </ol>

      {rows.length < MAX_ITEMS ? (
        <button
          type="button"
          onClick={addRow}
          className="pill mt-5 border border-olive/40 text-olive hover:bg-olive hover:text-cream"
        >
          + Add another item
        </button>
      ) : null}

      <p className="micro mt-14 text-ink">Order details</p>
      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        <Field name="budget" label="Target budget" hint="A range is fine. It narrows the search." />
        <SelectField name="market" label="Preferred sourcing market" options={sourcingMarkets} />
        <Field name="deliveryLocation" label="Delivery location" />
        <Field name="deliveryDate" label="Needed by" type="date" />
        <Field
          name="referenceLink"
          label="Reference link"
          type="url"
          placeholder="https://"
          hint="A product page or listing, if you have one."
        />
        <TextareaField name="notes" label="Additional information" rows={3} />
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-6">
        <SubmitButton pending={pending}>Submit procurement request</SubmitButton>
        {wa ? (
          <p className="text-[0.9375rem] text-ink">
            Or message us on{" "}
            <a
              href={wa}
              className="underline decoration-ink/30 transition-colors hover:text-[var(--color-error)]"
            >
              WhatsApp
            </a>
            .
          </p>
        ) : null}
      </div>
    </form>
  );
}
