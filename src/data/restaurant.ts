/**
 * Single source of truth for every piece of Lockside business information.
 *
 * Nothing in this file may be duplicated inside a component. If a phone
 * number, URL or opening time needs to change, it changes here only.
 *
 * PROVENANCE OF EVERY VALUE BELOW
 * -------------------------------
 * - Address, phone, email, hours ....... client-supplied Google Business
 *                                        Profile screenshot, 27 July 2026
 * - Registered name .................... same screenshot ("Lockside
 *                                        Steakhouse Limited")
 * - Booking URL ........................ client-supplied, 27 July 2026
 * - Social profiles .................... locksidesteakhouse.com footer
 * - Large party policy ................. verbatim from locksidesteakhouse.com
 * - Breakfast service times ............ printed Lockside breakfast menu
 * - Sourcing copy ...................... verbatim from the printed main menu
 *                                        ("The Lockside Way")
 *
 * See LAUNCH-CHECKLIST.md for the recorded conflicts between these sources.
 */

export type OpeningHoursEntry = {
  /** Full day name, used as the row label and in structured data. */
  day: string;
  /** ISO-ish short code for schema.org dayOfWeek. */
  schemaDay: string;
  /** One entry per service window. Split services are never merged. */
  services: { label?: string; opens: string; closes: string }[];
};

/**
 * One physical Lockside site. Only the fields we actually have confirmed
 * details for are required — a new location can be added with just an
 * address and nothing else until its phone number, hours, booking link and
 * map are known.
 */
export type LocationInfo = {
  name: string;
  street: string;
  locality: string;
  town: string;
  postcode: string;
  region?: string;
  country?: string;
  /** Single-line form for schema and meta tags. */
  oneLine: string;
  /** Present once a site has its own confirmed contact number. */
  telephone?: { display: string; dial: string };
  /** Present once a site has its own confirmed booking/map links. */
  urls?: {
    booking?: string;
    directions?: string;
    mapEmbed?: string;
  };
};

/**
 * Every Lockside site. Stourbridge is the original, fully confirmed
 * location. Telford is a second, real site we only have an address for so
 * far — do not add a phone number, opening hours, booking link or map embed
 * for it until the client supplies them (see LAUNCH-CHECKLIST.md). Its
 * booking link is now confirmed; phone number and opening hours are not.
 */
export const locations = {
  stourbridge: {
    name: "Lockside Steakhouse Stourbridge",
    street: "121 Enville Street",
    locality: "Wollaston, Stourbridge",
    town: "Stourbridge",
    postcode: "DY8 3TQ",
    region: "West Midlands",
    country: "GB",
    oneLine: "121 Enville Street, Wollaston, Stourbridge, DY8 3TQ",
    telephone: { display: "01384 910 038", dial: "+441384910038" },
    urls: {
      booking:
        "https://web.dojo.app/create_booking/vendor/gHxIPvoLGkfD68YCjEzkqE8zi10ucvRKGWECPlRQjWk_restaurant",
      directions:
        "https://www.google.com/maps/dir/?api=1&destination=The+Lockside+Steakhouse%2C+121+Enville+Street%2C+Wollaston%2C+Stourbridge%2C+DY8+3TQ",
      /** Includes the business name (not just the address) so the embed
       * centres on the actual Lockside Steakhouse Google Business listing —
       * shown as a named venue pin — rather than a generic address result.
       * Source place: https://www.google.com/maps/place/Lockside+Steakhouse/@52.4581589,-2.1573259,17z/data=!3m2!4b1!5s0x487091b3ea247b1d:0x5c567e79e2bb65de!4m6!3m5!1s0x4870a319c73492c5:0xeb18ae3cc648dbd9!8m2!3d52.4581557!4d-2.154751!16s%2Fg%2F11h1kn935_
       */
      mapEmbed:
        "https://www.google.com/maps?q=Lockside+Steakhouse,+121+Enville+Street,+Wollaston,+Stourbridge,+DY8+3TQ&output=embed",
    },
  },
  telford: {
    name: "Lockside Steakhouse Telford",
    street: "72 Beveley Road",
    locality: "Ketley, Telford",
    town: "Telford",
    postcode: "TF2 6SD",
    oneLine: "72 Beveley Road, Ketley, Telford, TF2 6SD",
    // The map embed is derived directly from the address above (no API key
    // needed, same pattern as Stourbridge's). The booking URL is the
    // client-confirmed Dojo vendor link for this site. Telephone and
    // directions links are still not invented — none exist yet.
    urls: {
      booking:
        "https://web.dojo.app/create_booking/vendor/B-SJ1ta0nciUX3-K4tXuWreX0VCD9_zCuxhVpCxyKxs_restaurant",
      mapEmbed:
        "https://www.google.com/maps?q=72+Beveley+Road,+Ketley,+Telford,+TF2+6SD&output=embed",
    },
  },
} satisfies Record<"stourbridge" | "telford", LocationInfo>;

