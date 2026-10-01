/**
 * The site's single source of content.
 *
 * Every page asks here, never Sanity directly. Each getter returns the same
 * shape the page always used, filled from Sanity when the client has entered
 * something and from the placeholders in content.ts when she has not. So the
 * site is never blank, and the placeholders disappear one document at a time
 * as she fills the Studio in.
 *
 * Reads are cached under the "sanity" tag and refreshed by the Sanity
 * webhook (src/app/api/revalidate).
 */
import { groq } from "next-sanity";

import { DEFAULT_COPY, type PageCopy } from "@/lib/copy-defaults";
import { client } from "@/sanity/client";
import { sanityConfigured } from "@/sanity/env";
import { imageUrl } from "@/sanity/image";
import {
  coreServices as coreServicesFallback,
  galleryPlates as galleryFallback,
  legalPages as legalFallback,
  lots as lotsFallback,
  portfolioCategories as portfolioCategoriesFallback,
  process as processFallback,
  productCategories as procurementFallback,
  services as servicesFallback,
  shopItems as shopFallback,
  site,
  values as valuesFallback,
  type GalleryPlate,
  type Lot,
  type ProductCategory,
  type ShopItem,
} from "@/lib/content";

const FETCH = { next: { tags: ["sanity"] }, cache: "force-cache" as const };

async function query<T>(q: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!sanityConfigured) return null;
  try {
    return await client.fetch<T>(q, params, FETCH);
  } catch (error) {
    console.error("[data] Sanity read failed, using placeholders:", error);
    return null;
  }
}

const has = <T>(rows: T[] | null | undefined): rows is T[] => Array.isArray(rows) && rows.length > 0;
const text = (v: unknown, fallback: string): string => (typeof v === "string" && v.trim() ? v : fallback);

/* ------------------------------------------------------------------ */
/* Site settings                                                        */
/* ------------------------------------------------------------------ */

export type SiteSettings = {
  name: string;
  mark: string;
  positioning: string;
  tagline: string;
  footerLine: string;
  founder: string;
  founderRole: string;
  markets: string[];
  logo: string;
  contact: {
    email: string;
    whatsapp: string;
    phone: string;
    phones: string[];
    address: string;
    mapsUrl: string;
    hours: string;
    instagram: string;
    facebook: string;
    tiktok: string;
  };
  deliveryFee: number | null;
  deliveryNote: string;
};

type SettingsDoc = Partial<{
  name: string;
  positioning: string;
  tagline: string;
  footerLine: string;
  founder: string;
  founderRole: string;
  markets: string[];
  logo: unknown;
  email: string;
  whatsapp: string;
  phones: string[];
  address: string;
  mapsUrl: string;
  hours: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  deliveryFee: number;
  deliveryNote: string;
}>;

export async function getSiteSettings(): Promise<SiteSettings> {
  const d = (await query<SettingsDoc>(groq`*[_id == "siteSettings"][0]`)) ?? {};
  const phones = has(d.phones) ? d.phones : [];
  return {
    name: text(d.name, site.name),
    mark: site.mark,
    positioning: text(d.positioning, site.positioning),
    tagline: text(d.tagline, site.tagline),
    footerLine: text(d.footerLine, site.footerLine),
    founder: text(d.founder, site.founder),
    founderRole: text(d.founderRole, site.founderRole),
    markets: has(d.markets) ? d.markets : site.markets,
    logo: imageUrl(d.logo as never, 400),
    contact: {
      email: text(d.email, site.contact.email),
      whatsapp: text(d.whatsapp, site.contact.whatsapp),
      phone: phones[0] ?? site.contact.phone,
      phones,
      address: text(d.address, ""),
      mapsUrl: text(d.mapsUrl, ""),
      hours: text(d.hours, ""),
      instagram: text(d.instagram, site.contact.instagram),
      facebook: text(d.facebook, site.contact.facebook),
      tiktok: text(d.tiktok, site.contact.tiktok),
    },
    deliveryFee: typeof d.deliveryFee === "number" ? d.deliveryFee : null,
    deliveryNote: text(d.deliveryNote, ""),
  };
}

/* ------------------------------------------------------------------ */
/* Page text                                                            */
/* ------------------------------------------------------------------ */



export type { PageCopy };

