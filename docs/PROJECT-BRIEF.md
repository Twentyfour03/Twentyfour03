# Project Brief — TwentyFour03 Vintage

Single source of truth for this build.
See also: `DESIGN.md` (visual direction), `SCOPE-REVIEW.md` (scope conflicts — read first).

Last updated: 30 September 2026

---

## 1. Client & business

- **Business:** TwentyFour03 Vintage
- **Positioning:** Global Procurement & Sourcing Agency
- **Founder:** Nana Ama Nyame Adu-Poku, Founder & Procurement Officer
- **Tagline:** Sourcing Globally. Procuring Strategically. Delivering With Confidence.
- **Markets:** China, UAE, Ghana, Europe, UK
- **Story:** grew from a personal shopping business in Dubai into a procurement
  and sourcing agency. Nana Ama studied Law with International Relations in Dubai.
- **Domain:** owned, registered at Namecheap. Connect at launch.

---

## 2. Commercial terms

| Item | Decision |
|---|---|
| Price | GHS 3,000 (50% deposit, 50% on launch) |
| Timeline | 2 weeks from deposit |
| Animation | Client delegated it. One authored load moment only: the binding rule draws and the opening plate settles. Honours reduced-motion. |
| Maintenance | Not included. 30 days bug fixes after launch. |
| Revisions | 2 rounds |

⚠️ **Scope risk.** The client's second document asks for a customer portal and
admin dashboard that are a separate project. See `SCOPE-REVIEW.md`.
Confirm with her before building.

---

## 3. Pages — Phase 1

Nav order: HOME | ABOUT | SERVICES | SHOP | PORTFOLIO | GALLERY | CONTACT

| Page | Route | Contents | Status |
|---|---|---|---|
| Home | `/` | Hero, What We Do, Core Services, How It Works, categories, spare-parts band | Built |
| About | `/about` | Connecting You to Global Markets, Mission, Vision, 5 Values | Built |
| Services | `/services` | 8 numbered services, How It Works 6 steps | Built |
| Shop | `/shop` | Furniture and Home & Décor at fixed prices, basket, Paystack checkout | Built, awaiting stock and keys |
| Portfolio | `/portfolio` | Nana Ama's story, catalogue of projects, 8 categories | Built |
| Contact | `/contact` | Procurement Request Form, contact details | Built |
| Spare Parts | `/spare-parts` | Olive colorway, parts list, vehicle-detail request form | Built |
| Gallery | `/gallery` | Plate tunnel: photo subjects receding down the catalogue spine | Built |

Client note: Services "should become one of the strongest pages on the website."
How It Works appears on both Home and Services.

---

## 4. Content — supplied

### Home
- H1: TWENTYFOUR03 VINTAGE
- Sub: Global Procurement & Sourcing Agency
- Tagline: Sourcing Globally. Procuring Strategically. Delivering With Confidence.
- Intro paragraph supplied.
- Buttons: [Request a Quote] [Explore Our Services]
- Markets strip: China | UAE | Ghana | Europe | UK | Global Markets
- CTA: Start a Procurement Request
- What We Do: "We Find. We Source. We Procure. We Coordinate."
- Core Services (6 short cards): Global Product Sourcing, Procurement Services,
  Supplier Sourcing, China Sourcing, UAE/UK & Europe Sourcing, Business Procurement
- Testimonials section requested — **client has not supplied any yet**

### About
Connecting You to Global Markets + mission + vision + 5 values
(Integrity, Reliability, Quality, Efficiency, Global Access). All copy supplied.

### Services — 8 blocks, all copy supplied
01 Product Sourcing · 02 Supplier Sourcing · 03 China Procurement ·
04 UAE, Europe & UK Procurement · 05 Business Procurement ·
06 Bulk & Wholesale Sourcing · 07 Furniture & Interior Procurement ·
08 Construction & Project Procurement

### How It Works — 6 steps, all copy supplied
1 Send Us Your Request · 2 We Research · 3 We Compare · 4 You Approve ·
5 We Procure · 6 We Coordinate Delivery

### Products — 5 categories
Cars & Spare Parts · Furniture · Machinery · Fashion · Home & Décor
Closing CTA: "Can't find what you're looking for? We source beyond our
catalogue." → [Submit a Sourcing Request]

⚠️ No prices supplied. See `SCOPE-REVIEW.md` conflict 2.

### Portfolio
Full first-person story supplied, signed Nana Ama Nyame Adu-Poku.
Closing line: "I don't simply shop for my clients. I source, procure, and
connect them to the world."

