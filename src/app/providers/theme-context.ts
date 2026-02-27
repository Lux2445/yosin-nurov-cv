import { createContext } from 'react';
import type { ThemeMode } from '@/types/resume';

export interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);
