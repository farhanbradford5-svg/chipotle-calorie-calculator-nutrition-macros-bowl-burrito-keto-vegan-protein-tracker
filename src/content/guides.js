import { item, total, fmt, N, rankBy, categoryItems } from '../data/builds.js';
import { REVIEW, OFFICIAL, longDate } from '../data/review.js';
import { CATEGORIES } from '../data/nutrition.js';

const ing = (id) => item(id);
const ALL = CATEGORIES.flatMap((c) => c.items).filter((i) => i.cal > 0);
const byNa = [...ALL].sort((a, b) => b.na - a.na);
const byFib = [...ALL].sort((a, b) => b.fib - a.fib);
const row = (i) => [i.name, i];

export const GUIDES = [
  {
    slug: 'sodium',
    keyword: 'chipotle sodium guide',
    title: 'Chipotle Sodium Guide: Every Ingredient, Ranked',
    description:
      'A complete Chipotle sodium guide with all 29 ingredients ranked by milligrams, plus the cumulative math showing how one standard bowl reaches 1,610 mg.',
    opening: `This Chipotle sodium guide ranks every ingredient on the line by milligrams and then shows how they stack, because the individual figures matter less than what happens when four of them land in the same container. A standard chicken bowl reaches ${fmt(N.bowl('chicken').na)} mg — ${Math.round((N.bowl('chicken').na / 2300) * 100)}% of the 2,300 mg daily limit — without a single item on it looking especially salty.`,
    sections: [
      {
        heading: 'Every ingredient ranked by sodium',
        body: `Ordered highest to lowest. The pattern worth noticing is that the proteins are mid-table: the items above them are condiments, wrappers and the rice.`,
        table: { rows: byNa.map(row), serving: 'Ingredient', caption: 'Sodium per standard serving, highest first. Estimates from published data.' },
      },
      {
        heading: 'How a bowl accumulates',
        body: `Built one scoop at a time, a standard chicken bowl gets to ${fmt(N.bowl('chicken').na)} mg like this: chicken ${ing('chicken').na} mg, white rice ${ing('white-rice').na} mg, black beans ${ing('black-beans').na} mg, fresh tomato salsa ${ing('mild-salsa').na} mg, cheese ${ing('cheese').na} mg. No single line is alarming. The rice alone contributes more than the meat, and the salsa contributes more than either.`,
        bullets: [
          `Add a flour tortilla and the same fillings reach ${fmt(N.burrito('chicken').na)} mg`,
          `Add chips and guacamole on the side and the meal totals ${fmt(N.bowl('chicken').na + ing('chips-guac').na)} mg — roughly ${Math.round(((N.bowl('chicken').na + ing('chips-guac').na) / 2300) * 100)}% of a day`,
          `Take the same bowl with green salsa, brown rice and sour cream instead and it lands at ${fmt(total(['chicken', 'brown-rice', 'black-beans', 'green-salsa', 'sour-cream']).na)} mg`,
        ],
      },
      {
        heading: 'Why the numbers run this high',
        body: `Chipotle cooks in small batches without preservatives, and salt is doing most of the seasoning work in the absence of them. The rice is salted and finished with lime; the salsas are salted to bring raw vegetables forward; the tortilla contains salt as a structural ingredient. None of this is unusual for prepared food, and it is why a meal built entirely from recognisable ingredients still clears two-thirds of a day's sodium.`,
      },
      {
        heading: 'Ordering to a sodium target',
        body: `This page is the reference. <a href="/diet/low-sodium">The low-sodium ordering guide</a> turns it into a swap ladder with worked builds under 1,000 mg.`,
      },
    ],
  },

  {
    slug: 'allergens',
    keyword: 'chipotle allergens guide',
    byline: `Cross-checked against Chipotle's published allergen and nutrition data — last verified ${longDate(REVIEW.allergensLastVerified)}. Part of the same ${REVIEW.cadence} review described in <a href="/methodology">How We Calculate</a>.`,
    officialSource: `<strong>Primary source:</strong> Chipotle's own <a href="${OFFICIAL.allergens}" rel="nofollow noopener" target="_blank">Allergens &amp; Special Diet statement</a>. Everything in the table below is transcribed from it. Where this page and Chipotle's statement disagree, theirs is correct.`,
    disclaimer: `This page lists allergen and cross-contact information based on Chipotle's published data, transcribed and re-checked on <a href="/methodology">the review cadence we publish</a>. If you have a diagnosed food allergy, always verify current allergen information directly with Chipotle or your local restaurant before ordering — formulations and prep practices can change between our review cycles.`,
    title: 'Chipotle Allergens Guide: What Contains What',
    description:
      'A Chipotle allergens guide covering wheat, dairy and soy across every menu ingredient, plus the cross-contact policy that the ingredient list does not capture.',
    opening: `This Chipotle allergens guide covers the three allergens that actually appear on the line — wheat, dairy and soy — because the menu is short enough that the compliance table fits on one screen. Only one item contains wheat, three contain dairy, and two contain soy. Everything else is clear on all three counts.`,
    sections: [
      {
        heading: 'The compliance table',
        body: `Read this as an ingredient statement, not a safety guarantee — cross-contact is covered separately below.`,
        matrix: [
          ['Flour tortilla', 'Wheat', 'Burritos, quesadillas and soft flour tacos'],
          ['Cheese', 'Dairy', 'Also present as the base of every quesadilla'],
          ['Sour cream', 'Dairy', '—'],
          ['Queso blanco', 'Dairy', '—'],
          ['Sofritas', 'Soy', 'Braised tofu'],
          ['Plant-based chorizo', 'Soy', '—'],
          ['Chipotle-honey vinaigrette', 'Honey', 'Not an allergen, but rules out vegan orders'],
        ],
      },
      {
        heading: 'What contains none of the three',
        body: `Every protein except sofritas and plant-based chorizo. Both rice varieties, both beans, all four salsas, guacamole, fajita vegetables, romaine, supergreens, corn tortillas and the chips.`,
      },
      {
        heading: 'Cross-contact is the part the table cannot answer',
        body: `Ingredients sit in open containers along a single assembly line, and staff use the same gloves across an order unless asked to change them. Tortillas are warmed near the assembly area. For a preference or an intolerance this rarely matters; for coeliac disease or a severe allergy it is the whole question, and the honest answer is that Chipotle does not operate an allergen-free preparation area.`,
        bullets: [
          `Fresh gloves, requested at the start of the order`,
          `Ingredients taken from below the surface of each container`,
          `A bowl rather than a burrito, which keeps food away from the tortilla station`,
        ],
      },
      {
        heading: 'Check the current statement before you rely on this',
        body: `Recipes change. Chipotle publishes its own allergen information, and that is the authority for anything medical — this page is a summary of it, kept in step with the figures used across this site. <a href="/sources">Our sourcing notes</a> record when it was last checked.`,
      },
    ],
  },

  {
    slug: 'muscle-gain',
    keyword: 'chipotle muscle gain guide',
    title: 'Chipotle Muscle Gain Guide: Surplus Without Junk',
    description:
      'A Chipotle muscle gain guide for building a calorie surplus that still carries 80 g of protein — which additions earn their calories and which do not.',
    opening: `A Chipotle muscle gain guide has to solve a different problem from a high-protein one. Hitting ${N.doubleBowl('chicken').p} g of protein is easy here; hitting it inside a genuine calorie surplus without filling up on fat is the harder half. The useful question is not "what has the most protein" but "which calories bring protein with them".`,
    sections: [
      {
        heading: 'Additions ranked by protein per calorie',
        body: `Every gram of protein per 100 calories in this list is what you are buying with the surplus. Double chicken is the outlier; guacamole is the trap.`,
        bullets: [
          `Chicken — ${Math.round((ing('chicken').p / ing('chicken').cal) * 1000) / 10} g protein per 100 cal`,
          `Barbacoa — ${Math.round((ing('barbacoa').p / ing('barbacoa').cal) * 1000) / 10} g, steak ${Math.round((ing('steak').p / ing('steak').cal) * 1000) / 10} g`,
          `Black beans — ${Math.round((ing('black-beans').p / ing('black-beans').cal) * 1000) / 10} g, and a second scoop usually costs nothing`,
          `Cheese — ${Math.round((ing('cheese').p / ing('cheese').cal) * 1000) / 10} g`,
          `White rice — ${Math.round((ing('white-rice').p / ing('white-rice').cal) * 1000) / 10} g: cheap surplus calories, almost no protein`,
          `Guacamole — ${Math.round((ing('guac').p / ing('guac').cal) * 1000) / 10} g, the weakest ratio on the menu for this purpose`,
        ],
      },
      {
        heading: 'A surplus build that still carries the protein',
        body: `Double chicken with white rice, double black beans, corn salsa and cheese.`,
        table: {
          rows: [['Surplus build', total([['chicken', 2], 'white-rice', ['black-beans', 2], 'corn-salsa', 'cheese'])]],
          serving: 'Build',
        },
        note: `That is ${fmt(total([['chicken', 2], 'white-rice', ['black-beans', 2], 'corn-salsa', 'cheese']).cal)} calories carrying ${total([['chicken', 2], 'white-rice', ['black-beans', 2], 'corn-salsa', 'cheese']).p} g of protein and ${total([['chicken', 2], 'white-rice', ['black-beans', 2], 'corn-salsa', 'cheese']).fib} g of fiber. Adding chips would take it to ${fmt(total([['chicken', 2], 'white-rice', ['black-beans', 2], 'corn-salsa', 'cheese']).cal + ing('chips').cal)} calories for no additional protein worth counting.`,
      },
      {
        heading: 'Where this differs from ordering high-protein',
        body: `<a href="/diet/high-protein">The high-protein page</a> is about the ceiling in a single bowl. This one assumes you are eating at Chipotle repeatedly and need the calories to land somewhere useful. The practical difference is that rice and a second bean scoop become assets here rather than things to minimise.`,
      },
      {
        heading: 'Sodium is the constraint that catches people',
        body: `The build above carries ${fmt(total([['chicken', 2], 'white-rice', ['black-beans', 2], 'corn-salsa', 'cheese']).na)} mg of sodium. Eaten daily as a bulking staple that is worth managing — <a href="/guides/sodium">the sodium ranking</a> shows which swaps cost you nothing nutritionally. For splitting a surplus order across two days see <a href="/guides/meal-prep">the meal-prep notes</a>, and <a href="/guides/macro-targeting">the macro explainer</a> for how the three macros distribute.`,
      },
    ],
  },

  {
    slug: 'fiber',
    keyword: 'chipotle fiber guide',
    title: 'Chipotle Fiber Guide: Where the Grams Actually Are',
    description:
      'A Chipotle fiber guide ranking every ingredient. Beans do most of the work at 7–8 g; stacking them with guacamole and veg clears a daily target in one bowl.',
    opening: `Fiber at Chipotle comes from a very short list, and this Chipotle fiber guide exists mainly to show how short. Beans supply ${ing('black-beans').fib} to ${ing('pinto-beans').fib} g a scoop and guacamole another ${ing('guac').fib} g. Almost everything else on the line contributes one gram or none, including both rices.`,
    sections: [
      {
        heading: 'Every ingredient ranked by fiber',
        body: `The top four account for nearly all the fiber available in any order.`,
        table: { rows: byFib.slice(0, 12).map(row), serving: 'Ingredient', caption: 'Fiber per standard serving, highest first.' },
      },
      {
        heading: 'Stacking to a daily target',
        body: `A 28 g daily target is reachable in one order if you deliberately stack the four items that carry fiber. Double black beans, guacamole, fajita vegetables and roasted chili-corn salsa on brown rice comes to ${total([['black-beans', 2], 'guac', 'fajita', 'corn-salsa', 'brown-rice']).fib} g.`,
        table: {
          rows: [['Fiber stack', total([['black-beans', 2], 'guac', 'fajita', 'corn-salsa', 'brown-rice'])]],
          serving: 'Build',
        },
        note: `That build costs ${fmt(total([['black-beans', 2], 'guac', 'fajita', 'corn-salsa', 'brown-rice']).cal)} calories before any meat goes in, which is the honest trade — fiber at Chipotle is not free.`,
      },
      {
        heading: 'The brown rice myth, quantified',
        body: `Brown rice carries ${ing('brown-rice').fib} g of fiber against white rice's ${ing('white-rice').fib} g. One gram. It is a reasonable swap for the ${ing('white-rice').na - ing('brown-rice').na} mg of sodium it saves, and a poor one if fiber is the reason you are making it. <a href="/menu/brown-rice">The brown rice page</a> covers the rest of the comparison.`,
      },
      {
        heading: 'What a low-carb order costs you',
        body: `Beans are simultaneously the main fiber source and the item that low-carb and keto orders remove. Dropping them takes a bowl from ${N.bowl('chicken').fib} g of fiber to ${total(['chicken', 'white-rice', 'mild-salsa', 'cheese']).fib} g. If you are cutting carbs, guacamole (${ing('guac').fib} g) and fajita vegetables (${ing('fajita').fib} g) are how you get 7 g of it back. Fiber is also what makes a lighter order filling, which <a href="/guides/weight-loss">the weight-loss guide</a> covers across repeat visits.`,
      },
    ],
  },

  {
    slug: 'macro-targeting',
    keyword: 'chipotle macros guide',
    title: 'Chipotle Macros Guide: How the Numbers Are Built',
    description:
      'A complete Chipotle macros guide — how protein, carbs and fat are distributed across the menu, how portion sizes scale them, and how to order to a target.',
    opening: `This Chipotle macros guide covers how the three macronutrients are distributed across the line, how the light / normal / extra / double portion sizes scale them, and where to go once you know which one you are managing. The short version: protein lives in the proteins and the beans, carbohydrate lives in the rice, beans and tortilla, and fat lives almost entirely in the toppings.`,
    sections: [
      {
        heading: 'Where each macro actually comes from',
        body: `A standard chicken bowl at ${fmt(N.bowl('chicken').cal)} calories splits into ${N.bowl('chicken').p} g protein, ${N.bowl('chicken').c} g carbohydrate and ${N.bowl('chicken').f} g fat. Trace each back and the sources barely overlap.`,
        bullets: [
          `Protein — the protein scoop (${ing('chicken').p} g), beans (${ing('black-beans').p} g), cheese (${ing('cheese').p} g)`,
          `Carbohydrate — rice (${ing('white-rice').c} g), beans (${ing('black-beans').c} g), tortilla (${ing('flour-tortilla').c} g), corn salsa (${ing('corn-salsa').c} g)`,
          `Fat — guacamole (${ing('guac').f} g), queso (${ing('queso').f} g), cheese (${ing('cheese').f} g), sour cream (${ing('sour-cream').f} g), and the protein itself`,
        ],
      },
      {
        heading: 'How portion sizes scale the numbers',
        body: `Every ingredient in the calculator can be set to light, normal, extra or double, and each setting multiplies that ingredient's full macro line — not just its calories. Light is a 0.5 multiplier, extra is 1.5, double is 2.0. Those are approximations of what a server actually adds rather than official measures; <a href="/methodology">the methodology page</a> explains the reasoning.`,
        table: {
          rows: [
            ['White rice — light', total([['white-rice', 'light']])],
            ['White rice — normal', total(['white-rice'])],
            ['White rice — extra', total([['white-rice', 'extra']])],
            ['White rice — double', total([['white-rice', 'double']])],
          ],
          serving: 'Portion',
        },
      },
      {
        heading: 'Ordering to a target',
        body: `Once you know which macro is binding, the guidance splits by goal rather than by ingredient.`,
        bullets: [
          `Protein target — <a href="/diet/high-protein">the high-protein build</a> reaches ${N.doubleBowl('chicken').p} g`,
          `Carbohydrate ceiling — <a href="/diet/low-carb">low carb</a> keeps beans, <a href="/diet/keto">keto</a> drops them`,
          `Calorie ceiling — <a href="/diet/low-calorie">the low-calorie build</a> lands near ${total(['salad-base', 'steak', 'green-salsa', 'fajita']).cal}`,
          `Fat, if you are managing it upward — <a href="/guides/muscle-gain">the muscle-gain guide</a>`,
        ],
      },
      {
        heading: 'A note on precision',
        body: `The arithmetic here is exact and the inputs are averages. Chipotle serves by hand, so two identical orders can differ by 50 to 100 calories, and sodium varies most of all. Treat any macro total as a good estimate rather than a measurement.`,
      },
    ],
  },

  {
    slug: 'weight-loss',
    keyword: 'chipotle weight loss guide',
    byline: `Figures cross-checked against Chipotle's published nutrition data — last verified ${longDate(REVIEW.lastVerified)}. Part of the same ${REVIEW.cadence} review described in <a href="/methodology">the method we publish</a>.`,
    disclaimer: `This is general information, not a weight-loss program or medical advice. If you have a health condition that affects your dietary needs, or you're pursuing significant weight change, talk to a doctor or registered dietitian before changing your diet.`,
    title: 'Chipotle Weight Loss Guide: Ordering on Repeat',
    description:
      'A Chipotle weight loss guide about repeat visits rather than one clever order — default builds, the three habits that undo them, and what a week looks like.',
    opening: `A single low-calorie order is easy; eating at Chipotle twice a week for a year without drifting is the actual problem, and that is what this Chipotle weight loss guide is about. The difference between a ${fmt(total(['salad-base', 'steak', 'green-salsa', 'fajita']).cal)}-calorie salad and a ${fmt(N.bowl('chicken').cal + ing('chips').cal)}-calorie bowl-and-chips is not knowledge, it is what you order on autopilot.`,
    sections: [
      {
        heading: 'Pick a default and stop deciding',
        body: `The most useful thing you can do is choose one build and order it without reconsidering. Decision fatigue at the counter is what produces the chips. Two defaults worth having: a light one for ordinary days and a fuller one for days you have trained.`,
        table: {
          rows: [
            ['Light default', total(['salad-base', 'chicken', 'black-beans', 'green-salsa', 'fajita'])],
            ['Full default', total(['chicken', ['white-rice', 'light'], 'black-beans', 'green-salsa', 'cheese', 'fajita'])],
          ],
          serving: 'Default build',
        },
      },
      {
        heading: 'The three habits that quietly undo it',
        body: `None of these is a single bad decision; each is a small one repeated.`,
        bullets: [
          `Chips, at ${ing('chips').cal} calories — twice a week is ${fmt(ing('chips').cal * 2 * 52)} calories a year`,
          `Drifting from light rice back to a full scoop, ${ing('white-rice').cal / 2} calories a visit`,
          `Adding guacamole "because it is healthy" at ${ing('guac').cal} calories on top of a build that already worked`,
        ],
      },
      {
        heading: 'Volume is the lever, not restriction',
        body: `Fajita vegetables (${ing('fajita').cal} cal), romaine (${ing('lettuce').cal} cal) and supergreens (${ing('supergreens').cal} cal) cost almost nothing and fill the same container. A salad built with all three plus a protein eats like a full meal at under ${total(['salad-base', 'chicken', 'fajita', 'lettuce', 'green-salsa']).cal} calories. All three are included at no extra charge, which <a href="/guides/cheap-meals">the value breakdown</a> covers in full. Hunger, not willpower, is what breaks a deficit.`,
      },
      {
        heading: 'If you want the single lowest-calorie order',
        body: `That is a different question and <a href="/diet/low-calorie">the low-calorie page</a> answers it directly, with the floor worked out. This page assumes you are coming back next week.`,
      },
    ],
  },

  {
    slug: 'cheap-meals',
    keyword: 'chipotle cheap meals guide',
    title: 'Chipotle Cheap Meals Guide: Value per Gram of Protein',
    h1: 'Chipotle Cheap Meals Guide',
    description:
      'A Chipotle cheap meals guide: which additions are free, which are premium, and how to get the most protein per dollar without paying for a second entrée.',
    opening: `Value at Chipotle is decided almost entirely by which additions carry a surcharge and which do not, and this Chipotle cheap meals guide works from that division rather than from menu prices, which vary by location and change often. The single most valuable fact: beans, fajita vegetables, salsa, lettuce and rice are included, and each one adds real food to a bowl.`,
    sections: [
      {
        heading: 'What is included versus what is premium',
        body: `Prices differ between restaurants, so this is expressed as tiers rather than dollar figures. Check your own location's menu for the current numbers.`,
        bullets: [
          `Included with an entrée — rice, beans, all four salsas, fajita vegetables, romaine and supergreens`,
          `Premium — guacamole and queso blanco, on every format`,
          `Double protein — charged at roughly a second protein portion, and the only surcharge with a strong nutritional return`,
          `Chips and sides — a separate purchase, and the weakest value per gram of protein on the menu at ${ing('chips').p} g for ${ing('chips').cal} calories (<a href="/menu/chips">the chips breakdown</a>)`,
        ],
      },
      {
        heading: 'The free additions ranked by what they contribute',
        body: `If the goal is the most food and the most protein for one entrée price, these are the scoops to take.`,
        table: {
          rows: [row(ing('black-beans')), row(ing('pinto-beans')), row(ing('white-rice')), row(ing('fajita')), row(ing('corn-salsa')), row(ing('lettuce'))],
          serving: 'Included item',
          caption: 'All available at no extra charge with an entrée at most locations.',
        },
        note: `Double beans is the standout: ${ing('black-beans').p * 2} g of protein and ${ing('black-beans').fib * 2} g of fiber for ${ing('black-beans').cal * 2} calories, generally at no additional cost.`,
      },
      {
        heading: 'A high-value build using no premium items',
        body: `Chicken, white rice, double black beans, roasted chili-corn salsa, fajita vegetables and lettuce — one entrée, no surcharges.`,
        table: {
          rows: [['Value build', total(['chicken', 'white-rice', ['black-beans', 2], 'corn-salsa', 'fajita', 'lettuce'])]],
          serving: 'Build',
        },
        note: `${total(['chicken', 'white-rice', ['black-beans', 2], 'corn-salsa', 'fajita', 'lettuce']).p} g of protein and ${total(['chicken', 'white-rice', ['black-beans', 2], 'corn-salsa', 'fajita', 'lettuce']).fib} g of fiber for ${fmt(total(['chicken', 'white-rice', ['black-beans', 2], 'corn-salsa', 'fajita', 'lettuce']).cal)} calories, without paying for guacamole or a side.`,
      },
      {
        heading: 'Two entrées from one order',
        body: `A burrito or bowl with double protein and double beans divides into two meals of roughly ${Math.round(total([['chicken', 2], 'white-rice', ['black-beans', 2], 'mild-salsa'].map((x) => x)).cal / 2)} calories each, both carrying around ${Math.round(total([['chicken', 2], 'white-rice', ['black-beans', 2], 'mild-salsa']).p / 2)} g of protein. <a href="/guides/meal-prep">The meal-prep guide</a> covers what survives a night in the fridge.`,
      },
    ],
  },

  {
    slug: 'vs-fast-food',
    keyword: 'chipotle vs fast food nutrition',
    noindex: true,
    draftNotice: `This page is held back from publication. The Chipotle figures are verified against our own data set, but the McDonald's, Taco Bell and Subway figures have not been checked against each brand's own published nutrition information, and this page will not go live until they are. Do not cite the competitor numbers below.`,
    title: 'Chipotle vs Fast Food Nutrition: A Real Comparison',
    description:
      'Chipotle vs fast food nutrition compared on calories, protein and sodium against McDonald’s, Taco Bell and Subway, including where Chipotle actually loses.',
    opening: `Chipotle vs fast food nutrition is usually argued as a foregone conclusion, and the numbers are more mixed than that. A standard chicken bowl carries ${N.bowl('chicken').p} g of protein, which beats most fast-food entrées outright. It also carries ${fmt(N.bowl('chicken').na)} mg of sodium, which does not beat them at all.`,
    sections: [
      {
        heading: 'Comparable single entrées',
        body: `Chipotle figures are from the same data used across this site and are verified. The three competitor rows are placeholders pending verification against each brand's own published nutrition information; they are not citable in their current state.`,
        compare: [
          ['Chipotle chicken bowl', `${fmt(N.bowl('chicken').cal)}`, `${N.bowl('chicken').p} g`, `${fmt(N.bowl('chicken').na)} mg`],
          ['Chipotle chicken burrito', `${fmt(N.burrito('chicken').cal)}`, `${N.burrito('chicken').p} g`, `${fmt(N.burrito('chicken').na)} mg`],
          ["McDonald's Big Mac", '590', '25 g', '1,050 mg'],
          ['Taco Bell Burrito Supreme (beef)', '390', '16 g', '1,080 mg'],
          ['Subway 6" oven-roasted turkey', '280', '18 g', '760 mg'],
        ],
      },
      {
        heading: 'Where Chipotle genuinely wins',
        body: `Protein per entrée, and by a wide margin. A chicken bowl delivers ${N.bowl('chicken').p} g where a Big Mac delivers 25 g and a six-inch turkey sub 18 g. Portion control is also in the customer's hands in a way it is not elsewhere — you can halve the rice or drop the tortilla, which is not an option with an assembled burger.`,
      },
      {
        heading: 'Where it loses',
        body: `Sodium and portion size. A ${fmt(N.bowl('chicken').cal)}-calorie bowl is larger than a Big Mac and carries ${fmt(N.bowl('chicken').na - 1050)} mg more sodium. A burrito at ${fmt(N.burrito('chicken').na)} mg is close to a full day's limit in one item. The "fresh ingredients" framing is accurate about sourcing and says nothing about the salt.`,
      },
      {
        heading: 'The fair comparison',
        body: `Like for like on calories, Chipotle returns more protein and more fiber per calorie than any of the three. Like for like on sodium, it is at or above them. Which matters depends on what you are managing — <a href="/guides/sodium">the sodium ranking</a> if it is the latter.`,
      },
    ],
  },

  {
    slug: 'meal-prep',
    keyword: 'chipotle meal prep guide',
    title: 'Chipotle Meal Prep Guide: What Keeps and What Does Not',
    h1: 'Chipotle Meal Prep Guide',
    description:
      'A practical Chipotle meal prep guide: which ingredients survive two days in the fridge, what to order on the side, and how to reheat a bowl without ruining it.',
    opening: `Ordering Chipotle for meal prep works, and the failure mode is textural rather than nutritional. This Chipotle meal prep guide covers which ingredients survive two days in a fridge and which turn a good bowl into a wet one — the answer is mostly about keeping the cold, wet items away from the warm, dry ones until you eat.`,
    sections: [
      {
        heading: 'What holds up, and for how long',
        body: `Assume two days for anything containing meat, and eat it cold or reheated thoroughly rather than lukewarm.`,
        bullets: [
          `Holds well — chicken, steak, barbacoa, carnitas, both rices, both beans, fajita vegetables`,
          `Holds acceptably — cheese, corn salsa`,
          `Degrades fast — guacamole (browns within a day), lettuce and supergreens (wilt under warm rice), sour cream (separates on reheating)`,
          `Do not prep at all — chips, and anything in a flour tortilla, which goes soft overnight`,
        ],
      },
      {
        heading: 'How to order for prep',
        body: `To keep a prepped bowl from going soggy, take the wet and cold components on the side. Most locations put salsa, guacamole, sour cream and lettuce in separate cups without complaint, and it is the single change that makes the difference on day two.`,
        bullets: [
          `Order a bowl rather than a burrito`,
          `Ask for salsa, sour cream, guacamole and greens in separate containers`,
          `Add double protein and double beans, if you are splitting one order into two meals`,
          `Skip the cheese, if you plan to microwave it — cheese re-melts poorly and separates`,
        ],
      },
      {
        heading: 'Splitting one order into two meals',
        body: `A double-protein, double-bean bowl divides cleanly. Each half carries roughly ${Math.round(total([['chicken', 2], 'white-rice', ['black-beans', 2], 'corn-salsa'].map((x) => x)).p / 2)} g of protein and ${Math.round(total([['chicken', 2], 'white-rice', ['black-beans', 2], 'corn-salsa']).cal / 2)} calories, which is a reasonable single meal rather than a token one. <a href="/guides/cheap-meals">The value guide</a> works through which additions are included at no extra charge.`,
        table: {
          rows: [
            ['Whole order', total([['chicken', 2], 'white-rice', ['black-beans', 2], 'corn-salsa'])],
            ['Half, as one meal', total([['chicken', 1], ['white-rice', 0.5], ['black-beans', 1], ['corn-salsa', 0.5]])],
          ],
          serving: 'Portion',
        },
      },
      {
        heading: 'Reheating',
        body: `Rice and beans reheat best with a spoonful of water over them, covered, in short bursts. Meat reheats faster than rice and overcooks if you treat them as one thing — if you are being careful, warm the base first and add the protein for the last thirty seconds.`,
      },
    ],
  },

  {
    slug: 'secret-menu',
    keyword: 'chipotle secret menu',
    title: 'Chipotle Secret Menu: What You Can Actually Order',
    description:
      'The Chipotle secret menu is mostly assembly requests rather than hidden items — the quesarito, burrito bowl in a tortilla, nachos and what each costs you.',
    opening: `The Chipotle secret menu is not a menu. It is five assembly requests that staff will honour if the restaurant is not slammed, and most of them are combinations of things already on the line. Whether any given location will make one depends entirely on how busy it is.`,
    sections: [
      {
        heading: 'The requests that generally work',
        body: `None of these are official, and a polite ask during a quiet period gets much further than naming them at a lunch rush.`,
        bullets: [
          `<strong>Quesarito</strong> — a burrito wrapped in a quesadilla instead of a plain tortilla. Roughly a burrito plus the quesadilla base, so add about ${ing('ques-base').cal} calories to whatever the burrito would have been`,
          `<strong>Burrito bowl with a tortilla on the side</strong> — the same fillings with the ${ing('flour-tortilla').cal}-calorie tortilla kept separate, which is genuinely useful for portion control`,
          `<strong>Nachos</strong> — chips as the base with regular toppings over them. Chips alone are ${ing('chips').cal} calories, so this lands high`,
          `<strong>Double-wrapped burrito</strong> — two tortillas, which is ${ing('flour-tortilla').cal * 2} calories of wrapper before anything goes inside`,
          `<strong>Extra everything</strong> — not secret, but asking for extra fajita vegetables and lettuce costs ${ing('fajita').cal + ing('lettuce').cal} calories and fills a bowl out`,
        ],
      },
      {
        heading: 'What is not real',
        body: `The "free tortilla on the side" and the extra-portion "hacks" that amount to asking for extra portions without paying for them are staff-dependent at best and simply untrue at worst. Anything that would require a second protein portion gets charged as one.`,
      },
      {
        heading: 'The only one worth ordering for nutrition',
        body: `The tortilla on the side. It turns a burrito decision into a portion decision — you can eat half the tortilla, or none of it, and keep the ${fmt(N.burrito('chicken').cal - N.bowl('chicken').cal)}-calorie difference under your control. Everything else on this page adds calories rather than managing them. <a href="/">Build either version in the calculator</a> to see the gap.`,
      },
    ],
  },
];

export const guideBySlug = new Map(GUIDES.map((g) => [g.slug, g]));
