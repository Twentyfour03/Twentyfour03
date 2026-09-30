import type { Metadata } from "next";
import { Bodoni_Moda, Fredoka, Jost, Playfair_Display } from "next/font/google";

import { CookieNotice } from "@/components/site/cookie-notice";
import { PageFrame } from "@/components/site/page-frame";
import { WelcomeDialog } from "@/components/site/welcome-dialog";
import { getLegalPages, getPageCopy, getSiteSettings } from "@/lib/data";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "800", "900"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "TwentyFour03 Vintage — Global Procurement & Sourcing Agency",
    template: "%s · TwentyFour03 Vintage",
  },
  description:
    "A procurement and sourcing agency connecting individuals and businesses in Ghana to products and suppliers across China, the UAE, the UK and Europe.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [settings, copy, legal] = await Promise.all([getSiteSettings(), getPageCopy(), getLegalPages()]);
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${jost.variable} ${fredoka.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="ground flex min-h-full flex-col bg-cream p-[var(--frame)] text-ink">
        <PageFrame />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter settings={settings} legal={legal} />
        <WelcomeDialog
          name={settings.name}
          mark={settings.mark}
          title={copy.welcomeTitle}
          body={copy.welcomeBody}
        />
        <CookieNotice />
      </body>
    </html>
  );
}
