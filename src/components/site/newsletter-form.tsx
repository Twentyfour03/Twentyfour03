"use client";

import { useActionState } from "react";

import { subscribeToNewsletter, type NewsletterState } from "@/app/actions/newsletter";
import { cn } from "@/lib/utils";

const initial: NewsletterState = { status: "idle" };

/** The footer's newsletter sign-up. `dark` is the burgundy footer on the Portfolio. */
export function NewsletterForm({ dark }: { dark: boolean }) {
  const [state, action, pending] = useActionState(subscribeToNewsletter, initial);

  if (state.status === "success") {
    return (
      <p role="status" className="text-[1rem]">
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} noValidate className="max-w-md">
      <label htmlFor="newsletter-email" className="micro block text-dim">
        Newsletter
      </label>
      <p className="mt-2 text-[1rem]">New arrivals and sourcing news, now and then. No spam.</p>
      {/* Honeypot: hidden from people, irresistible to bots. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={state.status === "error"}
          aria-describedby={state.status === "error" ? "newsletter-error" : undefined}
          className={cn(
            "min-w-0 flex-1 rounded-full border px-5 py-2.5 text-[1rem]",
            dark
              ? "border-cream/40 bg-transparent text-cream placeholder:text-cream/50"
              : "border-ink/25 bg-cream text-ink placeholder:text-ink-dim",
          )}
        />
        <button
          type="submit"
          disabled={pending}
          className={cn(
            "pill shrink-0 disabled:opacity-60",
            dark ? "bg-cream text-burgundy hover:bg-cream-sheet" : "bg-olive text-cream hover:bg-olive-deep",
          )}
        >
          {pending ? "Signing up…" : "Sign up"}
        </button>
      </div>
      {state.status === "error" ? (
        <p id="newsletter-error" role="alert" className={cn("mt-2 text-[0.9375rem]", dark ? "text-cream" : "text-[var(--color-error)]")}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
