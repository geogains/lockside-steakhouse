import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type CarouselSlide = {
  id: string;
  src: string;
  /** Meaningful alternative text — this carousel never treats images as decorative. */
  alt: string;
  /** Optional short caption shown over the image. */
  caption?: string;
  /** CSS object-position, so portrait photographs aren't badly cropped. */
  focus?: string;
};

type CarouselProps = {
  slides: CarouselSlide[];
  /** Tailwind classes controlling the image frame's height at each breakpoint. */
  heightClassName?: string;
  className?: string;
  "aria-label"?: string;
};

const SPRING = { type: "spring" as const, stiffness: 300, damping: 30 };

/**
 * A single large image at a time, sliding exactly one viewport-width per
 * step. The viewport's pixel width is tracked with a ResizeObserver (not
 * read once from offsetWidth) so the slide offset stays correct across
 * resizes, orientation changes and breakpoint jumps.
 */
export const Carousel = ({
  slides,
  heightClassName = "h-[clamp(320px,58vw,620px)]",
  className,
  "aria-label": ariaLabel = "Image carousel",
}: CarouselProps) => {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const total = slides.length;
  const current = slides[index];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const target = -index * width;
    if (reduced) {
      x.set(target);
      return undefined;
    }
    const controls = animate(x, target, SPRING);
    return () => controls.stop();
  }, [index, width, reduced, x]);

  const goTo = (next: number) => setIndex(Math.min(Math.max(next, 0), total - 1));
  const previous = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      previous();
    }
  };

  if (!current) return null;

  return (
    <div className={cn("w-full", className)}>
      <div
        ref={containerRef}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        onKeyDown={onKeyDown}
        className={cn(
          "relative w-full overflow-hidden rounded-card bg-surface",
          heightClassName,
        )}
      >
        <motion.div className="flex h-full" style={{ x }}>
          {slides.map((slide) => (
            <div key={slide.id} className="h-full w-full shrink-0">
              <img
                src={slide.src}
                alt={slide.alt}
                loading="lazy"
                decoding="async"
                draggable={false}
                style={{ objectPosition: slide.focus ?? "50% 50%" }}
                className="h-full w-full select-none object-cover"
              />
            </div>
          ))}
        </motion.div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 to-transparent"
        />

        {current.caption ? (
          <p
            aria-live="polite"
            className="pointer-events-none absolute bottom-9 left-0 right-0 px-6 text-center
                       font-body text-sm text-bone/90 text-shadow-cinematic md:bottom-11 md:text-base"
          >
            {current.caption}
          </p>
        ) : null}

        <button
          type="button"
          onClick={previous}
          disabled={index === 0}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center
                     justify-center rounded-full border border-line bg-ink/50 text-bone
                     backdrop-blur-sm transition-colors hover:bg-ink/80 hover:text-brass
                     disabled:pointer-events-none disabled:opacity-30 md:left-5 md:h-12 md:w-12"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={next}
          disabled={index === total - 1}
          aria-label="Next image"
          className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center
                     justify-center rounded-full border border-line bg-ink/50 text-bone
                     backdrop-blur-sm transition-colors hover:bg-ink/80 hover:text-brass
                     disabled:pointer-events-none disabled:opacity-30 md:right-5 md:h-12 md:w-12"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Progress: inactive images are a dot, the active image is a wider pill. */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {slides.map((slide, dotIndex) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(dotIndex)}
            aria-label={`Go to image ${dotIndex + 1} of ${total}${slide.caption ? `: ${slide.caption}` : ""}`}
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
    </div>
  );
};
