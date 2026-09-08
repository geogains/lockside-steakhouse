import { restaurant } from "@/data/restaurant";
import { cn } from "@/lib/cn";

type SocialLinksProps = {
  /** Layout/positioning for the row itself — gap, alignment, margin. */
  className?: string;
};

const instagramProfile = restaurant.social.find((profile) => profile.label === "Instagram");
const facebookProfile = restaurant.social.find((profile) => profile.label === "Facebook");

/**
 * The Instagram/Facebook pair shared by the footer and the mobile nav
 * drawer, so both stay identical by construction rather than by two
 * hand-matched copies drifting apart. No border, box or background — just
 * the two glyphs and a hairline divider, each sitting in an invisible
 * touch-target-sized hit area.
 */
export const SocialLinks = ({ className }: SocialLinksProps) => (
  <div className={cn("flex items-center gap-4", className)}>
    {instagramProfile ? (
      <a
        href={instagramProfile.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${restaurant.shortName} on Instagram, opens in a new tab`}
        className="flex h-11 w-11 items-center justify-center transition-opacity hover:opacity-80"
      >
        <img src="/insta.png" alt="Instagram" className="h-7 w-7 object-contain" />
      </a>
    ) : null}
    <span aria-hidden="true" className="h-6 w-px bg-bone/30" />
    {facebookProfile ? (
      <a
        href={facebookProfile.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${restaurant.shortName} on Facebook, opens in a new tab`}
        className="flex h-11 w-11 items-center justify-center transition-opacity hover:opacity-80"
      >
        <img src="/facebook.png" alt="Facebook" className="h-7 w-7 object-contain" />
      </a>
    ) : null}
  </div>
);
