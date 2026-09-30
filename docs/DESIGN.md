---
name: TwentyFour03 Vintage
description: A procurement agency published as a bound auction catalogue — burgundy cloth, cream plates, ruled lots.
colors:
  burgundy: "#800020"
  burgundy-deep: "#5C0017"
  burgundy-lift: "#96102F"
  cream: "#FFF5E1"
  cream-sheet: "#FAEED6"
  cream-dim: "#D9B8BE"
  olive: "#203C01"
  olive-lift: "#2F5406"
  ink: "#1A1A1A"
  ink-dim: "#6B5B52"
  rule: "#D8C7A8"
typography:
  display-xl:
    fontFamily: "Bodoni Moda, Didot, Bodoni MT, serif"
    fontSize: "clamp(2.5rem, 6.4vw, 4rem)"
    fontWeight: 500
    lineHeight: 0.92
    letterSpacing: "-0.025em"
  display-lg:
    fontFamily: "Bodoni Moda, Didot, Bodoni MT, serif"
    fontSize: "clamp(1.875rem, 5.5vw, 3.75rem)"
    fontWeight: 500
    lineHeight: 0.92
    letterSpacing: "-0.025em"
  display-sm:
    fontFamily: "Bodoni Moda, Didot, Bodoni MT, serif"
    fontSize: "clamp(1.375rem, 2.6vw, 1.875rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Jost, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  body-sm:
    fontFamily: "Jost, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  micro:
    fontFamily: "Jost, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.18em"
rounded:
  none: "0"
spacing:
  gutter-sm: "20px"
  gutter-md: "32px"
  gutter-lg: "48px"
  row: "28px"
  block: "40px"
  section: "80px"
  section-lg: "112px"
components:
  button-solid:
    backgroundColor: "{colors.burgundy}"
    textColor: "{colors.cream}"
    typography: "{typography.micro}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  button-solid-hover:
    backgroundColor: "{colors.burgundy-deep}"
    textColor: "{colors.cream}"
  button-reverse:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.burgundy}"
    typography: "{typography.micro}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  button-reverse-hover:
    backgroundColor: "{colors.cream-dim}"
    textColor: "{colors.burgundy}"
  button-ruled:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.micro}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  button-ruled-hover:
    backgroundColor: "{colors.burgundy}"
    textColor: "{colors.cream}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink-dim}"
    typography: "{typography.micro}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  chip-selected:
    backgroundColor: "{colors.burgundy}"
    textColor: "{colors.cream}"
    typography: "{typography.micro}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  field-control:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "10px 0"
  plate:
    backgroundColor: "{colors.cream-sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "40px"
  ledger-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "32px 0"
---

# Design System: TwentyFour03 Vintage

## Overview

**Creative North Star: "The Auction Catalogue"**

The site is a bound catalogue of lots, not a brochure. Olive is the cloth
binding, cream is the paper, and every sourced thing — a service, a product
category, a completed project — is an entry with a reference number in the
gutter, a lowercase didone title, a short provenance line, and a hairline rule
beneath it. Hierarchy comes from scale, case and rule; never from a third
typeface, a weight ramp, a badge, or a card shadow. A page is read down a
single ruled column the way a catalogue is read, and the edge-to-edge olive
bands are the section dividers of a bound volume rather than decorative hero
blocks.

The two clothes never mix. Every surface is olive and cream only, except the
Portfolio, which is burgundy and cream only, header and footer included. There
is no bloom, no ramp, no burgundy thread on olive pages and no olive touch on
the Portfolio. The header and footer read the route and change cloth with it.

The density is editorial and deliberately uneven: enormous lowercase display
set against sans copy several times smaller, with nothing in between. Cream
sheets (plates) are the only elements that lift off the ground, and only by one
soft shadow. Corners are square everywhere. Ornament exists in exactly one
place — the drawn baroque corner scroll on the framed panels of About, Contact
and Portfolio — and it is a stroked SVG in the world's own hairline weight, not
an image and not a CSS flourish.

