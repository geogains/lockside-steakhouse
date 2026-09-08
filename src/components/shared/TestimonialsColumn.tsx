import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import type { Review } from "@/data/reviews";
import { cn } from "@/lib/cn";

const Stars = ({ rating }: { rating: number }) => (
  <p className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        aria-hidden="true"
        className={cn("h-3.5 w-3.5", i < rating ? "fill-accent-2 text-accent-2" : "text-line")}
      />
    ))}
  </p>
);

const TestimonialCard = ({ review }: { review: Review }) => (
  <figure className="w-full rounded-xl border border-line bg-bone p-6 shadow-lift-light">
    {typeof review.rating === "number" ? <Stars rating={review.rating} /> : null}
    <blockquote className="mt-4">
      <p className="text-sm leading-relaxed text-fg-muted">&ldquo;{review.quote}&rdquo;</p>
    </blockquote>
    <figcaption className="mt-5">
      <span className="block font-display text-base tracking-[0.06em] text-fg">
        {review.author}
      </span>
      <span className="mt-0.5 block font-body text-[0.6875rem] uppercase tracking-[0.16em] text-fg-subtle">
        {review.source}
      </span>
    </figcaption>
  </figure>
);

type TestimonialsColumnProps = {
  className?: string;
  testimonials: Review[];
  /** Seconds for one full loop. Columns are meant to run at slightly
   *  different speeds — this is the only thing that should ever differ
   *  between them; there is no animation-delay anywhere. */
  duration?: number;
};

const MIN_COPIES = 2;

/**
 * One continuously scrolling column of review cards.
 *
 * Two things are measured directly from the rendered DOM rather than
 * assumed:
 *
 * 1. The loop distance — the pixel gap between the first card of one copy
 *    of the sequence and the first card of the next. This is exact
 *    regardless of card count or height, unlike a `translateY(-50%)`
 *    assumption, which only happens to be correct if the track's total
 *    height is an exact, evenly-divisible multiple of one sequence.
 *
 * 2. How many copies of the sequence need to be rendered. A short
 *    sequence (few cards, or a column with fewer reviews than its
 *    siblings) can be shorter than the visible masked viewport. With only
 *    two copies on screen, the scroll then runs out of rendered content
 *    just before the reset — a visible blank gap, followed by a flicker
 *    when the loop snaps back. Enough copies are rendered so the track is
 *    always comfortably taller than one sequence plus the viewport, in
 *    every direction the scroll can reach, so there is always real
 *    content behind the fade mask.
 *
 * A ResizeObserver keeps both measurements correct as card heights change
 * with viewport width. The clones are hidden from assistive tech so screen
 * readers don't hear the same reviews repeated. The scroll runs
 * continuously and is deliberately unaffected by hover or focus — the
 * cards are passive. Renders as a static list when prefers-reduced-motion
 * is set.
 */
export const TestimonialsColumn = ({
  className,
  testimonials,
  duration = 13,
}: TestimonialsColumnProps) => {
  const reduced = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [copies, setCopies] = useState(MIN_COPIES);
  const trackRef = useRef<HTMLUListElement>(null);
  const copyStartRef = useRef<HTMLLIElement>(null);
  const cloneStartRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (reduced) return undefined;

    const measure = () => {
      const start = copyStartRef.current;
      const clone = cloneStartRef.current;
      const track = trackRef.current;
      if (!start || !clone || !track) return;

      const sequenceHeight = clone.offsetTop - start.offsetTop;
      if (sequenceHeight <= 0) return;

      setDistance((current) => (sequenceHeight !== current ? sequenceHeight : current));

      const viewport = track.parentElement?.clientHeight ?? 0;
      const needed =
        viewport > 0
          ? Math.max(MIN_COPIES, Math.ceil((viewport + sequenceHeight) / sequenceHeight) + 1)
          : MIN_COPIES;
      setCopies((current) => (needed !== current ? needed : current));
    };

    measure();

    const track = trackRef.current;
    if (!track) return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    if (track.parentElement) observer.observe(track.parentElement);
    return () => observer.disconnect();
  }, [reduced, testimonials]);

  if (reduced) {
    return (
      <ul className={cn("flex flex-col gap-6", className)}>
        {testimonials.map((review) => (
          <li key={review.id}>
            <TestimonialCard review={review} />
          </li>
        ))}
      </ul>
    );
  }

  const style = (
    distance > 0
      ? { "--scroll-distance": `${distance}px`, "--scroll-duration": `${duration}s` }
      : undefined
  ) as CSSProperties | undefined;

  return (
    <ul
      ref={trackRef}
      className={cn("flex flex-col gap-6", distance > 0 && "reviews-track", className)}
      style={style}
    >
      {Array.from({ length: copies }, (_, copy) => (
        <Fragment key={copy}>
          {testimonials.map((review, index) => {
            const isAnchor = index === 0;
            return (
              <li
                key={`${copy}-${review.id}`}
                aria-hidden={copy > 0 || undefined}
                ref={isAnchor ? (copy === 0 ? copyStartRef : copy === 1 ? cloneStartRef : undefined) : undefined}
              >
                <TestimonialCard review={review} />
              </li>
            );
          })}
        </Fragment>
      ))}
    </ul>
  );
};
