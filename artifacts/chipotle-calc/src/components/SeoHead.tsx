import { useEffect } from "react";

interface SeoHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  schema?: object | object[];
  ogImage?: string;
  noIndex?: boolean;
}

export default function SeoHead({
  title,
  description,
  canonicalPath,
  schema,
  ogImage,
  noIndex,
}: SeoHeadProps) {
  const canonical = canonicalPath
    ? `https://chipotlemacros.com${canonicalPath}`
    : undefined;

  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let el = document.querySelector(
        `meta[${attr}="${name}"]`
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(
        `link[rel="${rel}"]`
      ) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    };

    setMeta("description", description);
    if (noIndex) setMeta("robots", "noindex, nofollow");
    if (canonical) setLink("canonical", canonical);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
    if (canonical) setMeta("og:url", canonical, true);
    setMeta(
      "og:image",
      ogImage || "https://chipotlemacros.com/opengraph.jpg",
      true
    );
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

    const schemaArray = schema
      ? Array.isArray(schema)
        ? schema
        : [schema]
      : [];

    schemaArray.forEach((s, i) => {
      const id = `schema-ld-${i}`;
      let el = document.getElementById(id) as HTMLScriptElement | null;
      if (!el) {
        el = document.createElement("script");
        el.id = id;
        el.type = "application/ld+json";
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(s);
    });
  }, [title, description, canonical, noIndex, schema, ogImage]);

  return null;
}