No ground is flat. Every coloured field and the cream page carry a laid-paper
treatment: fine horizontal laid lines at roughly 2% and a soft diagonal wash,
brighter at the top-left and deepening toward the bottom-right. Horizontal
lines only, because a cross-hatch reads as graph paper and a single axis reads
as stock.

Colour is load-bearing rather than decorative: cream reads 11.36:1 on olive
and 12.55:1 on burgundy, with one dim tone holding 7.31:1 or better on both.
Computed, not eyeballed; nothing falls below its floor.

**Key Characteristics:**
- Beige everywhere with olive headings and ink text; burgundy and cream on the Portfolio only
- Fredoka for the big words, Jost for everything else, the didone only for the 24.03 mark
- Rounded tiles (1.25rem) and pill controls, from the shop and portfolio references
- Rounded photo tiles with a name and a pill, collaged cards on the Portfolio
- One shadow in the entire system, on the cream plate
- Lowercase display, uppercase wide-tracked micro labels, nothing between
- Laid-paper ground on every surface; nothing is a flat fill, and no two fields meet at a hard edge
- One motion sequence, on the home hero only

## Colors

Four pinned values — olive, cream, burgundy, ink — plus the derivations needed
to keep them legible against each other.

### Primary
- **Binding Olive** (`{colors.olive}`): the cloth, sampled from the mark so the
  mark sits on it natively. Full-bleed grounds for header, footer, and the hero
  and band sections of Home, About, Services, Products, Contact and Spare
  Parts. Solid fill for the primary action on cream grounds. The lot price, and
  the focus ring.
- **Deep Olive** (`{colors.olive-deep}`): the tonal step. Used on the band that
  sits directly above the footer so olive never meets olive at a seam, and as
  the hover state for solid olive buttons.
- **Lifted Olive** (`{colors.olive-lift}`): hover wash for a linked ledger row
  on an olive ground. Never a ground, never a button.

### Secondary
- **Portfolio Burgundy** (`{colors.burgundy}` `#63001A`): the Portfolio's ground, the bloom dyed
  into every olive field, the ledger reference on cream, and the error state
  (12.55:1 on cream).
- **Pressed Burgundy** (`{colors.burgundy-deep}`) and **Lifted Burgundy**
  (`{colors.burgundy-lift}`): the same hover roles as their olive counterparts,
  scoped to the Portfolio.

### Neutral
- **Catalogue Cream** (`{colors.cream}`): the page. Body background, reversed
  type on every olive and burgundy ground, and the reverse-button fill inside
  those bands.
- **Plate Cream** (`{colors.cream-sheet}`): the sheet lifted off the binding.
  Plate backgrounds, the hover wash on a ledger row over cream, and the
  scrollbar track. Half a step warmer and darker than the page so a plate reads
  as paper on paper.
- **Dim** (`{colors.dim-dark}` `#D8C3C0`): secondary copy, ledger references
  and market names on every dark ground. One tone, warm enough for burgundy and
  cool enough for olive, holding 7.31:1 at its worst point on the ramp.
- **Catalogue Ink** (`{colors.ink}`): body text on cream.
- **Dimmed Ink** (`{colors.ink-dim}`): secondary copy, hints, field labels and
  gutter references on cream (5.98:1).
- **Hairline Rule** (`{colors.rule}`): the printed rule between entries on a
  cream ground — a warm paper line, never black.

### Named Rules
**The Ground Owns the Rule.** The hairline colour is a cascade variable, not a
fixed value. On cream it is the warm rule tone; any element carrying
`on-olive` or `on-burgundy` redefines it to a 34% cream tint so the line reads
against a dark ground; a Plate resets it back to the rule tone so a cream sheet
on a dark ground keeps a visible hairline inside itself. The same cascade
carries `--dim` (secondary text tinted from its own ground) and `--row-hover`.
Set the ground, and the rules, dim text and hovers all follow — never hand-pick
a border or muted colour per instance.

