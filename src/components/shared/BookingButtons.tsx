import { ExternalLink } from "lucide-react";
import { Button, type ButtonProps } from "@/components/shared/Button";
import { locations } from "@/data/restaurant";

type BookingButtonsProps = {
  variant?: Extract<ButtonProps["variant"], "primary" | "secondary">;
  size?: ButtonProps["size"];
  /** Shows an external-link glyph on each button, e.g. next to plain text CTAs. */
  withIcon?: boolean;
  /** Applied to both buttons — e.g. a shared text colour override. */
  className?: string;
};

/**
 * The two-location booking CTA pair, shared by every page that offers a
 * booking action. There is deliberately no single "Book a Table" button:
 * with two real, separately-booked restaurants, a generic CTA can't point
 * anywhere correct, so every booking entry point asks for a location
 * up front instead. Renders as a fragment (no wrapping element) so callers
 * drop it straight into their own existing button row — the same
 * `flex flex-col gap-3 sm:flex-row` pattern already used everywhere —
 * and both buttons stack on mobile / sit side by side on desktop for free.
 */
export const BookingButtons = ({
  variant,
  size = "md",
  withIcon = false,
  className,
}: BookingButtonsProps) => (
  <>
    <Button
      as="a"
      href={locations.stourbridge.urls.booking}
      external
      variant={variant}
      size={size}
      className={className}
      aria-label="Book a table at our Stourbridge restaurant, opens in a new tab"
    >
      Book Stourbridge
      {withIcon ? <ExternalLink className="h-4 w-4" aria-hidden="true" /> : null}
    </Button>
    <Button
      as="a"
      href={locations.telford.urls.booking}
      external
      variant={variant}
      size={size}
      className={className}
      aria-label="Book a table at our Telford restaurant, opens in a new tab"
    >
      Book Telford
      {withIcon ? <ExternalLink className="h-4 w-4" aria-hidden="true" /> : null}
    </Button>
  </>
);
