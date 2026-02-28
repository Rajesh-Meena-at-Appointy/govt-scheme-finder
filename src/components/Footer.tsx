"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t, language } = useI18n();

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-3 md:px-4 py-8 md:py-12">
        <div className="grid gap-6 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-teal-600">
                <span className="text-white font-bold text-md md:text-lg">₹</span>
              </div>
              <div>
                <div className="text-sm md:text-base font-bold bg-gradient-to-r from-blue-700 to-teal-600 bg-clip-text text-transparent">
                  {t.footer.brand.title}
                </div>
                <div className="text-xs text-slate-500">{t.footer.brand.tagline}</div>
              </div>
            </div>
            <p className="mt-3 md:mt-4 max-w-md text-sm text-slate-600">
              {t.footer.brand.desc}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-3 md:mb-4 text-sm font-semibold text-slate-900">{t.footer.quickLinks}</h4>
            <ul className="space-y-1.5 md:space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/category/farmer" className="hover:text-blue-600">{t.nav.farmer} Schemes</Link>
              </li>
              <li>
                <Link href="/category/student" className="hover:text-blue-600">{t.nav.student} Scholarships</Link>
              </li>
              <li>
                <Link href="/category/health" className="hover:text-blue-600">{t.nav.health} Schemes</Link>
              </li>
              <li>
                <Link href="/category/women" className="hover:text-blue-600">{t.nav.women} Schemes</Link>
              </li>
              <li>
                <Link href="/submit" className="hover:text-blue-600">{t.nav.submitScheme}</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-3 md:mb-4 text-sm font-semibold text-slate-900">{t.footer.resources}</h4>
            <ul className="space-y-1.5 md:space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/about" className="hover:text-blue-600">About</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600">Contact</Link>
              </li>
              <li>
                <Link href="/submit" className="hover:text-blue-600">{t.nav.submitScheme}</Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-blue-600">Sitemap</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-blue-600">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-600">Terms</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 md:mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 md:pt-8 md:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {t.footer.brand.title}. {t.footer.copyright}
          </p>
          <p className="text-xs text-slate-500 max-w-md text-center md:text-left">
            <strong>Disclaimer:</strong> {t.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
