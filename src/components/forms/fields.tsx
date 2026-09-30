"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";

const controlBase =
  "w-full border-0 border-b border-ink/25 bg-transparent px-0 py-2.5 text-[1.0625rem] text-ink transition-colors placeholder:text-ink hover:border-ink/45 focus:border-olive focus:outline-none focus-visible:outline-none disabled:opacity-50";

function Shell({
  name,
  label,
  required,
  error,
  hint,
  children,
  className,
}: {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={name} className="micro text-ink">
        {label}
        {required ? <span className="text-[var(--color-error)]"> *</span> : null}
      </label>
      <div className="field-rule mt-2">{children}</div>
      {error ? (
        <p id={`${name}-error`} className="mt-2 text-[0.9375rem] text-[var(--color-error)]">
          {error}
        </p>
      ) : hint ? (
        <p id={`${name}-hint`} className="mt-2 text-[0.9375rem] text-ink">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type FieldProps = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
  hint?: string;
  className?: string;
  autoComplete?: string;
};

export function Field({
  name,
  label,
  type = "text",
  required,
  placeholder,
  error,
  hint,
  className,
  autoComplete,
}: FieldProps) {
  return (
    <Shell
      name={name}
      label={label}
      required={required}
      error={error}
      hint={hint}
      className={className}
    >
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined}
        className={cn(controlBase, error && "border-[var(--color-error)]")}
      />
    </Shell>
  );
}

export function TextareaField({
  name,
  label,
  required,
  placeholder,
  error,
  hint,
  rows = 4,
  className,
}: FieldProps & { rows?: number }) {
  return (
    <Shell
      name={name}
      label={label}
      required={required}
      error={error}
      hint={hint}
      className={className}
    >
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined}
        className={cn(controlBase, "resize-y leading-relaxed", error && "border-[var(--color-error)]")}
      />
    </Shell>
  );
}

export function SelectField({
  name,
  label,
  options,
  required,
  error,
  hint,
  className,
  placeholder = "Select one",
}: FieldProps & { options: readonly string[] }) {
  return (
    <Shell
      name={name}
      label={label}
      required={required}
      error={error}
      hint={hint}
      className={className}
    >
      <div className="relative">
        <select
          id={name}
          name={name}
          required={required}
          defaultValue=""
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined}
          className={cn(
            controlBase,
            "appearance-none pr-8",
            error && "border-[var(--color-error)]",
          )}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {/* The affordance the native control stopped drawing, redrawn in the
            world's own stroke weight. */}
        <svg
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-0 h-4 w-4 -translate-y-1/2 text-ink"
        >
          <path
            d="M3.5 6.25 8 10.5l4.5-4.25"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Shell>
  );
}

export function FileField({
  name,
  label,
  error,
  hint,
  required,
  accept = "image/*",
  className,
}: Omit<FieldProps, "type"> & { accept?: string }) {
  return (
    <Shell name={name} label={label} required={required} error={error} hint={hint} className={className}>
      <input
        id={name}
        name={name}
        type="file"
        required={required}
        accept={accept}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined}
        className={cn(
          "w-full text-[0.9375rem] text-ink",
          "file:mr-4 file:cursor-pointer file:border file:border-ink/25 file:bg-transparent file:px-4 file:py-2 file:text-[0.75rem] file:tracking-[0.18em] file:text-ink file:uppercase file:transition-colors hover:file:bg-olive hover:file:text-cream",
        )}
      />
    </Shell>
  );
}

export function SubmitButton({ children, pending: pendingProp }: { children: ReactNode; pending?: boolean }) {
  const status = useFormStatus();
  const pending = pendingProp ?? status.pending;
  return (
    <button
      type="submit"
      disabled={pending}
      className="micro bg-olive px-10 py-4 text-cream transition-colors hover:bg-olive-deep disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Sending…" : children}
    </button>
  );
}
