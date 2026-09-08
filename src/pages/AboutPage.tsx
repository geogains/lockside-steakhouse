import secondaryImage from "@/assets/gallery/gallery-grill-platter.webp";
import { Section } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";
import { Eyebrow, SectionHeading } from "@/components/shared/SectionHeading";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { Button } from "@/components/shared/Button";
import { BookingButtons } from "@/components/shared/BookingButtons";
import { restaurant } from "@/data/restaurant";
import { useSeo } from "@/hooks/useSeo";
import { breadcrumbSchema } from "@/lib/structuredData";

const AboutPage = () => {
  useSeo({
    title: `About | ${restaurant.name}, Wollaston, Stourbridge`,
    description:
      "Lockside Steakhouse is an independent restaurant on Enville Street in Wollaston, Stourbridge. All our beef comes from a local butchery, delivered fresh every day.",
    path: "/about",
    structuredData: breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ]),
  });

  return (
    <>
      <div data-surface="dark" className="bg-ink pb-16 pt-28 md:pt-36">
        <div className="container-content">
          <Eyebrow>About us</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.5rem,8vw,4.75rem)] leading-[0.9] text-bone">
            An independent steakhouse
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-fg-muted">
            Lockside is run by {restaurant.owners}, a local businessman. 
            "We're a proper independent  and we spend our money with other
            local independents wherever we can".
          </p>
        </div>
      </div>

      <Section surface="light" className="py-20 md:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <ImageWithFallback
              src="/steak.jpg"
              alt="Two seared steaks topped with garlic herb butter and rosemary, resting in a cast iron pan"
              width={1200}
              height={1800}
              objectPosition="50% 50%"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[4/5] w-full rounded-card object-cover shadow-lift-light"
            />
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="The beef"
              title="Straight from a local butchery"
              intro="All our beef is sourced from a local butchery and delivered to us fresh each and every day. They make sure the cattle are bred in a clean, green and ethical way. Consistency is everything — our chefs need to know exactly what they're working with — so we work closely with the butchery to make sure every cut meets the Lockside specification."
            />

            <div className="mt-10 space-y-6 text-sm leading-relaxed text-fg-muted">
              <div>
                <h3 className="font-display text-xl tracking-[0.05em] text-fg">
                  What we cook
                </h3>
                <p className="mt-2">
                  Steaks are the heart of it — sirloin, fillet, ribeye, rump,
                  T-bone, and a 32oz Tomahawk for anyone feeling brave. Around
                  them sits the food people actually want to eat: burgers,
                  sharers, fish and chips, faggots and mushy peas, slow-braised
                  short ribs, a four-cheese macaroni. Every steak comes with
                  garlic butter, mushrooms, grilled tomato, chunky chips and
                  rocket, and there are eight homemade sauces to pour over it.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl tracking-[0.05em] text-fg">
                  Across the week
                </h3>
                <p className="mt-2">
                  Breakfast runs from 8am on weekdays with no booking needed.
                  Weekday lunch has its own menu and a two-for-£20 offer. Sundays
                  are for roasts, including a trio of meats and a slow-roast lamb
                  shoulder. There's a children's menu, and a vegetarian option on
                  the roast.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section surface="dark" className="py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <SectionHeading
              eyebrow="The welcome"
              title="Relaxed, not stiff"
              intro="Lockside is a steakhouse, not a shrine. It's the sort of room where a birthday table can get loud, where families come for Sunday lunch, and where two people can spend a slow evening over a Chateaubriand. Come as you are, eat properly, and don't feel rushed."
            />
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <BookingButtons size="lg" />
              <Button as="route" to="/menus" variant="secondary" size="lg" className="text-bone">
                See the Menus
              </Button>
            </div>
          </div>
          <Reveal className="order-1 lg:order-2">
            <ImageWithFallback
              src={secondaryImage}
              alt="A loaded mixed grill platter with sausages, gammon, pork loin, black pudding, a fried egg, onion rings and chunky chips"
              width={1200}
              height={1496}
              objectPosition="50% 50%"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[4/5] w-full rounded-card object-cover shadow-lift"
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
};

export default AboutPage;
