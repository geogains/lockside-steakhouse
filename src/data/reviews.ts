import { restaurant } from "./restaurant";

export type Review = {
  id: string;
  /** Reviewer name exactly as published. Never invent or abbreviate. */
  author: string;
  /** Whole stars, 1–5. Omit entirely unless the rating is verified. */
  rating?: number;
  /** The reviewer's own words. */
  quote: string;
  /** Where the review was published, e.g. "Google review". */
  source: string;
};

/**
 * Approved reviews, selected from the restaurant's public Google review
 * material and lightly condensed for website presentation. Wording is not
 * to be rewritten further; no additional reviews, dates or photos are to be
 * invented alongside these.
 */
export const reviews: Review[] = [
  {
    id: "jim-latham",
    author: "Jim Latham",
    rating: 5,
    quote:
      "A really pleasant atmosphere, friendly and professional service, and an excellent choice of food. We were more than satisfied with both the quality and the portions.",
    source: "Google",
  },
  {
    id: "kevin-b",
    author: "Kevin B",
    rating: 5,
    quote:
      "The food was outstanding. The rib-eye was cooked perfectly and melted in the mouth, and the service from the whole team was superb.",
    source: "Google",
  },
  {
    id: "natalie-f",
    author: "Natalie F",
    rating: 5,
    quote:
      "We felt welcome from the moment we arrived. Fantastic food, generous portions and a genuinely friendly, attentive team. We’ll definitely be back.",
    source: "Google",
  },
  {
    id: "martin-w",
    author: "Martin W",
    rating: 5,
    quote:
      "Great atmosphere, brilliant staff and amazing food from start to finish. Fresh, tasty and well balanced. Excellent value for the quality.",
    source: "Google",
  },
  {
    id: "mark-b",
    author: "Mark B",
    rating: 5,
    quote:
      "Fantastic Sunday lunch with excellent service. Everything was tasty, well presented and the staff were friendly and welcoming throughout.",
    source: "Google",
  },
  {
    id: "keleigh-s",
    author: "Keleigh S",
    rating: 5,
    quote:
      "A brilliant place with a calm atmosphere and impeccable service. We felt completely comfortable and welcome throughout our visit.",
    source: "Google",
  },
  {
    id: "josh-e",
    author: "Josh E",
    rating: 5,
    quote:
      "From beginning to end the experience was excellent. Friendly service, great food and careful attention to dietary requirements. We’ll definitely return.",
    source: "Google",
  },
  {
    id: "joe-1",
    author: "Joe 1",
    rating: 5,
    quote:
      "Consistently excellent. Brilliant service and seriously good food — one of those places we’re always happy to come back to.",
    source: "Google",
  },
];

/**
 * No aggregate score is published here on purpose: the restaurant's public
 * ratings differ substantially between platforms, so any single figure would be
 * misleading. Confirm the figure you want to use before setting this.
 */
export const aggregateRating: { value: string; count: string; source: string } | null =
  null;

export const reviewsCta = {
  label: "Read our Google reviews ",
  href: restaurant.urls.reviews,
};
