export function rupees(n: number) {
  try {
    return new Intl.NumberFormat("en-IN").format(n);
  } catch {
    return String(n);
  }
}

export function safeLower(s: string) {
  return (s || "").toLowerCase().trim();
}
