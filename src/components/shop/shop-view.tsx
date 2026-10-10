"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Lightbox } from "@/components/catalogue/lightbox";
import { Press } from "@/components/motion/press";
import { BasketProvider, ghs, useBasket } from "@/components/shop/basket";
import { Checkout } from "@/components/shop/checkout";
import { CurrencyPicker, CurrencyProvider, useCurrency } from "@/components/shop/currency";
import { FitImage } from "@/components/site/fit-image";
import { shopCategories, type ShopCategorySlug, type ShopItem } from "@/lib/content";
import type { Rates } from "@/lib/currency";
import { cn } from "@/lib/utils";

type Filter = "all" | ShopCategorySlug;

export type ShopProps = { items: ShopItem[]; intro: string; rates: Rates };

export function ShopView(props: ShopProps) {
  return (
    <CurrencyProvider rates={props.rates}>
      <BasketProvider items={props.items}>
        <ShopInner {...props} />
      </BasketProvider>
    </CurrencyProvider>
  );
}

const photosOf = (item: ShopItem) => (item.images && item.images.length > 0 ? item.images : item.image ? [item.image] : []);

function ShopInner({ items: shopItems, intro }: ShopProps) {
  const params = useSearchParams();
  const initial = params.get("category");
  const [filter, setFilter] = useState<Filter>(
    shopCategories.some((c) => c.slug === initial) ? (initial as ShopCategorySlug) : "all",
  );
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState<{ item: ShopItem; index: number } | null>(null);
  const { count } = useBasket();
  const shown = filter === "all" ? shopItems : shopItems.filter((i) => i.category === filter);

  return (
    <>
      <section className="mx-auto max-w-[1400px] px-4 pt-14 sm:px-6 lg:px-8 lg:pt-20">
        <Press as="h1" className="display display-xl">
          The shop.
        </Press>
        <p className="mt-6 max-w-[48ch] text-[1.0625rem] text-ink">{intro}</p>
      </section>

      {/* Filter bar with the currency and the basket, docked under the header. */}
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
          <div className="flex items-center gap-2">
            <CurrencyPicker />
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="pill border border-olive text-olive hover:bg-olive hover:text-cream"
            >
              Basket{count > 0 ? ` (${count})` : ""}
            </button>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <ul className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((item, i) => (
            <Press as="li" key={item.id} index={i} className="flex flex-col">
              <ShopCard
                item={item}
                onZoom={(index) => setZoomed({ item, index })}
                onAdded={() => setOpen(true)}
              />
            </Press>
          ))}
        </ul>
      </section>

      <Lightbox
        images={zoomed ? photosOf(zoomed.item) : []}
        title={zoomed?.item.name ?? ""}
        index={zoomed ? zoomed.index : null}
        onIndex={(index) => setZoomed((z) => (z ? { ...z, index } : z))}
        onClose={() => setZoomed(null)}
      />

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

/** One piece: its photos, what it is, the colour to order it in, the price. */
function ShopCard({
  item,
  onZoom,
  onAdded,
}: {
  item: ShopItem;
  onZoom: (index: number) => void;
  onAdded: () => void;
}) {
  const { add } = useBasket();
  const { code, money } = useCurrency();
  const photos = photosOf(item);
  const [photo, setPhoto] = useState(0);
  const [colour, setColour] = useState("");
  const [needColour, setNeedColour] = useState(false);
  const category = shopCategories.find((c) => c.slug === item.category)!;
  const orderable = item.price !== null;
  const many = photos.length > 1;

  return (
    <>
      <div className="tile tile-hover relative aspect-[4/3] bg-cream-sheet">
        {photos.length > 0 ? (
          <>
            <button
              type="button"
              onClick={() => onZoom(photo)}
              aria-label={`Open a larger photo of ${item.name}`}
              className="absolute inset-0 block cursor-zoom-in"
            >
              <FitImage src={photos[photo]} alt={item.name} />
            </button>
            {many ? (
              <>
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={() => setPhoto((p) => (p - 1 + photos.length) % photos.length)}
                  className="absolute top-1/2 left-2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-ink shadow hover:bg-cream"
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={() => setPhoto((p) => (p + 1) % photos.length)}
                  className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-ink shadow hover:bg-cream"
                >
                  ›
                </button>
                <div className="absolute inset-x-0 bottom-2.5 flex justify-center gap-1.5">
                  {photos.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      aria-label={`Photo ${i + 1} of ${photos.length}`}
                      aria-pressed={i === photo}
                      onClick={() => setPhoto(i)}
                      className={cn("size-2 rounded-full ring-1 ring-ink/30", i === photo ? "bg-cream" : "bg-cream/50")}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </>
        ) : (
          <span className="micro absolute bottom-4 left-4 text-ink">Photo to follow</span>
        )}
      </div>

      <p className="micro mt-4 text-olive">{category.title}</p>
      <p className="mt-1 text-[1.0625rem] leading-snug">{item.name}</p>
      {item.note ? <p className="mt-1 text-[0.9375rem] text-ink-dim">{item.note}</p> : null}

      {item.colours && orderable ? (
        <label className="mt-3 block">
          <span className="sr-only">Colour for {item.name}</span>
          <select
            value={colour}
            onChange={(e) => {
              setColour(e.target.value);
              setNeedColour(false);
            }}
            aria-invalid={needColour}
            className={cn(
              "w-full rounded-full border bg-cream px-4 py-2 text-[0.9375rem] text-ink",
              needColour ? "border-[var(--color-error)]" : "border-ink/20",
            )}
          >
            <option value="">Choose a colour</option>
            {item.colours.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {needColour ? (
            <span role="alert" className="mt-1 block text-[0.8125rem] text-[var(--color-error)]">
              Please choose a colour first.
            </span>
          ) : null}
        </label>
      ) : null}

      <div className="mt-auto flex items-end justify-between gap-3 pt-3">
        <p className="text-[1rem] font-semibold" data-numeral>
          {orderable ? money(item.price!) : "Price to follow"}
          {orderable && code !== "GHS" ? (
            <span className="block text-[0.8125rem] font-normal text-ink-dim">{ghs(item.price!)}</span>
          ) : null}
        </p>
        <button
          type="button"
          disabled={!orderable}
          onClick={() => {
            if (item.colours && !colour) {
              setNeedColour(true);
              return;
            }
            add(item.id, item.colours ? colour : undefined);
            onAdded();
          }}
          className="pill shrink-0 bg-olive text-cream hover:bg-olive-deep disabled:cursor-not-allowed disabled:bg-ink/15 disabled:text-ink"
        >
          {orderable ? "Add to basket" : "Coming soon"}
        </button>
      </div>
    </>
  );
}

function BasketPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const { lines, total, setQty, remove } = useBasket();
  const { code, money } = useCurrency();
  const [step, setStep] = useState<"basket" | "checkout">("basket");
  // True while Paystack's window is up; the panel hides and comes back after.
  const [paying, setPaying] = useState(false);
  const payingRef = useRef(false);

  useEffect(() => {
    payingRef.current = paying;
    const d = ref.current;
    if (!d) return;
    const show = open && !paying;
    if (show && !d.open) d.showModal();
    if (!show && d.open) d.close();
  }, [open, paying]);



  return (
    <dialog
      ref={ref}
      onClose={() => {
        if (!payingRef.current) onClose();
      }}
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
          {step === "checkout" ? (
            <Checkout onPaying={setPaying} />
          ) : lines.length === 0 ? (
            <p className="text-[1rem] text-ink">Your basket is empty.</p>
          ) : (
            <ul className="space-y-5">
              {lines.map((l) => (
                <li key={l.key} className="flex items-start justify-between gap-4 border-b border-olive/10 pb-5">
                  <div>
                    <p className="text-[1rem]">{l.item.name}</p>
                    {l.colour ? <p className="mt-0.5 text-[0.9375rem] text-ink-dim">Colour: {l.colour}</p> : null}
                    <p className="mt-1 text-[0.9375rem] text-ink" data-numeral>
                      {ghs(l.price)}
                    </p>
                    <button
                      type="button"
                      onClick={() => remove(l.key)}
                      className="micro mt-2 text-ink underline decoration-ink/30 hover:text-[var(--color-error)]"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label={`One fewer ${l.item.name}`}
                      onClick={() => setQty(l.key, l.qty - 1)}
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
                      onClick={() => setQty(l.key, l.qty + 1)}
                      className="grid size-8 place-items-center rounded-full border border-olive/30"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
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
            {code !== "GHS" ? (
              <p className="mt-1 text-right text-[0.875rem] text-ink-dim">About {money(total)}</p>
            ) : null}
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
