"use client";

import { EffectCoverflow, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import type { Lot } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The inverted-perspective coverflow from Skiper UI's skiper49, carrying the
 * catalogue's plates instead of bare images. The effect configuration is
 * skiper49's exactly; only the slide is ours, so an empty plate can still
 * show its lot number and title instead of a broken <img>.
 */
export function PlateCoverflow({
  lots,
  className,
}: {
  lots: Lot[];
  className?: string;
}) {
  return (
    <div className={cn("plate-coverflow relative w-full", className)}>
      <style>{`
        .plate-coverflow .swiper { width: 100%; padding: 2.5rem 0 3.5rem; }
        .plate-coverflow .swiper-slide { width: min(78vw, 22rem); }
        .plate-coverflow .swiper-slide-shadow-left,
        .plate-coverflow .swiper-slide-shadow-right {
          background-image: linear-gradient(to left, rgb(0 0 0 / 0.55), transparent);
        }
        .plate-coverflow .swiper-slide-shadow-right {
          background-image: linear-gradient(to right, rgb(0 0 0 / 0.55), transparent);
        }
        .plate-coverflow .swiper-button-prev,
        .plate-coverflow .swiper-button-next {
          width: 2.75rem; height: 2.75rem; margin-top: -1.375rem;
          color: var(--color-cream);
          border: 1px solid color-mix(in srgb, var(--color-cream) 45%, transparent);
          transition: background-color 200ms, color 200ms;
        }
        .plate-coverflow .swiper-button-prev:hover,
        .plate-coverflow .swiper-button-next:hover {
          background: var(--color-cream); color: var(--color-burgundy);
        }
        .plate-coverflow .swiper-button-prev::after,
        .plate-coverflow .swiper-button-next::after { display: none; }
      `}</style>

      <Swiper
        effect="coverflow"
        grabCursor
        slidesPerView="auto"
        centeredSlides
        // Five plates is too few for Swiper's loop ring; rewind jumps back to
        // the first plate at the end instead, with no duplicated slides.
        rewind
        speed={600}
        spaceBetween={0}
        coverflowEffect={{
          rotate: 40,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        navigation={{
          nextEl: ".plate-coverflow .swiper-button-next",
          prevEl: ".plate-coverflow .swiper-button-prev",
        }}
        modules={[EffectCoverflow, Navigation]}
      >
        {lots.map((lot) => (
          <SwiperSlide key={lot.ref}>
            <figure className="bg-cream-sheet text-ink shadow-[0_26px_60px_-28px_rgba(0,0,0,0.85)]">
              <div className="flex aspect-[4/3] items-end p-5">
                {lot.placeholder ? (
                  <span data-numeral className="micro text-ink-dim">
                    Plate to follow
                  </span>
                ) : null}
              </div>
              <figcaption className="px-5 pt-1 pb-5">
                <span className="micro text-burgundy">{lot.category}</span>
                <p className="display display-sm mt-2 lowercase">{lot.title}</p>
                <p className="mt-1.5 text-[0.9375rem] text-ink-dim">
                  {lot.source} &rarr; {lot.location}
                </p>
              </figcaption>
            </figure>
          </SwiperSlide>
        ))}

        <button
          type="button"
          aria-label="Previous plate"
          className="swiper-button-prev grid place-items-center"
        >
          <svg viewBox="0 0 16 16" fill="none" aria-hidden className="h-4 w-4">
            <path d="M10 3.5 5.5 8 10 12.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next plate"
          className="swiper-button-next grid place-items-center"
        >
          <svg viewBox="0 0 16 16" fill="none" aria-hidden className="h-4 w-4">
            <path d="m6 3.5 4.5 4.5L6 12.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </Swiper>
    </div>
  );
}