**The Beige Page Rule.** Every surface except the Portfolio is beige: cream page, cream-sheet cards and bands, headings in olive, small text in ink, olive pills. Olive never fills a ground off the Portfolio. The Portfolio and the Gallery are burgundy and cream, header and footer included, and are scoped so the beige rules fall back to inheritance inside them. Header and footer take their tone from the route.

**The Tonal Step Rule.** Two olive grounds never meet at a seam. The band
directly above the footer drops to olive-deep so the transition reads as a
fold in the binding rather than a join that failed.

**The Paper Ground Rule.** No field is a flat fill. Every ground carries the
laid-line and wash treatment through the `ground` class, which reads its two
values from the same cascade the rules use. Horizontal laid lines only; a
second axis turns paper into graph paper.

**The Focus Inversion Rule.** The focus ring is a 2px olive outline offset 3px.
Inside `on-olive` and `on-burgundy` it lifts to cream, because olive on olive
is invisible. Every interactive element inherits this; no component draws its
own ring.

## Typography

**Display Font:** Bodoni Moda (with Didot, Bodoni MT, serif) — self-hosted through `next/font`, weights 400/500/600, roman and italic.
**Body/UI Font:** Jost (with `ui-sans-serif`, `system-ui`) — self-hosted through `next/font`, weights 300/400/500.

**Character:** A high-contrast didone set lowercase and very tight against a quiet geometric sans set small and wide-tracked. The pairing is the whole hierarchy: there is no third face, no italic display in production copy, and no weight ramp doing work that scale and case should do.

### Hierarchy
- **Display XL** (500, `{typography.display-xl}`, line-height 0.92, tracking -0.025em, balanced wrap): page titles and the hero. Always lowercase. The ceiling of 4rem is set by the hero's longest authored line, "delivering with confidence.", which must hold on one line from 1280 up.
- **Display LG** (500, `{typography.display-lg}`): section openings and the footer call. Lowercase, capped around 14–18ch so the measure stays a headline and not a paragraph.
- **Display SM** (500, `{typography.display-sm}`, line-height 1.05, tracking -0.015em): the title of a ledger entry, a lot, or a mobile nav item.
- **Body** (400, `{typography.body}`, line-height 1.6): default running text.
- **Body Small** (400, `{typography.body-sm}`): the working size for lede paragraphs, entry bodies and field text; this, not Body, is what most copy ships at.
- **Micro** (400, `{typography.micro}`, uppercase, tracking 0.18em): the catalogue's caption voice — nav links, references, labels, statuses, chips and every button face.

### Named Rules
**The Chasm Rule.** The scale is two clusters with nothing between them: display runs 1.375rem and up, everything else runs 1rem and down. Do not introduce a 1.125–1.25rem "subhead". If something needs more presence, make it a Display SM; if it needs less, make it Micro.

**The Rounded Display Rule.** The big words are Fredoka, the rounded geometric sans of the shop reference: the hero word at 700, slightly condensed and tight; section headings at 600 with near-normal tracking so they stay soft. The word beside the hero word is Jost 300, much smaller and lighter. Navigation and small labels are Jost 400 in regular case with no tracking; pills are the same. Body is Jost 400. Bodoni Moda survives only as the 24.03 mark because that is what the logo numerals are set in.

