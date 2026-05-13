import { Link } from "wouter";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";

const CATEGORIES = [
  { slug: "burrito", name: "Burritos", description: "Full calorie breakdown for Chipotle burritos" },
  { slug: "burrito-bowl", name: "Burrito Bowls", description: "Nutrition for every burrito bowl configuration" },
  { slug: "salad", name: "Salads", description: "Chipotle salad calories and macros" },
  { slug: "tacos", name: "Tacos", description: "Soft and crispy taco nutrition" },
  { slug: "quesadilla", name: "Quesadillas", description: "Quesadilla calorie counts" },
  { slug: "chips-sides", name: "Chips & Sides", description: "Chips, guacamole and queso nutrition" },
  { slug: "drinks", name: "Drinks", description: "Chipotle drink calories" },
  { slug: "kids-meal", name: "Kid's Meals", description: "Nutrition for Chipotle kid's menu items" },
];

export default function MenuIndexPage() {
  return (
    <Layout>
      <SeoHead
        title="Chipotle Menu Nutrition — All Categories | ChipotleCalc"
        description="Browse Chipotle nutrition by menu category. Full calorie and macro data for burritos, bowls, salads, tacos, quesadillas, chips, and more."
        canonicalPath="/menu"
      />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Chipotle Menu Nutrition</h1>
        <p className="mb-8 text-gray-500">Browse calories and macros by category.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/menu/${cat.slug}`}
              className="block rounded-xl border border-gray-200 p-5 hover:border-orange-300 hover:shadow-sm transition-all"
            >
              <p className="font-semibold text-gray-800">{cat.name}</p>
              <p className="mt-1 text-sm text-gray-500">{cat.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
