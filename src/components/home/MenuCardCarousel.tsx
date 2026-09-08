import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCarousel } from "@/hooks/useCarousel";
import { cn } from "@/lib/cn";

type MenuCardCarouselProps<T> = {
  items: T[];
  getKey: (item: T) => string;
  /** Used only for the dots' accessible names, e.g. "Main Menu". */
  getLabel: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  className?: string;
};

/**
 * A one-card-at-a-time, button-controlled carousel — the mobile replacement
 * for the old native swipe/scroll-snap track. Built on the same mechanics
 * as the homepage gallery carousel (see `useCarousel` and
 * `components/shared/Carousel`): a measured viewport width, a motion value
 * animated to the resulting offset, and previous/next/dot buttons. There is
 * no drag, pan or touch handling anywhere here, so nothing on the slide
 * track ever competes with the page's own vertical scroll — a swipe that
 * starts over a card scrolls the page exactly as it would anywhere else.
 */
export function MenuCardCarousel<T>({
  items,
  getKey,
  getLabel,
  renderItem,
  className,
}: MenuCardCarouselProps<T>) {
  const total = items.length;
  const { index, goTo, previous, next, onKeyDown, containerRef, x, canPrevious, canNext } =
    useCarousel(total);
  const current = items[index];

  if (!current) return null;

  return (
    <div className={cn("w-full", className)}>
      <div
        ref={containerRef}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Featured menus"
        onKeyDown={onKeyDown}
        className="overflow-hidden"
      >
        <motion.div className="flex" style={{ x }}>
          {items.map((item) => (
            <div key={getKey(item)} className="w-full shrink-0">
              {renderItem(item)}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={previous}
          disabled={!canPrevious}
          aria-label="Previous menu"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border
                     border-line text-fg-muted transition-colors hover:border-brass
                     hover:text-brass disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Progress: inactive cards are a dot, the active card is a wider pill —
            same treatment as the gallery carousel's dots. */}
        <div className="flex items-center gap-2">
          {items.map((item, dotIndex) => (
            <button
              key={getKey(item)}
              type="button"
              onClick={() => goTo(dotIndex)}
              aria-label={`Go to ${getLabel(item)}`}
              aria-current={dotIndex === index ? "true" : undefined}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 ease-swift",
                dotIndex === index
                  ? "w-7 bg-brass"
                  : "w-1.5 bg-fg-subtle/50 hover:bg-brass/60",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          disabled={!canNext}
          aria-label="Next menu"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border
                     border-line text-fg-muted transition-colors hover:border-brass
                     hover:text-brass disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
