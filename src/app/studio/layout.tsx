import type { ReactNode } from "react";

/** The Studio owns the whole viewport: no site header, footer, frame or pop-ups. */
export default function StudioLayout({ children }: { children: ReactNode }) {
  return <div className="fixed inset-0 z-[100] bg-white">{children}</div>;
}
