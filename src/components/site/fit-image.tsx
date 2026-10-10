import { cn } from "@/lib/utils";

/**
 * A photograph that always fits its frame, whatever its shape.
 *
 * The whole photo is shown, uncropped. Where its shape differs from the
 * frame's, the gap is filled with a soft, blurred copy of the same photo
 * rather than empty bars, so a tall lamp and a wide sofa sit in the same
 * grid without either being cut. Fills its (relatively positioned) parent.
 */
export function FitImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <span className={cn("absolute inset-0 block overflow-hidden", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-125 object-cover opacity-70 blur-xl" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-contain" />
    </span>
  );
}
