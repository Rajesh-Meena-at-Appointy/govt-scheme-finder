import { getAllSchemes } from "@/lib/schemes";
import SchemeCard from "@/components/SchemeCard";
import { formatSlugLabel } from "@/lib/eligibility";

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const label = formatSlugLabel(state);

  const schemes = getAllSchemes().filter((s) => s.states.includes("all") || s.states.includes(state));

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Government schemes in {label}</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Browse popular schemes available in {label}. Check each scheme’s official portal for final eligibility and documents.
        </p>

        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
          SEO template: Add state-specific FAQs (scholarship, farmer benefits, health cards), helpline numbers, and application steps.
        </div>
      </div>

      <div className="grid gap-4">
        {schemes.map((s) => (
          <SchemeCard key={s.id} scheme={s} />
        ))}
      </div>
    </main>
  );
}
