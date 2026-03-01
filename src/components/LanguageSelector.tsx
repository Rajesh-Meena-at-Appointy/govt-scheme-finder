'use client';

import { useI18n, languages, getLanguageFromCode } from '@/lib/i18n';
import { Globe, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function LanguageSelector() {
  const { language, setLanguage, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = getLanguageFromCode(language);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Select language, currently ${currentLang.nativeName}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">{currentLang.nativeName}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white py-1 shadow-lg z-50" role="listbox" aria-label="Select language">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              role="option"
              aria-selected={language === lang.code}
              className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-slate-50 ${
                language === lang.code ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-700'
              }`}
            >
              <span className="text-lg" aria-hidden="true">{lang.flag}</span>
              <span>{lang.nativeName}</span>
              {language === lang.code && (
                <span className="ml-auto text-blue-600" aria-hidden="true">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
