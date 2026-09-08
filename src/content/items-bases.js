// Remaining assembled formats plus the base ingredients (rice, beans).
import { N, item, fmt, BUILDS } from '../data/builds.js';

const bowl = (id) => N.bowl(id);
const ing = (id) => item(id);

export const BASE_ITEMS = [
  {
    slug: 'chicken-salad',
    name: 'Chicken Salad',
    keyword: 'chicken salad calories',
    title: 'Chicken Salad Calories at Chipotle — 455 Without Rice',
    description:
      'A Chipotle chicken salad is 455 calories, 200 below the same bowl. What it does not change is fiber: both land at 9 g. Volume is the real difference here.',
    totals: N.salad('chicken'),
    buildLabel: BUILDS.salad.label,
    openingType: 'myth',
    opening: `Swapping rice for greens is usually sold as a fiber upgrade, and at Chipotle it is not one. A chicken salad on supergreens with black beans, fresh tomato salsa and cheese is ${fmt(N.salad('chicken').cal)} calories and ${N.salad('chicken').fib} g of fiber. The same fillings over white rice come to ${fmt(bowl('chicken').cal)} calories and ${bowl('chicken').fib} g of fiber. Chicken salad calories are ${bowl('chicken').cal - N.salad('chicken').cal} lower; the fiber is identical.`,
    why: {
      heading: 'What the greens actually buy you',
      body: `Supergreens are ${ing('supergreens').cal} calories for a ${ing('supergreens').serving} portion and ${ing('supergreens').fib} g of fiber. White rice is ${ing('white-rice').cal} calories and ${ing('white-rice').fib} g. So the swap removes ${ing('white-rice').cal - ing('supergreens').cal} calories and ${ing('white-rice').c - ing('supergreens').c} g of carbohydrate while leaving fiber where it was. Nearly all the fiber in either version comes from the black beans, at ${ing('black-beans').fib} g. The greens give you volume and crunch for almost no calories — that is a real benefit, just not the one people name.`,
    },
    comparison: {
      heading: 'Chicken salad vs. chicken bowl',
      body: `The salad is lighter by ${bowl('chicken').cal - N.salad('chicken').cal} calories and by ${bowl('chicken').c - N.salad('chicken').c} g of carbohydrate, and lower in sodium by ${fmt(bowl('chicken').na - N.salad('chicken').na)} mg because rice carries ${ing('white-rice').na} mg of its own. Protein is effectively unchanged. If you want more fiber rather than fewer calories, adding fajita vegetables or keeping the beans does more than the base swap.`,
      rows: [
        ['Chicken salad', N.salad('chicken')],
        ['Chicken bowl', bowl('chicken')],
      ],
    },
    faq: [
      {
        q: 'Is a Chipotle salad actually lower in calories?',
        a: `Yes, a Chipotle salad is lower in calories than the equivalent bowl, by ${bowl('chicken').cal - N.salad('chicken').cal} calories, as long as the dressing stays off. The chipotle-honey vinaigrette is ${ing('vinaigrette').cal} calories, which cancels most of that saving and adds ${ing('vinaigrette').na} mg of sodium on top. Without dressing the salad lands at ${fmt(N.salad('chicken').cal)} calories against the bowl's ${fmt(bowl('chicken').cal)}.`,
      },
      {
        q: 'Does the salad come with dressing included?',
        a: `No, the salad dressing is offered separately, so it only counts if you take it. Left off, the supergreens base contributes ${ing('supergreens').cal} calories to the whole order. Taken, the chipotle-honey vinaigrette adds ${ing('vinaigrette').cal} calories, ${ing('vinaigrette').sug} g of sugar and ${ing('vinaigrette').na} mg of sodium — the highest sodium figure of any single item on the menu.`,
      },
      {
        q: 'Which base has the most fiber?',
        a: `No base carries meaningful fiber — the beans do that work, at ${ing('black-beans').fib} g a scoop. Brown rice edges white rice by ${ing('brown-rice').fib - ing('white-rice').fib} g, supergreens contribute ${ing('supergreens').fib} g and cauliflower rice ${ing('cauli-rice').fib} g. Choosing a base for fiber is the wrong lever; <a href="/guides/fiber/">the fiber guide</a> ranks every ingredient by what it actually adds.`,
      },
    ],
  },

  {
    slug: 'chicken-tacos',
    name: 'Chicken Tacos',
    keyword: 'chicken tacos calories',
    title: 'Chicken Tacos Calories at Chipotle — Per Taco and Total',
    description:
      'Three chicken tacos come to 655 calories, roughly 218 each. That per-taco figure is what trips people up when comparing a taco order against a single bowl.',
    totals: N.tacos('chicken'),
    buildLabel: BUILDS.tacos.label,
    openingType: 'direct',
    opening: `An order of chicken tacos at Chipotle is three tacos, and chicken tacos calories are quoted for all three together: ${fmt(N.tacos('chicken').cal)} calories on crispy corn shells with black beans, fresh tomato salsa and cheese. That works out to roughly ${Math.round(N.tacos('chicken').cal / 3)} per taco. Almost every confusion about this menu item comes from mixing those two numbers up.`,
    why: {
      heading: 'Per taco or per order',
      body: `Chipotle sells tacos in threes and publishes nutrition per taco, so a figure like ${Math.round(N.tacos('chicken').cal / 3)} calories is accurate and also not what you are eating. The fillings are divided across three shells rather than multiplied by three — one order of tacos holds roughly the same protein scoop as one bowl, spread thinner.`,
    },
    comparison: {
      heading: 'Three tacos vs. one bowl',
      body: `Built with the same fillings, three chicken tacos come to ${fmt(N.tacos('chicken').cal)} calories against a bowl's ${fmt(bowl('chicken').cal)} — close enough that format is not the deciding factor. Where they part is sodium: ${fmt(N.tacos('chicken').na)} mg for the tacos against ${fmt(bowl('chicken').na)} mg for the bowl, because crispy corn shells carry only ${ing('taco-shells').na} mg for all three where rice carries ${ing('white-rice').na} mg.`,
      rows: [
        ['Chicken tacos (3)', N.tacos('chicken')],
        ['Chicken bowl', bowl('chicken')],
      ],
    },
    faq: [
      {
        q: 'How many calories is one Chipotle chicken taco?',
        a: `One Chipotle chicken taco is roughly ${Math.round(N.tacos('chicken').cal / 3)} calories on a crispy corn shell with beans, salsa and cheese. Ordering fewer than three is not an option, so the practical figure is the ${fmt(N.tacos('chicken').cal)}-calorie order. That total sits close to a chicken bowl at ${fmt(bowl('chicken').cal)} calories, because the same fillings are divided across three shells rather than multiplied.`,
      },
      {
        q: 'Are crispy or soft tortillas lower in calories?',
        a: `Crispy corn shells are the lower-calorie taco base, at ${ing('taco-shells').cal} calories for three. They also carry almost no sodium, at ${ing('taco-shells').na} mg for the full order, which makes them the lightest base on the entire menu on that measure. Soft flour tortillas run higher on both counts, so corn is the lighter choice either way.`,
      },
    ],
  },

  {
    slug: 'chicken-quesadilla',
    name: 'Chicken Quesadilla',
    keyword: 'chicken quesadilla calories',
    title: 'Chicken Quesadilla Calories at Chipotle — 610 Before Sides',
    description:
      'A chicken quesadilla is 610 calories with no rice or beans in it. Per bite it is the densest thing on the menu, because cheese is built into the base.',
    totals: N.quesadilla('chicken'),
    buildLabel: BUILDS.quesadilla.label,
    openingType: 'comparison',
    opening: `A chicken quesadilla is ${fmt(N.quesadilla('chicken').cal)} calories, which sounds modest next to a ${fmt(N.burrito('chicken').cal)}-calorie burrito until you notice what is missing from it. Chicken quesadilla calories cover a tortilla, cheese and meat — no rice, no beans, no salsa, no vegetables. It is the most calorie-dense format on the menu per bite, not the largest total.`,
    why: {
      heading: 'Cheese is not optional here',
      body: `In every other format cheese is a topping you can decline for ${ing('cheese').cal} calories. In a quesadilla it is structural: the tortilla and cheese together are ${ing('ques-base').cal} calories and ${ing('ques-base').f} g of fat before any protein goes in. Saturated fat is where that shows up hardest, at ${N.quesadilla('chicken').sat} g for the finished item.`,
    },
    comparison: {
      heading: 'Quesadilla vs. chicken burrito',
      body: `The burrito is the bigger order at ${fmt(N.burrito('chicken').cal)} calories against ${fmt(N.quesadilla('chicken').cal)}, because it contains rice and beans the quesadilla does not. But the quesadilla delivers ${N.quesadilla('chicken').sat} g of saturated fat to the burrito's ${N.burrito('chicken').sat} g, and only ${N.quesadilla('chicken').fib} g of fiber to the burrito's ${N.burrito('chicken').fib} g. Sides ordered alongside a quesadilla push its total past the burrito quickly.`,
      rows: [
        ['Chicken quesadilla', N.quesadilla('chicken')],
        ['Chicken burrito', N.burrito('chicken')],
      ],
    },
    faq: [
      {
        q: 'Does a quesadilla come with sides?',
        a: `Yes, a quesadilla comes with salsa and sour cream in separate cups rather than inside it, so they only count if you use them. Sour cream adds ${ing('sour-cream').cal} calories and fresh tomato salsa ${ing('mild-salsa').cal}. The quesadilla itself is ${fmt(N.quesadilla('chicken').cal)} calories with chicken, before anything from those cups goes on it. The quesarito in <a href="/guides/secret-menu/">the off-menu requests</a> builds on the same base.`,
      },
      {
        q: 'Why is a quesadilla low in fiber?',
        a: `A quesadilla is low in fiber at ${N.quesadilla('chicken').fib} g because it contains no beans. Beans are the main fiber source in every other format, at ${ing('black-beans').fib} g a scoop, and a quesadilla is built from tortilla, cheese and protein alone. Nearly all of the ${N.quesadilla('chicken').fib} g it does carry comes from the flour tortilla itself.`,
      },
    ],
  },

  {
    slug: 'white-rice',
    name: 'Cilantro-Lime White Rice',
    keyword: 'chipotle white rice calories',
    title: 'Chipotle White Rice Calories — 210 a Scoop',
    description:
      'Chipotle white rice is 210 calories and 40 g of carbohydrate in a 4 oz scoop, plus 350 mg of sodium — more than a serving of chicken carries on its own.',
    kind: 'ingredient',
    ingredientId: 'white-rice',
    totals: ing('white-rice'),
    openingType: 'direct',
    opening: `Chipotle white rice calories come to ${ing('white-rice').cal} for a standard ${ing('white-rice').serving} scoop, carrying ${ing('white-rice').c} g of carbohydrate and ${ing('white-rice').na} mg of sodium. It is the default base in most orders and the single easiest thing to adjust, because asking for light rice halves it to ${ing('white-rice').cal / 2} calories without changing anything else on the plate.`,
    why: {
      heading: 'The sodium in rice surprises people',
      body: `Cilantro-lime rice is salted and finished with lime juice, which puts ${ing('white-rice').na} mg of sodium in a scoop — more than a serving of chicken at ${ing('chicken').na} mg. On a sodium-controlled order the rice is a bigger lever than the meat, and brown rice at ${ing('brown-rice').na} mg is the easy fix.`,
    },
    comparison: {
      heading: 'White rice vs. brown rice',
      body: `Both are ${ing('white-rice').cal} calories a scoop. White carries ${ing('white-rice').c} g of carbohydrate to brown's ${ing('brown-rice').c} g, and ${ing('white-rice').fib} g of fiber to brown's ${ing('brown-rice').fib} g. The meaningful gap is sodium: ${ing('white-rice').na} mg against ${ing('brown-rice').na} mg, a difference of ${ing('white-rice').na - ing('brown-rice').na} mg.`,
      rows: [
        ['White rice', ing('white-rice')],
        ['Brown rice', ing('brown-rice')],
      ],
    },
    faq: [
      {
        q: 'How many calories is light rice at Chipotle?',
        a: `Light rice at Chipotle is about ${ing('white-rice').cal / 2} calories for a half scoop, saving ${ing('white-rice').cal / 2} against a full one and halving the carbohydrate to ${ing('white-rice').c / 2} g. It is the least disruptive calorie cut available, because the bowl keeps a grain base rather than losing the volume entirely. Sodium halves too, from ${ing('white-rice').na} mg to ${ing('white-rice').na / 2} mg.`,
      },
      {
        q: 'Is white rice or cauliflower rice lower in calories?',
        a: `Cauliflower rice is lower in calories than white rice, by a wide margin: ${ing('cauli-rice').cal} against ${ing('white-rice').cal} a scoop. Carbohydrate separates them further, at ${ing('cauli-rice').c} g against ${ing('white-rice').c} g. Cauliflower rice carries ${ing('cauli-rice').na} mg of sodium to white rice's ${ing('white-rice').na} mg, so it wins on that measure too.`,
      },
    ],
  },

  {
    slug: 'brown-rice',
    name: 'Cilantro-Lime Brown Rice',
    keyword: 'chipotle brown rice calories',
    title: 'Chipotle Brown Rice Calories — Same 210 as White',
    description:
      'Brown rice at Chipotle is 210 calories, identical to white. The honest reasons to choose it are 160 mg less sodium and one extra gram of fiber a scoop.',
    kind: 'ingredient',
    ingredientId: 'brown-rice',
    totals: ing('brown-rice'),
    openingType: 'myth',
    opening: `Chipotle brown rice calories are ${ing('brown-rice').cal} a scoop — exactly the same as white rice. Anyone switching to brown expecting a calorie saving is not getting one. What the switch does deliver is ${ing('white-rice').na - ing('brown-rice').na} mg less sodium, ${ing('brown-rice').fib - ing('white-rice').fib} g more fiber and ${ing('white-rice').c - ing('brown-rice').c} g fewer carbohydrates.`,
    why: {
      heading: 'A small, real difference — stated at its actual size',
      body: `One gram of fiber is not a transformation. Brown rice moves a bowl from ${N.bowl('chicken').fib} g of fiber to ${N.bowl('chicken').fib + 1} g, which is a rounding error against the ${ing('black-beans').fib} g the beans already contribute. The sodium saving is the stronger argument, and it is the one worth ordering on.`,
    },
    comparison: {
      heading: 'Brown rice vs. white rice, item by item',
      body: `Calories tie at ${ing('brown-rice').cal}. Fat runs slightly higher in brown at ${ing('brown-rice').f} g against ${ing('white-rice').f} g. Fiber favours brown ${ing('brown-rice').fib} to ${ing('white-rice').fib}, carbohydrate favours brown ${ing('brown-rice').c} to ${ing('white-rice').c}, and sodium favours brown by ${ing('white-rice').na - ing('brown-rice').na} mg. On a bowl that already carries ${fmt(N.bowl('chicken').na)} mg, that last one is the difference that registers.`,
      rows: [
        ['Brown rice', ing('brown-rice')],
        ['White rice', ing('white-rice')],
      ],
    },
    faq: [
      {
        q: 'Is brown rice healthier than white rice at Chipotle?',
        a: `Yes, marginally — brown rice is the better of the two, and not for the reason most people assume. Both are ${ing('brown-rice').cal} calories a scoop. Brown carries ${ing('white-rice').na - ing('brown-rice').na} mg less sodium, one more gram of fiber and ${ing('white-rice').c - ing('brown-rice').c} g fewer carbohydrates. The sodium saving is the argument worth ordering on — see <a href="/diet/low-sodium/">the low-sodium guide</a>.`,
      },
      {
        q: 'Does brown rice have more protein?',
        a: `No, brown rice does not have more protein than white — both sit at ${ing('brown-rice').p} g a scoop. Rice is not a meaningful protein source in either form, contributing ${ing('white-rice').p} g of the ${bowl('chicken').p} g in a standard chicken bowl. The protein in an order comes from the meat scoop, the beans and the cheese.`,
      },
    ],
  },

  {
    slug: 'black-beans',
    name: 'Black Beans',
    keyword: 'chipotle black beans calories',
    title: 'Chipotle Black Beans Calories — 130 and 7 g of Fiber',
    description:
      'Chipotle black beans are 130 calories with 7 g of fiber and 8 g of protein a scoop. Pinto edges them on fiber; the two are otherwise near-identical items.',
    kind: 'ingredient',
    ingredientId: 'black-beans',
    totals: ing('black-beans'),
    openingType: 'direct',
    opening: `Chipotle black beans calories come to ${ing('black-beans').cal} for a ${ing('black-beans').serving} scoop, bringing ${ing('black-beans').fib} g of fiber and ${ing('black-beans').p} g of protein for ${ing('black-beans').na} mg of sodium. Beans are the most efficient thing on the line by a distance: nothing else adds this much fiber and protein for so few calories.`,
    why: {
      heading: 'Where nearly all the fiber in your order comes from',
      body: `A standard chicken bowl contains ${N.bowl('chicken').fib} g of fiber, and ${ing('black-beans').fib} of those come from the beans. Rice contributes ${ing('white-rice').fib} g, salsa ${ing('mild-salsa').fib} g, cheese none. Skipping beans on a keto or low-carb order is the change that quietly strips the fiber out of the meal.`,
    },
    comparison: {
      heading: 'Black beans vs. pinto beans',
      body: `They are close enough that the honest answer is "pick the one you prefer". Calories tie at ${ing('black-beans').cal}, protein ties at ${ing('black-beans').p} g, and sodium ties at ${ing('black-beans').na} mg. Pinto actually carries slightly more fiber — ${ing('pinto-beans').fib} g against black beans' ${ing('black-beans').fib} g — and one gram fewer carbohydrates. Black beans are not the fiber leader; pinto is, narrowly.`,
      rows: [
        ['Black beans', ing('black-beans')],
        ['Pinto beans', ing('pinto-beans')],
      ],
    },
    faq: [
      {
        q: 'Are black beans vegan at Chipotle?',
        a: `Yes, black beans at Chipotle are vegan. Both bean varieties are prepared without animal products, which makes them a staple of any <a href="/diet/vegan/">plant-based order</a> and the main protein source in one. A scoop carries ${ing('black-beans').p} g of protein and ${ing('black-beans').fib} g of fiber for ${ing('black-beans').cal} calories, the most efficient trade on the line.`,
      },
      {
        q: 'How much protein do black beans add?',
        a: `Black beans add ${ing('black-beans').p} g of protein a scoop, for ${ing('black-beans').cal} calories. That is meaningful alongside a meat protein and load-bearing without one: a sofritas bowl draws ${Math.round((ing('black-beans').p / N.bowl('sofritas').p) * 100)}% of its protein from the beans. A second scoop is usually included at no extra charge, which doubles the contribution to ${ing('black-beans').p * 2} g.`,
      },
    ],
  },

  {
    slug: 'pinto-beans',
    name: 'Pinto Beans',
    keyword: 'chipotle pinto beans calories',
    title: 'Chipotle Pinto Beans Calories — 130, and 8 g of Fiber',
    description:
      'Chipotle pinto beans are 130 calories with 8 g of fiber, one gram more than black beans carry. Beyond that single gram the two beans are interchangeable.',
    kind: 'ingredient',
    ingredientId: 'pinto-beans',
    totals: ing('pinto-beans'),
    openingType: 'myth',
    opening: `There is no meaningful nutritional reason to agonise over pinto versus black. Chipotle pinto beans calories are ${ing('pinto-beans').cal} a scoop, identical to black beans, with the same ${ing('pinto-beans').p} g of protein and the same ${ing('pinto-beans').na} mg of sodium. Pinto carries ${ing('pinto-beans').fib} g of fiber against black beans' ${ing('black-beans').fib} g. That one gram is the entire difference.`,
    why: {
      heading: 'Choose on taste, not macros',
      body: `Pinto is cooked softer and seasoned differently, so it changes the texture of a bowl more than its nutrition label. Anyone telling you one of these is materially better for a goal is inventing a distinction the numbers do not support. Where beans genuinely matter is whether you take them at all.`,
    },
    comparison: {
      heading: 'Pinto vs. black, laid out',
      body: `Calories ${ing('pinto-beans').cal} to ${ing('black-beans').cal}. Protein ${ing('pinto-beans').p} g to ${ing('black-beans').p} g. Sodium ${ing('pinto-beans').na} mg to ${ing('black-beans').na} mg. Carbohydrate ${ing('pinto-beans').c} g to ${ing('black-beans').c} g. Fiber ${ing('pinto-beans').fib} g to ${ing('black-beans').fib} g. Four ties and one one-gram edge.`,
      rows: [
        ['Pinto beans', ing('pinto-beans')],
        ['Black beans', ing('black-beans')],
      ],
    },
    faq: [
      {
        q: 'Are Chipotle pinto beans vegetarian?',
        a: `Yes, Chipotle pinto beans are vegetarian. The current recipe is prepared without meat, which was not always true historically — pinto beans once contained bacon, and that is why the question keeps coming up. Both bean varieties now suit <a href="/diet/vegetarian/">vegetarian</a> and vegan orders, at ${ing('pinto-beans').cal} calories and ${ing('pinto-beans').p} g of protein a scoop.`,
      },
      {
        q: 'Can I get both pinto and black beans?',
        a: `Yes, you can get both pinto and black beans in one order. Asking for half of each lands at roughly the same ${ing('pinto-beans').cal} calories as a single scoop split two ways. Asking for full scoops of both doubles the beans to ${ing('black-beans').cal * 2} calories, ${ing('black-beans').p * 2} g of protein and ${ing('black-beans').fib + ing('pinto-beans').fib} g of fiber.`,
      },
    ],
  },

  {
    slug: 'guacamole',
    name: 'Guacamole',
    keyword: 'chipotle guacamole calories',
    title: 'Chipotle Guacamole Calories — 230 for 4 oz',
    description:
      'Chipotle guacamole is 230 calories and 22 g of fat, the heaviest topping on the line — and the one whose calories buy the most fiber and unsaturated fat.',
    kind: 'ingredient',
    ingredientId: 'guac',
    totals: ing('guac'),
    openingType: 'direct',
    opening: `Chipotle guacamole calories are ${ing('guac').cal} for a ${ing('guac').serving} serving, with ${ing('guac').f} g of fat — the heaviest single topping available. It is also the topping people defend hardest, and the tension is real: guacamole is both the most calorie-dense thing you can add and the only topping that brings ${ing('guac').fib} g of fiber with it.`,
    why: {
      heading: 'Calorie-dense and genuinely nutritious are not opposites',
      body: `The ${ing('guac').f} g of fat in guacamole is largely monounsaturated, and only ${ing('guac').sat} g of it is saturated. Compare that with queso blanco, which packs ${ing('queso').sat} g of saturated fat into ${ing('queso').cal} calories. Guacamole earns its calories in a way most toppings do not, but ${ing('guac').cal} calories still count as ${ing('guac').cal} calories on a deficit.`,
    },
    comparison: {
      heading: 'Guacamole vs. queso blanco',
      body: `Guacamole is ${ing('guac').cal - ing('queso').cal} calories heavier than queso at ${ing('queso').cal}. On saturated fat the order reverses sharply: ${ing('guac').sat} g for guacamole against ${ing('queso').sat} g for queso. Guacamole also brings ${ing('guac').fib} g of fiber where queso brings ${ing('queso').fib}. Higher calorie count, better composition.`,
      rows: [
        ['Guacamole', ing('guac')],
        ['Queso blanco', ing('queso')],
      ],
    },
    faq: [
      {
        q: 'Is guacamole worth the extra calories?',
        a: `It depends on how much calorie room the order has. Guacamole's fat profile and ${ing('guac').fib} g of fiber make it the best-composed topping on the line, with only ${ing('guac').sat} g of its ${ing('guac').f} g of fat saturated. But ${ing('guac').cal} calories is a third of a lighter bowl, and on a tight deficit that changes the answer.`,
      },
      {
        q: 'Is Chipotle guacamole dairy-free?',
        a: `Yes, Chipotle guacamole is dairy-free. It contains avocado, lime, cilantro, red onion, jalapeño and salt, with no dairy at any stage of preparation. That makes it the standard fat source on a <a href="/diet/dairy-free/">dairy-free order</a>, standing in for the cheese and sour cream that would otherwise go on the bowl at ${ing('cheese').cal} and ${ing('sour-cream').cal} calories.`,
      },
      {
        q: 'How many calories is chips and guac together?',
        a: `Chips and guacamole together come to roughly ${fmt(ing('chips-guac').cal)} calories as a shared side. That pairs ${ing('chips').cal}-calorie chips with a larger scoop of guacamole than a bowl receives. The combination also carries ${ing('chips-guac').f} g of fat and ${fmt(ing('chips-guac').na)} mg of sodium, more fat than most complete orders contain on their own.`,
      },
    ],
  },
];
