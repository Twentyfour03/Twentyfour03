# Handoff — TwentyFour03 Vintage

What has to happen before this site can go live, in order.

---

## 1. Accounts, all in the client's name

Create each with **her** email. Add the developer as a collaborator, then
remove him at handoff. Her card pays for the domain so renewal never depends
on anyone else.

| Service | What it does | Cost | Status |
|---|---|---|---|
| Resend | Delivers both request forms to her inbox | Free to 3,000 emails/month | Not created |
| Vercel | Hosting | Free Hobby plan | Not created |
| GitHub | Where the code lives | Free | Not created |
| Domain | Old Namecheap domain expired; new one via Google Workspace, to confirm | ~$12–20/year | ⚠️ To confirm |
| Sanity | CMS, when content moves out of code | Free plan | Not created |
| Paystack | Shop checkout (Furniture, Home & Décor) | Per transaction | ✅ Registered, keys not added |

The shop (/shop) sells fixed-price Furniture and Home & Décor through
Paystack. It needs three things before it takes money:

1. `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` and `PAYSTACK_SECRET_KEY` from her
   Paystack dashboard (test keys first, then live).
2. Real items in `shopItems` in `src/lib/content.ts`: name, photo path and
   a GHS price. An item with `price: null` shows "Coming soon" and cannot
   be ordered.
3. Resend switched on (section 2), so paid orders reach her inbox and the
   customer gets a confirmation.

The server prices every basket itself and checks with Paystack that the
full amount arrived in GHS before an order is confirmed.

Still to come from the client: privacy & cookie policy, terms &
conditions, delivery & returns policy (fill `legalPages` in content.ts),
and the six "How it works" images for Services.

---

## 2. Turn the forms on

Both forms validate and render correctly today, but sending fails with a
clear message until this is done. That is deliberate: nothing silently
pretends to have sent.

1. Create the Resend account and add her domain.
2. Add Resend's DNS records at Namecheap. Takes about five minutes, then up
   to an hour to verify.
3. Copy `.env.example` to `.env.local` and fill in all three values.
4. Add the same three as Environment Variables in the Vercel project.
5. Submit both forms end to end and confirm the emails arrive.

Until the domain verifies, Resend will only deliver to the address that owns
the Resend account. That is a Resend restriction, not a bug.

---

## 3. Connect the domain

1. Add the domain to the Vercel project.
2. At Namecheap, add the A record and CNAME that Vercel gives you.
3. SSL is automatic. Do not buy an SSL certificate from Namecheap.
4. Turn on auto-renew for the domain. An expired domain takes the site down
   and is the most common way sites like this die a year later.

---

## 4. Replace the placeholders

All placeholder content is marked `PLACEHOLDER` in `src/lib/content.ts`.
Search that file for the word and work through each one.

- [ ] `site.contact` — email, WhatsApp, phone, Instagram, Facebook, TikTok.
      All six are dummy values right now and appear in the header, footer and
      contact page.
- [ ] `lots` — five portfolio case studies. Each needs the real client type,
      market, quantity and result, plus a photograph. They currently read
      "Plate to follow", which is honest but should not ship long-term.
- [ ] Her portrait on the Portfolio page, currently an empty plate.
- [ ] Product photographs, once she has stock to list.
- [ ] A transparent PNG or SVG logo. The supplied JPEG sits on a green box
      and cannot be placed on burgundy or cream, so the wordmark is set in
      type for now.
- [ ] Gallery photographs for the six plates in `galleryPlates`: warehouses,
      suppliers, loading, packaging, delivered goods, clients. Filling each
      plate's `src` turns it into a real photograph with no other change.
- [ ] A favicon.

---

## 5. Things deliberately not built

- **Testimonials.** Her document asks for a section. She has supplied none
  and inventing them is not an option. Add the section when she has real ones.
- **Checkout.** Nothing in her documents describes fixed prices. Every product
  carries an optional price field, so a product flips from "Sourced to order"
  to a price and a buy action on data alone, with no rebuild.
- **The customer portal and admin dashboard** from her second document.
  Separate project, separate price. See `SCOPE-REVIEW.md`.

---

## 6. Moving content into Sanity

Everything a non-developer would want to change already sits in one file,
`src/lib/content.ts`, shaped so each export maps onto one Sanity document
type: `site`, `coreServices`, `services`, `process`, `values`,
`productCategories`, `lots`, `founderStory`.

Until Sanity is wired, changes are a one-line edit in that file plus a
redeploy. Wiring Sanity swaps the data source; the pages do not change.

---

## 6b. Runtime dependencies added late

Two libraries were added at the client's request for specific components:

| Package | Why | Used by |
|---|---|---|
| `swiper` | The inverted-perspective coverflow | Portfolio plate carousel |
| `framer-motion` | Character roll on hover | Header navigation labels |

Both add to the JavaScript the phone has to download. If load time on mobile
data becomes a complaint, these two are the first things to reconsider. The
Canvas UI effects (Glass, Decrypt Reveal) add no dependency and switch
themselves off on browsers that cannot run them.

## 7. Running it

```
npm install
npm run dev        # http://localhost:3000
npm run build      # production build, must pass before deploying
```

Do not run `npm run build` while `npm run dev` is running. They share the
`.next` directory and the build will kill the dev server.
