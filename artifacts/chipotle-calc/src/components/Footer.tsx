import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 py-10 text-sm text-gray-500">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <p className="mb-3 font-semibold text-gray-700">Calculator</p>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-orange-600">Bowl Builder</Link></li>
              <li><Link href="/menu/burrito" className="hover:text-orange-600">Burritos</Link></li>
              <li><Link href="/menu/salad" className="hover:text-orange-600">Salads</Link></li>
              <li><Link href="/menu/tacos" className="hover:text-orange-600">Tacos</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-semibold text-gray-700">Diets</p>
            <ul className="space-y-2">
              <li><Link href="/diet/keto-chipotle" className="hover:text-orange-600">Keto</Link></li>
              <li><Link href="/diet/vegan-chipotle" className="hover:text-orange-600">Vegan</Link></li>
              <li><Link href="/diet/high-protein-chipotle" className="hover:text-orange-600">High Protein</Link></li>
              <li><Link href="/diet/low-calorie-chipotle" className="hover:text-orange-600">Low Calorie</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-semibold text-gray-700">Guides</p>
            <ul className="space-y-2">
              <li><Link href="/guides/chipotle-macros-guide" className="hover:text-orange-600">Macros Guide</Link></li>
              <li><Link href="/guides/chipotle-muscle-gain-guide" className="hover:text-orange-600">Muscle Gain</Link></li>
              <li><Link href="/guides/chipotle-weight-loss-guide" className="hover:text-orange-600">Weight Loss</Link></li>
              <li><Link href="/guides/chipotle-sodium-guide" className="hover:text-orange-600">Sodium Guide</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-semibold text-gray-700">About</p>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-orange-600">About</Link></li>
              <li><Link href="/methodology" className="hover:text-orange-600">Methodology</Link></li>
              <li><Link href="/sources" className="hover:text-orange-600">Sources</Link></li>
              <li><Link href="/contact" className="hover:text-orange-600">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-gray-200 pt-6 md:flex-row md:justify-between">
          <p>
            ChipotleCalc is an independent tool. Not affiliated with or endorsed by Chipotle Mexican Grill, Inc.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy-policy" className="hover:text-orange-600">Privacy</Link>
            <Link href="/terms-of-service" className="hover:text-orange-600">Terms</Link>
            <Link href="/disclaimer" className="hover:text-orange-600">Disclaimer</Link>
            <Link href="/sitemap" className="hover:text-orange-600">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
