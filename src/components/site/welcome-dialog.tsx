"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";


export const WELCOME_KEY = "t403-welcome-seen";
export const WELCOME_CLOSED_EVENT = "t403:welcome-closed";

function seen(): boolean {
  try {
    return window.localStorage.getItem(WELCOME_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Shown once, on a visitor's first arrival: the two ways in (shop or
 * request a quote). Remembered on the device so it never nags.
 */
export function WelcomeDialog({
  name,
  mark,
  title,
  body,
}: {
  name: string;
  mark: string;
  title: string;
  body: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const inStudio = usePathname().startsWith("/studio");

  useEffect(() => {
    if (inStudio || seen()) return;
    const t = window.setTimeout(() => ref.current?.showModal(), 700);
    return () => window.clearTimeout(t);
  }, [inStudio]);

  function close() {
    try {
      window.localStorage.setItem(WELCOME_KEY, "1");
    } catch {
      /* ignore */
    }
    if (ref.current?.open) ref.current.close();
    window.dispatchEvent(new Event(WELCOME_CLOSED_EVENT));
  }

  if (inStudio) return null;

  return (
    <dialog
      ref={ref}
      onClose={close}
      onClick={(e) => e.target === ref.current && close()}
      aria-labelledby="welcome-title"
      data-site={name}
      className="welcome m-auto w-[min(92vw,34rem)] rounded-[1.75rem] bg-transparent p-0"
    >
      <div className="leather rounded-[1.75rem] px-8 pt-12 pb-9 text-center text-ink sm:px-12">
        <p className="mark text-[1.75rem]" data-numeral>
          {mark}
        </p>
        <h2 id="welcome-title" className="emboss mt-4 text-[clamp(2.4rem,8vw,3.4rem)]">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-[34ch] text-[1rem] text-ink">
          {body}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/shop" onClick={close} className="pill bg-olive text-cream hover:bg-olive-deep">
            Visit the shop
          </Link>
          <Link
            href="/contact"
            onClick={close}
            className="pill border border-olive/40 text-olive hover:bg-olive hover:text-cream"
          >
            Request a quote
          </Link>
        </div>
        <button type="button" onClick={close} className="micro mt-7 text-ink underline decoration-ink/30 hover:text-olive">
          Continue to the site
        </button>
      </div>
    </dialog>
  );
}
