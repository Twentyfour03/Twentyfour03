"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Press } from "@/components/motion/press";
import { BasketProvider, ghs, useBasket } from "@/components/shop/basket";
import { Checkout } from "@/components/shop/checkout";
import { shopCategories, type ShopCategorySlug, type ShopItem } from "@/lib/content";
import { cn } from "@/lib/utils";

type Filter = "all" | ShopCategorySlug;

export type ShopProps = { items: ShopItem[]; intro: string; deliveryNote: string };

export function ShopView(props: ShopProps) {
  return (
    <BasketProvider items={props.items}>
      <ShopInner {...props} />
    </BasketProvider>
  );
}

function ShopInner({ items: shopItems, intro, deliveryNote }: ShopProps) {
  const params = useSearchParams();
  const initial = params.get("category");
  const [filter, setFilter] = useState<Filter>(
    shopCategories.some((c) => c.slug === initial) ? (initial as ShopCategorySlug) : "all",
  );
  const [open, setOpen] = useState(false);
  const { count, add } = useBasket();
  const shown = filter === "all" ? shopItems : shopItems.filter((i) => i.category === filter);

  return (
    <>
      {/* A shop counter, not a hero: title, how ordering works, basket. */}
      <section className="mx-auto max-w-[1400px] px-4 pt-14 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <div>
            <Press as="h1" className="display display-xl">
              The shop.
            </Press>
            <p className="mt-6 max-w-[48ch] text-[1.0625rem] text-ink">{intro}</p>
          </div>
          <dl className="grid grid-cols-3 gap-4 rounded-[1.25rem] bg-cream-sheet p-5 lg:grid-cols-1 lg:gap-3">
            {[
              ["Price", "Fixed, in GHS"],
              ["Payment", "Card or mobile money"],
              ["Delivery", deliveryNote || "Arranged with you after payment"],
            ].map(([k, v]) => (
              <div key={k} className="lg:flex lg:items-baseline lg:justify-between lg:gap-4">
                <dt className="micro text-olive">{k}</dt>
                <dd className="mt-1 text-[0.9375rem] text-ink lg:mt-0 lg:text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Filter bar with the basket, docked under the header. */}
      <div className="sticky top-[calc(var(--frame)+4.95rem)] sm:top-[calc(var(--frame)+4.6rem)] z-40 mt-12 border-y border-olive/15 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter the shop">
            {([{ slug: "all", title: "Everything" }, ...shopCategories] as const).map((c) => (
              <button
                key={c.slug}
                type="button"
                aria-pressed={filter === c.slug}
                onClick={() => setFilter(c.slug as Filter)}
                className={cn(
                  "pill border",
                  filter === c.slug
                    ? "border-olive bg-olive text-cream"
                    : "border-ink/15 text-ink hover:border-olive hover:text-olive",
                )}
              >
                {c.title}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="pill border border-olive text-olive hover:bg-olive hover:text-cream"
          >
            Basket{count > 0 ? ` (${count})` : ""}
          </button>
        </div>
      </div>

      <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <ul className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((item, i) => {
            const category = shopCategories.find((c) => c.slug === item.category)!;
            const orderable = item.price !== null;
            return (
              <Press as="li" key={item.id} index={i} className="flex flex-col">
                <div className="tile tile-hover relative aspect-square overflow-hidden bg-cream-sheet">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="micro absolute bottom-4 left-4 text-ink">Photo to follow</span>
                  )}
                </div>
                <p className="micro mt-4 text-olive">{category.title}</p>
                <p className="mt-1 text-[1.0625rem]">{item.name}</p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="text-[1rem] font-semibold" data-numeral>
                    {orderable ? ghs(item.price!) : "Price to follow"}
                  </p>
                  <button
                    type="button"
                    disabled={!orderable}
                    onClick={() => {
                      add(item.id);
                      setOpen(true);
                    }}
                    className="pill bg-olive text-cream hover:bg-olive-deep disabled:cursor-not-allowed disabled:bg-ink/15 disabled:text-ink"
                  >
                    {orderable ? "Add to basket" : "Coming soon"}
                  </button>
                </div>
              </Press>
            );
          })}
        </ul>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 rounded-[1.75rem] bg-olive px-7 py-10 text-cream sm:flex-row sm:items-center sm:justify-between sm:px-12">
          <div>
            <p className="text-[1.5rem] font-semibold">Looking for something that is not here?</p>
            <p className="mt-2 max-w-[52ch] text-[1rem] text-cream/85">
              Parts, machinery, fashion and anything else are sourced to order.
              Send us a request and we will come back with options and costs.
            </p>
          </div>
          <Link href="/contact" className="pill shrink-0 bg-cream text-olive hover:bg-cream-sheet">
            Request a quote
          </Link>
        </div>
      </section>

      <BasketPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function BasketPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const { lines, total, setQty, remove } = useBasket();
  const [step, setStep] = useState<"basket" | "checkout">("basket");

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (lines.length === 0) setStep("basket");
  }, [lines.length]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label="Your basket"
      className="welcome fixed inset-y-0 right-0 left-auto m-0 h-full max-h-none w-full max-w-md bg-cream p-0 text-ink shadow-2xl"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-olive/15 px-6 py-5">
          <p className="display display-sm">{step === "basket" ? "Your basket." : "Checkout."}</p>
          <div className="flex items-center gap-5">
            {step === "checkout" ? (
              <button type="button" onClick={() => setStep("basket")} className="micro text-ink hover:text-olive">
                Back
              </button>
            ) : null}
            <button type="button" onClick={onClose} className="micro text-ink hover:text-olive">
              Close
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {lines.length === 0 ? (
            <p className="text-[1rem] text-ink">Your basket is empty.</p>
          ) : step === "basket" ? (
            <ul className="space-y-5">
              {lines.map((l) => (
                <li key={l.id} className="flex items-start justify-between gap-4 border-b border-olive/10 pb-5">
                  <div>
                    <p className="text-[1rem]">{l.item.name}</p>
                    <p className="mt-1 text-[0.9375rem] text-ink" data-numeral>
                      {ghs(l.price)}
                    </p>
                    <button
                      type="button"
                      onClick={() => remove(l.id)}
                      className="micro mt-2 text-ink underline decoration-ink/30 hover:text-[var(--color-error)]"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label={`One fewer ${l.item.name}`}
                      onClick={() => setQty(l.id, l.qty - 1)}
                      className="grid size-8 place-items-center rounded-full border border-olive/30"
                    >
                      −
                    </button>
                    <span className="w-6 text-center" data-numeral>
                      {l.qty}
                    </span>
                    <button
                      type="button"
                      aria-label={`One more ${l.item.name}`}
                      onClick={() => setQty(l.id, l.qty + 1)}
                      className="grid size-8 place-items-center rounded-full border border-olive/30"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <Checkout />
          )}
        </div>

        {lines.length > 0 && step === "basket" ? (
          <div className="border-t border-olive/15 px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="micro text-ink">Total</span>
              <span className="text-[1.25rem] font-semibold" data-numeral>
                {ghs(total)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setStep("checkout")}
              className="pill mt-4 w-full bg-olive text-cream hover:bg-olive-deep"
            >
              Checkout
            </button>
          </div>
        ) : null}
      </div>
    </dialog>
  );
}
