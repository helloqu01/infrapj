'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const system: 'light' | 'dark' = systemPrefersDark ? 'dark' : 'light';
    const initial = stored === 'dark' || stored === 'light' ? stored : system;

    document.documentElement.setAttribute('data-theme', initial);
    setTheme(initial);
  }, []);

  const toggleTheme = () => {
    const next: 'light' | 'dark' = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setTheme(next);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 px-4 py-2 bg-foreground text-background rounded-full shadow-lg hover:opacity-80 transition z-50"
      aria-label="Toggle dark mode"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
