"use client";

import { useAuth } from "@/context/AuthContext";
import { Shield, Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import LanguageSelector from "./LanguageSelector";
import { useI18n } from "@/lib/i18n";

export default function Navbar() {
  const { user, isAuthorized, logout, loading } = useAuth();
  const { t } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-3 md:px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 md:gap-3 no-underline group">
          <div className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-teal-600 shadow-md group-hover:shadow-lg transition-shadow">
            <span className="text-white font-bold text-md md:text-lg">₹</span>
          </div>
          <div>
            <div className="text-sm md:text-base font-bold bg-gradient-to-r from-blue-700 to-teal-600 bg-clip-text text-transparent">
              Govt Scheme Finder
            </div>
            <div className="text-xs text-slate-500 hidden sm:block">India's Scheme Discovery</div>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/category/farmer"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-blue-600 hover:text-white"
          >
            {t.nav.farmer}
          </Link>
          <Link
            href="/category/student"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-blue-600 hover:text-white"
          >
            {t.nav.student}
          </Link>
          <Link
            href="/category/health"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-blue-600 hover:text-white"
          >
            {t.nav.health}
          </Link>
          <Link
            href="/submit"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-blue-600 hover:text-white"
          >
            {t.nav.submitScheme}
          </Link>

          {/* Language Selector */}
          <LanguageSelector />

          {!loading && user && isAuthorized && (
            <div className="ml-2 flex items-center gap-2">
              <Link
                href="/admin"
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              >
                {t.nav.dashboard}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                <LogOut className="h-4 w-4" />
                {t.nav.logout}
              </button>
            </div>
          )}

          {!loading && (!user || !isAuthorized) && (
            <Link
              href="/login"
              className="ml-2 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <User className="h-4 w-4" />
              {t.nav.login}
            </Link>
          )}
        </nav>

        {/* Mobile: Language & Menu Button */}
        <div className="flex items-center gap-1 md:hidden">
          <LanguageSelector />
          <button
            className="p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="space-y-1 px-3 py-3">
            <Link
              href="/category/farmer"
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-blue-600 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.farmer} Schemes
            </Link>
            <Link
              href="/category/student"
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-blue-600 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.student} Scholarships
            </Link>
            <Link
              href="/category/health"
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-blue-600 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.health} Schemes
            </Link>
            <Link
              href="/submit"
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.submitScheme}
            </Link>
            <hr className="my-2 border-slate-200" />
            {!loading && user && isAuthorized ? (
              <>
                <Link
                  href="/admin"
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.dashboard}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  {t.nav.logout}
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.login}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
