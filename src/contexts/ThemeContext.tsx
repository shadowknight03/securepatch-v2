import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeColor = 'blue' | 'green' | 'purple' | 'red';
type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  color: ThemeColor;
  toggleMode: () => void;
  setColor: (color: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('themeMode');
    return (savedMode as ThemeMode) || 'light';
  });

  const [color, setColor] = useState<ThemeColor>(() => {
    const savedColor = localStorage.getItem('themeColor');
    return (savedColor as ThemeColor) || 'blue';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
    localStorage.setItem('themeColor', color);
    document.documentElement.classList.toggle('dark', mode === 'dark');
    document.documentElement.setAttribute('data-color', color);
  }, [mode, color]);

  const toggleMode = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ mode, color, toggleMode, setColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};