import type { Metadata } from "next";
import { Bodoni_Moda, Fredoka, Jost, Mrs_Saint_Delafield, Playfair_Display } from "next/font/google";

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

const delafield = Mrs_Saint_Delafield({
  variable: "--font-delafield",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700", "800"],
});

const SITE_URL = "https://www.twentyfour03vintage.org";
const DESCRIPTION =
  "A procurement and sourcing agency connecting individuals and businesses in Ghana to products and suppliers across China, the UAE, the UK and Europe.";

export const metadata: Metadata = {
  // Makes the icon and share-image addresses absolute, which link previews
  // in WhatsApp, iMessage and social apps require.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TwentyFour03 Vintage — Global Procurement & Sourcing Agency",
    template: "%s · TwentyFour03 Vintage",
  },
  description: DESCRIPTION,
  applicationName: "TwentyFour03 Vintage",
  // The icons and the share image are the files beside this one:
  // favicon.ico, icon.png, apple-icon.png and opengraph-image.png.
  openGraph: {
    type: "website",
    siteName: "TwentyFour03 Vintage",
    title: "TwentyFour03 Vintage — Global Procurement & Sourcing Agency",
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_GH",
  },
  twitter: {
    card: "summary_large_image",
    title: "TwentyFour03 Vintage — Global Procurement & Sourcing Agency",
    description: DESCRIPTION,
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [settings, copy, legal] = await Promise.all([getSiteSettings(), getPageCopy(), getLegalPages()]);
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${jost.variable} ${fredoka.variable} ${playfair.variable} ${delafield.variable} h-full antialiased`}
    >
      <body className="ground flex min-h-full flex-col bg-cream p-[var(--frame)] text-ink">
        <PageFrame />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter settings={settings} legal={legal} />
        <WelcomeDialog
          name={settings.name}
          title={copy.welcomeTitle}
          body={copy.welcomeBody}
        />
        <CookieNotice />
      </body>
    </html>
  );
}
