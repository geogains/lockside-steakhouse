import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Eyebrow } from "@/components/shared/SectionHeading";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { restaurant, locations, hoursSummary } from "@/data/restaurant";
import { footerNav, legalNav, navHref } from "@/data/navigation";

export const Footer = () => (
  <footer
    data-surface="dark"
    className="border-t border-line bg-surface text-fg no-print"
  >
    <div className="container-content grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
      {/* Brand */}
      <div className="lg:col-span-1">
        <Logo alt="The Lockside Steakhouse" className="h-12 w-auto" />
        <p className="mt-5 max-w-xs text-sm leading-relaxed text-fg-muted">
          Independent steakhouses in Wollaston, Stourbridge and Telford. Beef
          from a local butchery, generous plates and a warm welcome.
        </p>
        <SocialLinks className="mt-6" />
      </div>

      {/* Contact */}
      <div>
        <h2 className="font-display text-base tracking-[0.22em] text-brass">
          Find Us
        </h2>

        <div className="mt-5 space-y-6">
          {/* Stourbridge — the original, fully open location. */}
          <address className="space-y-3 text-sm not-italic text-fg-muted">
            <Eyebrow className="text-xs">Stourbridge</Eyebrow>
            <p className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brass/70" aria-hidden="true" />
              <span>
                {locations.stourbridge.street}
                <br />
                {locations.stourbridge.locality}
                <br />
                {locations.stourbridge.postcode}
              </span>
            </p>
            <p className="flex gap-3">
              <Phone className="h-4 w-4 shrink-0 text-brass/70" aria-hidden="true" />
              <a
                href={`tel:${restaurant.telephone.dial}`}
                className="transition-colors hover:text-brass"
              >
                {restaurant.telephone.display}
              </a>
            </p>
            <p className="flex gap-3">
              <Mail className="h-4 w-4 shrink-0 text-brass/70" aria-hidden="true" />
              <a
                href={`mailto:${restaurant.email}`}
                className="break-all transition-colors hover:text-brass"
              >
                {restaurant.email}
              </a>
            </p>
          </address>

          {/* Telford — a real second site. Only its address is confirmed so
              far; add phone/email here once the client supplies them. */}
          <address className="space-y-3 border-t border-line pt-6 text-sm not-italic text-fg-muted">
            <Eyebrow className="text-xs">Telford</Eyebrow>
            <p className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brass/70" aria-hidden="true" />
              <span>
                {locations.telford.street}
                <br />
                {locations.telford.locality}
                <br />
                {locations.telford.postcode}
              </span>
            </p>
          </address>
        </div>
      </div>

      {/* Hours */}
      <div>
        <h2 className="font-display text-base tracking-[0.22em] text-brass">
          Opening Hours
        </h2>
        <dl className="mt-5 space-y-3 text-sm text-fg-muted">
          {hoursSummary.map((row) => (
            <div key={row.days}>
              <dt className="text-bone">{row.days}</dt>
              <dd className="tabular">{row.times}</dd>
            </div>
          ))}
          <div>
            <dt className="text-bone">Breakfast</dt>
            <dd>{restaurant.breakfastService.summary}</dd>
          </div>
        </dl>
      </div>

      {/* Links */}
      <div>
        <h2 className="font-display text-base tracking-[0.22em] text-brass">
          Explore
        </h2>
        <ul className="mt-5 space-y-3 text-sm">
          {footerNav.map((item) => (
            <li key={item.label}>
              <Link
                to={navHref(item)}
                className="text-fg-muted transition-colors hover:text-brass"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={locations.stourbridge.urls.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-muted transition-colors hover:text-brass"
            >
              Book Stourbridge
            </a>
          </li>
          <li>
            <a
              href={locations.telford.urls.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-muted transition-colors hover:text-brass"
            >
              Book Telford
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="border-t border-line">
      <div className="container-content flex flex-col gap-4 py-6 text-xs text-fg-subtle md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {restaurant.copyrightName}. All rights
          reserved.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {legalNav.map((item) => (
            <li key={item.label}>
              <Link
                to={navHref(item)}
                className="transition-colors hover:text-brass"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </footer>
);
