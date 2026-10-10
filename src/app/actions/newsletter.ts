"use server";

import { escapeHtml, sendMail } from "@/lib/mail";

export type NewsletterState = { status: "idle" | "success" | "error"; message?: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * A newsletter sign-up. The address is emailed to the client's inbox, and
 * also added to her Resend audience when RESEND_AUDIENCE_ID is set. The
 * visitor is only told "you're on the list" when one of the two worked.
 */
export async function subscribeToNewsletter(_prev: NewsletterState, formData: FormData): Promise<NewsletterState> {
  // Bots fill every field; people never see this one.
  if (formData.get("company")) return { status: "success", message: "Thank you. You are on the list." };

  const raw = formData.get("email");
  const email = typeof raw === "string" ? raw.trim().toLowerCase().slice(0, 200) : "";
  if (!EMAIL.test(email)) return { status: "error", message: "Please enter a valid email address." };

  let saved = false;
  const apiKey = process.env.RESEND_API_KEY;
  const audience = process.env.RESEND_AUDIENCE_ID;
  if (apiKey && audience) {
    try {
      const res = await fetch(`https://api.resend.com/audiences/${audience}/contacts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ email, unsubscribed: false }),
      });
      saved = res.ok;
      if (!res.ok) console.error("[newsletter] Resend audience rejected the contact:", await res.text());
    } catch (error) {
      console.error("[newsletter] Resend audience unreachable:", error);
    }
  }

  const mail = await sendMail({
    subject: "Newsletter sign-up",
    replyTo: email,
    html: `<p style="font:15px system-ui;color:#1a1a1a">${escapeHtml(email)} asked to join the TwentyFour03 Vintage newsletter.</p>`,
  });

  if (saved || mail.ok) return { status: "success", message: "Thank you. You are on the list." };
  return {
    status: "error",
    message:
      mail.reason === "not-configured"
        ? "Sign-up is not switched on yet. Please message us on WhatsApp and we will add you."
        : "We could not sign you up just now. Please try again in a moment.",
  };
}
