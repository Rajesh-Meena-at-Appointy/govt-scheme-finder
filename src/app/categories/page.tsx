import { getCategoriesIndex, getAllSchemes } from "@/lib/schemes";
import { formatSlugLabel } from "@/lib/eligibility";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, BookOpen, Heart, Users, Briefcase, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "All Government Schemes by Category 2026 - Browse by Category | Govt Scheme Finder",
  description: "Find government schemes by category. Browse student, farmer, health, women, senior citizen, and jobs schemes in India.",
  keywords: "government schemes by category, student schemes, farmer schemes, health schemes, women schemes, senior citizen schemes, jobs schemes",
};

const categoryIcons: Record<string, typeof BookOpen> = {
  student: BookOpen,
  farmer: Heart,
  health: Shield,
  women: Users,
  senior: Users,
  jobs: Briefcase,
};

const categoryDesc: Record<string, string> = {
  student: 'Scholarships, fee reimbursement, and educational grants for students',
  farmer: 'Income support, subsidies, and insurance for farmers',
  health: 'Medical coverage, insurance, and healthcare benefits',
  women: 'Financial assistance and welfare programs for women',
  senior: 'Pension and welfare for senior citizens',
  jobs: 'Employment schemes and skill training programs',
};

export default function CategoriesPage() {
  const categories = getCategoriesIndex();

  return (
    <main className="mx-auto max-w-6xl px-3 md:px-4 py-6 md:py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">All Categories</span>
      </nav>

      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Government Schemes by Category</h1>
        <p className="mt-2 max-w-3xl text-sm md:text-base text-slate-600">
          Browse government welfare schemes by category. Find schemes that match your needs.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{categories.length}</p>
          <p className="text-xs text-slate-600">Categories</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-600">All India</p>
          <p className="text-xs text-slate-600">Coverage</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">Free</p>
          <p className="text-xs text-slate-600">To Apply</p>
        </div>
        <div className="bg-orange-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-orange-600">{getAllSchemes().length}</p>
          <p className="text-xs text-slate-600">Total Schemes</p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category) => {
          const Icon = categoryIcons[category] || BookOpen;
          const schemes = getAllSchemes().filter((s) => s.category === category);
          const desc = categoryDesc[category] || 'Government welfare schemes';

          return (
            <Link
              key={category}
              href={`/category/${category}`}
              className="group bg-white rounded-xl border border-slate-200 p-5 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 capitalize">{formatSlugLabel(category)}</h3>
              </div>
              <p className="text-sm text-slate-600 mb-3">{desc}</p>
              <p className="text-sm font-medium text-blue-600">
                {schemes.length} schemes available
              </p>
            </Link>
          );
        })}
      </div>

      {/* Popular Categories */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Popular Categories</h2>
        <div className="flex flex-wrap gap-2">
          {['student', 'farmer', 'health', 'women'].map((cat) => (
            <Link
              key={cat}
              href={`/category/${cat}`}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors capitalize"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
