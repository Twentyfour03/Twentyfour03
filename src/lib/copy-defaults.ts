/**
 * The written copy each page falls back to until the client fills in the
 * "Page text" document in the Studio. Kept free of framework imports so the
 * migration script can load it too.
 */
import { founderStory, mission, site, vision } from "./content.ts";

export type PageCopy = {
  homeIntro: string;
  homeCaption: string;
  aboutIntro: string[];
  aboutObjective: string;
  mission: string;
  vision: string;
  servicesIntro: string;
  shopIntro: string;
  portfolioHeading: string;
  portfolioOpening: string;
  portfolioStory: string[];
  portfolioQuote: string;
  clientsCount: number | null;
  contactIntro: string;
  welcomeTitle: string;
  welcomeBody: string;
};

export const DEFAULT_COPY: PageCopy = {
  homeIntro:
    "Finding the right product or supplier abroad is slow and risky. We identify products, locate and vet suppliers, compare options, negotiate, and manage the order through to delivery in Ghana.",
  homeCaption: `${site.positioning}. Furniture, machinery, fashion, home and décor from the markets we know.`,
  aboutIntro: [
    "TwentyFour03 Vintage has evolved from a personal shopping business into a broader procurement and global sourcing agency. Our experience navigating international markets has allowed us to develop a sourcing model designed around one objective.",
    "We work with clients who need products that may not be readily available in their local markets, as well as businesses looking for reliable international sourcing solutions. Our work spans China, the UAE, Ghana, Europe, the UK and other international markets.",
  ],
  aboutObjective: "Make global procurement easier, more accessible, and more efficient for our clients.",
  mission: mission,
  vision: vision,
  servicesIntro:
    "Eight ways we work, from a single hard-to-find item to a container of fixtures for a development. Every one of them begins the same way: you tell us what you need, and nothing is purchased until you approve the costs.",
  shopIntro: "Furniture and home & décor we hold in stock. Fixed prices in GHS, ordered and paid for online.",
  portfolioHeading: founderStory.heading,
  portfolioOpening: founderStory.opening,
  portfolioStory: founderStory.paragraphs,
  portfolioQuote: founderStory.pullQuote,
  clientsCount: 84,
  contactIntro:
    "Whether you are an individual looking for a specific product or a business seeking an international procurement partner, tell us what you are looking for. The more detail you give us, the faster we can come back with real options and real costs.",
  welcomeTitle: "Welcome.",
  welcomeBody: `${site.name}, a ${site.positioning.toLowerCase()}. Shop our stock, or tell us what you need sourced.`,
};
