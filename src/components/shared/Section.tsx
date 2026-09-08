import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  id?: string;
  /** Chooses the semantic token set. Photographic sections use "dark". */
  surface?: "dark" | "light";
  /** Set false for full-bleed sections that manage their own container. */
  contained?: boolean;
  className?: string;
  children: ReactNode;
  /** Accessible name for the section landmark. */
  ariaLabel?: string;
};

export const Section = ({
  id,
  surface = "dark",
  contained = true,
  className,
  children,
  ariaLabel,
}: SectionProps) => (
  <section
    id={id}
    data-surface={surface}
    aria-label={ariaLabel}
    className={cn(
      "bg-bg text-fg scroll-mt-24",
      surface === "light" ? "bg-parchment" : "",
      className,
    )}
  >
    {contained ? <div className="container-content">{children}</div> : children}
  </section>
);
