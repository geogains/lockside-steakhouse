/**
 * Lockside menu data.
 *
 * Every item below was transcribed from the supplied PDFs and then checked
 * against a rasterised image of the page, because raw text extraction was
 * demonstrably unreliable on these files. Notable corrections made:
 *
 * 1. The main menu's "Lets Start" column contains an orphaned text layer for a
 *    king prawn and shrimp skewer sitting *underneath* the visible artwork. It
 *    does not appear on the printed menu and has been excluded.
 * 2. The Tomahawk is printed as "32°Z" — a design error for "32oz", since every
 *    other steak on the same panel uses "oz". Rendered here as 32oz.
 * 3. "TRIPPLE PEPPERCORN" is printed as shown. Branded/printed wording is
 *    preserved rather than silently corrected; flagged in the launch checklist.
 * 4. Loaded nachos and Macaroni Madness upgrade prices are printed ambiguously.
 *    They are modelled as total prices for the upgraded dish, which is the only
 *    plausible reading. Flagged for confirmation.
 * 5. Breakfast add-on prices sit at a resolution where 80p cannot be fully
 *    distinguished from other values, so individual prices are omitted and a
 *    "from 80p" note is shown instead.
 *
 * Dietary codes follow the printed menus: (v) vegetarian, (ve) vegan,
 * (GF) gluten free.
 */

export type DietaryCode = "v" | "ve" | "gf";

export type MenuItem = {
  id: string;
  name: string;
  price?: string;
  description?: string;
  dietary?: DietaryCode[];
  /** Chef's cooking recommendation, shown as a distinct pill. */
  recommendation?: string;
  /** Multi-option dishes (sizes, upgrades, choices). */
  options?: { label: string; price?: string }[];
};

export type MenuSection = {
  id: string;
  title: string;
  description?: string;
  /** Free text such as "Any two dishes £20". */
  note?: string;
  items: MenuItem[];
};

export type RestaurantMenu = {
  id: string;
  name: string;
  /** Short line used on the homepage menu cards. */
  blurb: string;
  availability?: string;
  /** Date of the source document, for maintenance. */
  effectiveDate?: string;
  /** Link to the original printed menu. */
  pdfUrl?: string;
  pdfLabel?: string;
  sections: MenuSection[];
};

/* ------------------------------------------------------------------ */
/* MAIN MENU — source: Main-menu-2025-Nov-changes.pdf (November 2025)  */
/* ------------------------------------------------------------------ */

