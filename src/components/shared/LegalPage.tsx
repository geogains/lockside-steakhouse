import type { ReactNode } from "react";
import { Eyebrow } from "@/components/shared/SectionHeading";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
};

/** Shared shell for the privacy and accessibility pages. */
export const LegalPage = ({ eyebrow, title, updated, children }: LegalPageProps) => (
  <>
    <div data-surface="dark" className="bg-ink pb-14 pt-28 md:pt-36">
      <div className="container-content">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-[clamp(2.25rem,7vw,4rem)] leading-[0.92] text-bone">
          {title}
        </h1>
        <p className="mt-5 text-sm text-fg-subtle">Last updated: {updated}</p>
      </div>
    </div>

    <div data-surface="light" className="bg-parchment py-16 md:py-24">
      <div className="container-content">
        <div
          className="max-w-prose space-y-8 text-sm leading-relaxed text-fg-muted
                     [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2
                     [&_h2]:font-display [&_h2]:text-2xl [&_h2]:tracking-[0.05em] [&_h2]:text-fg
                     [&_h2]:mb-3 [&_h3]:font-body [&_h3]:font-semibold [&_h3]:text-fg
                     [&_li]:mb-2 [&_ul]:list-disc [&_ul]:pl-5"
        >
          {children}
        </div>
      </div>
    </div>
  </>
);
