"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { TextRoll } from "@/components/ui/skiper-ui/skiper58";
import { nav, site } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // One header everywhere: beige, with the quote button always olive.
  const tone = "ground bg-cream text-ink";
  const ctaOutline = "border-olive bg-olive text-cream hover:bg-olive-deep";

  return (
    <header className={cn("sticky top-[var(--frame)] z-50", tone)}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="group flex items-baseline gap-3 no-underline"
          onClick={() => setOpen(false)}
        >
          <span
            className="mark text-[1.5rem]"
            data-numeral
          >
            {site.mark}
          </span>
          <span className={cn("micro hidden transition-colors sm:block", "text-ink group-hover:text-olive")}>
            TwentyFour03 Vintage
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "no-underline transition-colors",
                  active
                    ? "border-b border-olive pb-0.5 text-olive"
                    : "text-ink hover:text-olive",
                )}
              >
                <TextRoll className="nav-label leading-[1.2]">{item.label}</TextRoll>
              </Link>
            );
          })}
          <Link
            href="/contact"
            className={cn("pill border", ctaOutline)}
          >
            Request a quote
          </Link>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className={cn("pill border md:hidden", ctaOutline)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div className="rule-hair" />

      <div
        id="mobile-nav"
        hidden={!open}
        className={cn("md:hidden border-t", "border-olive/20")}
      >
        <nav className="mx-auto flex max-w-[1400px] flex-col px-5 pb-6 sm:px-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn("display display-sm border-b py-4 lowercase no-underline", "border-olive/15")}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="pill mt-6 bg-olive text-cream"
          >
            Request a quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
