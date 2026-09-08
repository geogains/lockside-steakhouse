# The Lockside Steakhouse

Website for The Lockside Steakhouse, 121 Enville Street, Wollaston, Stourbridge.

React 18 · TypeScript (strict) · Vite 5 · Tailwind CSS 3 · React Router 6 ·
Framer Motion · Lucide.

---

## Getting started

```bash
npm install      # install dependencies
npm run dev      # dev server at http://localhost:5173
```

Other commands:

```bash
npm run typecheck   # TypeScript, no emit
npm run lint        # ESLint
npm run build       # production build to dist/
npm run preview     # serve the production build locally
```

There are **no environment variables** and no secrets. Nothing needs configuring
to run this project.

---

## Deploying to Vercel

1. Push the repository to GitHub.
2. In Vercel, **Add New → Project** and import the repository.
3. Vercel detects Vite automatically. Confirm:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
4. Deploy. No environment variables are required.
5. Add `locksidesteakhouse.com` under **Settings → Domains** and point the DNS
   records as Vercel instructs.

`vercel.json` handles the two things that matter:

- **SPA fallback** — every path rewrites to `/index.html`, so visiting or
  refreshing `/menus` directly works instead of 404ing.
- **Cache headers** — hashed build assets are cached for a year and immutable;
  menu PDFs for a day, so a menu swap goes live quickly.

---

## How the project is organised

```
src/
  assets/
    brand/      logo marks
    hero/       hero photograph
    gallery/    gallery photography
    food/       feature photography
  components/
    layout/     Navbar, Footer, RootLayout, ScrollManager
    shared/     Button, Section, SectionHeading, Reveal,
                ImageWithFallback, SkipLink, LegalPage
    home/       the nine homepage sections
    menus/      MenuNavigation, MenuCategory, MenuItem, MenuPdfLink
  data/         ← all content lives here
  hooks/        useSeo
  lib/          cn, structuredData
  pages/        one file per route
  styles/       globals.css (design tokens)
```

The rule the project is built around: **components contain no business
information.** Every phone number, URL, price, opening time and dish lives in
`src/data/`. If you need to change content, you should never have to open a
component.

### Where to change things

| To change… | Edit |
|---|---|
| Phone, email, address, hours, booking URL, socials | `src/data/restaurant.ts` |
| Any menu item, price or description | `src/data/menus.ts` |
| Gallery photos, order, captions, alt text | `src/data/gallery.ts` |
| Customer reviews | `src/data/reviews.ts` |
| Occasions cards | `src/data/occasions.ts` |
| Navigation items | `src/data/navigation.ts` |
| Colours, fonts, spacing tokens | `src/styles/globals.css` + `tailwind.config.ts` |

### Design tokens

Colours were sampled from the real brand assets, not invented: the bull mark
gives `#24180C` (charcoal-brown) and `#F0CC6C` (gold); the printed main menu's
steak panel gives `#A82A22` (red).

Semantic tokens are CSS variables that flip based on a `data-surface` attribute,
so a section can switch between the dark and parchment surfaces without any
component knowing which it is on:

```tsx
<Section surface="light">…</Section>   // parchment
<Section surface="dark">…</Section>    // charcoal
```

Use `bg-bg`, `text-fg`, `text-fg-muted`, `text-accent`, `border-line` and so on
rather than raw colours, and both surfaces work automatically.

Type is **Bebas Neue** for display (the face used on Lockside's own printed main
menu) and **Inter** for body text, prices and UI.

---

## Routes

| Path | Page |
|---|---|
| `/` | Homepage |
| `/menus` | All menus. `?menu=main\|lunch\|sunday\|breakfast\|nibbles\|childrens` |
| `/about` | About |
| `/privacy` | Privacy policy |
| `/accessibility` | Accessibility statement |
| anything else | 404 |

Homepage sections are anchor targets: `/#the-lockside-way`, `/#signature`,
`/#menus`, `/#occasions`, `/#gallery`, `/#reviews`, `/#visit`, `/#book`. These
work from any route — `ScrollManager` resolves the hash after the target route
has rendered, which is what the source project got wrong.

---

## Adding menu content

Menus are typed. Add an item to any section in `src/data/menus.ts`:

```ts
{
  id: "unique-slug",
  name: "Dish Name",
  price: "£12.00",              // omit for fixed-price sections
  description: "What's in it.",
  dietary: ["v"],              // "v" | "ve" | "gf"
  recommendation: "Recommended medium rare",
  options: [{ label: "Large", price: "£16" }],
}
```

Only `id` and `name` are required. The page handles missing descriptions, missing
prices and empty sections without breaking its layout.

**When updating from a new printed menu:** open the PDF and read the actual page,
don't trust copy-and-paste. These particular PDFs contain hidden orphaned text
layers from earlier versions — see `LAUNCH-CHECKLIST.md` §2 for the specific
traps found last time.

---

## Accessibility and privacy notes

Do not undo these without thinking about it:

- The Google map is **click-to-load**. Nothing is requested from Google until a
  visitor presses the button, which is the reason the site sets no cookies and
  needs no consent banner. Embedding the map directly would change that and make
  the privacy policy untrue.
- Booking is an **external link to Dojo**, not an embed. Dojo's booking flow is a
  JavaScript app that does not support reliable embedding.
- Animation is decorative everywhere and stops entirely under
  `prefers-reduced-motion`. `Reveal` renders straight to its final state, so
  content is never trapped behind an animation that will not run.
- Dietary markers always pair a code with a text label, so nothing depends on
  colour alone.

---

## Before you launch

Read `LAUNCH-CHECKLIST.md`. It lists the outstanding content questions, the
opening-hours conflict between sources, the menu prices that need confirming,
and the photographs still needed.
