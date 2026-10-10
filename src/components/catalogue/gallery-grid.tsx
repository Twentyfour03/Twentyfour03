"use client";

import { useState } from "react";

import { Lightbox } from "@/components/catalogue/lightbox";
import type { GalleryPlate } from "@/lib/content";
import { cn } from "@/lib/utils";

/** How many photos show at first, and how many each "show more" adds. */
const PAGE = 18;

/**
 * The gallery: a plain, even set of columns. Every photo keeps its own
 * shape, nothing is cropped, and its title sits underneath it. Pills along
 * the top narrow it to one kind of work; a tap opens a photo full size.
 */
export function GalleryGrid({ plates }: { plates: GalleryPlate[] }) {
  const groups = Array.from(new Set(plates.map((p) => p.group).filter((g): g is string => Boolean(g))));
  const [group, setGroup] = useState<string | null>(null);
  const [count, setCount] = useState(PAGE);
  const [open, setOpen] = useState<number | null>(null);

  const matching = group ? plates.filter((p) => p.group === group) : plates;
  const shown = matching.slice(0, count);
  const photos = shown.filter((p) => p.src !== "");

  return (
    <>
      {groups.length > 1 ? (
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter the gallery">
          {[null, ...groups].map((g) => (
            <button
              key={g ?? "all"}
              type="button"
              aria-pressed={group === g}
              onClick={() => {
                setGroup(g);
                setCount(PAGE);
              }}
              className={cn(
                "pill border",
                group === g ? "border-olive bg-olive text-cream" : "border-ink/15 text-ink hover:border-olive hover:text-olive",
              )}
            >
              {g ?? "Everything"}
            </button>
          ))}
        </div>
      ) : null}

      <ul className="columns-2 gap-4 sm:gap-5 lg:columns-3">
        {shown.map((plate) => (
          <li key={plate.ref} className="mb-6 break-inside-avoid sm:mb-8">
            {plate.src === "" ? (
              <div className="tile flex aspect-[4/3] items-end bg-cream-sheet p-4 text-ink">
                <span className="micro text-ink-dim">Plate to follow</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setOpen(photos.indexOf(plate))}
                aria-label={`Open a larger photo: ${plate.title}`}
                className="tile block w-full cursor-zoom-in bg-cream-sheet"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={plate.src}
                  alt={plate.title}
                  width={plate.width}
                  height={plate.height}
                  loading="lazy"
                  className="block h-auto w-full"
                />
              </button>
            )}
            <p className="mt-3 text-[0.9375rem] font-medium text-ink sm:text-[1rem]">{plate.title}</p>
            {plate.caption ? <p className="mt-0.5 text-[0.8125rem] text-ink-dim sm:text-[0.875rem]">{plate.caption}</p> : null}
          </li>
        ))}
      </ul>

      {count < matching.length ? (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setCount((n) => n + PAGE)}
            className="pill border border-olive text-olive hover:bg-olive hover:text-cream"
          >
            Show more photos ({matching.length - count})
          </button>
        </div>
      ) : null}

      <Lightbox
        images={photos.map((p) => p.src)}
        title={open === null ? "" : (photos[open]?.title ?? "")}
        index={open}
        onIndex={setOpen}
        onClose={() => setOpen(null)}
      />
    </>
  );
}
