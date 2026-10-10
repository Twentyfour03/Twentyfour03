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
   * The client's own details. A value entered in the Studio replaces the
   * one here. An empty string means "not supplied" and the UI says so.
   */
  contact: {
    email: "twentyfour03vintage@gmail.com",
    whatsapp: "+233 20 791 3173",
    phone: "",
    instagram: "https://www.instagram.com/24_03vintage/",
    facebook: "",
    tiktok: "https://www.tiktok.com/@twentyfour03.vintage",
  },
};

/** The footer's list, in the order the client gave it. */
export const socials = [
  { kind: "WhatsApp", label: "+233 20 791 3173", href: "https://wa.me/233207913173" },
  { kind: "Snapchat", label: "t2403_vintage", href: "https://www.snapchat.com/add/t2403_vintage" },
  { kind: "TikTok", label: "twentyfour03.vintage", href: "https://www.tiktok.com/@twentyfour03.vintage" },
  { kind: "Instagram", label: "24_03vintage", href: "https://www.instagram.com/24_03vintage/" },
  { kind: "Instagram", label: "Twentyfour03_vintageandco", href: "https://www.instagram.com/twentyfour03_vintageandco/" },
  { kind: "Email", label: "twentyfour03vintage@gmail.com", href: "mailto:twentyfour03vintage@gmail.com" },
] as const;

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
  { href: "/portfolio", label: "Portfolio" },
  { href: "/shop", label: "Shop" },
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
    image: "/process/step-01.jpg",
  },
  {
    step: "02",
    title: "We research.",
    body: "Our team searches relevant international markets and identifies suitable products and suppliers.",
    image: "/process/step-02.jpg",
  },
  {
    step: "03",
    title: "We compare.",
    body: "We evaluate available options on budget, price, quality, specifications, supplier information, minimum order quantity and availability.",
    image: "/process/step-03.jpg",
  },
  {
    step: "04",
    title: "You approve.",
    body: "We present the available options and associated costs for your consideration.",
    image: "/process/step-04.jpg",
  },
  {
    step: "05",
    title: "We procure.",
    body: "Once approved, we coordinate the procurement process.",
    image: "/process/step-05.jpg",
  },
  {
    step: "06",
    title: "We coordinate delivery.",
    body: "We assist with the logistics and shipping coordination to get your goods to their destination.",
    image: "/process/step-06.jpg",
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
  /** Path under /public. Used until the category has a photo in the Studio. */
  image?: string;
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
    image: "/categories/cars-spare-parts.jpg",
  },
  {
    ref: "C.02",
    slug: "construction-machinery",
    title: "Construction & Machinery",
    body: "Construction materials, industrial and commercial machinery, tools and equipment for businesses and projects.",
    fromPrice: null,
    image: "/categories/construction-machinery.jpg",
  },
  {
    ref: "C.03",
    slug: "fashion",
    title: "Fashion",
    body: "Fashion, footwear and accessories, from single pieces to retail inventory.",
    fromPrice: null,
    image: "/categories/fashion.jpg",
  },
];

/** The shop: fixed-price stock the client holds and sells online. */
export const shopCategories = [
  {
    slug: "furniture",
    title: "Furniture",
    body: "Pieces in stock, at a fixed price, ready to order.",
    image: "/shop/h-029.jpg",
  },
  {
    slug: "home-decor",
    title: "Home & Décor",
    body: "Homeware, lighting and interior pieces, at a fixed price.",
    image: "/categories/home-decor.jpg",
  },
] as const;

export type ShopCategorySlug = (typeof shopCategories)[number]["slug"];

export type ShopItem = {
  id: string;
  category: ShopCategorySlug;
  name: string;
  /** GHS. null means the client has not supplied the price yet: not orderable. */
  price: number | null;
  /** The first photo. Path under /public; empty means the photo is to come. */
  image: string;
  /** Every photo, first included, when the piece is shown in several colours or views. */
  images?: string[];
  /** Size and anything else worth a second line. */
  note?: string;
  /** The colours the buyer chooses from. Left out when the piece comes as shown. */
  colours?: readonly string[];
};

