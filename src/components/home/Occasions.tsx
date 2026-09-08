import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/shared/Button";
import { occasions } from "@/data/occasions";
import { restaurant } from "@/data/restaurant";

export const Occasions = () => (
  <Section id="occasions" surface="light" className="py-20 md:py-28">
    <SectionHeading
      eyebrow="Occasions"
      title="Tables for every reason"
      align="center"
      intro="Whether it's two of you on a Friday or twelve of you for a birthday, we'll make room."
    />

    <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {occasions.map((occasion, index) => (
        <Reveal
          as="li"
          key={occasion.id}
          delay={0.07 * index}
          className="flex h-full flex-col rounded-card border border-line bg-bone p-7"
        >
          <occasion.icon className="h-6 w-6 text-accent" aria-hidden="true" />
          <h3 className="mt-5 font-display text-xl tracking-[0.05em] text-fg">
            {occasion.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">
            {occasion.body}
          </p>
        </Reveal>
      ))}
    </ul>

    {/* Group policy — reproduced from the restaurant's own published wording. */}
    <Reveal delay={0.1} className="mt-12">
      <div className="rounded-card border border-accent/25 bg-bone p-7 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.4fr,1fr] lg:items-center lg:gap-12">
          <div>
            <h3 className="font-display text-2xl tracking-[0.05em] text-fg">
              Planning for {restaurant.groupPolicy.threshold} or more?
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">
              {restaurant.groupPolicy.body}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-fg-subtle">
              {restaurant.groupPolicy.cancellation}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              as="a"
              href={`tel:${restaurant.telephone.dial}`}
              variant="primary"
              className="w-full"
            >
              Call {restaurant.telephone.display}
            </Button>
            <Button
              as="a"
              href={`mailto:${restaurant.email}?subject=Group%20booking%20enquiry`}
              variant="secondary"
              className="w-full"
            >
              Email the team
            </Button>
          </div>
        </div>
      </div>
    </Reveal>
  </Section>
);
