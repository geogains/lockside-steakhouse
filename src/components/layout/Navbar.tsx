import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu as MenuIcon, X, Phone } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { primaryNav, navHref } from "@/data/navigation";
import { restaurant } from "@/data/restaurant";
import { Button } from "@/components/shared/Button";
import { Logo } from "@/components/shared/Logo";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { cn } from "@/lib/cn";

const NAV_HEIGHT = "h-16 md:h-20";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const reduced = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* The hero only exists on the homepage, so every other route starts solid. */
  const overHero = location.pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close the drawer whenever the route changes. */
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  /* Lock the document scroll while the drawer is open.
   *
   * A plain `overflow: hidden` on <body> does not stop touch scrolling on
   * iOS Safari, which is what made the page behind the drawer keep
   * scrolling. Pinning the body with `position: fixed` and compensating
   * with a negative `top` offset is the combination that actually holds
   * still on iOS, and restoring `scrollTo` on the way out puts the user
   * back exactly where they left off with no jump. */
  useEffect(() => {
    if (!open) return undefined;

    const { body } = document;
    const scrollY = window.scrollY;
    const scrollbarGap = window.innerWidth - document.documentElement.clientWidth;

    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    if (scrollbarGap > 0) body.style.paddingRight = `${scrollbarGap}px`;

    return () => {
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.left = previous.left;
      body.style.right = previous.right;
      body.style.width = previous.width;
      body.style.overflow = previous.overflow;
      body.style.paddingRight = previous.paddingRight;
      /* The site enables `scroll-behavior: smooth` globally, which would
         otherwise turn this restore into a slow, visible scroll animation
         back up the page. Forcing "instant" here keeps it a silent,
         same-frame snap regardless of that setting. */
      window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
    };
  }, [open]);

  /* Trap Tab inside the drawer and let Escape close it. */
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    /* Move focus into the panel so keyboard users are not left behind.
     * This focuses the panel itself, not its first link — focusing that
     * link programmatically made browsers treat it as focus-visible, so
     * "About" (simply the first item in the list) opened every time the
     * menu opened wearing a gold focus ring nobody had asked for, on touch
     * as well as keyboard. Focusing the (tabIndex={-1}) panel container
     * sidesteps that: real keyboard focus only ever lands on a nav item
     * when the user actually presses Tab, which is exactly when a focus
     * ring is warranted. */
    panelRef.current?.focus({ preventScroll: true });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isActive = (to?: string) =>
    Boolean(to) && (to === "/" ? location.pathname === "/" : location.pathname === to);

  return (
    <>
      <header
        data-surface="dark"
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-swift",
          overHero && !open
            ? "bg-gradient-to-b from-ink/80 to-transparent"
            : "border-b border-line bg-ink/95 backdrop-blur-md",
        )}
      >
        <div
          className={cn(
            "container-content flex items-center justify-between gap-4",
            NAV_HEIGHT,
          )}
        >
          <Link
            to="/"
            className="flex min-w-0 shrink-0 items-center py-2"
            aria-label={`${restaurant.name} — home`}
          >
            <Logo className="h-10 w-auto md:h-12" />
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.label}
                to={navHref(item)}
                aria-current={isActive(item.to) ? "page" : undefined}
                className={cn(
                  "font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-200",
                  isActive(item.to)
                    ? "text-brass"
                    : "text-bone/80 hover:text-brass",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${restaurant.telephone.dial}`}
              className="hidden h-11 w-11 items-center justify-center rounded-card border border-line
                         text-bone/80 transition-colors hover:border-brass hover:text-brass sm:flex"
              aria-label={`Call ${restaurant.shortName} on ${restaurant.telephone.display}`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
            </a>

            <Button as="route" to="/menus" className="hidden sm:inline-flex">
              View Menu
            </Button>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center rounded-card text-bone
                         transition-colors hover:text-brass lg:hidden"
            >
              {open ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Rendered as a sibling of <header>, not a descendant of it.
          <header> conditionally gets `backdrop-blur-md` once the page is
          scrolled, and a `backdrop-filter` establishes a new containing
          block for `position: fixed` descendants. With the panel nested
          inside <header>, its fixed positioning silently started resolving
          against the small header box instead of the viewport the moment
          that class applied — collapsing/clipping it, which is what made
          the drawer look like it opened and immediately broke. Keeping the
          panel outside <header> avoids that regardless of header state. */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-navigation"
            ref={panelRef}
            tabIndex={-1}
            data-surface="dark"
            {...(reduced
              ? {}
              : {
                  initial: { opacity: 0, y: -8 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -8 },
                  transition: { duration: 0.25, ease: [0.22, 0.61, 0.36, 1] },
                })}
            className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-ink
                       pt-24 safe-b outline-none md:pt-28 lg:hidden"
          >
            <nav
              aria-label="Mobile"
              className="container-content flex min-h-full flex-col gap-1 py-8"
            >
              {primaryNav.map((item) => (
                <Link
                  key={item.label}
                  to={navHref(item)}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.to) ? "page" : undefined}
                  className={cn(
                    "flex min-h-[56px] items-center border-b border-line font-display text-2xl",
                    "tracking-[0.08em] transition-colors",
                    isActive(item.to) ? "text-brass" : "text-bone hover:text-brass",
                  )}
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-8 flex flex-col gap-3">
                <Button as="route" to="/menus" size="lg">
                  View Menu
                </Button>
                <Button
                  as="a"
                  href={`tel:${restaurant.telephone.dial}`}
                  variant="secondary"
                  size="lg"
                  className="text-bone"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {restaurant.telephone.display}
                </Button>
              </div>

              {/* Same destinations as the footer's social links — literally
                  the same component, so the two stay identical. */}
              <SocialLinks className="mt-6 justify-center" />
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};
