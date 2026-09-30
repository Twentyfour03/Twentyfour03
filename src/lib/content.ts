/**
 * Placeholders and fixed structure.
 *
 * Pages do not read this file directly any more: they call src/lib/data.ts,
 * which reads Sanity first and falls back to what is here when the client
 * has not entered a document yet. Edit content in the Studio (/studio), not
 * here. Only nav, category slugs and the placeholders live in this file.
 */

export const site = {
  name: "TwentyFour03 Vintage",
  mark: "24.03",
  positioning: "Global Procurement & Sourcing Agency",
  tagline: "Sourcing Globally. Procuring Strategically. Delivering With Confidence.",
  footerLine: "Connecting you to products, suppliers and opportunities worldwide.",
  founder: "Nana Ama Nyame Adu-Poku",
  founderRole: "Founder & Procurement Officer",
  markets: ["China", "UAE", "Ghana", "Europe", "UK", "Global Markets"],
  /**
   * PLACEHOLDER — the client has not supplied any of these yet.
   * An empty string means "not supplied", and the UI says so plainly rather
   * than printing a plausible dead number. Fill these in and every surface
   * that uses them turns on by itself.
   */
  contact: {
    email: "",
    whatsapp: "",
    phone: "",
    instagram: "",
    facebook: "",
    tiktok: "",
  },
};

/** Shown wherever a contact detail has not been supplied yet. */
export const NOT_SUPPLIED = "To be confirmed";

export function waLink(number: string): string | null {
  const digits = number.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : null;
}

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/shop", label: "Shop" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

/** Home — the six short cards under "What We Do". */
export const coreServices = [
  {
    ref: "S.01",
    title: "Global Product Sourcing",
    body: "We locate products and suppliers based on your specifications, quantity, quality requirements, and budget.",
  },
  {
    ref: "S.02",
    title: "Procurement Services",
    body: "We manage the purchasing process on behalf of individuals and businesses.",
  },
  {
    ref: "S.03",
    title: "Supplier Sourcing",
    body: "We identify and connect clients with manufacturers, wholesalers, distributors, and suppliers.",
  },
  {
    ref: "S.04",
    title: "China Sourcing",
    body: "We help clients access China's extensive manufacturing and wholesale markets.",
  },
  {
    ref: "S.05",
    title: "UAE, UK & Europe Sourcing",
    body: "We source fashion, lifestyle, commercial, luxury, and specialty products from the UAE, UK & Europe.",
  },
  {
    ref: "S.06",
    title: "Business Procurement",
    body: "We support businesses with recurring or one-time procurement requirements.",
  },
];

