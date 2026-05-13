import { Link } from "wouter";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";

export default function AboutPage() {
  return (
    <Layout>
      <SeoHead
        title="About ChipotleMacros — Independent Chipotle Nutrition Calculator"
        description="About ChipotleMacros. Why we built an independent Chipotle calorie calculator, how it works, and what makes it different from Chipotle's own tool."
        canonicalPath="/about"
      />
      <article className="mx-auto max-w-3xl px-4 py-10 prose prose-gray">
        <h1>About ChipotleMacros</h1>

        <h2>Why We Built This</h2>
        <p>
          The idea for ChipotleMacros came from a simple frustration: Chipotle's own nutrition calculator
          is nearly unusable on a phone. It requires a desktop browser to work properly, takes multiple
          clicks to select each ingredient, doesn't remember your previous orders, and resets if you
          accidentally navigate away. If you're standing in line at Chipotle trying to figure out
          whether adding guacamole blows your calorie budget, you're not going to pull out a laptop.
        </p>
        <p>
          Most people eat at Chipotle regularly — it's one of the top fast-casual chains in the US —
          and many of them are tracking their macros or calories for fitness, weight loss, or medical
          reasons. The existing tools were either slow, mobile-hostile, or required signing up for an
          account. We wanted something that just works, instantly, the moment you open it.
        </p>

        <h2>What Makes ChipotleMacros Different</h2>
        <p>
          <strong>Mobile-first design.</strong> ChipotleMacros was built for the phone experience from
          the start. The interface is designed to be usable one-handed while you're in line. Ingredient
          categories are easy to tap, quantities update with a single press, and the calorie total is
          always visible without scrolling.
        </p>
        <p>
          <strong>Works offline.</strong> Once ChipotleMacros has loaded, it stores the ingredient data
          locally. If your phone signal drops inside the restaurant (which happens), the calculator
          keeps working. You can build and calculate your meal without a live connection.
        </p>
        <p>
          <strong>79 ingredients and counting.</strong> We've mapped every ingredient Chipotle
          publishes nutrition data for, including both rice types, all protein options, both bean
          varieties, all four salsas, all toppings, chips, drinks, and seasonal items when published.
        </p>
        <p>
          <strong>Quantity adjustments.</strong> Light, regular, extra, and double quantity modifiers
          apply proper nutrition multipliers (0.5×, 1×, 1.5×, 2×) so your calorie count reflects
          what you actually ordered, not just the default serving.
        </p>
        <p>
          <strong>Meal saving and sharing.</strong> Build a meal you like and save it for next time.
          Your saved meals are stored locally on your device — no account required. You can also share
          your meal build with others via a shareable link.
        </p>
        <p>
          <strong>Macro goals.</strong> Set your daily protein, carb, fat, and calorie targets, and the
          calculator shows how your current build fits into your goals with visual progress bars.
        </p>
        <p>
          <strong>Dietary badges.</strong> The calculator automatically identifies when your build is
          vegan, gluten-free, dairy-free, keto-friendly (under 25g net carbs), high-protein (over 40g),
          or low-calorie (under 500 calories). No manual filtering required.
        </p>
        <p>
          <strong>Sodium warnings.</strong> Chipotle's sodium content can be surprisingly high. We
          flag builds over 1,500mg sodium and show a live sodium count so you can make informed choices
          if that's relevant to your health.
        </p>

        <h2>Our Data</h2>
        <p>
          All nutrition values in ChipotleMacros come from Chipotle's officially published nutrition data.
          We cross-reference against both Chipotle's online nutrition calculator (available at
          chipotle.com) and their published nutrition PDF, which Chipotle updates when menu items or
          ingredient formulations change. We verify values at minimum quarterly and update the
          calculator promptly after any Chipotle menu announcement. See our{" "}
          <Link href="/methodology" className="text-orange-600">methodology page</Link> for the full
          data handling process.
        </p>

        <h2>Independence</h2>
        <p>
          ChipotleMacros is an independent tool. We are not affiliated with, sponsored by, or endorsed
          by Chipotle Mexican Grill, Inc. in any way. "Chipotle" is a registered trademark of Chipotle
          Mexican Grill, Inc. All trademarks referenced on this site belong to their respective owners.
        </p>
        <p>
          We don't have any commercial relationship with Chipotle. We built this because we wanted it
          to exist, and we maintain it because people use it.
        </p>

        <h2>Contact</h2>
        <p>
          For corrections, feedback, or questions about the data, reach us at{" "}
          <a href="mailto:contact@chipotlemacros.com" className="text-orange-600">contact@chipotlemacros.com</a>.
          For data correction requests, include the ingredient name and the value you believe is incorrect,
          along with a link to the source you're referencing. We take accuracy seriously and respond to
          correction requests within a few business days.
        </p>
      </article>
    </Layout>
  );
}
