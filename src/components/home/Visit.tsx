import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/shared/Button";
import { restaurant, locations } from "@/data/restaurant";

/** Formats "17:00" as "5pm" / "17:30" as "5.30pm" in UK style. */
const formatTime = (time: string): string => {
  const [hourPart, minutePart] = time.split(":");
  const hour = Number(hourPart);
  const minutes = minutePart ?? "00";
  const suffix = hour >= 12 ? "pm" : "am";
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return minutes === "00" ? `${display}${suffix}` : `${display}.${minutes}${suffix}`;
};

export const Visit = () => {
  const { stourbridge, telford } = locations;

  return (
    <Section id="visit" surface="dark" className="py-20 md:py-28">
      <SectionHeading
        eyebrow="Find us"
        title="Visit Lockside"
        intro="Now serving Stourbridge and Telford."
      />

      {/* Three blocks — locations, maps, then shared contact details — read
          top to bottom in that order on the single-column mobile/tablet
          stack. From lg up, the grid places locations and contact details
          in the same left column (stacked, same gap as before) with maps
          spanning both rows in the right column, so desktop keeps its
          existing side-by-side look untouched: gap-y-9 reproduces the
          original space-y-9 between locations and contact details, and
          gap-x-14 reproduces the original column gap. */}
      <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-9">
        <Reveal className="space-y-9 lg:col-start-1">
          <div className="flex gap-4">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-brass" aria-hidden="true" />
            <div>
              <h3 className="font-display text-lg tracking-[0.08em] text-bone">
                Stourbridge
              </h3>
              <address className="mt-2 text-sm not-italic leading-relaxed text-fg-muted">
                {stourbridge.name}
                <br />
                {stourbridge.street}
                <br />
                {stourbridge.locality}
                <br />
                {stourbridge.postcode}
              </address>
            </div>
          </div>

          {/* Telford — a real second site, grouped directly beneath the
              Stourbridge address. Only its address is confirmed so far;
              phone, hours, booking and map follow once the client supplies
              them, so the contact details and buttons below remain
              Stourbridge's. */}
          <div className="flex gap-4">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-brass" aria-hidden="true" />
            <div>
              <h3 className="font-display text-lg tracking-[0.08em] text-bone">
                Telford
              </h3>
              <address className="mt-2 text-sm not-italic leading-relaxed text-fg-muted">
                {telford.name}
                <br />
                {telford.street}
                <br />
                {telford.locality}
                <br />
                {telford.postcode}
              </address>
            </div>
          </div>
        </Reveal>

        {/* Maps — one landscape panel per location, stacked to roughly fill
            the same tall footprint the single map used to occupy.
            Each panel gets an explicit height rather than flex-sizing off
            a sibling column: Google's simple "output=embed" map does not
            re-measure itself if its box resizes after the iframe starts
            loading, and matching a sibling's height via a shared grid row
            was exactly that — the map would settle at a stale, undersized
            viewport. A fixed height per breakpoint is stable from first
            paint, so the embed always sizes correctly. `self-start` keeps
            the panels at their own natural height rather than stretching
            to fill the two rows they now span. */}
        <Reveal
          delay={0.12}
          className="flex flex-col gap-4 lg:col-start-2 lg:row-span-2 lg:self-start"
        >
          <div>
            <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.18em] text-fg-subtle">
              Stourbridge
            </p>
            <div className="mt-2 h-40 overflow-hidden rounded-card border border-line bg-elevated md:h-56">
              <iframe
                title="Lockside Steakhouse Stourbridge map"
                src={stourbridge.urls.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
          </div>

          <div>
            <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.18em] text-fg-subtle">
              Telford
            </p>
            <div className="mt-2 h-40 overflow-hidden rounded-card border border-line bg-elevated md:h-56">
              <iframe
                title="Lockside Steakhouse Telford map"
                src={telford.urls.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </Reveal>

        {/* Shared contact details — phone, email, hours — same content and
            spacing as before, just its own grid item now so maps can sit
            between it and the locations above on the mobile/tablet stack. */}
        <Reveal delay={0.2} className="space-y-9 lg:col-start-1">
          <div className="flex gap-4">
            <Phone className="mt-1 h-5 w-5 shrink-0 text-brass" aria-hidden="true" />
            <div>
              <h3 className="font-display text-lg tracking-[0.08em] text-bone">
                Telephone
              </h3>
              <p className="mt-2 text-sm text-fg-muted">
                <a
                  href={`tel:${restaurant.telephone.dial}`}
                  className="transition-colors hover:text-brass"
                >
                  {restaurant.telephone.display}
                </a>
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Mail className="mt-1 h-5 w-5 shrink-0 text-brass" aria-hidden="true" />
            <div>
              <h3 className="font-display text-lg tracking-[0.08em] text-bone">
                Email
              </h3>
              <p className="mt-2 break-all text-sm text-fg-muted">
                <a
                  href={`mailto:${restaurant.email}`}
                  className="transition-colors hover:text-brass"
                >
                  {restaurant.email}
                </a>
              </p>
            </div>
          </div>

          {/* Opening hours. Split lunch and evening services are shown as two
              separate windows rather than one misleading range. */}
          <div className="flex gap-4">
            <Clock className="mt-1 h-5 w-5 shrink-0 text-brass" aria-hidden="true" />
            <div className="w-full">
              <h3 className="font-display text-lg tracking-[0.08em] text-bone">
                Opening hours
              </h3>
              <dl className="mt-3 divide-y divide-line border-y border-line">
                {restaurant.openingHours.map((entry) => (
                  <div
                    key={entry.day}
                    className="flex items-baseline justify-between gap-4 py-2.5 text-sm"
                  >
                    <dt className="text-bone">{entry.day}</dt>
                    <dd className="tabular text-right text-fg-muted">
                      {entry.services.map((service) => (
                        <span key={`${service.opens}-${service.closes}`} className="block">
                          {formatTime(service.opens)}–{formatTime(service.closes)}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                <span className="font-semibold text-bone">Breakfast</span> is
                served {restaurant.breakfastService.summary.toLowerCase()}.{" "}
                {restaurant.breakfastService.note}
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Final CTAs, moved below both the info column and the maps so they
          always close the section — on the single-column mobile stack and
          on the two-column desktop grid alike — rather than sitting between
          opening hours and the maps. */}
      <Reveal delay={0.2} className="mt-12 flex flex-col gap-3 sm:flex-row">
        <Button as="a" href={restaurant.urls.directions} external>
          <Navigation className="h-4 w-4" aria-hidden="true" />
          Get Directions
        </Button>
        <Button
          as="a"
          href={`tel:${restaurant.telephone.dial}`}
          variant="secondary"
          className="text-bone"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call Now
        </Button>
      </Reveal>
    </Section>
  );
};
