"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SocialIcon, type SocialName } from "@/components/site/social-icons";
import { Link000 } from "@/components/ui/skiper-ui/skiper40";

import { NOT_SUPPLIED, waLink } from "@/lib/content";
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
  const socials: { label: SocialName; href: string | null; text: string }[] = [
    { label: "Instagram", href: site.contact.instagram, text: "Instagram" },
    { label: "Facebook", href: site.contact.facebook, text: "Facebook" },
    { label: "TikTok", href: site.contact.tiktok, text: "TikTok" },
    { label: "WhatsApp", href: waLink(site.contact.whatsapp), text: site.contact.whatsapp || "WhatsApp" },
  ];
  const shown = socials.filter((s): s is typeof s & { href: string } => Boolean(s.href));
  const onPortfolio = path.startsWith("/portfolio") || path.startsWith("/gallery");
  const showCta = !NO_CTA.some((p) => path.startsWith(p));

  return (
    <footer className={onPortfolio ? "on-burgundy bg-burgundy-deep text-cream" : "ground bg-cream-sheet text-ink"}>
      <div className="mx-auto max-w-[1400px] px-5 pt-16 pb-10 sm:px-8 lg:px-12">
        {showCta ? (
          <div className="mb-16">
            <p className="display display-lg max-w-[14ch]">Let&rsquo;s source what you need.</p>
            <Link
              href="/contact"
              className={onPortfolio ? "pill mt-10 bg-cream text-burgundy hover:bg-cream-sheet" : "pill mt-10 bg-olive text-cream hover:bg-olive-deep"}
            >
              Start a procurement request
            </Link>
          </div>
        ) : null}

        <div className="rule-hair grid gap-10 pt-10 sm:grid-cols-3">
          <div>
            <p className="mark text-[1.75rem]" data-numeral>
              {site.mark}
            </p>
            <p className="micro mt-3 text-dim">{site.name}</p>
            <p className="micro mt-1 text-dim">{site.positioning}</p>
            <p className="prose-measure mt-5 text-[1rem] text-dim">{site.footerLine}</p>
          </div>

          <nav aria-label="Policies" className="flex flex-col gap-2.5">
            <p className="micro mb-1 text-dim">Information</p>
            {legal.map((p) => (
              <Link000 key={p.slug} href={`/legal/${p.slug}`} className="text-[1rem]">
                {p.title}
              </Link000>
            ))}
          </nav>

          <div className="flex flex-col gap-2.5">
            <p className="micro mb-1 text-dim">Follow</p>
            {shown.length > 0 ? (
              shown.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex items-center gap-3 text-[1rem] no-underline transition-opacity hover:opacity-70"
                >
                  <SocialIcon name={s.label} />
                  <span>{s.text}</span>
                </a>
              ))
            ) : (
              <span className="micro text-dim">{NOT_SUPPLIED}</span>
            )}
          </div>
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
