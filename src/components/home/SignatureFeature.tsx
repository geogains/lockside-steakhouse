import { Reveal } from "@/components/shared/Reveal";
import { Eyebrow } from "@/components/shared/SectionHeading";
import { Button } from "@/components/shared/Button";
import { getMenu, steakDoneness } from "@/data/menus";

/** The sharing cuts, pulled straight from the structured main-menu data so a
 *  price change in menus.ts flows through to this section automatically. */
const featuredIds = ["tomahawk", "chateaubriand", "t-bone", "mega-mix-grill"];

export const SignatureFeature = () => {
  const steaks = getMenu("main")?.sections.find((s) => s.id === "our-steaks");
  const featured = featuredIds
    .map((id) => steaks?.items.find((item) => item.id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <section
      id="signature"
      data-surface="dark"
      aria-labelledby="signature-heading"
      className="relative scroll-mt-24 overflow-hidden bg-ink"
    >
      <div className="grid lg:grid-cols-2">
        {/* Image half — full-bleed on large screens. */}
        <div className="relative min-h-[60vw] lg:min-h-[42rem]">
          <img
            src="/steak1.jpg"
            alt="Two seared steaks topped with garlic herb butter and rosemary, resting in a cast iron pan"
            width={1200}
            height={1800}
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="absolute inset-0 h-full w-full object-cover object-[50%_45%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent
                       lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-ink/80"
          />
        </div>

        {/* Copy half */}
        <div className="flex items-center px-5 py-20 md:px-10 lg:px-14 lg:py-24 xl:px-20">
          <div className="w-full max-w-xl">
            <Reveal>
              <Eyebrow>Our steaks</Eyebrow>
              <h2
                id="signature-heading"
                className="mt-5 text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] text-bone"
              >
                The main
                <br />
                <span className="text-brass">event</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-fg-muted">
                Every steak arrives with garlic butter, button mushrooms, grilled
                tomato, chunky chips and rocket. Add one of our homemade sauces
                for £1.50 — port and stilton, beef dripping, chimichurri and
                nduja, or the Firecracker.
              </p>
            </Reveal>

            {/* Sharing cuts */}
            <Reveal delay={0.12} className="mt-10">
              <h3 className="font-body text-eyebrow font-semibold uppercase text-fg-subtle">
                Built for the table
              </h3>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {featured.map((item) => (
                  <li key={item.id} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-3.5">
                    <span className="min-w-0 break-words font-display text-lg tracking-[0.05em] text-bone">
                      {item.name}
                    </span>
                    <span aria-hidden="true" className="flex-1 border-b border-dotted border-line" />
                    <span className="tabular font-body text-sm font-semibold text-brass">
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Cooking guide — the "for your info" panel from the printed menu. */}
            <Reveal delay={0.2} className="mt-9">
              <h3 className="font-body text-eyebrow font-semibold uppercase text-fg-subtle">
                How would you like it?
              </h3>
              <dl className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {steakDoneness.map((step) => (
                  <div key={step.level} className="flex gap-2 text-sm">
                    <dt className="shrink-0 font-semibold text-bone">
                      {step.level}
                    </dt>
                    <dd className="text-fg-subtle">{step.detail}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.28} className="mt-10">
              <Button as="route" to="/menus#our-steaks" size="lg">
                View the Steak Menu
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