/** Every sofa and bed is made to order in any of these. */
export const furnitureColours = [
  "Red",
  "Burnt Orange",
  "Off White",
  "Nude",
  "Brown",
  "Blue",
  "Green",
  "Grey",
  "Pink",
  "Burgundy",
  "Yellow",
  "Cream / Beige",
] as const;

/**
 * The furniture range, from the client's catalogue of 9 October 2026:
 * supplier model code, description, size and price in GHS, shipping to Ghana
 * included. `null` is a piece the catalogue does not price yet. Photos are
 * /public/shop/<code>.jpg, followed by any extra files listed.
 */
const catalogue: [code: string, name: string, size: string, price: number | null, more?: string[]][] = [
  ["H-010", "4-in-1 L-shaped Modular Sectional Sofa", "270 × 93 × 70 cm", 5920],
  ["H-012", "4-in-1 L-shaped Sofa with 3 Pillows", "240 × 91 × 70 cm", 4820],
  ["H-015", "Single Seat Sofa", "130 × 100 × 70 cm", 2655],
  ["H-016", "2-in-1 / 3-in-1 Seater Sofa with Two Pillows", "240 × 85 × 70 cm", 3845, ["curved-sofa-green", "curved-sofa-orange"]],
  ["H-020", "2-in-1 Sofa Bed", "200 × 140 × 30 cm", 2980],
  ["H-022", "Single Seat Sofa", "80 × 100 × 70 cm", 1866],
  ["H-024", "Togo Style Single Seat Sofa", "80 × 100 × 70 cm", 1760],
  ["H-025", "Sofa Bed with Cup Holder and 2 Pillows", "125 × 170 × 65 cm", 3999],
  ["H-028", "3-in-1 Seater Sofa with 3 Pillows", "200 × 100 × 70 cm", 3870],
  ["H-029", "Three Seater Sofa", "240 × 95 × 78 cm", 3930],
  ["H-030", "Three Seater Sofa", "300 × 100 × 65 cm", null],
  ["H-033", "3-in-1 Sectional Sofa", "255 × 80 × 80 cm", 3745],
  ["H-034", "Single Seat Sleeper Mattress", "76 × 76 × 60 cm", 1450],
  ["H-035", "4-in-1 Modular Sectional Sofa with 2 Pillows", "150 × 170 × 60 cm", 3995],
  ["H-036", "Single Seat Sofa", "80 × 89 × 75 cm", 1900],
  ["H-037", "Modular Sectional 4 / 5 Seater Sofa with Four Pillows", "365 × 100 × 65 cm", 5999],
  ["H-039", "Single Seat Sofa with Pillow", "102 × 102 × 65 cm", 2090],
  ["H-041", "Two Seater Sofa", "200 × 100 × 70 cm", null],
  ["H-042", "2 / 3 Seater Sofa with Two Pillows", "228 × 95 × 75 cm", 3940],
  ["H-043", "3-in-1 Sofa Bed", "200 × 127 × 65 cm", 5940],
  ["H-045", "Single Seat Sofa with Ottoman", "105 × 110 × 70 cm, ottoman Ø 61 × 34 cm", 4095],
  ["H-047", "Single Lazy Sofa Bed", "45 × 152 × 81 cm", 1550],
  ["H-052", "Single Seat Sofa", "84 × 100 × 70 cm", 2250],
  ["H-055", "2 / 3-in-1 Sofa Bed with 2 Pillows", "200 × 115 × 72 cm", 3950],
  ["H-056", "2-in-1 Seater Sofa", "150 × 100 × 65 cm", 2650],
  ["H-057-2", "2-in-1 Modular Sectional Sofa", "190 × 92 × 65 cm", 3550],
  ["H-057-3", "Three Seater Sofa (3-in-1)", "275 × 92 × 65 cm", 4370],
  ["H-058", "Single Seat Sofa with Foot Pedal and Three Pillows", "130 × 100 × 35/70 cm, foot pedal 80 × 100 × 35 cm", 3999],
  ["C-010", "King Bed: Mattress and Bedframe", "200 × 230 × 95 cm", 5939],
  ["C-011", "Round Bed: Mattress and Bedframe", "Ø 180 cm", 4650],
  ["C-012", "King Bed: Mattress and Bedframe", "180 × 220 × 95 cm", 5590],
  ["C-013", "King S Bed: Mattress and Bedframe", "200 × 230 × 95 cm", 5970],
  ["C-014", "Double Bed: Mattress and Bedframe", "120 × 220 × 95 cm", 3835],
];

