import type { Metadata } from "next";
import Link from "next/link";

import { PlateCoverflow } from "@/components/catalogue/plate-coverflow";
import { DecryptReveal } from "@/components/canvasui/DecryptReveal";
import { Press } from "@/components/motion/press";
import { getPageCopy, getPortfolioCategories, getProjects, getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "A catalogue of selected procurement projects, and the journey behind TwentyFour03 Vintage: from personal shopping in Dubai to global sourcing.",
};


/**
 * Burgundy and cream only. A rounded collage in the manner of the portfolio
 * reference: a large rounded hero card with small overlay cards, a row of
 * circular thumbnails, a cream profile card with a stats row and pill
 * buttons, then the plates.
 */
export default async function PortfolioPage() {
  const [lots, portfolioCategories, copy, site] = await Promise.all([
    getProjects(),
    getPortfolioCategories(),
    getPageCopy(),
    getSiteSettings(),
  ]);
  const founderStory = {
    heading: copy.portfolioHeading,
    opening: copy.portfolioOpening,
    paragraphs: copy.portfolioStory,
    pullQuote: copy.portfolioQuote,
  };
  const stats: [string, string][] = [
    ["Clients", copy.clientsCount === null ? "—" : String(copy.clientsCount)],
    ["Markets", String(site.markets.filter((m) => m !== "Global Markets").length)],
    ["Industries", String(portfolioCategories.length)],
  ];
  return (
    <div className="on-burgundy bg-burgundy-deep text-cream">
      {/* thin ribbon */}
      <div className="mx-auto flex max-w-[1400px] flex-wrap gap-x-8 gap-y-1 px-4 pt-6 sm:px-6 lg:px-8">
        <span className="micro text-dim">{site.founder}</span>
        <span className="micro text-dim">{site.founderRole}</span>
      </div>

      {/* hero card with overlays */}
      <section className="mx-auto max-w-[1400px] px-4 pt-6 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="tile anim-plate flex aspect-[4/3] items-start bg-cream-sheet p-6 sm:aspect-[16/8]">
            <span className="micro text-ink-dim">Portrait to follow</span>
          </div>
          <div className="tile absolute bottom-5 left-5 hidden w-32 bg-cream p-2 sm:block">
            <div className="aspect-[4/5] rounded-[0.9rem] bg-cream-sheet" />
          </div>
          <div className="tile absolute right-5 bottom-5 max-w-[16rem] bg-burgundy px-5 py-4">
            <p className="text-[1rem] font-medium">{site.founder}</p>
            <p className="micro mt-1 text-dim">{site.founderRole}</p>
          </div>
        </div>

        {/* bio */}
        <div className="mt-10">
          <div>
            <Press as="h1" className="display display-sm">
              {founderStory.opening}
            </Press>
            <p className="mt-2 max-w-[60ch] text-[0.9375rem] text-dim">
              {founderStory.paragraphs[0]}
            </p>
          </div>
        </div>
      </section>

      {/* two-column collage: portrait card | profile card */}
      <section className="mx-auto grid max-w-[1400px] gap-6 px-4 pt-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="tile flex aspect-[4/5] items-end bg-cream-sheet p-6">
          <span className="micro text-ink-dim">Plate to follow</span>
        </div>

        <div className="tile flex flex-col justify-between bg-cream p-7 text-ink sm:p-9">
          <div>
            <p className="display display-lg lowercase">{site.name}</p>
            <p className="micro mt-2 text-ink-dim">{site.positioning}</p>
            <p className="mt-6 text-[1rem] text-ink-dim">{site.tagline}</p>
          </div>

          <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-ink/10 py-5">
            {stats.map(([label, value]) => (
              <div key={label}>
                <dt className="micro text-ink-dim">{label}</dt>
                <dd className="mt-1 text-[1.75rem] font-semibold" data-numeral>
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="pill bg-burgundy text-cream hover:bg-burgundy-deep">
              Request a quote
            </Link>
            <a href="#story" className="pill border border-ink/20 text-ink hover:bg-cream-sheet">
              Read the story
            </a>
          </div>
        </div>
      </section>

      {/* the plates */}
      <section className="mx-auto max-w-[1400px] px-4 pt-20 sm:px-6 lg:px-8">
        <Press as="h2" className="display display-lg max-w-[16ch]">
          Catalogue of selected procurement projects.
        </Press>
        <PlateCoverflow lots={lots} className="mt-6" />

        <DecryptReveal
          className="mt-6"
          color="#fff5e1"
          background="#4a0013"
          radius={190}
          softness={0.55}
          cell={11}
          scramble={0.6}
          edgeGlow={0.35}
          edgeTint={0.2}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lots.map((lot, i) => (
              <Press
                key={lot.ref}
                index={i}
                className="rounded-[1.25rem] bg-burgundy p-5"
              >
                <div>
                  <div>
                    <p className="text-[1.0625rem] font-medium lowercase">{lot.title}</p>
                    <p className="micro mt-1 text-dim">
                      {lot.source} &rarr; {lot.location}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-[0.9375rem] text-dim">{lot.summary}</p>
                <p className="micro mt-3 text-dim">{lot.category}</p>
              </Press>
            ))}
          </div>
        </DecryptReveal>
      </section>

      {/* the story, on cream */}
      <section id="story" className="mx-auto mt-20 max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="tile bg-cream p-7 text-ink sm:p-10 lg:p-14">
          <Press as="h2" className="display display-lg max-w-[16ch]">
            {founderStory.heading}
          </Press>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,12rem)_minmax(0,1fr)]">
            <div className="tile flex aspect-[4/5] items-end bg-cream-sheet p-4 lg:sticky lg:top-28">
              <span className="micro text-ink-dim">Portrait to follow</span>
            </div>
            <div>
              {founderStory.paragraphs.map((p, i) => (
                <p key={i} className="max-w-[68ch] text-[1.0625rem] leading-[1.7] text-ink [&+&]:mt-5">
                  {p}
                </p>
              ))}
              <blockquote className="mt-12 border-t border-ink/10 pt-8">
                <p className="display display-lg max-w-[20ch] text-burgundy lowercase">
                  {founderStory.pullQuote}
                </p>
                <cite className="micro mt-6 block text-ink-dim not-italic">{site.founder}</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* categories as pills */}
      <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8">
        <Press as="h2" className="display display-lg">
          Portfolio categories.
        </Press>
        <ul className="mt-8 flex flex-wrap gap-2">
          {portfolioCategories.map((c) => (
            <li key={c} className="pill border border-cream/30 text-dim">
              {c}
            </li>
          ))}
        </ul>
        <Link href="/contact" className="pill mt-12 bg-cream text-burgundy hover:bg-cream-sheet">
          Start your project
        </Link>
      </section>
    </div>
  );
}
