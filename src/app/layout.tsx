import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Providers } from "@/components/Providers";
import { I18nProvider, languageMetadata } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSenseWrapper from "@/components/AdSenseWrapper";
import { GTM } from "@/components/GTM";
import Script from "next/script";
import { Metadata } from "next";

// Generate dynamic metadata based on language
export async function generateMetadata({ params }: { params: Promise<{ lang?: string }> }): Promise<Metadata> {
  let lang = 'en';
  try {
    const resolvedParams = await params;
    lang = resolvedParams?.lang || 'en';
  } catch (e) {
    // Fallback to English if params unavailable
  }

  const meta = languageMetadata[lang] || languageMetadata['en'] || {
    title: 'Govt Scheme Finder - Find Government Schemes You Qualify For',
    description: 'Discover eligible government welfare programs, scholarships, and benefits in India.',
    keywords: 'government schemes, welfare programs, scholarships, India'
  };

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
    },
    alternates: {
      languages: {
        'en': '/en',
        'hi': '/hi',
        'bn': '/bn',
        'te': '/te',
        'mr': '/mr',
        'ta': '/ta',
        'gu': '/gu',
        'kn': '/kn',
        'ml': '/ml',
        'pa': '/pa',
        'or': '/or',
        'as': '/as',
      },
    },
  };
}

// Static params for all supported languages
export function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'hi' },
    { lang: 'bn' },
    { lang: 'te' },
    { lang: 'mr' },
    { lang: 'ta' },
    { lang: 'gu' },
    { lang: 'kn' },
    { lang: 'ml' },
    { lang: 'pa' },
    { lang: 'or' },
    { lang: 'as' },
  ];
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
                <Footer />
              </AuthProvider>
            </I18nProvider>
          </Providers>
        </div>
      </body>
    </html>
  );
}
