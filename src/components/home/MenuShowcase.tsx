import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import mainImage from "@/assets/gallery/gallery-mixed-grill-board.webp";
import lunchImage from "@/assets/gallery/gallery-burger-onion-rings.webp";
import sundayImage from "@/assets/gallery/gallery-sliced-sirloin.webp";
import bullMark from "@/assets/brand/lockside-bull.webp";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { Button } from "@/components/shared/Button";
import { menus } from "@/data/menus";

/**
 * Card imagery. Breakfast deliberately has no photograph: none of the supplied
 * images shows breakfast, and using a dinner plate would misrepresent the menu.
 * It falls back to a typographic treatment instead.
 * ASSET NEEDED: one breakfast photograph.
 */
const cardImages: Record<string, { src: string; alt: string } | undefined> = {
  main: {
    src: mainImage,
    alt: "Two chargrilled steaks served on boards with chunky chips and dressed rocket",
  },
  lunch: {
    src: lunchImage,
    alt: "A cheeseburger on a board with skin-on fries and giant beer battered onion rings",
  },
  sunday: {
    src: sundayImage,
    alt: "Sliced pink roast beef fanned across a serving plate with chunky chips",
  },
};

const featuredMenuIds = ["main", "lunch", "sunday", "breakfast"];

export const MenuShowcase = () => {
  const cards = featuredMenuIds
    .map((id) => menus.find((menu) => menu.id === id))
    .filter((menu): menu is NonNullable<typeof menu> => Boolean(menu));

  return (
    <Section id="menus" surface="dark" className="py-20 md:py-28">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="What's on"
          title="Our menus"
          intro="Six menus across the week, from an 8am breakfast to a 32oz Tomahawk. Browse them all in full, or download the printed versions."
        />
        <Reveal delay={0.15} className="shrink-0">
          <Button as="route" to="/menus" variant="secondary" className="text-bone">
            All menus
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </Reveal>
      </div>

      {/* Horizontal scroll-snap on small screens, grid from md up. Real links
          inside a plain list keep this keyboard- and screen-reader-friendly
          without a bespoke carousel. */}
      <ul
        className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4
                   [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                   md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0
                   xl:grid-cols-4"
      >
        {cards.map((menu, index) => {
          const image = cardImages[menu.id];
          return (
            <Reveal
              as="li"
              key={menu.id}
              delay={0.06 * index}
              className="w-[78vw] shrink-0 snap-start sm:w-[60vw] md:w-auto"
            >
              <Link
                to={`/menus?menu=${menu.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-card border
                           border-line bg-elevated transition-colors duration-300
                           hover:border-brass/50"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                  {image ? (
                    <ImageWithFallback
                      src={image.src}
                      alt={image.alt}
                      width={1200}
                      height={900}
                      sizes="(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 78vw"
                      className="h-full w-full object-cover transition-transform duration-700
                                 ease-swift group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-surface">
                      <img src={bullMark} alt="" width={64} height={44} className="h-11 w-auto opacity-90" />
                      <span className="font-display text-sm tracking-[0.28em] text-brass/80">
                        Served from 8am
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl tracking-[0.05em] text-bone">
                    {menu.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">
                    {menu.blurb}
                  </p>
                  {menu.availability ? (
                    <p className="mt-4 font-body text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-brass/80">
                      {menu.availability}
                    </p>
                  ) : null}
                  <span className="mt-5 inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.18em] text-bone">
                    View menu
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </ul>

      <p className="mt-6 text-xs text-fg-subtle md:hidden">
        Swipe to see more menus.
      </p>
    </Section>
  );
};
