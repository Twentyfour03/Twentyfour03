import type { Metadata } from "next";
import Link from "next/link";

import { SectionHead } from "@/components/catalogue/parts";
import { getPageCopy, getProcess, getServices } from "@/lib/data";
import { Press } from "@/components/motion/press";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Product sourcing, supplier sourcing, China procurement, UAE, Europe and UK procurement, business procurement, bulk and wholesale sourcing, furniture and interiors, construction and project procurement.",
};

export default async function ServicesPage() {
  const [services, process, copy] = await Promise.all([getServices(), getProcess(), getPageCopy()]);
  return (
    <>
      <section className="ground bg-cream-sheet text-ink">
        <div className="mx-auto max-w-[1400px] px-5 pt-16 pb-16 sm:px-8 lg:px-12 lg:pt-24">
          <Press as="h1" className="display display-xl max-w-[14ch]">
            Our procurement &amp; sourcing services.
          </Press>
          <p className="prose-measure mt-8 text-[1.0625rem] text-ink">{copy.servicesIntro}</p>
          <Link
            href="/contact"
            className="micro mt-10 inline-block bg-cream px-8 py-4 text-olive no-underline transition-colors hover:bg-cream-dim"
          >
            Start a procurement request
          </Link>
        </div>
      </section>

      {/* The eight services. Each is a full-width entry, not a card in a grid. */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        {services.map((service, i) => (
          <Press
            as="article"
            key={service.ref}
            index={i}
            className="ledger-row rule-hair grid gap-x-10 gap-y-6 py-12 lg:grid-cols-[10rem_minmax(0,1fr)_minmax(0,18rem)] lg:py-16"
          >
            <span data-numeral className="micro pt-2 text-ink">
              {service.ref}
            </span>

            <div>
              <Press as="h2" className="display display-lg">{service.title}</Press>
              <p className="prose-measure mt-5 text-[1.0625rem] text-ink">
                {service.lede}
              </p>
            </div>

            <ul className="columns-2 gap-x-8 lg:columns-1 lg:border-l lg:border-rule lg:pl-8">
              {service.items.map((item) => (
                <li
                  key={item}
                  className="break-inside-avoid py-1.5 text-[1rem] text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Press>
        ))}
        <div className="rule-hair" />
      </section>

      {/* The process, repeated here because the client asked for it on both pages. */}
      <section className="ground bg-cream-sheet text-ink">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <SectionHead
            heading="How it works."
            lede="From your request to delivery, in six pictures."
            tone="ink"
          />

          {/* Six images, one per stage. The client supplies the photographs;
              each slot keeps its caption so the order still reads. */}
          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {process.map((p, i) => (
              <Press as="li" key={p.step} index={i}>
                <figure>
                  <div className="tile tile-hover relative flex aspect-[4/5] items-end overflow-hidden bg-cream p-5 ring-1 ring-olive/15">
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                    ) : (
                      <span className="micro text-ink">Image to follow</span>
                    )}
                  </div>
                  <figcaption className="mt-4 flex items-baseline gap-3">
                    <span data-numeral className="micro text-olive">
                      {p.step}
                    </span>
                    <span className="text-[1.0625rem] font-medium">{p.title}</span>
                  </figcaption>
                </figure>
              </Press>
            ))}
          </ol>

          <Link
            href="/contact"
            className="micro mt-16 inline-block bg-cream px-8 py-4 text-olive no-underline transition-colors hover:bg-cream-dim"
          >
            Send us your request
          </Link>
        </div>
      </section>
    </>
  );
}
