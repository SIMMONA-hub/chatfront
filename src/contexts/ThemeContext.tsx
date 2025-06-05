import React, { createContext, useContext, useState } from 'react';
import type { AppTheme } from '../types';

const lightTheme: AppTheme = {
  name: 'light',
  colors: {
    primary: '#0088cc',
    secondary: '#54a9eb',
    background: '#f4f4f5',
    surface: '#ffffff',
    text: '#000000',
    textSecondary: '#707579',
    border: '#e4e4e7',
    messageOut: '#0088cc',
    messageIn: '#ffffff',
  },
};

const darkTheme: AppTheme = {
  name: 'dark',
  colors: {
    primary: '#54a9eb',
    secondary: '#0088cc',
    background: '#1a1a1a',
    surface: '#2d2d2d',
    text: '#ffffff',
    textSecondary: '#a0a0a0',
    border: '#404040',
    messageOut: '#54a9eb',
    messageIn: '#2d2d2d',
  },
};

interface ThemeContextType {
  theme: AppTheme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};