import type { Metadata } from "next";

import { GalleryGrid } from "@/components/catalogue/gallery-grid";
import { Press } from "@/components/motion/press";
import { getGalleryPlates } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs from the factories, warehouses and markets TwentyFour03 Vintage sources in: goods checked at the supplier before they ship to Ghana.",
};

/** On the site's own beige, like every page but the Portfolio. */
export default async function GalleryPage() {
  const galleryPlates = await getGalleryPlates();
  return (
    <div>
      <section className="mx-auto max-w-[1400px] px-5 pt-10 sm:pt-16 pb-12 sm:px-6 lg:px-8 lg:pt-24">
        <Press as="h1" className="display display-xl max-w-[12ch]">
          From the source.
        </Press>
        <p className="mt-8 max-w-[52ch] text-[1.0625rem] text-ink">
          Inside the factories, warehouses and markets we buy from: goods
          checked at the supplier before they ship. Tap any photo for a
          closer look.
        </p>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-12 sm:pb-20 sm:px-6 lg:px-8">
        <GalleryGrid plates={galleryPlates} />
      </section>
    </div>
  );
}
