import { cn } from "@/lib/utils";

/**
 * The client's logo as she supplied it: the cream 24|03 mark on its own
 * olive ground. Size it by height (`h-12`); the width follows.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="TwentyFour03 Vintage"
      className={cn("inline-flex aspect-[3/2] shrink-0 items-center justify-center rounded-[0.45rem] bg-olive", className)}
    >
      <span className="logo-mark block h-[80%] bg-cream" />
    </span>
  );
}
