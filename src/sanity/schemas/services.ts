import { defineField, defineType } from "sanity";

/** The eight services on the Services page. */
export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "number", title: "Number", type: "string", description: "01, 02 …", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "lede", title: "Introduction", type: "text", rows: 3 }),
    defineField({ name: "items", title: "What it covers", type: "array", of: [{ type: "string" }] }),
  ],
  orderings: [{ title: "Number", name: "number", by: [{ field: "number", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "number" } },
});

/** The six short cards under What we do on the Home page. */
export const coreService = defineType({
  name: "coreService",
  title: "Core service (Home)",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "One line", type: "text", rows: 2 }),
    defineField({ name: "order", title: "Sort order", type: "number" }),
  ],
  orderings: [{ title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] }],
});

/** How it works: six steps, each with an image on the Services page. */
export const processStep = defineType({
  name: "processStep",
  title: "How it works step",
  type: "document",
  fields: [
    defineField({ name: "step", title: "Step", type: "string", description: "01 to 06", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
  ],
  orderings: [{ title: "Step", name: "step", by: [{ field: "step", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "step", media: "image" } },
});

/** Values on the About page. */
export const value = defineType({
  name: "value",
  title: "Value (About)",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "One line", type: "text", rows: 2 }),
    defineField({ name: "order", title: "Sort order", type: "number" }),
  ],
  orderings: [{ title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] }],
});
