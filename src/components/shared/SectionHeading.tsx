import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  /** Small uppercase label above the heading. */
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  /** Heading level. Only one h1 exists per page, so this defaults to h2. */
  level?: 2 | 3;
  className?: string;
  id?: string;
};

export const Eyebrow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <p
    className={cn(
      "font-body text-eyebrow font-semibold uppercase text-accent",
      className,
    )}
  >
    {children}
  </p>
);

export const SectionHeading = ({
  eyebrow,
  title,
  intro,
  align = "left",
  level = 2,
  className,
  id,
}: SectionHeadingProps) => {
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <Reveal className={cn(align === "center" && "text-center", className)}>
      {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
      <Tag
        id={id}
        className="text-fg text-[clamp(2.25rem,6vw,4rem)]"
      >
        {title}
      </Tag>
      <span
        aria-hidden="true"
        className={cn(
          "mt-5 block h-px w-16 bg-accent/60",
          align === "center" && "mx-auto",
        )}
      />
      {intro ? (
        <p
          className={cn(
            "mt-6 max-w-prose text-base leading-relaxed text-fg-muted",
            align === "center" && "mx-auto",
          )}
        >
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
};
