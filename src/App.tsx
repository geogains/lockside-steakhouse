import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RootLayout } from "@/components/layout/RootLayout";
import HomePage from "@/pages/HomePage";

/* Route-level code splitting: the homepage ships in the initial bundle,
   everything else loads on demand. */
const MenusPage = lazy(() => import("@/pages/MenusPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));
const AccessibilityPage = lazy(() => import("@/pages/AccessibilityPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

/** Minimal, non-jarring loading state for lazily loaded routes. */
const RouteFallback = () => (
  <div className="min-h-[60svh] bg-ink" role="status" aria-live="polite">
    <span className="sr-only">Loading</span>
  </div>
);

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="menus"
          element={
            <Suspense fallback={<RouteFallback />}>
              <MenusPage />
            </Suspense>
          }
        />
        <Route
          path="about"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AboutPage />
            </Suspense>
          }
        />
        <Route
          path="privacy"
          element={
            <Suspense fallback={<RouteFallback />}>
              <PrivacyPage />
            </Suspense>
          }
        />
        <Route
          path="accessibility"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AccessibilityPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<RouteFallback />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
