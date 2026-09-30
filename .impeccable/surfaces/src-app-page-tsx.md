---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/about/page.tsx","src/app/services/page.tsx","src/app/products/page.tsx","src/app/portfolio/page.tsx","src/app/contact/page.tsx","src/app/spare-parts/page.tsx"]
---

## Scope

The TwentyFour03 Vintage marketing site: Home, About, Services, Products, Portfolio, Contact, plus a dedicated spare-parts surface. Visitor mode: **Persuade**.

## Audience and job

Ghanaian businesses and bulk buyers — hotels, restaurants, retailers, developers, construction firms — who arrive with a requirement and a budget, not a product in mind, and who do not want to find and vet overseas suppliers themselves. Secondary: individuals importing for themselves. Third and distinct: car owners, mechanics and parts dealers, who arrive knowing the exact part and must supply vehicle details.

**Action:** submit a procurement request. Success is a completed form, not a sale.

**Proof on hand:** her first-person founder story, eight service descriptions, a six-step process. Portfolio case studies are promised, not yet supplied. No testimonials exist and none may be invented.

**Constraints:** burgundy, cream and olive pinned by the client. Vintage character. GHS only. Quote-first pricing, so no price may appear that the business cannot honour. Animation was originally prohibited and the client has since delegated it to us.

## Direction contract

**THESIS:** The site is TwentyFour03's catalogue of lots. Every sourced thing — product, past project, service — is an entry with a number and a provenance line: what was wanted, which market, what arrived. It refuses the sourcing-agency default of a centred hero over a dotted-route world map above three service cards.

**OWN-WORLD:** Burgundy `#800020` grounds, cream `#FFF5E1` sheets, olive `#203C01` for rules, lot status and the spare-parts colorway, ink `#1A1A1A` for body. Two faces only: a high-contrast lowercase didone display and one quiet wide-tracked sans. Hierarchy comes from scale, case and rule — no third face, no weight sprawl, no mid-sized type anywhere. Hairline rules, plate captions, deep margins, lot numbers set in the numeral style of the 24|03 mark.

**STORY:** A buyer with a requirement understands that she has first-hand judgment across China, the UAE, the UK and Europe; believes a vetted supplier beats a cheap quote; and submits a procurement request.

**FIRST VIEWPORT:** Burgundy full-bleed. Wide-tracked nav, hairline cream rule beneath. Left two-thirds: "sourcing globally." in enormous lowercase cream didone, tight leading, three lines. Under it a 45-character sans paragraph, tiny by comparison, then the primary action as a cream block reading REQUEST A QUOTE at lower left. Right third: a cream plate carrying LOT 24.03 and the mark. A cream selvedge rule closes the viewport, the markets list running along it.

**FORM:** The Auction Catalogue. Candidate 1 of my grounded list, chosen by the user as IMPECCABLE'S PICK over the assigned Strip-Weave Ledger. Seed key `f24d4484`.

Raises carried from the declined hand: lot numbers as primary identifiers (Factory Records); lot status shown in the plate rather than a badge bolted on (Nocturne); two faces only (Phosphor Terminal); the catalogue visibly accumulates rather than sitting static (Minihompy).

**MOTION:** Catalogue motion, restrained: rules draw, plates settle, lot numbers set. No scroll-jacking, no parallax, no motion library. Honours `prefers-reduced-motion`.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Memorable moment

The portfolio as a bound catalogue that grows: each completed project is a plated lot with its provenance line, numbered in sequence, so an empty portfolio today reads as volume one rather than as a gap.

## Unresolved

- Client has not confirmed whether the site leads as a broad agency or a spare-parts specialist. Built as broad agency with spare parts as a dedicated surface.
- Whether fixed-price stock exists. Every product carries an optional price and flips between buy and request-a-quote on data alone.
- No transparent logo file yet; the supplied JPEG cannot sit on burgundy or cream.

## Build notes (post finish-review)

