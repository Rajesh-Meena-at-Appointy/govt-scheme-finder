import { getAllSchemes, getCategoriesIndex } from "@/lib/schemes";
import SchemeCard from "@/components/SchemeCard";
import { formatSlugLabel } from "@/lib/eligibility";
import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle, FileText, Users, ArrowRight, BookOpen } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const label = formatSlugLabel(category);

  return {
    title: `${label} Government Schemes 2026 - Eligibility, Documents & Apply | Govt Scheme Finder`,
    description: `Find all ${label} government schemes 2026. Check eligibility, required documents, and how to apply. Benefits include scholarships, grants, and welfare programs.`,
    keywords: `${label} schemes, government ${label} schemes, ${label} yojana, ${label} government programs, India ${label} schemes, ${label} benefits`,
  };
}

export async function generateStaticParams() {
  return getCategoriesIndex().map((category) => ({ category }));
}

const categoryInfo: Record<string, { desc: string; eligibility: string; documents: string }> = {
  student: {
    desc: 'Student government schemes provide financial assistance for education. These include scholarships, fee reimbursement, and merit-based grants for students from low-income families.',
    eligibility: 'Students must be enrolled in recognized institutions. Family income limits vary by scheme. Age limits and academic performance criteria apply.',
    documents: 'Aadhaar card, income certificate, previous year marksheet, bank account, institute ID, and passport size photos.',
  },
  farmer: {
    desc: 'Farmer welfare schemes provide income support, subsidies, and insurance to agricultural workers. These help improve livelihood and provide financial security.',
    eligibility: 'Farmers must have agricultural land. Some schemes require specific landholding sizes. Both small and marginal farmers are eligible.',
    documents: 'Land records, Aadhaar card, bank account, mobile number, and passport size photos.',
  },
  health: {
    desc: 'Health schemes provide medical coverage, insurance, and healthcare benefits to citizens. These include Ayushman Bharat, state health insurance, and specific disease treatment programs.',
    eligibility: 'Eligibility varies by scheme. Some are for BPL families, others for all citizens. Income and residence criteria apply.',
    documents: 'Aadhaar card, BPL card (if applicable), income certificate, and medical records.',
  },
  women: {
    desc: 'Women welfare schemes provide financial assistance, skill development, and protection for women. These include Ladli, Beti Bachao, and women entrepreneurship programs.',
    eligibility: 'Women of all age groups. Some schemes have income limits or marital status requirements. Specific schemes for widows and single women.',
    documents: 'Aadhaar card, bank account, residence certificate, and category certificates.',
  },
  senior: {
    desc: 'Senior citizen schemes provide pension, healthcare, and welfare for elderly. These include old age pension, medical insurance, and senior citizen cards.',
    eligibility: 'Citizens aged 60 years and above. Some schemes have income limits or residency requirements.',
    documents: 'Aadhaar card, age proof, bank account, and income certificate.',
  },
  jobs: {
    desc: 'Employment schemes provide job opportunities, skill training, and self-employment support. These include PMKVY, MGNREGA, and entrepreneurship development programs.',
    eligibility: 'Unemployed youth, skill seekers, and those looking for self-employment. Age and education criteria vary by scheme.',
    documents: 'Aadhaar card, educational certificates, bank account, and skill certificates.',
  },
};

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const label = formatSlugLabel(category);
  const schemes = getAllSchemes().filter((s) => s.category === category);
  const info = categoryInfo[category] || { desc: `Explore government ${label} schemes and welfare programs.`, eligibility: 'Check individual scheme eligibility criteria.', documents: 'Typically requires Aadhaar and supporting documents.' };
  const allCategories = getCategoriesIndex();

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
          {info.desc}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{schemes.length}</p>
          <p className="text-xs text-slate-600">Active Schemes</p>
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
          <p className="text-2xl font-bold text-orange-600">Direct</p>
          <p className="text-xs text-slate-600">Govt Portal</p>
        </div>
      </div>

      {/* Category Info Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-blue-600" aria-hidden="true" />
            <h2 className="font-semibold text-base">Eligibility</h2>
          </div>
          <p className="text-sm text-slate-600">{info.eligibility}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-green-600" aria-hidden="true" />
            <h2 className="font-semibold text-base">Documents</h2>
          </div>
          <p className="text-sm text-slate-600">{info.documents}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5 text-purple-600" aria-hidden="true" />
            <h2 className="font-semibold text-base">How to Apply</h2>
          </div>
          <p className="text-sm text-slate-600">Visit official portal, register with Aadhaar, fill form, upload documents, and submit.</p>
        </div>
      </div>

      {/* Browse by State */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Browse by State</h2>
        <div className="flex flex-wrap gap-2">
          {['rajasthan', 'uttar-pradesh', 'maharashtra', 'madhya-pradesh', 'karnataka', 'tamil-nadu', 'gujarat', 'west-bengal'].map((state) => (
            <Link
              key={state}
              href={`/state/${state}`}
              className="px-3 py-1.5 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-lg text-sm transition-colors capitalize"
            >
              {formatSlugLabel(state)}
            </Link>
          ))}
        </div>
      </div>

      <hr className="border-slate-200 my-6" />

      {/* Other Categories */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Other Categories</h2>
        <div className="flex flex-wrap gap-2">
          {allCategories.filter(c => c !== category).map((cat) => (
            <Link
              key={cat}
              href={`/category/${cat}`}
              className="px-3 py-1.5 border border-slate-200 hover:border-blue-600 hover:text-blue-600 rounded-lg text-sm transition-colors capitalize"
            >
              {formatSlugLabel(cat)}
            </Link>
          ))}
        </div>
      </div>

      {/* Schemes List */}
      <h2 className="text-xl font-bold mb-4">All {label} Schemes ({schemes.length})</h2>

      <div className="grid gap-4">
        {schemes.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 p-6 text-sm text-slate-600">
            No schemes found in this category yet.
          </div>
        ) : (
          schemes.map((s) => <SchemeCard key={s.id} scheme={s} />)
        )}
      </div>
    </main>
  );
}
