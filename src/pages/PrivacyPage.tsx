import { LegalPage } from "@/components/shared/LegalPage";
import { restaurant, locations } from "@/data/restaurant";
import { useSeo } from "@/hooks/useSeo";

const PrivacyPage = () => {
  useSeo({
    title: `Privacy Policy | ${restaurant.name}`,
    description:
      "How The Lockside Steakhouse website handles your information, and which third-party services it uses.",
    path: "/privacy",
  });

  return (
    <LegalPage eyebrow="Legal" title="Privacy policy" updated="July 2026">
      <section>
        <h2>The short version</h2>
        <p>
          This website does not ask you for any personal information, does not
          use analytics or advertising trackers, and does not set any cookies of
          its own. There are no forms on this site and nothing you do here is
          logged by us.
        </p>
      </section>

      <section>
        <h2>Who we are</h2>
        <p>
          {restaurant.legalName}, {locations.stourbridge.oneLine}. You can reach us
          on <a href={`tel:${restaurant.telephone.dial}`}>{restaurant.telephone.display}</a>{" "}
          or at <a href={`mailto:${restaurant.email}`}>{restaurant.email}</a>. For
          UK data protection law, we are the data controller for information you
          send us directly.
        </p>
      </section>

      <section>
        <h2>Third-party services used by this website</h2>
        <p>
          Some parts of this site connect you to other companies. When that
          happens, their own privacy policies apply and we have no access to the
          data they collect.
        </p>
        <ul>
          <li>
            <strong>Dojo</strong> — our online booking provider. Selecting a
            "Book Stourbridge" or "Book Telford" button takes you to Dojo's
            own website, where you enter your booking details directly with
            them. We receive the resulting booking; Dojo processes the form.
          </li>
          <li>
            <strong>Google Maps</strong> — the map on our homepage is{" "}
            <em>not</em> loaded until you choose to load it. Until you press
            "Load the map", no request is made to Google and no Google cookies
            are set. If you press it, Google may set cookies and record your IP
            address. The "Get Directions" link opens Google Maps in a new tab
            instead, if you prefer.
          </li>
          <li>
            <strong>Google Fonts</strong> — our typefaces are served from
            Google's font service, which means Google receives your IP address
            when the page loads. No cookies are set by this.
          </li>
          <li>
            <strong>Facebook and Instagram</strong> — we link to our profiles.
            These are plain links, not embedded widgets, so nothing loads from
            those companies unless you click through.
          </li>
          <li>
            <strong>Vercel</strong> — our hosting provider. Like any web host,
            its servers process the requests needed to deliver these pages.
          </li>
        </ul>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>
          We set no cookies ourselves. The only cookies that can appear are
          Google's, and only after you deliberately load the map. Because there
          are no analytics or marketing cookies, this site does not need a
          consent banner — and we would rather not show you one that does
          nothing.
        </p>
      </section>

      <section>
        <h2>If you contact us</h2>
        <p>
          If you email, call or message us about a booking or an enquiry, we keep
          what you send us for as long as we need it to deal with your request
          and to run the restaurant properly. We do not sell it or pass it to
          anyone for marketing.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>
          Under UK GDPR you can ask us what information we hold about you, ask us
          to correct or delete it, or object to how we use it. Email{" "}
          <a href={`mailto:${restaurant.email}`}>{restaurant.email}</a> and we
          will respond. If you are unhappy with our response you can complain to
          the Information Commissioner's Office at ico.org.uk.
        </p>
      </section>
    </LegalPage>
  );
};

export default PrivacyPage;
