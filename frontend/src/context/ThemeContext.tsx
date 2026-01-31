import { createContext, useContext } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface UseThemeReturn {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  isLight: boolean;
}

export const useTheme = (): UseThemeReturn => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  const { theme, setTheme } = context;

  return {
    theme,
    setTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };
};
