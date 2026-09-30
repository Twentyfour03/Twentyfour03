"use client";

import {
  createElement,
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";

/** Stagger is capped so a long ledger never becomes a queue. */
const STEP_MS = 110;
const MAX_DELAY_MS = 880;

type PressProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  /** Position in a list, for a capped stagger. */
  index?: number;
  /** Fire when this much of the element has reached the reader. */
  threshold?: number;
};

/**
 * Takes the impression once, when the element first reaches the reader.
 *
 * The element is rendered plain and fully visible by the server. The
 * animation's own `from` state is only ever applied at the moment the
 * animation starts, so a failed or slow script leaves a readable page
 * rather than a blank one, and there is no flash of hidden content.
 */
export function Press({
  as = "div",
  className,
  children,
  index = 0,
  threshold = 0.2,
}: PressProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el === null) return;

    // Already pressed on a previous pass (Fast Refresh, back-navigation).
    if (el.dataset.press === "in") return;

    const delay = Math.min(index * STEP_MS, MAX_DELAY_MS);
    el.style.setProperty("--press-delay", `${delay}ms`);

    const press = () => {
      el.dataset.press = "in";
      el.addEventListener(
        "animationend",
        () => {
          el.style.willChange = "auto";
        },
        { once: true },
      );
    };

    if (typeof IntersectionObserver === "undefined") {
      press();
      return;
    }

    // Anything already on screen presses now, before paint settles, so the
    // opening of a page is not gated on a scroll that never comes.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      press();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            press();
            observer.disconnect();
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index, threshold]);

  return createElement(as, { ref, className, "data-press": "idle" }, children);
}
