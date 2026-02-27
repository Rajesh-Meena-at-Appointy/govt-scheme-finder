"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Gender = "male" | "female" | "other" | "any";

type SchemeDraft = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  category: string;
  states: string; // comma separated or "all"
  tags: string;   // comma separated
  benefits: string; // newline separated
  documents: string; // newline separated
  applyLink: string;
  minAge: number;
  incomeMax: number | "";
  gender: Gender;
};

function slugify(v: string) {
  return (v || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminRulesPage() {
  const { user, loading, isAuthorized } = useAuth();
  const router = useRouter();

  // Auth check - redirect to login if not authenticated or not authorized
  useEffect(() => {
    if (!loading) {
      if (!user || !isAuthorized) {
        router.push("/login");
      }
    }
  }, [user, loading, isAuthorized, router]);

  // Show loading while checking auth
  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="text-center text-slate-600">Loading...</div>
      </main>
    );
  }

  // Don't render if not authorized
  if (!user || !isAuthorized) {
    return null;
  }

  const [draft, setDraft] = useState<SchemeDraft>({
    id: "",
    slug: "",
    name: "",
    summary: "",
    category: "farmer",
    states: "all",
    tags: "benefit",
    benefits: "Benefit 1",
    documents: "Aadhaar",
    applyLink: "",
    minAge: 18,
    incomeMax: "",
    gender: "any",
  });

  const [jsonInput, setJsonInput] = useState<string>("[]");
  const [message, setMessage] = useState<string>("");

  const computedSlug = useMemo(() => (draft.slug ? slugify(draft.slug) : slugify(draft.name)), [draft.slug, draft.name]);
  const computedId = useMemo(() => (draft.id ? slugify(draft.id) : computedSlug), [draft.id, computedSlug]);

  const schemeObj = useMemo(() => {
    const statesArr =
      draft.states.trim().toLowerCase() === "all"
        ? ["all"]
        : draft.states
            .split(",")
            .map((s) => slugify(s))
            .filter(Boolean);

    const tagsArr = draft.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const benefitsArr = draft.benefits
      .split("\n")
      .map((b) => b.trim())
      .filter(Boolean);

    const documentsArr = draft.documents
      .split("\n")
      .map((d) => d.trim())
      .filter(Boolean);

    return {
      id: computedId,
      slug: computedSlug,
      name: draft.name.trim(),
      summary: draft.summary.trim(),
      category: draft.category,
      states: statesArr,
      tags: tagsArr,
      benefits: benefitsArr,
      documents: documentsArr,
      applyLink: draft.applyLink.trim(),
      rules: {
        minAge: Number(draft.minAge || 0),
        incomeMax: draft.incomeMax === "" ? null : Number(draft.incomeMax),
        gender: draft.gender,
      },
    };
  }, [draft, computedId, computedSlug]);

  function safeParseArray(text: string) {
    const v = JSON.parse(text);
    if (!Array.isArray(v)) throw new Error("JSON must be an array of schemes");
    return v;
  }

  function addToJson() {
    try {
      const arr = safeParseArray(jsonInput);
      arr.push(schemeObj);
      setJsonInput(JSON.stringify(arr, null, 2));
      setMessage("✅ Added scheme to JSON list.");
    } catch (e: any) {
      setMessage("❌ " + (e?.message || "Invalid JSON"));
    }
  }

  function downloadJson() {
    try {
      const arr = safeParseArray(jsonInput);
      downloadText("schemes.json", JSON.stringify(arr, null, 2));
      setMessage("✅ Downloaded schemes.json");
    } catch (e: any) {
      setMessage("❌ " + (e?.message || "Invalid JSON"));
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Admin Lite: Rule Builder</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Create a scheme object with basic eligibility rules and export JSON. Use it to update <span className="font-medium">src/data/schemes.json</span>.
        </p>
        {message ? <div className="mt-3 text-sm text-slate-700">{message}</div> : null}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Scheme form</CardTitle>
            <p className="text-sm text-slate-600">Fill details → Add to JSON list</p>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="e.g., PM-KISAN" />
            </div>

            <div className="grid gap-2">
              <Label>Summary</Label>
              <Input value={draft.summary} onChange={(e) => setDraft({ ...draft, summary: e.target.value })} placeholder="One-liner for SEO" />
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="grid gap-2">
                <Label>Category</Label>
                <Select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })}>
                  <option value="farmer">farmer</option>
                  <option value="student">student</option>
                  <option value="health">health</option>
                  <option value="women">women</option>
                  <option value="senior">senior</option>
                  <option value="jobs">jobs</option>
                  <option value="other">other</option>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Gender rule</Label>
                <Select value={draft.gender} onChange={(e) => setDraft({ ...draft, gender: e.target.value as any })}>
                  <option value="any">any</option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                  <option value="other">other</option>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="grid gap-2">
                <Label>States</Label>
                <Input value={draft.states} onChange={(e) => setDraft({ ...draft, states: e.target.value })} placeholder="all OR rajasthan,madhya-pradesh" />
                <p className="text-xs text-slate-500">Use “all” or comma separated state slugs.</p>
              </div>
              <div className="grid gap-2">
                <Label>Tags</Label>
                <Input value={draft.tags} onChange={(e) => setDraft({ ...draft, tags: e.target.value })} placeholder="health, insurance" />
                <p className="text-xs text-slate-500">Comma separated.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="grid gap-2">
                <Label>Min Age</Label>
                <Input type="number" value={draft.minAge} onChange={(e) => setDraft({ ...draft, minAge: Number(e.target.value) })} />
              </div>
              <div className="grid gap-2">
                <Label>Income Max (₹)</Label>
                <Input
                  type="number"
                  value={draft.incomeMax}
                  onChange={(e) => setDraft({ ...draft, incomeMax: e.target.value === "" ? "" : Number(e.target.value) })}
                  placeholder="Leave empty for null"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Benefits (one per line)</Label>
              <Textarea value={draft.benefits} onChange={(e) => setDraft({ ...draft, benefits: e.target.value })} />
            </div>

            <div className="grid gap-2">
              <Label>Documents (one per line)</Label>
              <Textarea value={draft.documents} onChange={(e) => setDraft({ ...draft, documents: e.target.value })} />
            </div>

            <div className="grid gap-2">
              <Label>Official Apply Link</Label>
              <Input value={draft.applyLink} onChange={(e) => setDraft({ ...draft, applyLink: e.target.value })} placeholder="https://..." />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={addToJson}>Add to JSON list</Button>
              <Button variant="outline" onClick={downloadJson}>
                Download schemes.json
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setDraft({
                    id: "",
                    slug: "",
                    name: "",
                    summary: "",
                    category: "farmer",
                    states: "all",
                    tags: "benefit",
                    benefits: "Benefit 1",
                    documents: "Aadhaar",
                    applyLink: "",
                    minAge: 18,
                    incomeMax: "",
                    gender: "any",
                  });
                  setMessage("Reset form.");
                }}
              >
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>JSON list editor</CardTitle>
            <p className="text-sm text-slate-600">
              Paste existing <span className="font-medium">schemes.json</span> here, then add/export.
            </p>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">id: {schemeObj.id || "—"}</Badge>
              <Badge variant="secondary">slug: {schemeObj.slug || "—"}</Badge>
              <Badge variant="secondary">states: {schemeObj.states?.length ?? 0}</Badge>
              <Badge variant="secondary">tags: {schemeObj.tags?.length ?? 0}</Badge>
            </div>

            <Textarea
              className="min-h-[420px] font-mono text-xs"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
            />

            <div className="text-xs text-slate-500">
              Tip: Keep this JSON in your repo, and use PRs for review. Later replace with DB + admin auth.
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
