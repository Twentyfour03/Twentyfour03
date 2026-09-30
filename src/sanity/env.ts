export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2026-09-30";

/** True once the project id is set. Until then every page uses its placeholders. */
export const sanityConfigured = projectId.length > 0;
