# Scope Review — read before quoting or building

Date: 25 September 2026. Updated 30 September 2026.

> **Update, 30 September 2026.** The client has dropped the customer
> login, order tracking and admin dashboard entirely (Conflict 3 closed).
> She has confirmed fixed-price stock in Furniture and Home & Décor, sold
> through the Shop with Paystack (Conflict 2 closed). Spare parts, fashion
> and construction & machinery stay quote-first. There is no Phase 2.
Source: `Full Webage.pdf` and `Webpage Document.pdf` from the client.

---

## Summary

The two documents describe **two different businesses** and **two different
websites**. The second one is far beyond what GHS 3,000 and two weeks can
deliver. This needs resolving with the client before any code is written.

---

## Conflict 1 — which business is this?

| | Document 1 (`Full Webage.pdf`) | Document 2 (`Webpage Document.pdf`) |
|---|---|---|
| Business | Global procurement & sourcing agency | Car spare parts sourcing, China to Ghana |
| Markets | China, UAE, Ghana, Europe, UK | China only |
| Scope | Furniture, machinery, fashion, construction, home & decor, cars | Engine, brakes, suspension, body parts, filters |
| Pages | 6 | 10 plus two dashboards |
| Tone | Broad agency | Specialist importer |

Document 1 lists "Cars & Spare Parts" as just one of five shop categories.
Document 2 makes spare parts the entire business.

**Question for the client:** is the website the broad agency, the spare parts
specialist, or the agency with a dedicated spare parts section?

---

## Conflict 2 — there is no shop

Both documents describe a **quote-based** business, not a shop.

- Document 1's Products page is a **catalogue of categories** ending in
  "Submit a Sourcing Request". No prices, no cart.
- Document 2's flow is: request → we source → we quote → you approve → you pay.
  Price is unknown until after sourcing.

We had planned a shop with fixed prices, a cart, and Paystack checkout.
**Nothing in the client's documents supports that.** Sourcing prices depend on
supplier, quantity, freight, and customs, so fixed prices on a product page
would be wrong.

**Question for the client:** does she have ready-stock items with fixed prices
she wants to sell directly? Or is every sale quote-first?

This decides whether we build a checkout at all.

---

## Conflict 3 — Document 2 asks for a full application

Document 2 requests, beyond the website:

**Customer portal** — secure login per customer, order dashboard, 10-stage
shipment tracker (Order Received → Parts Found → Awaiting Payment → Purchased →
At Chinese Warehouse → Packed → Shipped → At Port → Customs Clearance →
Arrived → Delivered), order history, itemised cost tables with sourcing fees,
warehouse fees, shipping, insurance and taxes, payment history with running
balance, and receipts to view, download and print.

**Admin dashboard** — add customers, create orders, update status, upload and
generate invoices and receipts, record payments, update shipping and sourcing
fees, upload tracking documents, set expected and actual arrival dates, message
customers, export reports, view profit per order, manage customer accounts.

This is a logistics and invoicing platform, not a website. Realistically a
6 to 10 week build. At normal rates that is **GHS 25,000 to 60,000**, not 3,000.
It also brings ongoing obligations: authentication, personal data, money
records, and support. All of which conflict with "no maintenance".

---

## Recommendation

Split the work in two.

**Phase 1 — the website. GHS 3,000, two weeks. Buildable now.**
Home, About, Services, Products catalogue, Portfolio, Contact.
One procurement request form emailed to her, with file upload.
Sanity CMS so she manages products, portfolio projects, and page content.
No login, no checkout, no dashboards.

Everything in Document 1 fits here. It is a strong, complete site.

**Phase 2 — the customer and admin portal. Quoted separately.**
Everything in Document 2 beyond the marketing pages.
Needs its own scope, its own price, its own timeline, and a maintenance
agreement. Build it only after Phase 1 is live and paid.

---

## What changes in the current plan

- **Paystack:** not needed in Phase 1 if there is no fixed-price shop. Her
  account is registered, so nothing is wasted. It moves to Phase 2, or comes
  back into Phase 1 if she confirms she has ready-stock items.
- **Page count rises** from the original plan. Services and Portfolio are both
  substantial pages, and Document 1 says Services should be one of the
  strongest pages on the site. This is more work than quoted but is still
  achievable in two weeks. Do not also absorb Phase 2.
- **Sanity stays.** Products, portfolio projects, services, and page content
  all become editable. Free plan is enough, since no customer data is stored.

---

## Questions to send the client

1. Broad procurement agency, spare parts specialist, or both?
2. Any ready-stock items with fixed prices, or is every sale quote-first?
3. The customer login, order tracking and admin dashboard in the second
   document are a separate project at a separate price. Confirm the current
   two weeks covers the website only.
4. Testimonials are mentioned. Does she have real ones yet?
5. Office address, business hours, phone numbers, and social handles.
6. Logo as PNG or SVG with a transparent background.
