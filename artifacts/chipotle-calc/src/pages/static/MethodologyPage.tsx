import { Link } from "wouter";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";

export default function MethodologyPage() {
  return (
    <Layout>
      <SeoHead
        title="Methodology — How ChipotleMacros Calculates Nutrition"
        description="How ChipotleMacros calculates Chipotle nutrition values. Data sources, quantity modifiers, dietary badge criteria, and update schedule."
        canonicalPath="/methodology"
      />
      <article className="mx-auto max-w-3xl px-4 py-10 prose prose-gray">
        <h1>Methodology</h1>
        <p className="text-sm text-gray-500">Last reviewed: May 2026</p>

        <h2>Where the Nutrition Data Comes From</h2>
        <p>
          Every calorie, protein, carbohydrate, fat, fiber, and sodium value in ChipotleMacros comes from
          Chipotle's officially published nutrition information. We do not estimate, extrapolate, or
          interpolate values from other sources.
        </p>
        <p>
          Our two primary sources are:
        </p>
        <ol>
          <li>
            <strong>Chipotle's online nutrition calculator</strong> at chipotle.com, which publishes
            per-ingredient calorie and macro data organized by menu category.
          </li>
          <li>
            <strong>Chipotle's published nutrition facts PDF</strong>, which Chipotle makes available
            on their website and updates when ingredient formulations or menu items change.
          </li>
        </ol>
        <p>
          When the two sources differ, we use the most recently published figure. Any discrepancy is
          noted in our <Link href="/changelog" className="text-orange-600">changelog</Link>.
        </p>
        <p>
          For additional cross-reference validation, we occasionally consult the USDA FoodData Central
          database for common whole ingredients (avocado, chicken breast, black beans, etc.) to verify
          that published values are within expected ranges for those ingredients. If we find a value that
          appears to be a data entry error on Chipotle's side, we note it and use the value we believe
          is correct, with a flag indicating the discrepancy. In all cases, we link to the source we used.
        </p>

        <h2>How Quantity Modifiers Work</h2>
        <p>
          Chipotle does not publish separate nutrition values for light, extra, or double portions.
          When a customer asks for "light" cheese or "extra" chicken, Chipotle's official calorie
          count does not change — only the standard serving value exists in their published data.
        </p>
        <p>
          To handle this, ChipotleMacros applies the following multipliers to the standard serving
          nutritional values:
        </p>
        <ul>
          <li><strong>None:</strong> 0× (ingredient excluded)</li>
          <li><strong>Light:</strong> 0.5× standard serving</li>
          <li><strong>Regular:</strong> 1.0× standard serving (the published value)</li>
          <li><strong>Extra:</strong> 1.5× standard serving</li>
          <li><strong>Double:</strong> 2.0× standard serving</li>
        </ul>
        <p>
          These multipliers match the approach used by the major calorie tracking applications (MyFitnessPal,
          Cronometer, Lose It) for handling portion modifications. They also align with how Chipotle staff
          typically describe portion adjustments: a double serving is twice the standard, a light serving
          is half.
        </p>
        <p>
          In practice, "light" and "extra" portions vary by individual server and location. The multipliers
          are estimates, not exact measurements. For regular portions, the published Chipotle value is
          used as-is with no adjustment. Regular portions are the most reliable values in this calculator.
        </p>

        <h2>Dietary Badge Criteria</h2>
        <p>
          ChipotleMacros automatically displays dietary badges when your build meets the following criteria:
        </p>
        <ul>
          <li>
            <strong>Vegan:</strong> All selected ingredients are free of animal products. Cheese, sour
            cream, all meat proteins, and the chipotle-honey vinaigrette are excluded from vegan builds.
          </li>
          <li>
            <strong>Gluten-Free:</strong> All selected ingredients are free of gluten-containing ingredients.
            Flour tortillas are excluded. Note: cross-contact with gluten-containing ingredients is possible
            at Chipotle preparation surfaces, which ChipotleMacros cannot account for. The badge reflects
            ingredient composition only, not preparation safety.
          </li>
          <li>
            <strong>Dairy-Free:</strong> All selected ingredients are free of dairy. Cheese, sour cream,
            and queso blanco are excluded.
          </li>
          <li>
            <strong>Keto-Friendly:</strong> Total net carbs (carbohydrates minus fiber) for the build
            are under 25g. This threshold aligns with standard ketogenic diet guidelines (typically under
            20–50g net carbs per day, with 25g as a per-meal conservative limit).
          </li>
          <li>
            <strong>High Protein:</strong> Total protein for the build exceeds 40g.
          </li>
          <li>
            <strong>Low Calorie:</strong> Total calories for the build are under 500.
          </li>
        </ul>

        <h2>Sodium Warning</h2>
        <p>
          ChipotleMacros displays a sodium warning when the build's total sodium exceeds 1,500mg. This
          threshold is based on the American Heart Association's recommendation of no more than
          1,500mg of sodium per day for people with high blood pressure, and is stricter than the
          FDA's general 2,300mg daily limit. We use the stricter threshold because sodium is the
          most likely nutritional concern to catch people off guard at Chipotle.
        </p>

        <h2>Known Limitations</h2>
        <p>
          Actual nutrition values at your specific Chipotle location will vary from what this calculator
          shows. Reasons include:
        </p>
        <ul>
          <li>
            <strong>Portion size variation.</strong> Individual servers give different portion sizes.
            A generous scoop of chicken may be 10–20% more than the published serving size.
          </li>
          <li>
            <strong>Recipe variation.</strong> How proteins are seasoned, how long rice is held, and
            exact preparation methods vary by location and day.
          </li>
          <li>
            <strong>Ingredient substitutions.</strong> Chipotle occasionally substitutes ingredients
            when items run out. Nutrition values in that case may differ from what was ordered.
          </li>
        </ul>
        <p>
          For dietary decisions with medical implications — managing diabetes, celiac disease, or
          severe food allergies — always verify with Chipotle's official published source and speak
          directly with staff at your specific location about preparation practices.
        </p>

        <h2>Update Schedule</h2>
        <p>
          ChipotleMacros verifies nutrition data at minimum quarterly. We also check values after:
        </p>
        <ul>
          <li>Any Chipotle public announcement of a menu change or new item</li>
          <li>Any credible user report of a value discrepancy</li>
          <li>Any USDA or FDA update that affects percentage daily values used in the calculator</li>
        </ul>
        <p>
          All data updates are logged in the <Link href="/changelog" className="text-orange-600">changelog</Link>.
        </p>
      </article>
    </Layout>
  );
}
