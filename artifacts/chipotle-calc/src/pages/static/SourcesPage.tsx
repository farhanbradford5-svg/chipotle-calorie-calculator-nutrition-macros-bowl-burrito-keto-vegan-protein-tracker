import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";

export default function SourcesPage() {
  return (
    <Layout>
      <SeoHead
        title="Sources — ChipotleCalc Nutrition Data References"
        description="All data sources used by ChipotleCalc. Chipotle's official nutrition calculator, USDA FoodData Central, FDA guidelines, and American Heart Association sodium recommendations."
        canonicalPath="/sources"
      />
      <article className="mx-auto max-w-3xl px-4 py-10 prose prose-gray">
        <h1>Sources</h1>
        <p className="text-sm text-gray-500">Last updated: May 2026</p>

        <p>
          ChipotleCalc uses a small set of authoritative sources for all nutrition data. We do not
          estimate values, combine sources without clear attribution, or use crowd-sourced calorie
          databases. Every number traces to a verifiable published source.
        </p>

        <h2>Primary Nutrition Source</h2>

        <h3>Chipotle Mexican Grill Official Nutrition Calculator</h3>
        <p>
          <strong>URL:</strong> chipotle.com/nutrition-calculator (Chipotle's official website)
        </p>
        <p>
          This is the primary source for all per-ingredient calorie, protein, carbohydrate, fat, fiber,
          and sodium values in ChipotleCalc. Chipotle's nutrition calculator publishes the values their
          nutritionists and food science team have verified. These are the numbers Chipotle stands behind
          as accurate representations of their ingredients as served.
        </p>
        <p>
          The nutrition calculator is updated by Chipotle when menu items change or when ingredient
          formulations are updated. ChipotleCalc verifies against this source quarterly and after any
          Chipotle menu announcement.
        </p>

        <h3>Chipotle Nutrition Facts PDF</h3>
        <p>
          <strong>Published by:</strong> Chipotle Mexican Grill, Inc.
        </p>
        <p>
          Chipotle publishes a PDF containing complete nutrition facts for all menu items. This document
          is used as a secondary verification source. When values in the PDF differ from the online
          calculator, we use the most recently updated value and note the discrepancy in our changelog.
          The PDF often contains more detailed micronutrient information (vitamin percentages, cholesterol)
          that the online calculator doesn't expose through its interface.
        </p>

        <h2>Cross-Reference Validation</h2>

        <h3>USDA FoodData Central</h3>
        <p>
          <strong>URL:</strong> fdc.nal.usda.gov
        </p>
        <p>
          The USDA's FoodData Central is the US government's comprehensive food composition database.
          We use FoodData Central to cross-reference Chipotle's published values against known values
          for the whole ingredients that make up Chipotle's menu (chicken breast, avocado, black beans,
          brown rice, etc.). This helps catch obvious data entry errors — for example, if a published
          protein value for chicken was unusually low or high compared to what the USDA publishes for
          comparable preparations.
        </p>
        <p>
          Where FoodData Central values differ from Chipotle's published values (which they often do,
          because Chipotle's preparation, seasoning, and portion sizes differ from generic whole
          ingredient entries), we use Chipotle's value. The USDA data is a sanity check, not a
          substitute source.
        </p>

        <h2>Regulatory and Health Guidelines</h2>

        <h3>FDA Daily Value Recommendations</h3>
        <p>
          <strong>Source:</strong> U.S. Food and Drug Administration (fda.gov)
        </p>
        <p>
          The percentage Daily Values shown in ChipotleCalc (where displayed) are calculated using the
          FDA's standard Daily Values established for nutrition labeling purposes. The key daily reference
          values we use:
        </p>
        <ul>
          <li>Calories: 2,000 kcal per day</li>
          <li>Protein: 50g per day</li>
          <li>Total fat: 78g per day</li>
          <li>Saturated fat: 20g per day</li>
          <li>Carbohydrates: 275g per day</li>
          <li>Dietary fiber: 28g per day</li>
          <li>Sodium: 2,300mg per day</li>
        </ul>
        <p>
          These are the same Daily Values used on standard US nutrition labels and represent what
          the FDA considers adequate daily intake for a general adult population.
        </p>

        <h3>American Heart Association Sodium Guidelines</h3>
        <p>
          <strong>Source:</strong> American Heart Association (heart.org)
        </p>
        <p>
          The sodium warning threshold in ChipotleCalc (1,500mg per meal) is based on the American
          Heart Association's recommendation that people with high blood pressure should consume no
          more than 1,500mg of sodium per day. This is a stricter guideline than the FDA's 2,300mg
          general recommendation and is appropriate for the warning context — many Chipotle builds
          can approach or exceed 2,000mg sodium, which would account for the entire day's sodium
          budget under the stricter AHA guideline.
        </p>
        <p>
          The AHA guideline is not a universal recommendation for all people — healthy adults without
          cardiovascular risk factors may have different sodium tolerance. The warning is flagged as
          informational, not prescriptive.
        </p>

        <h2>What We Don't Use</h2>
        <p>
          ChipotleCalc does not use crowd-sourced calorie databases (such as Open Food Facts or
          community-submitted entries on calorie tracking apps) as primary data sources. These
          databases contain many inaccurate Chipotle entries with inconsistent serving sizes,
          outdated values, and community-entered numbers that may not reflect Chipotle's actual
          formulations. All values in ChipotleCalc trace to Chipotle's own published data.
        </p>

        <h2>Reporting Errors</h2>
        <p>
          If you believe a nutrition value in ChipotleCalc is incorrect, please contact us at{" "}
          <a href="mailto:contact@chipotlecalc.com" className="text-orange-600">
            contact@chipotlecalc.com
          </a>. Include the ingredient name, the value you believe is incorrect, the value you believe
          is correct, and the source you're referencing. We verify all correction requests against
          Chipotle's official published sources and update promptly when errors are confirmed.
        </p>
      </article>
    </Layout>
  );
}