- **FIRST VIEWPORT, three lines.** Holds from 1280 up: the display ceiling is
  set to 4rem and the hero column to 2.5fr so "delivering with confidence."
  fits on one line with 28px headroom at 1281 and 113px at 1440. Below 1280
  the grid stacks and the phrases wrap to five lines. Three lines cannot hold
  on a 350px column at any size that still reads as enormous, so the
  three-line composition is the desktop promise, not a mobile one.
- **FIRST VIEWPORT, the selvedge closes the viewport.** Delivered on desktop
  by giving the hero `lg:min-h-[calc(100svh-4.6rem)]` with the market strip
  pushed to the bottom. Measured: hero bottom 1347 against a 1350 viewport.
- **MOTION, all three beats now authored.** `rule-draw`, `plate-settle` and
  `numeral-set`, one opening sequence on the home hero only, nowhere else,
  all disabled under `prefers-reduced-motion`.
- **The accumulation raise** is now structural, not a line of copy: the
  catalogue runs past its last entered lot into a dashed LOT 006 plate, so
  the volume visibly continues.
- **Unsupplied contact details** are a real data state. Empty strings in
  `site.contact` render as "To be confirmed" and suppress their own links,
  rather than printing a plausible dead number.

## Motion thesis (revised, client lifted the no-animation constraint)

**In a catalogue, type is pressed, not faded in.** Every animation in the
build is an act of printing. Nothing floats, nothing parallaxes, nothing
reveals itself twice, and no section gets a generic entrance.

- **Focal moment.** The home hero's opening, unchanged and still the only
  place it runs: the binding rule is drawn across the sheet, the plate is
  laid down, the lot number sets into its column. Three beats, 900ms, once.
- **The impression.** Every heading and every ledger entry takes its
  impression when it first reaches the reader: it presses up 0.22em while
  the ink resolves from 7px blur to sharp, 560ms on an exponential
  deceleration. It fires once per element, never on re-scroll.
- **Stagger.** Entries in a list press in sequence at 70ms, capped at 350ms
  total, so a twelve-item ledger never becomes a queue.
- **The rule answers the pointer.** A ledger entry is a ruled line first and
  a row second, so hovering inks its rule across from the left rather than
  only washing its background.
- **The field rule.** A form field's bottom rule inks in from the left on
  focus instead of switching colour, so the caret and the rule agree about
  where the entry begins.

**No hidden content.** Elements render plain and fully visible from the
server. The animation's `from` state is only ever applied at the instant the
animation starts, so a failed or blocked script leaves a readable page and
there is no flash. Verified: 18 pressable elements on Services, zero with
opacity 0 while idle.

**Reduced motion** keeps the meaning and drops the travel: the impression
becomes a 200ms opacity resolve, the opening sequence does not run, rules
stay drawn, and every hover and focus state remains.

**Not built: route-level view transitions.** React's `ViewTransition` needs a
canary build; this project is on react 19.2.8 stable, which does not export
it. Swapping React was out of scope for a motion pass. The Portfolio's
colour arrival is carried by the olive-to-burgundy ramp instead, which does
not depend on it.

## Gallery and the plate tunnel

A seventh surface, `/gallery`, added on request. It carries the photo-gallery
subjects the client listed (warehouses, suppliers, loading, packaging,
delivered goods, clients) as numbered plates.

**The tunnel.** You look down the spine of the catalogue and the plates
recede into it. Scrolling the section advances you through the run, so the
scroll *is* the travel rather than a trigger bolted onto it. Cream plates on
a burgundy field, each cast forward with a shadow, dimming and blurring with
distance and leaving fast once they pass the reader so nothing swells across
the frame.

Built with CSS 3D transforms and a single rAF-throttled scroll listener. No
dependency, no WebGL, no canvas. OriginKit's `particletunnel` was checked
first: it is a paid component on this plan, and it is a particle field rather
than an image gallery, so it would not have carried photographs anyway.

**Fallbacks are load-bearing.** The server renders an ordinary ruled grid.
Depth is switched on only after mount and only when the reader has not asked
for reduced motion. No script, or reduced motion, leaves a plain legible
gallery rather than a broken stack.

