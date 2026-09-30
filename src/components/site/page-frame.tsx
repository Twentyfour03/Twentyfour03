"use client";

import { usePathname } from "next/navigation";

import { CornerScroll } from "@/components/catalogue/ornament";
import { cn } from "@/lib/utils";

const corner = "absolute h-[calc(var(--frame)*2.1)] w-[calc(var(--frame)*2.1)]";

/**
 * The letterhead, drawn as a mat. A solid band the width of --frame runs
 * round the viewport and the page scrolls inside it, so the rule and the
 * corner scrolls never sit over text. The body is padded by the same
 * amount, and the sticky header docks just inside the band.
 * A heavy rule with a hairline inside it, and drawn corner scrolls.
 * On About and Contact the band stays but the ornament is left off.
 */
export function PageFrame() {
  const pathname = usePathname();
  if (pathname.startsWith("/studio")) return null;
  const plain = pathname.startsWith("/contact") || pathname.startsWith("/about");
  const burgundy = pathname.startsWith("/portfolio") || pathname.startsWith("/gallery");
  const band = burgundy ? "border-burgundy-deep" : "border-cream";
  const ink = burgundy ? "text-cream" : "text-olive";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
      <div className={cn("absolute inset-0 border-[length:var(--frame)]", band)} />
      {!plain && (
        <div className={ink}>
          <div className="frame-rule absolute inset-[calc(var(--frame)*0.45)] opacity-80" />
          <CornerScroll weight={2} className={cn(corner, "top-0 left-0")} />
          <CornerScroll weight={2} className={cn(corner, "top-0 right-0 scale-x-[-1]")} />
          <CornerScroll weight={2} className={cn(corner, "bottom-0 left-0 scale-y-[-1]")} />
          <CornerScroll weight={2} className={cn(corner, "right-0 bottom-0 scale-[-1]")} />
        </div>
      )}
    </div>
  );
}
