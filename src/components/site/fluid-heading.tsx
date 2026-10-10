"use client";

import { useEffect, useRef, useState } from "react";

import FluidText from "@/components/originkit/fluid-text";
import { cn } from "@/lib/utils";

type Line = { text: string; className?: string };
type Box = { top: number; left: number; height: number; font: React.CSSProperties };

/**
 * What the pointer stirs into the lettering. The dye is added to the letter
 * colour, so only tones lighter than the olive ink show: golds, cream, a
 * lifted green and a rose taken from the burgundy.
 */
const PALETTE = ["#f2c14e", "#fff5e1", "#a8d15a", "#e0b65a", "#d9627a"];

/** Room above and below a line, in ems, so descenders and the ink are not clipped. */
const BLEED = 0.3;

/**
 * A heading whose letters hold fluid: moving the pointer across it stirs
 * colour through the type.
 *
 * The real <h1> is always in the page, for search engines, screen readers
 * and browsers without WebGL. Once WebGL is confirmed, each line is measured
 * and a Fluid Text canvas in the same font is laid exactly over it, and the
 * heading's own ink is switched off so the two do not double up.
 */
export function FluidHeading({
  lines,
  className,
  color,
}: {
  lines: Line[];
  className?: string;
  color: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [boxes, setBoxes] = useState<Box[] | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (wrap === null) return;
    const probe = document.createElement("canvas");
    if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) return;

    const measure = () => {
      const origin = wrap.getBoundingClientRect();
      setWidth(origin.width);
      setBoxes(
        lineRefs.current.flatMap((el) => {
          if (el === null) return [];
          const rect = el.getBoundingClientRect();
          const style = window.getComputedStyle(el);
          const size = parseFloat(style.fontSize);
          return [
            {
              top: rect.top - origin.top,
              left: rect.left - origin.left,
              height: rect.height,
              font: {
                fontFamily: style.fontFamily,
                fontWeight: style.fontWeight,
                fontSize: `${size}px`,
                lineHeight: "1em",
                letterSpacing: style.letterSpacing === "normal" ? "0px" : style.letterSpacing,
                textAlign: "left",
              } as React.CSSProperties,
            },
          ];
        }),
      );
    };

    // The heading rises into place as the page opens; measure once it rests.
    const settle = window.setTimeout(measure, 1100);
    document.fonts?.ready?.then(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(wrap);
    return () => {
      window.clearTimeout(settle);
      observer.disconnect();
    };
  }, []);

  const live = boxes !== null && boxes.length === lines.length;

  return (
    <div ref={wrapRef} className="relative">
      <h1 className={className} style={live ? { color: "transparent", textShadow: "none" } : undefined}>
        {lines.map((line, i) => (
          <span
            key={line.text}
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
            className={cn("block", line.className)}
          >
            {line.text}
          </span>
        ))}
      </h1>
      {live
        ? boxes.map((box, i) => {
            const bleed = parseFloat(String(box.font.fontSize)) * BLEED;
            return (
              <div
                key={lines[i].text}
                aria-hidden
                className="absolute"
                style={{
                  // Fluid Text insets left-aligned type by 8px; pull it back.
                  left: box.left - 8,
                  top: box.top - bleed,
                  width: width - box.left + 8,
                  height: box.height + bleed * 2,
                }}
              >
                <FluidText text={lines[i].text} font={box.font} color={color} paletteColors={PALETTE} />
              </div>
            );
          })
        : null}
    </div>
  );
}
