import EligibilityWizard from "@/components/EligibilityWizard";
import { getAllSchemes, getCategoriesIndex, getStatesIndex } from "@/lib/schemes";
import { formatSlugLabel } from "@/lib/eligibility";

export default function Home() {
  const schemesCount = getAllSchemes().length;
  const states = getStatesIndex();
  const categories = getCategoriesIndex();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Govt Scheme Finder</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Check government schemes by state and category. Fast eligibility guidance + official apply links.
        </p>
        <div className="mt-3 text-sm text-slate-500">
          {schemesCount} schemes in demo dataset • Easily extend via Excel Importer
        </div>
      </div>

      <EligibilityWizard />

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold">SEO landing pages</h3>
          <p className="mt-1 text-sm text-slate-600">
            State and category pages capture long-tail searches like “Rajasthan scholarship scheme” etc.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {states.slice(0, 6).map((s) => (
              <a key={s} href={`/state/${s}`} className="rounded-xl bg-slate-100 px-3 py-2 no-underline hover:bg-slate-200">
                {formatSlugLabel(s)}
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold">Admin lite + Importer</h3>
          <p className="mt-1 text-sm text-slate-600">
            Use <span className="font-medium">/admin/rules</span> to generate scheme JSON, and <span className="font-medium">scripts/import_schemes.py</span> to convert Excel → JSON.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {categories.map((c) => (
              <a key={c} href={`/category/${c}`} className="rounded-xl bg-slate-100 px-3 py-2 no-underline hover:bg-slate-200">
                {formatSlugLabel(c)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
