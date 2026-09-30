"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { WELCOME_CLOSED_EVENT, WELCOME_KEY } from "@/components/site/welcome-dialog";

const KEY = "t403-cookie-choice";

function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * The site keeps only essentials on the device (the basket, and whether
 * the welcome was seen). No advertising or tracking. Shown after the
 * welcome dialog, so the two never stack.
 */
export function CookieNotice() {
  const [show, setShow] = useState(false);
  const inStudio = usePathname().startsWith("/studio");

  useEffect(() => {
    if (read(KEY)) return;
    if (read(WELCOME_KEY) === "1") {
      setShow(true);
      return;
    }
    const onClosed = () => setShow(true);
    window.addEventListener(WELCOME_CLOSED_EVENT, onClosed);
    return () => window.removeEventListener(WELCOME_CLOSED_EVENT, onClosed);
  }, []);

  function choose(choice: "accepted" | "declined") {
    try {
      window.localStorage.setItem(KEY, choice);
    } catch {
      /* ignore */
    }
    setShow(false);
  }

  if (!show || inStudio) return null;

  return (
    <div
      role="region"
      aria-label="Cookies"
      className="fixed right-[calc(var(--frame)+1rem)] bottom-[calc(var(--frame)+1rem)] left-[calc(var(--frame)+1rem)] z-[70] rounded-[1.25rem] bg-olive p-5 text-cream shadow-2xl sm:left-auto sm:max-w-sm"
    >
      <p className="text-[0.9375rem] leading-relaxed text-cream">
        We use essential cookies and similar storage to keep this site
        working, such as remembering your basket. No advertising or tracking.{" "}
        <Link href="/legal/privacy-policy" className="underline decoration-cream/50">
          Cookie policy
        </Link>
        .
      </p>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => choose("accepted")} className="pill bg-cream text-olive hover:bg-cream-sheet">
          Accept
        </button>
        <button type="button" onClick={() => choose("declined")} className="pill border border-cream/50 text-cream hover:bg-olive-deep">
          Decline
        </button>
      </div>
    </div>
  );
}
