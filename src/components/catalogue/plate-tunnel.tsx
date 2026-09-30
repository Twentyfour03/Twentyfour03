"use client";

import { useEffect, useRef, useState } from "react";

import type { GalleryPlate } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The plate tunnel.
 *
 * You look down the spine of the catalogue and the plates recede into it.
 * Scrolling the section advances you through them, so the scroll is the
 * travel rather than a trigger bolted onto it.
 *
 * Fallbacks are load-bearing, not afterthoughts. The server renders an
 * ordinary ruled grid; the tunnel is only switched on once the component
 * has mounted and only when the reader has not asked for reduced motion.
 * No script, or reduced motion, means a plain legible gallery.
 */
export function PlateTunnel({ plates }: { plates: GalleryPlate[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [depth, setDepth] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setDepth(true);
  }, []);

  useEffect(() => {
    if (!depth) return;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (track === null || stage === null) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;
      // 0 at the top of the run, 1 at the bottom.
      const progress = Math.min(Math.max(-rect.top / travel, 0), 1);
      stage.style.setProperty(
        "--advance",
        String(progress * (plates.length - 1)),
      );
    };

    const onScroll = () => {
      if (frame !== 0) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== 0) cancelAnimationFrame(frame);
    };
  }, [depth, plates.length]);

  return (
    <div
      ref={trackRef}
      className={cn(depth && "h-[420svh]")}
      data-tunnel={depth ? "on" : "off"}
    >
      <div
        ref={stageRef}
        className={cn(
          depth
            ? "sticky top-0 flex h-svh items-center justify-center overflow-hidden [perspective:1100px] [perspective-origin:50%_45%]"
            : "grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {plates.map((plate, i) => (
          <figure
            key={plate.ref}
            style={depth ? ({ "--i": i } as React.CSSProperties) : undefined}
            className={cn(
              depth
                ? "tunnel-plate absolute w-[min(78vw,30rem)]"
                : "rule-hair pt-6",
            )}
          >
            <div
              className={cn(
                "flex aspect-[4/3] items-end bg-cream-sheet p-5",
                depth && "shadow-[0_26px_60px_-28px_rgba(0,0,0,0.85)]",
              )}
            >
              {plate.src === "" ? (
                <span data-numeral className="micro text-ink-dim">
                  Plate to follow
                </span>
              ) : null}
            </div>
            <figcaption
              className={cn(
                "mt-4 flex items-baseline justify-between gap-4",
                depth && "bg-cream-sheet px-5 pt-1 pb-2",
              )}
            >
              <span
                className={cn("display display-sm", depth && "text-ink")}
              >
                {plate.title}
              </span>
              <span
                data-numeral
                className={cn("micro", depth ? "text-ink" : "text-ink")}
              >
                {plate.ref}
              </span>
            </figcaption>
            <p
              className={cn(
                "text-[1rem]",
                depth ? "bg-cream-sheet px-5 pb-5 text-ink-dim" : "mt-1.5 text-dim",
              )}
            >
              {plate.caption}
            </p>
          </figure>
        ))}
      </div>
    </div>
  );
}
