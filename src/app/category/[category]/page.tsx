import { getAllSchemes } from "@/lib/schemes";
import SchemeCard from "@/components/SchemeCard";
import { formatSlugLabel } from "@/lib/eligibility";

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = params.category;
  const label = formatSlugLabel(category);

  const schemes = getAllSchemes().filter((s) => s.category === category);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">{label} schemes</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Explore {label.toLowerCase()} related government schemes. Open each scheme to see benefits, documents, and official apply links.
        </p>

        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
          SEO template: Add “Top {label} schemes”, eligibility checklist, and “How to apply” steps (with internal links to states).
        </div>
      </div>

      <div className="grid gap-4">
        {schemes.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 p-6 text-sm text-slate-600">
            No schemes found in this category yet. Add via Excel Importer or Admin Lite.
          </div>
        ) : (
          schemes.map((s) => <SchemeCard key={s.id} scheme={s} />)
        )}
      </div>
    </main>
  );
}
