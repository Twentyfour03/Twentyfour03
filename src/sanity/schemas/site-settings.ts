import { defineField, defineType } from "sanity";

/** One document. Everything that appears in the header, footer and contact page. */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "brand", title: "Brand", default: true },
    { name: "contact", title: "Contact" },
    { name: "social", title: "Social" },
    { name: "shop", title: "Shop" },
  ],
  fields: [
    defineField({ name: "name", title: "Business name", type: "string", group: "brand", initialValue: "TwentyFour03 Vintage" }),
    defineField({ name: "positioning", title: "Positioning line", type: "string", group: "brand", description: "Shown under the name, e.g. Global Procurement & Sourcing Agency" }),
    defineField({ name: "tagline", title: "Tagline", type: "string", group: "brand" }),
    defineField({ name: "footerLine", title: "Footer line", type: "string", group: "brand" }),
    defineField({ name: "founder", title: "Founder name", type: "string", group: "brand" }),
    defineField({ name: "founderRole", title: "Founder role", type: "string", group: "brand" }),
    defineField({ name: "logo", title: "Logo (transparent PNG or SVG)", type: "image", group: "brand" }),
    defineField({ name: "markets", title: "Markets strip", type: "array", of: [{ type: "string" }], group: "brand", description: "Shown on the Home page, in order." }),

    defineField({ name: "email", title: "Email", type: "string", group: "contact" }),
    defineField({ name: "whatsapp", title: "WhatsApp number", type: "string", group: "contact", description: "With country code, e.g. +233 20 000 0000" }),
    defineField({ name: "phones", title: "Phone numbers", type: "array", of: [{ type: "string" }], group: "contact" }),
    defineField({ name: "address", title: "Office address", type: "text", rows: 3, group: "contact" }),
    defineField({ name: "mapsUrl", title: "Google Maps link", type: "url", group: "contact" }),
    defineField({ name: "hours", title: "Business hours", type: "text", rows: 3, group: "contact", description: "One line per day or range." }),

    defineField({ name: "instagram", title: "Instagram URL", type: "url", group: "social" }),
    defineField({ name: "facebook", title: "Facebook URL", type: "url", group: "social" }),
    defineField({ name: "tiktok", title: "TikTok URL", type: "url", group: "social" }),

    defineField({
      name: "deliveryFee",
      title: "Delivery fee (GHS)",
      type: "number",
      group: "shop",
      description: "Flat fee added to every shop order. Leave empty for free delivery, or if delivery is arranged separately.",
      validation: (r) => r.min(0),
    }),
    defineField({ name: "deliveryNote", title: "Delivery note", type: "string", group: "shop", description: "Shown at checkout, e.g. Delivery within Accra in 2 to 3 days." }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
