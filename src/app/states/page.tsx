import { getStatesIndex, getAllSchemes } from "@/lib/schemes";
import { formatSlugLabel } from "@/lib/eligibility";
import Link from "next/link";
import { Metadata } from "next";
import { MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "All Indian States Government Schemes 2026 - Browse by State | Govt Scheme Finder",
  description: "Find government schemes available in all Indian states. Browse schemes by state including Rajasthan, UP, Maharashtra, Karnataka, Tamil Nadu, and more.",
  keywords: "government schemes by state, state wise schemes, Indian government schemes, state yojana, government programs by state",
};

const stateInfo: Record<string, { capital: string; region: string }> = {
  'rajasthan': { capital: 'Jaipur', region: 'North' },
  'uttar-pradesh': { capital: 'Lucknow', region: 'North' },
  'maharashtra': { capital: 'Mumbai', region: 'West' },
  'madhya-pradesh': { capital: 'Bhopal', region: 'Central' },
  'karnataka': { capital: 'Bengaluru', region: 'South' },
  'tamil-nadu': { capital: 'Chennai', region: 'South' },
  'gujarat': { capital: 'Gandhinagar', region: 'West' },
  'west-bengal': { capital: 'Kolkata', region: 'East' },
  'delhi': { capital: 'New Delhi', region: 'North' },
  'punjab': { capital: 'Chandigarh', region: 'North' },
  'haryana': { capital: 'Chandigarh', region: 'North' },
  'jharkhand': { capital: 'Ranchi', region: 'East' },
  'odisha': { capital: 'Bhubaneswar', region: 'East' },
  'telangana': { capital: 'Hyderabad', region: 'South' },
  'andhra-pradesh': { capital: 'Amaravati', region: 'South' },
  'kerala': { capital: 'Thiruvananthapuram', region: 'South' },
  'bihar': { capital: 'Patna', region: 'East' },
  'assam': { capital: 'Dispur', region: 'North-East' },
  'uttarakhand': { capital: 'Dehradun', region: 'North' },
  'chhattisgarh': { capital: 'Raipur', region: 'Central' },
};

export default function StatesPage() {
  const states = getStatesIndex();

  return (
    <main className="mx-auto max-w-6xl px-3 md:px-4 py-6 md:py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">All States</span>
      </nav>

      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Government Schemes by State</h1>
        <p className="mt-2 max-w-3xl text-sm md:text-base text-slate-600">
          Browse government schemes available in each Indian state. Select your state to find eligible schemes.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{states.length}</p>
          <p className="text-xs text-slate-600">States Covered</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-600">All India</p>
          <p className="text-xs text-slate-600">+ Union Territories</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">Free</p>
          <p className="text-xs text-slate-600">To Apply</p>
        </div>
        <div className="bg-orange-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-orange-600">Online</p>
          <p className="text-xs text-slate-600">Application</p>
        </div>
      </div>

      {/* States Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {states.map((state) => {
          const info = stateInfo[state] || { capital: '', region: '' };
          const schemes = getAllSchemes().filter((s) => s.states.includes("all") || s.states.includes(state));

          return (
            <Link
              key={state}
              href={`/state/${state}`}
              className="group bg-white rounded-xl border border-slate-200 p-4 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span className="font-semibold text-slate-900 capitalize">{formatSlugLabel(state)}</span>
              </div>
              <p className="text-xs text-slate-500 mb-2">{info.capital}</p>
              <p className="text-sm font-medium text-blue-600">
                {schemes.length} schemes
              </p>
            </Link>
          );
        })}
      </div>

      {/* Popular States */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Popular States</h2>
        <div className="flex flex-wrap gap-2">
          {['rajasthan', 'uttar-pradesh', 'maharashtra', 'madhya-pradesh', 'karnataka', 'tamil-nadu'].map((state) => (
            <Link
              key={state}
              href={`/state/${state}`}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors capitalize"
            >
              {formatSlugLabel(state)}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
