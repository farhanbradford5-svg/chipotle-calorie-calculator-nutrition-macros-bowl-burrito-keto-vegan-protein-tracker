import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";

export default function ContactPage() {
  return (
    <Layout>
      <SeoHead
        title="Contact ChipotleCalc"
        description="Contact ChipotleCalc for data corrections, feedback, or questions about the calculator."
        canonicalPath="/contact"
      />
      <div className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Contact</h1>
        <p className="mb-6 text-gray-600">
          For data corrections, feedback, or any questions about the calculator:
        </p>
        <p className="mb-4">
          <a href="mailto:contact@chipotlecalc.com" className="text-orange-600 hover:underline font-medium">
            contact@chipotlecalc.com
          </a>
        </p>
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 text-sm text-gray-600 space-y-3">
          <p><strong>For data correction requests:</strong> Include the ingredient name, the value you see, what you believe it should be, and the source you're referencing. We verify against Chipotle's official published data and respond within a few business days.</p>
          <p><strong>For general feedback:</strong> We read everything and use it to prioritize improvements.</p>
          <p><strong>Response time:</strong> Typically 2–4 business days.</p>
        </div>
      </div>
    </Layout>
  );
}
