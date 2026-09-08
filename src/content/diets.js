// Diet pages. Each carries its own worked example — no two share an
// ingredient combination — and every total is computed from the shared data.
import { total, item, fmt, N } from '../data/builds.js';
import { REVIEW, longDate } from '../data/review.js';

const ing = (id) => item(id);
const ex = (parts) => ({ parts, totals: total(parts) });

export const DIETS = [
  {
    slug: 'keto',
    keyword: 'keto chipotle order',
    linkLabel: 'Keto — low-carb builds that actually stay low',
    title: 'Keto Chipotle Order: What to Get and the Real Carb Count',
    description:
      'A keto Chipotle order is straightforward once rice and beans are gone: a steak build with cauliflower rice lands near 13 g net carbs. Full arithmetic.',
    verdict: 'Yes — Chipotle is one of the easier chains to eat keto at.',
    opening: `A keto Chipotle order works, and the whole trick is dropping two things rather than avoiding the restaurant. Rice is ${ing('white-rice').c} g of carbohydrate a scoop and black beans are ${ing('black-beans').c} g; leave both out and the rest of the line is close to carb-free. A steak build with cauliflower rice, cheese and guacamole lands at ${total(['steak', 'cauli-rice', 'green-salsa', 'cheese', 'guac']).c} g of total carbohydrate, of which ${total(['steak', 'cauli-rice', 'green-salsa', 'cheese', 'guac']).fib} g is fiber.`,
    order: {
      heading: 'The carb-free half of the line',
      body: `Every protein on the line is effectively carb-free except sofritas (${ing('sofritas').c} g) and plant-based chorizo (${ing('chorizo').c} g). Fats are unrestricted: guacamole, cheese, queso and sour cream all fit comfortably.`,
      bullets: [
        `A salad or bowl base — supergreens at ${ing('supergreens').c} g of carbohydrate, or cauliflower rice at ${ing('cauli-rice').c} g if you want the texture of a grain base back`,
        `Any of chicken, steak, barbacoa, carnitas, carne asada or chicken al pastor`,
        `Guacamole (${ing('guac').c} g carbs, ${ing('guac').fib} g fiber) and cheese (${ing('cheese').c} g)`,
        `Tomatillo-green or tomatillo-red chili salsa, ${ing('green-salsa').c} g and ${ing('red-salsa').c} g respectively`,
      ],
    },
    avoid: {
      heading: 'What to leave off, and what it costs',
      body: `Two items account for almost all the carbohydrate in a typical order, and one condiment undoes a careful build.`,
      bullets: [
        `Rice — ${ing('white-rice').c} g for white, ${ing('brown-rice').c} g for brown`,
        `Beans — ${ing('black-beans').c} g for black, ${ing('pinto-beans').c} g for pinto, though ${ing('black-beans').fib} g of that is fiber`,
        `The flour tortilla at ${ing('flour-tortilla').c} g, which rules out burritos and quesadillas`,
        `Roasted chili-corn salsa at ${ing('corn-salsa').c} g — the one people add without thinking`,
        `Chipotle-honey vinaigrette at ${ing('vinaigrette').c} g carbohydrate and ${ing('vinaigrette').sug} g sugar`,
      ],
    },
    example: {
      heading: 'A worked keto order',
      intro: `Steak on cauliflower rice with tomatillo-green chili salsa, cheese and guacamole.`,
      ...ex(['steak', 'cauli-rice', 'green-salsa', 'cheese', 'guac']),
      note: (t) =>
        `That is ${t.c} g of total carbohydrate with ${t.fib} g of fiber, so roughly ${t.c - t.fib} g net — inside most daily keto allowances for a single meal, with ${t.p} g of protein alongside.`,
    },
    faq: [
      {
        q: 'How many net carbs are in a keto Chipotle bowl?',
        a: `A keto Chipotle bowl built without rice or beans comes to ${total(['steak', 'cauli-rice', 'green-salsa', 'cheese', 'guac']).c} g of total carbohydrate and ${total(['steak', 'cauli-rice', 'green-salsa', 'cheese', 'guac']).fib} g of fiber, or roughly ${total(['steak', 'cauli-rice', 'green-salsa', 'cheese', 'guac']).c - total(['steak', 'cauli-rice', 'green-salsa', 'cheese', 'guac']).fib} g net. Adding black beans would put about ${ing('black-beans').c - ing('black-beans').fib} g net straight back, which is why beans get dropped alongside the rice.`,
      },
      {
        q: 'Is cauliflower rice worth ordering on keto?',
        a: `Yes, cauliflower rice is worth ordering on keto. It costs ${ing('cauli-rice').c} g of carbohydrate for ${ing('cauli-rice').cal} calories, against white rice at ${ing('white-rice').c} g and ${ing('white-rice').cal} calories, and it restores the texture a rice base would have given the bowl. It carries ${ing('cauli-rice').na} mg of sodium, which matters when sodium is also a constraint.`,
      },
      {
        q: 'Can I have sofritas on keto?',
        a: `No, sofritas works against a keto order. It is the one protein with a carb count worth tracking, at ${ing('sofritas').c} g of carbohydrate and ${ing('sofritas').sug} g of sugar from the adobo braise. Every other protein on the line sits between ${ing('chicken').c} and ${ing('steak').c} g. <a href="/menu/sofritas-bowl/">The sofritas breakdown</a> carries the full figures.`,
      },
    ],
  },

  {
    slug: 'vegan',
    keyword: 'vegan chipotle order',
    linkLabel: 'Vegan — what passes, and the guacamole question',
    title: 'Vegan Chipotle Order: Every Item That Passes',
    description:
      'A vegan Chipotle order means sofritas or beans, no dairy, and knowing which extras qualify. Guacamole is vegan; the chipotle-honey vinaigrette is not.',
    verdict: 'Yes — sofritas plus any base, minus the three dairy toppings.',
    opening: `Building a vegan Chipotle order takes one substitution and three refusals. Sofritas is the plant-based protein at ${ing('sofritas').cal} calories and ${ing('sofritas').p} g of protein; cheese, sour cream and queso blanco are the items to decline. The one people get wrong in both directions is guacamole, which contains no dairy at all — it is avocado, lime, cilantro, red onion, jalapeño and salt — while the chipotle-honey vinaigrette contains honey and does not qualify.`,
    order: {
      heading: 'What passes on the line',
      body: `Everything on the line is plant-based except the three dairy toppings and the honey vinaigrette. That leaves a wide build.`,
      bullets: [
        `Sofritas (${ing('sofritas').p} g protein) or plant-based chorizo (${ing('chorizo').p} g protein), the stronger of the two on protein`,
        `Both rice varieties and both bean varieties — beans add ${ing('black-beans').p} g of protein a scoop`,
        `All four salsas`,
        `Guacamole, fajita vegetables, romaine and supergreens`,
      ],
    },
    avoid: {
      heading: 'What disqualifies an order',
      body: `Four items, three of them obvious and one that catches people out.`,
      bullets: [
        `Cheese, sour cream and queso blanco`,
        `Chipotle-honey vinaigrette — the honey is the problem, not the dairy`,
        `The flour tortilla is vegan, so burritos remain available`,
      ],
    },
    example: {
      heading: 'A worked vegan order',
      intro: `Sofritas on brown rice with black beans, roasted chili-corn salsa, guacamole and romaine.`,
      ...ex(['sofritas', 'brown-rice', 'black-beans', 'corn-salsa', 'guac', 'lettuce']),
      note: (t) =>
        `${fmt(t.cal)} calories with ${t.p} g of protein and ${t.fib} g of fiber — more fiber than most meat orders manage, since the protein source itself contributes ${ing('sofritas').fib} g.`,
    },
    faq: [
      {
        q: 'Is Chipotle guacamole vegan?',
        a: `Yes, Chipotle guacamole is vegan. It contains avocado, lime, cilantro, red onion, jalapeño and salt, with no dairy or animal product at any stage. It is also the main fat source in a plant-based build, at ${ing('guac').cal} calories and ${ing('guac').fib} g of fiber a serving. <a href="/menu/guacamole/">The guacamole breakdown</a> carries the full figures.`,
      },
      {
        q: 'How much protein can a vegan Chipotle order have?',
        a: `A vegan Chipotle order reaches ${total(['sofritas', 'brown-rice', 'black-beans', 'corn-salsa', 'guac', 'lettuce']).p} g of protein in the build on this page. Swapping sofritas for plant-based chorizo and doubling the beans takes it to ${total(['chorizo', 'brown-rice', ['black-beans', 2], 'corn-salsa', 'guac', 'lettuce']).p} g. Beans do more of that work than the protein scoop does: black beans carry ${ing('black-beans').p} g against sofritas at ${ing('sofritas').p} g.`,
      },
      {
        q: 'Are Chipotle beans cooked with meat?',
        a: `No, Chipotle beans are not cooked with meat. Both black and pinto beans are prepared without animal products, which makes either safe in a vegan order. Pinto beans historically contained bacon, which is why the question persists. Both varieties carry ${ing('black-beans').p} g of protein for ${ing('black-beans').cal} calories a scoop.`,
      },
    ],
  },

  {
    slug: 'vegetarian',
    keyword: 'vegetarian chipotle order',
    linkLabel: 'Vegetarian — two routes, and the protein gap between them',
    title: 'Vegetarian Chipotle Order: Sofritas or Double Beans?',
    description:
      'A vegetarian Chipotle order has two routes: sofritas, or double beans plus dairy. They land 8 g of protein apart, and here is the full comparison of both.',
    verdict: 'Yes, and with more latitude than a vegan order.',
    opening: `A vegetarian Chipotle order splits into two genuinely different builds, and they are not nutritionally equivalent. The sofritas route gives ${ing('sofritas').p} g of protein from the scoop. The dairy route — double beans with cheese and sour cream — gives ${(ing('black-beans').p * 2 + ing('cheese').p + ing('sour-cream').p)} g from those four items combined. Vegetarians have the option vegans do not, and it is the higher-protein one.`,
    order: {
      heading: 'The two routes',
      body: `Both work. Which you pick depends on whether you want the protein or the lower calorie count.`,
      bullets: [
        `Route one — sofritas: ${ing('sofritas').cal} calories, ${ing('sofritas').p} g protein, ${ing('sofritas').fib} g fiber`,
        `Route two — double beans plus cheese and sour cream: ${ing('black-beans').cal * 2 + ing('cheese').cal + ing('sour-cream').cal} calories, ${ing('black-beans').p * 2 + ing('cheese').p + ing('sour-cream').p} g protein, ${ing('black-beans').fib * 2} g fiber`,
        `Either can take all four salsas, both rice varieties, guacamole and fajita vegetables`,
      ],
    },
    avoid: {
      heading: 'The one thing to check',
      body: `Chipotle's cheese is made with microbial rather than animal rennet, so it suits a vegetarian order. Beyond the meat proteins there is nothing on the line to avoid.`,
      bullets: [
        `Chicken, steak, barbacoa, carnitas, carne asada and chicken al pastor`,
        `Everything else on the line qualifies, including all four salsas and the vinaigrette`,
      ],
    },
    example: {
      heading: 'A worked vegetarian order',
      intro: `Double black beans on white rice with fajita vegetables, fresh tomato salsa, cheese and sour cream — no meat, no sofritas.`,
      ...ex([['black-beans', 2], 'white-rice', 'fajita', 'mild-salsa', 'cheese', 'sour-cream']),
      note: (t) =>
        `${fmt(t.cal)} calories and ${t.p} g of protein — within ${Math.abs(N.bowl('sofritas').p - t.p)} g of a sofritas bowl, with ${t.fib} g of fiber from the double bean scoop.`,
    },
    faq: [
      {
        q: 'Is Chipotle cheese vegetarian?',
        a: `Yes, Chipotle cheese is vegetarian. It is made with microbial rennet rather than animal rennet, which is what disqualifies many cheeses. It contributes ${ing('cheese').p} g of protein and ${ing('cheese').cal} calories per ${ing('cheese').serving} serving, which counts for more in a meat-free build than in a meat one. <a href="/menu/cheese/">The cheese page</a> has the full macros.`,
      },
      {
        q: 'Which vegetarian option has more protein, sofritas or double beans?',
        a: `Double beans carry more protein than sofritas, at ${ing('black-beans').p * 2} g against ${ing('sofritas').p} g. The beans cost ${ing('black-beans').cal * 2 - ing('sofritas').cal} more calories to get there and bring ${ing('black-beans').fib * 2} g of fiber that sofritas does not match. Adding cheese and sour cream on top takes the meat-free total to ${ing('black-beans').p * 2 + ing('cheese').p + ing('sour-cream').p} g.`,
      },
      {
        q: 'Do I get charged for double beans?',
        a: `No, a second scoop of beans is generally included. Beans are not a premium item the way guacamole and queso are, which makes double beans the cheapest protein and fiber addition open to a vegetarian order: ${ing('black-beans').p * 2} g of protein and ${ing('black-beans').fib * 2} g of fiber for ${ing('black-beans').cal * 2} calories.`,
      },
    ],
  },

  {
    slug: 'high-protein',
    keyword: 'high protein chipotle order',
    linkLabel: 'High protein — how far the ceiling actually goes',
    title: 'High Protein Chipotle Order: The 82 g Ceiling',
    description:
      'A high protein Chipotle order tops out near 82 g in a single bowl. Double chicken plus beans and cheese is how you get there, and here is what it costs.',
    verdict: 'Yes — 82 g in one bowl, without any topping tricks.',
    opening: `A high protein Chipotle order has a practical ceiling, and it is worth knowing where it sits before ordering. Double chicken with white rice, black beans, salsa and cheese reaches ${N.doubleBowl('chicken').p} g of protein for ${fmt(N.doubleBowl('chicken').cal)} calories. Chicken is the engine: ${ing('chicken').p} g per scoop at ${Math.round((ing('chicken').p / ing('chicken').cal) * 100 * 10) / 10} g per 100 calories, the best ratio on the line.`,
    order: {
      heading: 'What actually moves the protein number',
      body: `Only four things on the menu contribute protein in quantity, and they stack in a predictable order.`,
      bullets: [
        `Double chicken — ${ing('chicken').p * 2} g, the single largest contribution available`,
        `Beans — ${ing('black-beans').p} g a scoop, and a second scoop is usually free`,
        `Cheese — ${ing('cheese').p} g, or queso blanco at ${ing('queso').p} g`,
        `Rice contributes ${ing('white-rice').p} g and salsas contribute 0 g, so neither is worth optimising`,
      ],
    },
    avoid: {
      heading: 'What does not help',
      body: `Three additions feel like they should raise protein and do not.`,
      bullets: [
        `Guacamole — ${ing('guac').p} g of protein for ${ing('guac').cal} calories, the worst ratio on the menu for this goal`,
        `Sour cream at ${ing('sour-cream').p} g`,
        `Sofritas, at ${ing('sofritas').p} g against chicken's ${ing('chicken').p} g, if protein rather than plant-based is the constraint`,
      ],
    },
    example: {
      heading: 'A worked high-protein order',
      intro: `Double chicken on white rice with black beans, tomatillo-green chili salsa and cheese.`,
      ...ex([['chicken', 2], 'white-rice', 'black-beans', 'green-salsa', 'cheese']),
      note: (t) =>
        `${t.p} g of protein for ${fmt(t.cal)} calories — ${Math.round((t.p / t.cal) * 1000) / 10} g per 100 calories. Choosing green salsa over fresh tomato keeps sodium at ${fmt(t.na)} mg rather than ${fmt(total([['chicken', 2], 'white-rice', 'black-beans', 'mild-salsa', 'cheese']).na)} mg.`,
    },
    faq: [
      {
        q: 'What is the highest-protein order at Chipotle?',
        a: `The highest-protein order at Chipotle is double chicken with beans and cheese, reaching ${N.doubleBowl('chicken').p} g in a single bowl. A second scoop of black beans takes it to ${total([['chicken', 2], 'white-rice', ['black-beans', 2], 'green-salsa', 'cheese']).p} g. Chicken does most of that work at ${ing('chicken').p} g a scoop, the best protein-per-calorie ratio available on the line.`,
      },
      {
        q: 'Does double protein double the sodium too?',
        a: `No, double protein does not double the sodium — it adds only that protein's own. A second scoop of chicken adds ${ing('chicken').na} mg, taking a standard bowl from ${fmt(N.bowl('chicken').na)} mg to ${fmt(N.doubleBowl('chicken').na)} mg. Doubling barbacoa instead would add ${ing('barbacoa').na} mg, so the protein you double decides the size of the penalty.`,
      },
      {
        q: 'Is a high-protein order the same as a bulking order?',
        a: `No, a high-protein order and a bulking order solve different problems. This page covers the protein ceiling in one bowl, which sits near ${N.doubleBowl('chicken').p} g. A bulking order also needs total calories, which turns rice and a second bean scoop into assets rather than things to minimise. <a href="/guides/muscle-gain/">The muscle-gain guide</a> covers that version.`,
      },
    ],
  },

  {
    slug: 'low-calorie',
    keyword: 'low calorie chipotle order',
    linkLabel: 'Low calorie — how low the floor really goes',
    title: 'Low Calorie Chipotle Order: Under 300 Calories Is Possible',
    description:
      'A low calorie Chipotle order can land near 195 calories with 23 g of protein. The floor is lower than most people assume — here is the build to order.',
    verdict: 'Yes — a real, filling order under 300 calories.',
    opening: `The floor on a low calorie Chipotle order is far lower than the menu suggests. Steak on supergreens with tomatillo-green chili salsa and fajita vegetables comes to ${total(['salad-base', 'steak', 'green-salsa', 'fajita']).cal} calories and still carries ${total(['salad-base', 'steak', 'green-salsa', 'fajita']).p} g of protein. Rice, cheese and the tortilla account for most of what a standard bowl weighs; removing all three leaves a substantial plate of food.`,
    order: {
      heading: 'What to build around',
      body: `Volume is free here. The greens, salsas and fajita vegetables cost almost nothing and fill the container.`,
      bullets: [
        `Supergreens (${ing('supergreens').cal} cal) or romaine (${ing('lettuce').cal} cal) as the base`,
        `Steak, carne asada or sofritas at ${ing('steak').cal} calories — the lightest proteins`,
        `Fajita vegetables at ${ing('fajita').cal} calories for real volume`,
        `Tomatillo-green chili salsa at ${ing('green-salsa').cal} calories, the lightest of the four`,
      ],
    },
    avoid: {
      heading: 'The four items that account for most of a bowl',
      body: `Each of these costs more than the entire example order above.`,
      bullets: [
        `Chips at ${ing('chips').cal} calories`,
        `The flour tortilla at ${ing('flour-tortilla').cal}`,
        `Guacamole at ${ing('guac').cal} and the chipotle-honey vinaigrette at ${ing('vinaigrette').cal}`,
        `Rice at ${ing('white-rice').cal} a scoop, or ${ing('white-rice').cal / 2} if you ask for light`,
      ],
    },
    example: {
      heading: 'A worked low-calorie order',
      intro: `Steak on supergreens with tomatillo-green chili salsa and fajita vegetables. No rice, no beans, no cheese.`,
      ...ex(['salad-base', 'steak', 'green-salsa', 'fajita']),
      note: (t) =>
        `${t.cal} calories and ${t.p} g of protein, at ${fmt(t.na)} mg of sodium. Adding black beans takes it to ${total(['salad-base', 'steak', 'green-salsa', 'fajita', 'black-beans']).cal} calories and ${total(['salad-base', 'steak', 'green-salsa', 'fajita', 'black-beans']).fib} g of fiber, which is usually worth the trade.`,
    },
    faq: [
      {
        q: 'What is the lowest-calorie thing you can order at Chipotle?',
        a: `The lowest-calorie order at Chipotle is a salad with one light protein and salsa. Steak on supergreens with tomatillo-green chili salsa and fajita vegetables comes to ${total(['salad-base', 'steak', 'green-salsa', 'fajita']).cal} calories carrying ${total(['salad-base', 'steak', 'green-salsa', 'fajita']).p} g of protein. Dropping the fajita vegetables takes it to ${total(['salad-base', 'steak', 'green-salsa']).cal}. Rice, cheese and the tortilla account for most of what a standard bowl weighs.`,
      },
      {
        q: 'Does ordering light rice help much?',
        a: `Yes, ordering light rice helps, though less than dropping a topping. Light rice saves ${ing('white-rice').cal / 2} calories against a full scoop and halves the carbohydrate to ${ing('white-rice').c / 2} g. Leaving off cheese and guacamole together saves ${ing('cheese').cal + ing('guac').cal} calories, more than three times as much. Light rice is the least disruptive cut of the two.`,
      },
      {
        q: 'Is a low-calorie order enough food?',
        a: `Yes by volume, a low-calorie order fills the same container a bowl uses. Supergreens cost ${ing('supergreens').cal} calories and fajita vegetables ${ing('fajita').cal}, so the container can be full at well under 300 calories. Whether it satisfies you across a week is a separate question, covered in <a href="/guides/weight-loss/">the weight-loss guide</a>.`,
      },
    ],
  },

  {
    slug: 'low-carb',
    keyword: 'low carb chipotle order',
    linkLabel: 'Low carb — which carbs to spend your budget on',
    title: 'Low Carb Chipotle Order: Spend the Budget on Beans',
    description:
      'A low carb Chipotle order is not a keto order. With 40 to 60 g to work with, beans are worth keeping and rice is not. The arithmetic, laid out in full.',
    verdict: 'It depends what your budget is, and beans are the right place to spend it.',
    opening: `Low carb and keto are not the same instruction, and at Chipotle the difference decides whether you keep the beans. A low carb Chipotle order usually has ${'40–60'} g to work with rather than under 20, which changes the answer: black beans cost ${ing('black-beans').c} g but return ${ing('black-beans').fib} g of fiber, a net ${ing('black-beans').c - ing('black-beans').fib} g. Rice costs ${ing('white-rice').c} g and returns ${ing('white-rice').fib} g. One of those is worth paying for.`,
    order: {
      heading: 'Where to spend the carbs',
      body: `Ranked by what you get back per gram of carbohydrate.`,
      bullets: [
        `Beans first — ${ing('black-beans').c} g carbohydrate, ${ing('black-beans').fib} g fiber and ${ing('black-beans').p} g protein`,
        `Fajita vegetables — ${ing('fajita').c} g for ${ing('fajita').cal} calories of volume`,
        `Light rice if you want a grain base — ${ing('white-rice').c / 2} g rather than ${ing('white-rice').c} g`,
        `Cauliflower rice if you do not — ${ing('cauli-rice').c} g`,
      ],
    },
    avoid: {
      heading: 'Where the carbs go without returning anything',
      body: `These add carbohydrate without fiber or protein to justify it.`,
      bullets: [
        `The flour tortilla — ${ing('flour-tortilla').c} g, the largest single carb item on the menu`,
        `A full scoop of white rice at ${ing('white-rice').c} g for ${ing('white-rice').fib} g of fiber`,
        `Roasted chili-corn salsa at ${ing('corn-salsa').c} g when the other three salsas are ${ing('mild-salsa').c} g`,
        `Chipotle-honey vinaigrette at ${ing('vinaigrette').c} g, ${ing('vinaigrette').sug} g of it sugar`,
      ],
    },
    example: {
      heading: 'A worked low-carb order',
      intro: `Chicken with light brown rice, black beans, tomatillo-red chili salsa, cheese and romaine.`,
      ...ex(['chicken', ['brown-rice', 'light'], 'black-beans', 'red-salsa', 'cheese', 'lettuce']),
      note: (t) =>
        `${t.c} g of total carbohydrate with ${t.fib} g of fiber — about ${Math.round((t.c - t.fib) * 10) / 10} g net, for ${t.p} g of protein. A standard chicken bowl by comparison is ${N.bowl('chicken').c} g of carbohydrate.`,
    },
    faq: [
      {
        q: 'How is low carb different from keto at Chipotle?',
        a: `Low carb and keto part company at Chipotle over the beans. Keto drops rice and beans together; low carb usually keeps beans, because ${ing('black-beans').c} g of carbohydrate returns ${ing('black-beans').fib} g of fiber and ${ing('black-beans').p} g of protein. Rice returns ${ing('white-rice').fib} g of fiber for ${ing('white-rice').c} g of carbohydrate, the worse trade of the two. <a href="/diet/keto/">The keto guide</a> covers the stricter build.`,
      },
      {
        q: 'Should I get light rice or no rice?',
        a: `It depends on the carb budget. Light rice costs ${ing('white-rice').c / 2} g of carbohydrate against a full scoop's ${ing('white-rice').c} g, and keeps the volume a rice base gives a bowl. No rice saves the full ${ing('white-rice').c} g and leaves the container short, unless fajita vegetables replace it for ${ing('fajita').cal} calories.`,
      },
    ],
  },

  {
    slug: 'low-sodium',
    keyword: 'low sodium chipotle order',
    byline: `Sodium figures cross-checked against Chipotle's published nutrition data — last verified ${longDate(REVIEW.lastVerified)}. Part of the same ${REVIEW.cadence} review described in <a href="/methodology/">our published methodology</a>.`,
    disclaimer: `This page is for general sodium awareness, not a clinical sodium-restricted diet plan. If you're managing sodium intake for a diagnosed condition such as hypertension or kidney disease, follow the specific limit your doctor or dietitian has given you rather than a general guideline like this one.`,
    linkLabel: 'Low sodium — building under 1,000 mg',
    title: 'Low Sodium Chipotle Order: Getting Under 1,000 mg',
    description:
      'A standard chicken bowl carries 1,610 mg of sodium. A low sodium Chipotle order can land near 890 mg — here is the swap ladder that gets you down there.',
    verdict: 'Achievable, but it takes three deliberate swaps rather than one.',
    opening: `A low sodium Chipotle order starts from an uncomfortable baseline: a standard chicken bowl carries ${fmt(N.bowl('chicken').na)} mg, which is ${Math.round((N.bowl('chicken').na / 2300) * 100)}% of the day's limit in one meal. No single change fixes that, because the sodium is spread across five ingredients rather than concentrated in one. Three specific swaps take the same meal to roughly ${total(['chicken', 'brown-rice', 'lettuce', 'fajita', 'sour-cream', 'black-beans']).na} mg.`,
    order: {
      heading: 'The swap ladder, in order of what it saves',
      body: `Work down this list until you hit your target. Each line is the saving against the standard chicken bowl build.`,
      bullets: [
        `Fresh tomato salsa → tomatillo-green chili: saves ${ing('mild-salsa').na - ing('green-salsa').na} mg, the largest single swap available`,
        `White rice → brown rice: saves ${ing('white-rice').na - ing('brown-rice').na} mg for no calorie change at all`,
        `Cheese → sour cream: saves ${ing('cheese').na - ing('sour-cream').na} mg and keeps a dairy topping on the bowl`,
        `The flour tortilla, dropped from a burrito order: saves ${ing('flour-tortilla').na} mg`,
        `Salsa entirely, with fajita vegetables (${ing('fajita').na} mg) standing in for moisture`,
      ],
    },
    avoid: {
      heading: 'The items that put an order over on their own',
      body: `Ranked by sodium, the worst offenders are not the ones people expect. The protein is rarely the problem.`,
      bullets: [
        `Chipotle-honey vinaigrette — ${ing('vinaigrette').na} mg in one serving, the highest single figure on the menu`,
        `The flour tortilla — ${ing('flour-tortilla').na} mg`,
        `Fresh tomato salsa — ${ing('mild-salsa').na} mg, more than any of the four classic meats`,
        `White rice — ${ing('white-rice').na} mg, more than a scoop of chicken at ${ing('chicken').na} mg`,
        `Chips and guacamole together — ${fmt(ing('chips-guac').na)} mg`,
      ],
    },
    example: {
      heading: 'A worked low-sodium order',
      intro: `Chicken on brown rice with black beans, romaine, fajita vegetables and sour cream — no salsa, no cheese.`,
      ...ex(['chicken', 'brown-rice', 'lettuce', 'fajita', 'sour-cream', 'black-beans']),
      note: (t) =>
        `${fmt(t.na)} mg, or about ${Math.round((t.na / 2300) * 100)}% of the daily limit, for ${fmt(t.cal)} calories and ${t.p} g of protein. Dropping the beans takes it to ${fmt(total(['chicken', 'brown-rice', 'lettuce', 'fajita', 'sour-cream']).na)} mg for anyone going lower.`,
    },
    faq: [
      {
        q: 'Can a Chipotle order be under 1,000 mg of sodium?',
        a: `Yes, a Chipotle order can come in under 1,000 mg of sodium. The worked build on this page is ${fmt(total(['chicken', 'brown-rice', 'lettuce', 'fajita', 'sour-cream', 'black-beans']).na)} mg: chicken, brown rice, black beans, romaine, fajita vegetables and sour cream. Getting there means giving up the salsas and the tortilla, which is a real cost in flavour rather than a painless swap.`,
      },
      {
        q: 'Which protein has the least sodium?',
        a: `Chicken is the protein with the least sodium, at ${ing('chicken').na} mg a serving, with steak next at ${ing('steak').na} mg. Sofritas carries the most at ${ing('sofritas').na} mg, which makes a low-sodium plant-based order genuinely difficult. The spread across the eight proteins is narrower than the spread across the four salsas.`,
      },
      {
        q: 'Why is there so much sodium in the rice?',
        a: `Cilantro-lime rice is salted during cooking and finished with lime, which puts ${ing('white-rice').na} mg of sodium in a scoop of white rice. That is more than a serving of chicken at ${ing('chicken').na} mg. Brown rice carries ${ing('brown-rice').na} mg for the same ${ing('brown-rice').cal} calories. <a href="/guides/sodium/">The sodium guide</a> ranks every ingredient.`,
      },
    ],
  },

  {
    slug: 'whole30',
    keyword: 'whole30 chipotle order',
    linkLabel: 'Whole30 — the compliant list is shorter than you think',
    title: 'Whole30 Chipotle Order: What Actually Complies',
    description:
      'A Whole30 Chipotle order rules out rice, beans, dairy and soy at once. That leaves the meats, greens, fajita veggies, guacamole and the tomatillo salsas.',
    verdict: 'Workable, but the compliant list is short — four items plus a protein.',
    opening: `Whole30 removes more from the Chipotle line than any other diet on this site, because it excludes grains, legumes and dairy simultaneously. A Whole30 Chipotle order therefore drops rice (${ing('white-rice').cal} cal), beans (${ing('black-beans').cal} cal), cheese, sour cream and queso in one go. What survives is meat, greens, fajita vegetables, guacamole and the tomatillo salsas.`,
    order: {
      heading: 'The compliant list',
      body: `Chipotle's meats are cooked in sunflower oil with salt and spices, which keeps them compliant. Sofritas is soy-based and is not.`,
      bullets: [
        `Chicken, steak, barbacoa, carnitas, carne asada — all compliant`,
        `Supergreens, romaine and fajita vegetables`,
        `Guacamole — compliant, and effectively the only fat source left`,
        `Tomatillo-green and tomatillo-red chili salsas`,
      ],
    },
    avoid: {
      heading: 'What is out, and why',
      body: `Three of these are obvious; two are not.`,
      bullets: [
        `Rice and the flour tortilla — grains`,
        `Black and pinto beans — legumes, which surprises people who assume beans are a health food across the board`,
        `Cheese, sour cream and queso blanco — dairy`,
        `Sofritas and plant-based chorizo — soy`,
        `Chipotle-honey vinaigrette — added sugar`,
      ],
    },
    example: {
      heading: 'A worked Whole30 order',
      intro: `Carnitas on romaine with fajita vegetables, tomatillo-green chili salsa and guacamole.`,
      ...ex(['carnitas', 'lettuce', 'fajita', 'green-salsa', 'guac']),
      note: (t) =>
        `${fmt(t.cal)} calories, ${t.p} g of protein and ${t.fib} g of fiber. Without beans or rice the fiber comes almost entirely from the guacamole's ${ing('guac').fib} g.`,
    },
    faq: [
      {
        q: 'Is Chipotle rice Whole30 compliant?',
        a: `No, Chipotle rice is not Whole30 compliant. Rice is a grain, and both white and brown are excluded along with the flour tortilla. Cauliflower rice complies on the grain rule at ${ing('cauli-rice').c} g of carbohydrate and ${ing('cauli-rice').cal} calories, though its preparation is worth checking if you are strict about added ingredients.`,
      },
      {
        q: 'Are Chipotle beans allowed on Whole30?',
        a: `No, Chipotle beans are not allowed on Whole30. Legumes are excluded, which removes ${ing('black-beans').p} g of protein and ${ing('black-beans').fib} g of fiber from an otherwise straightforward bowl. <a href="/diet/paleo/">The paleo guide</a> applies the same rule, and both leave guacamole as the main remaining source of fat and fiber.`,
      },
    ],
  },

  {
    slug: 'gluten-free',
    keyword: 'gluten free chipotle order',
    byline: `Cross-checked against Chipotle's published allergen and nutrition data — last verified ${longDate(REVIEW.allergensLastVerified)}. Part of the same ${REVIEW.cadence} review described in <a href="/methodology/">the same documented method</a>.`,
    disclaimer: `This is general ordering guidance, not medical advice. Chipotle prepares food on shared surfaces and equipment, so cross-contact is possible even when every ingredient chosen is gluten-free. If you have celiac disease or a severe gluten sensitivity, confirm current practices with the restaurant directly.`,
    linkLabel: 'Gluten-free — ingredients versus cross-contact',
    title: 'Gluten Free Chipotle Order: Ingredients and Cross-Contact',
    description:
      'Only the flour tortilla contains gluten at Chipotle. Whether that makes a gluten free order safe depends on cross-contact, which is a separate question.',
    verdict: 'Yes on ingredients. Cross-contact is the part that needs a conversation.',
    opening: `A gluten free Chipotle order is unusually simple on the ingredient list and less simple in practice. The flour tortilla is the only item on the line made with wheat; every protein, rice, bean, salsa and topping is prepared without gluten-containing ingredients. What that does not settle is cross-contact, and for coeliac disease the distinction matters more than the ingredient list does.`,
    order: {
      heading: 'What is safe by ingredient',
      body: `Every item except the flour tortilla, in bowl, salad or crispy-corn-taco form.`,
      bullets: [
        `Every protein, both rices, both beans, all four salsas and every topping`,
        `Crispy and soft corn tortillas — ${ing('taco-shells').cal} calories for three crispy shells`,
        `Chips, which are corn masa fried in dedicated oil`,
      ],
    },
    avoid: {
      heading: 'The tortilla, and the honest caveat',
      body: `Flour tortillas are handled on the same line as everything else, and staff change gloves on request rather than by default. Tortillas are warmed on a shared surface near the assembly area. For a wheat sensitivity this is usually immaterial; for coeliac disease it is the whole question.`,
      bullets: [
        `Flour tortillas — burritos, quesadillas and soft flour tacos`,
        `Fresh gloves, requested at the start of the order`,
        `Ingredients taken from beneath the surface of each container`,
        `A bowl rather than a burrito, which keeps food away from the tortilla station entirely`,
        `The per-ingredient table in <a href="/guides/allergens/">the allergens guide</a>, which lists what contains wheat, dairy and soy`,
      ],
    },
    example: {
      heading: 'A worked gluten-free order',
      intro: `Chicken tacos on crispy corn shells with black beans, roasted chili-corn salsa and cheese.`,
      ...ex(['taco-shells', 'chicken', 'black-beans', 'corn-salsa', 'cheese']),
      note: (t) =>
        `${fmt(t.cal)} calories with ${t.p} g of protein. Crispy corn shells also happen to be the lowest-sodium base on the menu at ${ing('taco-shells').na} mg for all three.`,
    },
    faq: [
      {
        q: 'Is Chipotle safe for coeliac disease?',
        a: `It depends on how sensitive you are, and Chipotle certifies no item as gluten-free. Every ingredient except the flour tortilla is made without gluten-containing ingredients, but shared prep surfaces and shared gloves mean cross-contact is possible. Ordering a bowl and asking for fresh gloves reduces that risk without removing it. That is the honest position rather than a reassurance.`,
      },
      {
        q: 'Are Chipotle chips gluten-free?',
        a: `Yes by ingredient, Chipotle chips are gluten-free. They are corn masa fried in dedicated oil, with no gluten-containing ingredient at any stage. Cross-contact inside the restaurant remains a separate question from the ingredient list. The chips cost ${ing('chips').cal} calories for a ${ing('chips').serving} bag, more than the rice and beans in a bowl combined.`,
      },
      {
        q: 'Which taco shells are gluten-free?',
        a: `Crispy and soft corn tortillas are the gluten-free taco shells. Soft flour tortillas are not, since wheat is the one gluten-containing ingredient on the line. Three crispy corn shells come to ${ing('taco-shells').cal} calories and ${ing('taco-shells').na} mg of sodium, which also makes them the lowest-sodium base Chipotle serves.`,
      },
    ],
  },

  {
    slug: 'dairy-free',
    keyword: 'dairy free chipotle order',
    linkLabel: 'Dairy-free — three items to drop, and one to keep',
    title: 'Dairy Free Chipotle Order: Three Items to Skip',
    description:
      'Only cheese, sour cream and queso blanco contain dairy at Chipotle. Guacamole and all four salsas are dairy-free by default, so a dairy free order is easy.',
    verdict: 'Straightforward — three items out, everything else stays.',
    opening: `Three items are the whole of it. A dairy free Chipotle order means skipping cheese (${ing('cheese').cal} cal), sour cream (${ing('sour-cream').cal} cal) and queso blanco (${ing('queso').cal} cal); nothing else on the line contains dairy. Guacamole is the substitution people reach for and it qualifies — avocado, lime, cilantro, onion, jalapeño and salt, with no dairy at any stage.`,
    order: {
      heading: 'What stays on the menu',
      body: `Everything except the three dairy toppings, which leaves a full-strength order.`,
      bullets: [
        `Every protein, including sofritas and plant-based chorizo`,
        `Both rices, both beans, all four salsas`,
        `Guacamole, fajita vegetables, romaine, supergreens and the flour tortilla`,
        `Chipotle-honey vinaigrette — dairy-free, though it carries ${ing('vinaigrette').na} mg of sodium`,
      ],
    },
    avoid: {
      heading: 'The three, and what they cost to replace',
      body: `Dropping all three removes ${ing('cheese').cal + ing('sour-cream').cal + ing('queso').cal} calories from an order that included them.`,
      bullets: [
        `Cheese — ${ing('cheese').cal} calories, ${ing('cheese').p} g of protein you will need elsewhere`,
        `Sour cream — ${ing('sour-cream').cal} calories`,
        `Queso blanco — ${ing('queso').cal} calories`,
        `Quesadillas, which are built on cheese and cannot be modified`,
        `Anything unlabelled — <a href="/guides/allergens/">the allergen table</a> lists dairy item by item`,
      ],
    },
    example: {
      heading: 'A worked dairy-free order',
      intro: `Barbacoa on white rice with pinto beans, fresh tomato salsa, guacamole and romaine.`,
      ...ex(['barbacoa', 'white-rice', 'pinto-beans', 'mild-salsa', 'guac', 'lettuce']),
      note: (t) =>
        `${fmt(t.cal)} calories, ${t.p} g of protein and ${t.fib} g of fiber, with guacamole standing in for the fat and richness cheese would have provided.`,
    },
    faq: [
      {
        q: 'What replaces cheese in a dairy-free bowl?',
        a: `Guacamole replaces cheese in a dairy-free bowl. It contains no dairy at any stage — avocado, lime, cilantro, red onion, jalapeño and salt — and it brings ${ing('guac').fib} g of fiber that cheese does not. The trade is calories: guacamole is ${ing('guac').cal} against cheese's ${ing('cheese').cal}, so the swap adds ${ing('guac').cal - ing('cheese').cal} calories to the bowl. <a href="/menu/guacamole/">Full macros here</a>.`,
      },
      {
        q: 'Is a dairy-free order automatically lower in calories?',
        a: `No — a dairy-free order is only lower in calories when nothing replaces the dairy. Dropping cheese and sour cream saves ${ing('cheese').cal + ing('sour-cream').cal} calories, and adding guacamole in their place puts ${ing('guac').cal} back, a net change of ${ing('guac').cal - (ing('cheese').cal + ing('sour-cream').cal)} calories. Leaving all three off is what actually lowers the total.`,
      },
      {
        q: 'Does the chipotle-honey vinaigrette contain dairy?',
        a: `No, the chipotle-honey vinaigrette contains no dairy. It contains honey, which rules it out of a <a href="/diet/vegan/">vegan order</a> but not a dairy-free one. What it does carry is ${ing('vinaigrette').na} mg of sodium and ${ing('vinaigrette').sug} g of sugar in one ${ing('vinaigrette').serving} serving, the highest figures of any item on the line.`,
      },
    ],
  },

  {
    slug: 'paleo',
    keyword: 'paleo chipotle order',
    linkLabel: 'Paleo — the beans problem nobody mentions',
    title: 'Paleo Chipotle Order: Beans Are the Catch',
    description:
      'Most people assume Chipotle is easy paleo. Strict paleo excludes legumes, which puts beans out, and that single rule changes a paleo order considerably.',
    verdict: 'Workable, but not as easy as its reputation suggests.',
    opening: `Chipotle has a reputation as the easy paleo option and it is only half deserved. A paleo Chipotle order excludes grains and dairy, which most people expect, and also excludes legumes, which puts black and pinto beans out. That removes ${ing('black-beans').p} g of protein and ${ing('black-beans').fib} g of fiber that a casual "paleo-ish" bowl would have counted on.`,
    order: {
      heading: 'What complies',
      body: `Meat, vegetables and guacamole. The list is short but the portions are generous.`,
      bullets: [
        `Chicken, steak, barbacoa, carnitas, carne asada, chicken al pastor`,
        `Supergreens, romaine, fajita vegetables`,
        `Guacamole — the main fat source once dairy is gone`,
        `Tomatillo salsas; fresh tomato salsa is compliant too, at ${ing('mild-salsa').na} mg of sodium`,
      ],
    },
    avoid: {
      heading: 'What is excluded under strict paleo',
      body: `The beans line is the one that catches people, because it contradicts the assumption that Chipotle is a straightforward paleo restaurant.`,
      bullets: [
        `Black and pinto beans — legumes`,
        `Both rices and the flour tortilla — grains`,
        `Cheese, sour cream and queso blanco — dairy`,
        `Sofritas and plant-based chorizo — soy, which is also a legume`,
        `Roasted chili-corn salsa — corn is a grain`,
      ],
    },
    example: {
      heading: 'A worked paleo order',
      intro: `Carne asada on supergreens with fajita vegetables, tomatillo-red chili salsa and guacamole.`,
      ...ex(['carne-asada', 'salad-base', 'fajita', 'red-salsa', 'guac']),
      note: (t) =>
        `${fmt(t.cal)} calories with ${t.p} g of protein. Ordering double protein is the usual fix for the calorie gap left by dropping rice and beans, taking it to ${fmt(total([['carne-asada', 2], 'salad-base', 'fajita', 'red-salsa', 'guac']).cal)} calories and ${total([['carne-asada', 2], 'salad-base', 'fajita', 'red-salsa', 'guac']).p} g of protein.`,
    },
    faq: [
      {
        q: 'Are beans paleo?',
        a: `No, beans are not paleo. Beans are legumes, which strict paleo excludes alongside grains and dairy. That single rule removes ${ing('black-beans').p} g of protein and ${ing('black-beans').fib} g of fiber from what would otherwise be a straightforward bowl, and it is the difference between a paleo order and the no-rice bowl most people picture. <a href="/diet/whole30/">Whole30</a> applies the same rule.`,
      },
      {
        q: 'Is Chipotle meat cooked in seed oils?',
        a: `Yes, Chipotle cooks its proteins in sunflower oil. Strict paleo excludes seed oils, and most people following paleo tolerate them. No protein on the line is cooked without it, so this is worth knowing rather than assuming either way. The rest of a paleo build — greens, fajita vegetables, guacamole and the tomatillo salsas — is unaffected.`,
      },
    ],
  },
];

export const dietBySlug = new Map(DIETS.map((d) => [d.slug, d]));
