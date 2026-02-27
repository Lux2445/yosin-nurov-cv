import { createContext } from 'react';
import type { Locale } from '@/types/resume';

export interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);