/** Services page — the eight full entries. */
export const services = [
  {
    ref: "24.03/01",
    title: "Product Sourcing.",
    lede: "Looking for a particular product? We search international markets against your brief.",
    items: [
      "Product specifications",
      "Quantity",
      "Budget",
      "Quality requirements",
      "Preferred market",
      "Delivery requirements",
    ],
  },
  {
    ref: "24.03/02",
    title: "Supplier Sourcing.",
    lede: "We help businesses identify potential suppliers and manufacturers for their products.",
    items: [
      "Supplier research",
      "Manufacturer identification",
      "Wholesale sourcing",
      "Product comparisons",
      "Supplier communication",
      "Pricing inquiries",
      "Product specifications",
    ],
  },
  {
    ref: "24.03/03",
    title: "China Procurement.",
    lede: "China is one of our key sourcing markets. We assist clients with sourcing across its manufacturing and wholesale base.",
    items: [
      "Furniture",
      "Construction materials",
      "Machinery",
      "Electronics",
      "Fashion",
      "Packaging",
      "Homeware",
      "Commercial equipment",
      "Beauty equipment",
      "Technology products",
      "Retail products",
      "Custom products",
    ],
  },
  {
    ref: "24.03/04",
    title: "UAE, Europe & UK Procurement.",
    lede: "We assist clients looking to source products from the UAE, Europe and the UK.",
    items: [
      "Fashion",
      "Luxury goods",
      "Furniture",
      "Electronics",
      "Lifestyle products",
      "Automotive-related products",
      "Commercial products",
      "Specialty items",
    ],
  },
  {
    ref: "24.03/05",
    title: "Business Procurement.",
    lede: "For companies that need products, equipment, or supplies on a one-time or recurring basis.",
    items: [
      "Product identification",
      "Supplier research",
      "Pricing",
      "Procurement",
      "Coordination",
      "Shipping & delivery",
    ],
  },
  {
    ref: "24.03/06",
    title: "Bulk & Wholesale Sourcing.",
    lede: "Need products in large quantities? We help businesses and retailers identify suitable wholesale and manufacturing sources.",
    items: [
      "Retail businesses",
      "Online stores",
      "Supermarkets",
      "Restaurants",
      "Hotels",
      "Boutiques",
      "Construction companies",
      "Startups",
      "Entrepreneurs",
    ],
  },
  {
    ref: "24.03/07",
    title: "Furniture & Interior Procurement.",
    lede: "Source furniture and interior products for residential, commercial and hospitality projects.",
    items: [
      "Homes",
      "Offices",
      "Hotels",
      "Restaurants",
      "Airbnb properties",
      "Commercial spaces",
      "Real estate projects",
    ],
  },
  {
    ref: "24.03/08",
    title: "Construction & Project Procurement.",
    lede: "Equipment, materials and fixtures for construction and development projects.",
    items: [
      "Construction equipment",
      "Tools",
      "Machinery",
      "Fixtures",
      "Finishing materials",
      "Lighting",
      "Plumbing products",
      "Electrical products",
      "Doors",
      "Windows",
      "Furniture",
      "Building accessories",
    ],
  },
];

/** The six-step procurement process. The sequence carries real information. */
export const process = [
  {
    step: "01",
    title: "Send us your request.",
    body: "Tell us what you need, including specifications, quantity, budget, and preferred market.",
  },
  {
    step: "02",
    title: "We research.",
    body: "Our team searches relevant international markets and identifies suitable products and suppliers.",
  },
  {
    step: "03",
    title: "We compare.",
    body: "We evaluate available options on budget, price, quality, specifications, supplier information, minimum order quantity and availability.",
  },
  {
    step: "04",
    title: "You approve.",
    body: "We present the available options and associated costs for your consideration.",
  },
  {
    step: "05",
    title: "We procure.",
    body: "Once approved, we coordinate the procurement process.",
  },
  {
    step: "06",
    title: "We coordinate delivery.",
    body: "We assist with the logistics and shipping coordination to get your goods to their destination.",
  },
];

export const values = [
  {
    title: "Integrity.",
    body: "We prioritize transparency throughout the sourcing and procurement process.",
  },
  {
    title: "Reliability.",
    body: "We take responsibility for coordinating each assignment professionally.",
  },
  {
    title: "Quality.",
    body: "We consider product specifications, supplier credibility, and quality requirements.",
  },
  {
    title: "Efficiency.",
    body: "We help clients save time by managing the sourcing process.",
  },
  {
    title: "Global Access.",
    body: "We connect clients to markets and suppliers beyond their immediate reach.",
  },
];

export const mission =
  "To connect individuals and businesses to global products, suppliers, and opportunities through reliable and professional procurement and sourcing solutions.";

export const vision =
  "To become a trusted African procurement and sourcing agency connecting businesses and individuals to quality products and suppliers worldwide.";

export type ProductCategory = {
  ref: string;
  slug: string;
  title: string;
  body: string;
  /** null means quote-only. A number means she holds stock at that price. */
  fromPrice: number | null;
  dedicated?: string;
};

/**
 * Procurement lines: sourced to order and quoted, never priced on the site.
 * Furniture and Home & Décor are NOT here. They are fixed-price shop stock
 * (see shopCategories below).
 */
