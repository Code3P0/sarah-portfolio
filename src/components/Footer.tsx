'use client'

import Link from 'next/link'
import Section from '@/components/Section'

const columns: { label: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    label: 'Site',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Projects', href: '/projects' },
      { label: 'About', href: '/about' },
    ],
  },
  {
    label: 'Work',
    links: [
      { label: 'Strategy', href: '/projects/strategy' },
      { label: 'Data Analytics', href: '/projects/data' },
      { label: 'Media', href: '/projects/media' },
      { label: 'Writing', href: '/projects/writing' },
    ],
  },
  {
    label: 'Social',
    links: [
      { label: 'Email', href: 'mailto:sarahkgraves2@gmail.com' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/sarahkgraves', external: true },
      { label: 'Instagram', href: 'https://instagram.com/sarahkgraves', external: true },
      { label: 'X', href: 'https://x.com/sarahkgraves', external: true },
    ],
  },
]

export default function Footer() {
  return (
    <Section as="footer" className="border-t border-[var(--line)]">
      <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3">
        {columns.map((col) => (
          <nav key={col.label} className="flex flex-col">
            <p className="type-caption mb-6">{col.label}</p>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="link-accent type-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Script wordmark sign-off — small, centered, the last thing on the page */}
      <div className="mt-24 flex flex-col items-center gap-4">
        <img
          src="/images/black_signature.gif"
          alt="Sarah Graves"
          className="h-12 w-auto opacity-80 dark:invert"
        />
        <p className="type-caption">© 2026 Sarah Graves</p>
      </div>
    </Section>
  )
}
