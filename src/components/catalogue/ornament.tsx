import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * A drawn baroque corner scroll. The straight runs of the frame are a real
 * border on the panel, so the moulding never breaks mid-edge; these sit on
 * top of it at the four corners as applied ornament.
 */
export function CornerScroll({
  className,
  weight = 1,
}: {
  className?: string;
  weight?: number;
}) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      aria-hidden="true"
      className={cn("h-14 w-14 sm:h-20 sm:w-20", className)}
    >
      <g
        stroke="currentColor"
        strokeWidth={weight}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      >
        {/* the scroll unrolling away from the corner */}
        <path d="M10 54c0-19 11-32 29-32 13 0 22 8 22 18 0 9-6 14-13 14-7 0-11-4-11-10 0-4 3-8 8-8 3 0 5 2 5 5" />
        <path d="M54 10c19 0 32 11 32 29 0 13-8 22-18 22-9 0-14-6-14-13 0-7 4-11 10-11 4 0 8 3 8 8 0 3-2 5-5 5" />
        {/* acanthus */}
        <path d="M14 34c6-9 15-15 26-17" opacity="0.65" />
        <path d="M34 14c9-6 19-9 29-9" opacity="0.65" />
        <path d="M8 74c1-10 4-19 9-27" opacity="0.5" />
        <path d="M74 8c10 1 19 4 27 9" opacity="0.5" />
        {/* the rosette pinning the corner */}
        <circle cx="47" cy="47" r="3.5" opacity="0.75" />
      </g>
    </svg>
  );
}

/**
 * A plaster-framed panel. The content sits inside the moulding.
 */
export function FramedPanel({
  children,
  className,
  tone = "cream",
}: {
  children: ReactNode;
  className?: string;
  tone?: "cream" | "burgundy" | "olive";
}) {
  const color = tone === "cream" ? "text-cream" : tone === "olive" ? "text-olive" : "text-burgundy";

  return (
    <div
      className={cn(
        "relative border",
        tone === "cream" ? "border-cream/35" : tone === "olive" ? "border-olive/35" : "border-burgundy/30",
        className,
      )}
    >
      {/* Corner ornament, laid over the moulding. */}
      <div className={cn("pointer-events-none absolute inset-0", color)} aria-hidden>
        <CornerScroll className="absolute top-1.5 left-1.5 opacity-60" />
        <CornerScroll className="absolute top-1.5 right-1.5 scale-x-[-1] opacity-60" />
        <CornerScroll className="absolute bottom-1.5 left-1.5 scale-y-[-1] opacity-60" />
        <CornerScroll className="absolute right-1.5 bottom-1.5 scale-[-1] opacity-60" />
      </div>

      <div className="relative px-7 py-16 sm:px-14 sm:py-20 lg:px-20 lg:py-24">
        {children}
      </div>
    </div>
  );
}
