import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { SelectedIngredient, MacroGoals, SavedMeal, NutritionTotals } from "../types";
import { INGREDIENTS_BY_ID, QUANTITY_MULTIPLIERS } from "../data/ingredients";

// SSR-safe localStorage wrapper
const safeStorage = {
  getItem: (name: string): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(name);
  },
  setItem: (name: string, value: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(name, value);
  },
  removeItem: (name: string): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(name);
  },
};

const DEFAULT_MACRO_GOALS: MacroGoals = {
  calories: 2000,
  protein: 150,
  carbs: 200,
  fat: 65,
};

interface CalculatorState {
  currentItems: SelectedIngredient[];
  savedMeals: SavedMeal[];
  recentMeals: SavedMeal[];
  macroGoals: MacroGoals;
  mealName: string;

  // Actions
  setQuantity: (ingredientId: string, quantity: SelectedIngredient["quantity"]) => void;
  clearBuild: () => void;
  setMealName: (name: string) => void;
  saveMeal: () => void;
  deleteSavedMeal: (id: string) => void;
  loadMeal: (meal: SavedMeal) => void;
  setMacroGoal: (key: keyof MacroGoals, value: number) => void;

  // Derived
  getTotals: () => NutritionTotals;
}

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set, get) => ({
      currentItems: [],
      savedMeals: [],
      recentMeals: [],
      macroGoals: DEFAULT_MACRO_GOALS,
      mealName: "",

      setQuantity: (ingredientId, quantity) => {
        set((state) => {
          const existing = state.currentItems.find(
            (i) => i.ingredientId === ingredientId
          );
          if (quantity === "none") {
            return {
              currentItems: state.currentItems.filter(
                (i) => i.ingredientId !== ingredientId
              ),
            };
          }
          if (existing) {
            return {
              currentItems: state.currentItems.map((i) =>
                i.ingredientId === ingredientId ? { ...i, quantity } : i
              ),
            };
          }
          return {
            currentItems: [...state.currentItems, { ingredientId, quantity }],
          };
        });
      },

      clearBuild: () => set({ currentItems: [], mealName: "" }),

      setMealName: (name) => set({ mealName: name }),

      saveMeal: () => {
        const state = get();
        const totals = state.getTotals();
        const meal: SavedMeal = {
          id: `meal-${Date.now()}`,
          name: state.mealName || `Meal ${state.savedMeals.length + 1}`,
          items: [...state.currentItems],
          totalCalories: totals.calories,
          totalProtein: totals.protein,
          totalCarbs: totals.carbs,
          totalFat: totals.fat,
          savedAt: new Date().toISOString(),
        };
        set((s) => ({
          savedMeals: [meal, ...s.savedMeals].slice(0, 20),
          recentMeals: [meal, ...s.recentMeals].slice(0, 5),
          mealName: "",
        }));
      },

      deleteSavedMeal: (id) =>
        set((s) => ({
          savedMeals: s.savedMeals.filter((m) => m.id !== id),
        })),

      loadMeal: (meal) =>
        set({ currentItems: [...meal.items], mealName: meal.name }),

      setMacroGoal: (key, value) =>
        set((s) => ({ macroGoals: { ...s.macroGoals, [key]: value } })),

      getTotals: (): NutritionTotals => {
        const { currentItems } = get();
        const totals: NutritionTotals = {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
          fiber: 0,
          sodium: 0,
          sugar: 0,
          cost: 0,
        };
        for (const item of currentItems) {
          const ingredient = INGREDIENTS_BY_ID[item.ingredientId];
          if (!ingredient) continue;
          const multiplier = QUANTITY_MULTIPLIERS[item.quantity] ?? 1;
          totals.calories += ingredient.calories * multiplier;
          totals.protein += ingredient.protein * multiplier;
          totals.carbs += ingredient.carbs * multiplier;
          totals.fat += ingredient.fat * multiplier;
          totals.fiber += ingredient.fiber * multiplier;
          totals.sodium += ingredient.sodium * multiplier;
          totals.sugar += ingredient.sugar * multiplier;
          totals.cost += ingredient.cost * multiplier;
        }
        return {
          calories: Math.round(totals.calories),
          protein: Math.round(totals.protein * 10) / 10,
          carbs: Math.round(totals.carbs * 10) / 10,
          fat: Math.round(totals.fat * 10) / 10,
          fiber: Math.round(totals.fiber * 10) / 10,
          sodium: Math.round(totals.sodium),
          sugar: Math.round(totals.sugar * 10) / 10,
          cost: Math.round(totals.cost * 100) / 100,
        };
      },
    }),
    {
      name: "chipotle-calc-store",
      storage: createJSONStorage(() => safeStorage),
      partialize: (state) => ({
        savedMeals: state.savedMeals,
        recentMeals: state.recentMeals,
        macroGoals: state.macroGoals,
      }),
    }
  )
);
