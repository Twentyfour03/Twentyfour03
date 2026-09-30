import { pageCopy } from "./page-copy";
import { faq, galleryPlate, legalPage, portfolioCategory, portfolioProject, testimonial } from "./portfolio";
import { coreService, processStep, service, value } from "./services";
import { procurementCategory, shopItem } from "./shop";
import { siteSettings } from "./site-settings";

export const schemaTypes = [
  siteSettings,
  pageCopy,
  shopItem,
  procurementCategory,
  service,
  coreService,
  processStep,
  value,
  portfolioProject,
  portfolioCategory,
  galleryPlate,
  testimonial,
  faq,
  legalPage,
];
