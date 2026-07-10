'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ThemeToggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
    {/* SG Logo - top left */}
    <Link
      href="/"
      className="wordmark-legible fixed top-4 left-6 z-50 font-serif text-2xl font-normal tracking-wide transition-colors duration-200"
      style={{ color: 'var(--text-primary)' }}
      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-gold)'}
      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
    >
      SARAH GRAVES
    </Link>

    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div
        className="flex items-center gap-1 p-1.5 rounded-full shadow-lg shadow-black/5"
        style={{
          background: 'color-mix(in srgb, var(--canvas) 65%, transparent)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid var(--line)',
        }}
      >
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-5 py-2 rounded-full text-sm font-medium"
            >
              <motion.span
                className="relative z-10 block"
                style={{
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {link.label}
              </motion.span>
              
              {isActive && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'var(--canvas)' }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>

    {/* Theme toggle - fixed top right */}
    <div className="fixed top-4 right-4 z-50">
      <ThemeToggle />
    </div>
    </>
  );
}
