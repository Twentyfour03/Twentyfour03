import type { Metadata } from "next";

import { SparePartsForm } from "@/components/forms/spare-parts-form";
import { Press } from "@/components/motion/press";
import { getFaqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Car Spare Parts",
  description:
    "Genuine and aftermarket car spare parts sourced from verified suppliers in China and delivered to Ghana. Send your vehicle details and we will match the exact part.",
};

const partTypes = [
  "Engine parts",
  "Suspension parts",
  "Brake systems",
  "Electrical components",
  "Body parts",
  "Transmission parts",
  "Filters",
  "Bearings",
  "Lighting systems",
  "Accessories",
];

const assurances = [
  {
    title: "Supplier verification",
    body: "Background checks, business registration, factory capability and product quality confirmed before we buy anything.",
  },
  {
    title: "Price negotiation",
    body: "We negotiate directly with suppliers for competitive pricing without dropping below your quality requirements.",
  },
  {
    title: "Quality inspection",
    body: "Parts are inspected against your specification before they ship, so mistakes are caught in China, not in Accra.",
  },
  {
    title: "Shipping & customs",
    body: "Air freight, sea freight, consolidated and full container options, with documentation and customs coordination.",
  },
];

export default async function SparePartsPage() {
  const faqs = await getFaqs();
  return (
    <>
      {/* The away colorway. Same catalogue, different buyer. */}
      <section className="ground bg-cream-sheet text-ink">
        <div className="mx-auto max-w-[1400px] px-5 pt-16 pb-16 sm:px-8 lg:px-12 lg:pt-24">
          <Press as="h1" className="display display-xl max-w-[15ch]">
            Car spare parts, China to Ghana.
          </Press>
          <p className="prose-measure mt-8 text-[1.0625rem] text-ink">
            You already know the part you need. We find it, verify the
            supplier, negotiate the price, inspect it before it ships, and
            coordinate delivery. Whether you are a vehicle owner, a mechanic, a
            parts dealer or a fleet manager.
          </p>
          <a
            href="#request"
            className="micro mt-10 inline-block bg-cream px-8 py-4 text-olive no-underline transition-colors hover:bg-cream-dim"
          >
            Request a part
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-20">
          <div>
            <Press as="h2" className="display display-lg">What we source.</Press>
            <ul className="mt-10 grid gap-x-10 sm:grid-cols-2">
              {partTypes.map((part) => (
                <li
                  key={part}
                  className="rule-hair py-4 text-[1.0625rem] text-ink"
                >
                  {part}
                </li>
              ))}
            </ul>
            <p className="prose-measure mt-8 text-[1rem] text-ink">
              Used parts can be sourced as well. Say so in your request and we
              will price both.
            </p>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Press as="h2" className="display display-sm">
              Why the chassis number matters.
            </Press>
            <p className="prose-measure mt-5 text-[1.0625rem] text-ink">
              The same model can carry different parts depending on build year,
              trim and market. Your chassis or VIN is what lets us match the
              exact part instead of one that nearly fits. It is on your
              insurance papers, or on the driver-side door frame.
            </p>
          </aside>
        </div>
      </section>

      <section className="ground bg-cream-sheet text-ink">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <Press as="h2" className="display display-lg">How we protect the order.</Press>
          <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {assurances.map((item) => (
              <div key={item.title}>
                <h3 className="display display-sm">{item.title}</h3>
                <p className="prose-measure mt-3 text-[1.0625rem] text-ink">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="request"
        className="mx-auto max-w-[900px] scroll-mt-24 px-5 py-20 sm:px-8 lg:py-28"
      >
        <Press as="h2" className="display display-lg">Request a part.</Press>
        <p className="prose-measure mt-5 text-[1.0625rem] text-ink">
          Send the vehicle details and the part. A photo removes almost all the
          back and forth.
        </p>
        <SparePartsForm />
      </section>

      {faqs.length > 0 ? (
        <section className="mx-auto max-w-[1400px] px-5 pb-24 sm:px-8 lg:px-12">
          <Press as="h2" className="display display-lg">
            Questions we are asked.
          </Press>
          <dl className="mt-8 max-w-[70ch]">
            {faqs.map((f) => (
              <div key={f.question} className="rule-hair py-5">
                <dt className="text-[1.0625rem] font-medium">{f.question}</dt>
                <dd className="mt-2 text-[1rem] text-ink">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}
    </>
  );
}
