import { Hero } from "@/components/home/Hero";
import { LocksideWay } from "@/components/home/LocksideWay";
import { SignatureFeature } from "@/components/home/SignatureFeature";
import { MenuShowcase } from "@/components/home/MenuShowcase";
import { Occasions } from "@/components/home/Occasions";
import { Gallery } from "@/components/home/Gallery";
import { Reviews } from "@/components/home/Reviews";
import { Visit } from "@/components/home/Visit";
import { BookingCTA } from "@/components/home/BookingCTA";
import { useSeo } from "@/hooks/useSeo";
import { restaurantSchema } from "@/lib/structuredData";

const HomePage = () => {
  useSeo({
    title: "The Lockside Steakhouse | Steaks in Wollaston, Stourbridge",
    description:
      "An independent steakhouse on Enville Street in Wollaston, Stourbridge. Local beef from a local butchery, generous plates, Sunday roasts and breakfast from 8am. Book a table online.",
    path: "/",
    structuredData: restaurantSchema(),
  });

  return (
    <>
      <Hero />
      <LocksideWay />
      <SignatureFeature />
      <MenuShowcase />
      <Occasions />
      <Gallery />
      <Reviews />
      <Visit />
      <BookingCTA />
    </>
  );
};

export default HomePage;
