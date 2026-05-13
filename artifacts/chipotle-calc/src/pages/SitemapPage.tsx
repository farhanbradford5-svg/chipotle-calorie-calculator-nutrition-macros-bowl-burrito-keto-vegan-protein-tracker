import { Link } from "wouter";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";

const SECTIONS = [
  {
    heading: "Calculator",
    links: [
      { href: "/", label: "Chipotle Calorie Calculator (Home)" },
      { href: "/menu", label: "Menu Index" },
    ],
  },
  {
    heading: "Menu Categories",
    links: [
      { href: "/menu/burrito", label: "Burritos" },
      { href: "/menu/burrito-bowl", label: "Burrito Bowls" },
      { href: "/menu/salad", label: "Salads" },
      { href: "/menu/tacos", label: "Tacos" },
      { href: "/menu/quesadilla", label: "Quesadillas" },
      { href: "/menu/chips-sides", label: "Chips & Sides" },
      { href: "/menu/drinks", label: "Drinks" },
      { href: "/menu/kids-meal", label: "Kid's Meals" },
    ],
  },
  {
    heading: "Diet Pages",
    links: [
      { href: "/diet/keto-chipotle", label: "Keto Chipotle" },
      { href: "/diet/vegan-chipotle", label: "Vegan Chipotle" },
      { href: "/diet/high-protein-chipotle", label: "High Protein Chipotle" },
      { href: "/diet/low-calorie-chipotle", label: "Low Calorie Chipotle" },
      { href: "/diet/whole30-chipotle", label: "Whole30 Chipotle" },
      { href: "/diet/gluten-free-chipotle", label: "Gluten-Free Chipotle" },
      { href: "/diet/vegetarian-chipotle", label: "Vegetarian Chipotle" },
      { href: "/diet/dairy-free-chipotle", label: "Dairy-Free Chipotle" },
      { href: "/diet/paleo-chipotle", label: "Paleo Chipotle" },
      { href: "/diet/low-sodium-chipotle", label: "Low Sodium Chipotle" },
      { href: "/diet/low-carb-chipotle", label: "Low Carb Chipotle" },
    ],
  },
  {
    heading: "Guides",
    links: [
      { href: "/guides/chipotle-macros-guide", label: "Chipotle Macros Guide" },
      { href: "/guides/chipotle-weight-loss-guide", label: "Weight Loss Guide" },
      { href: "/guides/chipotle-muscle-gain-guide", label: "Muscle Gain Guide" },
      { href: "/guides/chipotle-allergens-guide", label: "Allergens Guide" },
      { href: "/guides/chipotle-sodium-guide", label: "Sodium Guide" },
      { href: "/guides/chipotle-secret-menu", label: "Secret Menu" },
      { href: "/guides/chipotle-vs-other-fast-food", label: "Chipotle vs Other Fast Food" },
      { href: "/guides/chipotle-cheap-meals", label: "Cheap Meals Guide" },
      { href: "/guides/chipotle-fiber-guide", label: "Fiber Guide" },
      { href: "/guides/chipotle-meal-prep", label: "Meal Prep Guide" },
    ],
  },
  {
    heading: "About & Trust",
    links: [
      { href: "/about", label: "About ChipotleCalc" },
      { href: "/methodology", label: "Methodology" },
      { href: "/editorial-policy", label: "Editorial Policy" },
      { href: "/sources", label: "Sources" },
      { href: "/contact", label: "Contact" },
      { href: "/changelog", label: "Changelog" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/disclaimer", label: "Disclaimer" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-of-service", label: "Terms of Service" },
      { href: "/cookie-policy", label: "Cookie Policy" },
      { href: "/accessibility", label: "Accessibility" },
      { href: "/dmca", label: "DMCA" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <Layout>
      <SeoHead
        title="Sitemap — ChipotleCalc"
        description="Complete sitemap for ChipotleCalc — all pages and tools."
        canonicalPath="/sitemap"
      />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Sitemap</h1>
        <div className="grid gap-8 sm:grid-cols-2">
          {SECTIONS.map((section) => (
            <div key={section.heading}>
              <h2 className="mb-3 font-semibold text-gray-800">{section.heading}</h2>
              <ul className="space-y-1.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-orange-600 hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
