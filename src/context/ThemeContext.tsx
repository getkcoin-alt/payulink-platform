import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemePreset } from '../types';

interface ThemeContextType {
  theme: ThemePreset;
  setTheme: (theme: ThemePreset) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemePreset>(() => {
    return (localStorage.getItem('bp-theme-preset') as ThemePreset) || 'dark';
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('merchantSidebarCollapsed') === 'true';
  });

  const [sidebarWidth, setSidebarWidthState] = useState<number>(() => {
    const saved = Number(localStorage.getItem('merchantSidebarWidth'));
    return Number.isFinite(saved) && saved >= 208 && saved <= 360 ? saved : 240;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('bp-theme-preset', theme);
  }, [theme]);

  const setTheme = (t: ThemePreset) => {
    setThemeState(t);
  };

  const setSidebarWidth = (w: number) => {
    const clamped = Math.min(360, Math.max(208, w));
    setSidebarWidthState(clamped);
    localStorage.setItem('merchantSidebarWidth', String(clamped));
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      sidebarCollapsed,
      setSidebarCollapsed,
      sidebarWidth,
      setSidebarWidth
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
