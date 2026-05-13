import { Link } from "wouter";
import SeoHead from "@/components/SeoHead";
import Layout from "@/components/Layout";
import Calculator from "@/components/Calculator";
import FaqSection from "@/components/sections/FaqSection";
import AdSlot from "@/components/AdSlot";

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Chipotle Calorie Calculator",
  "url": "https://chipotlemacros.com/",
  "description": "Free Chipotle calorie calculator with full macro breakdown for any bowl, burrito, salad or tacos.",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://chipotlemacros.com/" }]
  }
};

export default function HomePage() {
  return (
    <Layout>
      <SeoHead
        title="Chipotle Calorie Calculator — Build Your Bowl, Burrito or Salad Instantly"
        description="Free Chipotle calorie calculator with full macro breakdown. Build any bowl, burrito, salad or tacos and see calories, protein, carbs, fat and cost instantly. Mobile-friendly. Updated 2026."
        canonicalPath="/"
        schema={homeSchema}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-orange-50 to-white pt-8 pb-4">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Chipotle Calorie Calculator
          </h1>
          <p className="mb-6 max-w-2xl text-gray-600">
            Build any Chipotle bowl, burrito, salad, or tacos and see calories, protein, carbs, fat,
            fiber, sodium, and estimated cost in real time. All values from Chipotle's official nutrition data.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <Calculator />
          <aside className="space-y-6">
            <AdSlot id="home-sidebar" size="rectangle" />
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-600">
              <p className="mb-2 font-semibold text-gray-800">Quick links</p>
              <ul className="space-y-1.5">
                <li><Link href="/diet/keto-chipotle" className="text-orange-600 hover:underline">Keto Chipotle orders</Link></li>
                <li><Link href="/diet/high-protein-chipotle" className="text-orange-600 hover:underline">High protein builds</Link></li>
                <li><Link href="/diet/vegan-chipotle" className="text-orange-600 hover:underline">Vegan options</Link></li>
                <li><Link href="/diet/low-calorie-chipotle" className="text-orange-600 hover:underline">Low calorie builds</Link></li>
                <li><Link href="/guides/chipotle-macros-guide" className="text-orange-600 hover:underline">Full macros guide</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <AdSlot id="home-leaderboard" size="leaderboard" className="mb-8" />
      </div>

      {/* ── SEO Content ──────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-4xl px-4 pb-16 prose prose-sm prose-gray">

        {/* Section 1 */}
        <section id="how-many-calories" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How Many Calories Is a Chipotle Bowl?</h2>

          <p>
            The honest answer is it depends entirely on what you build. A minimum-calorie bowl — salad base,
            chicken, fresh tomato salsa, lettuce — can be as low as 210–215 calories. A maximum bowl with
            everything piled on can exceed 2,000 calories. The average Chipotle bowl ordered in the US
            lands somewhere around 700–900 calories based on the most common configurations people actually order.
          </p>

          <p>
            To understand why the range is so wide, it helps to look at each layer separately and see what
            it contributes to the total.
          </p>

          <p>
            <strong>The base</strong> is where the biggest swing happens before you even add protein.
            If you pick white rice, you start at 210 calories and 44g of carbs before anything else goes in.
            Brown rice is essentially the same calorie count (210 cal) but with slightly more fiber.
            A salad base is 20 calories. A burrito tortilla adds 320 calories and 49g of carbs on its own —
            which is why a burrito with the same fillings as a bowl always comes out significantly higher.
          </p>

          <p>
            <strong>Protein</strong> contributes 150–210 calories depending on what you choose. Chicken
            at 180 calories and 32g protein is the most popular and one of the better calorie-to-protein
            ratios on the menu. Steak is 150 calories with 21g protein. Barbacoa is 170 calories with 24g
            protein. Carnitas is the highest-calorie protein option at 210 calories and 23g protein — more
            fat, so the calories are higher relative to protein yield. Sofritas (spiced tofu) is 150 calories
            with 8g protein, which is the lowest protein yield but also vegan-friendly.
          </p>

          <p>
            <strong>Beans</strong> add 120–130 calories and, importantly, 8g of fiber each — which matters
            if you care about satiety and digestive health. Black beans are 130 calories, pinto beans 120.
            Both are excellent additions from a nutritional standpoint.
          </p>

          <p>
            <strong>Salsas</strong> range from almost nothing (fresh tomato salsa at 25 calories) to a
            meaningful contribution (roasted chili-corn salsa at 80 calories, which also adds 16g of carbs).
            Tomatillo-green and tomatillo-red salsas are 15–30 calories each. Fresh tomato is the best
            value if you want flavour with minimal calorie impact.
          </p>

          <p>
            <strong>Toppings</strong> are where most of the calorie variation happens for experienced
            Chipotle orderers. Cheese adds 110 calories and 9g fat. Sour cream adds 110 calories and 10g fat.
            Fajita veggies are only 20 calories — genuinely one of the best additions because they add bulk,
            flavour, and micronutrients for almost no calorie cost. Lettuce is 5 calories.
          </p>

          <p>
            <strong>Guacamole is the single biggest calorie decision after choosing your protein.</strong>{" "}
            At 230 calories, guacamole adds almost as many calories as a full chicken serving. It's not
            inherently bad — it's mostly monounsaturated fat from avocado, which is a quality fat source —
            but if you're working within a calorie target, guacamole alone accounts for 11–15% of a
            2,000-calorie daily budget. Worth knowing before you decide.
          </p>

          <p>
            For the detailed breakdown of specific popular builds, see{" "}
            <Link href="/item/chicken-bowl-calories" className="text-orange-600 hover:underline">
              chicken bowl calories
            </Link>{" "}
            and{" "}
            <Link href="/item/chipotle-guacamole-nutrition" className="text-orange-600 hover:underline">
              Chipotle guacamole nutrition
            </Link>.
          </p>
        </section>

        {/* Section 2 */}
        <section id="chipotle-protein" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Order High Protein at Chipotle</h2>

          <p>
            Chipotle is one of the best fast-casual options for high protein, and genuinely better than
            most alternatives in the same price range. The ingredient list is built around whole proteins
            with nothing weird added, the portions are generous by fast-casual standards, and the
            customization options let you stack protein intelligently.
          </p>

          <p>
            <strong>Chicken has the best protein-to-calorie ratio on the menu.</strong> At roughly
            32g protein for 180 calories, you're getting about 0.18g protein per calorie — which is
            excellent for a fast food context. For comparison, you'd need to eat most of a McDonald's
            McDouble to get 30g protein, and you'd also be getting twice the sodium.
          </p>

          <p>
            <strong>Double chicken</strong> is the most popular high-protein ordering strategy and for
            good reason. Two servings of chicken gives you approximately 54–60g of protein from just
            that layer. Double protein typically costs an additional $2–4 depending on location, which
            works out to roughly the same cost as a protein supplement serving — but as actual food you
            can eat in line.
          </p>

          <p>
            Beyond protein selection, the rest of the bowl can be tuned for maximum protein density:
          </p>

          <ul>
            <li>
              <strong>Black beans add 8g protein.</strong> Often overlooked in protein conversations
              because people think of beans as a carb source. They are, but they're also a meaningful
              protein supplement — and the combination of legume protein with animal protein gives a
              complete amino acid profile.
            </li>
            <li>
              <strong>Cheese adds 6g protein</strong> for 110 calories — not outstanding, but it adds up.
            </li>
            <li>
              <strong>White or brown rice</strong> adds 4–5g protein. Include it if your calorie budget
              allows and you want the carbs for energy (especially useful post-workout).
            </li>
            <li>
              <strong>Fajita veggies</strong> add 1g protein and almost no calories, so they're always
              worth adding regardless of goals.
            </li>
          </ul>

          <p>
            A realistic maximum-protein Chipotle build: double chicken, white rice, black beans, fajita
            veggies, cheese. That comes to approximately 67–72g protein in a single meal, at around
            800–900 calories depending on portion sizes. That's the protein content of three large chicken
            breasts, delivered in a format you can eat standing up.
          </p>

          <p>
            If you want to get above 75g protein without adding excessive calories, double chicken plus
            black beans plus cheese, skipping the rice, gets you most of the protein with fewer carbs.
          </p>

          <p>
            For the full breakdown, see the{" "}
            <Link href="/guides/chipotle-muscle-gain-guide" className="text-orange-600 hover:underline">
              Chipotle muscle gain guide
            </Link>{" "}
            and{" "}
            <Link href="/diet/high-protein-chipotle" className="text-orange-600 hover:underline">
              high protein Chipotle diet page
            </Link>.
          </p>
        </section>

        {/* Section 3 */}
        <section id="keto-chipotle" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Keto Chipotle Orders — What to Get and What to Skip</h2>

          <p>
            Chipotle is genuinely one of the better fast-casual options for keto eating, but only if you
            know which items to avoid. The carb traps are not subtle once you know them, but they're also
            the things most people automatically order, so it's worth being explicit.
          </p>

          <p>
            <strong>What to avoid on keto at Chipotle:</strong>
          </p>

          <ul>
            <li>
              <strong>White rice: 44g carbs.</strong> The single biggest carb source in a standard bowl.
              Remove rice entirely if you're keeping net carbs under 25g.
            </li>
            <li>
              <strong>Brown rice: 44g carbs.</strong> Same carb count as white rice despite the health halo.
            </li>
            <li>
              <strong>Black beans: 22g carbs (14g net carbs after 8g fiber).</strong> Borderline. In a strict
              keto context, beans typically push you over the limit. In a more flexible low-carb context, they're
              acceptable in small quantities.
            </li>
            <li>
              <strong>Burrito tortilla: 49g carbs.</strong> Not compatible with keto in any configuration.
            </li>
            <li>
              <strong>Soft flour tortillas (tacos): 57g carbs for three.</strong> Same issue as the burrito.
            </li>
            <li>
              <strong>Roasted chili-corn salsa: 16g carbs.</strong> The highest-carb salsa. Use in moderation
              if at all on keto.
            </li>
          </ul>

          <p>
            <strong>What to order on keto at Chipotle:</strong>
          </p>

          <ul>
            <li>
              <strong>Salad bowl base: 4g carbs.</strong> The right starting point for any keto order.
              No rice, no tortilla, just romaine.
            </li>
            <li>
              <strong>Any protein: 0–2g carbs.</strong> Chicken, steak, barbacoa, carnitas, and pollo asado
              are all very low carb. Sofritas is 9g carbs — still workable if you're tracking net carbs.
            </li>
            <li>
              <strong>Sour cream: 2g carbs.</strong> Fully keto-compatible and adds creaminess.
            </li>
            <li>
              <strong>Cheese: 1g carbs.</strong> Always keto-friendly.
            </li>
            <li>
              <strong>Guacamole: 8g carbs, 6g fiber = 2g net carbs.</strong> Excellent on keto — healthy
              fats, minimal net carbs.
            </li>
            <li>
              <strong>Fresh tomato salsa: 4g carbs.</strong> The best salsa choice on keto.
            </li>
            <li>
              <strong>Tomatillo-green chili salsa: 3g carbs.</strong> Also fine.
            </li>
            <li>
              <strong>Lettuce: 1g carbs.</strong> Adds texture and volume for nearly nothing.
            </li>
            <li>
              <strong>Fajita veggies: 4g carbs.</strong> Fine in a keto context as part of a larger meal.
            </li>
          </ul>

          <p>
            <strong>A concrete keto build:</strong> Salad bowl + double chicken + sour cream + cheese +
            guacamole + fresh tomato salsa + lettuce. Total: approximately 8–12g net carbs, 600–680 calories,
            48–60g protein. This is a complete, filling meal that stays well within strict keto limits.
          </p>

          <p>
            The carnitas and barbacoa builds also work well on keto — carnitas adds slightly more fat
            (12g per serving) which many keto dieters actively want, and barbacoa's spice profile pairs
            well with guacamole and cheese.
          </p>

          <p>
            For the full keto ordering guide and more example builds, see{" "}
            <Link href="/diet/keto-chipotle" className="text-orange-600 hover:underline">
              keto Chipotle orders
            </Link>{" "}
            and{" "}
            <Link href="/menu/salad" className="text-orange-600 hover:underline">
              salad bowl menu
            </Link>.
          </p>
        </section>

        {/* Section 4 */}
        <section id="chipotle-vs-homemade" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Is Chipotle Actually Healthy?</h2>

          <p>
            The honest answer is: it depends on what you build and what your health goals are. Chipotle is
            healthier than most fast food when ordered with some intention, but it's easy to build a bowl
            that looks healthy and isn't, especially if you're watching sodium or total calories.
          </p>

          <p>
            <strong>What Chipotle does well compared to McDonald's or Taco Bell:</strong>
          </p>

          <ul>
            <li>
              <strong>Real whole ingredients.</strong> The chicken is marinated and grilled, not processed.
              The beans are cooked in-house. The guacamole is made from real avocados. Compared to most
              fast food chains, Chipotle's ingredient list is genuinely cleaner.
            </li>
            <li>
              <strong>No artificial preservatives.</strong> Chipotle has committed publicly to using no
              artificial colors, flavors, or preservatives in their food.
            </li>
            <li>
              <strong>High protein options.</strong> Getting 30–60g of protein from a fast food meal is
              unusual and genuinely useful for people managing fitness goals.
            </li>
            <li>
              <strong>Meaningful customization.</strong> You can build a 300-calorie salad or a 1,200-calorie
              burrito depending on your needs — and the ingredients are clearly labeled, making informed
              choices possible.
            </li>
          </ul>

          <p>
            <strong>Where Chipotle can work against you:</strong>
          </p>

          <ul>
            <li>
              <strong>Sodium.</strong> A fully-loaded Chipotle bowl can exceed 2,000mg of sodium — more
              than 85% of the FDA's daily recommended limit of 2,300mg. Fresh tomato salsa alone is 470mg.
              Barbacoa is 540mg. Tomatillo-red chili salsa adds another 540mg. If you have high blood pressure
              or are on a sodium-restricted diet, this matters significantly. The calculator on this page
              shows sodium totals and flags builds over 1,500mg.
            </li>
            <li>
              <strong>Calorie density from toppings.</strong> Guacamole (230 cal), sour cream (110 cal),
              queso (120 cal), and cheese (110 cal) can add 570 calories on top of your base and protein —
              a significant fraction of a daily calorie budget — without adding much in the way of satiety
              or volume.
            </li>
            <li>
              <strong>Portion size.</strong> Chipotle's portions are generous by design, which is great if
              you're active but can make calorie management harder if you're not paying attention.
            </li>
          </ul>

          <p>
            <strong>The context-dependent verdict:</strong> For someone tracking macros for muscle building,
            a Chipotle chicken bowl is an excellent meal — high protein, whole ingredients, reasonable
            calorie density. For someone managing hypertension, the sodium content requires careful ordering
            and some items (barbacoa, hot salsa, fresh tomato salsa in combination) should be limited.
            For someone in a calorie deficit, building a Chipotle meal that fits their target is very
            doable — it just takes knowing which ingredients to prioritize.
          </p>

          <p>
            See the{" "}
            <Link href="/guides/chipotle-sodium-guide" className="text-orange-600 hover:underline">
              Chipotle sodium guide
            </Link>{" "}
            and{" "}
            <Link href="/guides/chipotle-allergens-guide" className="text-orange-600 hover:underline">
              allergens guide
            </Link>{" "}
            for more detailed guidance on specific dietary concerns.
          </p>
        </section>

        {/* Section 5 */}
        <section id="chipotle-nutrition-data" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Calculate Chipotle Nutrition at ChipotleMacros</h2>

          <p>
            All nutrition values on ChipotleMacros come from Chipotle's publicly published nutrition
            information, cross-referenced against their official online nutrition calculator. We don't
            estimate or approximate — every number in this calculator traces back to a number Chipotle
            has published.
          </p>

          <p>
            <strong>Data sources:</strong> The primary source is Chipotle's official nutrition calculator
            at chipotle.com, which publishes per-ingredient calorie and macro data. We verify these
            values against Chipotle's published nutrition PDF, which is updated seasonally when menu
            items change or ingredient formulations are adjusted. When values differ between the two
            sources, we use the most recently published figure and note the discrepancy in our{" "}
            <Link href="/changelog" className="text-orange-600 hover:underline">changelog</Link>.
          </p>

          <p>
            <strong>Quantity modifiers:</strong> Chipotle doesn't publish separate nutrition values for
            "light" or "extra" portion requests. The modifiers we apply are industry-standard estimates:
          </p>

          <ul>
            <li>Light = 0.5× the standard serving nutritional values</li>
            <li>Regular = 1.0× (the published serving size)</li>
            <li>Extra = 1.5× the standard serving</li>
            <li>Double = 2.0× the standard serving</li>
          </ul>

          <p>
            These multipliers match the approach used by major calorie tracking apps and align with
            how Chipotle staff describe portion modifications to customers. In practice, "light" and
            "extra" portions vary by staff member and location — treat modified quantities as estimates.
          </p>

          <p>
            <strong>Update schedule:</strong> We check Chipotle's published nutrition data after each
            Chipotle menu update announcement and after any public report of an ingredient change.
            Values are verified at minimum quarterly. The last verification date is shown in our{" "}
            <Link href="/methodology" className="text-orange-600 hover:underline">methodology page</Link>.
          </p>

          <p>
            <strong>Known limitations:</strong> Actual nutrition values at your specific Chipotle
            location may vary from what this calculator shows. Portion sizes are not standardized
            across all locations — a generous server may give you more protein than the published
            serving size. Preparation methods (how long rice is held, how proteins are seasoned on
            a given day) can introduce small variations. For dietary decisions with medical
            implications — managing diabetes, celiac disease, severe food allergies — always verify
            with Chipotle's official source and speak to staff at your specific location about
            preparation practices.
          </p>

          <p>
            ChipotleMacros is an independent tool. We are not affiliated with or endorsed by
            Chipotle Mexican Grill, Inc. All trademarks belong to their respective owners.
            For the full methodology, see the{" "}
            <Link href="/methodology" className="text-orange-600 hover:underline">
              methodology page
            </Link>.
          </p>
        </section>

        {/* FAQ Section */}
        <div className="mb-12">
          <FaqSection />
        </div>

        <AdSlot id="home-footer" size="leaderboard" className="mb-8" />
      </div>
    </Layout>
  );
}
