"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemas";

const singletons = new Set(["siteSettings", "pageCopy"]);

export default defineConfig({
  name: "twentyfour03",
  title: "TwentyFour03 Vintage",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter((t) => !singletons.has(t.schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      singletons.has(schemaType)
        ? actions.filter((a) => a.action !== "delete" && a.action !== "duplicate" && a.action !== "unpublish")
        : actions,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site settings")
              .id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.listItem()
              .title("Page text")
              .id("pageCopy")
              .child(S.document().schemaType("pageCopy").documentId("pageCopy")),
            S.divider(),
            S.documentTypeListItem("shopItem").title("Shop items"),
            S.documentTypeListItem("procurementCategory").title("Procurement categories"),
            S.divider(),
            S.documentTypeListItem("portfolioProject").title("Portfolio projects"),
            S.documentTypeListItem("portfolioCategory").title("Portfolio categories"),
            S.documentTypeListItem("galleryPlate").title("Gallery photos"),
            S.documentTypeListItem("testimonial").title("Testimonials"),
            S.divider(),
            S.documentTypeListItem("service").title("Services"),
            S.documentTypeListItem("coreService").title("Core services (Home)"),
            S.documentTypeListItem("processStep").title("How it works"),
            S.documentTypeListItem("value").title("Values (About)"),
            S.documentTypeListItem("faq").title("FAQ"),
            S.documentTypeListItem("legalPage").title("Policy pages"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
