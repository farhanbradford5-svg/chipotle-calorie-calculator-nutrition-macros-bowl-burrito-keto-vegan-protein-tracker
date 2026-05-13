import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";

export default function DisclaimerPage() {
  return (
    <Layout>
      <SeoHead
        title="Disclaimer — ChipotleCalc"
        description="Disclaimer for ChipotleCalc. Not affiliated with Chipotle. Nutrition values are estimates for informational purposes only."
        canonicalPath="/disclaimer"
      />
      <article className="mx-auto max-w-3xl px-4 py-10 prose prose-gray">
        <h1>Disclaimer</h1>
        <p className="text-sm text-gray-500">Effective: May 2026</p>

        <p>
          ChipotleCalc is an independent, third-party nutrition calculator. All information
          provided on this website is for general informational purposes only. Please read
          this disclaimer carefully before using the Site.
        </p>

        <h2>Not Affiliated with Chipotle Mexican Grill</h2>
        <p>
          ChipotleCalc is not affiliated with, sponsored by, endorsed by, or in any way
          officially connected to Chipotle Mexican Grill, Inc. or any of its subsidiaries
          or affiliates. "Chipotle," the Chipotle logo, and all related names, marks, and
          trade dress are registered trademarks of Chipotle Mexican Grill, Inc. Their use
          on this Site is for descriptive, nominative fair-use reference only and does not
          imply any affiliation or endorsement.
        </p>
        <p>
          Chipotle Mexican Grill, Inc. has not reviewed, approved, or contributed to the
          content of this Site. For official Chipotle nutrition information, visit{" "}
          <a
            href="https://www.chipotle.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600"
          >
            chipotle.com
          </a>
          .
        </p>

        <h2>Nutrition Data Accuracy</h2>
        <p>
          The nutrition values displayed in ChipotleCalc are based on publicly available
          information published by Chipotle Mexican Grill, Inc. We review this data
          periodically and update it in good faith. However, we make no warranty —
          express or implied — that the data is complete, accurate, or current at
          any given time.
        </p>
        <p>
          Actual nutrition content at Chipotle restaurants may vary based on:
        </p>
        <ul>
          <li>Geographic location and regional supplier variation</li>
          <li>Preparation method and staff portioning practices</li>
          <li>Ingredient batch variation</li>
          <li>Seasonal or recipe changes made by Chipotle</li>
        </ul>
        <p>
          The results produced by this calculator are estimates only. They should not
          be treated as exact figures. For precise nutritional needs — especially in
          a medical context — always consult the official Chipotle website and a
          qualified healthcare professional.
        </p>

        <h2>Not Medical or Dietary Advice</h2>
        <p>
          Nothing on ChipotleCalc constitutes medical, dietary, clinical, or health advice
          of any kind. The calculator is a general-purpose tool to help users understand
          the approximate nutritional profile of Chipotle menu items.
        </p>
        <p>
          If you are managing a health condition — including but not limited to diabetes,
          cardiovascular disease, kidney disease, food allergies, eating disorders, or
          any condition requiring a medically supervised diet — you must consult a
          qualified registered dietitian, physician, or other licensed healthcare
          professional before making dietary decisions based on this Site's content.
          ChipotleCalc is not a substitute for professional medical advice, diagnosis,
          or treatment.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by applicable law, ChipotleCalc and its
          operators disclaim all liability for any loss, harm, or damage of any kind
          arising from your use of this website, reliance on nutrition data presented
          here, or any decisions made based on information from this Site. This includes
          direct, indirect, incidental, consequential, and punitive damages.
        </p>

        <h2>Contact</h2>
        <p>
          Disclaimer questions:{" "}
          <a href="mailto:contact@chipotlecalc.com" className="text-orange-600">
            contact@chipotlecalc.com
          </a>
        </p>
      </article>
    </Layout>
  );
}
