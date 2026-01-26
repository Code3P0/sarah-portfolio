'use client';

import { motion } from 'framer-motion';

// Section data from PRD
const sections = [
  {
    label: 'I am',
    items: [
      'Texas Women\'s Basketball player',
      'BBA Finance, UT McCombs (May 2026)',
      'Building projects in sports, media, and tech',
    ],
  },
  {
    label: 'I work',
    items: [
      'RedBird Capital → comps, market mapping, college sports research',
      'BOSI → advisory board work and student-athlete career access projects',
      'Boardroom → campus program building (in progress)',
    ],
  },
  {
    label: 'I build',
    items: [
      { text: 'Path → swipe-based sports career discovery app', href: '/projects#path' },
      { text: 'The Operator\'s Lens → short writing and frameworks', href: '/projects#operators-lens' },
      { text: 'BOSI initiatives → repeatable internships and mentorship pipelines', href: '/projects#bosi' },
      { text: 'Data work → NOAH shooting analytics projects', href: '/projects#redbird' },
    ],
  },
  {
    label: 'I speak',
    items: [
      'NIL and college athletics economics',
      'Athlete to operator transition',
      'Sports business, media, and product thinking',
    ],
  },
  {
    label: 'Contact',
    items: [
      { text: 'sarahkgraves2@gmail.com', href: 'mailto:sarahkgraves2@gmail.com' },
      { text: 'LinkedIn', href: 'https://linkedin.com/in/sarahkgraves' },
      { text: 'Instagram', href: 'https://instagram.com/sarahkgraves' },
      { text: 'X', href: 'https://x.com/sarahkgraves' },
    ],
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center">
        {/* Main heading - placeholder for video */}
        <h1 
          className="font-serif text-6xl md:text-8xl font-bold"
          style={{ color: 'var(--text-primary)' }}
        >
          SARAH GRAVES!
        </h1>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-12 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span 
            className="text-sm uppercase tracking-widest"
            style={{ color: 'var(--text-secondary)' }}
          >
            Scroll
          </span>
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: 'var(--text-secondary)' }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        </motion.div>
      </section>

      {/* Category Sections */}
      <section 
        className="py-24 px-6"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="mx-auto max-w-4xl space-y-20">
          {sections.map((section) => (
            <div 
              key={section.label}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8"
            >
              {/* Section label */}
              <h2 
                className="font-serif text-2xl"
                style={{ color: 'var(--accent-gold)' }}
              >
                {section.label}
              </h2>

              {/* Content items */}
              <ul className="space-y-3">
                {section.items.map((item, index) => {
                  const isLink = typeof item === 'object' && item.href;
                  const text = typeof item === 'string' ? item : item.text;
                  const href = typeof item === 'object' ? item.href : null;

                  return (
                    <li key={index}>
                      {isLink ? (
                        <a
                          href={href!}
                          className="text-lg transition-colors hover:opacity-80"
                          style={{ color: 'var(--text-primary)' }}
                          target={href?.startsWith('http') ? '_blank' : undefined}
                          rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {text}
                        </a>
                      ) : (
                        <span 
                          className="text-lg"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {text}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