export async function getPageCopy(): Promise<PageCopy> {
  const d = (await query<Partial<PageCopy>>(groq`*[_id == "pageCopy"][0]`)) ?? {};
  return {
    homeIntro: text(d.homeIntro, DEFAULT_COPY.homeIntro),
    homeCaption: text(d.homeCaption, DEFAULT_COPY.homeCaption),
    aboutIntro: has(d.aboutIntro) ? d.aboutIntro : DEFAULT_COPY.aboutIntro,
    aboutObjective: text(d.aboutObjective, DEFAULT_COPY.aboutObjective),
    mission: text(d.mission, DEFAULT_COPY.mission),
    vision: text(d.vision, DEFAULT_COPY.vision),
    servicesIntro: text(d.servicesIntro, DEFAULT_COPY.servicesIntro),
    shopIntro: text(d.shopIntro, DEFAULT_COPY.shopIntro),
    portfolioHeading: text(d.portfolioHeading, DEFAULT_COPY.portfolioHeading),
    portfolioOpening: text(d.portfolioOpening, DEFAULT_COPY.portfolioOpening),
    portfolioStory: has(d.portfolioStory) ? d.portfolioStory : DEFAULT_COPY.portfolioStory,
    portfolioQuote: text(d.portfolioQuote, DEFAULT_COPY.portfolioQuote),
    clientsCount: typeof d.clientsCount === "number" ? d.clientsCount : DEFAULT_COPY.clientsCount,
    contactIntro: text(d.contactIntro, DEFAULT_COPY.contactIntro),
    welcomeTitle: text(d.welcomeTitle, DEFAULT_COPY.welcomeTitle),
    welcomeBody: text(d.welcomeBody, DEFAULT_COPY.welcomeBody),
  };
}

/* ------------------------------------------------------------------ */
/* Shop                                                                 */
/* ------------------------------------------------------------------ */

type ShopDoc = {
  _id: string;
  name: string;
  category: ShopItem["category"];
  price?: number;
  images?: unknown[];
  description?: string;
};

/** In-stock items only. Prices come from here and nowhere else. */
export async function getShopItems(): Promise<ShopItem[]> {
  const rows = await query<ShopDoc[]>(
    groq`*[_type == "shopItem" && inStock != false] | order(order asc, _createdAt asc){
      _id, name, category, price, images, description
    }`,
  );
  if (!has(rows)) return shopFallback;
  return rows.map((r) => ({
    id: r._id,
    name: r.name,
    category: r.category,
    price: typeof r.price === "number" ? r.price : null,
    image: imageUrl(r.images?.[0] as never, 900),
    note: r.description,
  }));
}

type CategoryDoc = { _id: string; title: string; slug?: { current?: string }; body?: string; image?: unknown; dedicatedPage?: string };

export async function getProcurementCategories(): Promise<(ProductCategory & { image: string })[]> {
  const rows = await query<CategoryDoc[]>(
    groq`*[_type == "procurementCategory"] | order(order asc, _createdAt asc){ _id, title, slug, body, image, dedicatedPage }`,
  );
  if (!has(rows)) return procurementFallback.map((c) => ({ ...c, image: "" }));
  return rows.map((r, i) => ({
    ref: `C.${String(i + 1).padStart(2, "0")}`,
    slug: r.slug?.current ?? r._id,
    title: r.title,
    body: r.body ?? "",
    fromPrice: null,
    dedicated: r.dedicatedPage || undefined,
    image: imageUrl(r.image as never, 900),
  }));
}

/* ------------------------------------------------------------------ */
/* Services, process, values                                            */
/* ------------------------------------------------------------------ */

export type Service = { ref: string; title: string; lede: string; items: string[] };

export async function getServices(): Promise<Service[]> {
  const rows = await query<{ number: string; title: string; lede?: string; items?: string[] }[]>(
    groq`*[_type == "service"] | order(number asc){ number, title, lede, items }`,
  );
  if (!has(rows)) return servicesFallback;
  return rows.map((r) => ({ ref: `24.03/${r.number}`, title: r.title, lede: r.lede ?? "", items: r.items ?? [] }));
}

export async function getCoreServices(): Promise<{ ref: string; title: string; body: string }[]> {
  const rows = await query<{ title: string; body?: string }[]>(
    groq`*[_type == "coreService"] | order(order asc, _createdAt asc){ title, body }`,
  );
  if (!has(rows)) return coreServicesFallback;
  return rows.map((r, i) => ({ ref: `S.${String(i + 1).padStart(2, "0")}`, title: r.title, body: r.body ?? "" }));
}

export type ProcessStep = { step: string; title: string; body: string; image: string };

export async function getProcess(): Promise<ProcessStep[]> {
  const rows = await query<{ step: string; title: string; body?: string; image?: unknown }[]>(
    groq`*[_type == "processStep"] | order(step asc){ step, title, body, image }`,
  );
  if (!has(rows)) return processFallback.map((p) => ({ ...p, image: "" }));
  return rows.map((r) => ({ step: r.step, title: r.title, body: r.body ?? "", image: imageUrl(r.image as never, 900) }));
}

