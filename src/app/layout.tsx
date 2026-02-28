import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Providers } from "@/components/Providers";
import { I18nProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import AdSenseWrapper from "@/components/AdSenseWrapper";
import { GTM } from "@/components/GTM";
import { Shield } from "lucide-react";
import Script from "next/script";

export const metadata = {
  title: "Govt Scheme Finder - Find Government Schemes You Qualify For",
  description: "Discover eligible government welfare programs, scholarships, and benefits in India. Get instant eligibility checks and direct links to apply.",
  keywords: "government schemes, welfare programs, scholarships, India government schemes, eligible benefits",
  icons: {
    icon: "/favicon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Govt Scheme Finder - Find Government Schemes You Qualify For",
    description: "Discover eligible government welfare programs in India.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-9419529406465609" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9419529406465609"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <GTM />
        <div className="min-h-screen flex flex-col bg-white text-slate-900">
          <Providers>
            <I18nProvider>
              <AuthProvider>
                <Navbar />
                <div className="flex-1">
                  {children}
                </div>
                <AdSenseWrapper />

                {/* Footer */}
                <footer className="border-t border-slate-200 bg-slate-50">
                  <div className="mx-auto max-w-6xl px-4 py-12">
                    <div className="grid gap-8 md:grid-cols-4">
                      {/* Brand */}
                      <div className="md:col-span-2">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-teal-600">
                            <span className="text-white font-bold text-lg">₹</span>
                          </div>
                          <div>
                            <div className="text-base font-bold bg-gradient-to-r from-blue-700 to-teal-600 bg-clip-text text-transparent">
                              Govt Scheme Finder
                            </div>
                            <div className="text-xs text-slate-500">India's Scheme Discovery Platform</div>
                          </div>
                        </div>
                        <p className="mt-4 max-w-md text-sm text-slate-600">
                          Helping citizens discover government welfare schemes, scholarships, and benefits they qualify for. Our mission is to ensure no eligible citizen misses out on government support.
                        </p>
                      </div>

                      {/* Quick Links */}
                      <div>
                        <h4 className="mb-4 text-sm font-semibold text-slate-900">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                          <li>
                            <a href="/category/farmer" className="hover:text-blue-600">Farmer Schemes</a>
                          </li>
                          <li>
                            <a href="/category/student" className="hover:text-blue-600">Student Scholarships</a>
                          </li>
                          <li>
                            <a href="/category/health" className="hover:text-blue-600">Health Schemes</a>
                          </li>
                          <li>
                            <a href="/category/women" className="hover:text-blue-600">Women Schemes</a>
                          </li>
                          <li>
                            <a href="/submit" className="hover:text-blue-600">Submit a Scheme</a>
                          </li>
                        </ul>
                      </div>

                      {/* Resources */}
                      <div>
                        <h4 className="mb-4 text-sm font-semibold text-slate-900">Resources</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                          <li>
                            <a href="/about" className="hover:text-blue-600">About Us</a>
                          </li>
                          <li>
                            <a href="/contact" className="hover:text-blue-600">Contact</a>
                          </li>
                          <li>
                            <a href="/submit" className="hover:text-blue-600">Submit Scheme</a>
                          </li>
                          <li>
                            <a href="/sitemap.xml" className="hover:text-blue-600">Sitemap</a>
                          </li>
                        </ul>
                      </div>

                      {/* Legal */}
                      <div>
                        <h4 className="mb-4 text-sm font-semibold text-slate-900">Legal</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                          <li>
                            <a href="/privacy-policy" className="hover:text-blue-600">Privacy Policy</a>
                          </li>
                          <li>
                            <a href="/terms" className="hover:text-blue-600">Terms of Service</a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 md:flex-row">
                      <p className="text-xs text-slate-500">
                        © {currentYear} Govt Scheme Finder. All rights reserved.
                      </p>
                      <p className="text-xs text-slate-500 max-w-md text-center">
                        <strong>Disclaimer:</strong> This website provides guidance and information for educational purposes only. Always verify eligibility criteria and official details on respective government portals before applying.
                      </p>
                    </div>
                  </div>
                </footer>
              </AuthProvider>
            </I18nProvider>
          </Providers>
        </div>
      </body>
    </html>
  );
}
