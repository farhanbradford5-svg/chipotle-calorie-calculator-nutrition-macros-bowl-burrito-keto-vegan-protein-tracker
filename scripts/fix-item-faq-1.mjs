import { rewrite } from './rewrite-faq.mjs';

// items-formats.js has in scope: N, item, perCal, fmt, TORTILLA, BUILDS, bowl()
rewrite('src/content/items-formats.js', [
  ['How many calories are in a Chipotle chicken bowl with guacamole?',
    "A Chipotle chicken bowl with guacamole comes to ${fmt(bowl('chicken').cal + item('guac').cal)} calories, up from ${fmt(bowl('chicken').cal)} without it. Guacamole is ${item('guac').cal} calories for a ${item('guac').serving} serving. Fat is the larger change, moving from ${bowl('chicken').f} g to ${Math.round((bowl('chicken').f + item('guac').f) * 10) / 10} g, and the bowl also gains ${item('guac').fib} g of fiber that nothing else on it provides."],
  ['How much protein is in a chicken bowl?',
    "A chicken bowl carries ${bowl('chicken').p} g of protein in the standard build. That breaks down as ${item('chicken').p} g from the chicken, ${item('black-beans').p} g from black beans, ${item('cheese').p} g from cheese and ${item('white-rice').p} g from the rice. Asking for double chicken takes the same bowl to ${N.doubleBowl('chicken').p} g, the highest protein figure available in one order."],
  ['Does a chicken bowl work for a high-protein day?',
    "A chicken bowl works comfortably for a high-protein day at ${bowl('chicken').p} g of protein for ${fmt(bowl('chicken').cal)} calories. That clears most single-meal targets without any modification. Double chicken raises it to ${N.doubleBowl('chicken').p} g, and <a href=\"/diet/high-protein\">the high-protein ordering guide</a> works through how far the ceiling goes when double protein stacks with a second scoop of beans."],

  ['Is steak or chicken lower in calories at Chipotle?',
    "Steak is lower in calories than chicken at Chipotle, by ${item('chicken').cal - item('steak').cal} calories per serving: ${item('steak').cal} against ${item('chicken').cal}. The gap is small enough that it should not decide an order on its own, because the rice and topping choices move a total far further. Chicken returns ${item('chicken').p - item('steak').p} g more protein for those extra calories."],
  ['Why does steak cost more if it has fewer calories?',
    "Price at Chipotle tracks the cut, not the calorie count. Steak and barbacoa both sit in the premium tier while landing at ${item('steak').cal} and ${item('barbacoa').cal} calories, below carnitas at ${item('carnitas').cal} and chicken at ${item('chicken').cal}. Nothing about the menu pricing reflects nutrition, which is why the cheapest protein is also among the highest in protein per calorie."],
  ['How much sodium is in a steak bowl?',
    "A steak bowl carries about ${fmt(bowl('steak').na)} mg of sodium in the standard build, of which only ${item('steak').na} mg comes from the steak. Most of the rest is the fresh tomato salsa at ${item('mild-salsa').na} mg, the rice at ${item('white-rice').na} mg and the cheese at ${item('cheese').na} mg. <a href=\"/guides/sodium\">The ingredient-level sodium breakdown</a> ranks all of them."],

  ['Is barbacoa the highest-sodium protein at Chipotle?',
    "Yes among the four classic meats, barbacoa is the highest-sodium protein at ${item('barbacoa').na} mg. Across the full protein list it is not: sofritas carries ${item('sofritas').na} mg, plant-based chorizo ${item('chorizo').na} mg and chicken al pastor ${item('al-pastor').na} mg. Chicken is the lowest of the eight at ${item('chicken').na} mg."],
  ['How can I order barbacoa and keep sodium down?',
    "Ordering barbacoa with a lower-sodium salsa is the largest single saving available. Fresh tomato salsa carries ${item('mild-salsa').na} mg; tomatillo-green chili carries ${item('green-salsa').na} mg, a difference of ${item('mild-salsa').na - item('green-salsa').na} mg. Brown rice instead of white saves another ${item('white-rice').na - item('brown-rice').na} mg, and sour cream instead of cheese a further ${item('cheese').na - item('sour-cream').na} mg."],
  ['How much protein does barbacoa have?',
    "Barbacoa has ${item('barbacoa').p} g of protein per ${item('barbacoa').serving} serving, which puts a standard barbacoa bowl at ${bowl('barbacoa').p} g. That works out to ${perCal('barbacoa')} g of protein per 100 calories, effectively tied with steak at ${perCal('steak')} g and behind chicken at ${perCal('chicken')} g, the leader on the line."],

  ['Is carnitas the highest-calorie protein at Chipotle?',
    "Yes, carnitas is the highest-calorie protein at Chipotle, at ${item('carnitas').cal} calories per serving. Chicken and chicken al pastor come next at ${item('chicken').cal}, and steak and carne asada are lowest at ${item('steak').cal}. Fat is the reason: carnitas carries ${item('carnitas').f} g against chicken's ${item('chicken').f} g, because the pork is cooked in its own fat."],
  ['Does carnitas fit a keto order?',
    "Yes, carnitas fits a keto order well. It contains ${item('carnitas').c} g of carbohydrate, and its ${item('carnitas').f} g of fat suits the macro split a keto build wants. The carbohydrate in a keto order comes from the rice and beans rather than the meat, so the protein choice is rarely the binding constraint. <a href=\"/diet/keto\">The keto guide</a> works through the full build."],

  ['Is sofritas vegan?',
    "Yes, sofritas itself is vegan — it is braised tofu in an adobo sauce, with no animal product. Whether the finished bowl stays vegan depends on what goes on top: cheese, sour cream and queso blanco each disqualify an order, and so does the chipotle-honey vinaigrette. <a href=\"/diet/vegan\">The vegan ordering guide</a> lists everything that passes."],
  ['How much protein is in sofritas?',
    "Sofritas carries ${item('sofritas').p} g of protein per ${item('sofritas').serving} serving, against ${item('chicken').p} g for chicken. That is ${perCal('sofritas')} g per 100 calories, the lowest ratio of any protein on the line. Plant-based chorizo is the stronger meat-free choice at ${item('chorizo').p} g, and doubling the beans adds another ${item('black-beans').p * 2} g on top of either."],
  ['Why does sofritas have sugar in it?',
    "Sofritas has sugar because of the adobo sauce it is braised in, which carries ${item('sofritas').sug} g per serving. That makes it the highest-sugar protein on the line, though the figure stays well below the chipotle-honey vinaigrette at ${item('vinaigrette').sug} g. The same braise is what gives sofritas its ${item('sofritas').c} g of carbohydrate."],

  ['Is double chicken worth it for protein?',
    "Yes, double chicken is the best protein modification on the menu. The second scoop adds ${item('chicken').p} g of protein for ${item('chicken').cal} calories, improving the bowl's ratio from ${Math.round((bowl('chicken').p / bowl('chicken').cal) * 1000) / 10} to ${Math.round((N.doubleBowl('chicken').p / N.doubleBowl('chicken').cal) * 1000) / 10} g per 100 calories. No topping comes close: guacamole adds ${item('guac').cal} calories for ${item('guac').p} g of protein."],
  ['What does double chicken do to sodium?',
    "Double chicken adds ${item('chicken').na} mg of sodium, taking a standard bowl from ${fmt(bowl('chicken').na)} mg to ${fmt(N.doubleBowl('chicken').na)} mg. Chicken is a relatively low-sodium protein, so this is a smaller penalty than doubling barbacoa at ${item('barbacoa').na} mg or sofritas at ${item('sofritas').na} mg would carry. Adding chips on top would push the meal past the 2,300 mg daily limit."],
  ['Can I get double protein in a burrito or salad too?',
    "Yes, double protein works in every format, and the arithmetic does not change. A second scoop adds ${item('chicken').cal} calories and ${item('chicken').p} g of protein to whatever the base format already contains. A double-chicken burrito therefore reaches ${fmt(N.burrito('chicken').cal + item('chicken').cal)} calories. Build either version in <a href=\"/\">the calculator</a> to see the full totals."],

  ['How many calories does the flour tortilla add?',
    "The flour tortilla adds ${TORTILLA.cal} calories to an order, along with ${TORTILLA.c} g of carbohydrate, ${TORTILLA.f} g of fat and ${TORTILLA.na} mg of sodium. It is the single largest fixed addition available short of choosing a side, and it is the only difference between a burrito at ${fmt(N.burrito('chicken').cal)} calories and the same fillings in a bowl at ${fmt(bowl('chicken').cal)}."],
  ['Is a burrito or a bowl better if I am watching carbs?',
    "A bowl is the better format for watching carbs, decisively. The tortilla alone is ${TORTILLA.c} g of carbohydrate, taking a bowl at ${bowl('chicken').c} g up to ${N.burrito('chicken').c} g as a burrito. Rice is the next ${item('white-rice').c} g after that. <a href=\"/diet/low-carb\">The low-carb guide</a> covers which of the two to drop first."],

  ['How much sodium is in a steak burrito?',
    "A steak burrito carries about ${fmt(N.burrito('steak').na)} mg of sodium, roughly ${Math.round((N.burrito('steak').na / 2300) * 100)}% of the 2,300 mg daily limit in one item. The tortilla contributes ${TORTILLA.na} mg of that and the fresh tomato salsa ${item('mild-salsa').na} mg, while the steak itself adds only ${item('steak').na} mg. Switching to tomatillo-green chili salsa removes ${item('mild-salsa').na - item('green-salsa').na} mg."],
  ['Which burrito has the fewest calories?',
    "A steak burrito has the fewest calories of the classic meats, at ${fmt(N.burrito('steak').cal)} in the standard build, just under chicken at ${fmt(N.burrito('chicken').cal)}. Carnitas is the highest at ${fmt(N.burrito('carnitas').cal)}. Every one of those figures includes the same ${TORTILLA.cal}-calorie tortilla, so the protein choice accounts for the entire spread between them."],
]);
