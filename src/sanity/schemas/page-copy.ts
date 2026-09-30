import { defineField, defineType } from "sanity";

/** One document. The written copy on each page, in one place. */
export const pageCopy = defineType({
  name: "pageCopy",
  title: "Page text",
  type: "document",
  groups: [
    { name: "home", title: "Home", default: true },
    { name: "about", title: "About" },
    { name: "services", title: "Services" },
    { name: "shop", title: "Shop" },
    { name: "portfolio", title: "Portfolio" },
    { name: "contact", title: "Contact" },
    { name: "welcome", title: "Welcome pop-up" },
  ],
  fields: [
    defineField({ name: "homeIntro", title: "Intro paragraph", type: "text", rows: 4, group: "home" }),
    defineField({ name: "homeCaption", title: "Hero caption", type: "string", group: "home" }),

    defineField({ name: "aboutIntro", title: "Intro paragraphs", type: "array", of: [{ type: "text", rows: 4 }], group: "about" }),
    defineField({ name: "aboutObjective", title: "Objective line", type: "string", group: "about" }),
    defineField({ name: "mission", title: "Mission", type: "text", rows: 3, group: "about" }),
    defineField({ name: "vision", title: "Vision", type: "text", rows: 3, group: "about" }),

    defineField({ name: "servicesIntro", title: "Intro paragraph", type: "text", rows: 4, group: "services" }),

    defineField({ name: "shopIntro", title: "Intro line", type: "text", rows: 2, group: "shop" }),

    defineField({ name: "portfolioHeading", title: "Story heading", type: "string", group: "portfolio" }),
    defineField({ name: "portfolioOpening", title: "Opening line", type: "string", group: "portfolio" }),
    defineField({ name: "portfolioStory", title: "Story paragraphs", type: "array", of: [{ type: "text", rows: 5 }], group: "portfolio" }),
    defineField({ name: "portfolioQuote", title: "Closing quote", type: "text", rows: 2, group: "portfolio" }),
    defineField({ name: "clientsCount", title: "Clients served (number shown on Portfolio)", type: "number", group: "portfolio" }),

    defineField({ name: "contactIntro", title: "Intro paragraph", type: "text", rows: 4, group: "contact" }),

    defineField({ name: "welcomeTitle", title: "Title", type: "string", group: "welcome", initialValue: "Welcome." }),
    defineField({ name: "welcomeBody", title: "Text", type: "text", rows: 3, group: "welcome" }),
  ],
  preview: { prepare: () => ({ title: "Page text" }) },
});
