// Item pages for the assembled formats (bowls, burritos, salad, tacos,
// quesadilla). Every figure interpolated here comes from src/data/builds.js,
// so these pages cannot drift from /menu or the calculator.
import { N, item, perCal, fmt, TORTILLA, BUILDS } from '../data/builds.js';

const bowl = (id) => N.bowl(id);

export const FORMAT_ITEMS = [
  {
    slug: 'chicken-bowl',
    name: 'Chicken Bowl',
    keyword: 'chicken bowl calories',
    title: 'Chicken Bowl Calories at Chipotle: 655 in a Standard Build',
    description:
      'A Chipotle chicken bowl with white rice, black beans, fresh tomato salsa and cheese is 655 calories and 50 g of protein, plus the swaps that matter.',
    totals: bowl('chicken'),
    buildLabel: BUILDS.bowl.label,
    openingType: 'direct',
    opening: `Chicken bowl calories at Chipotle come to ${fmt(bowl('chicken').cal)} when the bowl is built the ordinary way — white rice, black beans, fresh tomato salsa and a scoop of cheese — carrying ${bowl('chicken').p} g of protein. That is the single most-ordered combination on the menu, and it is the build every other page on this site measures against. Change one thing and the number moves in ways that are easy to predict once you have seen them written down.`,
    why: {
      heading: 'Why this build is the reference point',
      body: `Chicken bowls get quoted as one number constantly, and the number is meaningless without the fillings attached to it. The same bowl ordered with guacamole instead of cheese is ${fmt(bowl('chicken').cal - item('cheese').cal + item('guac').cal)} calories. Ordered with no rice it is ${fmt(bowl('chicken').cal - item('white-rice').cal)}. When someone says "a chicken bowl is 700 calories" they are describing a specific plate of food, not the category.`,
    },
    comparison: {
      heading: 'Chicken vs. steak: protein per calorie',
      body: `Chicken carries ${item('chicken').p} g of protein for ${item('chicken').cal} calories, which is ${perCal('chicken')} g per 100 calories. Steak gives ${item('steak').p} g for ${item('steak').cal} calories, or ${perCal('steak')} g per 100. Steak is the lighter scoop in absolute terms — ${item('chicken').cal - item('steak').cal} calories lighter — but chicken returns more protein for what it costs you. If the goal is protein density, chicken wins; if it is a smaller calorie total, steak does.`,
      rows: [
        ['Chicken bowl', bowl('chicken')],
        ['Steak bowl', bowl('steak')],
      ],
    },
    faq: [
      {
        q: 'How many calories are in a Chipotle chicken bowl with guacamole?',
        a: `A Chipotle chicken bowl with guacamole comes to ${fmt(bowl('chicken').cal + item('guac').cal)} calories, up from ${fmt(bowl('chicken').cal)} without it. Guacamole is ${item('guac').cal} calories for a ${item('guac').serving} serving. Fat is the larger change, moving from ${bowl('chicken').f} g to ${Math.round((bowl('chicken').f + item('guac').f) * 10) / 10} g, and the bowl also gains ${item('guac').fib} g of fiber that nothing else on it provides.`,
      },
      {
        q: 'How much protein is in a chicken bowl?',
        a: `A chicken bowl carries ${bowl('chicken').p} g of protein in the standard build. That breaks down as ${item('chicken').p} g from the chicken, ${item('black-beans').p} g from black beans, ${item('cheese').p} g from cheese and ${item('white-rice').p} g from the rice. Asking for double chicken takes the same bowl to ${N.doubleBowl('chicken').p} g, the highest protein figure available in one order.`,
      },
      {
        q: 'Does a chicken bowl work for a high-protein day?',
        a: `Yes — a chicken bowl works comfortably for a high-protein day, at ${bowl('chicken').p} g of protein for ${fmt(bowl('chicken').cal)} calories. That clears most single-meal targets without any modification. Double chicken raises it to ${N.doubleBowl('chicken').p} g, and <a href="/diet/high-protein/">the high-protein ordering guide</a> works through how far the ceiling goes when double protein stacks with a second scoop of beans.`,
      },
    ],
  },

  {
    slug: 'steak-bowl',
    name: 'Steak Bowl',
    keyword: 'steak bowl calories',
    title: 'Steak Bowl Calories at Chipotle — Lighter Than Chicken',
    description:
      'Steak bowl calories at Chipotle come to 625 in a standard build — 30 fewer than the same bowl with chicken. Here is why steak reads heavier than it is.',
    totals: bowl('steak'),
    buildLabel: BUILDS.bowl.label,
    openingType: 'myth',
    opening: `Steak reads as the heavier order and it is not. A Chipotle steak bowl with white rice, black beans, fresh tomato salsa and cheese is ${fmt(bowl('steak').cal)} calories, which is ${bowl('chicken').cal - bowl('steak').cal} fewer than the identical bowl with chicken. The scoop itself is ${item('steak').cal} calories against chicken's ${item('chicken').cal}. Steak bowl calories run below the chicken equivalent, not above it.`,
    why: {
      heading: 'Where the assumption comes from',
      body: `Red meat carries a reputation that this particular cut does not earn. Chipotle's steak is trimmed and grilled without a marinade heavy in oil, so it lands at ${item('steak').f} g of fat per ${item('steak').serving} serving — a gram less than chicken. What steak does give up is protein: ${item('steak').p} g against chicken's ${item('chicken').p} g in the same size scoop.`,
    },
    comparison: {
      heading: 'The 30-calorie gap, and what it costs you',
      body: `Swapping chicken for steak saves ${bowl('chicken').cal - bowl('steak').cal} calories and costs ${item('chicken').p - item('steak').p} g of protein. That is a poor trade if protein is the point of the meal and a fine one if it is not. Sodium barely moves — ${fmt(bowl('steak').na)} mg for the steak bowl against ${fmt(bowl('chicken').na)} mg for chicken.`,
      rows: [
        ['Steak bowl', bowl('steak')],
        ['Chicken bowl', bowl('chicken')],
      ],
    },
    faq: [
      {
        q: 'Is steak or chicken lower in calories at Chipotle?',
        a: `Steak is lower in calories than chicken at Chipotle, by ${item('chicken').cal - item('steak').cal} calories per serving: ${item('steak').cal} against ${item('chicken').cal}. The gap is small enough that it should not decide an order on its own, because the rice and topping choices move a total far further. Chicken returns ${item('chicken').p - item('steak').p} g more protein for those extra calories.`,
      },
      {
        q: 'Why does steak cost more if it has fewer calories?',
        a: `Price at Chipotle tracks the cut, not the calorie count. Steak and barbacoa both sit in the premium tier while landing at ${item('steak').cal} and ${item('barbacoa').cal} calories, below carnitas at ${item('carnitas').cal} and chicken at ${item('chicken').cal}. Nothing about the menu pricing reflects nutrition, which is why the cheapest protein is also among the highest in protein per calorie.`,
      },
      {
        q: 'How much sodium is in a steak bowl?',
        a: `A steak bowl carries about ${fmt(bowl('steak').na)} mg of sodium in the standard build, of which only ${item('steak').na} mg comes from the steak. Most of the rest is the fresh tomato salsa at ${item('mild-salsa').na} mg, the rice at ${item('white-rice').na} mg and the cheese at ${item('cheese').na} mg. <a href="/guides/sodium/">The ingredient-level sodium breakdown</a> ranks all of them.`,
      },
    ],
  },

  {
    slug: 'barbacoa-bowl',
    name: 'Barbacoa Bowl',
    keyword: 'barbacoa bowl calories',
    title: 'Barbacoa Bowl Calories & Sodium at Chipotle',
    description:
      'A barbacoa bowl runs 645 calories, and sodium is the figure to watch: barbacoa carries 530 mg per serving, the most of the four classic meats at Chipotle.',
    totals: bowl('barbacoa'),
    buildLabel: BUILDS.bowl.label,
    openingType: 'direct',
    opening: `Barbacoa bowl calories land at ${fmt(bowl('barbacoa').cal)} for the standard build, but calories are not the interesting number here. Barbacoa carries ${item('barbacoa').na} mg of sodium in a ${item('barbacoa').serving} serving — more than chicken, steak or carnitas, and the reason a barbacoa bowl reaches ${fmt(bowl('barbacoa').na)} mg before you have added a side.`,
    why: {
      heading: 'Braised meat holds salt',
      body: `Barbacoa is braised for hours in a seasoned liquid, and the meat absorbs it. That is what makes it taste the way it does; it is also why it is the saltiest of the four classic meats. If you are tracking sodium rather than calories, this is the protein where the choice actually matters.`,
    },
    comparison: {
      heading: 'Barbacoa vs. carnitas on sodium',
      body: `Carnitas is the other slow-cooked pork-and-beef-tier option people weigh barbacoa against. Carnitas carries ${item('carnitas').na} mg of sodium against barbacoa's ${item('barbacoa').na} mg — ${item('barbacoa').na - item('carnitas').na} mg less — while running ${item('carnitas').cal - item('barbacoa').cal} calories higher. Neither is a clean win: barbacoa is the lighter, saltier option and carnitas is the richer, less salty one.`,
      rows: [
        ['Barbacoa bowl', bowl('barbacoa')],
        ['Carnitas bowl', bowl('carnitas')],
      ],
    },
    faq: [
      {
        q: 'Is barbacoa the highest-sodium protein at Chipotle?',
        a: `Yes among the four classic meats, barbacoa is the highest-sodium protein at ${item('barbacoa').na} mg. Across the full protein list it is not: sofritas carries ${item('sofritas').na} mg, plant-based chorizo ${item('chorizo').na} mg and chicken al pastor ${item('al-pastor').na} mg. Chicken is the lowest of the eight at ${item('chicken').na} mg.`,
      },
      {
        q: 'How can I order barbacoa and keep sodium down?',
        a: `Ordering barbacoa with a lower-sodium salsa is the largest single saving available. Fresh tomato salsa carries ${item('mild-salsa').na} mg; tomatillo-green chili carries ${item('green-salsa').na} mg, a difference of ${item('mild-salsa').na - item('green-salsa').na} mg. Brown rice instead of white saves another ${item('white-rice').na - item('brown-rice').na} mg, and sour cream instead of cheese a further ${item('cheese').na - item('sour-cream').na} mg.`,
      },
      {
        q: 'How much protein does barbacoa have?',
        a: `Barbacoa has ${item('barbacoa').p} g of protein per ${item('barbacoa').serving} serving, which puts a standard barbacoa bowl at ${bowl('barbacoa').p} g. That works out to ${perCal('barbacoa')} g of protein per 100 calories, effectively tied with steak at ${perCal('steak')} g and behind chicken at ${perCal('chicken')} g, the leader on the line.`,
      },
    ],
  },

  {
    slug: 'carnitas-bowl',
    name: 'Carnitas Bowl',
    keyword: 'carnitas bowl calories',
    title: 'Carnitas Bowl Calories — The Fattiest Chipotle Protein',
    description:
      'Carnitas bowl calories reach 685, the highest of the standard proteins, driven by 12 g of fat per serving. Full macros plus how it compares with barbacoa.',
    totals: bowl('carnitas'),
    buildLabel: BUILDS.bowl.label,
    openingType: 'direct',
    opening: `No other single-protein bowl on the menu lands higher: carnitas bowl calories reach ${fmt(bowl('carnitas').cal)} in a standard build. The driver is fat: ${item('carnitas').f} g per ${item('carnitas').serving} serving, against ${item('chicken').f} g for chicken and ${item('steak').f} g for steak. Carnitas is confit-style pork, cooked in its own fat, and the macros show it.`,
    why: {
      heading: 'Fat is doing the work here',
      body: `Every other protein on the line sits between ${item('steak').f} and ${item('sofritas').f} g of fat. Carnitas clears all of them at ${item('carnitas').f} g. That is not a reason to avoid it — fat is what makes the meat taste like carnitas — but it does mean a carnitas bowl behaves differently from a chicken one on a calorie-controlled day.`,
    },
    comparison: {
      heading: 'Carnitas vs. barbacoa on fat',
      body: `Barbacoa is the closest comparison in style and price. It runs ${item('barbacoa').f} g of fat against carnitas' ${item('carnitas').f} g, and ${item('barbacoa').cal} calories against ${item('carnitas').cal}. Choosing barbacoa over carnitas takes ${item('carnitas').cal - item('barbacoa').cal} calories off the bowl but adds ${item('barbacoa').na - item('carnitas').na} mg of sodium.`,
      rows: [
        ['Carnitas bowl', bowl('carnitas')],
        ['Barbacoa bowl', bowl('barbacoa')],
      ],
    },
    faq: [
      {
        q: 'Is carnitas the highest-calorie protein at Chipotle?',
        a: `Yes, carnitas is the highest-calorie protein at Chipotle, at ${item('carnitas').cal} calories per serving. Chicken and chicken al pastor come next at ${item('chicken').cal}, and steak and carne asada are lowest at ${item('steak').cal}. Fat is the reason: carnitas carries ${item('carnitas').f} g against chicken's ${item('chicken').f} g, because the pork is cooked in its own fat.`,
      },
      {
        q: 'Does carnitas fit a keto order?',
        a: `Yes, carnitas fits a keto order well. It contains ${item('carnitas').c} g of carbohydrate, and its ${item('carnitas').f} g of fat suits the macro split a keto build wants. The carbohydrate in a keto order comes from the rice and beans rather than the meat, so the protein choice is rarely the binding constraint. <a href="/diet/keto/">The keto guide</a> works through the full build.`,
      },
    ],
  },

  {
    slug: 'sofritas-bowl',
    name: 'Sofritas Bowl',
    keyword: 'sofritas bowl calories',
    title: 'Sofritas Bowl Calories and Macros at Chipotle',
    description:
      'A sofritas bowl is 625 calories. What separates sofritas from the meat options is carbohydrate — 9 g a scoop, where chicken and steak bring none.',
    totals: bowl('sofritas'),
    buildLabel: BUILDS.bowl.label,
    openingType: 'direct',
    opening: `Sofritas bowl calories come to ${fmt(bowl('sofritas').cal)} in the standard build, but the figure that actually distinguishes sofritas from every meat option is carbohydrate. Braised tofu in an adobo sauce brings ${item('sofritas').c} g of carbs per ${item('sofritas').serving} serving where chicken, steak and carnitas bring ${item('chicken').c}, ${item('steak').c} and ${item('carnitas').c} g. Nobody expects the protein scoop to move the carb count, and this one does.`,
    why: {
      heading: 'The adobo is the difference',
      body: `The sauce sofritas is braised in carries sugar — ${item('sofritas').sug} g per serving, the most of any protein — along with the ${item('sofritas').c} g of carbohydrate. It also carries ${item('sofritas').na} mg of sodium, which is more than any of the four classic meats. In exchange you get ${item('sofritas').fib} g of fiber, which no meat protein provides at all.`,
    },
    comparison: {
      heading: 'Sofritas vs. chicken on carbs',
      body: `A sofritas bowl reaches ${bowl('sofritas').c} g of carbohydrate against ${bowl('chicken').c} g for the same bowl with chicken. Protein moves the other way and further: ${bowl('sofritas').p} g versus ${bowl('chicken').p} g. Sofritas is the right call for a plant-based order and a poor substitute if you were choosing chicken for the protein.`,
      rows: [
        ['Sofritas bowl', bowl('sofritas')],
        ['Chicken bowl', bowl('chicken')],
      ],
    },
    faq: [
      {
        q: 'Is sofritas vegan?',
        a: `Yes, sofritas itself is vegan — it is braised tofu in an adobo sauce, with no animal product. Whether the finished bowl stays vegan depends on what goes on top: cheese, sour cream and queso blanco each disqualify an order, and so does the chipotle-honey vinaigrette. <a href="/diet/vegan/">The vegan ordering guide</a> lists everything that passes.`,
      },
      {
        q: 'How much protein is in sofritas?',
        a: `Sofritas carries ${item('sofritas').p} g of protein per ${item('sofritas').serving} serving, against ${item('chicken').p} g for chicken. That is ${perCal('sofritas')} g per 100 calories, the lowest ratio of any protein on the line. Plant-based chorizo is the stronger meat-free choice at ${item('chorizo').p} g, and doubling the beans adds another ${item('black-beans').p * 2} g on top of either.`,
      },
      {
        q: 'Why does sofritas have sugar in it?',
        a: `Sofritas has sugar because of the adobo sauce it is braised in, which carries ${item('sofritas').sug} g per serving. That makes it the highest-sugar protein on the line, though the figure stays well below the chipotle-honey vinaigrette at ${item('vinaigrette').sug} g. The same braise is what gives sofritas its ${item('sofritas').c} g of carbohydrate.`,
      },
    ],
  },

  {
    slug: 'double-chicken-bowl',
    name: 'Double Chicken Bowl',
    keyword: 'double chicken bowl calories',
    title: 'Double Chicken Bowl Calories: 835 and 82 g of Protein',
    description:
      'Double chicken adds exactly 180 calories and 32 g of protein to a bowl, taking the standard build to 835 calories and 82 g. The arithmetic, written out.',
    totals: N.doubleBowl('chicken'),
    buildLabel: BUILDS.bowl.label,
    openingType: 'direct',
    opening: `Treat this as arithmetic, not as a separate menu item. Double chicken bowl calories total ${fmt(N.doubleBowl('chicken').cal)}. A second scoop of chicken is ${item('chicken').cal} calories and ${item('chicken').p} g of protein, so the standard bowl goes from ${fmt(bowl('chicken').cal)} to ${fmt(N.doubleBowl('chicken').cal)} calories and from ${bowl('chicken').p} to ${N.doubleBowl('chicken').p} g of protein.`,
    why: {
      heading: 'The arithmetic, written out',
      body: `Single chicken bowl: ${fmt(bowl('chicken').cal)} calories, ${bowl('chicken').p} g protein. Add ${item('chicken').cal} calories and ${item('chicken').p} g protein. Result: ${fmt(N.doubleBowl('chicken').cal)} calories, ${N.doubleBowl('chicken').p} g protein. Sodium rises by ${item('chicken').na} mg to ${fmt(N.doubleBowl('chicken').na)} mg. Nothing else on the bowl changes, which is what makes double protein the most predictable modification on the menu.`,
    },
    comparison: {
      heading: 'Double chicken vs. single: what the extra scoop buys',
      body: `The second scoop raises protein by ${Math.round(((N.doubleBowl('chicken').p / bowl('chicken').p) - 1) * 100)}% while raising calories by ${Math.round(((N.doubleBowl('chicken').cal / bowl('chicken').cal) - 1) * 100)}%. Protein density improves from ${Math.round((bowl('chicken').p / bowl('chicken').cal) * 1000) / 10} g per 100 calories to ${Math.round((N.doubleBowl('chicken').p / N.doubleBowl('chicken').cal) * 1000) / 10} g. No other single change on the line improves that ratio as much.`,
      rows: [
        ['Double chicken bowl', N.doubleBowl('chicken')],
        ['Single chicken bowl', bowl('chicken')],
      ],
    },
    faq: [
      {
        q: 'Is double chicken worth it for protein?',
        a: `Yes, double chicken is the best protein modification on the menu. The second scoop adds ${item('chicken').p} g of protein for ${item('chicken').cal} calories, improving the bowl's ratio from ${Math.round((bowl('chicken').p / bowl('chicken').cal) * 1000) / 10} to ${Math.round((N.doubleBowl('chicken').p / N.doubleBowl('chicken').cal) * 1000) / 10} g per 100 calories. No topping comes close: guacamole adds ${item('guac').cal} calories for ${item('guac').p} g of protein.`,
      },
      {
        q: 'What does double chicken do to sodium?',
        a: `Double chicken adds ${item('chicken').na} mg of sodium, taking a standard bowl from ${fmt(bowl('chicken').na)} mg to ${fmt(N.doubleBowl('chicken').na)} mg. Chicken is a relatively low-sodium protein, so this is a smaller penalty than doubling barbacoa at ${item('barbacoa').na} mg or sofritas at ${item('sofritas').na} mg would carry. Adding chips on top would push the meal past the 2,300 mg daily limit.`,
      },
      {
        q: 'Can I get double protein in a burrito or salad too?',
        a: `Yes, double protein works in every format, and the arithmetic does not change. A second scoop adds ${item('chicken').cal} calories and ${item('chicken').p} g of protein to whatever the base format already contains. A double-chicken burrito therefore reaches ${fmt(N.burrito('chicken').cal + item('chicken').cal)} calories. Build either version in <a href="/">the calculator</a> to see the full totals. Asking for the tortilla on the side, listed in <a href="/guides/secret-menu/">the off-menu requests</a>, keeps the choice open until you eat.`,
      },
    ],
  },

  {
    slug: 'chicken-burrito',
    name: 'Chicken Burrito',
    keyword: 'chicken burrito calories',
    title: 'Chicken Burrito Calories: 975, and 320 Is the Tortilla',
    description:
      'A Chipotle chicken burrito is 975 calories, and exactly 320 of those are the flour tortilla. The identical fillings served in a bowl come to 655 calories.',
    totals: N.burrito('chicken'),
    buildLabel: BUILDS.burrito.label,
    openingType: 'direct',
    opening: `Chicken burrito calories come to ${fmt(N.burrito('chicken').cal)} for a tortilla filled with white rice, black beans, fresh tomato salsa and cheese. Exactly ${TORTILLA.cal} of those calories are the tortilla itself, which is the only difference between this and the ${fmt(bowl('chicken').cal)}-calorie bowl holding identical fillings.`,
    why: {
      heading: 'Isolating the wrapper',
      body: `The ${TORTILLA.serving} flour tortilla is ${TORTILLA.cal} calories, ${TORTILLA.c} g of carbohydrate, ${TORTILLA.f} g of fat and ${TORTILLA.na} mg of sodium. Because Chipotle assembles bowls and burritos from the same containers, the tortilla is the whole delta — there is no other hidden difference to account for. That makes the burrito-versus-bowl decision unusually easy to reason about.`,
    },
    comparison: {
      heading: 'Chicken burrito vs. chicken bowl',
      body: `Same fillings, ${N.burrito('chicken').cal - bowl('chicken').cal} calories apart. Carbohydrate goes from ${bowl('chicken').c} g to ${N.burrito('chicken').c} g, and sodium from ${fmt(bowl('chicken').na)} mg to ${fmt(N.burrito('chicken').na)} mg. In practice burritos also tend to get slightly larger scoops than bowls, so treat ${fmt(N.burrito('chicken').cal)} as a floor rather than a ceiling.`,
      rows: [
        ['Chicken burrito', N.burrito('chicken')],
        ['Chicken bowl', bowl('chicken')],
      ],
    },
    faq: [
      {
        q: 'How many calories does the flour tortilla add?',
        a: `The flour tortilla adds ${TORTILLA.cal} calories to an order, along with ${TORTILLA.c} g of carbohydrate, ${TORTILLA.f} g of fat and ${TORTILLA.na} mg of sodium. It is the single largest fixed addition available short of choosing a side, and it is the only difference between a burrito at ${fmt(N.burrito('chicken').cal)} calories and the same fillings in a bowl at ${fmt(bowl('chicken').cal)}.`,
      },
      {
        q: 'Is a burrito or a bowl better if I am watching carbs?',
        a: `A bowl is the better format for watching carbs, decisively. The tortilla alone is ${TORTILLA.c} g of carbohydrate, taking a bowl at ${bowl('chicken').c} g up to ${N.burrito('chicken').c} g as a burrito. Rice is the next ${item('white-rice').c} g after that. <a href="/diet/low-carb/">The low-carb guide</a> covers which of the two to drop first.`,
      },
    ],
  },

  {
    slug: 'steak-burrito',
    name: 'Steak Burrito',
    keyword: 'steak burrito calories',
    title: 'Steak Burrito Calories at Chipotle — 945 in a Standard Build',
    description:
      'Steak burrito calories total 945, thirty below the chicken build. Sodium is where this format lands hardest though, at roughly 2,230 mg in a single order.',
    totals: N.burrito('steak'),
    buildLabel: BUILDS.burrito.label,
    openingType: 'comparison',
    opening: `Set a steak burrito next to a chicken one and the calorie gap is smaller than the price gap suggests: ${fmt(N.burrito('steak').cal)} against ${fmt(N.burrito('chicken').cal)}. Steak burrito calories run ${N.burrito('chicken').cal - N.burrito('steak').cal} below the chicken build because the steak scoop is lighter, not because anything about the tortilla changes.`,
    why: {
      heading: 'Sodium is the number to watch in this format',
      body: `At ${fmt(N.burrito('steak').na)} mg, a steak burrito is within ${2300 - N.burrito('steak').na} mg of the entire recommended daily sodium limit. The tortilla contributes ${TORTILLA.na} mg of that, the fresh tomato salsa ${item('mild-salsa').na} mg, and the steak only ${item('steak').na} mg. The wrapper and the salsa outweigh the meat.`,
    },
    comparison: {
      heading: 'Steak burrito vs. steak bowl',
      body: `Dropping the tortilla takes the same fillings from ${fmt(N.burrito('steak').cal)} to ${fmt(bowl('steak').cal)} calories and from ${fmt(N.burrito('steak').na)} mg to ${fmt(bowl('steak').na)} mg of sodium. For a steak order specifically, the bowl is the version that keeps you under the daily sodium line with room for a drink.`,
      rows: [
        ['Steak burrito', N.burrito('steak')],
        ['Steak bowl', bowl('steak')],
      ],
    },
    faq: [
      {
        q: 'How much sodium is in a steak burrito?',
        a: `A steak burrito carries about ${fmt(N.burrito('steak').na)} mg of sodium, roughly ${Math.round((N.burrito('steak').na / 2300) * 100)}% of the 2,300 mg daily limit in one item. The tortilla contributes ${TORTILLA.na} mg of that and the fresh tomato salsa ${item('mild-salsa').na} mg, while the steak itself adds only ${item('steak').na} mg. Switching to tomatillo-green chili salsa removes ${item('mild-salsa').na - item('green-salsa').na} mg.`,
      },
      {
        q: 'Which burrito has the fewest calories?',
        a: `A steak burrito has the fewest calories of the classic meats, at ${fmt(N.burrito('steak').cal)} in the standard build, just under chicken at ${fmt(N.burrito('chicken').cal)}. Carnitas is the highest at ${fmt(N.burrito('carnitas').cal)}. Every one of those figures includes the same ${TORTILLA.cal}-calorie tortilla, so the protein choice accounts for the entire spread between them.`,
      },
    ],
  },
];