`abs()` is avoided in the depth maths in favour of `max(d, -d)`, which every
target browser supports.

**Nav is now seven items.** Gallery sits between Portfolio and Contact.

## Inline link treatment

`npx shadcn add @skiper-ui/skiper40` brought in six link hover treatments.
Two are adopted (Link000 internal, Link001 external) because they restate the
left-origin inking rule the ledger rows and form fields already use, and they
draw in `currentColor` so one component works on cream, olive and burgundy.
The other four are left unused: two reverse or centre the wipe against the
system's left origin, and two use `mix-blend-difference` over a hardcoded
white, which breaks on every ground here.

No dependency was added; the file is plain CSS transitions over `next/link`.


## Late component adoptions (client-requested)

- **skiper49 → PlateCoverflow.** The inverted-perspective coverflow on the
  Portfolio, above the ledger. Effect config is skiper49's verbatim; the slide
  is ours so empty plates carry lot number, title and provenance instead of a
  broken image. Brings `swiper` and `framer-motion`.
- **skiper58 → TextRoll** on header nav labels. Active state moved from
  underline to bottom border so the roll's overflow clip cannot eat it.
- **Canvas UI Glass** over the About specification plate.
- **Canvas UI decrypt-reveal** around the Portfolio ledger, in cream on
  burgundy. Its `../rect-cache` import was repointed to `@/lib/rect-cache`.
- **Not found:** Skiper UI has no decipher component; the effect the client
  described is Canvas UI's, which is free and was used.


## Reference correction (client-directed)

The client rejected the colour mixing and the ledger arrangement: the
references were not being followed. Changes: no bloom, no ramp, no burgundy
thread; header and footer take their cloth from the route; Portfolio is
burgundy and cream only; everything else olive and cream only. Home and
Products rebuilt to the shop reference (rounded olive hero card, giant heavy
sans word over a plate, thumbnail rail, three-column rounded tiles with pills,
marquee). Portfolio rebuilt to the portfolio reference (rounded collage,
circular thumbnails, cream profile card with a true stats row, pill buttons).
Display type is now Jost 700; Bodoni stays only for the mark. Radius 1.25rem
on tiles, pills for controls. The three late components (coverflow, text roll,
decipher) and Glass on About are retained.


## Type match and visible motion (client-directed)

Client matched the shop reference's type in detail: rounded bold geometric
display word, a much lighter and smaller word beside it, thin-to-regular
regular-case nav and labels, neutral body. Applied: Fredoka 700 (hero) and
600 (headings), Jost 300 subtitle, Jost 400 nav and pills in regular case,
Jost 400 body. Bodoni only for the mark.

Client could not see the animations. Cause: on a large screen nearly every
element is in view at load, so entrances fired before they looked, and the
rest was hover-only. Fix: a choreographed hero assembly (word, subtitle,
plate, rail one by one, caption, pill, ~1.9s), grid stagger raised to 110ms
per item capped at 880ms, and a lift-and-shadow on every tile hover. All off
under prefers-reduced-motion, which was verified off on the client's Chrome.


## Beige everywhere (client-directed)

All pages except the Portfolio: beige grounds (cream page, cream-sheet cards
and bands), headings olive, small text ink, pills olive. Header and footer
follow the route. The Portfolio is untouched: it wraps in `.on-burgundy`, and
the new heading and small-text colour rules revert to inheritance inside that
scope, so it renders exactly as before.


## Letterhead frame, gallery cloth, sentence headings (client-directed)

- `PageFrame`: the contact panel's moulding drawn fixed at the viewport
  edges on every page (skipped on /contact). Olive stroke on beige pages,
  cream on burgundy ones.
- Gallery now shares the Portfolio's burgundy and cream; header and footer
  read both routes. Tunnel plates back to cream sheets with a cast shadow.
- Every h1 to h3 is sentence case with a full stop, in source, plus a
  `::first-letter` backstop. Lowercase transform removed from headings.
