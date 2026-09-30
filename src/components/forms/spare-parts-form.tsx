"use client";

import { useActionState } from "react";

import { submitSparePartsRequest, type RequestState } from "@/app/actions/requests";
import {
  Field,
  FileField,
  SubmitButton,
  TextareaField,
} from "@/components/forms/fields";
import { site, waLink } from "@/lib/content";

const initial: RequestState = { status: "idle" };
const wa = waLink(site.contact.whatsapp);

export function SparePartsForm() {
  const [state, action] = useActionState(submitSparePartsRequest, initial);
  const errors = state.fieldErrors ?? {};

  if (state.status === "success") {
    return (
      <div className="mt-9 rule-hair pt-10">
        <h3 className="display display-lg">Part request received.</h3>
        <p className="prose-measure mt-5 text-[1.0625rem] text-ink">
          {state.message}
        </p>
        <p className="prose-measure mt-5 text-[1.0625rem] text-ink">
          We will match the part against your chassis number before quoting, so
          you do not end up with a part that nearly fits.
        </p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="mt-9 rule-hair pt-10">
      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="mb-8 rounded-[1rem] bg-cream-sheet px-5 py-4 text-[1.0625rem] text-[var(--color-error)]"
        >
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-8 sm:grid-cols-2">
        <Field
          name="name"
          label="Full name"
          required
          autoComplete="name"
          error={errors.name}
        />
        <Field
          name="phone"
          label="WhatsApp / phone"
          type="tel"
          required
          autoComplete="tel"
          error={errors.phone}
        />
        <Field
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          className="sm:col-span-2"
        />

        <Field name="make" label="Vehicle make" required error={errors.make} />
        <Field name="model" label="Vehicle model" required error={errors.model} />
        <Field
          name="year"
          label="Year of manufacture"
          required
          error={errors.year}
        />
        <Field
          name="chassis"
          label="Chassis / VIN"
          required
          error={errors.chassis}
          hint="On your insurance papers, or the driver-side door frame."
        />
        <Field
          name="partName"
          label="Part name"
          required
          error={errors.partName}
        />
        <Field
          name="partNumber"
          label="Part number"
          hint="Optional, but it removes all guesswork."
        />
        <Field name="quantity" label="Quantity" />
        <FileField
          name="photo"
          label="Photo of the part"
          required
          error={errors.photo}
          hint="Up to 4MB."
        />
        <TextareaField
          name="notes"
          label="Additional notes"
          rows={3}
          className="sm:col-span-2"
        />
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-6">
        <SubmitButton>Submit parts request</SubmitButton>
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
