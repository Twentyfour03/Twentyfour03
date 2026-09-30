// Server-side only: imported from server actions, never from client components.
import { getSiteSettings } from "@/lib/data";

export type Attachment = { filename: string; content: string };

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function rowsToHtml(rows: [string, string][]): string {
  const body = rows
    .filter(([, v]) => v.length > 0)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#6b5b52;font:12px system-ui;text-transform:uppercase;letter-spacing:.08em;vertical-align:top;white-space:nowrap">${escapeHtml(
          label,
        )}</td><td style="padding:6px 0;font:15px system-ui;color:#1a1a1a">${escapeHtml(
          value,
        ).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");
  return `<table style="border-collapse:collapse">${body}</table>`;
}


/**
 * Sends one email through Resend. `to` defaults to the client's inbox.
 * Returns a plain result; callers decide what the visitor is told.
 */
export async function sendMail({
  subject,
  html,
  to,
  replyTo,
  attachments,
}: {
  subject: string;
  html: string;
  to?: string;
  replyTo?: string;
  attachments?: Attachment[];
}): Promise<{ ok: true } | { ok: false; reason: "not-configured" | "rejected" | "unreachable" }> {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = to || process.env.REQUEST_INBOX || (await getSiteSettings()).contact.email;
  const from = process.env.REQUEST_FROM ?? "TwentyFour03 <onboarding@resend.dev>";

  if (!apiKey || !recipient) {
    console.warn("[mail] Email is not configured (needs RESEND_API_KEY and REQUEST_INBOX). Not sent:", subject);
    return { ok: false, reason: "not-configured" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: recipient,
        subject,
        reply_to: replyTo || undefined,
        html,
        attachments: attachments && attachments.length > 0 ? attachments : undefined,
      }),
    });
    if (!response.ok) {
      console.error("[mail] Resend rejected the send:", await response.text());
      return { ok: false, reason: "rejected" };
    }
    return { ok: true };
  } catch (error) {
    console.error("[mail] Send failed:", error);
    return { ok: false, reason: "unreachable" };
  }
}
