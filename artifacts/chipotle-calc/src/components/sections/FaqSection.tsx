import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How many calories is a Chipotle chicken bowl?",
    a: "A standard Chipotle chicken bowl with white rice, black beans, fresh salsa, and cheese is approximately 735–800 calories. Add guacamole and it rises to 965–1,030 calories. Use the calculator above to see the exact count for your specific build.",
  },
  {
    q: "What is the lowest calorie option at Chipotle?",
    a: "The lowest calorie build is a salad bowl (0 calories for the base) with chicken (180 calories), fresh tomato salsa (25 calories), and lettuce (5 calories) — totaling approximately 210–215 calories. Skip the dressing, rice, beans, cheese, and guacamole.",
  },
  {
    q: "How much protein does a Chipotle bowl have?",
    a: "A single chicken serving provides approximately 32g of protein. With double chicken, you get approximately 54–60g protein. Adding black beans contributes another 8g. A high-protein bowl can realistically reach 65–75g total protein.",
  },
  {
    q: "Is Chipotle good for weight loss?",
    a: "Chipotle can absolutely be part of a weight loss plan. The key is building a bowl that fits your calorie target. A salad bowl with chicken, beans, and salsa lands around 380–420 calories — a filling, high-protein meal well-suited for a calorie deficit.",
  },
  {
    q: "How many calories is Chipotle guacamole?",
    a: "Chipotle guacamole is 230 calories per serving — the highest single-ingredient calorie addition on the menu. It adds 22g of fat (mostly healthy monounsaturated fat). Whether it's worth it depends on your daily calorie budget.",
  },
  {
    q: "What is the highest protein item at Chipotle?",
    a: "Double chicken is the highest protein option at approximately 54–60g per serving. Single chicken provides the best protein-to-calorie ratio at 32g for 180 calories. Steak offers 21g protein per serving.",
  },
  {
    q: "Can you order Chipotle on a keto diet?",
    a: "Yes — order a salad bowl (not burrito or rice base), choose any protein, skip the rice and beans (both high carb), add sour cream, cheese, and guacamole, and use fresh tomato salsa in moderation. A proper keto Chipotle bowl has approximately 8–12g net carbs.",
  },
  {
    q: "Is Chipotle good for building muscle?",
    a: "Chipotle is excellent for muscle building. A double chicken bowl with rice, black beans, and toppings can deliver 65–75g protein, 800–1,000 calories, and significant carbohydrates for glycogen replenishment — a solid post-workout meal.",
  },
  {
    q: "How accurate is the Chipotle calorie calculator?",
    a: "This calculator uses Chipotle's officially published nutrition values with standard quantity multipliers (Light = 0.5×, Extra = 1.5×, Double = 2.0×). Actual values can vary by location and portion size. Use this for meal planning guidance; for medical dietary requirements, verify with Chipotle's official source.",
  },
  {
    q: "What is the cheapest Chipotle order?",
    a: "The cheapest full meal is a bean and rice burrito bowl with fresh salsa at around $8–9 depending on location. Skipping premium toppings (guacamole adds $2.65–$3, queso adds $1.65–$2) keeps costs down while still getting a filling meal.",
  },
  {
    q: "How much sodium is in a Chipotle bowl?",
    a: "Sodium varies enormously by build. A simple chicken bowl with rice and fresh salsa can be around 800–900mg. A fully-loaded bowl with barbacoa, cheese, sour cream, and hot salsa can exceed 2,000mg — more than 85% of the daily recommended limit. Use the sodium indicator in the calculator to check your build.",
  },
  {
    q: "Does Chipotle have vegan options?",
    a: "Yes — sofritas (spiced tofu) is the main vegan protein. Black beans and pinto beans are vegan-friendly. All rice options are vegan. Fresh tomato salsa, roasted corn salsa, and tomatillo salsas are vegan. Skip cheese, sour cream, and check that your specific location's preparation practices meet your requirements.",
  },
];

interface FaqItemProps {
  q: string;
  a: string;
  index: number;
}

function FaqItem({ q, a, index }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  const id = `faq-${index}`;

  return (
    <div
      className="border-b border-gray-100 last:border-0"
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <button
        id={`${id}-trigger`}
        aria-expanded={open}
        aria-controls={`${id}-answer`}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-gray-800 hover:text-orange-600 transition-colors"
      >
        <span itemProp="name">{q}</span>
        <ChevronDown
          className={cn(
            "ml-2 h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        id={`${id}-answer`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        className={cn(
          "overflow-hidden text-sm text-gray-600 transition-all duration-200",
          open ? "max-h-96 pb-4" : "max-h-0"
        )}
        itemScope
        itemProp="acceptedAnswer"
        itemType="https://schema.org/Answer"
      >
        <p itemProp="text">{a}</p>
      </div>
    </div>
  );
}

export default function FaqSection() {
  return (
    <section
      aria-label="Frequently asked questions"
      className="mx-auto max-w-3xl"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        Frequently Asked Questions
      </h2>
      <div className="rounded-xl border border-gray-200 bg-white px-6 divide-y divide-gray-100">
        {faqs.map((faq, i) => (
          <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
        ))}
      </div>
    </section>
  );
}
