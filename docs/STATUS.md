# Status — TwentyFour03 Vintage

Where the build stands on 10 October 2026, and what is left. Read this
first when picking the project up on another machine. `HANDOFF.md` has the
launch checklist; sections 8 and 9 there list the same changes in more
technical detail.

---

## Set up on a new machine

```
git pull
npm install
```

Then create `.env.local` in the project root (it is never committed):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=czl8z3w3
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=   # pk_test_... from the Paystack dashboard
PAYSTACK_SECRET_KEY=               # sk_test_... from the Paystack dashboard
RESEND_API_KEY=                    # needed for any form to send
REQUEST_INBOX=
REQUEST_FROM=
```

`npm run build` fails without the Sanity project id. `npm run dev` for
local work; do not run both at once.

---

## What was done in this round (7–10 October)

**Shop**
- 41 furniture pieces from the client's catalogue (9 October): names,
  sizes, GHS prices. Photos in `public/shop/`.
- Every sofa and bed is ordered in one of 12 colours; the server refuses an
  order without one.
- Six Home & Décor lighting pieces, photos only, "Price to follow".
- Currency picker with flags (GHS, CNY, AED, EUR, GBP, USD), set from the
  visitor's time zone. Charged in GHS regardless.
- Photos open full size on a tap. The price/payment/delivery box is gone.

**Checkout**
- Order summary with colours, tax note, link to the terms.
- Fixed: Paystack's window used to open behind the basket panel.
- Order details are attached to the Paystack transaction as metadata.

**Pages**
- Home: the client's film behind "Sourcing globally" (muted, looping),
  Originkit Fluid Text on the heading, category images, six-steps picture.
- About: Originkit globe with lines from Ghana to the sourcing markets.
- Services: procurement picture behind the heading; six step pictures.
- Portfolio: four portraits, a fifth beside "Start your project", pictures
  on all five project slides, olive cards and pills, now before Shop in
  the menu.
- Gallery: rebuilt as a plain grid of 20 factory and warehouse photos on
  beige, with a filter and tap-to-enlarge.
- Contact: rebuilt after the client's references (receiver, "CONTACT US
  today" lettering, envelope card).
- Footer: socials stacked in brand colours, newsletter sign-up, "Legal".
- Legal: privacy policy and terms from the client's PDFs.
- Logo: the client's mark on its olive box, everywhere; also the tab icon.

**Under the hood**
- New dependencies: `three`, `d3-geo` (+ their types).
- Sanity is connected (project `czl8z3w3`). Where Sanity has an entry with
  no image or text, the site falls back to what is in `content.ts`.

---

## What is left

### Needs the client
- [ ] Prices for H-030 and H-041 (not in her catalogue).
- [ ] Names and prices for the six Home & Décor pieces. The current names
      are descriptions written from the photos.
- [ ] Confirm H-047's size: catalogue says 455 × 152 × 81 cm, the supplier
      sheet says 45. The site uses 45.
- [ ] Confirm whether the burgundy Chesterfield suite is for sale. It is in
      the gallery only.
- [ ] Real project details and photos for the five portfolio projects.
      Three of the slide pictures are illustrative stock-style images.
- [ ] A separate delivery & returns policy, if she wants one. That page
      currently repeats sections 5 and 6 of the terms.
- [ ] Real testimonials (section stays hidden until there are some).
- [ ] VAT: is the business VAT-registered? Prices are shown tax-inclusive
      with no VAT line.
- [ ] A vector or transparent logo file. The current one is cut from a JPEG.
- [ ] A 1080p export of the hero film. The current file is 864 × 576.

### Needs doing by the developer
- [ ] Add to Vercel: both Paystack keys, and check `RESEND_API_KEY`,
      `REQUEST_INBOX`, `REQUEST_FROM` are there. Resend could not be
      checked from the machine this round was done on.
- [ ] Complete one Paystack test payment end to end. The test window was
      opened and confirmed clickable, but no payment was finished.
- [ ] Send both request forms and a newsletter sign-up on the deployed
      site and confirm the emails arrive.
- [ ] Test on a real phone. All checks so far were in desktop Chrome at
      phone width.
- [ ] Edit the shipping FAQ in the Studio to "45 to 60 days, or earlier",
      then remove the swap in `getFaqs` (`src/lib/data.ts`).
- [ ] Decide where shop stock lives. Adding even one shop item in Sanity
      replaces the whole list in `content.ts`, so move all of it or none.
- [ ] Place or drop the unused images: five machinery pictures, the
      "Home & Décor" and "Send us a request" graphics, sheet H-017.
- [ ] Delete `src/components/catalogue/plate-tunnel.tsx` and its CSS
      (unused since the gallery rebuild).
- [ ] Switch Paystack to live keys at launch.
- [ ] Everything still open in `HANDOFF.md` sections 1–4 (domain, accounts
      in the client's name, favicon check, handoff call).

### Known rough edges
- The service labels still read "24.03/01" to "24.03/08".
- Lint reports the `set-state-in-effect` rule in five files (four predate
  this round). The build is unaffected.
- The hero film file still contains its audio track; it is silenced by the
  `muted` attribute only.