export const restaurant = {
  name: "The Lockside Steakhouse",
  shortName: "Lockside",
  legalName: "Lockside Steakhouse Limited",
  tagline: "Steakhouses in Stourbridge and Telford",

  /**
   * The site-wide contact number below is currently Stourbridge's — it's the
   * only location with a confirmed phone number. It stays at the top level
   * (rather than nested under `locations.stourbridge`) because it's used
   * throughout the site as "the" number, independent of which location a
   * given page is describing.
   */

  /** Display form and dial form are kept separate so tel: links stay valid. */
  telephone: locations.stourbridge.telephone,
  email: "contact@locksidesteakhouse.com",

  /** Canonical production origin. Update if the domain changes. */
  siteUrl: "https://locksidesteakhouse.com",

  urls: {
    /**
     * Every user-facing booking CTA is location-specific (see
     * `BookingButtons`) and links directly into `locations.*.urls.booking`.
     * This single URL survives only for schema.org's `acceptsReservations`,
     * which models one restaurant and needs one canonical link — Stourbridge,
     * as the original, fully-confirmed site.
     */
    booking: locations.stourbridge.urls.booking,
    /** Google review profile — used for the reviews CTA. */
    reviews: "https://www.google.com/search?q=Lockside+Steakhouse+Reviews",
    directions: locations.stourbridge.urls.directions,
    mapEmbed: locations.stourbridge.urls.mapEmbed,
  },

  social: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/LocksideSteakhouse/?locale=en_GB",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/lockside_steakhouse/",
    },
  ],

  /** Brand hashtags as printed on the main menu. */
  hashtags: ["#LocksideSteakhouse", "#SupportLocal"],

  /**
   * Restaurant service. Split lunch and evening services are represented
   * separately — never compressed into a single misleading range.
   */
  openingHours: [
    {
      day: "Monday",
      schemaDay: "Monday",
      services: [
        { label: "Lunch", opens: "12:00", closes: "15:00" },
        { label: "Evening", opens: "17:00", closes: "22:00" },
      ],
    },
    {
      day: "Tuesday",
      schemaDay: "Tuesday",
      services: [
        { label: "Lunch", opens: "12:00", closes: "15:00" },
        { label: "Evening", opens: "17:00", closes: "22:00" },
      ],
    },
    {
      day: "Wednesday",
      schemaDay: "Wednesday",
      services: [
        { label: "Lunch", opens: "12:00", closes: "15:00" },
        { label: "Evening", opens: "17:00", closes: "22:00" },
      ],
    },
    {
      day: "Thursday",
      schemaDay: "Thursday",
      services: [
        { label: "Lunch", opens: "12:00", closes: "15:00" },
        { label: "Evening", opens: "17:00", closes: "22:00" },
      ],
    },
    {
      day: "Friday",
      schemaDay: "Friday",
      services: [
        { label: "Lunch", opens: "12:00", closes: "15:00" },
        { label: "Evening", opens: "17:00", closes: "22:00" },
      ],
    },
    {
      day: "Saturday",
      schemaDay: "Saturday",
      services: [{ opens: "12:00", closes: "22:00" }],
    },
    {
      day: "Sunday",
      schemaDay: "Sunday",
      services: [{ opens: "12:00", closes: "20:00" }],
    },
  ] satisfies OpeningHoursEntry[],

  /** Breakfast runs before the main service and takes no bookings. */
  breakfastService: {
    summary: "Monday–Friday 8am–11.30am · Saturday 9am–11.30am",
    note: "No booking necessary. Takeaway available.",
  },

  /** Verbatim from the restaurant's own published policy. */
  groupPolicy: {
    threshold: 12,
    body: "For parties of 12 or more guests we require a pre-order to ensure the best possible service and dining experience for your group.",
    cancellation:
      "If any member of your party is unable to attend, their meal must be cancelled prior to your arrival. If a cancellation is not made in advance, the meal will still be charged.",
  },

  /**
   * Ownership. Publicly stated by the restaurant on its Tripadvisor
   * listing; kept here because "Mat" is named on the printed main menu.
   */
  owners: "Matthew Lemm",

  copyrightName: "Lockside Steakhouse Limited",
  designCredit: null as string | null,
} as const;

/** Compact hours summary for the footer, grouped where days match. */
export const hoursSummary: { days: string; times: string }[] = [
  { days: "Monday–Friday", times: "12pm–3pm · 5pm–10pm" },
  { days: "Saturday", times: "9am–11pm" },
  { days: "Sunday", times: "12pm–9pm" },
];
