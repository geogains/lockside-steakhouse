import { Link } from "react-router-dom";
import { Button } from "@/components/shared/Button";
import { BookingButtons } from "@/components/shared/BookingButtons";
import { Eyebrow } from "@/components/shared/SectionHeading";
import bullMark from "@/assets/brand/lockside-bull.webp";
import { restaurant } from "@/data/restaurant";
import { useSeo } from "@/hooks/useSeo";

const NotFoundPage = () => {
  useSeo({
    title: `Page not found | ${restaurant.name}`,
    description: "That page doesn't exist. Find our menus, opening hours and booking link instead.",
    path: "/404",
    noIndex: true,
  });

  return (
    <div
      data-surface="dark"
      className="flex min-h-[100svh] items-center bg-ink py-32"
    >
      <div className="container-content text-center">
        <img
          src={bullMark}
          alt=""
          width={96}
          height={66}
          className="mx-auto h-16 w-auto opacity-80"
        />
        <Eyebrow className="mt-8">Error 404</Eyebrow>
        <h1 className="mt-5 text-[clamp(2.5rem,9vw,5rem)] leading-[0.9] text-bone">
          This one got away
        </h1>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-fg-muted">
          We can't find that page. It may have moved, or the link might have a
          typo in it. Here's where most people are heading:
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button as="route" to="/menus" size="lg">
            View Our Menus
          </Button>
          <BookingButtons size="lg" />
        </div>

        <p className="mt-10 text-sm text-fg-subtle">
          Or go back to the{" "}
          <Link to="/" className="text-brass underline underline-offset-4">
            homepage
          </Link>
          . Need us now? Call{" "}
          <a
            href={`tel:${restaurant.telephone.dial}`}
            className="text-brass underline underline-offset-4"
          >
            {restaurant.telephone.display}
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
