# Backend plan

Date: 30 September 2026
Sources: the client's two PDFs as captured in `PROJECT-BRIEF.md` and
`SCOPE-REVIEW.md`, plus her later decisions (fixed-price shop for Furniture
and Home & Décor; tracking system dropped).

Principle: no database, no logins, nothing the developer has to maintain.
Every record lives in a service the client owns: Sanity (content), Paystack
(orders and money), Resend (email), Vercel (hosting).

Accounts created by the client: Sanity, Resend, Paystack, GitHub, Vercel,
Google Workspace (domain and email).

---

## A. Content management (Sanity)

Goal: the client edits every piece of content herself. From PDF 1 the
editable content is products, portfolio projects, services, page copy,
testimonials and site settings (brief §6). From the shop decision: stock,
prices and photos.

- [x] A1. Sanity project connected to the site (project id, dataset, read token).
- [x] A2. Schemas:
  - Site settings: name, tagline, positioning, footer line, email, WhatsApp,
    phone, address, business hours, Instagram, Facebook, TikTok, logo, favicon.
  - Shop item: name, category (Furniture / Home & Décor), price in GHS,
    photos, description, in stock yes/no.
  - Procurement category: title, blurb, image (Cars & Spare Parts,
    Construction & Machinery, Fashion).
  - Service: number, title, lede, list items (the 8 services).
  - Process step: number, title, body, image (the 6 "How it works" images).
  - Portfolio project: title, client requirement, products sourced,
    quantity, market researched, result, category, photos (PDF 1 §Portfolio).
  - Portfolio category (the 8 listed).
  - Gallery plate: title, caption, photo.
  - Testimonial: name, company, quote (PDF 2 asks for a section; only real
    ones go in).
  - FAQ: question, answer (PDF 2 §9 lists six, with real answers such as
    shipping 30 to 45 days and payment by mobile money or bank transfer).
    Shown on the Spare Parts page and the Contact page.
  - Shipping options: air freight, sea freight, consolidated, full
    container, customs and delivery support (PDF 2 §3), as an editable list.
  - Legal page: privacy & cookie policy, terms & conditions, delivery &
    returns, as rich text.
  - Page copy: Home intro, About (mission, vision, values), Services intro,
    Portfolio story, Contact intro, welcome pop-up text.
- [x] A3. Data layer: every page reads from Sanity, falling back to the
  current placeholders when a document is empty.
- [x] A4. Sanity Studio deployed at `/studio` on the site, so she logs in
  at her own domain.
- [x] A5. Content refresh on publish (endpoint built; register in Sanity once live) (revalidation webhook), so an edit
  shows on the live site within seconds.
- [x] A6. Image pipeline: photos uploaded in Sanity served resized and
  optimised.
- [x] A7. Migrate today's placeholder content (scripts/migrate-sanity.ts, 53 documents) into Sanity so nothing is
  lost when the code content is removed.

## B. Shop and payments (Paystack)

Goal: customers order fixed-price Furniture and Home & Décor and pay
online. Orders and money are visible in her Paystack dashboard.

- [x] B1. Basket, checkout form, Paystack popup, server-side price check,
  payment verification, order emails. Built.
- [ ] B2. Order details (items, quantities, name, phone, delivery address)
  attached to each Paystack transaction as metadata, so the dashboard and
  its CSV export are her order book.
- [ ] B3. Webhook endpoint for `charge.success`, signature-checked, so a
  paid order is recorded and emailed even if the customer closes the tab.
- [ ] B4. Idempotency: the same order never emails twice (popup and
  webhook both fire).
- [x] B5. Shop items and prices come from Sanity (A2), not code.
- [x] B6. "In stock" toggle hides an item from the shop without deleting it.
- [ ] B7. Delivery fee decision: free, flat, or by region. Client to decide.
  Until then, delivery is arranged after payment (current copy).
- [ ] B8. Test keys wired for development; live keys added in Vercel only.
- [ ] B9. Paystack Invoices for quote-first jobs. PDF 2 step 3 wants a
  quotation showing product prices, sourcing fees, shipping estimate and
  delivery timeline: each becomes a line on the Paystack invoice, which
  the customer pays online. Built into her dashboard, no code.

## C. Forms and email (Resend)

Goal: every request lands in her inbox with attachments, and customers get
confirmations. PDF 1 specifies the procurement request form fields; PDF 2
specifies the spare-parts request with vehicle details.

- [x] C1. Procurement request with multiple items and a photo per item.
  Email required, as in PDF 1. Built.
