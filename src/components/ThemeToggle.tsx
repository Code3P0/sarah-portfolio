'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type Theme = 'light' | 'dark';

export function ThemeToggle({ overDark = false }: { overDark?: boolean }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Frosted-glass circle so the toggle stays legible over the hero in both modes.
  // Over dark full-bleed media it switches to a dark glass with a light border.
  const frostedCircle = overDark
    ? ({
        background: 'rgba(12, 12, 14, 0.6)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        transition: 'background-color var(--dur-state) var(--ease), border-color var(--dur-state) var(--ease)',
      } as const)
    : ({
        background: 'color-mix(in srgb, var(--canvas) 65%, transparent)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid var(--line)',
        transition: 'background-color var(--dur-state) var(--ease), border-color var(--dur-state) var(--ease)',
      } as const);

  const iconColor = overDark ? '#F5F5F3' : 'var(--text-secondary)';

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        className="flex h-11 w-11 items-center justify-center rounded-full"
        style={frostedCircle}
        aria-label="Toggle theme"
      >
        <div className="h-5 w-5" />
      </button>
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="flex h-11 w-11 items-center justify-center rounded-full shadow-lg shadow-black/5"
      style={{ color: iconColor, ...frostedCircle }}
      whileHover={{ scale: 1.1, color: 'var(--accent-gold)' }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {theme === 'dark' ? (
          // Moon icon
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          // Sun icon
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        )}
      </motion.div>
    </motion.button>
  );
}
