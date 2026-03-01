"use client";

import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function FiltersBar({
  query,
  setQuery,
  sort,
  setSort,
  tag,
  setTag,
  availableTags,
}: {
  query: string;
  setQuery: (v: string) => void;
  sort: "best" | "name";
  setSort: (v: "best" | "name") => void;
  tag: string;
  setTag: (v: string) => void;
  availableTags: string[];
}) {
  const tags = useMemo(() => ["all", ...availableTags], [availableTags]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="grid gap-2">
          <Label htmlFor="filter-search">Search</Label>
          <Input id="filter-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g., kisan, scholarship, health" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="filter-tag">Tag</Label>
          <Select id="filter-tag" value={tag} onChange={(e) => setTag(e.target.value)}>
            {tags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="filter-sort">Sort</Label>
          <Select id="filter-sort" value={sort} onChange={(e) => setSort(e.target.value as any)}>
            <option value="best">Best match</option>
            <option value="name">Name</option>
          </Select>
        </div>
      </div>
    </div>
  );
}