export async function getValues(): Promise<{ title: string; body: string }[]> {
  const rows = await query<{ title: string; body?: string }[]>(
    groq`*[_type == "value"] | order(order asc, _createdAt asc){ title, body }`,
  );
  if (!has(rows)) return valuesFallback;
  return rows.map((r) => ({ title: r.title, body: r.body ?? "" }));
}

/* ------------------------------------------------------------------ */
/* Portfolio, gallery, testimonials, FAQ                                 */
/* ------------------------------------------------------------------ */

export type Project = Lot & {
  requirements: string;
  productsSourced: string;
  quantity: string;
  marketResearched: string;
  result: string;
  images: string[];
};

type ProjectDoc = {
  _id: string;
  title: string;
  client?: string;
  location?: string;
  source?: string;
  category?: { title?: string };
  requirements?: string;
  productsSourced?: string;
  quantity?: string;
  marketResearched?: string;
  result?: string;
  images?: unknown[];
};

export async function getProjects(): Promise<Project[]> {
  const rows = await query<ProjectDoc[]>(
    groq`*[_type == "portfolioProject"] | order(order asc, _createdAt asc){
      _id, title, client, location, source, "category": category->{title},
      requirements, productsSourced, quantity, marketResearched, result, images
    }`,
  );
  if (!has(rows)) {
    return lotsFallback.map((l) => ({
      ...l,
      requirements: "",
      productsSourced: "",
      quantity: "",
      marketResearched: "",
      result: "",
      images: [],
    }));
  }
  return rows.map((r, i) => ({
    ref: `LOT ${String(i + 1).padStart(3, "0")}`,
    title: r.title,
    client: r.client ?? "",
    location: r.location ?? "Ghana",
    source: r.source ?? "",
    category: r.category?.title ?? "",
    summary: r.result || r.requirements || "",
    placeholder: false,
    requirements: r.requirements ?? "",
    productsSourced: r.productsSourced ?? "",
    quantity: r.quantity ?? "",
    marketResearched: r.marketResearched ?? "",
    result: r.result ?? "",
    images: (r.images ?? []).map((img) => imageUrl(img as never, 1200)).filter(Boolean),
  }));
}

export async function getPortfolioCategories(): Promise<string[]> {
  const rows = await query<{ title: string }[]>(
    groq`*[_type == "portfolioCategory"] | order(order asc, _createdAt asc){ title }`,
  );
  return has(rows) ? rows.map((r) => r.title) : portfolioCategoriesFallback;
}

export async function getGalleryPlates(): Promise<GalleryPlate[]> {
  const rows = await query<{ title: string; caption?: string; image?: unknown }[]>(
    groq`*[_type == "galleryPlate"] | order(order asc, _createdAt asc){ title, caption, image }`,
  );
  if (!has(rows)) return galleryFallback;
  const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
  return rows.map((r, i) => ({
    ref: `PL. ${roman[i] ?? i + 1}`,
    title: r.title,
    caption: r.caption ?? "",
    src: imageUrl(r.image as never, 1400),
  }));
}

export type Testimonial = { quote: string; name: string; company: string };

/** Only what the client has entered. No placeholders here, ever. */
export async function getTestimonials(): Promise<Testimonial[]> {
  const rows = await query<{ quote: string; name: string; company?: string }[]>(
    groq`*[_type == "testimonial"] | order(order asc, _createdAt asc){ quote, name, company }`,
  );
  return has(rows) ? rows.map((r) => ({ quote: r.quote, name: r.name, company: r.company ?? "" })) : [];
}

export type Faq = { question: string; answer: string };

export async function getFaqs(): Promise<Faq[]> {
  const rows = await query<Faq[]>(groq`*[_type == "faq"] | order(order asc, _createdAt asc){ question, answer }`);
  return has(rows) ? rows : [];
}

/* ------------------------------------------------------------------ */
/* Policy pages                                                         */
/* ------------------------------------------------------------------ */

export type LegalPage = { slug: string; title: string; body: unknown[] | null; paragraphs: string[] };

export async function getLegalPages(): Promise<{ slug: string; title: string }[]> {
  const rows = await query<{ title: string; slug: { current: string } }[]>(
    groq`*[_type == "legalPage" && defined(slug.current)] | order(_createdAt asc){ title, slug }`,
  );
  return has(rows) ? rows.map((r) => ({ slug: r.slug.current, title: r.title })) : legalFallback;
}

export async function getLegalPage(slug: string): Promise<LegalPage | null> {
  const doc = await query<{ title: string; body?: unknown[] }>(
    groq`*[_type == "legalPage" && slug.current == $slug][0]{ title, body }`,
    { slug },
  );
  if (doc) return { slug, title: doc.title, body: has(doc.body) ? doc.body : null, paragraphs: [] };
  const fallback = legalFallback.find((p) => p.slug === slug);
  return fallback ? { slug, title: fallback.title, body: null, paragraphs: fallback.body } : null;
}
