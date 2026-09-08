import { rewrite } from './rewrite-faq.mjs';

const K = "total(['steak', 'cauli-rice', 'green-salsa', 'cheese', 'guac'])";
const LC = "total(['salad-base', 'steak', 'green-salsa', 'fajita'])";
const LS = "total(['chicken', 'brown-rice', 'lettuce', 'fajita', 'sour-cream', 'black-beans'])";
const V1 = "total(['sofritas', 'brown-rice', 'black-beans', 'corn-salsa', 'guac', 'lettuce'])";
const V2 = "total(['chorizo', 'brown-rice', ['black-beans', 2], 'corn-salsa', 'guac', 'lettuce'])";
const HP = "total([['chicken', 2], 'white-rice', ['black-beans', 2], 'green-salsa', 'cheese'])";

rewrite('src/content/diets.js', [
  ['What replaces cheese in a dairy-free bowl?',
    "Guacamole replaces cheese in a dairy-free bowl. It contains no dairy at any stage — avocado, lime, cilantro, red onion, jalapeño and salt — and it brings ${ing('guac').fib} g of fiber that cheese does not. The trade is calories: guacamole is ${ing('guac').cal} against cheese's ${ing('cheese').cal}, so the swap adds ${ing('guac').cal - ing('cheese').cal} calories to the bowl. <a href=\"/menu/guacamole\">Full macros here</a>."],
  ['Is a dairy-free order automatically lower in calories?',
    "No. A dairy-free order is only lower in calories when nothing replaces the dairy. Dropping cheese and sour cream saves ${ing('cheese').cal + ing('sour-cream').cal} calories, and adding guacamole in their place puts ${ing('guac').cal} back, a net change of ${ing('guac').cal - (ing('cheese').cal + ing('sour-cream').cal)} calories. Leaving all three off is what actually lowers the total."],
  ['Does the chipotle-honey vinaigrette contain dairy?',
    "No, the chipotle-honey vinaigrette contains no dairy. It contains honey, which rules it out of a <a href=\"/diet/vegan\">vegan order</a> but not a dairy-free one. What it does carry is ${ing('vinaigrette').na} mg of sodium and ${ing('vinaigrette').sug} g of sugar in one ${ing('vinaigrette').serving} serving, the highest figures of any item on the line."],

  ['Is Chipotle safe for coeliac disease?',
    "It depends on how sensitive you are, and Chipotle certifies no item as gluten-free. Every ingredient except the flour tortilla is made without gluten-containing ingredients, but shared prep surfaces and shared gloves mean cross-contact is possible. Ordering a bowl and asking for fresh gloves reduces that risk without removing it. That is the honest position rather than a reassurance."],
  ['Are Chipotle chips gluten-free?',
    "Yes by ingredient, Chipotle chips are gluten-free. They are corn masa fried in dedicated oil, with no gluten-containing ingredient at any stage. Cross-contact inside the restaurant remains a separate question from the ingredient list. The chips cost ${ing('chips').cal} calories for a ${ing('chips').serving} bag, more than the rice and beans in a bowl combined."],
  ['Which taco shells are gluten-free?',
    "Crispy and soft corn tortillas are the gluten-free taco shells. Soft flour tortillas are not, since wheat is the one gluten-containing ingredient on the line. Three crispy corn shells come to ${ing('taco-shells').cal} calories and ${ing('taco-shells').na} mg of sodium, which also makes them the lowest-sodium base Chipotle serves."],

  ['What is the highest-protein order at Chipotle?',
    `The highest-protein order at Chipotle is double chicken with beans and cheese, reaching \${N.doubleBowl('chicken').p} g in a single bowl. A second scoop of black beans takes it to \${${HP}.p} g. Chicken does most of that work at \${ing('chicken').p} g a scoop, the best protein-per-calorie ratio available on the line.`],
  ['Does double protein double the sodium too?',
    "No. Double protein adds only that protein's own sodium, not the whole bowl's. A second scoop of chicken adds ${ing('chicken').na} mg, taking a standard bowl from ${fmt(N.bowl('chicken').na)} mg to ${fmt(N.doubleBowl('chicken').na)} mg. Doubling barbacoa instead would add ${ing('barbacoa').na} mg, so the protein you double decides the size of the penalty."],
  ['Is a high-protein order the same as a bulking order?',
    "No, a high-protein order and a bulking order solve different problems. This page covers the protein ceiling in one bowl, which sits near ${N.doubleBowl('chicken').p} g. A bulking order also needs total calories, which turns rice and a second bean scoop into assets rather than things to minimise. <a href=\"/guides/muscle-gain\">The muscle-gain guide</a> covers that version."],

  ['How many net carbs are in a keto Chipotle bowl?',
    `A keto Chipotle bowl built without rice or beans comes to \${${K}.c} g of total carbohydrate and \${${K}.fib} g of fiber, or roughly \${${K}.c - ${K}.fib} g net. Adding black beans would put about \${ing('black-beans').c - ing('black-beans').fib} g net straight back, which is why beans get dropped alongside the rice.`],
  ['Is cauliflower rice worth ordering on keto?',
    "Yes, cauliflower rice is worth ordering on keto. It costs ${ing('cauli-rice').c} g of carbohydrate for ${ing('cauli-rice').cal} calories, against white rice at ${ing('white-rice').c} g and ${ing('white-rice').cal} calories, and it restores the texture a rice base would have given the bowl. It carries ${ing('cauli-rice').na} mg of sodium, which matters when sodium is also a constraint."],
  ['Can I have sofritas on keto?',
    "No, sofritas works against a keto order. It is the one protein with a carb count worth tracking, at ${ing('sofritas').c} g of carbohydrate and ${ing('sofritas').sug} g of sugar from the adobo braise. Every other protein on the line sits between ${ing('chicken').c} and ${ing('steak').c} g. <a href=\"/menu/sofritas-bowl\">The sofritas breakdown</a> carries the full figures."],

  ['What is the lowest-calorie thing you can order at Chipotle?',
    `The lowest-calorie order at Chipotle is a salad with one light protein and salsa. Steak on supergreens with tomatillo-green chili salsa and fajita vegetables comes to \${${LC}.cal} calories carrying \${${LC}.p} g of protein. Dropping the fajita vegetables takes it to \${total(['salad-base', 'steak', 'green-salsa']).cal}. Rice, cheese and the tortilla account for most of what a standard bowl weighs.`],
  ['Does ordering light rice help much?',
    "Yes, though less than dropping a topping. Light rice saves ${ing('white-rice').cal / 2} calories against a full scoop and halves the carbohydrate to ${ing('white-rice').c / 2} g. Leaving off cheese and guacamole together saves ${ing('cheese').cal + ing('guac').cal} calories, more than three times as much. Light rice is the least disruptive cut; the toppings are the larger one."],
  ['Is a low-calorie order enough food?',
    "Yes by volume, a low-calorie order fills the same container a bowl uses. Supergreens cost ${ing('supergreens').cal} calories and fajita vegetables ${ing('fajita').cal}, so the container can be full at well under 300 calories. Whether it satisfies you across a week is a separate question, covered in <a href=\"/guides/weight-loss\">the weight-loss guide</a>."],

  ['How is low carb different from keto at Chipotle?',
    "Low carb and keto part company at Chipotle over the beans. Keto drops rice and beans together; low carb usually keeps beans, because ${ing('black-beans').c} g of carbohydrate returns ${ing('black-beans').fib} g of fiber and ${ing('black-beans').p} g of protein. Rice returns ${ing('white-rice').fib} g of fiber for ${ing('white-rice').c} g of carbohydrate, the worse trade of the two. <a href=\"/diet/keto\">The keto guide</a> covers the stricter build."],
  ['Should I get light rice or no rice?',
    "It depends on the carb budget. Light rice costs ${ing('white-rice').c / 2} g of carbohydrate against a full scoop's ${ing('white-rice').c} g, and keeps the volume a rice base gives a bowl. No rice saves the full ${ing('white-rice').c} g and leaves the container short, unless fajita vegetables replace it for ${ing('fajita').cal} calories."],

  ['Can a Chipotle order be under 1,000 mg of sodium?',
    `Yes, a Chipotle order can come in under 1,000 mg of sodium. The worked build on this page is \${fmt(${LS}.na)} mg: chicken, brown rice, black beans, romaine, fajita vegetables and sour cream. Getting there means giving up the salsas and the tortilla, which is a real cost in flavour rather than a painless swap.`],
  ['Which protein has the least sodium?',
    "Chicken is the protein with the least sodium, at ${ing('chicken').na} mg a serving, with steak next at ${ing('steak').na} mg. Sofritas carries the most at ${ing('sofritas').na} mg, which makes a low-sodium plant-based order genuinely difficult. The spread across the eight proteins is narrower than the spread across the four salsas."],
  ['Why is there so much sodium in the rice?',
    "Cilantro-lime rice is salted during cooking and finished with lime, which puts ${ing('white-rice').na} mg of sodium in a scoop of white rice. That is more than a serving of chicken at ${ing('chicken').na} mg. Brown rice carries ${ing('brown-rice').na} mg for the same ${ing('brown-rice').cal} calories. <a href=\"/guides/sodium\">The sodium guide</a> ranks every ingredient."],

  ['Are beans paleo?',
    "No, beans are not paleo. Beans are legumes, which strict paleo excludes alongside grains and dairy. That single rule removes ${ing('black-beans').p} g of protein and ${ing('black-beans').fib} g of fiber from what would otherwise be a straightforward bowl, and it is the difference between a paleo order and the no-rice bowl most people picture. <a href=\"/diet/whole30\">Whole30</a> applies the same rule."],
  ['Is Chipotle meat cooked in seed oils?',
    "Yes, Chipotle cooks its proteins in sunflower oil. Strict paleo excludes seed oils, and most people following paleo tolerate them. No protein on the line is cooked without it, so this is worth knowing rather than assuming either way. The rest of a paleo build — greens, fajita vegetables, guacamole and the tomatillo salsas — is unaffected."],

  ['Is Chipotle guacamole vegan?',
    "Yes, Chipotle guacamole is vegan. It contains avocado, lime, cilantro, red onion, jalapeño and salt, with no dairy or animal product at any stage. It is also the main fat source in a plant-based build, at ${ing('guac').cal} calories and ${ing('guac').fib} g of fiber a serving. <a href=\"/menu/guacamole\">The guacamole breakdown</a> carries the full figures."],
  ['How much protein can a vegan Chipotle order have?',
    `A vegan Chipotle order reaches \${${V1}.p} g of protein in the build on this page. Swapping sofritas for plant-based chorizo and doubling the beans takes it to \${${V2}.p} g. Beans do more of that work than the protein scoop does: black beans carry \${ing('black-beans').p} g against sofritas at \${ing('sofritas').p} g.`],
  ['Are Chipotle beans cooked with meat?',
    "No, Chipotle beans are not cooked with meat. Both black and pinto beans are prepared without animal products, which makes either safe in a vegan order. Pinto beans historically contained bacon, which is why the question persists. Both varieties carry ${ing('black-beans').p} g of protein for ${ing('black-beans').cal} calories a scoop."],

  ['Is Chipotle cheese vegetarian?',
    "Yes, Chipotle cheese is vegetarian. It is made with microbial rennet rather than animal rennet, which is what disqualifies many cheeses. It contributes ${ing('cheese').p} g of protein and ${ing('cheese').cal} calories per ${ing('cheese').serving} serving, which counts for more in a meat-free build than in a meat one. <a href=\"/menu/cheese\">The cheese page</a> has the full macros."],
  ['Which vegetarian option has more protein, sofritas or double beans?',
    "Double beans carry more protein than sofritas, at ${ing('black-beans').p * 2} g against ${ing('sofritas').p} g. The beans cost ${ing('black-beans').cal * 2 - ing('sofritas').cal} more calories to get there and bring ${ing('black-beans').fib * 2} g of fiber that sofritas does not match. Adding cheese and sour cream on top takes the meat-free total to ${ing('black-beans').p * 2 + ing('cheese').p + ing('sour-cream').p} g."],
  ['Do I get charged for double beans?',
    "No, a second scoop of beans is generally included. Beans are not a premium item the way guacamole and queso are, which makes double beans the cheapest protein and fiber addition open to a vegetarian order: ${ing('black-beans').p * 2} g of protein and ${ing('black-beans').fib * 2} g of fiber for ${ing('black-beans').cal * 2} calories."],

  ['Is Chipotle rice Whole30 compliant?',
    "No, Chipotle rice is not Whole30 compliant. Rice is a grain, and both white and brown are excluded along with the flour tortilla. Cauliflower rice complies on the grain rule at ${ing('cauli-rice').c} g of carbohydrate and ${ing('cauli-rice').cal} calories, though its preparation is worth checking if you are strict about added ingredients."],
  ['Are Chipotle beans allowed on Whole30?',
    "No, Chipotle beans are not allowed on Whole30. Legumes are excluded, which removes ${ing('black-beans').p} g of protein and ${ing('black-beans').fib} g of fiber from an otherwise straightforward bowl. <a href=\"/diet/paleo\">The paleo guide</a> applies the same rule, and both leave guacamole as the main remaining source of fat and fiber."],
]);
