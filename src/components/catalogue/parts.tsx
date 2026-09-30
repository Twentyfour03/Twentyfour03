import type { ReactNode } from "react";

import { Press } from "@/components/motion/press";

import { cn } from "@/lib/utils";

/**
 * A catalogue section opening: hairline rule, then the heading set large and
 * lowercase, with any reference sitting in the left ledger column beside it.
 */
export function SectionHead({
  heading,
  lede,
  className,
  tone = "ink",
}: {
  heading: ReactNode;
  lede?: ReactNode;
  className?: string;
  tone?: "ink" | "cream";
}) {
  return (
    <div className={cn("rule-hair pt-8 sm:pt-10", className)}>
      <Press as="h2" className="display display-lg max-w-[16ch]">
        {heading}
      </Press>
      {lede ? (
        <p
          className={cn(
            "prose-measure mt-6 text-[1.0625rem]",
            tone === "cream" ? "text-dim" : "text-ink",
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

/**
 * A cream sheet lifted off the binding. The catalogue's plate.
 */
export function Plate({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "aside";
}) {
  return (
    <Tag
      className={cn(
        // A plate carries its own rule colour, whatever ground it sits on.
        "bg-cream-sheet text-ink shadow-[0_18px_40px_-24px_rgba(26,26,26,0.55)] [--rule-ink:var(--color-rule)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * One ruled entry in a ledger: reference in the gutter, title and body beside
 * it. This is the catalogue's answer to a grid of identical cards.
 */
export function LedgerRow({
  reference,
  title,
  body,
  aside,
  href,
  tone = "ink",
  index = 0,
}: {
  reference: string;
  title: string;
  body?: ReactNode;
  aside?: ReactNode;
  href?: string;
  tone?: "ink" | "cream";
  index?: number;
}) {
  const inner = (
    <Press
      index={index}
      className="grid gap-x-8 gap-y-3 py-7 sm:grid-cols-[6rem_1fr] sm:py-8 lg:grid-cols-[8rem_1fr_auto]"
    >
      <span
        data-numeral
        className={cn(
          // On cream the reference is the burgundy thread running through
          // every surface, so the second cloth is present on light pages too.
          "micro pt-1.5",
          tone === "cream" ? "text-dim" : "text-ink",
        )}
      >
        {reference}
      </span>
      <div>
        <h3 className="display display-sm">{title}</h3>
        {body ? (
          <div
            className={cn(
              "prose-measure mt-3 text-[1.0625rem]",
              tone === "cream" ? "text-dim" : "text-ink",
            )}
          >
            {body}
          </div>
        ) : null}
      </div>
      {aside ? (
        <div className="lg:justify-self-end lg:pt-1.5">{aside}</div>
      ) : null}
    </Press>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(
          "ledger-row rule-hair block no-underline transition-colors",
          tone === "cream" ? "hover:bg-[var(--row-hover)]" : "hover:bg-cream-sheet",
        )}
      >
        {inner}
      </a>
    );
  }

  return <div className="ledger-row rule-hair">{inner}</div>;
}

/**
 * Lot status, carried in the entry itself rather than a badge stuck on top.
 */
export function LotStatus({
  price,
  tone = "ink",
}: {
  price: number | null;
  tone?: "ink" | "cream";
}) {
  if (price === null) {
    return (
      <span
        className={cn(
          "micro",
          tone === "cream" ? "text-dim" : "text-ink",
        )}
      >
        Sourced to order
      </span>
    );
  }
  return (
    <span className="micro text-olive" data-numeral>
      From GHS {price.toLocaleString("en-GH")}
    </span>
  );
}

/** The markets running along the selvedge. */
export function MarketStrip({ markets }: { markets: readonly string[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {markets.map((m) => (
        <li key={m} className="micro text-dim">
          {m}
        </li>
      ))}
    </ul>
  );
}
