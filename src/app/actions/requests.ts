"use server";

import { rowsToHtml, sendMail, type Attachment } from "@/lib/mail";

export type RequestState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Field name -> problem. Named so the form can point at the recovery. */
  fieldErrors?: Record<string, string>;
};

/** Per file. The whole request is capped by serverActions.bodySizeLimit. */
const MAX_FILE_BYTES = 4 * 1024 * 1024;
const MAX_TOTAL_BYTES = 9 * 1024 * 1024;
const MAX_ITEMS = 10;

function clean(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function failureMessage(reason: "not-configured" | "rejected" | "unreachable"): string {
  if (reason === "not-configured")
    return "Email delivery is not switched on yet, so this request was not sent. Nothing was lost on your side, but please reach us directly while we finish setup.";
  if (reason === "rejected")
    return "We could not send that just now. Please try again, or message us on WhatsApp.";
  return "We could not reach our mail service. Please try again, or message us on WhatsApp.";
}

async function toAttachment(file: File, prefix: string): Promise<Attachment> {
  const buffer = Buffer.from(await file.arrayBuffer());
  return { filename: `${prefix}-${file.name}`, content: buffer.toString("base64") };
}

/**
 * The main procurement request. A client can list several items, each in
 * its own category, and each item carries a reference image (required).
 * Item fields arrive as item-<n>-name, item-<n>-category, item-<n>-quantity,
 * item-<n>-details and item-<n>-file.
 */
export async function submitProcurementRequest(
  _prev: RequestState,
  formData: FormData,
): Promise<RequestState> {
  const values = {
    name: clean(formData.get("name")),
    company: clean(formData.get("company")),
    email: clean(formData.get("email")),
    phone: clean(formData.get("phone")),
    country: clean(formData.get("country")),
    budget: clean(formData.get("budget")),
    market: clean(formData.get("market")),
    deliveryLocation: clean(formData.get("deliveryLocation")),
    deliveryDate: clean(formData.get("deliveryDate")),
    referenceLink: clean(formData.get("referenceLink")),
    notes: clean(formData.get("notes")),
  };

  const fieldErrors: Record<string, string> = {};
  if (!values.name) fieldErrors.name = "Please tell us your name.";
  if (!values.email) fieldErrors.email = "We need an email to send your quote to.";
  else if (!EMAIL.test(values.email)) fieldErrors.email = "That email address looks incomplete.";
  if (!values.phone) fieldErrors.phone = "We reply on WhatsApp or by phone, so we need a number.";

  // Collect the item rows that were submitted, in order.
  const indices = new Set<number>();
  for (const key of formData.keys()) {
    const match = /^item-(\d+)-/.exec(key);
    if (match) indices.add(Number(match[1]));
  }
  const ordered = [...indices].sort((a, b) => a - b).slice(0, MAX_ITEMS);

  const items: { name: string; category: string; quantity: string; details: string; file: File | null }[] = [];
  let totalBytes = 0;
  for (const i of ordered) {
    const file = formData.get(`item-${i}-file`);
    const item = {
      name: clean(formData.get(`item-${i}-name`)),
      category: clean(formData.get(`item-${i}-category`)),
      quantity: clean(formData.get(`item-${i}-quantity`)),
      details: clean(formData.get(`item-${i}-details`)),
      file: file instanceof File && file.size > 0 ? file : null,
    };
    if (!item.name) fieldErrors[`item-${i}-name`] = "What is this item?";
    if (!item.quantity) fieldErrors[`item-${i}-quantity`] = "How many?";
    if (!item.file) fieldErrors[`item-${i}-file`] = "Please attach a photo or screenshot of this item.";
    else if (item.file.size > MAX_FILE_BYTES)
      fieldErrors[`item-${i}-file`] = "That file is over 4MB. Please attach a smaller image.";
    else totalBytes += item.file.size;
    items.push(item);
  }

  if (items.length === 0) fieldErrors.items = "Add at least one item you need.";
  if (totalBytes > MAX_TOTAL_BYTES)
    fieldErrors.items = "The images together are over 9MB. Please attach smaller images.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "A few details are missing.", fieldErrors };
  }

  const attachments: Attachment[] = [];
  for (const [n, item] of items.entries()) {
    if (item.file) attachments.push(await toAttachment(item.file, `item-${n + 1}`));
  }

  const itemRows: [string, string][] = items.flatMap((item, n) => [
    [`Item ${n + 1}`, item.name],
    [`Item ${n + 1} category`, item.category],
    [`Item ${n + 1} quantity`, item.quantity],
    [`Item ${n + 1} details`, item.details],
  ]);

  const result = await sendMail({
    subject: `Procurement request (${items.length} item${items.length > 1 ? "s" : ""}) from ${values.name}`,
    replyTo: values.email || undefined,
    attachments,
    html: rowsToHtml([
      ["Name", values.name],
      ["Company", values.company],
      ["Email", values.email],
      ["WhatsApp", values.phone],
      ["Country", values.country],
      ...itemRows,
      ["Budget", values.budget],
      ["Market", values.market],
      ["Deliver to", values.deliveryLocation],
      ["Needed by", values.deliveryDate],
      ["Reference link", values.referenceLink],
      ["Notes", values.notes],
    ]),
  });

  if (!result.ok) return { status: "error", message: failureMessage(result.reason) };
  return {
    status: "success",
    message: "Your request is with us. We will come back to you with options and costs.",
  };
}

