import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Router-aware scroll behaviour.
 *
 * React Router does not restore scroll or resolve hash targets on navigation,
 * which is what breaks anchor links like "/#gallery" when they are followed
 * from another route. This handles both cases.
 */
export const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      /* Wait a frame so the target route has actually rendered. */
      const id = hash.replace("#", "");
      const frame = requestAnimationFrame(() => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0 });
        }
      });
      return () => cancelAnimationFrame(frame);
    }

    window.scrollTo({ top: 0, left: 0 });
    return undefined;
  }, [pathname, hash]);

  return null;
};
