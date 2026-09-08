export type NavItem = {
  label: string;
  /**
   * Either a route ("/menus") or a homepage section id ("gallery").
   * Section ids are resolved to "/#gallery" so the links behave correctly
   * from any route, not just the homepage.
   */
  to?: string;
  section?: string;
};

/* Section-based entries are ordered to match the homepage's actual
   top-to-bottom component order (Hero, LocksideWay "#the-lockside-way",
   SignatureFeature "#signature", MenuShowcase "#menus", Occasions, Gallery
   "#gallery", Reviews "#reviews", Visit "#visit", BookingCTA) — so working
   through the nav in order never sends a visitor backwards up the page.
   "About" points at the homepage's own About-style section (LocksideWay,
   the restaurant's story), not the standalone /about page — that page still
   exists and is only linked from the "More about Lockside" CTA inside this
   section. */
export const primaryNav: NavItem[] = [
  { label: "About", section: "the-lockside-way" },
  { label: "Our Steaks", section: "signature" },
  { label: "Our Menus", section: "menus" },
  { label: "Gallery", section: "gallery" },
  { label: "Reviews", section: "reviews" },
  { label: "Find Us", section: "visit" },
];

/** Resolve a nav item to a concrete href. */
export const navHref = (item: NavItem): string =>
  item.to ?? `/#${item.section ?? ""}`;

export const footerNav: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Menus", to: "/menus" },
  { label: "About", to: "/about" },
  { label: "Gallery", section: "gallery" },
  { label: "Find Us", section: "visit" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Accessibility", to: "/accessibility" },
];