/**
 * Pieces photographed at the factory, with no model code. Names, sizes and
 * prices are the catalogue's; the first file is the main photo.
 */
const photographed: [id: string, name: string, note: string, price: number, files: string[]][] = [
  ["three-seater-navy", "3-in-1 Seater Sofa", "280 × 100 × 70 cm", 5999, ["three-seat-sofa-navy"]],
  [
    "sofa-bed-round-back",
    "2-in-1 Sofa Bed with Two Pillows",
    "200 × 110 × 38 cm. Shipping not included.",
    3250,
    ["round-back-sofa-red", "round-back-sofa-green", "daybed-red"],
  ],
  ["l-shaped-corduroy", "4-in-1 L-shaped Sofa with 2 Pillows", "267 × 172 × 65 cm", 4988, ["corduroy-corner-sofa-navy"]],
  ["l-shaped-5-in-1", "5-in-1 Seater L-shaped Sofa with 2 Pillows", "360 × 100 × 65 cm", 7420, ["sectional-black"]],
  ["sectional-5-in-1", "5-in-1 Seater Sofa with 3 Pillows", "", 6999, ["sectional-blue"]],
  ["sofa-bed-corduroy", "3-in-1 Sofa Bed with 2 Pillows", "200 × 90 × 70 cm", 3300, ["corduroy-sofa-cream"]],
  ["sofa-bed-corduroy-wide", "3-in-1 Wide-arm Sofa Bed with 2 Pillows", "200 × 90 × 70 cm", 3420, ["corduroy-daybed-cream"]],
  ["swivel-single-seater", "Comfy Single Seater Sofa with Pillow", "122 × 40 cm", 2960, ["swivel-chair-grey"]],
];

/**
 * PLACEHOLDER: the Home & Décor pieces have photos only. Names here are
 * descriptions; real names and prices are to come, and until a price is
 * filled in a piece shows but cannot be ordered.
 */
const decor = [
  "Paper Lantern Pendant Light",
  "Arched Wall Sconce",
  "Fluted Wall Sconces, Pair",
  "Pleated Shade Wall Lights",
  "Arc Floor Lamp with Pleated Shade",
  "Lantern Table Lamp",
];

