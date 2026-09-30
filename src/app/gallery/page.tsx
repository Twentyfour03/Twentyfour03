import type { Metadata } from "next";
import Link from "next/link";

import { PlateTunnel } from "@/components/catalogue/plate-tunnel";
import { Press } from "@/components/motion/press";
import { getGalleryPlates } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Plates from the work: warehouses, suppliers, loading, packaging and delivered goods, from the markets we source in to arrival in Ghana.",
};

/** Burgundy and cream, the Portfolio's cloth. */
export default async function GalleryPage() {
  const galleryPlates = await getGalleryPlates();
  return (
    <div className="on-burgundy bg-burgundy-deep text-cream">
      <section className="mx-auto max-w-[1400px] px-4 pt-16 pb-12 sm:px-6 lg:px-8 lg:pt-24">
        <Press as="h1" className="display display-xl max-w-[12ch]">
          Plates from the work.
        </Press>
        <p className="mt-8 max-w-[52ch] text-[1.0625rem] text-dim">
          The route a client&rsquo;s order actually takes, one plate at a time:
          the market, the supplier, the container, the crossing, and the
          delivery. Scroll to travel down the run.
        </p>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <PlateTunnel plates={galleryPlates} />
      </section>

      <section className="mx-auto flex max-w-[1400px] flex-col gap-8 px-4 py-20 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <Press as="h2" className="display display-lg max-w-[18ch]">
          Every plate here began as a request.
        </Press>
        <Link href="/contact" className="pill shrink-0 bg-cream text-burgundy hover:bg-cream-sheet">
          Start yours
        </Link>
      </section>
    </div>
  );
}
