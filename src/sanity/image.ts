import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from "./env";

const builder = imageUrlBuilder({ projectId, dataset });

/** A resized, auto-format URL for a Sanity image. Returns "" when unset. */
export function imageUrl(source: SanityImageSource | null | undefined, width = 1200): string {
  if (!source) return "";
  try {
    return builder.image(source).width(width).auto("format").fit("max").url();
  } catch {
    return "";
  }
}
