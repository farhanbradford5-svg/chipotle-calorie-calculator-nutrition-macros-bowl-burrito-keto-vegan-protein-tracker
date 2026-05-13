import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import FaqSection from "@/components/sections/FaqSection";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "name": "Chipotle Nutrition FAQ",
  "url": "https://chipotlecalc.com/faq",
};

export default function FaqPage() {
  return (
    <Layout>
      <SeoHead
        title="Chipotle Nutrition FAQ — Common Questions Answered | ChipotleCalc"
        description="Answers to the most common questions about Chipotle calories, protein, keto ordering, sodium, and nutrition. Updated May 2026."
        canonicalPath="/faq"
        schema={faqSchema}
      />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Chipotle Nutrition FAQ</h1>
        <p className="mb-8 text-gray-500">
          Common questions about Chipotle calories, protein, ordering strategies, and nutrition data.
        </p>
        <FaqSection />
      </div>
    </Layout>
  );
}
