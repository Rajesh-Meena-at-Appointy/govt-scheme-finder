import type { Scheme, Gender } from "./schemes";

export type Profile = {
  state: string;      // "rajasthan"
  category: string;   // "farmer"
  income: number;     // annual
  gender: Gender;
  age: number;
};

export function isEligible(scheme: Scheme, p: Profile) {
  const stateOk = scheme.states.includes("all") || scheme.states.includes(p.state);
  const categoryOk = scheme.category === p.category || scheme.category === "other";
  const ageOk = p.age >= scheme.rules.minAge;

  const incomeOk = scheme.rules.incomeMax === null ? true : p.income <= scheme.rules.incomeMax;
  const genderOk = scheme.rules.gender === "any" ? true : scheme.rules.gender === p.gender;

  return stateOk && categoryOk && ageOk && incomeOk && genderOk;
}

export function scoreScheme(scheme: Scheme, p: Profile) {
  let score = 0;
  if (scheme.states.includes("all")) score += 1;
  if (scheme.states.includes(p.state)) score += 3;
  if (scheme.category === p.category) score += 3;
  if (scheme.rules.gender === "any" || scheme.rules.gender === p.gender) score += 1;
  if (scheme.rules.incomeMax === null) score += 1;
  return score;
}

export function formatSlugLabel(slug: string) {
  return slug
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}
