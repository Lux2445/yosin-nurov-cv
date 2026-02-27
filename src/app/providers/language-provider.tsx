import {
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import {
  LanguageContext,
  type LanguageContextValue,
} from '@/app/providers/language-context';
import type { Locale } from '@/types/resume';

const LANGUAGE_STORAGE_KEY = 'mycv-language';

const getInitialLocale = (): Locale => {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const storedLocale = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (storedLocale === 'ru' || storedLocale === 'en') {
    return storedLocale;
  }

  const browserLocale = window.navigator.language.toLowerCase();
  return browserLocale.startsWith('ru') ? 'ru' : 'en';
};

export function LanguageProvider({ children }: PropsWithChildren) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
  }, [locale]);

  const contextValue = useMemo<LanguageContextValue>(
    () => ({ locale, setLocale }),
    [locale],
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}
