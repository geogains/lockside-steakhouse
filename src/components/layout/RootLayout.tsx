import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollManager } from "./ScrollManager";
import { SkipLink } from "@/components/shared/SkipLink";

export const RootLayout = () => (
  <>
    <SkipLink />
    <ScrollManager />
    <Navbar />
    <main id="main">
      <Outlet />
    </main>
    <Footer />
  </>
);
