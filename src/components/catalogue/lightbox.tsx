"use client";

import { useEffect, useRef } from "react";

/**
 * A closer look at a photograph. Opens on a tap, closes on Escape, the
 * backdrop or the button, and steps through the set when there is more
 * than one. A native <dialog>, so focus and Escape are the browser's.
 */
export function Lightbox({
  images,
  title,
  index,
  onIndex,
  onClose,
}: {
  images: string[];
  title: string;
  /** The photo showing. null keeps the dialog closed. */
  index: number | null;
  onIndex: (index: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const swipeFrom = useRef<number | null>(null);
  const many = images.length > 1;
  const open = index !== null;

  useEffect(() => {
    const dialog = ref.current;
    if (dialog === null) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const step = (by: number) => onIndex(((index ?? 0) + by + images.length) % images.length);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      onKeyDown={(e) => {
        if (!many) return;
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
      aria-label={title}
      className="lightbox m-auto max-h-[92svh] w-[min(94vw,72rem)] bg-transparent p-0"
    >
      {index !== null ? (
        <figure
          className="relative"
          // A sideways swipe on the photo steps through the set.
          onPointerDown={(e) => {
            swipeFrom.current = e.clientX;
          }}
          onPointerUp={(e) => {
            const dx = swipeFrom.current === null ? 0 : e.clientX - swipeFrom.current;
            swipeFrom.current = null;
            if (many && Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={images[index]}
            src={images[index]}
            alt={title}
            draggable={false}
            className="mx-auto max-h-[80svh] w-auto max-w-full touch-pan-y rounded-[1.25rem] object-contain select-none"
          />
          <figcaption className="mt-4 flex items-center justify-between gap-4 text-cream">
            <span className="text-[1rem]">
              {title}
              {many ? (
                <span data-numeral className="micro ml-3 text-cream/70">
                  {index + 1} / {images.length}
                </span>
              ) : null}
            </span>
            <span className="flex gap-2">
              {many ? (
                <>
                  <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="pill bg-cream text-ink hover:bg-cream-sheet">
                    &larr;
                  </button>
                  <button type="button" onClick={() => step(1)} aria-label="Next photo" className="pill bg-cream text-ink hover:bg-cream-sheet">
                    &rarr;
                  </button>
                </>
              ) : null}
              <button type="button" onClick={onClose} className="pill bg-cream text-ink hover:bg-cream-sheet">
                Close
              </button>
            </span>
          </figcaption>
        </figure>
      ) : null}
    </dialog>
  );
}
