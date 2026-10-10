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
      <div className="mx-auto max-w-[1400px] px-5 pt-16 pb-10 sm:px-8 lg:px-12">
        {showCta ? (
          <div className="mb-12">
            <p className="display display-lg max-w-[14ch]">Let&rsquo;s source what you need.</p>
            <Link
              href="/contact"
              className={onPortfolio ? "pill mt-10 bg-cream text-burgundy hover:bg-cream-sheet" : "pill mt-10 bg-olive text-cream hover:bg-olive-deep"}
            >
              Start a procurement request
            </Link>
          </div>
        ) : null}

        {/* The client's channels, one under the other, in each platform's own colours. */}
        <div className="mb-12 grid gap-12 md:grid-cols-2">
        <ul aria-label="Contact and social media" className="flex flex-col gap-3.5">
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
        <NewsletterForm dark={onPortfolio} />
        </div>

        <div className="rule-hair grid gap-10 pt-10 sm:grid-cols-2">
          <div>
            <Logo className="h-16" />
            <p className="micro mt-4 text-dim">{site.name}</p>
            <p className="micro mt-1 text-dim">{site.positioning}</p>
            <p className="prose-measure mt-5 text-[1rem] text-dim">{site.footerLine}</p>
          </div>

          <nav aria-label="Legal" className="flex flex-col gap-2.5">
            <p className="micro mb-1 text-dim">Legal</p>
            {legal.map((p) => (
              <Link000 key={p.slug} href={`/legal/${p.slug}`} className="text-[1rem]">
                {p.title}
              </Link000>
            ))}
          </nav>
        </div>

        <div className="rule-hair mt-12 flex flex-col gap-2 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="micro text-dim">
            &copy; {new Date().getFullYear()} {site.name}
          </p>
          <p className="micro text-dim">Accra, Ghana</p>
        </div>
      </div>
    </footer>
  );
}
