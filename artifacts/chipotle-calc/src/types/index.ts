export type Category =
  | "base"
  | "protein"
  | "beans"
  | "salsa"
  | "toppings"
  | "extras"
  | "drinks";

export type Quantity = "none" | "light" | "regular" | "extra" | "double";

export interface Ingredient {
  id: string;
  name: string;
  category: Category;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sodium: number;
  sugar: number;
  cost: number;
  isVegan: boolean;
  isGlutenFree: boolean;
  isDairyFree: boolean;
  slug?: string;
}

export interface SelectedIngredient {
  ingredientId: string;
  quantity: Quantity;
}

export interface MacroGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface SavedMeal {
  id: string;
  name: string;
  items: SelectedIngredient[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  savedAt: string;
}

export interface NutritionTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sodium: number;
  sugar: number;
  cost: number;
}
