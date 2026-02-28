import { getAllSchemes, getStatesIndex } from "@/lib/schemes";
import SchemeCard from "@/components/SchemeCard";
import { formatSlugLabel } from "@/lib/eligibility";
import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle, MapPin, Users, BookOpen } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  const label = formatSlugLabel(state);

  return {
    title: `${label} Government Schemes 2026 - Eligibility, Documents & Apply | Govt Scheme Finder`,
    description: `Find all government schemes available in ${label}. Check eligibility, required documents, and how to apply for scholarships, farmer schemes, health cards, and more.`,
    keywords: `${label} government schemes, ${label} yojana, ${label} schemes 2026, ${label} scholarships, ${label} government programs, ${label} pension`,
  };
}

export async function generateStaticParams() {
  return getStatesIndex().map((state) => ({ state }));
}

const stateInfo: Record<string, { capital: string; popularSchemes: string }> = {
  'rajasthan': { capital: 'Jaipur', popularSchemes: 'Bhamashah Yojana, Rajasthan Pension, Free Tablet Scheme' },
  'uttar-pradesh': { capital: 'Lucknow', popularSchemes: 'UP Pension, Kanya Sumangala, Free Laptop Scheme' },
  'maharashtra': { capital: 'Mumbai', popularSchemes: 'Maharashtra Pension, JEEVAN SAHAY, Free Housing Scheme' },
  'madhya-pradesh': { capital: 'Bhopal', popularSchemes: 'MP Pension, Ladli Behna, Free Phone Scheme' },
  'karnataka': { capital: 'Bengaluru', popularSchemes: 'Karnataka Pension, Vidya Siri, Free Sewage Connection' },
  'tamil-nadu': { capital: 'Chennai', popularSchemes: 'Tamil Nadu Pension, CM Relief Fund, Free Bus Pass' },
  'gujarat': { capital: 'Gandhinagar', popularSchemes: 'Gujarat Pension, Kanya Kelavani, Free Treatment' },
  'west-bengal': { capital: 'Kolkata', popularSchemes: 'Kanyashree, Swasthya Sathi, West Bengal Pension' },
  'delhi': { capital: 'New Delhi', popularSchemes: 'Delhi Pension, Free Electricity, Free Bus Travel' },
  'punjab': { capital: 'Chandigarh', popularSchemes: 'Punjab Pension, Ghar Ghar, Free Medicine' },
};

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const label = formatSlugLabel(state);
  const schemes = getAllSchemes().filter((s) => s.states.includes("all") || s.states.includes(state));
  const info = stateInfo[state] || { capital: '', popularSchemes: '' };
  const allStates = getStatesIndex();

  return (
    <main className="mx-auto max-w-6xl px-3 md:px-4 py-6 md:py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{label} Schemes</span>
      </nav>

      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 capitalize">{label} Government Schemes 2026</h1>
        <p className="mt-2 max-w-3xl text-sm md:text-base text-slate-600">
          Find all government schemes available in {label}. Check eligibility, required documents, and how to apply for scholarships, farmer schemes, health cards, pension, and more.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{schemes.length}</p>
          <p className="text-xs text-slate-600">Schemes Available</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <MapPin className="h-6 w-6 mx-auto text-green-600 mb-1" />
          <p className="text-sm font-semibold">{info.capital || 'State'}</p>
          <p className="text-xs text-slate-600">Capital</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 text-center">
          <Users className="h-6 w-6 mx-auto text-purple-600 mb-1" />
          <p className="text-sm font-semibold">All India</p>
          <p className="text-xs text-slate-600">+ State Specific</p>
        </div>
        <div className="bg-orange-50 rounded-xl p-4 text-center">
          <CheckCircle className="h-6 w-6 mx-auto text-orange-600 mb-1" />
          <p className="text-sm font-semibold">Free</p>
          <p className="text-xs text-slate-600">To Apply</p>
        </div>
      </div>

      {/* Popular Schemes in State */}
      {info.popularSchemes && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
          <h2 className="font-semibold mb-2">Popular Schemes in {label}</h2>
          <p className="text-sm text-slate-600">{info.popularSchemes}</p>
        </div>
      )}

      {/* Category Filter */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Filter by Category</h2>
        <div className="flex flex-wrap gap-2">
          {['student', 'farmer', 'health', 'women', 'senior', 'jobs'].map((cat) => (
            <Link
              key={cat}
              href={`/category/${cat}`}
              className="px-3 py-1.5 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-lg text-sm transition-colors capitalize"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      <hr className="border-slate-200 my-6" />

      {/* Other States */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Other States</h2>
        <div className="flex flex-wrap gap-2">
          {allStates.filter(s => s !== state).slice(0, 8).map((st) => (
            <Link
              key={st}
              href={`/state/${st}`}
              className="px-3 py-1.5 border border-slate-200 hover:border-blue-600 hover:text-blue-600 rounded-lg text-sm transition-colors capitalize"
            >
              {formatSlugLabel(st)}
            </Link>
          ))}
          <Link href="/states" className="px-3 py-1.5 text-blue-600 hover:underline text-sm">
            View all states →
          </Link>
        </div>
      </div>

      {/* Schemes List */}
      <h2 className="text-xl font-bold mb-4">All Schemes in {label} ({schemes.length})</h2>

      <div className="grid gap-4">
        {schemes.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 p-6 text-sm text-slate-600">
            No specific schemes found for {label}. Try all India schemes.
          </div>
        ) : (
          schemes.map((s) => <SchemeCard key={s.id} scheme={s} />)
        )}
      </div>
    </main>
  );
}
