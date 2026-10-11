/**
 * Moves the shop catalogue from src/lib/content.ts into Sanity, photos
 * included, so the client can edit items, prices and photos in the Studio.
 *
 * The site shows the code catalogue only while Sanity has no visible shop
 * item, so a half-finished upload must never be visible. This runs in two
 * steps:
 *
 *   npm run migrate:shop            upload everything, hidden (inStock: false)
 *   npm run migrate:shop -- reveal  switch every migrated item on, in one transaction
 *
 * Safe to re-run: items keep their ids, existing documents are left alone,
 * and Sanity stores an identical photo only once.
 */
import { createReadStream, existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

import { furnitureColours, shopItems, socials } from "../src/lib/content.ts";

for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const m = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim());
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, "");
}
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_TOKEN;
if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local");
  process.exit(1);
}
const client = createClient({ projectId, dataset, token, apiVersion: "2026-09-30", useCdn: false });
const ids = shopItems.map((i) => i.id);

async function upload() {
  let created = 0;
  let skipped = 0;
  let photos = 0;
  for (const [index, item] of shopItems.entries()) {
    if (await client.getDocument(item.id)) {
      skipped++;
      continue;
    }
    const files = item.images && item.images.length > 0 ? item.images : item.image ? [item.image] : [];
    const images = [];
    for (const [n, file] of files.entries()) {
      const onDisk = path.join("public", file);
      if (!existsSync(onDisk)) {
        console.warn("  missing photo, skipped:", onDisk);
        continue;
      }
      const asset = await client.assets.upload("image", createReadStream(onDisk), { filename: path.basename(onDisk) });
      images.push({ _key: `photo${n}`, _type: "image", asset: { _type: "reference", _ref: asset._id } });
      photos++;
    }
    await client.createIfNotExists({
      _id: item.id,
      _type: "shopItem",
      name: item.name,
      slug: { _type: "slug", current: item.id },
      category: item.category,
      ...(item.price !== null ? { price: item.price } : {}),
      images,
      ...(item.note ? { note: item.note } : {}),
      colourChoice: item.colours ? "standard" : "none",
      inStock: false, // hidden until the reveal step
      order: index + 1,
    });
    created++;
    console.log(`created ${String(index + 1).padStart(2)}/${shopItems.length}  ${item.id}  (${images.length} photo${images.length === 1 ? "" : "s"})`);
  }

  // The standard colour list and the social links, only where the Studio has none yet.
  await client.createIfNotExists({ _id: "siteSettings", _type: "siteSettings" });
  await client
    .patch("siteSettings")
    .setIfMissing({
      furnitureColours: [...furnitureColours],
      socials: socials.map((s, n) => ({ _key: `social${n}`, _type: "socialLink", kind: s.kind, label: s.label, href: s.href })),
    })
    .commit();

  console.log(`\nUploaded. ${created} items created, ${skipped} already existed, ${photos} photos uploaded.`);
  console.log("Nothing is visible yet. Run `npm run migrate:shop -- reveal` to switch them on.");
}

async function reveal() {
  const existing = await client.fetch<string[]>(`*[_type == "shopItem" && _id in $ids]._id`, { ids });
  if (existing.length !== ids.length) {
    console.error(`Only ${existing.length} of ${ids.length} items are in Sanity. Run the upload step first.`);
    process.exit(1);
  }
  const tx = client.transaction();
  for (const id of ids) tx.patch(id, (p) => p.set({ inStock: true }));
  await tx.commit();
  console.log(`Revealed ${ids.length} items in one transaction.`);
}

(process.argv.includes("reveal") ? reveal() : upload()).catch((error) => {
  console.error(error);
  process.exit(1);
});
