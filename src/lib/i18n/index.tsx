'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from './translations';
import { hi } from './hi';
import { languages, defaultLanguage, getLanguageFromCode } from './languages';

type TranslationType = typeof translations;

const translationMap: Record<string, TranslationType> = {
  en: translations,
  hi: hi,
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
