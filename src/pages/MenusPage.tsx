import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Printer } from "lucide-react";
import { MenuNavigation } from "@/components/menus/MenuNavigation";
import { MenuCategory } from "@/components/menus/MenuCategory";
import { MenuPdfLink } from "@/components/menus/MenuPdfLink";
import { BookingButtons } from "@/components/shared/BookingButtons";
import { Section } from "@/components/shared/Section";
import { menus, dietaryLegend, menuDisclaimer } from "@/data/menus";
import { restaurant } from "@/data/restaurant";
import { useSeo } from "@/hooks/useSeo";
import { breadcrumbSchema } from "@/lib/structuredData";
import { cn } from "@/lib/cn";

/* Menu section backgrounds alternate strictly by position — light, dark,
   light, dark, ... — starting light so the first section of every menu
   matches the light "menu header" block just above it. No two adjacent
   sections ever share a background, regardless of menu or section count. */
const surfaceForIndex = (index: number): "light" | "dark" =>
  index % 2 === 0 ? "light" : "dark";

const MenusPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = searchParams.get("menu");
  const fallback = menus[0];

  const activeMenu = useMemo(
    () => menus.find((menu) => menu.id === requested) ?? fallback,
    [requested, fallback],
  );

  useSeo({
    title: `Menus | ${restaurant.name}, Wollaston`
      .concat(activeMenu ? ` — ${activeMenu.name}` : ""),
    description:
      "Browse every Lockside Steakhouse menu in full: steaks, burgers and sharers on the main menu, weekday lunches, Sunday roasts, breakfast, nibbles and the children's menu.",
    path: "/menus",
    structuredData: breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Menus", path: "/menus" },
    ]),
  });

  const select = useCallback(
    (id: string) => {
      setSearchParams(id === fallback?.id ? {} : { menu: id }, { replace: true });
      /* Return to the top of the menu content, not the top of the document,
         so the sticky selector stays where the visitor expects it. */
      document
        .getElementById("menu-content")
        ?.scrollIntoView({ block: "start", behavior: "smooth" });
    },
    [setSearchParams, fallback],
  );

  /* If a stale ?menu= value is bookmarked, quietly fall back to the main menu. */
  useEffect(() => {
    if (requested && !menus.some((menu) => menu.id === requested)) {
      setSearchParams({}, { replace: true });
    }
  }, [requested, setSearchParams]);

  /* MenuCategory renders nothing for an empty section — filter those out
     here too, so an empty section can't still leave behind an empty
     full-width coloured band with nothing in it. */
  const visibleSections = activeMenu?.sections.filter((section) => section.items.length > 0) ?? [];

  if (!activeMenu) {
    return (
      <div data-surface="light" className="bg-parchment px-5 py-40 text-center">
        <p className="text-fg-muted">Our menus are being updated. Please call us on{" "}
          <a href={`tel:${restaurant.telephone.dial}`} className="text-accent underline">
            {restaurant.telephone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Page header */}
      <div data-surface="dark" className="bg-ink pb-14 pt-28 md:pb-16 md:pt-36">
        <div className="container-content">
          <h1 className="text-[clamp(2.75rem,9vw,5rem)] leading-[0.9] text-bone">
            Our menus
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted">
            Everything we serve, in full. Prices are as printed on our current
            menus — the original PDFs are linked with each one.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BookingButtons />
          </div>
        </div>
      </div>

      <MenuNavigation menus={menus} activeId={activeMenu.id} onSelect={select} />

      <div id="menu-content">
        <div
          role="tabpanel"
          id={`menu-panel-${activeMenu.id}`}
          aria-labelledby={`menu-tab-${activeMenu.id}`}
          tabIndex={-1}
        >
          <Section surface="light" className="pb-10 pt-12 md:pb-14 md:pt-16">
            <header className="border-b border-line pb-8">
              <h2 className="font-display text-[clamp(2rem,6vw,3.25rem)] leading-none text-fg">
                {activeMenu.name}
              </h2>
              {activeMenu.availability ? (
                <p className="mt-4 font-body text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  {activeMenu.availability}
                </p>
              ) : null}
              <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
                {activeMenu.pdfUrl ? (
                  <MenuPdfLink
                    href={activeMenu.pdfUrl}
                    label={activeMenu.pdfLabel ?? "Download the printed menu"}
                  />
                ) : null}
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 font-body text-xs font-semibold
                             uppercase tracking-[0.16em] text-fg-muted transition-colors
                             hover:text-accent no-print"
                >
                  <Printer className="h-4 w-4" aria-hidden="true" />
                  Print this menu
                </button>
              </div>
            </header>

            {/* Dietary key. Codes are always paired with a text label, so no
                information depends on colour alone. */}
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {dietaryLegend.map((entry) => (
                <li
                  key={entry.code}
                  className="flex items-center gap-2 text-xs text-fg-muted"
                >
                  <span className="rounded-sm border border-accent/40 px-1.5 py-0.5 font-semibold uppercase text-accent">
                    {entry.code}
                  </span>
                  {entry.label}
                </li>
              ))}
            </ul>
          </Section>

          {visibleSections.length > 0 ? (
            visibleSections.map((section, index) => (
              <Section
                key={section.id}
                id={section.id}
                surface={surfaceForIndex(index)}
                className={cn(
                  "scroll-mt-32 py-14 md:py-20",
                  index > 0 && "border-t border-line",
                )}
              >
                <MenuCategory section={section} />
              </Section>
            ))
          ) : (
            <Section surface="light" className="pb-20 pt-4">
              <p className="text-fg-muted">
                This menu is being updated. Please call us on{" "}
                <a
                  href={`tel:${restaurant.telephone.dial}`}
                  className="text-accent underline"
                >
                  {restaurant.telephone.display}
                </a>{" "}
                and we'll talk you through it.
              </p>
            </Section>
          )}

          <Section surface="light" className="pb-20 pt-10 md:pb-28 md:pt-14">
            <p className="border-t border-line pt-8 text-xs leading-relaxed text-fg-subtle">
              {menuDisclaimer}
              {activeMenu.effectiveDate
                ? ` This menu is from our ${activeMenu.effectiveDate} print run.`
                : ""}
            </p>
          </Section>
        </div>
      </div>
    </>
  );
};

export default MenusPage;
