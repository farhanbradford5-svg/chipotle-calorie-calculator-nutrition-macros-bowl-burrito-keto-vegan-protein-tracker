import { useState } from "react";
import { useCalculatorStore } from "@/store/calculatorStore";
import { INGREDIENTS, INGREDIENTS_BY_CATEGORY, QUANTITY_MULTIPLIERS } from "@/data/ingredients";
import type { Category, Quantity } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CATEGORY_LABELS: Record<Category, string> = {
  base: "Base",
  protein: "Protein",
  beans: "Beans",
  salsa: "Salsa",
  toppings: "Toppings",
  extras: "Extras",
  drinks: "Drinks",
};

const CATEGORY_ORDER: Category[] = ["base", "protein", "beans", "salsa", "toppings", "extras"];

const QUANTITIES: { value: Quantity; label: string }[] = [
  { value: "none", label: "None" },
  { value: "light", label: "Light" },
  { value: "regular", label: "Regular" },
  { value: "extra", label: "Extra" },
  { value: "double", label: "Double" },
];

function MacroBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="space-y-0.5">
      <div className="flex justify-between text-xs text-gray-600">
        <span>{label}</span>
        <span className="font-medium">{value}g</span>
      </div>
      <div className="h-2 rounded-full bg-gray-100">
        <div
          className={cn("h-2 rounded-full transition-all", color)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function Calculator() {
  const { currentItems, setQuantity, clearBuild, saveMeal, mealName, setMealName, getTotals } =
    useCalculatorStore();
  const [activeCategory, setActiveCategory] = useState<Category>("base");
  const totals = getTotals();

  const getItemQuantity = (id: string): Quantity => {
    return currentItems.find((i) => i.ingredientId === id)?.quantity ?? "none";
  };

  const sodiumWarning = totals.sodium > 1500;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Totals strip */}
      <div className="grid grid-cols-4 divide-x divide-gray-100 rounded-t-2xl bg-orange-50 text-center">
        <div className="px-4 py-3">
          <p className="text-2xl font-bold text-orange-600">{totals.calories}</p>
          <p className="text-xs text-gray-500">Calories</p>
        </div>
        <div className="px-4 py-3">
          <p className="text-2xl font-bold text-gray-800">{totals.protein}g</p>
          <p className="text-xs text-gray-500">Protein</p>
        </div>
        <div className="px-4 py-3">
          <p className="text-2xl font-bold text-gray-800">{totals.carbs}g</p>
          <p className="text-xs text-gray-500">Carbs</p>
        </div>
        <div className="px-4 py-3">
          <p className="text-2xl font-bold text-gray-800">{totals.fat}g</p>
          <p className="text-xs text-gray-500">Fat</p>
        </div>
      </div>

      {/* Sodium warning */}
      {sodiumWarning && (
        <div className="bg-yellow-50 px-4 py-2 text-xs text-yellow-800 border-b border-yellow-100">
          High sodium: {totals.sodium}mg ({Math.round((totals.sodium / 2300) * 100)}% of daily limit)
        </div>
      )}

      <div className="p-4">
        {/* Macro bars */}
        <div className="mb-4 space-y-2">
          <MacroBar label="Protein" value={totals.protein} max={200} color="bg-blue-500" />
          <MacroBar label="Carbs" value={totals.carbs} max={300} color="bg-yellow-400" />
          <MacroBar label="Fat" value={totals.fat} max={100} color="bg-orange-400" />
          <MacroBar label="Fiber" value={totals.fiber} max={38} color="bg-green-500" />
        </div>

        {/* Dietary badges */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {currentItems.length > 0 && INGREDIENTS.filter((i) => currentItems.some((ci) => ci.ingredientId === i.id)).every((i) => i.isVegan) && (
            <Badge variant="success">Vegan</Badge>
          )}
          {currentItems.length > 0 && INGREDIENTS.filter((i) => currentItems.some((ci) => ci.ingredientId === i.id)).every((i) => i.isGlutenFree) && (
            <Badge variant="success">Gluten-Free</Badge>
          )}
          {currentItems.length > 0 && INGREDIENTS.filter((i) => currentItems.some((ci) => ci.ingredientId === i.id)).every((i) => i.isDairyFree) && (
            <Badge variant="success">Dairy-Free</Badge>
          )}
          {totals.carbs < 25 && currentItems.length > 0 && (
            <Badge variant="success">Keto-Friendly</Badge>
          )}
          {totals.calories < 500 && currentItems.length > 0 && (
            <Badge variant="secondary">Low Calorie</Badge>
          )}
          {totals.protein > 40 && currentItems.length > 0 && (
            <Badge variant="secondary">High Protein</Badge>
          )}
        </div>

        {/* Category tabs */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {CATEGORY_ORDER.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                activeCategory === cat
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* Ingredient list */}
        <div className="space-y-2">
          {(INGREDIENTS_BY_CATEGORY[activeCategory] ?? []).map((ingredient) => {
            const qty = getItemQuantity(ingredient.id);
            const multiplier = QUANTITY_MULTIPLIERS[qty] ?? 0;
            const displayCals = qty === "none" ? ingredient.calories : Math.round(ingredient.calories * multiplier);
            return (
              <div key={ingredient.id} className="flex items-center gap-3 rounded-lg border border-gray-100 p-2.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-800">{ingredient.name}</p>
                  <p className="text-xs text-gray-400">
                    {qty !== "none" ? `${displayCals} cal` : `${ingredient.calories} cal`}
                    {" · "}
                    {ingredient.protein}g P · {ingredient.carbs}g C · {ingredient.fat}g F
                  </p>
                </div>
                <div className="flex gap-1">
                  {QUANTITIES.map((q) => (
                    <button
                      key={q.value}
                      onClick={() => setQuantity(ingredient.id, q.value)}
                      className={cn(
                        "rounded px-1.5 py-0.5 text-xs transition-colors",
                        qty === q.value
                          ? "bg-orange-600 text-white"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      )}
                    >
                      {q.value === "regular" ? "Reg" : q.value === "double" ? "2x" : q.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Save / Clear */}
        {currentItems.length > 0 && (
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="Name this meal…"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
            <Button size="sm" onClick={saveMeal} className="bg-orange-600 hover:bg-orange-700 text-white">
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={clearBuild}>
              Clear
            </Button>
          </div>
        )}

        {totals.cost > 0 && (
          <p className="mt-3 text-center text-xs text-gray-400">
            Estimated cost: <span className="font-semibold">${totals.cost.toFixed(2)}</span>
            <span className="text-gray-300"> (premium toppings only)</span>
          </p>
        )}
      </div>
    </div>
  );
}