export const productCategories: ProductCategory[] = [
  {
    ref: "C.01",
    slug: "cars-spare-parts",
    title: "Cars & Spare Parts",
    body: "Genuine and aftermarket parts sourced from verified suppliers across China, with vehicle details matched before anything is bought.",
    fromPrice: null,
    dedicated: "/spare-parts",
  },
  {
    ref: "C.02",
    slug: "construction-machinery",
    title: "Construction & Machinery",
    body: "Construction materials, industrial and commercial machinery, tools and equipment for businesses and projects.",
    fromPrice: null,
  },
  {
    ref: "C.03",
    slug: "fashion",
    title: "Fashion",
    body: "Fashion, footwear and accessories, from single pieces to retail inventory.",
    fromPrice: null,
  },
];

/** The shop: fixed-price stock the client holds and sells online. */
export const shopCategories = [
  {
    slug: "furniture",
    title: "Furniture",
    body: "Pieces in stock, at a fixed price, ready to order.",
  },
  {
    slug: "home-decor",
    title: "Home & Décor",
    body: "Homeware, lighting and interior pieces, at a fixed price.",
  },
] as const;

export type ShopCategorySlug = (typeof shopCategories)[number]["slug"];

export type ShopItem = {
  id: string;
  category: ShopCategorySlug;
  name: string;
  /** GHS. null means the client has not supplied the price yet: not orderable. */
  price: number | null;
  /** Path under /public once supplied. Empty means the photo is to come. */
  image: string;
  note?: string;
};

/**
 * PLACEHOLDER: the client will supply the real stock list, photos and fixed
 * prices. Until a price is filled in, an item shows but cannot be ordered.
 */
export const shopItems: ShopItem[] = [
  ...[1, 2, 3, 4].map((n) => ({
    id: `furniture-${n}`,
    category: "furniture" as const,
    name: "Piece to follow",
    price: null,
    image: "",
  })),
  ...[1, 2, 3, 4].map((n) => ({
    id: `home-decor-${n}`,
    category: "home-decor" as const,
    name: "Piece to follow",
    price: null,
    image: "",
  })),
];

export const portfolioCategories = [
  "Furniture & Interiors",
  "Construction & Real Estate",
  "Business Equipment",
  "Retail & Wholesale",
  "Fashion & Lifestyle",
  "Technology & Electronics",
  "Machinery & Tools",
  "Custom Procurement",
];

export type Lot = {
  ref: string;
  title: string;
  client: string;
  location: string;
  source: string;
  category: string;
  summary: string;
  placeholder: boolean;
};

/**
 * PLACEHOLDER — the client has promised real case studies with photographs.
 * These carry the correct shape so she can replace them one at a time in the CMS.
 */
export const lots: Lot[] = [
  {
    ref: "LOT 001",
    title: "Furniture Procurement",
    client: "Residential / Commercial Client",
    location: "Ghana",
    source: "China",
    category: "Furniture & Interiors",
    summary:
      "Client requirements, products sourced, quantity, market researched and the final result, recorded as a single entry.",
    placeholder: true,
  },
  {
    ref: "LOT 002",
    title: "Business Equipment Procurement",
    client: "Commercial Client",
    location: "Ghana",
    source: "China",
    category: "Business Equipment",
    summary: "Equipment sourced and coordinated on behalf of a business.",
    placeholder: true,
  },
  {
    ref: "LOT 003",
    title: "Construction Procurement",
    client: "Project Client",
    location: "Ghana",
    source: "China",
    category: "Construction & Real Estate",
    summary: "Tools, machinery, materials and fixtures for a construction project.",
    placeholder: true,
  },
  {
    ref: "LOT 004",
    title: "Fashion & Retail Procurement",
    client: "Retail Client",
    location: "Ghana",
    source: "UAE",
    category: "Retail & Wholesale",
    summary: "Bulk clothing, footwear and accessories sourced as retail inventory.",
    placeholder: true,
  },
  {
    ref: "LOT 005",
    title: "Custom Product Sourcing",
    client: "Private Client",
    location: "Ghana",
    source: "Global Markets",
    category: "Custom Procurement",
    summary: "A hard-to-find product located and procured to specification.",
    placeholder: true,
  },
];

