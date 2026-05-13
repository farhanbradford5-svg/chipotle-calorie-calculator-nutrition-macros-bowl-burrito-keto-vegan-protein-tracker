import { useParams, Link } from "wouter";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import Calculator from "@/components/Calculator";

const CATEGORY_META: Record<string, { title: string; description: string; h1: string }> = {
  burrito: {
    title: "Chipotle Burrito Calories — Full Nutrition Breakdown | ChipotleCalc",
    description: "How many calories is a Chipotle burrito? Build any burrito and see exact calories, protein, carbs and fat.",
    h1: "Chipotle Burrito Calories",
  },
  "burrito-bowl": {
    title: "Chipotle Burrito Bowl Calories — Full Nutrition | ChipotleCalc",
    description: "Build any Chipotle burrito bowl and see exact calorie and macro counts in real time.",
    h1: "Chipotle Burrito Bowl Calories",
  },
  salad: {
    title: "Chipotle Salad Calories — Full Nutrition Breakdown | ChipotleCalc",
    description: "Chipotle salad nutrition calculator. Build any salad and see calories, protein, carbs and fat.",
    h1: "Chipotle Salad Calories",
  },
  tacos: {
    title: "Chipotle Taco Calories — Full Nutrition | ChipotleCalc",
    description: "Chipotle taco nutrition. See calories for soft corn, crispy corn, and flour taco builds.",
    h1: "Chipotle Taco Calories",
  },
  quesadilla: {
    title: "Chipotle Quesadilla Calories — Full Nutrition | ChipotleCalc",
    description: "Chipotle quesadilla calorie and nutrition breakdown.",
    h1: "Chipotle Quesadilla Calories",
  },
  "chips-sides": {
    title: "Chipotle Chips & Sides Nutrition | ChipotleCalc",
    description: "Chipotle chips, guacamole, and queso nutrition data.",
    h1: "Chipotle Chips & Sides Nutrition",
  },
  drinks: {
    title: "Chipotle Drinks Calories | ChipotleCalc",
    description: "Calories for Chipotle drinks and beverages.",
    h1: "Chipotle Drinks Calories",
  },
  "kids-meal": {
    title: "Chipotle Kid's Meal Nutrition | ChipotleCalc",
    description: "Chipotle kid's menu calorie and nutrition information.",
    h1: "Chipotle Kid's Meal Nutrition",
  },
};

export default function MenuCategoryPage() {
  const { category } = useParams<{ category: string }>();
  const meta = CATEGORY_META[category ?? ""] ?? {
    title: `Chipotle ${category} Nutrition | ChipotleCalc`,
    description: `Chipotle ${category} calorie and nutrition breakdown.`,
    h1: `Chipotle ${category}`,
  };

  return (
    <Layout>
      <SeoHead
        title={meta.title}
        description={meta.description}
        canonicalPath={`/menu/${category}`}
      />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <nav className="mb-4 text-xs text-gray-400">
          <Link href="/">Home</Link> / <Link href="/menu">Menu</Link> / {meta.h1}
        </nav>
        <h1 className="mb-6 text-3xl font-bold text-gray-900">{meta.h1}</h1>
        <Calculator />
      </div>
    </Layout>
  );
}
