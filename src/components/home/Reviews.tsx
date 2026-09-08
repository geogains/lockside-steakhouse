import { ExternalLink } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/shared/Button";
import { TestimonialsColumn } from "@/components/shared/TestimonialsColumn";
import { reviews, aggregateRating, reviewsCta } from "@/data/reviews";

export const Reviews = () => {
  /* Three equal columns read as intentional; an uneven leftover column
     reads as a bug. Rather than inventing a review to round the count up,
     drop the smallest possible remainder off the end so every column gets
     the same number of cards — all of it still genuine, approved review
     text, just not force-fit into an uneven split. This also means the
     display updates itself with no code change whenever the total is (or
     becomes) a clean multiple of three. */
  const displayCount = reviews.length - (reviews.length % 3);
  const displayedReviews = reviews.slice(0, displayCount);
  const firstColumn = displayedReviews.filter((_, i) => i % 3 === 0);
  const secondColumn = displayedReviews.filter((_, i) => i % 3 === 1);
  const thirdColumn = displayedReviews.filter((_, i) => i % 3 === 2);

  return (
    <Section
      id="reviews"
      surface="light"
      contained={false}
      className="overflow-hidden py-20 md:py-28"
    >
      <div className="container-content">
        <SectionHeading
          eyebrow="Reviews"
          title="What people say"
          align="center"
          intro="In the words of the people who've eaten here."
        />

        {aggregateRating ? (
          <Reveal className="mt-8 text-center">
            <p className="font-display text-4xl text-fg">{aggregateRating.value}</p>
            <p className="mt-1 text-sm text-fg-muted">
              Based on {aggregateRating.count} {aggregateRating.source} reviews
            </p>
          </Reveal>
        ) : null}
      </div>

      {/* Wider than the standard content container — the three columns are
          meant to feel expansive, not boxed into the usual reading measure.
          Same gutter convention as .container-content, just a wider cap. */}
      <div className="mx-auto mt-12 w-[92%] max-w-[100rem]">
        {/* Three columns drifting upward behind a vertical fade. One column
            on mobile, two from tablet, three from desktop. */}
        <div className="mask-fade-y flex max-h-[42rem] gap-6 overflow-hidden">
          <TestimonialsColumn
            testimonials={firstColumn}
            duration={13}
            className="min-w-0 flex-1"
          />
          <TestimonialsColumn
            testimonials={secondColumn}
            duration={15}
            className="hidden min-w-0 flex-1 md:flex"
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            duration={14}
            className="hidden min-w-0 flex-1 lg:flex"
          />
        </div>
      </div>

      <div className="container-content">
        <Reveal delay={0.1} className="mt-12 text-center">
          <Button as="a" href={reviewsCta.href} external variant="secondary">
            {reviewsCta.label}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </Button>
        </Reveal>
      </div>
    </Section>
  );
};