/** Spare parts. A different buyer, a different set of facts. */
export async function submitSparePartsRequest(
  _prev: RequestState,
  formData: FormData,
): Promise<RequestState> {
  const values = {
    name: clean(formData.get("name")),
    email: clean(formData.get("email")),
    phone: clean(formData.get("phone")),
    make: clean(formData.get("make")),
    model: clean(formData.get("model")),
    year: clean(formData.get("year")),
    chassis: clean(formData.get("chassis")),
    partName: clean(formData.get("partName")),
    partNumber: clean(formData.get("partNumber")),
    quantity: clean(formData.get("quantity")),
    notes: clean(formData.get("notes")),
  };

  const fieldErrors: Record<string, string> = {};
  if (!values.name) fieldErrors.name = "Please tell us your name.";
  if (!values.phone) fieldErrors.phone = "We reply on WhatsApp, so we need a number.";
  if (!values.make) fieldErrors.make = "Which make is the vehicle?";
  if (!values.model) fieldErrors.model = "Which model?";
  if (!values.year) fieldErrors.year = "Which year was it built?";
  if (!values.chassis)
    fieldErrors.chassis =
      "The chassis or VIN is how we match the exact part. It is on your insurance papers or the driver-side door frame.";
  if (!values.partName) fieldErrors.partName = "Which part do you need?";

  const photo = formData.get("photo");
  const file = photo instanceof File && photo.size > 0 ? photo : null;
  if (!file) fieldErrors.photo = "Please attach a photo of the part. It is how we match the exact item.";
  else if (file.size > MAX_FILE_BYTES)
    fieldErrors.photo = "That file is over 4MB. Please attach a smaller image.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "A few details are missing.", fieldErrors };
  }

  const result = await sendMail({
    subject: `Spare parts request: ${values.make} ${values.model} ${values.year}`,
    replyTo: values.email || undefined,
    attachments: file ? [await toAttachment(file, "part")] : undefined,
    html: rowsToHtml([
      ["Name", values.name],
      ["Email", values.email],
      ["WhatsApp", values.phone],
      ["Make", values.make],
      ["Model", values.model],
      ["Year", values.year],
      ["Chassis / VIN", values.chassis],
      ["Part", values.partName],
      ["Part number", values.partNumber],
      ["Quantity", values.quantity],
      ["Notes", values.notes],
    ]),
  });

  if (!result.ok) return { status: "error", message: failureMessage(result.reason) };
  return {
    status: "success",
    message: "Your request is with us. We will come back to you with options and costs.",
  };
}
