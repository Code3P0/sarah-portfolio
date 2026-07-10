'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
];

type NavState = 'hero' | 'solid' | 'dark';

// Vertical center of the pill (top-4 = 16px + ~24px half-height)
const NAV_Y = 40;

export default function Navigation() {
  const pathname = usePathname();
  const [state, setState] = useState<NavState>('solid');

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      // Dark full-bleed media passing under the nav wins.
      const darks = document.querySelectorAll<HTMLElement>('[data-nav-dark]');
      for (const d of darks) {
        const r = d.getBoundingClientRect();
        if (r.top <= NAV_Y && r.bottom >= NAV_Y) {
          setState('dark');
          return;
        }
      }
      // Still over the hero media?
      const hero = document.querySelector<HTMLElement>('[data-hero]');
      if (hero && hero.getBoundingClientRect().bottom > NAV_Y) {
        setState('hero');
        return;
      }
      setState('solid');
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  const overDark = state === 'dark';

  const pillStyle =
    state === 'hero'
      ? {
          background: 'color-mix(in srgb, var(--canvas) 55%, transparent)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid var(--line)',
        }
      : state === 'dark'
      ? {
          background: 'rgba(12, 12, 14, 0.6)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        }
      : {
          background: 'var(--canvas-raised)',
          border: '1px solid var(--line)',
        };

  const activeBg = overDark ? 'rgba(255, 255, 255, 0.18)' : 'var(--canvas)';
  const inkColor = overDark ? '#F5F5F3' : 'var(--text-primary)';
  const mutedColor = overDark ? 'rgba(245, 245, 243, 0.72)' : 'var(--text-secondary)';

  return (
    <>
      {/* SG wordmark - top left */}
      <Link
        href="/"
        className="fixed top-4 left-6 z-50 font-serif text-2xl font-normal tracking-wide"
        style={{ color: inkColor, transition: 'color var(--dur-state) var(--ease)' }}
      >
        SARAH GRAVES
      </Link>

      <nav className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
        <div
          className="flex items-center gap-1 rounded-full p-1.5 shadow-lg shadow-black/5"
          style={{ ...pillStyle, transition: 'background-color var(--dur-state) var(--ease), border-color var(--dur-state) var(--ease)' }}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative rounded-full px-5 py-2 text-sm font-medium"
              >
                <motion.span
                  className="relative z-10 block"
                  style={{ color: isActive ? inkColor : mutedColor, transition: 'color var(--dur-state) var(--ease)' }}
                  whileHover={{ opacity: 0.75 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.label}
                </motion.span>

                {isActive && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full"
                    style={{ background: activeBg }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Theme toggle - top right */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle overDark={overDark} />
      </div>
    </>
  );
}
