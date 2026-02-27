import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import AdSense from "@/components/AdSense";

export const metadata = {
  title: "Govt Scheme Finder",
  description: "Find government schemes you may be eligible for in India.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-white text-slate-900">
          <AuthProvider>
            <Navbar />
            {children}
            <AdSense />
          </AuthProvider>

          <footer className="mt-12 border-t border-slate-200">
            <div className="mx-auto max-w-6xl px-4 py-8 text-xs text-slate-500">
              Disclaimer: This site provides guidance. Official portals are the source of truth. Do not share sensitive personal data.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
