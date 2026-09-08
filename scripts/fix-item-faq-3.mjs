import { rewrite } from './rewrite-faq.mjs';

// items-toppings.js has in scope: N, item, fmt, rankBy, ing(), salsaByNa
rewrite('src/content/items-toppings.js', [
  ['Is queso or guacamole lower in calories?',
    "Queso is lower in calories than guacamole, by ${ing('guac').cal - ing('queso').cal}: ${ing('queso').cal} against ${ing('guac').cal}. On saturated fat the order reverses, with queso at ${ing('queso').sat} g against guacamole's ${ing('guac').sat} g. Queso also returns ${ing('queso').p} g of protein to guacamole's ${ing('guac').p} g, while guacamole brings ${ing('guac').fib} g of fiber that queso does not."],
  ['Is Chipotle queso gluten-free?',
    "Yes, Chipotle queso blanco is made without gluten-containing ingredients. It is dairy-based, which rules it out of any <a href=\"/diet/dairy-free\">dairy-free order</a> but not a gluten-free one. Cross-contact on a shared line remains a separate question from the ingredient list, covered in <a href=\"/diet/gluten-free\">the gluten-free guide</a> along with what to ask for at the counter."],

  ['How many calories in a half bag of chips?',
    "A half bag of Chipotle chips is around ${ing('chips').cal / 2} calories, with roughly ${ing('chips').f / 2} g of fat and ${ing('chips').na / 2} mg of sodium. Splitting the bag is the only portion control available, since Chipotle does not sell a smaller size. A full bag is ${ing('chips').cal} calories, more than the rice and beans in a bowl combined."],
  ['Do chips count as a side or a topping?',
    "Chips count as a side, and the distinction matters more than it sounds. Toppings sit inside the entrée price and inside the bowl; chips are a separate purchase that adds ${ing('chips').cal} calories on top of a finished meal rather than within it. A chicken bowl with chips reaches ${fmt(N.bowl('chicken').cal + ing('chips').cal)} calories."],
  ['Why are Chipotle chips so high in fat?',
    "Chipotle chips are high in fat because they are fried in sunflower oil, which puts ${ing('chips').f} g into a ${ing('chips').serving} bag. Corn masa itself contributes almost none of that — the oil is effectively the whole figure. The chips are finished with lime and salt, which accounts for the ${ing('chips').na} mg of sodium alongside it."],

  ['Does sour cream have less sodium than cheese?',
    "Yes, sour cream has considerably less sodium than cheese: ${ing('sour-cream').na} mg against ${ing('cheese').na} mg. That makes sour cream the lowest-sodium topping on the line and the one dairy option that survives a sodium-controlled order. Both land at ${ing('sour-cream').cal} calories, though sour cream spreads them over ${ing('sour-cream').serving} where cheese uses ${ing('cheese').serving}."],
  ['How many calories is light sour cream?',
    "Light sour cream is roughly ${ing('sour-cream').cal / 2} calories, since asking for light halves the portion rather than changing the product. Chipotle does not stock a reduced-fat version, so portion size is the only variable available. A half portion also halves the fat to ${ing('sour-cream').f / 2} g and the saturated fat to ${ing('sour-cream').sat / 2} g."],

  ['What kind of cheese does Chipotle use?',
    "Chipotle uses a shredded Monterey Jack and white cheddar blend, made with microbial rennet rather than animal rennet. That makes the cheese suitable for a <a href=\"/diet/vegetarian\">vegetarian order</a> but not a <a href=\"/diet/dairy-free\">dairy-free</a> one. A ${ing('cheese').serving} serving carries ${ing('cheese').cal} calories, ${ing('cheese').p} g of protein and ${ing('cheese').sat} g of saturated fat."],
  ['How much does skipping cheese save?',
    "Skipping cheese saves ${ing('cheese').cal} calories and ${ing('cheese').na} mg of sodium, taking a standard chicken bowl from ${fmt(N.bowl('chicken').cal)} to ${fmt(N.bowl('chicken').cal - ing('cheese').cal)} calories. It also removes ${ing('cheese').p} g of protein and ${ing('cheese').sat} g of saturated fat. On a meat-free order that protein loss counts for more than it does alongside a full scoop of chicken."],

  ['Can I add lettuce to a bowl for free?',
    "Yes, lettuce is free at the counter and nearly free nutritionally, at ${ing('lettuce').cal} calories a serving with ${ing('lettuce').na} mg of sodium. It is the cheapest way to add bulk to a bowl short of fajita vegetables, which cost ${ing('fajita').cal} calories and bring ${ing('fajita').fib} g of fiber. Neither addition changes a calorie total in any way that registers."],
  ['Which is better as a salad base, romaine or supergreens?',
    "Neither romaine nor supergreens is meaningfully better as a salad base. Supergreens carry ${ing('supergreens').p} g of protein and ${ing('supergreens').fib} g of fiber against romaine's ${ing('lettuce').p} g and ${ing('lettuce').fib} g, a difference under one gram either way. Supergreens are the standard salad base and romaine the shredded topping, so texture is the real choice."],

  ['Are fajita veggies cooked in oil?',
    "Yes, fajita vegetables are grilled with a small amount of oil and seasoning. The fat contribution stays negligible at ${ing('fajita').f} g, but the seasoning is where the ${ing('fajita').na} mg of sodium comes from. For ${ing('fajita').cal} calories a scoop, the peppers and onions remain the cheapest way to add real volume to a bowl."],
  ['Do fajita veggies count towards fiber?',
    "Yes, fajita veggies contribute ${ing('fajita').fib} g of fiber a scoop. That is modest next to black beans at ${ing('black-beans').fib} g or guacamole at ${ing('guac').fib} g, but it stacks with them at a cost of only ${ing('fajita').cal} calories. <a href=\"/guides/fiber\">The fiber guide</a> shows how far those combinations reach against a daily target."],

  ['Which Chipotle salsa has the least sodium?',
    "Tomatillo-green chili salsa has the least sodium of the four, at ${ing('green-salsa').na} mg. Fresh tomato salsa carries the most at ${ing('mild-salsa').na} mg, and it is the mildest of the four on heat. Roasted chili-corn sits at ${ing('corn-salsa').na} mg and tomatillo-red chili at ${ing('red-salsa').na} mg, a spread of ${ing('mild-salsa').na - ing('green-salsa').na} mg across the set."],
  ['How spicy is salsa verde?',
    "Chipotle rates salsa verde as medium heat. Heat and sodium do not track together here: this medium salsa is the lightest of the four at ${ing('green-salsa').na} mg, while the mild fresh tomato salsa is the heaviest at ${ing('mild-salsa').na} mg. Salsa verde is also the lowest-calorie of the four, at ${ing('green-salsa').cal} calories a serving."],

  ['Is fresh tomato salsa the healthiest option?',
    "It depends which number you are managing. On calories, fresh tomato salsa is close to free at ${ing('mild-salsa').cal} a serving. On sodium it is the worst of the four salsas at ${ing('mild-salsa').na} mg, more than a scoop of chicken carries. For anyone tracking sodium rather than calories, tomatillo-green chili at ${ing('green-salsa').na} mg is the better pick."],
  ['What is pico de gallo at Chipotle?',
    "Pico de gallo is the same thing as fresh tomato salsa at Chipotle — the menu name changed, the recipe did not. It is diced tomato, red onion, cilantro, jalapeño, lime and salt, at ${ing('mild-salsa').cal} calories and ${ing('mild-salsa').na} mg of sodium per ${ing('mild-salsa').serving} serving. Chipotle rates it mild on heat."],

  ['Is corn salsa keto-friendly?',
    "No, corn salsa is not keto-friendly. At ${ing('corn-salsa').c} g of carbohydrate a serving it carries four times what any other salsa does, since corn is a starch. That is more than a scoop of cauliflower rice at ${ing('cauli-rice').c} g. <a href=\"/diet/keto\">The keto guide</a> recommends the two tomatillo salsas instead, at ${ing('green-salsa').c} g each."],
  ['How spicy is roasted chili-corn salsa?',
    "Chipotle rates roasted chili-corn salsa as medium heat. The roasted poblano and jalapeño provide that heat, and the sweetness of the corn partly offsets it. The corn is also why this salsa carries ${ing('corn-salsa').c} g of carbohydrate and ${ing('corn-salsa').sug} g of sugar, against ${ing('mild-salsa').c} g and ${ing('mild-salsa').sug} g for fresh tomato salsa."],

  ['Which Chipotle salsa is the hottest?',
    "The tomatillo-red chili salsa is the hottest, and Chipotle rates it hot. Both the tomatillo-green chili and roasted chili-corn salsas are rated medium, and fresh tomato salsa is mild. Heat says nothing about the nutrition: the hot salsa is ${ing('red-salsa').cal} calories against the mild one's ${ing('mild-salsa').cal}, a difference of ${Math.abs(ing('red-salsa').cal - ing('mild-salsa').cal)} calories."],
  ['Does spicy food burn more calories?',
    "No, spicy food does not burn calories to any degree that shows up in a meal total. Capsaicin carries no calories of its own, so choosing the hot salsa over the mild one changes an order by ${Math.abs(ing('red-salsa').cal - ing('mild-salsa').cal)} calories. What the hot salsa does change is sodium, at ${ing('red-salsa').na} mg against the green salsa's ${ing('green-salsa').na} mg."],
]);