- [x] C2. Spare-parts request with make, model, year, chassis, part and a
  required photo, as in PDF 2 §4 step 1. Built.
- [ ] C2a. PDF 1 marks Country, Budget, Market, Delivery location, Delivery
  date and Specifications as required. They are optional in the build so
  a short request is not blocked. Client to confirm which she wants
  enforced.
- [x] C3. Order emails to her and to the customer after payment. Built.
- [ ] C4. Resend API key added; domain verified once the new domain exists
  (DNS records in Google Workspace's domain settings).
- [ ] C5. Auto-reply to the customer on every request ("we have your
  request, here is what happens next").
- [x] C6. Contact details, WhatsApp number and reply-to pulled from Sanity
  site settings.
- [ ] C7. Spam protection on both forms (honeypot field plus rate limit).
- [ ] C8. End-to-end test of every email with real attachments.

## D. Admin

Goal: everything the client needs to run the site, with no custom admin
panel to maintain. PDF 2's admin dashboard (create orders, update status,
upload invoices, record payments, message customers, reports, profit per
order) was dropped with the tracking system. What remains maps onto the
services' own dashboards:

| Need from the PDFs | Where she does it |
|---|---|
| Add or edit products, prices, photos | Sanity Studio |
| Add portfolio projects, gallery photos | Sanity Studio |
| Edit page text, policies, contact details | Sanity Studio |
| See orders and payments | Paystack dashboard |
| Export orders to Excel | Paystack transactions export (CSV) |
| Send an invoice for a sourced job | Paystack Invoices |
| Customer receipts | Paystack, automatic |
| Read requests and attachments | Her email inbox |
| See site traffic | Vercel Analytics |

- [ ] D1. Sanity Studio access for the client as administrator; developer
  removed at handoff.
- [ ] D2. Vercel Analytics switched on (no cookies, no consent banner change).
- [ ] D2a. Contact page fields from PDF 2 §10 added to site settings:
  phone numbers, WhatsApp, email, office address, Google Maps link,
  business hours. All still to be supplied.
- [ ] D3. Written guide with screenshots: add a product, change a price,
  add a portfolio project, edit a policy, find an order, export to Excel.
- [ ] D4. One walkthrough call.

## E. Hosting, domain and deployment

- [ ] E1. Code pushed to her GitHub repository; Vercel project connected
  to it, so every push deploys.
- [ ] E2. Environment variables set in Vercel: Sanity, Resend, Paystack.
  Never committed.
- [ ] E3. Preview URL shared with the client for review while content arrives.
- [ ] E4. Domain confirmed (bought through Google Workspace), pointed at
  Vercel, SSL live.
- [ ] E5. Paystack webhook URL and Sanity revalidation webhook registered
  against the live domain.
- [ ] E6. `/products` redirect to `/shop` kept; 404 page in the site's style.
- [ ] E7. Metadata: page titles, descriptions, Open Graph image, sitemap,
  robots.

## F. Security and hardening

- [ ] F1. Paystack webhook signature verified; secret key server-only.
- [ ] F2. Server prices every basket; browser prices never trusted. Built.
- [ ] F3. Upload limits enforced (4MB per image, 9MB per request). Built.
- [ ] F4. Sanity write token never exposed to the browser; public dataset
  holds no customer data.
- [ ] F5. Rate limiting on forms and checkout start.
- [ ] F6. Cookie notice matches reality: essential storage only.

## G. Launch checklist

- [ ] All accounts in her name, her card on the domain and Google Workspace.
- [ ] Real content in Sanity: logo, photos, prices, portfolio, policies.
- [ ] Live Paystack keys, one real test order refunded.
- [ ] Every form and email tested from a phone.
- [ ] Developer access removed where not needed.
- [ ] Guide and account list handed over; final 50% invoiced.

---

## Order of work

1. A (Sanity), because every piece of content she sends from now on
   should go straight into it.
2. B2 to B4 (Paystack metadata and webhook).
3. E1 to E3 (GitHub, Vercel, preview link).
4. C4, C5, C7 (Resend live, auto-replies, spam protection).
5. D and E4 onward as content and the domain arrive.

## Needed from the client to start

- Sanity: invite the developer to the project (Editor), or share the
  project id and a read token.
- Paystack: test public and secret keys.
- Resend: API key.
- GitHub: invite the developer to the repository.
- Vercel: invite the developer to the project (Member).
- Decision on delivery fees (B7).
