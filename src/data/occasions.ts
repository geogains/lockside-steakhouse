import type { LucideIcon } from "lucide-react";
import { Heart, Cake, Users, PartyPopper } from "lucide-react";

export type Occasion = {
  id: string;
  icon: LucideIcon;
  title: string;
  body: string;
};

export const occasions: Occasion[] = [
  {
    id: "date-night",
    icon: Heart,
    title: "Date night",
    body: "A quiet corner, a Chateaubriand to share and no rush to leave. Evening service runs to 10pm.",
  },
  {
    id: "birthdays",
    icon: Cake,
    title: "Birthdays",
    body: "Tell us it's a birthday when you book and we'll look after the table. The Bombs Away dessert does the rest.",
  },
  {
    id: "family",
    icon: Users,
    title: "Family meals",
    body: "A children's menu, roasts every Sunday and portions nobody complains about. Highchairs available — just ask.",
  },
  {
    id: "groups",
    icon: PartyPopper,
    title: "Group celebrations",
    body: "Bigger tables are welcome. For twelve or more we take a pre-order so everything lands together.",
  },
];
