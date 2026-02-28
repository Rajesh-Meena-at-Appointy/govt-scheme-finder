'use client';

import { useEffect, useRef } from "react";
import EligibilityWizard from "@/components/EligibilityWizard";
import { getAllSchemes, getCategoriesIndex, getStatesIndex } from "@/lib/schemes";
import { formatSlugLabel } from "@/lib/eligibility";
import { Shield, FileText, ArrowRight, CheckCircle, Sparkles, Target, Heart, Star } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { AdSenseBanner, AdSenseInline, AdSenseFooter } from "@/components/AdSense";

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
      <span ref={countRef} className="text-4xl font-bold text-blue-600">0{suffix}</span>
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
    <main className="mx-auto max-w-6xl px-3 md:px-4 py-6 md:py-8">
      {/* Hero Section */}
      <div className="mb-10 md:mb-16 relative">
        {/* Background decoration - reduced on mobile */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 md:-top-40 md:-right-40 w-40 md:w-80 h-40 md:h-80 bg-blue-100 rounded-full blur-2xl md:blur-3xl opacity-40 md:opacity-50"></div>
          <div className="absolute -bottom-10 md:-bottom-20 -left-10 md:-left-20 w-32 md:w-60 h-32 md:h-60 bg-purple-100 rounded-full blur-2xl md:blur-3xl opacity-40 md:opacity-50"></div>
        </div>

        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center gap-1.5 md:gap-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-blue-700 mb-4 md:mb-6 border border-blue-200">
            <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4" />
            <span>India's #1 Scheme Discovery Platform</span>
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4 md:mb-6 px-2">
            {t.home.hero.title}
          </h1>

          <p className="mx-auto max-w-2xl text-sm md:text-lg text-slate-600 mb-6 md:mb-8 px-2">
            {t.home.hero.subtitle}
          </p>

          {/* Animated Stats */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-16 mb-6 md:mb-8">
            <AnimatedCounter end={schemesCount} label={t.home.hero.statsSchemes} />
            <AnimatedCounter end={states.length} label={t.home.hero.statsStates} />
            <AnimatedCounter end={100} label="Coverage %" suffix="%" />
          </div>

          {/* Trust badges - smaller on mobile */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-xs md:text-sm text-slate-500">
            <div className="flex items-center gap-1.5 md:gap-2">
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
              <span>{t.home.hero.statsFree}</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
              <span>No Registration</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
              <span>Instant</span>
            </div>
          </div>
        </div>

        {/* Eligibility Wizard */}
        <div className="max-w-3xl mx-auto">
          <EligibilityWizard />
        </div>
      </div>

      {/* Ad Banner - After Hero */}
      <AdSenseBanner />

      {/* Features Grid */}
      <div className="mt-10 md:mt-16">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-2 md:mb-3">
            Why Choose Govt Scheme Finder?
          </h2>
          <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto px-2">
            We make it easy to discover government benefits you're entitled to
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="group relative bg-white rounded-xl md:rounded-2xl border border-slate-200 p-4 md:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="mb-3 md:mb-4 inline-flex h-10 md:h-14 w-10 md:w-14 items-center justify-center rounded-xl md:rounded-2xl bg-blue-100 group-hover:bg-blue-600 transition-colors">
                <Target className="h-5 w-5 md:h-7 md:w-7 text-blue-600 group-hover:text-white" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-slate-900 mb-1 md:mb-2">{t.home.features.personalized.title}</h3>
              <p className="text-xs md:text-sm text-slate-600">
                {t.home.features.personalized.desc}
              </p>
            </div>
          </div>

          <div className="group relative bg-white rounded-xl md:rounded-2xl border border-slate-200 p-4 md:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="mb-3 md:mb-4 inline-flex h-10 md:h-14 w-10 md:w-14 items-center justify-center rounded-xl md:rounded-2xl bg-green-100 group-hover:bg-green-600 transition-colors">
                <FileText className="h-5 w-5 md:h-7 md:w-7 text-green-600 group-hover:text-white" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-slate-900 mb-1 md:mb-2">{t.home.features.verified.title}</h3>
              <p className="text-xs md:text-sm text-slate-600">
                {t.home.features.verified.desc}
              </p>
            </div>
          </div>

          <div className="group relative bg-white rounded-xl md:rounded-2xl border border-slate-200 p-4 md:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="mb-3 md:mb-4 inline-flex h-10 md:h-14 w-10 md:w-14 items-center justify-center rounded-xl md:rounded-2xl bg-purple-100 group-hover:bg-purple-600 transition-colors">
                <Shield className="h-5 w-5 md:h-7 md:w-7 text-purple-600 group-hover:text-white" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-slate-900 mb-1 md:mb-2">{t.home.features.secure.title}</h3>
              <p className="text-xs md:text-sm text-slate-600">
                {t.home.features.secure.desc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ad Banner - Middle */}
      <AdSenseInline />

      {/* Browse by State */}
      <div className="mt-10 md:mt-16">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-bold text-slate-900">{t.home.browseByState}</h2>
          <Link href="/states" className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
            {t.home.viewAll} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3">
          {states.slice(0, 12).map((s, index) => (
            <Link
              key={s}
              href={`/state/${s}`}
              className="group flex items-center justify-center rounded-lg md:rounded-xl border border-slate-200 bg-white px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-slate-700 transition-all hover:border-blue-500 hover:bg-blue-600 hover:text-white hover:shadow-md md:hover:shadow-lg"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="group-hover:scale-110 transition-transform text-center">{formatSlugLabel(s)}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Browse by Category */}
      <div className="mt-10 md:mt-16">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-bold text-slate-900">{t.home.browseByCategory}</h2>
          <Link href="/categories" className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
            {t.home.viewAll} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3">
          {categories.map((c, index) => (
            <Link
              key={c}
              href={`/category/${c}`}
              className="group flex items-center justify-center rounded-lg md:rounded-xl border border-slate-200 bg-white px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-slate-700 transition-all hover:border-blue-500 hover:bg-blue-600 hover:text-white hover:shadow-md md:hover:shadow-lg"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-1 md:gap-2">
                <Star className="h-3 w-3 md:h-4 md:w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-center">{formatSlugLabel(c)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Ad Banner - Before CTA */}
      <AdSenseInline />

      {/* CTA Section */}
      <div className="mt-10 md:mt-16 relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 px-4 md:px-6 py-8 md:py-12 text-center text-white">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-16 md:w-32 h-16 md:h-32 border border-white rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-24 md:w-48 h-24 md:h-48 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 w-32 md:w-64 h-32 md:h-64 border border-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-1.5 md:gap-2 rounded-full bg-white/20 px-3 md:px-4 py-1.5 text-xs md:text-sm font-medium mb-4 md:mb-6">
            <Heart className="h-3.5 w-3.5 md:h-4 md:w-4" />
            <span>Community Driven</span>
          </div>

          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">{t.home.cta.title}</h2>
          <p className="mx-auto max-w-xl text-blue-100 text-sm md:text-base mb-6 md:mb-8 px-2">
            {t.home.cta.desc}
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 md:px-8 py-3 md:py-4 font-bold text-blue-700 transition-all hover:scale-105 hover:shadow-xl text-sm md:text-base"
          >
            {t.home.cta.button} <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
          </Link>
        </div>
      </div>

      {/* Footer Ad */}
      <AdSenseFooter />
    </main>
  );
}
