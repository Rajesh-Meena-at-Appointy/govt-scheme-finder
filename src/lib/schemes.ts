import schemesData from "@/data/schemes.json";

export type Category = "farmer" | "student" | "health" | "women" | "senior" | "jobs" | "other";
export type Gender = "male" | "female" | "other" | "any";

export type Scheme = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  category: Category;
  states: string[]; // ["all"] or ["rajasthan", ...]
  tags: string[];
  benefits: string[];
  documents: string[];
  applyLink: string;
  rules: {
    minAge: number;
    incomeMax: number | null;
    gender: Gender;
  };
};

export function getAllSchemes(): Scheme[] {
  return schemesData as Scheme[];
}

export function getSchemeBySlug(slug: string): Scheme | undefined {
  return getAllSchemes().find((s) => s.slug === slug);
}

export function getStatesIndex(): string[] {
  const set = new Set<string>();
  for (const s of getAllSchemes()) {
    for (const st of s.states) if (st !== "all") set.add(st);
  }
  return Array.from(set).sort();
}

export function getCategoriesIndex(): string[] {
  const set = new Set<string>();
  for (const s of getAllSchemes()) set.add(s.category);
  return Array.from(set).sort();
}
