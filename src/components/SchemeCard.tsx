import Link from "next/link";
import type { Scheme } from "@/lib/schemes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, FileText, ExternalLink, ArrowRight, Star, Clock, CheckCircle } from "lucide-react";

export default function SchemeCard({ scheme }: { scheme: Scheme }) {
  return (
    <Card className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-slate-200 hover:border-blue-300">
      <CardHeader className="space-y-3 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-bold text-slate-900 line-clamp-2 group-hover:text-blue-700 transition-colors">
              {scheme.name}
            </CardTitle>
            <p className="mt-2 text-sm text-slate-600 line-clamp-2">
              {scheme.summary}
            </p>
          </div>
          <Badge className="shrink-0 bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white capitalize font-semibold">
            {scheme.category}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          {scheme.tags.slice(0, 5).map((t) => (
            <Badge key={t} variant="secondary" className="text-xs hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
              <Star className="h-3 w-3 mr-1" />
              {t}
            </Badge>
          ))}
          {scheme.tags.length > 5 && (
            <Badge variant="outline" className="text-xs hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors cursor-pointer">
              +{scheme.tags.length - 5} more
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
              <MapPin className="h-4 w-4 text-blue-500" />
              <span className="capitalize font-medium">
                {scheme.states.includes("all") ? "All India" : scheme.states.slice(0, 2).join(", ")}
              </span>
            </div>
            {scheme.rules.incomeMax && (
              <div className="flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-full">
                <FileText className="h-4 w-4 text-green-600" />
                <span className="text-green-700 font-medium">₹{scheme.rules.incomeMax.toLocaleString()}</span>
              </div>
            )}
            {scheme.rules.gender !== 'any' && (
              <div className="flex items-center gap-1.5 bg-purple-50 px-3 py-1.5 rounded-full">
                <CheckCircle className="h-4 w-4 text-purple-600" />
                <span className="text-purple-700 font-medium capitalize">{scheme.rules.gender}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/scheme/${scheme.slug}`}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg"
            >
              View Details
            </Link>

            <a
              href={scheme.applyLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1 rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-all hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700"
            >
              Apply
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <Link
              href={`/category/${scheme.category}`}
              className="inline-flex items-center justify-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold text-slate-500 transition-all hover:bg-slate-100"
            >
              More
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
