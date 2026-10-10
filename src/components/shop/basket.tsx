"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { ShopItem } from "@/lib/content";

/** The same piece in two colours is two lines. */
export type BasketLine = { id: string; qty: number; colour?: string };
export type PricedLine = BasketLine & { key: string; item: ShopItem; price: number };

const KEY = "t403-basket";
const MAX_QTY = 50;

const keyOf = (line: { id: string; colour?: string }) => `${line.id}|${line.colour ?? ""}`;

type BasketContext = {
  lines: PricedLine[];
  count: number;
  total: number;
  add: (id: string, colour?: string) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const Ctx = createContext<BasketContext | null>(null);

/** Only items that exist and carry a price survive into the basket. */
function price(raw: BasketLine[], shopItems: ShopItem[]): PricedLine[] {
  return raw.flatMap((line) => {
    const item = shopItems.find((i) => i.id === line.id);
    if (!item || item.price === null) return [];
    return [{ ...line, key: keyOf(line), item, price: item.price }];
  });
}

export function BasketProvider({ items, children }: { items: ShopItem[]; children: ReactNode }) {
  const [raw, setRaw] = useState<BasketLine[]>([]);

  // Restore after mount. Storage can be blocked, so every access is guarded.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved) setRaw(JSON.parse(saved) as BasketLine[]);
    } catch {
      /* no storage: the basket simply starts empty */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(raw));
    } catch {
      /* ignore */
    }
  }, [raw]);

  const add = useCallback((id: string, colour?: string) => {
    setRaw((r) => {
      const key = keyOf({ id, colour });
      if (r.some((l) => keyOf(l) === key)) {
        return r.map((l) => (keyOf(l) === key ? { ...l, qty: Math.min(l.qty + 1, MAX_QTY) } : l));
      }
      return [...r, { id, qty: 1, colour }];
    });
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setRaw((r) =>
      qty <= 0
        ? r.filter((l) => keyOf(l) !== key)
        : r.map((l) => (keyOf(l) === key ? { ...l, qty: Math.min(qty, MAX_QTY) } : l)),
    );
  }, []);

  const remove = useCallback((key: string) => setRaw((r) => r.filter((l) => keyOf(l) !== key)), []);
  const clear = useCallback(() => setRaw([]), []);

  const value = useMemo(() => {
    const lines = price(raw, items);
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: lines.reduce((n, l) => n + l.qty * l.price, 0),
      add,
      setQty,
      remove,
      clear,
    };
  }, [raw, items, add, setQty, remove, clear]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBasket(): BasketContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBasket must be used inside BasketProvider");
  return ctx;
}

export function ghs(amount: number): string {
  return `GHS ${amount.toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