/** The founder's story, as she wrote it. */
export const founderStory = {
  heading: "From personal shopping to global procurement.",
  opening: "Hi, I'm Nana Ama.",
  paragraphs: [
    "My journey into sourcing and procurement began long before TwentyFour03 Vintage became a business. Born and raised in Ghana, I have always been drawn to the world beyond borders. I moved to Dubai to study Law with International Relations, fascinated by the connections between countries, cultures, people, and global markets. Living in Dubai exposed me to a world of international commerce, luxury, fashion, and endless possibilities, and it was there that I began to discover my natural talent for sourcing.",
    "What started with friends and family asking me to bring back exclusive pieces from Dubai soon became something much bigger. I began sourcing designer pieces and luxury fragrances to statement accessories and hard-to-find products. I developed a passion for finding exactly what people were looking for. I quickly realized that personal shopping was about more than buying beautiful things. It required understanding markets, identifying reliable suppliers, negotiating prices, comparing quality, managing logistics, and finding the right products for the right client.",
    "That realization became the foundation for TwentyFour03 Vintage. What began as a personal shopping and vintage sourcing business has evolved into a procurement and global sourcing agency, helping individuals and businesses access products and suppliers across international markets.",
    "Today, as Founder and Procurement Officer, I work across sourcing, procurement, supplier research, product identification, purchasing, and international market coordination. My experience and my exposure to international trade have shaped the way I approach procurement, with curiosity, attention to detail, cultural awareness, and a strong understanding of the importance of trust.",
    "My work has expanded beyond fashion. Today, TwentyFour03 sources furniture, home and lifestyle products, business supplies, equipment, construction-related products, retail goods, fashion, and specialty items. Whether a client needs a single hard-to-find product or is looking to source in bulk, my role is to bridge the gap between what they need and where they can find it.",
    "I believe good procurement is about more than finding the cheapest option. It is about finding the right product, identifying the right supplier, understanding the market, assessing quality and value, and coordinating the process from sourcing to delivery.",
  ],
  pullQuote:
    "I don't simply shop for my clients. I source, procure, and connect them to the world.",
};

export const productCategoryNames = [...productCategories.map((c) => c.title), "Other"];

export const sourcingMarkets = [
  "China",
  "UAE",
  "United Kingdom",
  "Europe",
  "Ghana",
  "Other / not sure",
];

export type GalleryPlate = {
  ref: string;
  title: string;
  caption: string;
  /** Path under /public once supplied. Empty means the plate is still to come. */
  src: string;
};

/**
 * PLACEHOLDER — the client listed these subjects but has supplied no
 * photographs. Each plate keeps its caption so the tunnel reads correctly
 * while empty, and filling `src` turns the plate into a real photograph
 * with no other change.
 */
export const galleryPlates: GalleryPlate[] = [
  {
    ref: "PL. I",
    title: "Warehouses",
    caption: "Goods consolidated before they ship.",
    src: "",
  },
  {
    ref: "PL. II",
    title: "Suppliers",
    caption: "Verified before a single order is placed.",
    src: "",
  },
  {
    ref: "PL. III",
    title: "Loading",
    caption: "Containers filled and sealed for the voyage.",
    src: "",
  },
  {
    ref: "PL. IV",
    title: "Packaging",
    caption: "Inspected and wrapped against the crossing.",
    src: "",
  },
  {
    ref: "PL. V",
    title: "Delivered goods",
    caption: "Arrived in Ghana and cleared.",
    src: "",
  },
  {
    ref: "PL. VI",
    title: "Clients",
    caption: "The end of every assignment.",
    src: "",
  },
];

/**
 * PLACEHOLDER: the client is writing these. Each page shows an honest
 * "being prepared" note until `body` is filled in (one string per paragraph).
 */
export const legalPages: { slug: string; title: string; body: string[] }[] = [
  { slug: "privacy-policy", title: "Privacy & cookie policy", body: [] },
  { slug: "terms-and-conditions", title: "Terms & conditions", body: [] },
  { slug: "delivery-and-returns", title: "Delivery & returns policy", body: [] },
];
