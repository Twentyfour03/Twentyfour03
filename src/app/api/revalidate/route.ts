import { revalidatePath, revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Called by Sanity when a document is published. The webhook secret is set
 * in Sanity (API > Webhooks) and in SANITY_REVALIDATE_SECRET. Every page
 * reads content under the "sanity" tag, so one call refreshes the site.
 */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );
    if (!isValidSignature) {
      return NextResponse.json({ ok: false, message: "Invalid signature" }, { status: 401 });
    }
    revalidateTag("sanity", "max");
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, type: body?._type ?? null });
  } catch (error) {
    console.error("[revalidate]", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
