import { restaurant, locations } from "@/data/restaurant";
import { menus } from "@/data/menus";

/**
 * Restaurant schema for the Stourbridge site — the only location we have
 * confirmed phone, hours and address details for. Do not extend this to
 * Telford until its own contact and hours are confirmed; a fabricated
 * second Restaurant entity would be worse than no listing at all.
 */
export const restaurantSchema = (): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${restaurant.siteUrl}/#restaurant`,
  name: locations.stourbridge.name,
  legalName: restaurant.legalName,
  url: restaurant.siteUrl,
  image: `${restaurant.siteUrl}/lockside-preview.png`,
  telephone: restaurant.telephone.dial,
  email: restaurant.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${locations.stourbridge.street}, ${locations.stourbridge.locality}`,
    addressLocality: locations.stourbridge.town,
    addressRegion: locations.stourbridge.region,
    postalCode: locations.stourbridge.postcode,
    addressCountry: locations.stourbridge.country,
  },
  hasMap: restaurant.urls.directions,
  acceptsReservations: restaurant.urls.booking,
  menu: `${restaurant.siteUrl}/menus`,
  hasMenu: menus.map((menu) => ({
    "@type": "Menu",
    name: menu.name,
    url: `${restaurant.siteUrl}/menus?menu=${menu.id}`,
  })),
  sameAs: restaurant.social.map((profile) => profile.href),
  openingHoursSpecification: restaurant.openingHours.flatMap((entry) =>
    entry.services.map((service) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${entry.schemaDay}`,
      opens: service.opens,
      closes: service.closes,
    })),
  ),
});

export const breadcrumbSchema = (
  trail: { name: string; path: string }[],
): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${restaurant.siteUrl}${item.path}`,
  })),
});
