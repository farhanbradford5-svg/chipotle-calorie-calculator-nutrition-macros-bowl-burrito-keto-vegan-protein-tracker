import { rewrite } from './rewrite-faq.mjs';

// items-bases.js has in scope: N, item, fmt, BUILDS, bowl(), ing()
rewrite('src/content/items-bases.js', [
  ['Is a Chipotle salad actually lower in calories?',
    "Yes, a Chipotle salad is lower in calories than the equivalent bowl, by ${bowl('chicken').cal - N.salad('chicken').cal} calories, as long as the dressing stays off. The chipotle-honey vinaigrette is ${ing('vinaigrette').cal} calories, which cancels most of that saving and adds ${ing('vinaigrette').na} mg of sodium on top. Without dressing the salad lands at ${fmt(N.salad('chicken').cal)} calories against the bowl's ${fmt(bowl('chicken').cal)}."],
  ['Does the salad come with dressing included?',
    "No, the salad dressing is offered separately, so it only counts if you take it. Left off, the supergreens base contributes ${ing('supergreens').cal} calories to the whole order. Taken, the chipotle-honey vinaigrette adds ${ing('vinaigrette').cal} calories, ${ing('vinaigrette').sug} g of sugar and ${ing('vinaigrette').na} mg of sodium — the highest sodium figure of any single item on the menu."],
  ['Which base has the most fiber?',
    "No base carries meaningful fiber — the beans do that work, at ${ing('black-beans').fib} g a scoop. Brown rice edges white rice by ${ing('brown-rice').fib - ing('white-rice').fib} g, supergreens contribute ${ing('supergreens').fib} g and cauliflower rice ${ing('cauli-rice').fib} g. Choosing a base for fiber is the wrong lever; <a href=\"/guides/fiber\">the fiber guide</a> ranks every ingredient by what it actually adds."],

  ['How many calories is one Chipotle chicken taco?',
    "One Chipotle chicken taco is roughly ${Math.round(N.tacos('chicken').cal / 3)} calories on a crispy corn shell with beans, salsa and cheese. Ordering fewer than three is not an option, so the practical figure is the ${fmt(N.tacos('chicken').cal)}-calorie order. That total sits close to a chicken bowl at ${fmt(bowl('chicken').cal)} calories, because the same fillings are divided across three shells rather than multiplied."],
  ['Are crispy or soft tortillas lower in calories?',
    "Crispy corn shells are the lower-calorie taco base, at ${ing('taco-shells').cal} calories for three. They also carry almost no sodium, at ${ing('taco-shells').na} mg for the full order, which makes them the lightest base on the entire menu on that measure. Soft flour tortillas run higher on both counts, so corn is the lighter choice either way."],

  ['Does a quesadilla come with sides?',
    "Yes, a quesadilla comes with salsa and sour cream in separate cups rather than inside it, so they only count if you use them. Sour cream adds ${ing('sour-cream').cal} calories and fresh tomato salsa ${ing('mild-salsa').cal}. The quesadilla itself is ${fmt(N.quesadilla('chicken').cal)} calories with chicken, before anything from those cups goes on it."],
  ['Why is a quesadilla low in fiber?',
    "A quesadilla is low in fiber at ${N.quesadilla('chicken').fib} g because it contains no beans. Beans are the main fiber source in every other format, at ${ing('black-beans').fib} g a scoop, and a quesadilla is built from tortilla, cheese and protein alone. Nearly all of the ${N.quesadilla('chicken').fib} g it does carry comes from the flour tortilla itself."],

  ['How many calories is light rice at Chipotle?',
    "Light rice at Chipotle is about ${ing('white-rice').cal / 2} calories for a half scoop, saving ${ing('white-rice').cal / 2} against a full one and halving the carbohydrate to ${ing('white-rice').c / 2} g. It is the least disruptive calorie cut available, because the bowl keeps a grain base rather than losing the volume entirely. Sodium halves too, from ${ing('white-rice').na} mg to ${ing('white-rice').na / 2} mg."],
  ['Is white rice or cauliflower rice lower in calories?',
    "Cauliflower rice is lower in calories than white rice, by a wide margin: ${ing('cauli-rice').cal} against ${ing('white-rice').cal} a scoop. Carbohydrate separates them further, at ${ing('cauli-rice').c} g against ${ing('white-rice').c} g. Cauliflower rice carries ${ing('cauli-rice').na} mg of sodium to white rice's ${ing('white-rice').na} mg, so it wins on that measure too."],

  ['Is brown rice healthier than white rice at Chipotle?',
    "Brown rice is marginally better than white rice at Chipotle, and not for the reason most people assume. Both are ${ing('brown-rice').cal} calories a scoop. Brown carries ${ing('white-rice').na - ing('brown-rice').na} mg less sodium, one more gram of fiber and ${ing('white-rice').c - ing('brown-rice').c} g fewer carbohydrates. The sodium saving is the argument worth ordering on — see <a href=\"/diet/low-sodium\">the low-sodium guide</a>."],
  ['Does brown rice have more protein?',
    "No, brown rice does not have more protein than white — both sit at ${ing('brown-rice').p} g a scoop. Rice is not a meaningful protein source in either form, contributing ${ing('white-rice').p} g of the ${bowl('chicken').p} g in a standard chicken bowl. The protein in an order comes from the meat scoop, the beans and the cheese."],

  ['Are black beans vegan at Chipotle?',
    "Yes, black beans at Chipotle are vegan. Both bean varieties are prepared without animal products, which makes them a staple of any <a href=\"/diet/vegan\">plant-based order</a> and the main protein source in one. A scoop carries ${ing('black-beans').p} g of protein and ${ing('black-beans').fib} g of fiber for ${ing('black-beans').cal} calories, the most efficient trade on the line."],
  ['How much protein do black beans add?',
    "Black beans add ${ing('black-beans').p} g of protein a scoop, for ${ing('black-beans').cal} calories. That is meaningful alongside a meat protein and load-bearing without one: a sofritas bowl draws ${Math.round((ing('black-beans').p / N.bowl('sofritas').p) * 100)}% of its protein from the beans. A second scoop is usually included at no extra charge, which doubles the contribution to ${ing('black-beans').p * 2} g."],

  ['Are Chipotle pinto beans vegetarian?',
    "Yes, Chipotle pinto beans are vegetarian. The current recipe is prepared without meat, which was not always true historically — pinto beans once contained bacon, and that is why the question keeps coming up. Both bean varieties now suit <a href=\"/diet/vegetarian\">vegetarian</a> and vegan orders, at ${ing('pinto-beans').cal} calories and ${ing('pinto-beans').p} g of protein a scoop."],
  ['Can I get both pinto and black beans?',
    "Yes, you can get both pinto and black beans in one order. Asking for half of each lands at roughly the same ${ing('pinto-beans').cal} calories as a single scoop split two ways. Asking for full scoops of both doubles the beans to ${ing('black-beans').cal * 2} calories, ${ing('black-beans').p * 2} g of protein and ${ing('black-beans').fib + ing('pinto-beans').fib} g of fiber."],

  ['Is guacamole worth the extra calories?',
    "It depends on how much calorie room the order has. Guacamole's fat profile and ${ing('guac').fib} g of fiber make it the best-composed topping on the line, with only ${ing('guac').sat} g of its ${ing('guac').f} g of fat saturated. But ${ing('guac').cal} calories is a third of a lighter bowl, and on a tight deficit that changes the answer."],
  ['Is Chipotle guacamole dairy-free?',
    "Yes, Chipotle guacamole is dairy-free. It contains avocado, lime, cilantro, red onion, jalapeño and salt, with no dairy at any stage of preparation. That makes it the standard fat source on a <a href=\"/diet/dairy-free\">dairy-free order</a>, standing in for the cheese and sour cream that would otherwise go on the bowl at ${ing('cheese').cal} and ${ing('sour-cream').cal} calories."],
  ['How many calories is chips and guac together?',
    "Chips and guacamole together come to roughly ${fmt(ing('chips-guac').cal)} calories as a shared side. That pairs ${ing('chips').cal}-calorie chips with a larger scoop of guacamole than a bowl receives. The combination also carries ${ing('chips-guac').f} g of fat and ${fmt(ing('chips-guac').na)} mg of sodium, more fat than most complete orders contain on their own."],
]);
