import { Helmet } from "react-helmet-async";

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
    ? `https://chipotlecalc.com${canonicalPath}`
    : undefined;

  const schemaArray = schema
    ? Array.isArray(schema)
      ? schema
      : [schema]
    : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta
        property="og:image"
        content={ogImage || "https://chipotlecalc.com/opengraph.jpg"}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {schemaArray.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
