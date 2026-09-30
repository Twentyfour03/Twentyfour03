import type { Metadata } from "next";
import { Suspense } from "react";

import { ShopView } from "@/components/shop/shop-view";
import { getPageCopy, getShopItems, getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Furniture and home & décor from TwentyFour03 Vintage, at fixed prices in GHS. Order and pay online.",
};

export default async function ShopPage() {
  const [items, copy, settings] = await Promise.all([getShopItems(), getPageCopy(), getSiteSettings()]);
  return (
    <Suspense>
      <ShopView items={items} intro={copy.shopIntro} deliveryNote={settings.deliveryNote} />
    </Suspense>
  );
}
