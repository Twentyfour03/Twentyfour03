import { defineField, defineType } from "sanity";

/** A selected procurement project, with the fields the client's brief lists. */
export const portfolioProject = defineType({
  name: "portfolioProject",
  title: "Portfolio project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "portfolioCategory" }] }),
    defineField({ name: "client", title: "Client", type: "string", description: "e.g. Residential client, Restaurant, Property developer" }),
    defineField({ name: "location", title: "Delivered to", type: "string", initialValue: "Ghana" }),
    defineField({ name: "source", title: "Sourced from", type: "string", description: "e.g. China, UAE" }),
    defineField({ name: "requirements", title: "Client requirements", type: "text", rows: 3 }),
    defineField({ name: "productsSourced", title: "Products sourced", type: "text", rows: 3 }),
    defineField({ name: "quantity", title: "Quantity", type: "string" }),
    defineField({ name: "marketResearched", title: "Market visited or researched", type: "string" }),
    defineField({ name: "result", title: "Final result", type: "text", rows: 3 }),
    defineField({ name: "images", title: "Photos", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
    defineField({ name: "order", title: "Sort order", type: "number" }),
  ],
  orderings: [{ title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "client", media: "images.0" } },
});

export const portfolioCategory = defineType({
  name: "portfolioCategory",
  title: "Portfolio category",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "order", title: "Sort order", type: "number" }),
  ],
  orderings: [{ title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] }],
});

export const galleryPlate = defineType({
  name: "galleryPlate",
  title: "Gallery photo",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", title: "Sort order", type: "number" }),
  ],
  orderings: [{ title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "caption", media: "image" } },
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  description: "Only real testimonials from real clients.",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "name", title: "Client name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "company", title: "Company or role", type: "string" }),
    defineField({ name: "order", title: "Sort order", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "company" } },
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "order", title: "Sort order", type: "number" }),
  ],
  orderings: [{ title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "question" } },
});

export const legalPage = defineType({
  name: "legalPage",
  title: "Policy page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "body", title: "Text", type: "array", of: [{ type: "block" }] }),
  ],
  preview: { select: { title: "title" } },
});
