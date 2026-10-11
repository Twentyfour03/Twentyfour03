import type { Metadata } from "next";

import { SocialBadge, type SocialName } from "@/components/site/social-icons";
import { Link000 } from "@/components/ui/skiper-ui/skiper40";
import { ProcurementForm } from "@/components/forms/procurement-form";
import { getFaqs, getPageCopy, getSiteSettings } from "@/lib/data";
import { Press } from "@/components/motion/press";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you are looking for. Whether you are an individual after a specific product or a business seeking an international procurement partner, send us your requirements.",
};

/**
 * After the client's two references: a burgundy receiver hanging on its cord
 * with the page title set beside it in capitals and one word of handwriting,
 * then the request form introduced by a card rising out of an envelope.
 */
export default async function ContactPage() {
  const [site, copy, faqs] = await Promise.all([getSiteSettings(), getPageCopy(), getFaqs()]);
  const socials = site.socials;
  return (
    <>
      {/* The paper is the photograph's own, so the receiver has no visible edge. */}
      <section className="bg-[#ebe8df] text-burgundy">
        <div className="mx-auto grid max-w-[1100px] grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-x-4 px-5 sm:gap-x-10 sm:px-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/contact/telephone.jpg"
            alt="A burgundy telephone receiver hanging by its cord"
            width={328}
            height={1165}
            className="photo-feather mx-auto h-auto w-full max-w-[13rem] self-start sm:max-w-[17rem]"
          />
          <div className="py-10">
            <h1 className="invite-caps text-[clamp(1.75rem,8.4vw,7rem)] text-burgundy">
              Contact
              <span className="block">us</span>
              <span className="invite-script -mt-[0.18em] block pl-[0.35em] text-[1.05em] font-normal">today</span>
            </h1>
            <p className="mt-6 hidden max-w-[36ch] text-[1.0625rem] text-ink sm:block">{copy.contactIntro}</p>
          </div>
        </div>
        <p className="px-5 pb-10 text-[1.0625rem] text-ink sm:hidden">{copy.contactIntro}</p>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-12 sm:py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-20">
          <div>
            {/* A card rising out of a burgundy envelope. */}
            <div className="relative mx-auto mb-14 w-full max-w-[26rem] pt-10" aria-hidden>
              <div className="relative z-0 mx-[9%] bg-[#f3efe6] px-6 pt-9 pb-[46%] text-center shadow-[0_10px_30px_-18px_rgba(0,0,0,0.5)]">
                <p className="font-[family-name:var(--font-display)] text-[clamp(1.375rem,4.6vw,1.875rem)] leading-tight text-ink">
                  Tell us what
                  <br />
                  you need.
                </p>
              </div>
              <div
                className="absolute inset-x-0 bottom-0 z-10 h-[58%] bg-burgundy"
                style={{ clipPath: "polygon(0 0, 50% 52%, 100% 0, 100% 100%, 0 100%)" }}
              />
              <div
                className="absolute inset-x-0 bottom-0 z-10 h-[58%] bg-burgundy-deep/45"
                style={{ clipPath: "polygon(0 100%, 50% 52%, 100% 100%)" }}
              />
              <p className="invite-caps absolute inset-x-0 bottom-[7%] z-20 text-center text-[0.8125rem] tracking-[0.2em] text-cream">
                {site.name}
              </p>
            </div>

            <Press as="h2" className="display display-lg">
              Procurement request.
            </Press>
            <ProcurementForm />
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Press as="h2" className="display display-sm">Other ways to reach us.</Press>
            <ul className="mt-8">
              {socials.map((s) => (
                <li key={s.href} className="rule-hair py-4">
                  <a
                    href={s.href}
                    target={s.kind === "Email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 no-underline transition-opacity hover:opacity-75"
                  >
                    <SocialBadge name={s.kind as SocialName} />
                    <span className="min-w-0">
                      <span className="micro block text-ink">{s.kind}</span>
                      <span className="block text-[1rem] break-words">{s.label}</span>
                    </span>
                  </a>
                </li>
              ))}
              <li className="rule-hair py-4">
                <p className="micro text-ink">Office</p>
                <p className="mt-2 text-[1.0625rem] whitespace-pre-line">
                  {site.contact.address || "Accra, Ghana"}
                  {site.contact.mapsUrl ? (
                    <>
                      {" "}
                      <Link000 href={site.contact.mapsUrl}>Map</Link000>
                    </>
                  ) : null}
                </p>
              </li>
              {site.contact.hours ? (
                <li className="rule-hair py-4">
                  <p className="micro text-ink">Hours</p>
                  <p className="mt-2 text-[1.0625rem] whitespace-pre-line">{site.contact.hours}</p>
                </li>
              ) : null}
            </ul>
          </aside>
        </div>
      </section>

      {faqs.length > 0 ? (
        <section className="mx-auto max-w-[1400px] px-5 pb-12 sm:pb-24 sm:px-8 lg:px-12">
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
