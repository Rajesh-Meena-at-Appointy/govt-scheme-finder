"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { login, user, isAuthorized, loading } = useAuth();
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setError("");
      await login();
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  // Redirect if already logged in and authorized
  if (!loading && user && isAuthorized) {
    router.push("/admin/rules");
    return null;
  }

  // Show access denied if logged in but not authorized
  if (!loading && user && !isAuthorized) {
    return (
      <main className="mx-auto max-w-md px-4 py-20">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <h1 className="text-xl font-semibold text-red-800">Access Denied</h1>
          <p className="mt-2 text-sm text-red-600">
            Your email ({user.email}) is not authorized to access the admin area.
          </p>
          <p className="mt-4 text-xs text-red-500">
            Contact the site administrator to request access.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md px-4 py-20">
      <div className="rounded-2xl border border-slate-200 p-6">
        <h1 className="text-xl font-semibold">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-600">
          Sign in with Google to access the admin area.
        </p>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <Button onClick={handleLogin} className="mt-6 w-full" disabled={loading}>
          {loading ? "Loading..." : "Sign in with Google"}
        </Button>

        <p className="mt-4 text-xs text-slate-500">
          Only authorized emails can access this area.
        </p>
      </div>
    </main>
  );
}
