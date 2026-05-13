import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "inject-page-meta",
      transformIndexHtml: {
        order: "post",
        handler(html, ctx) {
          if (!ctx.path) return html;

          const metaMap: Record<string, { title: string; description: string }> = {
            "/": {
              title: "Chipotle Calorie Calculator — Build Your Bowl | ChipotleMacros",
              description: "Free Chipotle calorie calculator. Build any bowl, burrito, salad or tacos and see exact calories, protein, carbs, fat and sodium in real time.",
            },
            "/menu/burrito": {
              title: "Chipotle Burrito Calories — Full Nutrition Breakdown | ChipotleMacros",
              description: "How many calories is a Chipotle burrito? Build any burrito and see exact calories, protein, carbs and fat.",
            },
            "/menu/burrito-bowl": {
              title: "Chipotle Burrito Bowl Calories — Full Nutrition | ChipotleMacros",
              description: "Build any Chipotle burrito bowl and see exact calorie and macro counts in real time.",
            },
            "/menu/salad": {
              title: "Chipotle Salad Calories — Full Nutrition Breakdown | ChipotleMacros",
              description: "Chipotle salad nutrition calculator. Build any salad and see calories, protein, carbs and fat.",
            },
            "/menu/tacos": {
              title: "Chipotle Taco Calories — Full Nutrition | ChipotleMacros",
              description: "Chipotle taco nutrition. See calories for soft corn, crispy corn, and flour taco builds.",
            },
            "/menu/quesadilla": {
              title: "Chipotle Quesadilla Calories — Full Nutrition | ChipotleMacros",
              description: "Chipotle quesadilla calorie and nutrition breakdown.",
            },
            "/menu/chips-sides": {
              title: "Chipotle Chips & Sides Calories | ChipotleMacros",
              description: "Chipotle chips, guacamole, queso and sides nutrition information.",
            },
            "/menu/drinks": {
              title: "Chipotle Drinks Calories | ChipotleMacros",
              description: "Calories and nutrition for Chipotle drinks.",
            },
            "/menu/kids-meal": {
              title: "Chipotle Kids Meal Calories | ChipotleMacros",
              description: "Chipotle kids meal nutrition and calorie information.",
            },
            "/diet/keto-chipotle": {
              title: "Keto Chipotle Orders — What to Get and Avoid | ChipotleMacros",
              description: "Best keto Chipotle orders. Full guide to ordering low-carb at Chipotle with calorie and net carb counts.",
            },
            "/diet/vegan-chipotle": {
              title: "Vegan Chipotle Orders — What's Actually Vegan | ChipotleMacros",
              description: "Complete guide to vegan options at Chipotle. Which items are vegan and how to build a high-protein vegan bowl.",
            },
            "/diet/high-protein-chipotle": {
              title: "High Protein Chipotle Orders — Max Protein Builds | ChipotleMacros",
              description: "How to order the highest protein meal at Chipotle. Double chicken, black beans, and more.",
            },
            "/diet/low-calorie-chipotle": {
              title: "Low Calorie Chipotle Orders — Under 400 Calories | ChipotleMacros",
              description: "How to order a low calorie Chipotle meal. Builds under 400 calories with full nutrition breakdown.",
            },
            "/diet/whole30-chipotle": {
              title: "Whole30 Chipotle Orders — Compliant Builds | ChipotleMacros",
              description: "What to order at Chipotle on Whole30. Compliant items and what to avoid.",
            },
            "/diet/gluten-free-chipotle": {
              title: "Gluten-Free Chipotle Options | ChipotleMacros",
              description: "Full guide to gluten-free ordering at Chipotle. Which items are gluten-free and cross-contamination risks.",
            },
            "/diet/vegetarian-chipotle": {
              title: "Vegetarian Chipotle Orders | ChipotleMacros",
              description: "Best vegetarian options at Chipotle. Sofritas, beans, rice, and veggie builds with full nutrition data.",
            },
            "/diet/dairy-free-chipotle": {
              title: "Dairy-Free Chipotle Orders | ChipotleMacros",
              description: "How to order dairy-free at Chipotle. Which items contain dairy and what to skip.",
            },
            "/diet/paleo-chipotle": {
              title: "Paleo Chipotle Orders | ChipotleMacros",
              description: "Best paleo-friendly Chipotle orders. What fits the paleo diet and what to avoid.",
            },
            "/diet/low-sodium-chipotle": {
              title: "Low Sodium Chipotle Orders | ChipotleMacros",
              description: "How to order low sodium at Chipotle. Which ingredients are highest in sodium and how to keep totals low.",
            },
            "/diet/low-carb-chipotle": {
              title: "Low Carb Chipotle Orders | ChipotleMacros",
              description: "Best low carb Chipotle builds. How to order under 30g carbs at Chipotle.",
            },
            "/guides/chipotle-macros-guide": {
              title: "Chipotle Macros Guide — Complete Nutrition Breakdown | ChipotleMacros",
              description: "Everything you need to know about Chipotle macros. Protein, carbs, fat, and fiber for every ingredient.",
            },
            "/guides/chipotle-weight-loss-guide": {
              title: "Chipotle Weight Loss Guide — How to Order in a Calorie Deficit | ChipotleMacros",
              description: "How to order at Chipotle for weight loss. Best low-calorie builds and what to avoid.",
            },
            "/guides/chipotle-muscle-gain-guide": {
              title: "Chipotle Muscle Gain Guide — Max Protein Builds | ChipotleMacros",
              description: "How to order Chipotle for muscle gain. High protein builds and post-workout meal options.",
            },
            "/guides/chipotle-allergens-guide": {
              title: "Chipotle Allergen Guide — What Contains What | ChipotleMacros",
              description: "Complete Chipotle allergen guide. Which items contain gluten, dairy, nuts, soy, and other common allergens.",
            },
            "/guides/chipotle-sodium-guide": {
              title: "Chipotle Sodium Guide — High and Low Sodium Options | ChipotleMacros",
              description: "Full Chipotle sodium guide. How much sodium is in each ingredient and how to keep your total low.",
            },
            "/guides/chipotle-secret-menu": {
              title: "Chipotle Secret Menu — What You Can Actually Order | ChipotleMacros",
              description: "Chipotle secret menu items and hacks. Quesarito, double protein, free extras, and more.",
            },
            "/guides/chipotle-vs-other-fast-food": {
              title: "Chipotle vs Other Fast Food — Nutrition Comparison | ChipotleMacros",
              description: "How does Chipotle compare nutritionally to McDonald's, Taco Bell, Subway, and Panera?",
            },
            "/guides/chipotle-cheap-meals": {
              title: "Cheapest Chipotle Orders — Most Value for Your Money | ChipotleMacros",
              description: "How to order Chipotle on a budget. The cheapest builds and how to maximize value.",
            },
            "/guides/chipotle-fiber-guide": {
              title: "Chipotle Fiber Guide — Highest Fiber Builds | ChipotleMacros",
              description: "How to maximize fiber in your Chipotle order. Which ingredients have the most fiber.",
            },
            "/guides/chipotle-meal-prep": {
              title: "Chipotle Meal Prep — Tracking and Planning | ChipotleMacros",
              description: "How to use Chipotle for meal prep and consistent macro tracking.",
            },
            "/about": {
              title: "About ChipotleMacros — Free Chipotle Nutrition Calculator",
              description: "About ChipotleMacros. How we built the most accurate free Chipotle calorie calculator.",
            },
            "/methodology": {
              title: "Methodology — How ChipotleMacros Calculates Nutrition",
              description: "How ChipotleMacros calculates Chipotle nutrition values. Data sources, quantity modifiers, dietary badge criteria.",
            },
            "/editorial-policy": {
              title: "Editorial Policy — ChipotleMacros",
              description: "ChipotleMacros editorial policy covering data accuracy, update schedule, and corrections process.",
            },
            "/sources": {
              title: "Sources — ChipotleMacros Nutrition Data References",
              description: "Data sources used by ChipotleMacros including Chipotle official nutrition data and USDA references.",
            },
            "/faq": {
              title: "FAQ — Chipotle Nutrition Questions Answered | ChipotleMacros",
              description: "Frequently asked questions about Chipotle nutrition, calories, protein, and ordering for specific diets.",
            },
            "/privacy-policy": {
              title: "Privacy Policy — ChipotleMacros",
              description: "ChipotleMacros privacy policy. How we handle your data.",
            },
            "/terms-of-service": {
              title: "Terms of Service — ChipotleMacros",
              description: "ChipotleMacros terms of service.",
            },
          };

          const path = ctx.path.replace(/\/$/, "") || "/";
          const meta = metaMap[path];
          if (!meta) return html;

          return html
            .replace(
              /<title>[^<]*<\/title>/,
              `<title>${meta.title}</title>`
            )
            .replace(
              /<meta name="description" content="[^"]*"/,
              `<meta name="description" content="${meta.description}"`
            );
        },
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(__dirname),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
});