const mainMenu: RestaurantMenu = {
  id: "main",
  name: "Main Menu",
  blurb:
    "Steaks cut for the table, burgers, hangers and the dishes we're known for.",
  availability: "Lunch and evening service",
  effectiveDate: "November 2025",
  pdfUrl: "/menus/lockside-main-menu.pdf",
  pdfLabel: "Download the printed main menu (PDF)",
  sections: [
    {
      id: "lets-start",
      title: "Lets Start",
      items: [
        {
          id: "soup",
          name: "Soup",
          price: "£6.95",
          description:
            "Creamy leek and potato soup, cheddar croutons and parsnip crisps with warm bread and butter.",
        },
        {
          id: "bbq-wings",
          name: "Finger Lickin' BBQ Wings",
          price: "£8.50",
          description:
            "BBQ chicken wings served with BBQ dip and blue cheese sauce.",
        },
        {
          id: "wild-mushrooms",
          name: "Wild Mushrooms",
          price: "£9.00",
          dietary: ["v"],
          description:
            "Tart of pan fried wild mushrooms with garlic, herbs and white wine sauce.",
        },
        {
          id: "chicken-ham-terrine",
          name: "Chicken and Ham Terrine",
          price: "£9.00",
          description:
            "Savoury layers of chicken and ham, with grapes, apple, celery and pecans.",
        },
        {
          id: "hop-scotch",
          name: "Hop Scotch",
          price: "£6.95",
          description:
            "Warm Scotch egg in panko crumb with tomato salsa and HP brown sauce.",
        },
        {
          id: "smoked-salmon",
          name: "Smoked Salmon",
          price: "£10.00",
          description:
            "Little parcels of Wye Valley smoked salmon, prawns, cucumber with dill mayonnaise.",
        },
        {
          id: "tacos-baby",
          name: "Tacos Baby",
          price: "£8.95",
          description:
            "Sticky shredded beef tacos with guacamole, salsa and sour cream.",
        },
        {
          id: "poxons-black-pudding",
          name: "Poxons Black Pudding",
          price: "£9.00",
          description:
            "Warm salad of Poxons black pudding, smoked bacon and soft poached egg, honey and grain mustard dressing.",
        },
        {
          id: "baked-brie",
          name: "Baked Brie",
          price: "£9.00",
          dietary: ["v"],
          description:
            "Panko and thyme crusted brie, redcurrant and port jelly with pear and peashoot salad.",
        },
      ],
    },
    {
      id: "sharers",
      title: "Sharers",
      description: "Built for the middle of the table.",
      items: [
        {
          id: "nachos",
          name: "Nachos",
          price: "£9.00",
          description:
            "Crispy nachos topped with gooey cheese with sour cream, guacamole and salsa.",
          options: [
            { label: "Add refried beans (v)", price: "£12" },
            { label: "Add pulled pork", price: "£14" },
            { label: "Add brisket", price: "£14" },
            { label: "Add chilli", price: "£14" },
          ],
        },
        {
          id: "cheesy-goodness",
          name: "Cheesy Goodness",
          price: "£13.00",
          dietary: ["v"],
          description:
            "Baked box camembert with rosemary, red currant jelly and warm ciabatta.",
        },
        {
          id: "slab-of-ribs",
          name: "Slab of Ribs",
          price: "£26.00",
          description:
            "1kg rack of Applewood smoked pork ribs. Served with corn on the cob and slaw, potato salad and fries.",
        },
      ],
    },
    {
      id: "our-steaks",
      title: "Our Steaks",
      description:
        "All of our steaks are served with garlic butter, button mushrooms, grilled tomato, chunky chips and rocket.",
      note: "Homemade sauces available to add for £1.50 each: Port & Stilton · Mushroom and Thyme · Tripple Peppercorn · Beef Dripping · JD Glaze · Chimichurri & Nduja · Bearnaise · Firecracker Dr Lemms",
      items: [
        {
          id: "sirloin",
          name: "8oz Sirloin",
          price: "£29.50",
          description:
            "The sirloin has the perfect marbling to deliver a super tender texture and flavour.",
          recommendation: "Give medium rare a try",
        },
        {
          id: "fillet",
          name: "8oz Fillet",
          price: "£38.00",
          description: "Melt in your mouth, our most tender steak.",
          recommendation: "Recommended rare",
        },
        {
          id: "rib-eye",
          name: "10oz Rib Eye",
          price: "£29.00",
          description:
            "Rich and tender and bursting with flavour. Our mouth watering Ribeye.",
          recommendation: "Recommended medium",
        },
        {
          id: "rump",
          name: "12oz Rump",
          price: "£27.00",
          description: "Lean, firm and full of flavour.",
          recommendation: "Recommended medium",
        },
        {
          id: "t-bone",
          name: "16oz T-Bone",
          price: "£42.00",
          description:
            "One part Fillet, one part Sirloin, a match made in heaven and a favourite here at Lockside.",
          recommendation: "Recommended medium rare",
        },
        {
          id: "tomahawk",
          name: "32oz Tomahawk",
          price: "£59.95",
          description:
            "Feeling hungry? Mat challenges you to take on the Tomahawk. You'll need your pillow for after. Enjoy as you wish.",
        },
        {
          id: "chateaubriand",
          name: "16oz Chateaubriand",
          price: "£75.00",
          description: "The ultimate sharing experience for two.",
          recommendation: "Recommended medium",
        },
        {
          id: "mega-mix-grill",
          name: "Mega Mix Grill",
          price: "£39.00",
          description:
            "Lockside mixed grill. Rump steak, D-cut gammon, chicken tenders, thick pork sausage, pork loin steak, black pudding. Served with grilled mushroom and fried egg and chunky chips.",
        },
        {
          id: "gammon",
          name: "14oz Gammon",
          price: "£18.95",
          description: "D cut gammon, eggs and fresh pineapple.",
        },
      ],
    },
    {
      id: "a-little-different",
      title: "A Little Different",
      items: [
        {
          id: "fish-and-chips",
          name: "Traditional Fish & Chips",
          price: "£18.00",
          description:
            "Traditional fish and chips, served with homemade chunky tartar sauce, mushy peas and chunky chips.",
        },
        {
          id: "chic-chicken",
          name: "Chic Chicken",
          price: "£19.95",
          description:
            "Corn fed chicken filled with oyster mushrooms and tarragon, dauphinoise potatoes, with buttered savoy and chestnuts.",
        },
        {
          id: "wild-penne",
          name: "Wild Penne",
          price: "£19.00",
          dietary: ["v"],
          description:
            "Wild mushrooms, peas, asparagus with basil, parmesan and cream.",
        },
        {
          id: "fish-pie",
          name: "Fish Pie",
          price: "£22.00",
          description:
            "Smoked haddock, cod and king prawn fish pie with cheddar & parsley sauce, fresh market vegetables.",
        },
        {
          id: "jd-pork-belly",
          name: "Jack Daniels Pork Belly",
          price: "£20.00",
          description:
            "Slow cooked glazed pork belly with Jack Daniels sauce, dauphinoise potatoes and sticky red cabbage.",
        },
        {
          id: "short-ribs",
          name: "Short Short Ribs",
          price: "£22.50",
          description:
            "Thick 10 hour slow braised sticky Guinness and Jerk beef short ribs, gunpowder fries and greens.",
        },
        {
          id: "faggots-or-sausages",
          name: "Faggots or Sausages",
          price: "£14.00",
          description:
            "The choice is yours. Two thick faggots, mushy peas and chunky chips or three thick pork sausages, fried onion gravy and mash.",
        },
        {
          id: "lamb-henry",
          name: "Lamb Henry",
          price: "£22.00",
          description:
            "Slow roast lamb Henry, honey roast roots, parsley mash, rosemary, red wine and garlic.",
        },
        {
          id: "macaroni-madness",
          name: "Macaroni Madness",
          price: "£13.00",
          dietary: ["v"],
          description:
            "Four cheese macaroni with basil crumb and mixed salad. Go smoky or blue.",
          options: [{ label: "With king prawns or brisket", price: "£16.00" }],
        },
      ],
    },
    {
      id: "burger-bar",
      title: "Burger Bar",
      description:
        "All of our burgers are served with skin on fries, house slaw and mixed salad.",
      items: [
        {
          id: "bull-and-boar",
          name: "Bull & Boar Burger",
          price: "£18.00",
          description:
            "Two beef patties, loaded with bacon and Monterey Jack cheese with lettuce and tomato on a soft brioche bun.",
        },
        {
          id: "baby-boar",
          name: "Baby Boar Burger",
          price: "£14.00",
          description: "All of the above just a little smaller with one beef patty.",
        },
        {
          id: "taking-the-brisket",
          name: "Taking the Brisket",
          price: "£18.00",
          description:
            "Smoked shredded brisket burger, Applewood smoked cheddar and beef dripping sauce.",
        },
        {
          id: "buttermilk-chicken",
          name: "Buttermilk Chicken",
          price: "£17.00",
          description:
            "Chargrilled buttermilk chicken burger, bacon and mayonnaise.",
        },
        {
          id: "dr-cheese",
          name: "Dr Cheese",
          price: "£18.00",
          description:
            "Two beef patties, mozzarella, Monterey Jack, Applewood smoked cheddar with spiced cheese sauce.",
        },
        {
          id: "the-porkie",
          name: "The Porkie",
          price: "£18.00",
          description:
            "Pork and apple burger, topped with pulled pork, smoked bacon and Monterey Jack cheese.",
        },
        {
          id: "very-veggie",
          name: "Very Veggie",
          price: "£14.00",
          dietary: ["v"],
          description:
            "Homemade bean, chickpea and coriander burger in panko crumb, served with tomato salsa and guacamole.",
        },
      ],
    },
    {
      id: "hangers",
      title: "Hang On There's More..",
      description:
        "All our hangers are served with skin on fries, slaw and flat breads.",
      items: [
        {
          id: "button-mushroom-hanger",
          name: "Button Mushroom",
          price: "£16.00",
          dietary: ["v"],
          description:
            "Button, Portobello and king oyster mushrooms. Served with garlic mayo dip.",
        },
        {
          id: "paprika-chicken-hanger",
          name: "Paprika Chicken and Chorizo",
          price: "£19.00",
          description:
            "Garlic and smoked paprika chicken with chorizo. Served with garlic mayo dip.",
        },
        {
          id: "thai-king-prawn-hanger",
          name: "Thai Spiced King Prawn",
          price: "£20.00",
          description: "With soy and lime. Served with a sweet chilli dip.",
        },
      ],
    },
    {
      id: "sides",
      title: "Sides",
      items: [
        { id: "skin-on-fries", name: "Skin On Fries", price: "£4.00", dietary: ["v"] },
        {
          id: "filthy-fries",
          name: "Cheese and Bacon Filthy Fries",
          price: "£6.00",
        },
        {
          id: "onion-rings",
          name: "Giant Beer Battered Onion Rings",
          dietary: ["v"],
          options: [
            { label: "Plain", price: "£4.00" },
            { label: "Herb or Chilli", price: "£4.50" },
          ],
        },
        { id: "garlic-bread", name: "Garlic Bread", price: "£4.50", dietary: ["v"] },
        {
          id: "garlic-bread-cheese",
          name: "Garlic Bread with Cheese",
          price: "£5.50",
          dietary: ["v"],
        },
        { id: "side-salad", name: "Side Salad", price: "£4.00", dietary: ["v"] },
        { id: "slaw", name: "Slaw", price: "£3.50", dietary: ["v"] },
        {
          id: "spiced-red-cabbage",
          name: "Spiced Red Cabbage",
          price: "£3.50",
          dietary: ["v"],
        },
        {
          id: "seasonal-vegetables",
          name: "Seasonal Vegetables",
          price: "£4.00",
          dietary: ["ve"],
        },
        {
          id: "dauphinoise",
          name: "Dauphinoise Potatoes",
          price: "£5.00",
          dietary: ["v"],
        },
        { id: "mash", name: "Mash", price: "£3.00", dietary: ["v"] },
        {
          id: "cheddar-bacon-mash",
          name: "Cheddar and Bacon Mash",
          price: "£4.00",
        },
      ],
    },
    {
      id: "desserts",
      title: "The Big Finale",
      items: [
        {
          id: "bombs-away",
          name: "Bombs Away!",
          price: "£10.00",
          dietary: ["v"],
          description:
            "The show stopper. Watch your milk chocolate bomb filled with salted caramel ice cream dissolve with your caramel sauce onto a loaded brownie. Mouth watering chocolatiness.",
        },
        {
          id: "cheesecake",
          name: "Cheese Cake of the Day",
          price: "£8.00",
          dietary: ["v"],
          description:
            "Please ask your server which cheesecake is available today. Served with ice cream.",
        },
        {
          id: "chocolate-fudge-cake",
          name: "Chocolate Fudge Cake",
          price: "£8.00",
          dietary: ["v"],
          description:
            "Rich warm chocolate cake served warm with honey comb ice cream.",
        },
        {
          id: "apple-crumble",
          name: "Apple & Cinnamon Crumble",
          price: "£8.00",
          dietary: ["v"],
          description:
            "Warm apple & cinnamon crumble tart with vanilla ice cream.",
        },
        {
          id: "bread-and-butter-pudding",
          name: "Traditional Bread and Butter Pudding",
          price: "£8.00",
          dietary: ["v"],
          description: "Served with warm vanilla custard.",
        },
        {
          id: "panna-cotta",
          name: "Panna Cotta",
          price: "£8.00",
          dietary: ["v"],
          description:
            "Vanilla panna cotta with warm spiced poached pear in red wine syrup.",
        },
        {
          id: "cheese-board",
          name: "Cheese Board",
          price: "£10.00",
          dietary: ["v"],
          description:
            "A selection of three cheeses, chutney, grapes, celery, apple and biscuits.",
        },
        {
          id: "ice-cream-sundae",
          name: "Ice Cream Sundae",
          price: "£8.00",
          dietary: ["v"],
          description:
            "A guilty pleasure. A selection of ice creams, topped with brownie, marshmallows, meringue, chocolate drops, whipped cream and drizzled in sauce.",
        },
        {
          id: "bennetts-ice-cream",
          name: "Bennetts Farmhouse Ice Cream & Sorbets",
          dietary: ["v"],
          options: [
            { label: "2 scoops", price: "£3.75" },
            { label: "3 scoops", price: "£5.00" },
          ],
        },
        {
          id: "pick-and-mix",
          name: "Pick & Mix",
          price: "£4.00",
          dietary: ["v"],
          description: "A selection of juicy jelly sweets.",
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* LUNCH MENU — source: Lunch-menu-June-2026-final.pdf (June 2026)     */
/* ------------------------------------------------------------------ */

const lunchMenu: RestaurantMenu = {
  id: "lunch",
  name: "Lunch Menu",
  blurb: "Weekday lunches, sandwiches and the two-for-£20 offer.",
  availability: "Monday–Friday · 12pm–3pm",
  effectiveDate: "June 2026",
  pdfUrl: "/menus/lockside-lunch-menu.pdf",
  pdfLabel: "Download the printed lunch menu (PDF)",
  sections: [
    {
      id: "two-for-20",
      title: "Two for £20",
      description: "Choose any two dishes from this section for £20.",
      items: [
        {
          id: "bangers-and-mash",
          name: "Bangers and Mash",
          description:
            "Thick sausages, creamy mash, crispy onions, peas and our beef dripping sauce.",
        },
        {
          id: "lunch-gammon",
          name: "Gammon",
          description:
            "175g D-cut gammon, peas and chunky chips with egg or pineapple.",
        },
        {
          id: "full-english",
          name: "Full English Breakfast",
          description:
            "Sausage, bacon, fried egg, hash brown, mushroom, tomato, beans, black pudding and fried bread.",
        },
        {
          id: "lunch-faggots",
          name: "Faggots",
          description:
            "Black country faggots, mushy peas, chunky chips and gravy.",
        },
        {
          id: "mac-and-cheese",
          name: "Mac and Cheese",
          dietary: ["v"],
          description: "Served with basil crumb, garlic bread and green salad.",
        },
        {
          id: "ham-eggs-chips",
          name: "Ham, Eggs and Chips",
          description:
            "Home baked maple glazed ham, eggs, chunky chips and peas.",
        },
        {
          id: "lunch-fish-and-chips",
          name: "Fish and Chips",
          dietary: ["gf"],
          description:
            "Fish and chunky chips, mushy peas and home made tartar sauce.",
        },
        {
          id: "ramen-bowl",
          name: "Ramen Bowl",
          description:
            "Noodles in broth with vegetables and soft boiled egg. Choose from prawn, chicken or pork belly.",
        },
        {
          id: "fish-cakes",
          name: "Fish Cakes",
          description:
            "Smoked haddock and spring onion fish cakes, Jersey potatoes, spring vegetables and parsley sauce.",
        },
        {
          id: "chicken-forestiere",
          name: "Chicken Forestiere",
          description:
            "Breast of chicken in a creamy sauce of mushrooms, shallots, garlic and thyme mash and greens.",
        },
      ],
    },
    {
      id: "small-plates",
      title: "Small Plates",
      description: "£8 each or three for £20.",
      items: [
        { id: "panko-prawns", name: "Panko prawns with garlic mayonnaise." },
        {
          id: "peri-wings",
          name: "Peri peri chicken wings, smoked paprika and chorizo.",
        },
        {
          id: "olives-feta",
          name: "Olives, sundried tomatoes, roast red pepper and feta.",
          dietary: ["v"],
        },
        {
          id: "scotch-egg",
          name: "Homemade scotch egg served warm with HP brown sauce.",
        },
        {
          id: "gnocchi",
          name: "Baked mushroom Gnocchi with parmesan and basil.",
          dietary: ["v"],
        },
        {
          id: "brushetta",
          name: "Brushetta, heritage tomatoes, fresh mozzarella.",
          dietary: ["v"],
        },
        { id: "pate", name: "Pâté on sourdough toast and ale chutney." },
        {
          id: "meatballs",
          name: "Little pork meatballs, smoked bacon and penne tomato ragout.",
        },
        {
          id: "squid",
          name: "Deep fried crispy squid with sweet chilli dip.",
        },
        {
          id: "fritters",
          name: "Cauliflower and courgette fritters with chipotle mayo.",
          dietary: ["v"],
        },
      ],
    },
    {
      id: "sandwiches",
      title: "Sandwiches",
      description: "Available on white or brown bread.",
      items: [
        {
          id: "turkey-cranberry",
          name: "Turkey, Bacon and Cranberry",
          price: "£7.00",
        },
        {
          id: "rare-roast-sirloin",
          name: "Rare Roast Sirloin of Beef",
          price: "£7.00",
        },
        {
          id: "maple-ham-mustard",
          name: "Home Baked Maple Ham and Mustard",
          price: "£7.00",
        },
        {
          id: "salmon-cucumber",
          name: "Smoked Salmon and Cucumber",
          price: "£8.00",
        },
        {
          id: "cheddar-red-onion",
          name: "Smoked Cheddar and Red Onion",
          price: "£6.00",
          dietary: ["v"],
        },
        { id: "prawn-mayo", name: "Prawn and Mayonnaise", price: "£8.00" },
        {
          id: "ny-deli",
          name: "New York Deli, Warm Pastrami, Swiss Cheese & Pickled Mustard Mayo",
          price: "£9.00",
        },
      ],
    },
    {
      id: "ciabattas",
      title: "Ciabattas",
      items: [
        {
          id: "fish-finger-ciabatta",
          name: "Fish Finger Sandwich, Panko Crumb and Tartar Sauce",
          price: "£9.00",
        },
        {
          id: "steak-ciabatta",
          name: "Steak Sandwich, Button Mushrooms and Onions with Beef Dripping Gravy",
          price: "£9.50",
        },
        {
          id: "philly-ciabatta",
          name: "Philly Steak, Mushrooms & Onions with Melted American & Cheddar Cheese",
          price: "£10.00",
        },
      ],
    },
    {
      id: "lunch-salads",
      title: "Salads",
      items: [
        {
          id: "greek-salad",
          name: "Greek Salad",
          price: "£12.00",
          dietary: ["v"],
          description: "With feta, olives, lettuce, onion, tomato and oregano.",
        },
        {
          id: "chicken-chorizo-salad",
          name: "Chicken and Chorizo",
          price: "£14.00",
          description: "Garlic & smoked paprika chicken with chorizo.",
        },
        {
          id: "crispy-squid-salad",
          name: "Crispy Squid",
          price: "£14.00",
          description: "With breaded Thai style prawns and sesame.",
        },
        {
          id: "chicken-caesar",
          name: "Chicken Caesar",
          price: "£14.00",
          description: "With garlic croutons and parmesan.",
        },
      ],
    },
    {
      id: "from-the-grill",
      title: "From the Grill",
      items: [
        {
          id: "lunch-rump",
          name: "Lockside Lunch Rump",
          price: "£14.95",
          description:
            "175g rump steak, served with mushroom, tomato and chunky chips.",
          options: [
            { label: "Add garlic prawns", price: "£6" },
            { label: "Add panko prawns", price: "£6" },
          ],
        },
        {
          id: "steak-and-eggs",
          name: "Steak and Eggs",
          price: "£17.95",
          description: "175g rump steak served with egg and chunky chips.",
        },
        {
          id: "lockside-cheese-burger",
          name: "Lockside Cheese Burger",
          price: "£12.00",
          description:
            "Beef patty smothered in cheese served with skin on fries.",
        },
        {
          id: "chicken-parm-burger",
          name: "Chicken Parm Burger",
          price: "£14.00",
          description:
            "Deep fried chicken breaded fillet, parmesan, mozzarella on a basil toasted garlic bun.",
        },
        {
          id: "pork-loin-steaks",
          name: "Pork Loin Steaks",
          price: "£13.00",
          description:
            "With grain mustard cream sauce, fried eggs, greens and skin on fries.",
        },
        {
          id: "tandoori-chicken",
          name: "Tandoori Spiced Chicken",
          price: "£14.00",
          description:
            "Chicken fillet and wings with roast curried cauliflower and skin on fries.",
        },
      ],
    },
    {
      id: "ploughmans",
      title: "Ploughmans",
      note: "Vegetarian option available.",
      items: [
        {
          id: "ploughmans-plate",
          name: "Ploughmans",
          description:
            "Home baked glazed ham, cheddar, pickles, apple, celery and crusty bread.",
          options: [
            { label: "Small", price: "£12" },
            { label: "Large", price: "£16" },
          ],
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* SUNDAY LUNCH — source: Sundaymenu.pdf (undated)                     */
/* ------------------------------------------------------------------ */

const sundayMenu: RestaurantMenu = {
  id: "sunday",
  name: "Sunday Lunch",
  blurb: "Roasts with all the trimmings, including a trio of meats.",
  availability: "Sundays · 12pm–8pm",
  pdfUrl: "/menus/lockside-sunday-lunch-menu.pdf",
  pdfLabel: "Download the printed Sunday menu (PDF)",
  sections: [
    {
      id: "sunday-meats",
      title: "Meats",
      description:
        "Served with golden roast potatoes, stuffing ball, honey glazed parsnip, pig in blanket, seasonal vegetables, cauliflower cheese and gravy.",
      note: "Vegetarian option available.",
      items: [
        { id: "sirloin-roast", name: "28 Day Aged Sirloin of Beef", price: "£19" },
        {
          id: "gammon-roast",
          name: "Muscovado and Honey Glazed Gammon",
          price: "£17",
        },
        {
          id: "turkey-roast",
          name: "Roast Breast of Shropshire Turkey",
          price: "£18",
        },
        { id: "trio", name: "Trio of Meats", price: "£20" },
        { id: "large-trio", name: "Large Trio of Meats", price: "£24" },
        { id: "pork-belly-roast", name: "Crispy Pork Belly", price: "£20" },
        {
          id: "lamb-shoulder-roast",
          name: "Slow Roast Lamb Shoulder",
          price: "£22",
        },
        { id: "childrens-roast", name: "Children's Roast", price: "£9.50" },
      ],
    },
    {
      id: "sunday-extras",
      title: "Extra Portions",
      items: [
        { id: "extra-pigs", name: "Pigs in Blankets", price: "£4.50" },
        {
          id: "extra-cauliflower",
          name: "Cauliflower Cheese",
          price: "£4.50",
          dietary: ["v"],
        },
        { id: "extra-mash", name: "Mash", price: "£2.50", dietary: ["v"] },
        {
          id: "extra-yorkshires",
          name: "Yorkshire Puddings",
          price: "£1.50",
          dietary: ["v"],
        },
        {
          id: "extra-roasties",
          name: "Roast Potatoes",
          price: "£2.50",
          dietary: ["v"],
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* BREAKFAST — source: printed Lockside breakfast menu                 */
/* ------------------------------------------------------------------ */

const breakfastMenu: RestaurantMenu = {
  id: "breakfast",
  name: "Breakfast",
  blurb: "Full breakfasts, baps and waffles. No booking necessary.",
  availability: "Monday–Friday 8am–11.30am · Saturday 9am–11.30am",
  pdfUrl: "/menus/lockside-breakfast-menu.png",
  pdfLabel: "View the printed breakfast menu",
  sections: [
    {
      id: "breakfast-plates",
      title: "Breakfast",
      note: "Takeaway available. No booking necessary.",
      items: [
        {
          id: "farmhouse-breakfast",
          name: "Farmhouse Breakfast",
          price: "£12",
          description:
            "Sausage, bacon, fried egg, mushrooms, hash brown, tomato, beans, black pudding and fried bread.",
          options: [{ label: "Go extra large", price: "£18" }],
        },
        {
          id: "vegetarian-breakfast",
          name: "Vegetarian Breakfast",
          price: "£11",
          dietary: ["v"],
          description:
            "Veggie sausages, mushrooms, hash browns, tomato, beans, eggs and fried bread.",
        },
        {
          id: "salmon-and-eggs",
          name: "Salmon and Eggs",
          price: "£9.50",
          description:
            "Warm Wye Valley salmon and scrambled egg on granary toast with salted butter.",
        },
        {
          id: "eggs-benedict",
          name: "Brioche Eggs Benedict",
          price: "£11",
          description:
            "Eggs, home baked ham and hollandaise on toasted brioche.",
        },
        {
          id: "poached-scrambled-eggs",
          name: "Poached or Scrambled Eggs",
          price: "£7.50",
          description: "Served on white or brown toast.",
        },
        {
          id: "kippers",
          name: "Kippers",
          price: "£10",
          description:
            "Smoked whole kippers with lemon, parsley butter with a choice of bread or poached eggs.",
        },
        {
          id: "muesli",
          name: "Homemade Muesli",
          price: "£4.50",
          dietary: ["v"],
          description: "Giant oats, nuts and dried fruits.",
        },
        {
          id: "porridge",
          name: "Porridge Oats",
          price: "£4.50",
          dietary: ["v"],
          description:
            "Oats cooked with semi skimmed milk and clear honey, fresh berries and cream.",
        },
        {
          id: "belgian-waffles",
          name: "Belgian Waffles",
          price: "£8.50",
          dietary: ["v"],
          description: "Frosted waffles served with berries, syrup and cream.",
        },
        {
          id: "american-pancakes",
          name: "American Pancakes",
          price: "£8.50",
          description: "A stack of pancakes with syrup and maple soaked bacon.",
        },
        {
          id: "chefs-lockside-eggs",
          name: "Chefs Lockside Eggs",
          price: "£9",
          description:
            "Fried eggs, cherry vine tomatoes, chorizo and smoked paprika oil with warm bread.",
        },
        {
          id: "lockside-breakfast-bap",
          name: "Lockside Breakfast Bap",
          price: "£11",
          description: "Fully loaded breakfast on a bap.",
        },
      ],
    },
    {
      id: "breakfast-baps",
      title: "Baps",
      note: "Extras available from 80p — please ask your server.",
      items: [
        { id: "bacon-bap", name: "Bacon", price: "£4.50" },
        { id: "sausage-bap", name: "Sausage", price: "£4.50" },
        {
          id: "veggie-sausage-bap",
          name: "Veggie Sausage",
          price: "£4.50",
          dietary: ["v"],
        },
        { id: "bacon-sausage-bap", name: "Bacon and Sausage", price: "£5.50" },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* NIBBLES — source: Nibbles menu PDF (undated)                        */
/* ------------------------------------------------------------------ */

const nibblesMenu: RestaurantMenu = {
  id: "nibbles",
  name: "Nibbles",
  blurb: "Small things to pick at while you decide.",
  pdfUrl: "/menus/lockside-nibbles-menu.pdf",
  pdfLabel: "Download the printed nibbles menu (PDF)",
  sections: [
    {
      id: "nibbles-list",
      title: "Nibbles",
      items: [
        {
          id: "warm-ciabatta",
          name: "Warm Ciabatta, Oil and Balsamic",
          price: "£5",
          dietary: ["v"],
        },
        {
          id: "mixed-olives",
          name: "Mixed Olives, Peppers and Sundried Tomatoes",
          price: "£5",
          dietary: ["v"],
        },
        {
          id: "roquito-chillies",
          name: "Sweety Drop Pearl Roquito Chillies",
          price: "£4",
          dietary: ["v"],
        },
        {
          id: "pork-belly-bites",
          name: "Sticky Maple & Hickory Pork Belly Bites",
          price: "£5",
        },
        {
          id: "baby-frickles",
          name: "Baby Frickles, Salsa & Sour Cream",
          price: "£4",
          dietary: ["v"],
        },
        {
          id: "pork-scratchings",
          name: "Warm Pork Scratchings, Apple Sauce & Sriracha",
          price: "£4",
        },
        {
          id: "grown-up-dunkers",
          name: "Grown Up Dunkers, Warm Nacho & Cheddar Sauce",
          price: "£5",
          dietary: ["v"],
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* CHILDREN'S — source: Kids menu PDF                                  */
/* ------------------------------------------------------------------ */

const childrensMenu: RestaurantMenu = {
  id: "childrens",
  name: "Children's",
  blurb: "Nine little mains, all with peas or beans.",
  pdfUrl: "/menus/lockside-childrens-menu.pdf",
  pdfLabel: "Download the printed children's menu (PDF)",
  sections: [
    {
      id: "childrens-meals",
      title: "Meals",
      description: "£6.95 each.",
      note: "All children's meals come with a choice of peas or beans.",
      items: [
        { id: "kids-sausage-mash", name: "Sausage and Mash" },
        { id: "kids-nuggets", name: "Chicken Nuggets and Chips" },
        { id: "kids-fish-chips", name: "Fish and Chips" },
        { id: "kids-burger", name: "Beef Burger and Chips" },
        { id: "kids-cheeseburger", name: "Cheeseburger and Chips" },
        { id: "kids-mac-cheese", name: "Mac and Cheese", dietary: ["v"] },
        { id: "kids-ham-egg-chips", name: "Ham, Egg and Chips" },
        { id: "kids-penne", name: "Tomato Penne Pasta", dietary: ["v"] },
        { id: "kids-chicken-salad", name: "Chicken Salad" },
      ],
    },
    {
      id: "childrens-dessert",
      title: "Dessert",
      description: "Add dessert for £1.00.",
      items: [
        {
          id: "kids-ice-cream",
          name: "Two Scoops of Ice Cream",
          dietary: ["v"],
          description: "Chocolate, strawberry or vanilla.",
        },
      ],
    },
  ],
};

export const menus: RestaurantMenu[] = [
  mainMenu,
  lunchMenu,
  sundayMenu,
  breakfastMenu,
  nibblesMenu,
  childrensMenu,
];

export const dietaryLegend: { code: DietaryCode; label: string }[] = [
  { code: "v", label: "Vegetarian" },
  { code: "ve", label: "Vegan" },
  { code: "gf", label: "Gluten free" },
];

export const steakDoneness: { level: string; detail: string }[] = [
  { level: "Blue", detail: "Red throughout" },
  { level: "Rare", detail: "Mostly red with a little pink" },
  { level: "Medium rare", detail: "Mostly pink with a little red" },
  { level: "Medium", detail: "Pink throughout" },
  { level: "Medium well", detail: "A little pink" },
  { level: "Well done", detail: "No pink" },
];

export const menuDisclaimer =
  "Menus are reproduced from our printed menus and are updated regularly. Dishes, prices and availability may change, and some items are subject to seasonal supply. Please tell us about any allergies or dietary requirements when you order and we will talk you through the options.";

export const getMenu = (id: string): RestaurantMenu | undefined =>
  menus.find((menu) => menu.id === id);
