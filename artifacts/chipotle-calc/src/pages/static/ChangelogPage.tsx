import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";

const CHANGELOG = [
  {
    date: "May 2026",
    entries: [
      "Initial public launch of ChipotleCalc.",
      "79 ingredients mapped with full macro data.",
      "Quantity modifiers (Light, Regular, Extra, Double) added.",
      "Dietary badge system implemented (Vegan, GF, Dairy-Free, Keto, High Protein, Low Cal).",
      "Sodium warning threshold set at 1,500mg per AHA guidelines.",
      "Meal save and recent meals functionality added.",
      "Macro goal tracking added.",
      "All nutrition data verified against Chipotle's published nutrition calculator (May 2026 version).",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <Layout>
      <SeoHead
        title="Changelog — ChipotleCalc Data and Feature Updates"
        description="A log of all nutrition data updates and feature changes on ChipotleCalc."
        canonicalPath="/changelog"
      />
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Changelog</h1>
        <p className="mb-8 text-gray-500 text-sm">
          All significant data updates and feature changes, newest first.
        </p>
        <div className="space-y-10">
          {CHANGELOG.map((release) => (
            <div key={release.date}>
              <h2 className="mb-3 text-lg font-semibold text-gray-800">{release.date}</h2>
              <ul className="space-y-2">
                {release.entries.map((entry, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-600">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                    {entry}
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