export const shopItems: ShopItem[] = [
  ...catalogue.map(([code, name, size, price, more = []]) => {
    const images = [code.toLowerCase(), ...more].map((file) => `/shop/${file}.jpg`);
    return {
      id: `furniture-${code.toLowerCase()}`,
      category: "furniture" as const,
      name: `${name} ${code}`,
      price,
      image: images[0],
      images,
      note: size,
      colours: furnitureColours,
    };
  }),
  ...photographed.map(([id, name, note, price, files]) => {
    const images = files.map((file) => `/shop/${file}.jpg`);
    return {
      id: `furniture-${id}`,
      category: "furniture" as const,
      name,
      price,
      image: images[0],
      images,
      note: note || undefined,
      colours: furnitureColours,
    };
  }),
  ...decor.map((name, i) => ({
    id: `home-decor-${i + 1}`,
    category: "home-decor" as const,
    name,
    price: null,
    image: `/shop/decor-${i + 1}.jpg`,
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
  /** Path under /public, or a Sanity URL. Unset means the plate is to come. */
  image?: string;
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
    image: "/gallery/warehouse-03.jpg",
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
    image: "/portfolio/lot-equipment.jpg",
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
    image: "/portfolio/lot-construction.jpg",
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
    image: "/categories/fashion.jpg",
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
    image: "/gallery/car-part-05.jpg",
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

/**
 * The founder's photographs on the Portfolio page, as paths under /public.
 * An empty string puts the "to follow" plate back.
 */
export const founderImages = {
  hero: "/portfolio/founder-hero.jpg",
  detail: "/portfolio/founder-detail.jpg",
  collage: "/portfolio/founder-collage.jpg",
  story: "/portfolio/founder-story.jpg",
  invite: "/portfolio/founder-invite.jpg",
};

export const productCategoryNames =[...productCategories.map((c) => c.title), "Other"];

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
  /** What the photo belongs to; the gallery filters on it. */
  group?: string;
  /** Pixel size of the file, so the page holds its place before it loads. */
  width?: number;
  height?: number;
};

/**
 * Photographs from the factories, warehouses and markets we source in:
 * file under /public/gallery, title, group, width, height.
 * Add a row to add a photo to the gallery.
 */
const sourcingPhotos: [file: string, title: string, group: string, width: number, height: number][] = [
  ["warehouse-01", "Chesterfield suite", "Furniture", 1400, 1050],
  ["car-part-08", "Front grille", "Car parts", 1400, 788],
  ["warehouse-04", "Chesterfield armchair", "Furniture", 1279, 1706],
  ["car-part-05", "LED headlamp", "Car parts", 1400, 788],
  ["car-part-02", "Wing mirror", "Car parts", 810, 1440],
  ["warehouse-02", "Chesterfield two-seater", "Furniture", 1400, 1050],
  ["car-part-03", "Headlamp", "Car parts", 1400, 788],
  ["car-part-13", "Front wing", "Car parts", 1400, 2489],
  ["warehouse-03", "Chesterfield three-seater", "Furniture", 1400, 1050],
  ["car-part-01", "Grille trim", "Car parts", 1400, 788],
  ["car-part-12", "Steering wheel airbag cover", "Car parts", 1400, 2489],
  ["warehouse-06", "Chesterfield two-seater, side", "Furniture", 1280, 1707],
  ["car-part-14", "Fog lamp surround", "Car parts", 1400, 788],
  ["car-part-06", "LED headlamp, boxed", "Car parts", 1080, 1920],
  ["car-part-07", "Chrome trim", "Car parts", 1400, 788],
  ["warehouse-05", "Chesterfield armchair, front", "Furniture", 1280, 1707],
  ["car-part-04", "Headlamp, rear", "Car parts", 1400, 788],
  ["car-part-09", "Lamp unit", "Car parts", 1400, 2489],
  ["car-part-10", "Bumper trim", "Car parts", 1400, 788],
  ["car-part-11", "Lamp lens", "Car parts", 1400, 2489],
];

const sourcingCaptions: Record<string, string> = {
  "Car parts": "Checked against the order at the supplier.",
  Furniture: "At the warehouse before dispatch.",
};

/**
 * PLACEHOLDER — after the sourcing photos come the subjects the client listed
 * but has not photographed yet. They stay off the page while any plate has a
 * photo, and filling `src` brings one back as a real photograph with no
 * other change.
 */
export const galleryPlates: GalleryPlate[] = [
  ...sourcingPhotos.map(([file, title, group, width, height], i) => ({
    ref: `PL. ${i + 1}`,
    title,
    caption: sourcingCaptions[group] ?? "",
    src: `/gallery/${file}.jpg`,
    group,
    width,
    height,
  })),
  { ref: "PL. W", title: "Warehouses", caption: "Goods consolidated before they ship.", src: "" },
  { ref: "PL. S", title: "Suppliers", caption: "Verified before a single order is placed.", src: "" },
  { ref: "PL. L", title: "Loading", caption: "Containers filled and sealed for the voyage.", src: "" },
  { ref: "PL. P", title: "Packaging", caption: "Inspected and wrapped against the crossing.", src: "" },
  { ref: "PL. D", title: "Delivered goods", caption: "Arrived in Ghana and cleared.", src: "" },
  { ref: "PL. C", title: "Clients", caption: "The end of every assignment.", src: "" },
];

/**
 * The policies, as the client supplied them on 9 October 2026. One string
 * per block: "## " starts a section heading, "- " a bullet, anything else is
 * a paragraph. A policy edited in the Studio replaces the text here.
 */
export const legalPages: { slug: string; title: string; body: string[] }[] = [
  {
    slug: "privacy-policy",
    title: "Privacy policy",
    body: [
      "Effective date: 1 October 2026",
      "At TwentyFour03 Vintage, we are committed to protecting your privacy and ensuring that your personal information is handled with care. This Privacy Policy outlines how we collect, use, store, and protect your data when you interact with our website, services, and products.",
      "## 1. Information we collect",
      "We may collect the following types of information:",
      "- Personal Information: Name, email address, phone number, shipping address, billing information, and payment details.",
      "- Account Information: Username, password, and preferences when you create an account on our platform.",
      "- Transaction Information: Purchase history, items viewed, and order details.",
      "- Usage Data: IP address, browser type, device information, and website navigation data (collected through cookies and similar technologies).",
      "- Communication Data: Information provided when you contact customer support or sign up for newsletters.",
      "## 2. How we use your information",
      "Your information may be used for the following purposes:",
      "- To process and fulfill orders, including payments, shipping, and delivery.",
      "- To provide personalized shopping recommendations and enhance your experience.",
      "- To communicate updates, offers, and promotional content (with your consent).",
      "- To improve our website, services, and user experience through analytics and feedback.",
      "- To comply with legal and regulatory obligations.",
      "## 3. How we share your information",
      "We respect your privacy and will not sell or rent your personal information. However, we may share it with:",
      "- Service Providers: Third-party companies that assist with payment processing, shipping, analytics, and marketing.",
      "- Legal Authorities: When required by law or in response to legal processes.",
      "- Business Transfers: In the event of a merger, acquisition, or sale of assets.",
      "## 4. Cookies and tracking technologies",
      "We use cookies and similar tools to enhance your browsing experience and analyze website traffic. You can manage your cookie preferences through your browser settings.",
      "## 5. Data security",
      "We implement robust security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no system is completely secure, and we cannot guarantee the absolute security of your data.",
      "## 6. Your rights",
      "You have the right to:",
      "- Access the personal data we hold about you.",
      "- Request corrections to inaccurate or incomplete information.",
      "- Request the deletion of your personal data, subject to legal or contractual obligations.",
      "- Opt-out of marketing communications by clicking “unsubscribe” in our emails or contacting us directly.",
      "## 7. Data retention",
      "We retain your personal information only as long as necessary for the purposes outlined in this policy or as required by law.",
      "## 8. International data transfers",
      "If you access our services from outside Ghana, your data may be transferred and processed in your country or other jurisdictions where our service providers are located.",
      "## 9. Children’s privacy",
      "Our services are not directed to individuals under the age of 18. We do not knowingly collect personal data from minors.",
      "## 10. Changes to this policy",
      "We may update this Privacy Policy to reflect changes in our practices or applicable laws. Any updates will be posted on this page with a revised “Effective Date.”",
    ],
  },
  {
    slug: "terms-and-conditions",
    title: "Terms & conditions",
    body: [
      "Effective date: 1 October 2026",
      "Welcome to TwentyFour03 Vintage. By accessing or using our services, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully before using our website or services.",
      "## 1. General",
      "1.1. These Terms and Conditions apply to all users of TwentyFour03 Vintage and govern the use of our website, procurement services, and online shopping platform.",
      "1.2. By using our services, you confirm that you are at least 18 years of age or have the consent of a legal guardian.",
      "## 2. Services provided",
      "2.1. TwentyFour03 Vintage offers procurement and personal shopping services, including sourcing, curating, and purchasing goods on behalf of clients.",
      "2.2. All items are subject to availability and may vary in price based on market conditions, exclusivity, and demand.",
      "## 3. User responsibilities",
      "3.1. Users must provide accurate and up-to-date information when creating an account or placing an order.",
      "3.2. Users are responsible for maintaining the confidentiality of their account credentials.",
      "3.3. Users agree not to misuse the website, including attempting unauthorized access, spreading malware, or engaging in fraudulent activities.",
      "## 4. Pricing and payment",
      "4.1. Prices listed are inclusive of applicable taxes unless otherwise stated. Additional charges such as shipping or customs duties may apply.",
      "4.2. Payment is required in full at the time of purchase or as otherwise agreed upon during the personal shopping consultation.",
      "4.3. We accept major payment methods, including credit cards, debit cards, mobile money and other secure payment platforms.",
      "## 5. Returns and refunds",
      "5.1. Due to the personalized nature of our services, all sales are final unless the item is found to be defective or not as described.",
      "5.2. Requests for returns or refunds must be made within 3 days of receiving the goods. Supporting documentation may be required.",
      "5.3. Refunds will be processed in the original payment method and may take up to 15 business days to reflect.",
      "## 6. Shipping and delivery",
      "6.1. Estimated delivery times will be provided during the checkout process or consultation.",
      "6.2. TwentyFour03 Vintage is not responsible for delays caused by shipping carriers or customs clearance processes.",
      "6.3. All shipments are insured, and tracking information will be provided.",
      "## 7. Intellectual property",
      "7.1. All content on our website, including images, text, and logos, is the intellectual property of TwentyFour03 Vintage and may not be used without permission.",
      "7.2. Users may not reproduce, distribute, or modify any part of the website or its content without written consent.",
      "## 8. Liability",
      "8.1. TwentyFour03 Vintage is not liable for any indirect, incidental, or consequential damages arising from the use of our services or website.",
      "8.2. We make no warranties regarding the availability or accuracy of our services but will endeavor to address any issues promptly.",
      "## 9. Privacy",
      "9.1. Your privacy is important to us. Please refer to our Privacy Policy for information on how we collect, use, and protect your personal data.",
      "## 10. Changes to terms",
      "10.1. TwentyFour03 Vintage reserves the right to update or modify these Terms and Conditions at any time without prior notice.",
      "10.2. Continued use of our services after any changes indicates your acceptance of the revised Terms and Conditions.",
      "## 11. Contact information",
      "If you have any questions about these Terms and Conditions, please contact us at twentyfour03vintage@gmail.com.",
      "Thank you for choosing TwentyFour03 Vintage. We look forward to serving you!",
    ],
  },
  {
    slug: "delivery-and-returns",
    title: "Delivery & returns policy",
    body: [
      "These are the delivery and returns sections of our Terms & Conditions, set out on their own for convenience.",
      "## Shipping and delivery",
      "Estimated delivery times will be provided during the checkout process or consultation.",
      "TwentyFour03 Vintage is not responsible for delays caused by shipping carriers or customs clearance processes.",
      "All shipments are insured, and tracking information will be provided.",
      "## Returns and refunds",
      "Due to the personalized nature of our services, all sales are final unless the item is found to be defective or not as described.",
      "Requests for returns or refunds must be made within 3 days of receiving the goods. Supporting documentation may be required.",
      "Refunds will be processed in the original payment method and may take up to 15 business days to reflect.",
    ],
  },
];
