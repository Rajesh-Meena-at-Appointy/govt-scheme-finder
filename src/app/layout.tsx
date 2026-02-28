import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Providers } from "@/components/Providers";
import { I18nProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSenseWrapper from "@/components/AdSenseWrapper";
import { GTM } from "@/components/GTM";
import Script from "next/script";
import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://govtschemefinder.com';

const languageMetadata: Record<string, { title: string; description: string; keywords: string }> = {
  en: { title: 'Govt Scheme Finder - Find Government Schemes You Qualify For', description: 'Discover eligible government welfare programs, scholarships, and benefits in India.', keywords: 'government schemes, welfare programs, scholarships, India' },
  hi: { title: 'सरकारी योजना खोजें - भारत की सरकारी योजनाएं', description: 'भारत में सरकारी कल्याण कार्यक्रम, छात्रवृत्ति और लाभ खोजें।', keywords: 'सरकारी योजनाएं, कल्याण कार्यक्रम, छात्रवृत्ति, भारत सरकार' },
  bn: { title: 'সরকারি প্রকল্প খুঁজুন - ভারতের সরকারি প্রকল্প', description: 'ভারতে সরকারি কল্যাণ প্রকল্প, বৃত্তি এবং সুবিধা আবিষ্কার করুন।', keywords: 'সরকারি প্রকল্প, কল্যাণ, বৃত্তি, ভারত সরকার' },
  te: { title: 'Government Schemes - India lo Schemes', description: 'India lo government welfare programs, scholarships, benefits find cheyyu.', keywords: 'government schemes, welfare, scholarships, India' },
  mr: { title: 'सरकारी योजना शोधा - भारताच्या योजना', description: 'भारतातील सरकारी कल्याण कार्यक्रम, शिष्यवृत्ती आणि लाभ शोधा.', keywords: 'सरकारी योजना, कल्याण, शिष्यवृत्ती, भारत' },
  ta: { title: 'Government Schemes - அரசு திட்டங்கள்', description: 'இந்தியாவில் அரசு நலத் திட்டங்கள், உதவித் தொகைகள்.', keywords: 'government schemes, welfare, scholarships, India' },
  gu: { title: 'સરકારી યોજનાઓ - ભારતની યોજનાઓ', description: 'ભારતની સરકારી કલ્યાણ યોજનાઓ, શિષ્યવૃત્તિઓ.', keywords: 'government schemes, welfare, scholarships, India' },
  kn: { title: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು - ಭಾರತದ ಯೋಜನೆಗಳು', description: 'ಭಾರತದ ಸರ್ಕಾರಿ ಕಲ್ಯಾಣ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ವಿದ್ಯಾರ್ಥಿ ವೇತನಗಳು.', keywords: 'government schemes, welfare, scholarships, India' },
  ml: { title: 'സര്‍ക്കാര്‍ പദ്ധതികള്‍ - ഇന്ത്യയിലെ പദ്ധതികള്‍', description: 'ഇന്ത്യയിലെ സര്‍ക്കാര്‍ ക്ഷേമ പദ്ധതികള്‍, സ്കോളര്‍ഷിപ്പുകള്‍.', keywords: 'government schemes, welfare, scholarships, India' },
  pa: { title: 'ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ - ਭਾਰਤ ਦੀਆਂ ਯੋਜਨਾਵਾਂ', description: 'ਭਾਰਤ ਵਿੱਚ ਸਰਕਾਰੀ ਭਲਾਈ ਪ੍ਰੋਗਰਾਮ, ਵਿਦਿਆਰਥੀ ਵਜ਼ੀਫ਼ੇ.', keywords: 'government schemes, welfare, scholarships, India' },
  or: { title: 'ସରକାରୀ ଯୋଜନା - ଭାରତର ଯୋଜନା', description: 'ଭାରତର ସରକାରୀ କଲ୍ୟାଣ କାର୍ଯ୍କ୍ਰਮ, ବୃତ୍ତି.', keywords: 'government schemes, welfare, scholarships, India' },
  as: { title: 'চৰকাৰী পরিকল্পনা - ভাৰতৰ পরিকল্পনা', description: 'ভাৰতত চৰকাৰী কল্যাণ কার্যক্রম, বৃত্তি আৰু সুবিধা.', keywords: 'government schemes, welfare, scholarships, India' },
};

// Generate dynamic metadata based on language
export async function generateMetadata({ params }: { params: Promise<{ lang?: string }> }): Promise<Metadata> {
  let lang = 'en';
  try {
    const resolvedParams = await params;
    lang = resolvedParams?.lang || 'en';
  } catch (e) {
    // Fallback to English if params unavailable
  }

  const meta = languageMetadata[lang] || languageMetadata.en;

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
      canonical: SITE_URL,
      languages: {
        'en': SITE_URL,
        'hi': `${SITE_URL}/hi`,
        'bn': `${SITE_URL}/bn`,
        'te': `${SITE_URL}/te`,
        'mr': `${SITE_URL}/mr`,
        'ta': `${SITE_URL}/ta`,
        'gu': `${SITE_URL}/gu`,
        'kn': `${SITE_URL}/kn`,
        'ml': `${SITE_URL}/ml`,
        'pa': `${SITE_URL}/pa`,
        'or': `${SITE_URL}/or`,
        'as': `${SITE_URL}/as`,
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