**The Sentence Rule.** Every heading starts with a capital letter and ends with a full stop, on every page including the Portfolio. Heading strings are written that way in source, and a zero-specificity `::first-letter` rule on h1 to h3 is the backstop. (This replaced the earlier lowercase display rule on the client's instruction.)

**The Letterhead Rule.** The contact panel's moulding is drawn once at the edges of the viewport on every page, fixed, as a hairline with the four corner scrolls, so each page reads as a sheet of stationery. Olive on beige pages, cream on the burgundy ones. Not drawn on /contact, which carries the frame on its own panel.

**The Former Lowercase Display Rule.** Display type is always lowercase, including proper nouns and page titles. Micro type is always uppercase. Nothing is title-case.

**The Numeral Column Rule.** Any element carrying a lot reference, price, step number or the 24|03 mark is marked `data-numeral` and set in tabular lining figures, so numbers align down a column across every surface.

**The Authored Break Rule.** Display headlines balance their own wrap by default; a headline whose line breaks are authored in the markup opts out of balancing so the written composition survives. Three authored lines are a desktop promise only — below 1280 the hero stacks and wraps.

## Layout

One centred column, max width 1400px, with gutters of 20px (mobile), 32px (≥640px) and 48px (≥1024px). The framed panels on About, Contact and Portfolio narrow to 1100px so the moulding stays close to the text. Vertical rhythm is 80px per section, opening to 112px at ≥1024px; a ledger row is 28–32px of padding above and below its rule.

Inside a section, the ledger grid is the default: a reference gutter of 6rem (≥640px) or 8rem (≥1024px), a flexible content column, and an optional right-hand status column that right-aligns at ≥1024px. Below 640px the gutter collapses and the reference stacks above the title. Running text is capped at 68ch with pretty wrapping; hero and lede paragraphs are pulled tighter still (46ch) so they read as caption against the display.

The home hero reserves the first viewport at ≥1024px (`min-height: calc(100svh - 4.6rem)`) and pushes the cream selvedge rule and market strip to its bottom edge so the viewport closes on a line. At ≥1280px the hero splits 2.5fr/1fr, display left and plate right; below that it stacks. The header is sticky at the top of the burgundy ground with a hairline under it; navigation collapses to a Menu toggle below 768px that opens a stacked list of Display SM links.

## Elevation & Depth

The system is flat by design and layers tonally: depth comes from a change of ground (cream page → olive band → deep-olive band, and burgundy on the Portfolio) and from hairline rules, not from shadows. There is exactly one shadow in the build.

### Shadow Vocabulary
- **Plate lift** (`box-shadow: 0 18px 40px -24px rgba(26,26,26,0.55)`): the cream sheet lifted a few millimetres off the binding. It is a wide, low, negative-spread diffusion with no visible edge.

### Named Rules
**The One Shadow Rule.** The Plate carries the only shadow in the system. Buttons, chips, fields, rows, panels and bands are flat at rest and flat on hover; state is shown by a change of fill or rule, never by lifting. Do not add a second elevation step, and never a hard offset shadow — this is a printed catalogue, not a poster.

## Shapes

Tiles and cards are rounded 1.25rem; controls are full pills. This replaced the earlier zero-radius rule on the client's instruction to follow the shop and portfolio references.

Square, everywhere. Border radius is zero on buttons, chips, plates, fields, panels and the scrollbar thumb; nothing in the shipped system is rounded. Strokes are 1px and only 1px: the hairline rule between entries, the 1px underline on links with a 0.25em offset, the bottom rule under a form control, the 25–50% alpha borders on ruled buttons and framed panels, and the non-scaling 1px stroke of the corner ornament. The one deliberate stroke variation is the dashed 1px border on the forthcoming lot's empty plate, which marks a slot that is reserved rather than filled.

The recurring silhouettes are the rule (a full-width hairline that opens a section and closes a run), the plate (a filled cream rectangle, optionally shadowed, optionally 4:3 or 5:4), and the framed panel (a bordered rectangle with four drawn corner scrolls laid over the moulding at 60% opacity).

## Components

### Buttons
- **Shape:** hard rectangle (0 radius), face set in Micro (uppercase, 0.18em tracking), padding 16px 32px; the form submit runs wider at 16px 40px.
- **Solid:** olive fill, cream text. The primary action on a cream ground. Hover deepens the fill to deep olive.
- **Reverse:** cream fill, olive text (burgundy on the Portfolio), used only inside a dark band. Hover shifts the fill to dimmed cream, keeping the text colour.
- **Ruled:** transparent fill with a 1px border — `ink/25` on cream, `cream/50` on a dark ground — and inherited text colour. Hover fills it with olive and flips the text to cream.
- **Focus:** the global olive (or cream, on dark) ring; no per-button ring.
- **Disabled:** 60% opacity and a not-allowed cursor; the submit button swaps its label to "Sending…" while pending.

### Inline Links

From `@skiper-ui/skiper40`, vendored at
`src/components/ui/skiper-ui/skiper40.tsx`. Only two of its six variants are
adopted, because they are the two that restate a mechanic the system already
owns: a rule that inks in from the left.

- **Link000** — internal links. A `0.05em` rule sits collapsed from the right
  at rest and wipes in from the left on hover over 300ms. It is drawn in
  `currentColor`, so it reads correctly on cream, olive and burgundy without
  a per-ground override.
- **Link001** — external links. The same rule plus a small drawn arrow that
  rises and fades in on hover, and `target="_blank"`.

In use on the footer's page and social lists and the contact panel's
channels. Reduced motion is covered by the global transition clamp.

**Not adopted:** Link002 and Link003 reverse or centre the wipe, which
contradicts the left-origin rule used by ledger rows and form fields.
Link004 and Link005 grow a filled bar with `mix-blend-difference` over a
hardcoded `bg-white`, which is a screen effect and would break on all three
grounds.

### Chips
- **Style:** Micro face, square, 12px × 20px padding, 1px `ink/20` border, dimmed-ink text.
- **State:** selected is an olive fill with cream text and an olive border; unselected darkens its border and text on hover. Selection is expressed with `aria-pressed`.

### Cards / Containers (Plate)
- **Corner Style:** square.
- **Background:** plate cream on any ground.
- **Shadow Strategy:** the single Plate lift from Elevation & Depth.
- **Border:** none; the sheet is defined by its fill and its shadow.
- **Internal Padding:** 32–40px.
- **Distinctive behaviour:** a Plate resets the hairline variable to the warm rule tone, so rules drawn inside it stay visible even when the plate sits on a dark ground.

### Inputs / Fields
- **Style:** ledger-ruled. No box: transparent background, no side or top borders, a single 1px `ink/25` bottom rule, 10px vertical padding, text at Body Small. The label above is Micro in dimmed ink, with a burgundy asterisk when required (burgundy on cream is 10.01:1, and required-marks and errors are the only burgundy outside the Portfolio).
- **Hover / Focus:** the bottom rule darkens to `ink/45` on hover and becomes olive on focus; the browser outline is suppressed on the control because the rule itself is the focus signal.
- **Error:** the bottom rule turns burgundy and a 0.8125rem burgundy message replaces the hint below the field; `aria-invalid` and `aria-describedby` are wired to it.
- **Hint:** 0.8125rem dimmed ink under the field, shown only when there is no error.
- **Disabled:** 50% opacity, rule and all.
- **Select:** the native affordance is suppressed (`appearance: none`) and redrawn as a 16px chevron in a 1px stroke, dimmed ink, pinned to the right edge.
- **File:** the native button is restyled as a Ruled button at Micro size that fills olive on hover.

### Navigation
- Sticky olive bar closed by a hairline. The mark is set in the display face at 1.5rem with tabular figures; the wordmark beside it is Micro in the ground's dim tone and brightens on hover.
- Links are Micro. The current page is cream with a 1px cream/70 underline offset 0.45em; the rest are dimmed cream and brighten on hover. `aria-current="page"` carries the state.
- A Ruled button (cream/50 border) holds "Request a quote" at the right.
- Below 768px the row collapses to a Menu/Close toggle; the panel stacks Display SM links separated by `cream/15` rules and ends with a full-width cream Reverse button.

### Ledger Row (signature)
The catalogue's answer to a grid of identical cards, and the primary content idiom on every surface. A hairline rule opens each row; the reference sits in the left gutter in Micro tabular figures; the title is Display SM lowercase; the body is Body Small in the dim tone for its ground, capped at 68ch; an optional aside (usually lot status) right-aligns at ≥1024px. A linked row is a plain anchor with no underline that washes its whole band on hover — plate cream over a cream ground, and the ground's own lift tone over a dark one, resolved through `--row-hover`. Every run of rows is closed by one more bare rule, so the ledger ends on a line.

### Lot Status (signature)
Status lives in the entry, never in a badge bolted onto it. With no price it reads "Sourced to order" in Micro dim; with a price it reads "From GHS …" in Micro olive with tabular figures.

### Plate Tunnel (signature)

The gallery's depth mechanic. Cream plates are spaced down the spine of the
catalogue and the whole run is pulled toward the reader as the section
scrolls, so the scroll is the travel rather than a trigger attached to it.
Plates dim and blur with distance (`--dist`) and leave quickly once past the
reader (`--near`), so at most three read at once and none swells across the
frame. CSS 3D transforms plus one rAF-throttled scroll listener; no
dependency, no canvas, no WebGL.

Depth is opt-in at runtime: the server renders a ruled grid, and the tunnel
is switched on after mount only when the reader has not asked for reduced
motion. `abs()` is avoided in favour of `max(d, -d)` for browser reach.

### Plate Coverflow

Skiper UI's inverted-perspective coverflow (`skiper49`), carrying the
catalogue's plates instead of bare images. The Swiper effect configuration
is skiper49's exactly (rotate 40, depth 100, slide shadows); only the slide is
ours, so an empty plate still shows its lot number, title and provenance line
instead of a broken image. Navigation chevrons are drawn 1px strokes in cream
that invert on hover. In use on the Portfolio above the ledger. Depends on
`swiper` and `framer-motion`.

### Text Roll Navigation

Skiper UI's `TextRoll` (`skiper58`) on the header labels: each character rolls
up and its twin rolls in from below, staggered 35ms per character. The active
indicator is a bottom border rather than an underline so the roll's
`overflow-hidden` cannot clip it. Depends on `framer-motion`.

### Glass (About)

Canvas UI's HTML-in-canvas glass lens over the About specification plate: a
circular lens with refraction and a slight zoom follows the cursor, the lens a
collector holds over a plate. Degrades to the plain plate where HTML-in-canvas
is unsupported. No dependency.

### Decrypt Reveal (Portfolio)

Canvas UI's `decrypt-reveal` around the Portfolio ledger: the records render
as cipher text in the catalogue's cream on burgundy and decode to crisp type
in a radius around the cursor. The HTML stays interactive underneath, and it
degrades to the plain ledger where unsupported. No dependency. Its shipped
`../rect-cache` import was repointed to the project's `@/lib/rect-cache`.

### Framed Panel (signature)
A 1px moulding (`cream/35` on a dark ground, `burgundy/30` on cream) with generous inset padding (28–80px), used for the openings of About, Contact and Portfolio. The straight runs are a real border so the moulding never breaks mid-edge; four drawn baroque corner scrolls — stroked SVG, 1px non-scaling, acanthus sprays and a pinning rosette — are laid over the corners at 60% opacity, mirrored into each corner, and marked `aria-hidden`.

### Motion

**In a catalogue, type is pressed, not faded in.** Every animation is an act
of printing. Nothing floats, nothing parallaxes, nothing reveals itself twice,
and no section receives a generic entrance.

- **The opening sequence** runs once, on the home hero only: `rule-draw`
  (900ms) draws the binding rule, `plate-settle` (900ms, 220ms in) lays the
  plate down, `numeral-set` (620ms, 700ms in) sets the lot number into its
  column. It is the surface's one authored moment and it is not repeated
  anywhere else in the build.
- **The impression** (`impression`, 560ms) is how a heading or a ledger entry
  arrives: it presses up 0.22em while the ink resolves from a 7px blur to
  sharp. Driven by `Press`, a one-shot intersection trigger. Elements already
  on screen press immediately rather than waiting for a scroll that never
  comes.
- **Stagger** is 70ms per sibling, hard-capped at 350ms total, applied through
  `--press-delay`. A list reads as a list; it never becomes a queue.
- **The rule answers the pointer.** `.ledger-row::after` inks a rule across
  from the left on hover and focus (320ms). The row is a ruled line first and
  a container second, so the rule is what responds.
- **The field rule.** `.field-rule::after` inks in from the left on
  `:focus-within` (260ms) rather than switching colour, so the caret and the
  rule agree about where the entry begins.

Easing is `cubic-bezier(0.16, 1, 0.3, 1)` throughout: confident arrival, no
bounce, no elastic.

**Content is never hidden waiting for motion.** Every animated element is
rendered plain and fully visible; the `from` state exists only for the
duration of the animation. A blocked or failed script leaves a readable page.

**Named Rules**

**The Assembly Rule.** A hero opens as a visible sequence: word (900ms), then subtitle, plate, rail thumbnails one by one, caption, pill, ending around 1.9s. Grids assemble with a 110ms stagger capped at 880ms. Tiles lift 6px with a cast shadow on hover. All of it is off under reduced motion.

**The Pressed Type Rule.** Type enters by being pressed into the sheet, never
by sliding in from a side, scaling up, or parallaxing. If an effect could be
described without the word "printing", it does not belong in this system.

**The Reduced Motion Rule.** Reduced motion keeps the meaning and drops the
travel. The impression degrades to a 200ms opacity resolve, the opening
sequence does not run, rules stay drawn rather than animating, and every
hover and focus state remains legible. Reduced motion is fewer and gentler
animations, not an absence of feedback.

## Do's and Don'ts

### Do:
- **Do** build new content as ledger rows: hairline rule, Micro reference in the gutter, lowercase Display SM title, Body Small provenance, optional status aside, and a closing bare rule under the run.
- **Do** set the ground with `on-olive` / `on-burgundy` and let the hairline, dim-text and row-hover variables resolve themselves; reset it with a Plate when a cream sheet sits on a dark ground.
- **Do** keep the container at 1400px with 20/32/48px gutters and 80/112px section rhythm, and narrow to 1100px only for framed panels.
- **Do** mark every reference, price, step number and the 24|03 mark with `data-numeral` so figures stay tabular and lining.
- **Do** state a lot's status inside the entry — "Sourced to order" or "From GHS …" in olive — rather than adding a badge.
- **Do** keep contrast at the shipped floor: dim tones on their grounds at ~5.9:1, and no supporting text below the 4.76:1 of the process numerals.

### Don't:
- **Don't** introduce a third typeface, an extra weight, or any type size between 1rem and 1.375rem.
- **Don't** round a corner. Radius is zero across the system.
- **Don't** add a second shadow or any hard offset shadow; the Plate lift is the only elevation, and everything else is flat at rest and on hover.
- **Don't** put burgundy type, rules or small marks on olive — it computes to 1.13:1. Burgundy outside the Portfolio appears only as the error state on cream. And don't let two olive grounds meet at a seam; step the upper one to deep olive.
- **Don't** set display type in uppercase or title case, and don't put an uppercase Micro kicker above a headline as a decorative label — Micro is a reference, a status or a control face, never an eyebrow.
- **Don't** add a glyph-font or icon-library icon; the only marks in the system are drawn 1px SVG strokes (the select chevron and the corner scroll).
- **Don't** replace the ruled fields with boxed inputs, or draw a per-component focus ring instead of inheriting the global olive/cream one.
- **Don't** extend the hero's opening sequence to another surface; other
  surfaces open with the impression, which is an arrival, not a performance.
- **Don't** animate type by sliding, scaling or parallaxing it. Type enters by
  being pressed into the sheet. If an effect cannot be described with the word
  "printing", it does not belong here.
- **Don't** hide content while it waits to animate. Every animated element
  renders plain and visible; the `from` state exists only while the animation
  runs, so a blocked script leaves a readable page.
