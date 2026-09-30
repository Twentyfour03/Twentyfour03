import { defineField, defineType } from "sanity";

export const shopCategoryOptions = [
  { title: "Furniture", value: "furniture" },
  { title: "Home & Décor", value: "home-decor" },
];

/** Fixed-price stock, sold through the shop. */
export const shopItem = defineType({
  name: "shopItem",
  title: "Shop item",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: shopCategoryOptions, layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "price",
      title: "Price (GHS)",
      type: "number",
      description: "Leave empty until the price is confirmed: the item shows as Coming soon.",
      validation: (r) => r.min(0),
    }),
    defineField({ name: "images", title: "Photos", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "inStock", title: "In stock", type: "boolean", initialValue: true, description: "Switch off to hide the item without deleting it." }),
    defineField({ name: "order", title: "Sort order", type: "number", description: "Lower numbers show first." }),
  ],
  orderings: [{ title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "price", media: "images.0" },
    prepare: ({ title, subtitle, media }) => ({ title, subtitle: subtitle ? `GHS ${subtitle}` : "No price yet", media }),
  },
});

/** Quote-first lines: Cars & Spare Parts, Construction & Machinery, Fashion. */
export const procurementCategory = defineType({
  name: "procurementCategory",
  title: "Procurement category",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "body", title: "Short description", type: "text", rows: 3 }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "dedicatedPage", title: "Dedicated page path", type: "string", description: "e.g. /spare-parts. Leave empty to send visitors to the request form." }),
    defineField({ name: "order", title: "Sort order", type: "number" }),
  ],
  orderings: [{ title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] }],
});
