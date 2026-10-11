"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/site/logo";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { SocialBadge } from "@/components/site/social-icons";
import { Link000 } from "@/components/ui/skiper-ui/skiper40";

import { socials } from "@/lib/content";
import type { SiteSettings } from "@/lib/data";


/** Pages that carry their own call to action, so the footer's is left off. */
const NO_CTA = ["/shop", "/portfolio", "/contact"];

export function SiteFooter({
  settings: site,
  legal,
}: {
  settings: SiteSettings;
  legal: { slug: string; title: string }[];
}) {
  const path = usePathname();
  const onPortfolio = path.startsWith("/portfolio");
  const showCta = !NO_CTA.some((p) => path.startsWith(p));

  return (
    <footer className={onPortfolio ? "on-burgundy bg-burgundy-deep text-cream" : "ground bg-cream-sheet text-ink"}>
      <div className="mx-auto max-w-[1400px] px-5 pt-10 sm:pt-16 pb-10 sm:px-8 lg:px-12">
        {showCta ? (
          <div className="mb-8 sm:mb-12">
            <p className="display display-lg max-w-[14ch]">Let&rsquo;s source what you need.</p>
            <Link
              href="/contact"
              className={onPortfolio ? "pill mt-5 bg-cream text-burgundy hover:bg-cream-sheet sm:mt-10" : "pill mt-5 bg-olive text-cream hover:bg-olive-deep sm:mt-10"}
            >
              Start a procurement request
            </Link>
          </div>
        ) : null}

        {/* The client's channels, one under the other, in each platform's own colours. */}
        <div className="mb-8 sm:mb-12 grid gap-8 md:grid-cols-2 md:gap-12">
        <div>
          {/* Phones: the six marks in one row, the two written contacts beneath. */}
          <div className="md:hidden">
            <ul aria-label="Social media" className="flex flex-wrap gap-3">
              {socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target={s.kind === "Email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={`${s.kind}: ${s.label}`}
                    className="block transition-opacity hover:opacity-75"
                  >
                    <SocialBadge name={s.kind} className="size-10" />
                  </a>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-1.5">
              {socials
                .filter((s) => s.kind === "WhatsApp" || s.kind === "Email")
                .map((s) => (
                  <div key={s.href} className="flex items-baseline gap-3">
                    <dt className="micro w-20 shrink-0 text-dim">{s.kind}</dt>
                    <dd className="min-w-0 text-[0.9375rem]">
                      <a href={s.href} className="no-underline hover:opacity-75">
                        {s.label}
                      </a>
                    </dd>
                  </div>
                ))}
            </dl>
          </div>

          {/* Larger screens: one under the other, each with its handle. */}
          <ul aria-label="Contact and social media" className="hidden md:flex md:flex-col md:gap-3.5">
            {socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target={s.kind === "Email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3.5 text-[1rem] no-underline transition-opacity hover:opacity-75"
                >
                  <SocialBadge name={s.kind} />
                  <span>
                    <span className="micro block text-dim">{s.kind}</span>
                    {s.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <NewsletterForm dark={onPortfolio} />
        </div>

        <div className="rule-hair grid gap-6 pt-8 sm:grid-cols-2 sm:gap-10 sm:pt-10">
          <div>
            <div className="flex items-center gap-4 sm:block">
              <Logo className="h-12 sm:h-16" />
              <div>
                <p className="micro text-dim sm:mt-4">{site.name}</p>
                <p className="micro mt-1 text-dim">{site.positioning}</p>
              </div>
            </div>
            <p className="prose-measure mt-4 text-[1rem] text-dim sm:mt-5">{site.footerLine}</p>
          </div>

          <nav aria-label="Legal" className="flex flex-row flex-wrap gap-x-5 gap-y-2 sm:flex-col sm:flex-nowrap sm:gap-2.5">
            <p className="micro w-full text-dim sm:mb-1 sm:w-auto">Legal</p>
            {legal.map((p) => (
              <Link000 key={p.slug} href={`/legal/${p.slug}`} className="text-[1rem]">
                {p.title}
              </Link000>
            ))}
          </nav>
        </div>

        <div className="rule-hair mt-8 sm:mt-12 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 pt-5 sm:pt-6">
          <p className="micro whitespace-nowrap text-dim">
            &copy; {new Date().getFullYear()} {site.name}
          </p>
          <p className="micro whitespace-nowrap text-dim">Accra, Ghana</p>
        </div>
      </div>
    </footer>
  );
}
