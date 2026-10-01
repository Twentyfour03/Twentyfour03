import type React from "react";
import Link from "next/link";

import { Press } from "@/components/motion/press";
import { shopCategories } from "@/lib/content";
import {
  getCoreServices,
  getPageCopy,
  getProcess,
  getProcurementCategories,
  getSiteSettings,
  getTestimonials,
} from "@/lib/data";

const marqueeLine =
  "QUOTE FIRST // NOTHING IS BOUGHT BEFORE YOU APPROVE // CHINA · UAE · UK · EUROPE · GHANA // ";

export default async function Home() {
  const [coreServices, process, productCategories, site, copy, testimonials] = await Promise.all([
    getCoreServices(),
    getProcess(),
    getProcurementCategories(),
    getSiteSettings(),
    getPageCopy(),
    getTestimonials(),
  ]);
  const rail = [
    ...shopCategories.map((c) => ({ title: c.title, href: `/shop?category=${c.slug}` })),
    { title: productCategories[1]?.title ?? "Sourced to order", href: "/contact" },
  ];

  return (
    <>
      {/* Hero: a sheet of cream leather, stitched at the edge, with the
          title embossed up out of it in a heavy classic serif. */}
      <section className="mx-auto max-w-[1400px] px-4 pt-4 sm:px-6 lg:px-8">
        <div className="leather overflow-hidden rounded-[1.75rem] text-ink">
          <div className="grid grid-cols-1 gap-8 px-6 pt-12 pb-8 sm:px-14 sm:pt-20 lg:grid-cols-[minmax(0,1fr)_9.5rem] lg:gap-12 lg:px-16">
            <div className="min-w-0 lg:self-center">
              <h1 className="emboss hero-word text-[clamp(3rem,12.5vw,10rem)]">
                Sourcing
                <span className="mt-2 block text-[0.42em] font-bold">globally.</span>
              </h1>
              <p className="hero-caption mt-10 text-[1rem] text-ink lg:whitespace-nowrap">
                {copy.homeCaption}
              </p>
            </div>

            <div className="grid min-w-0 grid-cols-3 gap-3 lg:flex lg:flex-col">
              {rail.map((c, i) => (
                <Link
                  key={c.title}
                  href={c.href}
                  style={{ "--i": i } as React.CSSProperties}
                  className="tile hero-rail-item group min-w-0 bg-cream/70 ring-1 ring-olive/15 text-ink no-underline lg:flex-1"
                >
                  <div className="aspect-[4/3] bg-cream-sheet/70 transition-colors group-hover:bg-cream" />
                  <p className="nav-label px-2 pb-3 text-[0.6rem] leading-snug text-ink sm:px-3 sm:text-xs">{c.title}</p>
                </Link>
              ))}
              <Link
                href="/shop"
                className="pill hero-pill col-span-3 justify-self-start bg-olive text-cream hover:bg-olive-deep lg:mt-2"
              >
                Visit the shop
              </Link>
            </div>
          </div>

          <ul className="relative z-10 grid grid-cols-3 gap-x-4 gap-y-3 bg-olive px-6 py-5 text-cream sm:flex sm:flex-wrap sm:gap-x-8 sm:px-14 lg:px-16">
            {site.markets.map((m) => (
              <li key={m} className="text-[0.7rem] font-bold tracking-[0.14em] text-cream uppercase sm:text-[0.875rem] sm:tracking-[0.18em]">
                {m}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pt-20 sm:px-6 lg:px-8 lg:pt-28">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end">
          <Press as="h2" className="display display-lg max-w-[14ch]">
            We find, we source, we procure, we coordinate.
          </Press>
          <p className="max-w-[46ch] text-[1rem] text-ink lg:justify-self-end">
            {copy.homeIntro}
          </p>
        </div>

        <div className="tile tile-hover mt-12 flex aspect-[16/6] items-end bg-cream-sheet p-6">
          <span className="micro text-ink">Plate to follow</span>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end">
          <Press as="h2" className="display display-lg max-w-[16ch]">
            Shop the collection.
          </Press>
          <p className="max-w-[46ch] text-[1rem] text-ink lg:justify-self-end">
            Furniture and home &amp; décor we hold in stock, at a fixed price,
            ordered and paid for online.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {shopCategories.map((c, i) => (
            <Press key={c.slug} index={i} className="flex flex-col gap-4">
              <div className="tile tile-hover flex aspect-[4/3] items-end bg-cream-sheet p-5">
                <span className="micro text-ink">Plate to follow</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[1.0625rem]">{c.title}</p>
                  <p className="mt-1 text-[0.9375rem] text-ink">{c.body}</p>
                </div>
                <Link
                  href={`/shop?category=${c.slug}`}
                  className="pill shrink-0 bg-olive text-cream hover:bg-olive-deep"
                >
                  Shop
                </Link>
              </div>
            </Press>
          ))}
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end">
          <Press as="h2" className="display display-lg max-w-[16ch]">
            Sourced to order.
          </Press>
          <p className="max-w-[46ch] text-[1rem] text-ink lg:justify-self-end">
            No fixed price. Tell us what you need and we come back with
            options and costs before anything is bought.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productCategories.map((c, i) => (
            <Press key={c.ref} index={i} className="flex flex-col gap-4">
              <div className="tile tile-hover relative flex aspect-[4/3] items-end overflow-hidden bg-cream-sheet p-5">
                {c.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <span className="micro text-ink">Plate to follow</span>
                )}
              </div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-[1.0625rem]">{c.title}</p>
                <Link
                  href={c.dedicated ?? "/contact"}
                  className="pill shrink-0 bg-olive text-cream hover:bg-olive-deep"
                >
                  {c.dedicated ? "Open" : "Request"}
                </Link>
              </div>
            </Press>
          ))}
        </div>
      </section>

      <div
        className="marquee mt-20 overflow-hidden bg-cream-sheet py-4 text-ink lg:mt-28"
        aria-hidden
      >
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <span key={k} className="micro whitespace-nowrap pr-4 text-ink">
              {marqueeLine.repeat(3)}
            </span>
          ))}
        </div>
      </div>

      <section className="ground bg-cream-sheet text-ink">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start lg:px-8 lg:py-28">
          <div className="tile flex aspect-[4/5] items-end bg-cream ring-1 ring-olive/15 p-6 lg:sticky lg:top-28">
            <span className="micro text-ink">Plate to follow</span>
          </div>
          <div>
            <Press as="h2" className="display display-lg max-w-[16ch]">
              Six steps, from your request to delivery.
            </Press>
            <p className="mt-5 max-w-[46ch] text-[1rem] text-ink">
              You approve the options and the costs before anything is bought.
            </p>
            <ol className="mt-10 grid gap-3 sm:grid-cols-2">
              {process.map((p) => (
                <li key={p.step} className="rounded-[1.25rem] bg-cream ring-1 ring-olive/15 p-5">
                  <span data-numeral className="micro text-ink">
                    {p.step}
                  </span>
                  <p className="mt-2 text-[1.0625rem] font-medium lowercase">{p.title}</p>
                  <p className="mt-1.5 text-[0.9375rem] text-ink">{p.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="pill bg-olive text-cream hover:bg-olive-deep">
                Request a quote
              </Link>
              <Link
                href="/services"
                className="pill border border-olive/40 text-olive hover:bg-olive hover:text-cream"
              >
                All eight services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {testimonials.length > 0 ? (
        <section className="mx-auto max-w-[1400px] px-4 pt-20 sm:px-6 lg:px-8 lg:pt-28">
          <Press as="h2" className="display display-lg max-w-[14ch]">
            What clients say.
          </Press>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Press as="li" key={t.name + i} index={i} className="rounded-[1.25rem] bg-cream-sheet p-6">
                <p className="text-[1.0625rem] leading-[1.6]">&ldquo;{t.quote}&rdquo;</p>
                <p className="micro mt-5 text-olive">{t.name}</p>
                {t.company ? <p className="micro mt-1 text-ink">{t.company}</p> : null}
              </Press>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Press as="h2" className="display display-lg max-w-[14ch]">
          What we do.
        </Press>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coreServices.map((s, i) => (
            <Press key={s.ref} index={i} className="rounded-[1.25rem] bg-cream-sheet p-6">
              <span data-numeral className="micro text-ink">
                {s.ref}
              </span>
              <p className="mt-3 text-[1.125rem] font-medium">{s.title}</p>
              <p className="mt-2 text-[0.9375rem] text-ink">{s.body}</p>
            </Press>
          ))}
        </div>
      </section>
    </>
  );
}
