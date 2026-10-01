import type { Metadata } from "next";

import { FramedPanel } from "@/components/catalogue/ornament";
import { SocialIcon } from "@/components/site/social-icons";
import { Link000 } from "@/components/ui/skiper-ui/skiper40";
import { ProcurementForm } from "@/components/forms/procurement-form";
import { NOT_SUPPLIED, waLink } from "@/lib/content";
import { getFaqs, getPageCopy, getSiteSettings } from "@/lib/data";
import { Press } from "@/components/motion/press";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you are looking for. Whether you are an individual after a specific product or a business seeking an international procurement partner, send us your requirements.",
};


export default async function ContactPage() {
  const [site, copy, faqs] = await Promise.all([getSiteSettings(), getPageCopy(), getFaqs()]);
  const channels = [
    { label: "Email", value: site.contact.email, href: site.contact.email ? `mailto:${site.contact.email}` : null },
    { label: "WhatsApp", value: site.contact.whatsapp, href: waLink(site.contact.whatsapp) },
    ...(site.contact.phones.length > 0 ? site.contact.phones : [site.contact.phone]).map((p) => ({
      label: "Phone",
      value: p,
      href: p ? `tel:${p.replace(/\s/g, "")}` : null,
    })),
  ];
  return (
    <>
      <section className="ground bg-cream-sheet text-ink">
        <div className="mx-auto max-w-[1100px] px-5 py-12 sm:px-8 lg:py-16">
          <FramedPanel tone="olive">
            <p className="prose-measure text-[1.125rem] text-ink">{copy.contactIntro}</p>
          </FramedPanel>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] lg:gap-20">
          <div>
            <Press as="h1" className="display display-lg">
              Procurement request.
            </Press>
            <ProcurementForm />
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Press as="h2" className="display display-sm">Other ways to reach us.</Press>
            <dl className="mt-8">
              {channels.map((channel) => (
                <div key={channel.label + channel.value} className="rule-hair py-5">
                  <dt className="micro flex items-center gap-2 text-ink">
                    {channel.label === "WhatsApp" ? <SocialIcon name="WhatsApp" className="h-4 w-4" /> : null}
                    {channel.label}
                  </dt>
                  <dd className="mt-2 text-[1.0625rem]">
                    {channel.href ? (
                      <Link000 href={channel.href}>{channel.value}</Link000>
                    ) : (
                      <span className="micro text-ink">{NOT_SUPPLIED}</span>
                    )}
                  </dd>
                </div>
              ))}
              <div className="rule-hair py-5">
                <dt className="micro text-ink">Office</dt>
                <dd className="mt-2 text-[1.0625rem] whitespace-pre-line">
                  {site.contact.address || "Accra, Ghana"}
                  {site.contact.mapsUrl ? (
                    <>
                      {" "}
                      <Link000 href={site.contact.mapsUrl}>Map</Link000>
                    </>
                  ) : null}
                </dd>
              </div>
              {site.contact.instagram || site.contact.facebook || site.contact.tiktok ? (
                <div className="rule-hair py-5">
                  <dt className="micro text-ink">Follow</dt>
                  <dd className="mt-3 flex gap-4">
                    {site.contact.instagram ? (
                      <a href={site.contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-ink hover:text-olive">
                        <SocialIcon name="Instagram" className="h-6 w-6" />
                      </a>
                    ) : null}
                    {site.contact.facebook ? (
                      <a href={site.contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-ink hover:text-olive">
                        <SocialIcon name="Facebook" className="h-6 w-6" />
                      </a>
                    ) : null}
                    {site.contact.tiktok ? (
                      <a href={site.contact.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-ink hover:text-olive">
                        <SocialIcon name="TikTok" className="h-6 w-6" />
                      </a>
                    ) : null}
                  </dd>
                </div>
              ) : null}
              {site.contact.hours ? (
                <div className="rule-hair py-5">
                  <dt className="micro text-ink">Hours</dt>
                  <dd className="mt-2 text-[1.0625rem] whitespace-pre-line">{site.contact.hours}</dd>
                </div>
              ) : null}
            </dl>
          </aside>
        </div>
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
