import Link from "next/link";
import type { Scheme } from "@/lib/schemes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function SchemeCard({ scheme }: { scheme: Scheme }) {
  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-lg">{scheme.name}</CardTitle>
            <p className="mt-1 text-sm text-slate-600">{scheme.summary}</p>
          </div>
          <Badge className="shrink-0">{scheme.category}</Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          {scheme.tags.slice(0, 6).map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 sm:flex-row">
        <Button asChild href={`/scheme/${scheme.slug}`}>
          View details
        </Button>

        <Button variant="outline" asChild>
          <a href={scheme.applyLink} target="_blank" rel="noreferrer">
            Apply on official site
          </a>
        </Button>

        <Button variant="ghost" asChild>
          <Link href={`/category/${scheme.category}`}>More in {scheme.category}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
