# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: businesses and bulk buyers in Ghana.** Hotels, restaurants,
retailers, boutiques, supermarkets, property developers, construction firms,
Airbnb operators and startups who need furniture, equipment, materials or
inventory in quantity, and who do not want to find, vet and negotiate with
overseas suppliers themselves. They arrive with a requirement and a budget,
not a product in mind.

**Secondary: individuals importing for themselves.** Buyers wanting furniture,
fashion, home decor or hard-to-find items unavailable in Ghana. This is the
audience the business grew from.

**Third: car owners, mechanics and parts dealers.** A distinct audience with a
distinct job. They arrive knowing the exact part they need and must supply
vehicle make, model, year and chassis number. They do not browse.

## Product Purpose

TwentyFour03 Vintage is a procurement and sourcing agency. It finds products
and suppliers in international markets on a client's behalf, compares options,
negotiates, purchases, and coordinates shipping and delivery to Ghana.

The website exists to convert a requirement into a submitted procurement
request. **Success is a completed request form**, not a sale. Fixed-price
catalogue items are secondary.

## Positioning

The founder has direct, first-hand experience of the markets she sources from,
built through living in Dubai and working across China, the UAE, the UK and
Europe. The agency's claim is judgment rather than price: choosing the right
product and a credible supplier, not simply the cheapest quote. A local
reseller cannot truthfully make that claim, and a marketplace cannot make it
at all.

## Operating Context

Sourcing is quote-first. The client states a requirement, the agency researches
the market, compares options, presents costs, and purchases only on approval.
Price is unknowable until sourcing is done, because it depends on supplier,
quantity, freight and customs.

The documented six-step process is: send request, we research, we compare, you
approve, we procure, we coordinate delivery.

Markets worked: China, UAE, Ghana, Europe, UK.

Much of the business currently runs through WhatsApp.

## Capabilities and Constraints

**Confirmed in scope**

- Six marketing pages: Home, About, Services, Products, Portfolio, Contact
- A dedicated spare parts surface with its own request form capturing vehicle
  make, model, year and chassis number
- One procurement request form with file upload, delivered to her by email
- Sanity CMS so she edits products, portfolio projects, services and page copy
- Eight documented services and five product categories

**Confirmed out of scope.** The customer login portal, order tracking,
invoice and receipt generation, payment history and staff admin dashboard
described in the client's second document are a separate, separately priced
project. Nothing in this build may assume they exist.

**Open decisions, pending client confirmation.** The client has not yet
replied. These are working assumptions and future work must be able to reverse
them cheaply:

- Whether the site leads as a broad sourcing agency or a spare parts
  specialist. Currently built as a broad agency with spare parts as a
  prominent dedicated surface.
- Whether fixed-price stock exists. Currently assumed some items carry a fixed
  price and the rest are quote-only, so every product carries an optional price
  field and flips between "buy" and "request a quote" on data alone.
- Whether a checkout is built at all. Paystack is registered but unused.

**Technical constraints.** Currency is GHS. Ghana-based audience on largely
mobile connections. Budget is fixed at GHS 3,000 with no maintenance retainer,
so the build must be operable by a non-technical owner and cheap to run.

## Brand Commitments

- Name: TwentyFour03 Vintage. Written TWENTYFOUR.03 VINTAGE in the logo.
- Positioning line: Global Procurement & Sourcing Agency
- Tagline: Sourcing Globally. Procuring Strategically. Delivering With Confidence.
- Founder: Nana Ama Nyame Adu-Poku, Founder and Procurement Officer
- Closing line she wrote, and wants kept: "I don't simply shop for my clients.
  I source, procure, and connect them to the world."
- Binding visual constraints from the client: burgundy and cream lead, olive
  green as a small accent, a vintage character, and no animation.

## Evidence on Hand

**Real and supplied.** Full page copy for all six pages. Eight service
descriptions. A six-step process. A first-person founder story. The logo, as a
JPEG on a green field.

**Promised, not yet supplied.** Completed project case studies with photographs
for the Portfolio page. Build the full case-study structure with placeholders
and let her fill it in the CMS.

**Absent. Do not fabricate.** No testimonials exist, although her document asks
for a testimonials section. No product photographs. No customer names, order
volumes, years in business, delivery statistics or supplier counts. No
transparent logo file. No social handles, business email, phone number, office
address or business hours.

## Product Principles

1. **The request form is the product.** Every page ends in a path to it.
   Anything that competes with it is secondary.
2. **Quote-first is the truth.** Do not imply fixed pricing where none exists,
   and never show a price the business cannot honour.
3. **Judgment is the sell, not price.** Lead with market knowledge, supplier
   vetting and coordination. Never compete on being cheapest.
4. **Spare parts is a different job.** Buyers there know what they want and
   must give vehicle details. Never fold it into a browsable grid.
5. **She has to run this alone.** Anything she will change more than once
   belongs in the CMS, not in code.

## Accessibility & Inclusion

No client-specific standard was established. Audience is predominantly on
mobile devices and variable connections in Ghana, so performance and touch
target size are real accessibility concerns, not theoretical ones.
