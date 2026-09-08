/**
 * The single source of truth for the Lockside Steakhouse brand logo
 * (bull mark + wordmark). Update the asset here to change it everywhere.
 */
const LOGO_SRC = "/lockside-logo.png";
const LOGO_WIDTH = 1795;
const LOGO_HEIGHT = 590;

type LogoProps = {
  className?: string;
  alt?: string;
};

export const Logo = ({ className, alt = "" }: LogoProps) => (
  <img
    src={LOGO_SRC}
    alt={alt}
    width={LOGO_WIDTH}
    height={LOGO_HEIGHT}
    className={className}
  />
);
