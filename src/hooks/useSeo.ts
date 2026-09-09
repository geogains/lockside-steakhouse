import { useEffect } from "react";
import { restaurant } from "@/data/restaurant";

type SeoOptions = {
  title: string;
  description: string;
  /** Path only, e.g. "/menus". Combined with the canonical site origin. */
  path: string;
  /** Absolute or root-relative image path for social previews. */
  image?: string;
  /** Optional JSON-LD to inject for this page. */
  structuredData?: Record<string, unknown>;
  noIndex?: boolean;
};

const setMeta = (selector: string, attr: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const [key, value] = selector.replace(/[[\]"]/g, "").split("=");
    if (key && value) el.setAttribute(key.replace("meta", ""), value);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, content);
};

const setLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

/**
 * Sets per-page metadata. A small hook is used rather than a helmet library so
 * the bundle stays lean; there is only one document to manage.
 */
export const useSeo = ({
  title,
  description,
  path,
  image = "/lockside-preview2.png?v=3",
  structuredData,
  noIndex = false,
}: SeoOptions) => {
  useEffect(() => {
    const url = `${restaurant.siteUrl}${path}`;
    const absoluteImage = image.startsWith("http")
      ? image
      : `${restaurant.siteUrl}${image}`;

    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[name="robots"]', "content", noIndex ? "noindex,follow" : "index,follow");
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:image"]', "content", absoluteImage);
    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[property="og:site_name"]', "content", restaurant.name);
    setMeta('meta[property="og:locale"]', "content", "en_GB");
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", absoluteImage);
    setLink("canonical", url);
  }, [title, description, path, image, noIndex]);

  useEffect(() => {
    if (!structuredData) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.page = "true";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [structuredData]);
};
