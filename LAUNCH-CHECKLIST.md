# Launch checklist — The Lockside Steakhouse

Everything on this page must be resolved or consciously accepted before the site
goes live. Nothing here is a guess dressed up as fact; each item states exactly
what is uncertain and where the uncertainty came from.

---

## 1. BLOCKERS — resolve before launch

### 1.1 A newer main menu exists and was not supplied

The live site links `Main-menu-June-2026-final.pdf` (uploaded June 2026) in its
menu list, while its navigation still links the November 2025 file. The June
2026 file returns HTTP 401 and could not be retrieved.

- **Built from:** `Main-menu-2025-Nov-changes.pdf` (November 2025)
- **Risk:** prices and dishes on `/menus` may be out of date
- **Action:** send the June 2026 PDF. Update `src/data/menus.ts` → `mainMenu`,
  replace `public/menus/lockside-main-menu.pdf`, and change `effectiveDate`.

### 1.2 Opening hours conflict across three sources

| Source | Friday | Saturday | Sunday |
|---|---|---|---|
| Google Business Profile (supplied 27 Jul 2026) — **used** | 12:00–15:00, 17:00–22:00 | 12:00–22:00 | 12:00–20:00 |
| locksidesteakhouse.com | 09:00–15:00, 17:00–22:00 | 09:00–22:00 | 12:00–22:00 |
| Printed breakfast menu | from 08:00 | from 09:00 | — |

The supplied Google profile was treated as canonical because it is the newest
clearly dated source, and breakfast is shown as a separate service. **Confirm
the correct Friday, Saturday and Sunday hours.** They appear in
`src/data/restaurant.ts` → `openingHours` and `hoursSummary` only.

### 1.3 No reviews are published

`src/data/reviews.ts` is deliberately an empty array. No review text was
supplied, and the section renders an honest link-out panel instead of inventing
quotes.

- **Action:** paste approved reviews (name, rating, wording, source) into
  `reviews`. The marquee, hover/focus pausing and mobile carousel switch on
  automatically.
- **Do not** set `aggregateRating` without deciding which figure is correct: the
  restaurant's public scores differ sharply by platform (Tripadvisor ~3.8 from
  ~544 reviews; Restaurant Guru 4.9). Publishing one number unqualified would be
  misleading.
- The reviews CTA currently points at a plain Google search URL. **Replace with
  the canonical Google Business Profile review link** in
  `restaurant.urls.reviews` — the long `sca_esv=…` search URL supplied contains
  session parameters and will not stay valid.

### 1.4 Rotate the leaked API key

The source Trattoria project's `.env` contained a live `ANTHROPIC_API_KEY`,
committed inside the zip. It exists nowhere in this project, but it must be
treated as compromised and **rotated**.

---

## 2. MENU CONTENT — confirm before launch

All menu text was transcribed from the PDFs and then checked against a
rasterised image of each page. These items need a human yes/no.

| # | Item | What was done | Needs |
|---|---|---|---|
| 2.1 | Main menu "Lets Start" | The PDF contains an orphaned text layer for a *king prawn and giant shrimp skewer* sitting underneath the visible artwork. It is not on the printed menu, so it was **excluded**. | Confirm this dish is discontinued. |
| 2.2 | Tomahawk weight | Printed as `32°Z`; every other steak uses `oz`. Rendered as **32oz**. | Confirm 32oz. |
| 2.3 | Breakfast add-ons | Prices render as 80p for most items and £1 for one, but the source is too low-resolution to say which. Individual prices **omitted**; shows "Extras available from 80p — please ask your server." | Supply the per-item prices. |
| 2.4 | Nachos upgrades | Printed "NACHOS £9.00 / ADD REFRIED BEANS (v) £12 \| PULLED PORK £14 \| BRISKET £14 \| CHILLI £14". Modelled as **total prices** for the loaded version. | Confirm these are totals, not supplements. |
| 2.5 | Macaroni Madness | £13.00 base, "ADD KING PRAWNS OR BRISKET £16.00". Modelled as a **£16 total**. | Confirm. |
| 2.6 | "TRIPPLE PEPPERCORN" | Misspelt on the printed menu. **Left exactly as printed.** | Correct it, or keep? |
| 2.7 | "Brushetta" (lunch menu) | Misspelt on the printed menu. **Left as printed.** | Correct it, or keep? |
| 2.8 | "Mat challenges you to take on the Tomahawk" | Kept verbatim. Mat is publicly named as a co-owner. | Confirm this is fine on the website. |
| 2.9 | Sunday and Nibbles menus | Both PDFs are undated and carry no service times. Sunday availability was inferred from the Sunday opening hours (12pm–8pm); Nibbles shows no availability. | Supply dates and service times. |
| 2.10 | Sunday roast pricing | The restaurant's Tripadvisor blurb mentions a "Sunday steak Royal roast" that does not appear on the supplied Sunday menu. | Confirm the Sunday menu is complete. |
| 2.11 | Allergen information | The site carries a general "tell us about allergies" note. No allergen matrix was supplied. | Confirm this satisfies your obligations, or supply allergen data. |

---

