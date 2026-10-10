import { siFacebook, siGmail, siInstagram, siSnapchat, siTiktok, siWhatsapp } from "simple-icons";

import { cn } from "@/lib/utils";

/** The platforms' own marks, from simple-icons. */
const marks = {
  Instagram: siInstagram.path,
  Facebook: siFacebook.path,
  TikTok: siTiktok.path,
  WhatsApp: siWhatsapp.path,
  Snapchat: siSnapchat.path,
  Email: siGmail.path,
} as const;

export type SocialName = keyof typeof marks;

/** The mark alone, drawn in the current text colour. */
export function SocialIcon({ name, className }: { name: SocialName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("h-5 w-5 shrink-0 fill-current", className)}>
      <path d={marks[name]} />
    </svg>
  );
}

/** Each platform's own colours: [badge background, mark]. */
const brand: Record<SocialName, [string, string]> = {
  WhatsApp: ["#25D366", "#ffffff"],
  Snapchat: ["#FFFC00", "#000000"],
  TikTok: ["#000000", "#ffffff"],
  Instagram: ["radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)", "#ffffff"],
  Facebook: ["#0866FF", "#ffffff"],
  Email: ["#ffffff", "#EA4335"],
};

/** The mark in the platform's own colours, on a round badge. */
export function SocialBadge({ name, className }: { name: SocialName; className?: string }) {
  const [background, fill] = brand[name];
  return (
    <span
      aria-hidden="true"
      className={cn("grid size-9 shrink-0 place-items-center rounded-full ring-1 ring-black/10", className)}
      style={{ background }}
    >
      <svg viewBox="0 0 24 24" className="size-[1.15rem]" style={{ fill }}>
        <path d={marks[name]} />
      </svg>
    </span>
  );
}
