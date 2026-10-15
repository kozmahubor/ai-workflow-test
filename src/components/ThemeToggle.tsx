'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'gpu-comparison-theme';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const preferredTheme: Theme =
      savedTheme === 'dark' || savedTheme === 'light'
        ? savedTheme
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';

    setTheme(preferredTheme);
    document.documentElement.dataset.theme = preferredTheme;
    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  };

  return (
    <button
      aria-label={theme === 'light' ? 'Sötét téma bekapcsolása' : 'Világos téma bekapcsolása'}
      aria-pressed={theme === 'dark'}
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
    >
      {isMounted && theme === 'dark' ? '☀ Világos' : '☾ Sötét'}
    </button>
  );
}
