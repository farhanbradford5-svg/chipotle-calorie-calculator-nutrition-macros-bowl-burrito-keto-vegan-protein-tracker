import { useHead } from "vite-react-ssg";
interface SeoHeadProps { title: string; description: string; canonicalPath?: string; schema?: object | object[]; ogImage?: string; noIndex?: boolean; }
export default function SeoHead({ title, description, canonicalPath, schema, ogImage, noIndex }: SeoHeadProps) {
  const canonical = canonicalPath ? `https://chipotlecalc.com${canonicalPath}` : undefined;
  const schemaArray = schema ? (Array.isArray(schema) ? schema : [schema]) : [];
  useHead({
    title,
    meta: [
      { name: "description", content: description },
      ...(noIndex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      ...(canonical ? [{ property: "og:url", content: canonical }] : []),
      { property: "og:image", content: ogImage || "https://chipotlecalc.com/opengraph.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    link: [...(canonical ? [{ rel: "canonical", href: canonical }] : [])],
    script: schemaArray.map((s) => ({ type: "application/ld+json", children: JSON.stringify(s) })),
  });
  return null;
}
