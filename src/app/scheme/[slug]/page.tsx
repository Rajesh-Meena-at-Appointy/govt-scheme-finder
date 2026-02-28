import { getSchemeBySlug } from "@/lib/schemes";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SchemePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scheme = getSchemeBySlug(slug);
  if (!scheme) return notFound();

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{scheme.category}</Badge>
          {scheme.tags.map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </div>

        <h1 className="mt-3 text-3xl font-semibold">{scheme.name}</h1>
        <p className="mt-2 text-slate-600">{scheme.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild>
            <a href={scheme.applyLink} target="_blank" rel="noreferrer">
              Apply on official site
            </a>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/category/${scheme.category}`}>Browse similar</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold">Benefits</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
            {scheme.benefits.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>

          <Separator className="my-6" />

          <h2 className="text-lg font-semibold">Required Documents</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
            {scheme.documents.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>

          <Separator className="my-6" />

          <h2 className="text-lg font-semibold">Basic Eligibility (approx.)</h2>
          <div className="mt-2 text-sm text-slate-600">
            Minimum age: <span className="font-medium">{scheme.rules.minAge}</span> • Income limit:{" "}
            <span className="font-medium">{scheme.rules.incomeMax ?? "Not specified"}</span> • Gender:{" "}
            <span className="font-medium">{scheme.rules.gender}</span>
          </div>

          <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-xs text-slate-600">
            Tip: Put FAQ + “How to apply” content here for SEO. Add FAQ schema for rich results.
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
