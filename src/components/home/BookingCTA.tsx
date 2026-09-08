import { Phone } from "lucide-react";
import bullMark from "@/assets/brand/lockside-bull.webp";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/shared/Button";
import { BookingButtons } from "@/components/shared/BookingButtons";
import { Eyebrow } from "@/components/shared/SectionHeading";
import { restaurant } from "@/data/restaurant";

export const BookingCTA = () => (
  <section
    id="book"
    data-surface="dark"
    aria-labelledby="booking-heading"
    className="relative scroll-mt-24 overflow-hidden bg-surface py-20 md:py-28"
  >
    {/* Restrained brand motif rather than decorative smoke or flames. */}
    <img
      src={bullMark}
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute -right-16 top-1/2 hidden w-[28rem] -translate-y-1/2
                 opacity-[0.06] md:block"
    />

    <div className="container-content relative">
      <Reveal className="max-w-2xl">
        <Eyebrow>Reservations</Eyebrow>
        <h2
          id="booking-heading"
          className="mt-5 text-[clamp(2.5rem,8vw,4.5rem)] leading-[0.9] text-bone"
        >
          Your table
          <br />
          <span className="text-brass">is waiting</span>
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted">
          Choose your date, party size and preferred time through our secure Dojo
          booking system. Prefer to talk it through? Give us a ring and we'll sort
          it out.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <BookingButtons size="lg" withIcon />
          <Button
            as="a"
            href={`tel:${restaurant.telephone.dial}`}
            variant="secondary"
            size="lg"
            className="text-bone"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {restaurant.telephone.display}
          </Button>
        </div>

        <p className="mt-6 text-sm text-fg-subtle">
          Parties of {restaurant.groupPolicy.threshold} or more need a pre-order —
          please call us so we can help.
        </p>
      </Reveal>
    </div>
  </section>
);
