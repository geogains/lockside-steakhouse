import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import type { RestaurantMenu } from "@/data/menus";

type MenuNavigationProps = {
  menus: RestaurantMenu[];
  activeId: string;
  onSelect: (id: string) => void;
};

/**
 * Sticky menu selector. Implemented as a tablist so keyboard users can move
 * between menus with the arrow keys, which is the expected pattern here.
 */
export const MenuNavigation = ({ menus, activeId, onSelect }: MenuNavigationProps) => {
  const listRef = useRef<HTMLDivElement>(null);

  /* Keep the selected tab scrolled into view on narrow screens. */
  useEffect(() => {
    const index = menus.findIndex((menu) => menu.id === activeId);
    const tab = listRef.current?.children[index] as HTMLElement | undefined;
    tab?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [activeId, menus]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const index = menus.findIndex((menu) => menu.id === activeId);
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % menus.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + menus.length) % menus.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = menus.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    const nextMenu = menus[nextIndex];
    if (nextMenu) onSelect(nextMenu.id);
  };

  return (
    <div
      data-surface="light"
      className="sticky top-16 z-30 border-b border-line bg-parchment/95 backdrop-blur-md
                 md:top-20 no-print"
    >
      <div className="container-content">
        <div
          ref={listRef}
          role="tablist"
          aria-label="Choose a menu"
          onKeyDown={onKeyDown}
          className="flex gap-1 overflow-x-auto py-2
                     [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {menus.map((menu) => {
            const selected = menu.id === activeId;
            return (
              <button
                key={menu.id}
                type="button"
                role="tab"
                id={`menu-tab-${menu.id}`}
                aria-selected={selected}
                aria-controls={`menu-panel-${menu.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => onSelect(menu.id)}
                className={cn(
                  "shrink-0 rounded-card px-4 py-2.5 font-body text-[0.6875rem] font-semibold",
                  "uppercase tracking-[0.16em] transition-colors duration-200 min-h-[44px]",
                  selected
                    ? "bg-ember text-bone"
                    : "text-fg-muted hover:bg-fg/5 hover:text-fg",
                )}
              >
                {menu.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
