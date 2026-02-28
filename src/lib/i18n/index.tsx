'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from './translations';
import { hi } from './hi';
import { bn } from './bn';
import { te } from './te';
import { mr } from './mr';
import { ta } from './ta';
import { gu } from './gu';
import { kn } from './kn';
import { ml } from './ml';
import { pa } from './pa';
import { or } from './or';
import { as } from './as';
import { languages, defaultLanguage, getLanguageFromCode } from './languages';

type TranslationType = typeof translations;

const translationMap: Record<string, TranslationType> = {
  en: translations,
  hi: hi,
  bn: bn,
  te: te,
  mr: mr,
  ta: ta,
  gu: gu,
  kn: kn,
  ml: ml,
  pa: pa,
  or: or,
  as: as,
};

// SEO-friendly metadata for each language
export const languageMetadata: Record<string, {
  title: string;
  description: string;
  keywords: string;
}> = {
  en: {
    title: 'Govt Scheme Finder - Find Government Schemes You Qualify For',
    description: 'Discover eligible government welfare programs, scholarships, and benefits in India. Get instant eligibility checks and direct links to apply.',
    keywords: 'government schemes, welfare programs, scholarships, India government schemes, eligible benefits',
  },
  hi: {
    title: 'सरकारी योजना खोजें - भारत की सरकारी योजनाएं',
    description: 'भारत में सरकारी कल्याण कार्यक्रम, छात्रवृत्ति और लाभ खोजें। तुरंत पात्रता जांच प्राप्त करें।',
    keywords: 'सरकारी योजनाएं, कल्याण कार्यक्रम, छात्रवृत्ति, भारत सरकार',
  },
  bn: {
    title: 'সরকারি প্রকল্প খুঁজুন - ভারতের সরকারি প্রকল্প',
    description: 'ভারতে সরকারি কল্যাণ প্রকল্প, বৃত্তি এবং সুবিধা আবিষ্কার করুন।',
    keywords: 'সরকারি প্রকল্প, কল্যাণ, বৃত্তি, ভারত সরকার',
  },
  te: {
    title: 'Government Schemes - India lo Schemes',
    description: 'India lo government welfare programs, scholarships, benefits find cheyyu.',
    keywords: 'government schemes, welfare, scholarships, India',
  },
  mr: {
    title: 'सरकारी योजना शोधा - भारताच्या योजना',
    description: 'भारतातील सरकारी कल्याण कार्यक्रम, शिष्यवृत्ती आणि लाभ शोधा.',
    keywords: 'सरकारी योजना, कल्याण, शिष्यवृत्ती, भारत',
  },
  ta: {
    title: 'Government Schemes - அரசு திட்டங்கள்',
    description: 'இந்தியாவில் அரசு நலத் திட்டங்கள், உதவித் தொகைகள்.',
    keywords: 'government schemes, welfare, scholarships, India',
  },
  gu: {
    title: 'સરકારી યોજનાઓ - ભારતની યોજનાઓ',
    description: 'ભારતની સરકારી કલ્યાણ યોજનાઓ, શિષ્યવૃત્તિઓ.',
    keywords: 'government schemes, welfare, scholarships, India',
  },
  kn: {
    title: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು - ಭಾರತದ ಯೋಜನೆಗಳು',
    description: 'ಭಾರತದ ಸರ್ಕಾರಿ ಕಲ್ಯಾಣ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ವಿದ್ಯಾರ್ಥಿ ವೇತನಗಳು.',
    keywords: 'government schemes, welfare, scholarships, India',
  },
  ml: {
    title: 'സര്‍ക്കാര്‍ പദ്ധതികള്‍ - ഇന്ത്യയിലെ പദ്ധതികള്‍',
    description: 'ഇന്ത്യയിലെ സര്‍ക്കാര്‍ ക്ഷേമ പദ്ധതികള്‍, സ്കോളര്‍ഷിപ്പുകള്‍.',
    keywords: 'government schemes, welfare, scholarships, India',
  },
  pa: {
    title: 'ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ - ਭਾਰਤ ਦੀਆਂ ਯੋਜਨਾਵਾਂ',
    description: 'ਭਾਰਤ ਵਿੱਚ ਸਰਕਾਰੀ ਭਲਾਈ ਪ੍ਰੋਗਰਾਮ, ਵਿਦਿਆਰਥੀ ਵਜ਼ੀਫ਼ੇ.',
    keywords: 'government schemes, welfare, scholarships, India',
  },
  or: {
    title: 'ସରକାରୀ ଯୋଜନା - ଭାରତର ଯୋଜନା',
    description: 'ଭାରତର ସରକାରୀ କଲ୍ୟାଣ କାର୍ଯ୍ਕ୍ਰਮ, ବୃତ୍ਤି.',
    keywords: 'government schemes, welfare, scholarships, India',
  },
  as: {
    title: 'চৰকাৰী পরিকল্পনা - ভাৰতৰ পরিকল্পনা',
    description: 'ভাৰতত চৰকাৰী কল্যাণ কার্যক্রম, বৃত্তি আৰু সুবিধা.',
    keywords: 'government schemes, welfare, scholarships, India',
  },
};

interface I18nContextType {
  language: string;
  setLanguage: (code: string) => void;
  t: TranslationType;
  languages: typeof languages;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState(defaultLanguage);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load saved language from localStorage
    const saved = localStorage.getItem('language');
    if (saved && languages.some(l => l.code === saved)) {
      setLanguageState(saved);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (languages.some(l => l.code === browserLang)) {
        setLanguageState(browserLang);
      }
    }
  }, []);

  const setLanguage = (code: string) => {
    setLanguageState(code);
    localStorage.setItem('language', code);
  };

  const t = translationMap[language] || translations;

  if (!mounted) {
    return React.createElement(React.Fragment, null, children);
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, languages }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    // Return default values during SSR or when not in provider
    return {
      language: defaultLanguage,
      setLanguage: () => {},
      t: translations,
      languages,
    };
  }
  return context;
}

export { languages, getLanguageFromCode };
