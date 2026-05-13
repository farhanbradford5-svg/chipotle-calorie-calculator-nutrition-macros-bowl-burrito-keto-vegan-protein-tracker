import { Link } from "wouter";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";

export default function EditorialPolicyPage() {
  return (
    <Layout>
      <SeoHead
        title="Editorial Policy — ChipotleCalc"
        description="ChipotleCalc's editorial policy for nutrition data accuracy, update schedule, corrections, and independence from Chipotle Mexican Grill, Inc."
        canonicalPath="/editorial-policy"
      />
      <article className="mx-auto max-w-3xl px-4 py-10 prose prose-gray">
        <h1>Editorial Policy</h1>
        <p className="text-sm text-gray-500">Last reviewed: May 2026</p>

        <h2>Our Commitment to Accuracy</h2>
        <p>
          Every nutrition value in ChipotleCalc comes from Chipotle's officially published data.
          We do not estimate values, we do not use crowd-sourced databases, and we do not publish
          ranges or approximations when an exact figure is available from Chipotle's own sources.
          Our primary sources are Chipotle's interactive online nutrition calculator and Chipotle's
          downloadable nutrition PDF, both published at chipotle.com.
        </p>
        <p>
          All nutrition figures are cross-referenced between both sources before being added to the
          ingredient database. When the two sources disagree, we use the most recently dated figure
          and note the discrepancy in the{" "}
          <Link href="/changelog" className="text-orange-600">changelog</Link>.
          Our full data sourcing approach is described in the{" "}
          <Link href="/methodology" className="text-orange-600">methodology page</Link> and{" "}
          <Link href="/sources" className="text-orange-600">sources page</Link>.
        </p>

        <h2>Update Schedule</h2>
        <p>
          Chipotle periodically updates its menu — adding limited-time proteins, adjusting portion
          sizes, or revising ingredient formulations. We monitor Chipotle's official channels and
          commit to checking our data within <strong>48 hours</strong> of any public announcement
          of a menu change. Quarterly, we re-download Chipotle's nutrition PDF and compare it
          against our database to catch any silent updates that were not announced publicly.
        </p>
        <p>
          This site covers the <strong>US Chipotle menu only</strong>. Chipotle operates in Canada,
          the UK, France, Germany, and other markets where ingredient formulations, portion sizes,
          and available items may differ from the US menu. We do not publish nutrition data for
          non-US markets and make no claim of accuracy for international Chipotle orders.
        </p>

        <h2>Corrections</h2>
        <p>
          When we are informed of an error, we verify it against Chipotle's official sources and
          correct it promptly — typically within 24 hours of verification. All data corrections
          are logged in the{" "}
          <Link href="/changelog" className="text-orange-600">changelog</Link> with a description
          of what changed and why. We do not silently update values; every correction is documented.
        </p>
        <p>
          To report a nutrition data error, email{" "}
          <a href="mailto:contact@chipotlecalc.com" className="text-orange-600">
            contact@chipotlecalc.com
          </a>{" "}
          with a link to Chipotle's official source showing the correct value. We will respond within
          two business days.
        </p>

        <h2>Independence</h2>
        <p>
          ChipotleCalc has no commercial relationship with Chipotle Mexican Grill, Inc. We have not
          received payment, sponsorship, data feeds, or products from Chipotle or any of its
          affiliates. Our content is not reviewed or approved by Chipotle before publication.
          All editorial decisions — which items to include, how to label dietary categories, what
          warnings to display — are made independently by this site's editors.
        </p>
        <p>
          We do not accept payment for favorable content or data presentation. The calculator shows
          the nutrition data as Chipotle publishes it — we don't adjust values to make any item
          look better or worse than the published figures.
        </p>

        <h2>Health Claims</h2>
        <p>
          ChipotleCalc does not make medical or health claims. When we describe a build as
          "keto-friendly," "high protein," or "low calorie," we are describing it in terms of widely
          accepted nutritional definitions (detailed on the{" "}
          <Link href="/methodology" className="text-orange-600">methodology page</Link>), not making
          medical recommendations. Dietary labels on this site are informational and should not be
          interpreted as advice for managing any medical condition. For dietary decisions with medical
          implications — including diabetes, kidney disease, cardiovascular conditions, or eating
          disorders — consult a qualified healthcare provider or registered dietitian.
        </p>

        <h2>Affiliate and Advertising Disclosure</h2>
        <p>
          This site may display advertising once Google AdSense is approved. We do not receive
          commissions or affiliate fees from Chipotle, any food brand, or any nutrition-tracking
          app. Our editorial content — including which items we feature, how we order search results,
          and what dietary labels we apply — is not influenced by advertising or affiliate
          relationships of any kind.
        </p>

        <h2>Contact</h2>
        <p>
          Editorial questions, correction requests, or policy inquiries:{" "}
          <a href="mailto:contact@chipotlecalc.com" className="text-orange-600">
            contact@chipotlecalc.com
          </a>
        </p>
      </article>
    </Layout>
  );
}