Catalogue of selected projects, each showing client requirements, products
sourced, quantity, market researched, final result.
Project types: Furniture, Business Equipment, Construction, Fashion & Retail,
Custom Product Sourcing.

8 portfolio categories: Furniture & Interiors · Construction & Real Estate ·
Business Equipment · Retail & Wholesale · Fashion & Lifestyle ·
Technology & Electronics · Machinery & Tools · Custom Procurement

⚠️ **No actual project content or photos supplied yet.** Placeholders needed.

### Contact
Heading: Let's Source What You Need.

Procurement Request Form fields:
Full Name* · Company Name · Email* · WhatsApp/Phone* · Country* ·
What do you need?* · Product Category* · Quantity Required* · Target Budget* ·
Preferred Sourcing Market* · Required Delivery Location* ·
Expected Delivery Date* · Product Specifications* ·
Upload Product Image/Reference · Additional Information

Button: SUBMIT PROCUREMENT REQUEST

### Footer
TWENTYFOUR03 VINTAGE · Global Procurement & Sourcing Agency ·
"Connecting you to products, suppliers and opportunities worldwide."
Instagram · Facebook · TikTok · WhatsApp — **handles not supplied**

---

## 5. Stack

| Layer | Choice | Status |
|---|---|---|
| Framework | Next.js 16 + Tailwind v4 + shadcn | In repo |
| CMS | Sanity, free plan | Not created |
| Forms | Resend → her email, with file upload | Not created |
| Payments | Paystack | ✅ Registered. Shop checkout built; keys not yet added |
| Hosting | Vercel | Not created |
| Code | GitHub | Not created |
| Domain | Was Namecheap, expired. New domain via Google Workspace, to confirm | ⚠️ |

Sanity free plan datasets are public only. Fine here: no customer data is
stored in Phase 1. Request form submissions go to her email, not Sanity.

---

## 6. Editable in Sanity

- Products and categories
- Portfolio projects and categories
- Services
- Page content: Home, About, Services intro, Portfolio intro
- Testimonials
- Site settings: contact details, socials, WhatsApp number, delivery windows

---

## 7. Content still needed

- [ ] Logo as transparent PNG or SVG, plus a dark version for cream backgrounds
- [ ] Nana Ama's photo
- [ ] Product photographs — placeholders in use
- [ ] Portfolio project details and photos — placeholders in use
- [ ] Real testimonials, or drop the section
- [ ] Instagram, Facebook, TikTok handles
- [ ] WhatsApp number
- [ ] Business email
- [ ] Office address, Google Maps location, business hours (from document 2)
- [ ] Phone numbers
- [ ] Favicon

---

## 7b. Colour and arrangement (client-directed, final)

No mixing. Olive and cream on every page; burgundy and cream on the Portfolio
only, header and footer included. The header and footer read the route.

Arrangement follows the two reference images rather than the earlier ledger:

| Reference | Applied to | Pattern |
|---|---|---|
| Shop inspo | Home, Products | Rounded olive hero card, giant heavy sans word over a plate, thumbnail rail on the right, three-column rounded tiles with a pill per tile, marquee strip, deep band |
| Portfolio inspo | Portfolio | Burgundy ground, thin ribbon of labels, large rounded hero card with overlay cards, circular thumbnails, cream profile card with stats row and pill buttons, collaged plates |

Headings are heavy Jost; Bodoni Moda is kept only for the 24.03 mark.
Corners are rounded 1.25rem and controls are pills.

## 8. Open questions — blocking

1. ~~Broad procurement agency, spare parts specialist, or both?~~ **Resolved:**
   the agency, with spare parts as one quote-first category.
2. ~~Fixed-price ready-stock items, or quote-first only?~~ **Resolved:**
   Furniture and Home & Décor are fixed-price shop stock (Paystack checkout).
   Everything else is quote-first.
3. ~~Customer portal and admin dashboard.~~ **Dropped by the client on
   30 September 2026.** No tracking system, no logins, no dashboards.
4. ~~Which green is the brand green?~~ **Resolved:** the logo green `#203C01`,
   so her mark sits natively on its own colour. It is the spare-parts colorway
   and the accent throughout. The stated `#30360E` is unused.
5. Testimonials: real ones available, or omit? Currently omitted, since none
   exist and inventing them is not an option.

---

## 9. Handoff checklist

- [ ] All accounts in client's name, her card on the domain
- [ ] Developer removed from anything she doesn't need him in
- [ ] Domain connected, SSL live
- [ ] Resend DNS records added at Namecheap
- [ ] Request form tested end to end
- [ ] Written guide: adding products, portfolio projects, editing pages
- [ ] One walkthrough call
- [ ] Account list handed over
- [ ] Final 50% invoiced
