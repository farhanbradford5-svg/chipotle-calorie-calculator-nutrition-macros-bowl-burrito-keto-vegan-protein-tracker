import { useParams, Link } from "wouter";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import Calculator from "@/components/Calculator";
import { INGREDIENTS } from "@/data/ingredients";

function slugToTitle(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bCalories\b/, "Calories")
    .replace(/\bNutrition\b/, "Nutrition");
}

export default function ItemPage() {
  const { slug } = useParams<{ slug: string }>();
  const title = slugToTitle(slug ?? "");
  const ingredient = INGREDIENTS.find((i) => i.slug === slug);

  return (
    <Layout>
      <SeoHead
        title={`${title} — ChipotleMacros`}
        description={`${title}: calories, protein, carbs, fat, fiber, and sodium. Full Chipotle nutrition data.`}
        canonicalPath={`/item/${slug}`}
      />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <nav className="mb-4 text-xs text-gray-400">
          <Link href="/">Home</Link> / <Link href="/menu">Menu</Link> / {title}
        </nav>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">{title}</h1>

        {ingredient && (
          <div className="mb-8 grid grid-cols-3 gap-4 sm:grid-cols-6">
            {[
              { label: "Calories", value: ingredient.calories },
              { label: "Protein", value: `${ingredient.protein}g` },
              { label: "Carbs", value: `${ingredient.carbs}g` },
              { label: "Fat", value: `${ingredient.fat}g` },
              { label: "Fiber", value: `${ingredient.fiber}g` },
              { label: "Sodium", value: `${ingredient.sodium}mg` },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border border-gray-100 bg-orange-50 p-3 text-center">
                <p className="text-xl font-bold text-orange-600">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        <p className="mb-6 text-gray-600">
          Use the calculator below to build a complete meal with {ingredient?.name ?? title} and see the full
          nutrition breakdown.
        </p>

        <Calculator />
      </div>
    </Layout>
  );
}
