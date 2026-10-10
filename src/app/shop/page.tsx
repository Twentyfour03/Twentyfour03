import type { Metadata } from "next";
import { Suspense } from "react";

import { ShopView } from "@/components/shop/shop-view";
import { getRates } from "@/lib/currency";
import { getPageCopy, getShopItems } from "@/lib/data";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Furniture and home & décor from TwentyFour03 Vintage, at fixed prices in GHS. Order and pay online.",
};

export default async function ShopPage() {
  const [items, copy, rates] = await Promise.all([getShopItems(), getPageCopy(), getRates()]);
  return (
    <Suspense>
      <ShopView items={items} intro={copy.shopIntro} rates={rates} />
    </Suspense>
  );
}
