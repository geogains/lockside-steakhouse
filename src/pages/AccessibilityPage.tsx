import { LegalPage } from "@/components/shared/LegalPage";
import { restaurant } from "@/data/restaurant";
import { useSeo } from "@/hooks/useSeo";

const AccessibilityPage = () => {
  useSeo({
    title: `Accessibility | ${restaurant.name}`,
    description:
      "How we have tried to make The Lockside Steakhouse website usable for everyone, what we know is not perfect, and how to tell us about a problem.",
    path: "/accessibility",
  });

  return (
    <LegalPage
      eyebrow="Accessibility"
      title="Accessibility statement"
      updated="July 2026"
    >
      <section>
        <h2>What we have aimed for</h2>
        <p>
          We built this website to meet the Web Content Accessibility Guidelines
          (WCAG) 2.2 at level AA as far as we practically can. We have not had it
          independently audited, so we are not claiming full compliance — this
          statement describes what we have actually done and what we know is
          imperfect.
        </p>
      </section>

      <section>
        <h2>What we have done</h2>
        <ul>
          <li>Every page uses proper headings in a logical order, with one main heading per page.</li>
          <li>The whole site can be used with a keyboard alone, including the photo gallery and the menu selector.</li>
          <li>Focus outlines are visible and are never removed without a replacement.</li>
          <li>A "skip to content" link is the first thing a keyboard user reaches.</li>
          <li>Photographs that carry meaning have descriptive alternative text; purely decorative images are hidden from screen readers.</li>
          <li>Buttons are buttons and links are links — there are no clickable plain elements.</li>
          <li>Dietary markers on menus are always paired with a text label, so no information is carried by colour alone.</li>
          <li>Animation is decorative and stops entirely if your device or browser requests reduced motion.</li>
          <li>Nothing plays audio or video automatically.</li>
          <li>Text can be enlarged and the layout reflows down to a 320px-wide screen without side-scrolling.</li>
        </ul>
      </section>

      <section>
        <h2>Where we know we fall short</h2>
        <ul>
          <li>
            Our printed menu PDFs are design files, not accessible documents.
            Every menu is also published as ordinary web text on our{" "}
            <a href="/menus">menus page</a>, which is the accessible version — the
            PDFs are only there as the original reference.
          </li>
          <li>
            The photo gallery moves on by itself. It can be paused, it stops when
            you hover or focus it, and it never moves at all if you have reduced
            motion enabled — but it does begin moving on its own.
          </li>
          <li>
            The Google map, if you choose to load it, is a third-party embed and
            we cannot control its accessibility. The full address and a text
            directions link are provided alongside it.
          </li>
          <li>
            Online booking is handled by Dojo on their own website. Its
            accessibility is theirs, not ours — so if you have any difficulty,
            please just ring us and we will book your table over the phone.
          </li>
          <li>
            We have not yet tested the site with every combination of screen
            reader and browser.
          </li>
        </ul>
      </section>

      <section>
        <h2>Tell us about a problem</h2>
        <p>
          If something on this site is hard to use, we would genuinely like to
          know. Email{" "}
          <a href={`mailto:${restaurant.email}`}>{restaurant.email}</a> or call{" "}
          <a href={`tel:${restaurant.telephone.dial}`}>
            {restaurant.telephone.display}
          </a>
          . If you need any information from this website in another format,
          including our menus read out to you over the phone, just ask.
        </p>
      </section>

      <section>
        <h2>Visiting the restaurant</h2>
        <p>
          For questions about physical access to the restaurant itself — parking,
          step-free entry, accessible toilets or seating — please call us on{" "}
          <a href={`tel:${restaurant.telephone.dial}`}>
            {restaurant.telephone.display}
          </a>{" "}
          and the team will tell you exactly what to expect before you travel.
        </p>
      </section>
    </LegalPage>
  );
};

export default AccessibilityPage;
