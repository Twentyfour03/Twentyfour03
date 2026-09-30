/**
 * Copies the placeholder content from src/lib/content.ts into the Sanity
 * dataset, once, so the client edits real entries in the Studio instead of
 * starting from blank forms.
 *
 * Safe to re-run: every document has a fixed id and is only created if it
 * does not exist. Nothing she has already edited is overwritten.
 *
 * Run with:  npm run migrate:sanity
 * Needs NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and an
 * Editor SANITY_API_TOKEN in .env.local.
 */
import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";

import {
  coreServices,
  galleryPlates,
  legalPages,
  portfolioCategories,
  process as processSteps,
  productCategories,
  services,
  site,
  values,
} from "../src/lib/content.ts";
import { DEFAULT_COPY } from "../src/lib/copy-defaults.ts";

// .env.local, read by hand so the script needs no framework.
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

const strip = (t: string) => t.replace(/\.$/, "");

/** Questions and answers taken from the client's own spare-parts document. */
const faqs = [
  ["How long does shipping take?", "Usually 30 to 45 days."],
  ["What payment methods do you accept?", "Mobile money or bank transfer. Shop items can also be paid by card online."],
  ["Can I source used parts?", "Yes. Say so in your request and we will price both."],
  ["Do you inspect goods?", "Yes. We inspect all goods before they ship and send you photos."],
  ["What if the supplier sends the wrong part?", "Because we inspect and ship the goods ourselves, it is unlikely you would receive the wrong part."],
  ["Can you ship anywhere in Ghana?", "Yes, we deliver anywhere in Ghana."],
];

type Doc = { _id: string; _type: string } & Record<string, unknown>;

const docs: Doc[] = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    name: site.name,
    positioning: site.positioning,
    tagline: site.tagline,
    footerLine: site.footerLine,
    founder: site.founder,
    founderRole: site.founderRole,
    markets: site.markets,
  },
  {
    _id: "pageCopy",
    _type: "pageCopy",
    ...DEFAULT_COPY,
    clientsCount: DEFAULT_COPY.clientsCount ?? undefined,
  },
  ...productCategories.map((c, i) => ({
    _id: `procurementCategory-${c.slug}`,
    _type: "procurementCategory",
    title: c.title,
    slug: { current: c.slug },
    body: c.body,
    dedicatedPage: c.dedicated,
    order: i + 1,
  })),
  ...services.map((s) => ({
    _id: `service-${s.ref.split("/")[1]}`,
    _type: "service",
    number: s.ref.split("/")[1],
    title: strip(s.title),
    lede: s.lede,
    items: s.items,
  })),
  ...coreServices.map((s, i) => ({
    _id: `coreService-${i + 1}`,
    _type: "coreService",
    title: s.title,
    body: s.body,
    order: i + 1,
  })),
  ...processSteps.map((p) => ({
    _id: `processStep-${p.step}`,
    _type: "processStep",
    step: p.step,
    title: strip(p.title),
    body: p.body,
  })),
  ...values.map((v, i) => ({
    _id: `value-${i + 1}`,
    _type: "value",
    title: strip(v.title),
    body: v.body,
    order: i + 1,
  })),
  ...portfolioCategories.map((title, i) => ({
    _id: `portfolioCategory-${i + 1}`,
    _type: "portfolioCategory",
    title,
    order: i + 1,
  })),
  ...galleryPlates.map((g, i) => ({
    _id: `galleryPlate-${i + 1}`,
    _type: "galleryPlate",
    title: g.title,
    caption: g.caption,
    order: i + 1,
  })),
  ...faqs.map(([question, answer], i) => ({
    _id: `faq-${i + 1}`,
    _type: "faq",
    question,
    answer,
    order: i + 1,
  })),
  ...legalPages.map((p) => ({
    _id: `legalPage-${p.slug}`,
    _type: "legalPage",
    title: p.title,
    slug: { current: p.slug },
  })),
];

async function main() {
  let created = 0;
  let skipped = 0;
  for (const doc of docs) {
    const existing = await client.getDocument(doc._id);
    if (existing) {
      skipped++;
      continue;
    }
    await client.createIfNotExists(doc);
    created++;
    console.log("created", doc._type, doc._id);
  }
  console.log(`\nDone. ${created} created, ${skipped} already existed.`);
  console.log("Shop items, portfolio projects and testimonials are left for the client to add: nothing real exists yet.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
