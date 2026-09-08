// Toppings, sides and the four salsas.
import { N, item, fmt, rankBy } from '../data/builds.js';

const ing = (id) => item(id);
const salsas = ['mild-salsa', 'corn-salsa', 'green-salsa', 'red-salsa'];
const salsaByNa = [...salsas].map(ing).sort((a, b) => a.na - b.na);

export const TOPPING_ITEMS = [
  {
    slug: 'queso',
    name: 'Queso Blanco',
    keyword: 'chipotle queso calories',
    title: 'Chipotle Queso Calories — 120, and 6 g of Saturated Fat',
    description:
      'Chipotle queso blanco is 120 calories, roughly half of guacamole. On saturated fat the order flips: queso carries 6 g of it against guacamole’s 3.5 g.',
    kind: 'ingredient',
    ingredientId: 'queso',
    totals: ing('queso'),
    openingType: 'myth',
    opening: `Queso gets treated as the indulgent choice and guacamole as the virtuous one, which the numbers only half support. Chipotle queso calories are ${ing('queso').cal} for a ${ing('queso').serving} serving — ${ing('guac').cal - ing('queso').cal} fewer than guacamole. Where queso loses is saturated fat, at ${ing('queso').sat} g against guacamole's ${ing('guac').sat} g.`,
    why: {
      heading: 'Two different arguments, often confused',
      body: `If you are counting calories, queso is the cheaper add-on of the two. If you are watching saturated fat, it is nearly twice the cost. Both statements are true at once, which is why "is queso worse than guac" has no clean answer — it depends entirely on which number you are managing.`,
    },
    comparison: {
      heading: 'Queso vs. guacamole',
      body: `Queso: ${ing('queso').cal} calories, ${ing('queso').f} g fat, ${ing('queso').sat} g saturated, ${ing('queso').p} g protein, ${ing('queso').fib} g fiber, ${ing('queso').na} mg sodium. Guacamole: ${ing('guac').cal} calories, ${ing('guac').f} g fat, ${ing('guac').sat} g saturated, ${ing('guac').p} g protein, ${ing('guac').fib} g fiber, ${ing('guac').na} mg sodium. Queso wins on calories and protein; guacamole wins on fat quality and fiber.`,
      rows: [
        ['Queso blanco', ing('queso')],
        ['Guacamole', ing('guac')],
      ],
    },
    faq: [
      {
        q: 'Is queso or guacamole lower in calories?',
        a: `Queso is lower in calories than guacamole, by ${ing('guac').cal - ing('queso').cal}: ${ing('queso').cal} against ${ing('guac').cal}. On saturated fat the order reverses, with queso at ${ing('queso').sat} g against guacamole's ${ing('guac').sat} g. Queso also returns ${ing('queso').p} g of protein to guacamole's ${ing('guac').p} g, while guacamole brings ${ing('guac').fib} g of fiber that queso does not.`,
      },
      {
        q: 'Is Chipotle queso gluten-free?',
        a: `Yes, Chipotle queso blanco is made without gluten-containing ingredients. It is dairy-based, which rules it out of any <a href="/diet/dairy-free/">dairy-free order</a> but not a gluten-free one. Cross-contact on a shared line remains a separate question from the ingredient list, covered in <a href="/diet/gluten-free/">the gluten-free guide</a> along with what to ask for at the counter.`,
      },
    ],
  },

  {
    slug: 'chips',
    name: 'Chips',
    keyword: 'chipotle chips calories',
    title: 'Chipotle Chips Calories — 540 for a Side',
    description:
      'A side of Chipotle chips is 540 calories — more than any protein scoop on the menu, and more than the rice and beans in a standard chicken bowl combined.',
    kind: 'ingredient',
    ingredientId: 'chips',
    totals: ing('chips'),
    openingType: 'direct',
    opening: `Chipotle chips calories come to ${ing('chips').cal} for a ${ing('chips').serving} bag, which is more than any protein on the menu and more than the rice and beans in a standard bowl put together (${ing('white-rice').cal + ing('black-beans').cal} calories). Chips are ordered as an afterthought and they are the largest single decision in most orders.`,
    why: {
      heading: 'A side that outweighs the meal it accompanies',
      body: `Adding chips to a ${fmt(N.bowl('chicken').cal)}-calorie chicken bowl produces a ${fmt(N.bowl('chicken').cal + ing('chips').cal)}-calorie meal — a ${Math.round((ing('chips').cal / N.bowl('chicken').cal) * 100)}% increase from something that arrives in a paper bag on the side. The fat is where it concentrates: ${ing('chips').f} g, fried in sunflower oil and finished with lime and salt.`,
    },
    comparison: {
      heading: 'Chips alone vs. chips and guacamole',
      body: `Ordered with guacamole the side reaches roughly ${fmt(ing('chips-guac').cal)} calories, because the guacamole portion served with chips is larger than the ${ing('guac').serving} scoop that goes in a bowl. That combination also carries ${fmt(ing('chips-guac').na)} mg of sodium and ${ing('chips-guac').f} g of fat — more fat than most complete orders.`,
      rows: [
        ['Chips', ing('chips')],
        ['Chips & guacamole', ing('chips-guac')],
      ],
    },
    faq: [
      {
        q: 'How many calories in a half bag of chips?',
        a: `A half bag of Chipotle chips is around ${ing('chips').cal / 2} calories, with roughly ${ing('chips').f / 2} g of fat and ${ing('chips').na / 2} mg of sodium. Splitting the bag is the only portion control available, since Chipotle does not sell a smaller size. A full bag is ${ing('chips').cal} calories, more than the rice and beans in a bowl combined.`,
      },
      {
        q: 'Do chips count as a side or a topping?',
        a: `Chips count as a side, and the distinction matters more than it sounds. Toppings sit inside the entrée price and inside the bowl; chips are a separate purchase that adds ${ing('chips').cal} calories on top of a finished meal rather than within it. A chicken bowl with chips reaches ${fmt(N.bowl('chicken').cal + ing('chips').cal)} calories.`,
      },
      {
        q: 'Why are Chipotle chips so high in fat?',
        a: `Chipotle chips are high in fat because they are fried in sunflower oil, which puts ${ing('chips').f} g into a ${ing('chips').serving} bag. Corn masa itself contributes almost none of that — the oil is effectively the whole figure. The chips are finished with lime and salt, which accounts for the ${ing('chips').na} mg of sodium alongside it.`,
      },
    ],
  },

  {
    slug: 'sour-cream',
    name: 'Sour Cream',
    keyword: 'chipotle sour cream calories',
    title: 'Chipotle Sour Cream Calories — 110 for 2 oz',
    description:
      'Chipotle sour cream is 110 calories for 2 oz: the same total as cheese spread over twice the volume, and 30 mg of sodium against cheese’s 190.',
    kind: 'ingredient',
    ingredientId: 'sour-cream',
    totals: ing('sour-cream'),
    openingType: 'comparison',
    opening: `Sour cream and cheese both land at ${ing('sour-cream').cal} calories, which makes them look interchangeable until you check the serving size. Chipotle sour cream calories are ${ing('sour-cream').cal} for a ${ing('sour-cream').serving} portion; cheese is ${ing('cheese').cal} for ${ing('cheese').serving}. Per ounce, sour cream is half the calorie density.`,
    why: {
      heading: 'The lowest-sodium topping on the line',
      body: `At ${ing('sour-cream').na} mg, sour cream carries less sodium than anything else you can add — less than lettuce-adjacent supergreens at ${ing('supergreens').na} mg, and a fraction of cheese at ${ing('cheese').na} mg. On a sodium-controlled order it is the one dairy topping that costs almost nothing.`,
    },
    comparison: {
      heading: 'Sour cream vs. cheese, per ounce',
      body: `Sour cream delivers ${ing('sour-cream').cal / 2} calories and ${ing('sour-cream').f / 2} g of fat per ounce. Cheese delivers ${ing('cheese').cal} calories and ${ing('cheese').f} g of fat per ounce. Cheese returns ${ing('cheese').p} g of protein against sour cream's ${ing('sour-cream').p} g, and costs ${ing('cheese').na - ing('sour-cream').na} mg more sodium.`,
      rows: [
        ['Sour cream', ing('sour-cream')],
        ['Cheese', ing('cheese')],
      ],
    },
    faq: [
      {
        q: 'Does sour cream have less sodium than cheese?',
        a: `Yes, sour cream has considerably less sodium than cheese: ${ing('sour-cream').na} mg against ${ing('cheese').na} mg. That makes sour cream the lowest-sodium topping on the line and the one dairy option that survives a sodium-controlled order. Both land at ${ing('sour-cream').cal} calories, though sour cream spreads them over ${ing('sour-cream').serving} where cheese uses ${ing('cheese').serving}.`,
      },
      {
        q: 'How many calories is light sour cream?',
        a: `Light sour cream is roughly ${ing('sour-cream').cal / 2} calories, since asking for light halves the portion rather than changing the product. Chipotle does not stock a reduced-fat version, so portion size is the only variable available. A half portion also halves the fat to ${ing('sour-cream').f / 2} g and the saturated fat to ${ing('sour-cream').sat / 2} g.`,
      },
    ],
  },

  {
    slug: 'cheese',
    name: 'Cheese',
    keyword: 'chipotle cheese calories',
    title: 'Chipotle Cheese Calories — 110 an Ounce',
    description:
      'Chipotle cheese calories run 110 an ounce, with 6 g of protein and 5 g of saturated fat, which makes it the densest dairy topping on the line by weight.',
    kind: 'ingredient',
    ingredientId: 'cheese',
    totals: ing('cheese'),
    openingType: 'direct',
    opening: `Chipotle cheese calories are ${ing('cheese').cal} for a ${ing('cheese').serving} portion, which packs more into less volume than any other topping on the line. That ounce carries ${ing('cheese').f} g of fat, ${ing('cheese').sat} g of it saturated, alongside ${ing('cheese').p} g of protein and ${ing('cheese').na} mg of sodium.`,
    why: {
      heading: 'The protein nobody counts',
      body: `Cheese is the only topping other than queso that contributes meaningful protein — ${ing('cheese').p} g, the same as a scoop of beans. In a standard chicken bowl it supplies ${ing('cheese').p} of the ${N.bowl('chicken').p} g total. That does not make it a protein source worth ordering for, but it does mean dropping it costs slightly more than the calorie count suggests.`,
    },
    comparison: {
      heading: 'Cheese vs. sour cream, ounce for ounce',
      body: `Both total ${ing('cheese').cal} calories as served, but cheese does it in ${ing('cheese').serving} and sour cream in ${ing('sour-cream').serving}. Cheese brings ${ing('cheese').p} g of protein to sour cream's ${ing('sour-cream').p} g and ${ing('cheese').sat} g of saturated fat to sour cream's ${ing('sour-cream').sat} g. Sodium is the clearest split: ${ing('cheese').na} mg against ${ing('sour-cream').na} mg.`,
      rows: [
        ['Cheese', ing('cheese')],
        ['Sour cream', ing('sour-cream')],
      ],
    },
    faq: [
      {
        q: 'What kind of cheese does Chipotle use?',
        a: `Chipotle uses a shredded Monterey Jack and white cheddar blend, made with microbial rennet rather than animal rennet. That makes the cheese suitable for a <a href="/diet/vegetarian/">vegetarian order</a> but not a <a href="/diet/dairy-free/">dairy-free</a> one. A ${ing('cheese').serving} serving carries ${ing('cheese').cal} calories, ${ing('cheese').p} g of protein and ${ing('cheese').sat} g of saturated fat.`,
      },
      {
        q: 'How much does skipping cheese save?',
        a: `Skipping cheese saves ${ing('cheese').cal} calories and ${ing('cheese').na} mg of sodium, taking a standard chicken bowl from ${fmt(N.bowl('chicken').cal)} to ${fmt(N.bowl('chicken').cal - ing('cheese').cal)} calories. It also removes ${ing('cheese').p} g of protein and ${ing('cheese').sat} g of saturated fat. On a meat-free order that protein loss counts for more than it does alongside a full scoop of chicken.`,
      },
    ],
  },

  {
    slug: 'lettuce',
    name: 'Romaine Lettuce',
    keyword: 'chipotle lettuce calories',
    title: 'Chipotle Lettuce Calories — 5 per Serving',
    description:
      'Chipotle romaine lettuce is 5 calories with no sodium at all, which is why a Chipotle salad reads low-calorie even when the container arrives full.',
    kind: 'ingredient',
    ingredientId: 'lettuce',
    totals: ing('lettuce'),
    openingType: 'direct',
    opening: `Chipotle lettuce calories are ${ing('lettuce').cal} for a ${ing('lettuce').serving} serving, with ${ing('lettuce').na} mg of sodium — the only item on the entire line that contributes literally none. Lettuce is the reason a salad container can look full and still total less than a bowl: volume and calories are unrelated here.`,
    why: {
      heading: 'Why big portions can still be light',
      body: `A salad base looks like the largest single component of an order and contributes about the same as a splash of salsa. Someone comparing a full salad container against a bowl by eye will consistently overestimate the salad. The calories in either order live in the rice, the protein and the toppings — never the greens.`,
    },
    comparison: {
      heading: 'Romaine vs. supergreens',
      body: `Supergreens — a kale, baby spinach and romaine blend — are ${ing('supergreens').cal} calories against romaine's ${ing('lettuce').cal}, with ${ing('supergreens').p} g of protein and ${ing('supergreens').na} mg of sodium. Both are rounding errors. Supergreens is the standard salad base; romaine is the shredded topping. Choose on texture.`,
      rows: [
        ['Romaine lettuce', ing('lettuce')],
        ['Supergreens mix', ing('supergreens')],
      ],
    },
    faq: [
      {
        q: 'Can I add lettuce to a bowl for free?',
        a: `Yes, lettuce is free at the counter and nearly free nutritionally, at ${ing('lettuce').cal} calories a serving with ${ing('lettuce').na} mg of sodium. It is the cheapest way to add bulk to a bowl short of fajita vegetables, which cost ${ing('fajita').cal} calories and bring ${ing('fajita').fib} g of fiber. Neither addition changes a calorie total in any way that registers.`,
      },
      {
        q: 'Which is better as a salad base, romaine or supergreens?',
        a: `Neither romaine nor supergreens is meaningfully better as a salad base. Supergreens carry ${ing('supergreens').p} g of protein and ${ing('supergreens').fib} g of fiber against romaine's ${ing('lettuce').p} g and ${ing('lettuce').fib} g, a difference under one gram either way. Supergreens are the standard salad base and romaine the shredded topping, so texture is the real choice.`,
      },
    ],
  },

  {
    slug: 'fajita-veggies',
    name: 'Fajita Vegetables',
    keyword: 'chipotle fajita veggies calories',
    title: 'Chipotle Fajita Veggies Calories — 20 a Scoop',
    description:
      'Chipotle fajita veggies calories total just 20 for a full scoop of grilled peppers and onions, which makes them the cheapest way to add volume to a bowl.',
    kind: 'ingredient',
    ingredientId: 'fajita',
    totals: ing('fajita'),
    openingType: 'direct',
    opening: `Chipotle fajita veggies calories come to ${ing('fajita').cal} for a ${ing('fajita').serving} scoop of grilled peppers and onions, carrying ${ing('fajita').fib} g of fiber and ${ing('fajita').na} mg of sodium. For anyone trying to make a lighter bowl feel like a full meal, this is the most effective scoop on the line.`,
    why: {
      heading: 'Bulk without a calorie cost',
      body: `Cutting rice from a bowl removes ${ing('white-rice').cal} calories and a lot of the volume with it. Replacing that volume with fajita vegetables costs ${ing('fajita').cal} calories — you keep a full container of food at a ${ing('white-rice').cal - ing('fajita').cal}-calorie saving. The trade-off is ${ing('fajita').na} mg of sodium, since the vegetables are grilled with seasoning.`,
    },
    comparison: {
      heading: 'Fajita vegetables vs. lettuce',
      body: `Lettuce is lighter at ${ing('lettuce').cal} calories and carries no sodium, but it does not eat like a hot ingredient. Fajita vegetables cost ${ing('fajita').cal - ing('lettuce').cal} more calories and ${ing('fajita').na} mg more sodium for something that behaves like part of the meal rather than a garnish.`,
      rows: [
        ['Fajita vegetables', ing('fajita')],
        ['Romaine lettuce', ing('lettuce')],
      ],
    },
    faq: [
      {
        q: 'Are fajita veggies cooked in oil?',
        a: `Yes, fajita vegetables are grilled with a small amount of oil and seasoning. The fat contribution stays negligible at ${ing('fajita').f} g, but the seasoning is where the ${ing('fajita').na} mg of sodium comes from. For ${ing('fajita').cal} calories a scoop, the peppers and onions remain the cheapest way to add real volume to a bowl.`,
      },
      {
        q: 'Do fajita veggies count towards fiber?',
        a: `Yes, fajita veggies contribute ${ing('fajita').fib} g of fiber a scoop. That is modest next to black beans at ${ing('black-beans').fib} g or guacamole at ${ing('guac').fib} g, but it stacks with them at a cost of only ${ing('fajita').cal} calories. <a href="/guides/fiber/">The fiber guide</a> shows how far those combinations reach against a daily target.`,
      },
    ],
  },

  {
    slug: 'salsa-verde',
    name: 'Tomatillo-Green Chili Salsa',
    keyword: 'chipotle salsa verde calories',
    title: 'Chipotle Salsa Verde Calories — 15, and the Lowest Sodium',
    description:
      'Chipotle salsa verde is 15 calories a serving with 260 mg of sodium, the lightest of the four salsas on both counts. Plus the four-way sodium comparison.',
    kind: 'ingredient',
    ingredientId: 'green-salsa',
    totals: ing('green-salsa'),
    openingType: 'direct',
    opening: `Chipotle salsa verde calories are ${ing('green-salsa').cal} for a ${ing('green-salsa').serving} serving, and its ${ing('green-salsa').na} mg of sodium is the lowest of the four salsas on the line. The salsas get treated as interchangeable garnishes; on sodium they range from ${salsaByNa[0].na} mg to ${salsaByNa[3].na} mg, a spread wider than the gap between most proteins.`,
    why: {
      heading: 'The four-salsa sodium spread',
      body: `Ranked lowest to highest: ${salsaByNa.map((s) => `${s.name} at ${s.na} mg`).join(', ')}. Choosing the lightest instead of the heaviest saves ${salsaByNa[3].na - salsaByNa[0].na} mg — more than dropping cheese, and more than switching from barbacoa to chicken. It is the highest-leverage swap on the menu that costs nothing in calories.`,
    },
    comparison: {
      heading: 'Salsa verde vs. fresh tomato salsa',
      body: `Fresh tomato salsa is the mildest in heat and the heaviest in sodium at ${ing('mild-salsa').na} mg. Salsa verde is medium heat and ${ing('green-salsa').na} mg. Calories separate them by ${ing('mild-salsa').cal - ing('green-salsa').cal}, which is irrelevant; the ${ing('mild-salsa').na - ing('green-salsa').na} mg sodium gap is not.`,
      rows: [
        ['Tomatillo-green chili salsa', ing('green-salsa')],
        ['Fresh tomato salsa', ing('mild-salsa')],
      ],
    },
    faq: [
      {
        q: 'Which Chipotle salsa has the least sodium?',
        a: `Tomatillo-green chili salsa has the least sodium of the four, at ${ing('green-salsa').na} mg. Fresh tomato salsa carries the most at ${ing('mild-salsa').na} mg, and it is the mildest of the four on heat. Roasted chili-corn sits at ${ing('corn-salsa').na} mg and tomatillo-red chili at ${ing('red-salsa').na} mg, a spread of ${ing('mild-salsa').na - ing('green-salsa').na} mg across the set.`,
      },
      {
        q: 'How spicy is salsa verde?',
        a: `Chipotle rates salsa verde as medium heat. Heat and sodium do not track together here: this medium salsa is the lightest of the four at ${ing('green-salsa').na} mg, while the mild fresh tomato salsa is the heaviest at ${ing('mild-salsa').na} mg. Salsa verde is also the lowest-calorie of the four, at ${ing('green-salsa').cal} calories a serving.`,
      },
    ],
  },

  {
    slug: 'fresh-tomato-salsa',
    name: 'Fresh Tomato Salsa',
    keyword: 'chipotle fresh tomato salsa calories',
    title: 'Chipotle Fresh Tomato Salsa Calories — 25, but 550 mg Sodium',
    description:
      'Chipotle fresh tomato salsa is 25 calories and the mildest on the menu, yet it carries 550 mg of sodium — more than any other salsa, and more than chicken.',
    kind: 'ingredient',
    ingredientId: 'mild-salsa',
    totals: ing('mild-salsa'),
    openingType: 'myth',
    opening: `The mildest salsa on the menu is also the saltiest, which is not what anyone expects. Chipotle fresh tomato salsa calories are only ${ing('mild-salsa').cal} for a ${ing('mild-salsa').serving} serving, but it carries ${ing('mild-salsa').na} mg of sodium — more than a scoop of chicken (${ing('chicken').na} mg), more than barbacoa (${ing('barbacoa').na} mg), and the most of the four salsas.`,
    why: {
      heading: 'Mild refers to heat, not to salt',
      body: `Pico de gallo is diced tomato, onion, cilantro, jalapeño and lime. The salt is what makes raw tomato taste of anything. People ordering it as the "safe" option are usually thinking about spice tolerance, and inadvertently choosing the highest-sodium salsa available. If you want mild heat and low sodium, there is no perfect option; tomatillo-green chili at ${ing('green-salsa').na} mg is the closest compromise.`,
    },
    comparison: {
      heading: 'Fresh tomato vs. roasted chili-corn',
      body: `Roasted chili-corn is the heavier salsa on calories — ${ing('corn-salsa').cal} against ${ing('mild-salsa').cal} — and the lighter one on sodium at ${ing('corn-salsa').na} mg against ${ing('mild-salsa').na} mg. Corn brings ${ing('corn-salsa').c} g of carbohydrate and ${ing('corn-salsa').fib} g of fiber; fresh tomato brings ${ing('mild-salsa').c} g and ${ing('mild-salsa').fib} g.`,
      rows: [
        ['Fresh tomato salsa', ing('mild-salsa')],
        ['Roasted chili-corn salsa', ing('corn-salsa')],
      ],
    },
    faq: [
      {
        q: 'Is fresh tomato salsa the healthiest option?',
        a: `It depends which number you are managing, and fresh tomato salsa only wins on one of them. On calories it is close to free at ${ing('mild-salsa').cal} a serving. On sodium it is the worst of the four salsas at ${ing('mild-salsa').na} mg, more than a scoop of chicken carries. For anyone tracking sodium, tomatillo-green chili at ${ing('green-salsa').na} mg is the better pick.`,
      },
      {
        q: 'What is pico de gallo at Chipotle?',
        a: `Pico de gallo is the same thing as fresh tomato salsa at Chipotle — the menu name changed, the recipe did not. It is diced tomato, red onion, cilantro, jalapeño, lime and salt, at ${ing('mild-salsa').cal} calories and ${ing('mild-salsa').na} mg of sodium per ${ing('mild-salsa').serving} serving. Chipotle rates it mild on heat.`,
      },
    ],
  },

  {
    slug: 'roasted-chili-corn-salsa',
    name: 'Roasted Chili-Corn Salsa',
    keyword: 'chipotle roasted chili-corn salsa calories',
    title: 'Chipotle Roasted Chili-Corn Salsa Calories: 80 a Serving',
    description:
      'Chipotle roasted chili-corn salsa calories come to 80, with 16 g of carbohydrate — the only salsa with a carb count worth tracking, four times the rest.',
    kind: 'ingredient',
    ingredientId: 'corn-salsa',
    totals: ing('corn-salsa'),
    openingType: 'direct',
    opening: `Chipotle roasted chili-corn salsa calories are ${ing('corn-salsa').cal} for a ${ing('corn-salsa').serving} serving, carrying ${ing('corn-salsa').c} g of carbohydrate. Every other salsa on the line sits at ${ing('mild-salsa').c} g. Corn is a starch, and this is the one condiment on the menu that can quietly undo a low-carb order.`,
    why: {
      heading: 'The salsa that counts against a carb budget',
      body: `Sixteen grams is more carbohydrate than a scoop of cauliflower rice (${ing('cauli-rice').c} g) and roughly three-quarters of what black beans bring (${ing('black-beans').c} g). On a keto order built carefully around dropping rice and beans, a scoop of corn salsa puts a meaningful share of it straight back. It also brings ${ing('corn-salsa').fib} g of fiber and ${ing('corn-salsa').sug} g of sugar.`,
    },
    comparison: {
      heading: 'Roasted chili-corn vs. fresh tomato',
      body: `Corn salsa costs ${ing('corn-salsa').cal - ing('mild-salsa').cal} more calories and ${ing('corn-salsa').c - ing('mild-salsa').c} g more carbohydrate than fresh tomato salsa, and saves ${ing('mild-salsa').na - ing('corn-salsa').na} mg of sodium. It is the better choice on a sodium-controlled order and the worse one on a carb-controlled order — an unusually clean trade-off.`,
      rows: [
        ['Roasted chili-corn salsa', ing('corn-salsa')],
        ['Fresh tomato salsa', ing('mild-salsa')],
      ],
    },
    faq: [
      {
        q: 'Is corn salsa keto-friendly?',
        a: `No, corn salsa is not keto-friendly. At ${ing('corn-salsa').c} g of carbohydrate a serving it carries four times what any other salsa does, since corn is a starch. That is more than a scoop of cauliflower rice at ${ing('cauli-rice').c} g. <a href="/diet/keto/">The keto guide</a> recommends the two tomatillo salsas instead, at ${ing('green-salsa').c} g each.`,
      },
      {
        q: 'How spicy is roasted chili-corn salsa?',
        a: `Chipotle rates roasted chili-corn salsa as medium heat. The roasted poblano and jalapeño provide that heat, and the sweetness of the corn partly offsets it. The corn is also why this salsa carries ${ing('corn-salsa').c} g of carbohydrate and ${ing('corn-salsa').sug} g of sugar, against ${ing('mild-salsa').c} g and ${ing('mild-salsa').sug} g for fresh tomato salsa.`,
      },
    ],
  },

  {
    slug: 'hot-salsa',
    name: 'Tomatillo-Red Chili Salsa',
    keyword: 'chipotle hot salsa calories',
    title: 'Chipotle Hot Salsa Calories — 30, Spice Is Not the Issue',
    description:
      'Chipotle’s hot tomatillo-red chili salsa is 30 calories. Heat level says nothing about nutrition here — the 500 mg of sodium is the figure that matters.',
    kind: 'ingredient',
    ingredientId: 'red-salsa',
    totals: ing('red-salsa'),
    openingType: 'myth',
    opening: `Spice level and calorie count have nothing to do with each other, and the hot salsa is the clearest proof. Chipotle hot salsa calories — the tomatillo-red chili salsa — are ${ing('red-salsa').cal} for a ${ing('red-salsa').serving} serving, against ${ing('green-salsa').cal} for the medium green one and ${ing('mild-salsa').cal} for the mild. All three are trivial. The number that separates them is sodium.`,
    why: {
      heading: 'What heat actually costs you',
      body: `Capsaicin has no calories. The red chili salsa's ${ing('red-salsa').cal} calories come from tomatillo and chile de árbol, not from the heat. Anyone avoiding the hot salsa for nutritional reasons is avoiding ${ing('red-salsa').cal - ing('green-salsa').cal} calories more than the green one. The real cost is ${ing('red-salsa').na} mg of sodium, which is second only to fresh tomato salsa.`,
    },
    comparison: {
      heading: 'Hot vs. salsa verde',
      body: `The red is ${ing('red-salsa').cal - ing('green-salsa').cal} calories heavier than the green and ${ing('red-salsa').na - ing('green-salsa').na} mg higher in sodium. Both are tomatillo-based. If you want heat without the sodium, the green salsa at medium is the better-value scoop; if you want the sharper chile flavour, the red costs you almost nothing in calories to get it.`,
      rows: [
        ['Tomatillo-red chili salsa', ing('red-salsa')],
        ['Tomatillo-green chili salsa', ing('green-salsa')],
      ],
    },
    faq: [
      {
        q: 'Which Chipotle salsa is the hottest?',
        a: `The tomatillo-red chili salsa is the hottest, and Chipotle rates it hot. Both the tomatillo-green chili and roasted chili-corn salsas are rated medium, and fresh tomato salsa is mild. Heat says nothing about the nutrition: the hot salsa is ${ing('red-salsa').cal} calories against the mild one's ${ing('mild-salsa').cal}, a difference of ${Math.abs(ing('red-salsa').cal - ing('mild-salsa').cal)} calories.`,
      },
      {
        q: 'Does spicy food burn more calories?',
        a: `No, spicy food does not burn calories to any degree that shows up in a meal total. Capsaicin carries no calories of its own, so choosing the hot salsa over the mild one changes an order by ${Math.abs(ing('red-salsa').cal - ing('mild-salsa').cal)} calories. What the hot salsa does change is sodium, at ${ing('red-salsa').na} mg against the green salsa's ${ing('green-salsa').na} mg.`,
      },
    ],
  },
];
