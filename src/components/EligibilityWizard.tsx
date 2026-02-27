"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const STATES = [
  { value: "rajasthan", label: "Rajasthan" },
  { value: "madhya-pradesh", label: "Madhya Pradesh" },
  { value: "gujarat", label: "Gujarat" },
  { value: "delhi", label: "Delhi" },
];

const CATEGORIES = [
  { value: "farmer", label: "Farmer" },
  { value: "student", label: "Student" },
  { value: "health", label: "Health" },
  { value: "women", label: "Women" },
  { value: "senior", label: "Senior citizen" },
  { value: "jobs", label: "Jobs" },
];

export default function EligibilityWizard() {
  const r = useRouter();
  const [state, setState] = useState("rajasthan");
  const [category, setCategory] = useState("farmer");
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [age, setAge] = useState(25);
  const [income, setIncome] = useState(200000);

  const canSearch = useMemo(
    () => !!state && !!category && Number.isFinite(age) && age >= 0 && Number.isFinite(income) && income >= 0,
    [state, category, age, income]
  );

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Find schemes you may be eligible for</CardTitle>
        <p className="text-sm text-slate-600">
          Enter basic details. We’ll show matching government schemes and official apply links.
        </p>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label>State</Label>
          <Select value={state} onChange={(e) => setState(e.target.value)}>
            {STATES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="grid gap-2">
          <Label>Category</Label>
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="grid gap-2">
            <Label>Gender</Label>
            <Select value={gender} onChange={(e) => setGender(e.target.value as any)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Age</Label>
            <Input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
          </div>

          <div className="grid gap-2">
            <Label>Annual Income (₹)</Label>
            <Input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} />
          </div>
        </div>

        <Button
          disabled={!canSearch}
          onClick={() => {
            const qs = new URLSearchParams({
              state,
              category,
              gender,
              age: String(age),
              income: String(income),
            });
            r.push(`/results?${qs.toString()}`);
          }}
        >
          Show eligible schemes
        </Button>

        <p className="text-xs text-slate-500">
          Disclaimer: This tool provides guidance. Final eligibility depends on official criteria and documents.
        </p>
      </CardContent>
    </Card>
  );
}
