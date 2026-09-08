import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Distance travelled on entry, in pixels. */
  distance?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
  /** Optional element id, used where the revealed block is an anchor target. */
  id?: string;
};

/**
 * The fade-and-rise entrance used throughout the site. Honours
 * prefers-reduced-motion by rendering straight to the final state, so content
 * is never hidden behind an animation that will not run.
 */
export const Reveal = ({
  children,
  delay = 0,
  distance = 18,
  className,
  as = "div",
  id,
}: RevealProps) => {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) {
    const Plain = as;
    return (
      <Plain id={id} className={className}>
        {children}
      </Plain>
    );
  }

  return (
    <Component
      id={id}
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </Component>
  );
};
