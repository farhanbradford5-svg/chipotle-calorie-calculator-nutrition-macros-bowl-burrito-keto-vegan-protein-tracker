import { Link } from "wouter";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-orange-600">ChipotleCalc</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="/menu" className="text-gray-600 hover:text-orange-600 transition-colors">
            Menu
          </Link>
          <Link href="/diet/keto-chipotle" className="text-gray-600 hover:text-orange-600 transition-colors">
            Diets
          </Link>
          <Link href="/guides/chipotle-macros-guide" className="text-gray-600 hover:text-orange-600 transition-colors">
            Guides
          </Link>
          <Link href="/faq" className="text-gray-600 hover:text-orange-600 transition-colors">
            FAQ
          </Link>
        </nav>
      </div>
    </header>
  );
}
