import { Link } from "wouter";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";

export default function NotFound() {
  return (
    <Layout>
      <SeoHead title="Page Not Found — ChipotleMacros" description="This page does not exist." noIndex />
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="text-6xl font-bold text-orange-200">404</p>
        <h1 className="mt-4 text-2xl font-bold text-gray-800">Page not found</h1>
        <p className="mt-2 text-gray-500">This page doesn't exist.</p>
        <Link href="/" className="mt-6 inline-block rounded-md bg-orange-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-700">
          Back to calculator
        </Link>
      </div>
    </Layout>
  );
}
