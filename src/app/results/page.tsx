"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAllSchemes } from "@/lib/schemes";
import { isEligible, scoreScheme, type Profile } from "@/lib/eligibility";
import SchemeCard from "@/components/SchemeCard";
import FiltersBar from "@/components/FiltersBar";
import { AdSenseInline } from "@/components/AdSense";
import { safeLower } from "@/lib/utils";

function ResultsContent() {
  const sp = useSearchParams();

  const state = String(sp.get("state") ?? "rajasthan");
  const category = String(sp.get("category") ?? "farmer");
  const gender = String(sp.get("gender") ?? "male") as any;
  const age = Number(sp.get("age") ?? 25);
  const income = Number(sp.get("income") ?? 200000);

  const profile: Profile = { state, category, gender, age, income };

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"best" | "name">("best");
  const [tag, setTag] = useState("all");

  const schemes = useMemo(() => {
    const eligible = getAllSchemes().filter((s) => isEligible(s, profile));
    const q = safeLower(query);

    const tags = new Set<string>();
    eligible.forEach((s) => s.tags.forEach((t) => tags.add(t)));

    let filtered = eligible;
    if (q) {
      filtered = filtered.filter((s) => safeLower(s.name + " " + s.summary + " " + s.tags.join(" ")).includes(q));
    }
    if (tag !== "all") filtered = filtered.filter((s) => s.tags.includes(tag));

    if (sort === "best") filtered = filtered.sort((a, b) => scoreScheme(b, profile) - scoreScheme(a, profile));
    if (sort === "name") filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));

    return { filtered, tags: Array.from(tags).sort() };
  }, [profile, query, sort, tag]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Eligible schemes</h1>
        <p className="mt-1 text-sm text-slate-600">
          State: <span className="font-medium">{state}</span> • Category: <span className="font-medium">{category}</span> • Age:{" "}
          <span className="font-medium">{age}</span> • Income: <span className="font-medium">₹{income}</span>
        </p>
      </div>

      <div className="mb-4">
        <FiltersBar
          query={query}
          setQuery={setQuery}
          sort={sort}
          setSort={setSort}
          tag={tag}
          setTag={setTag}
          availableTags={schemes.tags}
        />
      </div>

      <AdSenseInline />

      <div className="grid gap-4">
        {schemes.filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 p-6 text-sm text-slate-600">
            No exact matches found. Try adjusting income/category or explore state/category pages.
          </div>
        ) : (
          schemes.filtered.map((s) => <SchemeCard key={s.id} scheme={s} />)
        )}
      </div>
    </main>
  );
}

function LoadingState() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-48 mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-slate-200 rounded"></div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ResultsContent />
    </Suspense>
  );
}
