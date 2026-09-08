import cocktailDiningRoom from "@/assets/gallery/gallery-cocktail-dining-room.webp";
import mixedGrillBoard from "@/assets/gallery/gallery-mixed-grill-board.webp";
import steakBeefDripping from "@/assets/gallery/gallery-steak-beef-dripping.webp";
import grillPlatter from "@/assets/gallery/gallery-grill-platter.webp";
import slicedSirloin from "@/assets/gallery/gallery-sliced-sirloin.webp";
import burgerOnionRings from "@/assets/gallery/gallery-burger-onion-rings.webp";
import signatureBoards from "@/assets/food/signature-steak-boards.webp";

export type GalleryImage = {
  id: string;
  src: string;
  /** Meaningful alternative text — never decorative in this gallery. */
  alt: string;
  /** Short caption shown beneath the featured image. */
  caption: string;
  /**
   * Focal point for the CSS object-position, so portrait photographs are
   * never stretched or badly cropped inside the landscape featured frame.
   */
  focus?: string;
  orientation: "portrait" | "landscape";
};

/**
 * Ordered to tell a story: arrival and atmosphere, then the steaks, then the
 * wider table. All eight supplied Lockside photographs are used once only.
 *
 * ASSETS STILL NEEDED (see LAUNCH-CHECKLIST.md): exterior/frontage, a wide
 * dining-room interior, a dessert, and a celebration table.
 */
export const galleryImages: GalleryImage[] = [
  {
    id: "dining-room",
    src: cocktailDiningRoom,
    alt: "A tall passion fruit cocktail garnished with raspberries and a Lockside Steakhouse badge, on a live-edge timber table with the dining room behind",
    caption: "Cocktails and the dining room at Lockside",
    focus: "50% 35%",
    orientation: "portrait",
  },
  {
    id: "signature-boards",
    src: signatureBoards,
    alt: "A large bone-in steak on a wooden board with chunky chips, roasted tomato, mushrooms, dipping sauces and rocket",
    caption: "A steak built for the middle of the table",
    focus: "50% 50%",
    orientation: "landscape",
  },
  {
    id: "mixed-grill",
    src: mixedGrillBoard,
    alt: "Two grilled steaks served on boards with chunky chips in metal cups, grilled tomato and dressed rocket",
    caption: "Chargrilled steaks with chunky chips",
    focus: "50% 45%",
    orientation: "portrait",
  },
  {
    id: "beef-dripping",
    src: steakBeefDripping,
    alt: "A chargrilled steak on a board beside a pot of beef dripping sauce and a cup of chunky chips",
    caption: "Homemade sauces, poured at the table",
    focus: "50% 45%",
    orientation: "portrait",
  },
  {
    id: "grill-platter",
    src: grillPlatter,
    alt: "A loaded mixed grill platter with sausages, gammon, pork loin, black pudding, a fried egg, onion rings and chunky chips",
    caption: "The Mega Mix Grill",
    focus: "50% 50%",
    orientation: "portrait",
  },
  {
    id: "sliced-sirloin",
    src: slicedSirloin,
    alt: "Sliced pink steak fanned across a serving plate with chunky chips and dipping sauces on a dark timber table",
    caption: "Sliced and served for sharing",
    focus: "50% 55%",
    orientation: "landscape",
  },
  {
    id: "burger",
    src: burgerOnionRings,
    alt: "A stacked cheeseburger on a wooden board with skin-on fries, giant beer battered onion rings and pickled red cabbage",
    caption: "From the Burger Bar",
    focus: "50% 50%",
    orientation: "landscape",
  },
];
