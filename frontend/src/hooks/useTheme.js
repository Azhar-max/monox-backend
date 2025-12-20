import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState('dark');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('adminTheme');
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Set default theme if none is saved
      applyTheme('dark');
    }

    // Listen for system theme changes if 'auto' theme is selected
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      const savedTheme = localStorage.getItem('adminTheme');
      if (savedTheme === 'auto') {
        document.body.className = e.matches ? 'theme-dark' : 'theme-light';
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  // Apply theme to document body
  const applyTheme = (themeToApply) => {
    if (themeToApply === 'auto') {
      // Check system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.body.className = systemPrefersDark ? 'theme-dark' : 'theme-light';
    } else {
      document.body.className = `theme-${themeToApply}`;
    }
    
    // Ensure all elements update their colors
    document.documentElement.setAttribute('data-theme', themeToApply);
  };

  // Update theme and save to localStorage
  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('adminTheme', newTheme);
    applyTheme(newTheme);
  };

  return { theme, updateTheme };
};