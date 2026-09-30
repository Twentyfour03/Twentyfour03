import type { Metadata } from "next";
import Link from "next/link";

import { LedgerRow, Plate } from "@/components/catalogue/parts";
import { shopCategories } from "@/lib/content";
import { getPageCopy, getProcurementCategories, getSiteSettings, getValues } from "@/lib/data";
import { Press } from "@/components/motion/press";

export const metadata: Metadata = {
  title: "About",
  description:
    "TwentyFour03 Vintage has evolved from a personal shopping business into a procurement and global sourcing agency working across China, the UAE, Ghana, Europe and the UK.",
};

export default async function AboutPage() {
  const [copy, productCategories, site, values] = await Promise.all([
    getPageCopy(),
    getProcurementCategories(),
    getSiteSettings(),
    getValues(),
  ]);
  const mission = copy.mission;
  const vision = copy.vision;
  return (
    <>
      <section className="ground bg-cream-sheet text-ink">
        <div className="mx-auto max-w-[1100px] px-5 py-12 sm:px-8 lg:py-20">
          <div className="px-2 py-6 sm:px-4 sm:py-10">
            <Press as="h1" className="display display-xl max-w-[12ch]">
              Connecting you to global markets.
            </Press>

            <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-14">
              <div className="space-y-6">
                {copy.aboutIntro.map((para, i) => (
                  <p key={i} className="prose-measure text-[1.0625rem] text-ink">
                    {para}
                  </p>
                ))}
              </div>
              <Plate className="self-start p-8 sm:p-10">
                <p className="mark text-[2.5rem]" data-numeral>
                  {site.mark}
                </p>
                <p className="micro mt-4 text-ink">The agency, in short</p>

                <dl className="rule-hair mt-7 space-y-4 pt-6">
                  <div>
                    <dt className="micro text-ink">Principal</dt>
                    <dd className="mt-1.5 text-[1rem]">
                      {site.founder}, {site.founderRole}
                    </dd>
                  </div>
                  <div>
                    <dt className="micro text-ink">Sourced</dt>
                    <dd className="mt-1.5 text-[1rem]">
                      {[...shopCategories, ...productCategories].map((c) => c.title).join(", ")}
                    </dd>
                  </div>
                  <div>
                    <dt className="micro text-ink">Basis</dt>
                    <dd className="mt-1.5 text-[1rem]">
                      Quote first. Nothing is purchased before you approve the
                      options and the costs.
                    </dd>
                  </div>
                </dl>
              </Plate>
            </div>

            <p className="display display-lg mt-14 max-w-[22ch]">{copy.aboutObjective}</p>
          </div>
        </div>
      </section>

      {/* Mission and vision, plated as two entries. */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div>
          {[
            { ref: "M.01", title: "our mission", body: mission },
            { ref: "M.02", title: "our vision", body: vision },
          ].map((entry, i) => (
            <LedgerRow
              key={entry.ref}
              index={i}
              reference={entry.ref}
              title={entry.title}
              body={entry.body}
            />
          ))}
          <div className="rule-hair" />
        </div>

        <div className="mt-20">
          <Press as="h2" className="display display-lg">Our values.</Press>
          <div className="mt-10">
            {values.map((v, i) => (
              <LedgerRow
                key={v.title}
                index={i}
                reference={`V.0${i + 1}`}
                title={v.title.toLowerCase()}
                body={v.body}
              />
            ))}
            <div className="rule-hair" />
          </div>
        </div>

        <div className="mt-16 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
          <Link
            href="/portfolio"
            className="micro border border-ink/25 px-8 py-4 text-center no-underline transition-colors hover:bg-olive hover:text-cream"
          >
            Read {site.founder.split(" ").slice(0, 2).join(" ")}&rsquo;s story
          </Link>
          <Link
            href="/contact"
            className="micro border border-transparent bg-olive px-8 py-4 text-center text-cream no-underline transition-colors hover:bg-olive-deep"
          >
            Request a quote
          </Link>
        </div>
      </section>
    </>
  );
}
