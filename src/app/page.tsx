'use client';

import { useEffect, useRef } from "react";
import EligibilityWizard from "@/components/EligibilityWizard";
import { getAllSchemes, getCategoriesIndex, getStatesIndex } from "@/lib/schemes";
import { formatSlugLabel } from "@/lib/eligibility";
import { Shield, Users, FileText, ArrowRight, CheckCircle, Sparkles, Target, Heart, Star } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

function AnimatedCounter({ end, label, suffix = "" }: { end: number; label: string; suffix?: string }) {
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 2000;
          const increment = end / (duration / 16);

          const animate = () => {
            start += increment;
            if (start < end && countRef.current) {
              countRef.current.textContent = Math.floor(start).toLocaleString() + suffix;
              requestAnimationFrame(animate);
            } else if (countRef.current) {
              countRef.current.textContent = end.toLocaleString() + suffix;
            }
          };
          animate();
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, suffix]);

  return (
    <div className="text-center">
      <span ref={countRef} className="text-4xl font-bold text-blue-600">0</span>
      <span className="text-4xl font-bold text-blue-600">{suffix}</span>
      <p className="mt-1 text-sm text-slate-600">{label}</p>
    </div>
  );
}

export default function Home() {
  const { t } = useI18n();
  const schemesCount = getAllSchemes().length;
  const states = getStatesIndex();
  const categories = getCategoriesIndex();

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {/* Hero Section */}
      <div className="mb-16 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 text-sm font-medium text-blue-700 mb-6 border border-blue-200">
            <Sparkles className="h-4 w-4" />
            <span>India's #1 Scheme Discovery Platform</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Find Government Schemes{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              You Qualify For
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-slate-600 mb-8">
            {t.home.hero.subtitle}
          </p>

          {/* Animated Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-8">
            <AnimatedCounter end={schemesCount} label={t.home.hero.statsSchemes} />
            <AnimatedCounter end={states.length} label={t.home.hero.statsStates} />
            <AnimatedCounter end={100} label="Coverage %" suffix="%" />
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Free to Use</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>No Registration</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Instant Results</span>
            </div>
          </div>
        </div>

        {/* Eligibility Wizard */}
        <div className="max-w-3xl mx-auto">
          <EligibilityWizard />
        </div>
      </div>

      {/* Ad Banner - After Hero */}
      <div className="my-12 text-center">
        <div className="inline-block w-full max-w-2xl h-32 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center">
          <span className="text-slate-400">Google Ad -2 - Below Hero Section</span>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mt-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Why Choose Govt Scheme Finder?
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            We make it easy to discover government benefits you're entitled to
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="group relative bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 group-hover:bg-blue-600 transition-colors">
                <Target className="h-7 w-7 text-blue-600 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{t.home.features.personalized.title}</h3>
              <p className="text-sm text-slate-600">
                {t.home.features.personalized.desc}
              </p>
            </div>
          </div>

          <div className="group relative bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 group-hover:bg-green-600 transition-colors">
                <FileText className="h-7 w-7 text-green-600 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{t.home.features.verified.title}</h3>
              <p className="text-sm text-slate-600">
                {t.home.features.verified.desc}
              </p>
            </div>
          </div>

          <div className="group relative bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 group-hover:bg-purple-600 transition-colors">
                <Shield className="h-7 w-7 text-purple-600 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{t.home.features.secure.title}</h3>
              <p className="text-sm text-slate-600">
                {t.home.features.secure.desc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ad Banner - Middle */}
      <div className="my-12 text-center">
        <div className="inline-block w-full max-w-2xl h-32 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center">
          <span className="text-slate-400">Google Ad - Middle Section</span>
        </div>
      </div>

      {/* Browse by State */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">{t.home.browseByState}</h2>
          <Link href="/states" className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
            {t.home.viewAll} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {states.slice(0, 12).map((s, index) => (
            <Link
              key={s}
              href={`/state/${s}`}
              className="group flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-all hover:border-blue-500 hover:bg-blue-600 hover:text-white hover:shadow-lg"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="group-hover:scale-110 transition-transform">{formatSlugLabel(s)}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Browse by Category */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">{t.home.browseByCategory}</h2>
          <Link href="/categories" className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
            {t.home.viewAll} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.map((c, index) => (
            <Link
              key={c}
              href={`/category/${c}`}
              className="group flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-all hover:border-blue-500 hover:bg-blue-600 hover:text-white hover:shadow-lg"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span>{formatSlugLabel(c)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Ad Banner - Before CTA */}
      <div className="my-12 text-center">
        <div className="inline-block w-full max-w-2xl h-32 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center">
          <span className="text-slate-400">Google Ad - Before CTA</span>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 px-6 py-12 text-center text-white">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 border border-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium mb-6">
            <Heart className="h-4 w-4" />
            <span>Community Driven</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.home.cta.title}</h2>
          <p className="mx-auto max-w-xl text-blue-100 mb-8">
            {t.home.cta.desc}
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-blue-700 transition-all hover:scale-105 hover:shadow-xl"
          >
            {t.home.cta.button} <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Footer Ad */}
      <div className="my-12 text-center">
        <div className="inline-block w-full max-w-2xl h-32 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center">
          <span className="text-slate-400">Google Ad - Footer</span>
        </div>
      </div>
    </main>
  );
}
