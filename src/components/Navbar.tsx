"use client";

import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, isAuthorized, logout, loading } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <header className="border-b border-slate-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="/" className="no-underline">
          <div className="text-base font-semibold">Govt Scheme Finder</div>
          <div className="text-xs text-slate-500">MVP • SEO templates + admin lite</div>
        </a>
        <nav className="flex items-center gap-3 text-sm">
          <a href="/category/farmer" className="text-slate-700 no-underline hover:underline">Farmer</a>
          <a href="/category/student" className="text-slate-700 no-underline hover:underline">Student</a>
          {!loading && user && isAuthorized ? (
            <>
              <span className="text-slate-400">|</span>
              <button
                onClick={handleLogout}
                className="rounded-xl border border-slate-200 px-3 py-2 text-slate-600 no-underline hover:bg-slate-50"
              >
                Logout
              </button>
            </>
          ) : (
            <a href="/login" className="rounded-xl border border-slate-200 px-3 py-2 text-slate-800 no-underline hover:bg-slate-50">Admin</a>
          )}
        </nav>
      </div>
    </header>
  );
}
