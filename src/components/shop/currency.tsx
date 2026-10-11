"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { currencies, currencyForTimeZone, formatMoney, type CurrencyCode, type Rates } from "@/lib/currency";
import { cn } from "@/lib/utils";

const KEY = "t403-currency";

type CurrencyContext = {
  code: CurrencyCode;
  setCode: (code: CurrencyCode) => void;
  /** A cedi amount in the visitor's chosen currency. */
  money: (ghs: number) => string;
};

const Ctx = createContext<CurrencyContext | null>(null);

/**
 * Prices are set in cedis. On arrival the visitor is shown the currency of
 * where they are, read from their device's time zone; after that their own
 * choice is remembered.
 */
export function CurrencyProvider({ rates, children }: { rates: Rates; children: ReactNode }) {
  const [code, setCodeState] = useState<CurrencyCode>("GHS");

  useEffect(() => {
    let chosen: CurrencyCode | null = null;
    try {
      const saved = window.localStorage.getItem(KEY);
      if (currencies.some((c) => c.code === saved)) chosen = saved as CurrencyCode;
    } catch {
      /* no storage: fall through to the time zone */
    }
    setCodeState(chosen ?? currencyForTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone ?? ""));
  }, []);

  const setCode = useCallback((next: CurrencyCode) => {
    setCodeState(next);
    try {
      window.localStorage.setItem(KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ code, setCode, money: (ghs: number) => formatMoney(ghs, code, rates) }),
    [code, setCode, rates],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCurrency(): CurrencyContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCurrency must be used inside CurrencyProvider");
  return ctx;
}

/** The flag-and-code picker in the shop's filter bar. */
export function CurrencyPicker() {
  const { code, setCode } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = currencies.find((c) => c.code === code) ?? currencies[0];

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Currency: ${current.label}. Change currency`}
        onClick={() => setOpen((v) => !v)}
        className="pill gap-2 border border-ink/15 text-ink hover:border-olive hover:text-olive"
      >
        <Flag src={current.flag} />
        {current.code}
        <span aria-hidden className="text-[0.6rem]">▾</span>
      </button>
      {open ? (
        <ul
          role="listbox"
          aria-label="Currency"
          className="absolute left-0 z-50 mt-2 w-60 overflow-hidden sm:right-0 sm:left-auto rounded-[1rem] bg-cream py-1 shadow-[0_18px_40px_-18px_rgba(26,26,26,0.55)] ring-1 ring-olive/15"
        >
          {currencies.map((c) => (
            <li key={c.code} role="option" aria-selected={c.code === code}>
              <button
                type="button"
                onClick={() => {
                  setCode(c.code);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-2.5 text-left text-[0.9375rem] hover:bg-cream-sheet",
                  c.code === code && "font-medium text-olive",
                )}
              >
                <Flag src={c.flag} />
                <span className="flex-1">{c.label}</span>
                <span className="micro text-ink-dim">{c.code}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function Flag({ src }: { src: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" className="h-3.5 w-5 shrink-0 rounded-[2px] object-cover ring-1 ring-black/10" />;
}
