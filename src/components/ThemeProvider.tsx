import { createContext, useContext, useEffect, type ReactNode } from 'react';
import type { ThemeId } from '../lib/tokens.generated';

const ThemeCtx = createContext<ThemeId>('smg');

export interface ThemeProviderProps {
  /** smg (zadano) ili društvo: msan | king | abysalto | aig | ekupi. Mijenja samo akcent. */
  theme?: ThemeId;
  /** true: postavlja data-theme na <html> (cijela aplikacija). false: samo na omotač. */
  global?: boolean;
  children: ReactNode;
}

/** Korijen svake aplikacije: tema (akcent društva) + osnovni stilovi. */
export function ThemeProvider({ theme = 'smg', global = true, children }: ThemeProviderProps) {
  useEffect(() => {
    if (!global) return;
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    html.setAttribute('lang', html.getAttribute('lang') || 'hr');
  }, [theme, global]);
  return (
    <ThemeCtx.Provider value={theme}>
      <div className="smg-root" data-theme={theme}>{children}</div>
    </ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);
