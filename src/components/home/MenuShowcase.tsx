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
import { MenuCardCarousel } from "@/components/home/MenuCardCarousel";
import { menus, type RestaurantMenu } from "@/data/menus";

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

const MenuCard = ({ menu }: { menu: RestaurantMenu }) => {
  const image = cardImages[menu.id];
  return (
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
  );
};

export const MenuShowcase = () => {
  const cards = featuredMenuIds
    .map((id) => menus.find((menu) => menu.id === id))
    .filter((menu): menu is NonNullable<typeof menu> => Boolean(menu));

  return (
    <Section
      id="menus"
      surface="dark"
      className="bg-surface py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="What's on"
        title="Our menus"
        intro="Six menus across the week, from an 8am breakfast to a 32oz Tomahawk. Browse them all in full, or download the printed versions."
      />

      {/* Desktop/tablet: unchanged static grid. */}
      <ul className="mt-12 hidden md:grid md:grid-cols-2 md:gap-6 xl:grid-cols-4">
        {cards.map((menu, index) => (
          <Reveal as="li" key={menu.id} delay={0.06 * index}>
            <MenuCard menu={menu} />
          </Reveal>
        ))}
      </ul>

      {/* Mobile: a button-controlled carousel (see MenuCardCarousel) instead
          of the old native swipe/scroll-snap track — that had no way to
          stop a mostly-vertical swipe from occasionally getting "claimed"
          by the horizontal scroll container, which could make the page
          feel stuck. This has no touch/drag handling at all, so a swipe
          that starts on a card always scrolls the page normally; only the
          arrow and dot buttons change which card is shown. */}
      <Reveal className="mt-12 md:hidden">
        <MenuCardCarousel
          items={cards}
          getKey={(menu) => menu.id}
          getLabel={(menu) => menu.name}
          renderItem={(menu) => <MenuCard menu={menu} />}
        />
      </Reveal>

      {/* Closing CTA — moved below the cards/carousel so it reads as the
          section's final action rather than competing with the heading. */}
      <Reveal delay={0.2} className="mt-10 flex justify-center md:mt-12">
        <Button as="route" to="/menus" variant="secondary" className="text-bone">
          All menus
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </Reveal>
    </Section>
  );
};
