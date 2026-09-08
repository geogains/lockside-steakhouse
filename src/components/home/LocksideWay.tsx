import { Beef, Handshake, Store } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { Button } from "@/components/shared/Button";

/** Proof points drawn only from claims the restaurant makes in print. */
const proofPoints = [
  {
    icon: Beef,
    title: "Local beef",
    body: "Sourced from a local butchery and delivered fresh each and every day.",
  },
  {
    icon: Handshake,
    title: "Cut to our spec",
    body: "We work closely with the butchery so the meat meets the Lockside specification.",
  },
  {
    icon: Store,
    title: "Independent",
    body: "A local business that backs other local independent businesses.",
  },
];

/** The shopfront photo and its decorative corner accent — rendered twice
 *  below (once for the desktop column, once inline on mobile/tablet) since
 *  the two breakpoints want it in genuinely different positions relative
 *  to the text, not just reordered within the same flow. Only one copy is
 *  ever visible at a given width: the accent corner is itself desktop-only
 *  already, and each wrapper below adds the responsive visibility. */
const ApproachImage = () => (
  <div className="relative">
    <ImageWithFallback
      src="/lockside.png"
      alt="The Lockside Steakhouse's brick shopfront, with its wooden signage and bull-head emblem above the entrance"
      width={1200}
      height={1499}
      objectPosition="50% 45%"
      sizes="(min-width: 1024px) 45vw, 100vw"
      className="aspect-[4/5] w-full rounded-card object-cover shadow-lift-light"
    />
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-4 -right-4 hidden h-24 w-24
                 border-b-2 border-r-2 border-ember/40 lg:block"
    />
  </div>
);

export const LocksideWay = () => (
  <Section id="the-lockside-way" surface="light" className="py-20 md:py-28">
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <Reveal className="order-2 hidden lg:order-1 lg:block">
        <ApproachImage />
      </Reveal>

      <div className="order-1 lg:order-2">
        <SectionHeading eyebrow="Our approach" title="The Lockside way" />

        {/* Image sits here on mobile/tablet — right below the title, above
            the intro copy. The desktop column to the left already shows it,
            so this copy is hidden from lg: up rather than shown twice. */}
        <Reveal className="mt-8 lg:hidden">
          <ApproachImage />
        </Reveal>

        <p className="mt-6 max-w-prose text-base leading-relaxed text-fg-muted">
          We're dedicated to supporting local independent businesses, which is
          why all our beef comes from a local butchery and arrives fresh
          every day. They make sure the cattle are bred in a clean, green and
          ethical way — and because consistency is everything for our chefs,
          we work closely with them so every cut meets the Lockside
          specification.
        </p>

        <ul className="mt-10 space-y-6">
          {proofPoints.map((point, index) => (
            <Reveal as="li" key={point.title} delay={0.08 * index} className="flex gap-4">
              <point.icon
                className="mt-1 h-5 w-5 shrink-0 text-accent"
                aria-hidden="true"
              />
              <div>
                <h3 className="font-display text-lg tracking-[0.06em] text-fg">
                  {point.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                  {point.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.3} className="mt-10">
          <Button as="route" to="/about" variant="secondary">
            More about Lockside
          </Button>
        </Reveal>
      </div>
    </div>
  </Section>
);
