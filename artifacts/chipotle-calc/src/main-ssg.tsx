import { ViteReactSSG } from "vite-react-ssg";
import { useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

function AppSSR() {
  const { pathname } = useLocation();
  return (
    <HelmetProvider>
      <App ssrPath={pathname} />
    </HelmetProvider>
  );
}

const routes = [
  { path: "/", element: <AppSSR /> },
  { path: "/menu", element: <AppSSR /> },
  { path: "/menu/burrito", element: <AppSSR /> },
  { path: "/menu/burrito-bowl", element: <AppSSR /> },
  { path: "/menu/salad", element: <AppSSR /> },
  { path: "/menu/tacos", element: <AppSSR /> },
  { path: "/menu/quesadilla", element: <AppSSR /> },
  { path: "/menu/chips-sides", element: <AppSSR /> },
  { path: "/menu/drinks", element: <AppSSR /> },
  { path: "/menu/kids-meal", element: <AppSSR /> },
  { path: "/item/chicken-bowl-calories", element: <AppSSR /> },
  { path: "/item/steak-bowl-calories", element: <AppSSR /> },
  { path: "/item/barbacoa-bowl-calories", element: <AppSSR /> },
  { path: "/item/carnitas-bowl-calories", element: <AppSSR /> },
  { path: "/item/sofritas-bowl-calories", element: <AppSSR /> },
  { path: "/item/double-chicken-bowl-calories", element: <AppSSR /> },
  { path: "/item/chicken-burrito-calories", element: <AppSSR /> },
  { path: "/item/steak-burrito-calories", element: <AppSSR /> },
  { path: "/item/chicken-salad-calories", element: <AppSSR /> },
  { path: "/item/chicken-tacos-calories", element: <AppSSR /> },
  { path: "/item/chicken-quesadilla-calories", element: <AppSSR /> },
  { path: "/item/chipotle-white-rice-nutrition", element: <AppSSR /> },
  { path: "/item/chipotle-brown-rice-nutrition", element: <AppSSR /> },
  { path: "/item/chipotle-black-beans-nutrition", element: <AppSSR /> },
  { path: "/item/chipotle-pinto-beans-nutrition", element: <AppSSR /> },
  { path: "/item/chipotle-guacamole-nutrition", element: <AppSSR /> },
  { path: "/item/chipotle-queso-nutrition", element: <AppSSR /> },
  { path: "/item/chipotle-chips-nutrition", element: <AppSSR /> },
  { path: "/item/chipotle-sour-cream-nutrition", element: <AppSSR /> },
  { path: "/item/chipotle-cheese-nutrition", element: <AppSSR /> },
  { path: "/item/chipotle-lettuce-nutrition", element: <AppSSR /> },
  { path: "/item/chipotle-fajita-veggies-nutrition", element: <AppSSR /> },
  { path: "/item/chipotle-salsa-verde-nutrition", element: <AppSSR /> },
  { path: "/item/chipotle-fresh-tomato-salsa-nutrition", element: <AppSSR /> },
  { path: "/item/chipotle-roasted-chili-corn-salsa-nutrition", element: <AppSSR /> },
  { path: "/item/chipotle-hot-salsa-nutrition", element: <AppSSR /> },
  { path: "/diet/keto-chipotle", element: <AppSSR /> },
  { path: "/diet/vegan-chipotle", element: <AppSSR /> },
  { path: "/diet/high-protein-chipotle", element: <AppSSR /> },
  { path: "/diet/low-calorie-chipotle", element: <AppSSR /> },
  { path: "/diet/whole30-chipotle", element: <AppSSR /> },
  { path: "/diet/gluten-free-chipotle", element: <AppSSR /> },
  { path: "/diet/vegetarian-chipotle", element: <AppSSR /> },
  { path: "/diet/dairy-free-chipotle", element: <AppSSR /> },
  { path: "/diet/paleo-chipotle", element: <AppSSR /> },
  { path: "/diet/low-sodium-chipotle", element: <AppSSR /> },
  { path: "/diet/low-carb-chipotle", element: <AppSSR /> },
  { path: "/guides/chipotle-macros-guide", element: <AppSSR /> },
  { path: "/guides/chipotle-weight-loss-guide", element: <AppSSR /> },
  { path: "/guides/chipotle-muscle-gain-guide", element: <AppSSR /> },
  { path: "/guides/chipotle-allergens-guide", element: <AppSSR /> },
  { path: "/guides/chipotle-sodium-guide", element: <AppSSR /> },
  { path: "/guides/chipotle-secret-menu", element: <AppSSR /> },
  { path: "/guides/chipotle-vs-other-fast-food", element: <AppSSR /> },
  { path: "/guides/chipotle-cheap-meals", element: <AppSSR /> },
  { path: "/guides/chipotle-fiber-guide", element: <AppSSR /> },
  { path: "/guides/chipotle-meal-prep", element: <AppSSR /> },
  { path: "/faq", element: <AppSSR /> },
  { path: "/sitemap", element: <AppSSR /> },
  { path: "/about", element: <AppSSR /> },
  { path: "/methodology", element: <AppSSR /> },
  { path: "/editorial-policy", element: <AppSSR /> },
  { path: "/sources", element: <AppSSR /> },
  { path: "/contact", element: <AppSSR /> },
  { path: "/changelog", element: <AppSSR /> },
  { path: "/disclaimer", element: <AppSSR /> },
  { path: "/privacy-policy", element: <AppSSR /> },
  { path: "/terms-of-service", element: <AppSSR /> },
  { path: "/cookie-policy", element: <AppSSR /> },
  { path: "/accessibility", element: <AppSSR /> },
  { path: "/dmca", element: <AppSSR /> },
];

export const createRoot = ViteReactSSG({ routes });
