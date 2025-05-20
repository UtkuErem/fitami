import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { atoms } from '../theme';

// Define theme types
export type ThemeMode = 'light' | 'dark' | 'system';

// Define the context shape
interface ThemeContextType {
  themeMode: ThemeMode;
  isDarkMode: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  toggleDarkMode: () => void;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'system',
  isDarkMode: false,
  setThemeMode: () => {},
  toggleDarkMode: () => {},
});

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get the device color scheme
  const deviceColorScheme = useColorScheme();

  // State for the theme mode
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');

  // Compute whether dark mode is active based on theme mode and device settings
  const isDarkMode = themeMode === 'system'
    ? deviceColorScheme === 'dark'
    : themeMode === 'dark';

  // Toggle between light and dark mode
  const toggleDarkMode = () => {
    setThemeMode(isDarkMode ? 'light' : 'dark');
  };

  // Apply theme changes to the app
  useEffect(() => {
    // Here you would apply theme changes to the app
    // For example, update the status bar color, navigation bar color, etc.
    // This is a placeholder for actual theme application logic

    // You could also persist the theme preference to storage here
  }, [isDarkMode]);

  // Provide the theme context to the app
  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        isDarkMode,
        setThemeMode,
        toggleDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
