import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./env";

/** Read client. The dataset is public, so no token is needed to read. */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

/** Write client, server only. Used by the migration script and nothing else. */
export function writeClient() {
  const token = process.env.SANITY_API_TOKEN;
  if (!token) throw new Error("SANITY_API_TOKEN is not set");
  return createClient({ projectId, dataset, apiVersion, useCdn: false, token });
}
