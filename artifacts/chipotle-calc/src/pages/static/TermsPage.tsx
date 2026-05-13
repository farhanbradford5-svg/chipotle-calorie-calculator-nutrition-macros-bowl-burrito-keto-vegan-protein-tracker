import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";

export default function TermsPage() {
  return (
    <Layout>
      <SeoHead
        title="Terms of Service — ChipotleCalc"
        description="Terms of service for ChipotleCalc. Acceptance, accuracy, intellectual property, and liability."
        canonicalPath="/terms-of-service"
      />
      <article className="mx-auto max-w-3xl px-4 py-10 prose prose-gray">
        <h1>Terms of Service</h1>
        <p className="text-sm text-gray-500">Effective: May 2026</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using ChipotleCalc at chipotlecalc.com ("the Site"), you agree to
          be bound by these Terms of Service. If you do not agree with any part of these terms,
          please discontinue use of the Site immediately. These terms apply to all visitors and
          users of the Site without exception.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          ChipotleCalc is a free, browser-based nutrition calculator that helps users estimate
          the calorie and macronutrient content of meals from Chipotle Mexican Grill. The
          calculator is provided for personal, informational use only. No registration, account
          creation, or payment is required to use the service. All calculator functionality
          runs within your browser — no meal data is transmitted to our servers.
        </p>
        <p>
          The Site also provides editorial content including guides, dietary tips, and
          nutritional comparisons, all of which are for general informational purposes only.
        </p>

        <h2>3. Accuracy Disclaimer</h2>
        <p>
          Nutrition values shown in ChipotleCalc are based on Chipotle's publicly available
          nutrition data. We make every reasonable effort to keep these values current and
          accurate. However, we make no warranty — express or implied — regarding the
          completeness, accuracy, or timeliness of any nutrition information presented.
        </p>
        <p>
          Actual nutrition content at Chipotle restaurants may vary by location, preparation
          method, ingredient batch, and portion size. For authoritative nutrition information,
          consult chipotle.com directly. ChipotleCalc is not a substitute for the official
          Chipotle nutrition source.
        </p>
        <p>
          Nothing on ChipotleCalc constitutes medical, dietary, or health advice. If you
          are managing a health condition, food allergy, or specific medical dietary requirement,
          consult a qualified registered dietitian or physician before making dietary decisions.
        </p>

        <h2>4. Intellectual Property</h2>
        <p>
          All original content on ChipotleCalc — including written guides, UI design, code,
          and editorial copy — is the intellectual property of ChipotleCalc and its operators.
          Nutrition data is reproduced from publicly available information published by
          Chipotle Mexican Grill, Inc. and is not claimed as our intellectual property.
        </p>
        <p>
          "Chipotle" and related names, logos, and marks are registered trademarks of
          Chipotle Mexican Grill, Inc. ChipotleCalc is not affiliated with, sponsored by,
          or endorsed by Chipotle Mexican Grill, Inc. The use of the Chipotle name on this
          site is for descriptive, nominative fair-use reference only. All third-party
          trademarks referenced on this site are the property of their respective owners.
        </p>

        <h2>5. Prohibited Uses</h2>
        <p>
          You may use ChipotleCalc for personal, non-commercial meal planning and nutritional
          reference. The following uses are prohibited:
        </p>
        <ul>
          <li>
            Automated scraping, crawling, or harvesting of nutrition data, calculator
            results, or any other content from this Site for commercial purposes.
          </li>
          <li>
            Republishing, reselling, or redistributing ChipotleCalc content — including
            nutrition data as presented on this Site — in any commercial product or service
            without written permission.
          </li>
          <li>
            Using the Site in any way that violates applicable law or regulation.
          </li>
          <li>
            Attempting to interfere with, disrupt, or gain unauthorized access to the
            Site or its hosting infrastructure.
          </li>
        </ul>

        <h2>6. No Warranty</h2>
        <p>
          The Site is provided "as is" and "as available" without warranty of any kind.
          ChipotleCalc and its operators expressly disclaim all warranties, whether express,
          implied, statutory, or otherwise, including without limitation any implied warranty
          of merchantability, fitness for a particular purpose, or non-infringement.
          We do not warrant that the Site will be uninterrupted, error-free, or free of
          viruses or other harmful components.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by applicable law, ChipotleCalc and its operators
          shall not be liable for any direct, indirect, incidental, special, consequential,
          or punitive damages arising from your use of, or inability to use, this Site —
          including but not limited to reliance on any nutrition information presented here.
          This limitation applies regardless of the theory of liability and even if we have
          been advised of the possibility of such damages.
        </p>

        <h2>8. Governing Law</h2>
        <p>
          These Terms of Service are governed by the laws of the United States, without
          regard to conflict-of-law principles. Any disputes shall be resolved in the
          courts of competent jurisdiction in the United States.
        </p>

        <h2>9. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms of Service at any time. Changes will
          be reflected here with an updated effective date. Continued use of the Site after
          changes are posted constitutes your acceptance of the revised terms.
        </p>

        <h2>10. Contact</h2>
        <p>
          Questions about these terms:{" "}
          <a href="mailto:contact@chipotlecalc.com" className="text-orange-600">
            contact@chipotlecalc.com
          </a>
        </p>
      </article>
    </Layout>
  );
}
