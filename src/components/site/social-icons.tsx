import { siFacebook, siInstagram, siTiktok, siWhatsapp } from "simple-icons";

import { cn } from "@/lib/utils";

/** The platforms' own marks, from simple-icons, drawn in the current text colour. */
const marks = {
  Instagram: siInstagram.path,
  Facebook: siFacebook.path,
  TikTok: siTiktok.path,
  WhatsApp: siWhatsapp.path,
} as const;

export type SocialName = keyof typeof marks;

export function SocialIcon({ name, className }: { name: SocialName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("h-5 w-5 shrink-0 fill-current", className)}>
      <path d={marks[name]} />
    </svg>
  );
}
