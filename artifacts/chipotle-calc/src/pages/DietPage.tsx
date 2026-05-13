import { useParams, Link } from "wouter";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import Calculator from "@/components/Calculator";

const DIET_META: Record<string, { title: string; description: string; h1: string; intro: string }> = {
  "keto-chipotle": {
    title: "Keto Chipotle Orders — What to Get and Avoid | ChipotleMacros",
    description: "Best keto Chipotle orders. Full guide to ordering low-carb at Chipotle with calorie and net carb counts.",
    h1: "Keto Chipotle",
    intro: "Chipotle works well for keto when you skip the rice, beans, and tortillas. Order a salad bowl with any protein, add cheese, sour cream, guacamole, and fresh tomato salsa for a meal with approximately 8–12g net carbs.",
  },
  "vegan-chipotle": {
    title: "Vegan Chipotle Orders — What's Actually Vegan | ChipotleMacros",
    description: "Complete guide to vegan options at Chipotle. Which items are vegan and how to build a high-protein vegan bowl.",
    h1: "Vegan Chipotle",
    intro: "Sofritas (spiced tofu), black beans, pinto beans, both rice options, and most salsas are vegan. Skip cheese, sour cream, chipotle-honey vinaigrette, and of course all meat proteins.",
  },
  "high-protein-chipotle": {
    title: "High Protein Chipotle Orders — Max Protein Builds | ChipotleMacros",
    description: "How to order the highest protein meal at Chipotle. Double chicken, black beans, and more — full nutrition breakdown.",
    h1: "High Protein Chipotle",
    intro: "Double chicken (54–60g protein) + black beans (8g) + cheese (6g) gets you 68–74g of protein in a single bowl. This is one of the highest protein-to-calorie ratios available at any fast casual restaurant.",
  },
  "low-calorie-chipotle": {
    title: "Low Calorie Chipotle Orders — Under 400 Calories | ChipotleMacros",
    description: "How to order a low calorie Chipotle meal. Builds under 400 calories with full nutrition breakdown.",
    h1: "Low Calorie Chipotle",
    intro: "The lowest calorie Chipotle build starts with a salad base (20 calories), adds chicken (180 calories), and keeps toppings to fresh salsa and lettuce — coming in under 215 calories total. Adding black beans for satiety brings it to ~345 calories.",
  },
  "whole30-chipotle": {
    title: "Whole30 Chipotle Orders — Compliant Builds | ChipotleMacros",
    description: "What to order at Chipotle on Whole30. Compliant items and what to avoid.",
    h1: "Whole30 Chipotle",
    intro: "Whole30-compliant Chipotle options include chicken, steak, carnitas, barbacoa, fajita veggies, and most salsas. Skip the rice, beans, cheese, sour cream, and tortillas.",
  },
  "gluten-free-chipotle": {
    title: "Gluten-Free Chipotle Options | ChipotleMacros",
    description: "Full guide to gluten-free ordering at Chipotle. Which items are gluten-free and cross-contamination risks.",
    h1: "Gluten-Free Chipotle",
    intro: "Most Chipotle ingredients are naturally gluten-free. The main exception is the flour tortilla. Bowl bases, proteins, beans, salsas, and most toppings are gluten-free — but shared preparation surfaces mean cross-contact is possible.",
  },
  "vegetarian-chipotle": {
    title: "Vegetarian Chipotle Orders | ChipotleMacros",
    description: "Best vegetarian options at Chipotle. Sofritas, beans, rice, and veggie builds with full nutrition data.",
    h1: "Vegetarian Chipotle",
    intro: "Chipotle's vegetarian options include sofritas, black beans, pinto beans, both rice options, all salsas, fajita veggies, cheese, and sour cream. A sofritas bowl with black beans, rice, cheese, and guacamole delivers 30–35g protein.",
  },
  "dairy-free-chipotle": {
    title: "Dairy-Free Chipotle Orders | ChipotleMacros",
    description: "Dairy-free Chipotle ordering guide. What contains dairy and what doesn't.",
    h1: "Dairy-Free Chipotle",
    intro: "Dairy-free items at Chipotle include all proteins, both rice options, both beans, all salsas, guacamole, fajita veggies, and lettuce. Avoid: cheese, sour cream, and queso blanco.",
  },
  "paleo-chipotle": {
    title: "Paleo Chipotle Orders | ChipotleMacros",
    description: "How to order paleo at Chipotle. Compliant options and what to skip.",
    h1: "Paleo Chipotle",
    intro: "Paleo-friendly Chipotle builds use a salad or fajita veggies base, any meat protein, fajita veggies, fresh tomato salsa or tomatillo salsa, and guacamole. Skip rice, beans, tortillas, cheese, sour cream, and queso.",
  },
  "low-sodium-chipotle": {
    title: "Low Sodium Chipotle Orders | ChipotleMacros",
    description: "How to order low sodium at Chipotle. Which items are highest in sodium and how to keep your total under 800mg.",
    h1: "Low Sodium Chipotle",
    intro: "Chipotle can be high in sodium. The highest-sodium items are fresh tomato salsa (470mg), barbacoa (540mg), tomatillo-red salsa (540mg), and queso (470mg). Brown rice (195mg) is significantly lower sodium than white rice (390mg).",
  },
  "low-carb-chipotle": {
    title: "Low Carb Chipotle Orders | ChipotleMacros",
    description: "Low carb Chipotle builds under 30g carbs. Full nutrition breakdown for each option.",
    h1: "Low Carb Chipotle",
    intro: "For low carb ordering at Chipotle, start with a salad base, pick any protein, skip rice and beans, add sour cream, cheese, guacamole, and fresh tomato salsa. This keeps total carbs to approximately 13–17g.",
  },
};

export default function DietPage() {
  const { name } = useParams<{ name: string }>();
  const meta = DIET_META[name ?? ""] ?? {
    title: `${name} Chipotle | ChipotleMacros`,
    description: `${name} Chipotle ordering guide.`,
    h1: name ?? "Diet",
    intro: "Use the calculator to build a meal that fits your dietary needs.",
  };

  return (
    <Layout>
      <SeoHead
        title={meta.title}
        description={meta.description}
        canonicalPath={`/diet/${name}`}
      />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <nav className="mb-4 text-xs text-gray-400">
          <Link href="/">Home</Link> / {meta.h1}
        </nav>
        <h1 className="mb-3 text-3xl font-bold text-gray-900">{meta.h1}</h1>
        <p className="mb-8 text-gray-600">{meta.intro}</p>
        <Calculator />
      </div>
    </Layout>
  );
}
