import { useEffect, useRef, useState } from "react";
import { useMotionValue, animate, useReducedMotion } from "framer-motion";

const SPRING = { type: "spring" as const, stiffness: 300, damping: 30 };

/**
 * Shared mechanics for a single-slide-at-a-time, button-controlled carousel:
 * active index, the viewport's measured pixel width (via ResizeObserver, not
 * a one-off offsetWidth read, so it stays correct across resizes, rotation
 * and breakpoint jumps), and a motion value animated to the resulting
 * horizontal offset. There is deliberately no drag/pan/touch handling here —
 * the slide only ever changes via goTo/previous/next, so nothing on the
 * slide track ever competes with normal page scrolling.
 */
export const useCarousel = (total: number) => {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

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

  /* Clamp back into range if the slide count ever shrinks under the
     current index (defensive — not expected in practice). */
  useEffect(() => {
    setIndex((current) => Math.min(current, Math.max(total - 1, 0)));
  }, [total]);

  const goTo = (next: number) => setIndex(Math.min(Math.max(next, 0), Math.max(total - 1, 0)));
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

  return {
    index,
    goTo,
    previous,
    next,
    onKeyDown,
    containerRef,
    x,
    canPrevious: index > 0,
    canNext: index < total - 1,
  };
};
