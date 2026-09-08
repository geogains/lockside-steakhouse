import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-body font-semibold uppercase tracking-[0.16em] " +
  "rounded-card transition-[background-color,color,border-color,transform] duration-200 ease-swift " +
  "active:translate-y-px disabled:opacity-50 disabled:pointer-events-none text-center";

const variants: Record<Variant, string> = {
  primary:
    "bg-brass text-ink hover:bg-brass-deep border border-transparent shadow-sm",
  secondary:
    "border border-current text-fg hover:bg-accent hover:text-accent-contrast hover:border-accent",
  ghost: "text-accent hover:text-fg underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  md: "text-[0.75rem] px-5 py-3 min-h-[44px]",
  lg: "text-[0.8125rem] px-7 py-4 min-h-[52px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    as?: "button";
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    as: "a";
    href: string;
    /** Adds target and rel automatically. */
    external?: boolean;
  };

type ButtonAsRoute = CommonProps & {
  as: "route";
  to: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsRoute;

/**
 * The single button primitive. Renders a real <button>, a real <a> or a router
 * <Link> — never a clickable div — so keyboard and assistive technology
 * behaviour is correct by default.
 */
export const Button = forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.as === "route") {
    const { as: _as, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    void _as; void _v; void _s; void _c; void _ch;
    return (
      <Link ref={ref as React.Ref<HTMLAnchorElement>} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (props.as === "a") {
    const {
      as: _as,
      variant: _v,
      size: _s,
      className: _c,
      children: _ch,
      external,
      ...rest
    } = props;
    void _as; void _v; void _s; void _c; void _ch;
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const { as: _as, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
  void _as; void _v; void _s; void _c; void _ch;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={rest.type ?? "button"}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