## 3. MISSING PHOTOGRAPHY

Only eight photographs were supplied and **all eight are plated food**. Every
one is used, once. No stock imagery was substituted anywhere.

Priority shots that would materially improve the site:

1. **Exterior / frontage** — currently no arrival image anywhere. Would open the
   gallery and strengthen the Visit section.
2. **Wide dining-room interior** — the only interior context is the blurred
   background of the cocktail photograph. Needed for About and the gallery.
3. **Breakfast plate** — the breakfast menu card on the homepage currently uses a
   deliberate typographic treatment (`MenuShowcase.tsx` → `cardImages`) because
   no breakfast photo exists and a dinner plate would misrepresent it.
4. **Dessert (Bombs Away)** — the menu describes it as the show stopper; there is
   no photograph of it.
5. **Team or service shot** — the gallery story arc in the brief calls for one.

Also note: photograph 1 shows identifiable members of the public in the
background. **Confirm you have permission to publish it**, or supply a
replacement.

---

## 4. OTHER OPEN ITEMS

- **"Vouchers" feature removed** as instructed. Note that
  `thelocksidesteakhouse.touchtakeaway.net` is a Touch Takeaway *ordering*
  portal, not a voucher system — the old site's label was wrong. If you do want
  online ordering or real gift vouchers later, that is a new feature, not a
  restored link.
- **Canonical domain** is set to `https://locksidesteakhouse.com` throughout
  (`restaurant.siteUrl`, `index.html`, `sitemap.xml`, `robots.txt`). If the new
  site launches on a different domain, update those four places.
- **Google Fonts** serves Bebas Neue and Inter, which means Google receives
  visitors' IP addresses. This is disclosed in the privacy policy. If you would
  rather it did not, the fonts can be self-hosted — say the word.
- **Design credit** is unset (`restaurant.designCredit: null`). Supply one if
  wanted; the footer already supports it.
- **Parking and step-free access** are not mentioned anywhere because no
  information was supplied. The accessibility page directs people to phone. Send
  the details and they can be added to the Visit section.
- **Analytics** is deliberately not installed. If you want it, it needs a real
  consent mechanism first — a banner that does nothing is worse than none.
- **Food hygiene rating** — the FSA lists a rating for the premises. Not
  displayed, because the supplied inspection date (September 2023) may be
  superseded. Confirm the current rating if you want the badge shown.

---

## 5. VERIFIED — completed and checked

- [x] Production build succeeds (`tsc -b && vite build`), zero errors
- [x] TypeScript strict, `noUncheckedIndexedAccess` on, **no `any` anywhere**
- [x] ESLint passes with zero warnings
- [x] All six routes render server-side with **no runtime errors and no console
      warnings** (a React `fetchPriority` casing warning was found and fixed)
- [x] Exactly **one `<h1>` per page**; no heading-level skips on any route
- [x] Every `<img>` has an `alt`; decorative images use `alt=""`
- [x] Every icon-only control has an `aria-label`; no empty links or buttons
- [x] No clickable `div` elements — `Button` renders a real `button`, `a` or `Link`
- [x] All 9 external links use `target="_blank"` **and** `rel="noopener noreferrer"`
- [x] `<main>`, `<footer>` and a skip-to-content link on every route
- [x] Map `<iframe>` has an accessible `title`
- [x] **Colour contrast: all 16 token pairs pass WCAG AA.** One failure was found
      (`--fg-subtle` on parchment at 4.36:1) and the token was darkened to
      `#7A6857`, now 4.64:1 on parchment and 5.02:1 on cards.
- [x] Direct navigation and refresh work on `/`, `/menus`, `/about`, `/privacy`,
      `/accessibility` and unknown deep paths (all 200 via SPA fallback)
- [x] `?menu=` deep links work; stale values fall back to the main menu
- [x] All internal asset paths resolve; all static files return 200
- [x] Dojo booking URL verified live (200) and used verbatim
- [x] Structured data is valid JSON-LD with **no unsupported claims** (no
      `priceRange`, `aggregateRating`, `award` or `starRating`)
- [x] `prefers-reduced-motion` respected globally and per-component
- [x] Menu PDFs recompressed **33 MB → 4.3 MB**, each page verified against the
      original render (RMS difference under 10 on every page). One over-aggressive
      pass broke the lunch menu's masked artwork; it was reverted and redone
      conservatively.
- [x] No chatbot code, no `api/` routes, no server files, no `.env`, no secrets
- [x] No Trattoria/Tuscan/Italian/Florence remnants, no `TODO`, `FIXME`,
      `lorem ipsum`, `example.com` or dead imports
- [x] Long menu names hardened against 320px overflow (wrapping flex rows)

---

## 6. Still worth doing after launch

- Run Lighthouse on the deployed URL (mobile) and record the scores.
- Test with a real screen reader (NVDA or VoiceOver) — the markup audit was
  automated, not manual.
- Verify the tel: links dial correctly on a real iPhone and Android handset.
- Submit the sitemap in Google Search Console.
- Check the Open Graph card renders correctly by sharing the URL in WhatsApp,
  Facebook and iMessage.
