'use client'

import Link from 'next/link'

const socialLinks = [
  { label: 'Email', href: 'mailto:sarahkgraves2@gmail.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/sarahkgraves' },
  { label: 'Instagram', href: 'https://instagram.com/sarahkgraves' },
  { label: 'X', href: 'https://x.com/sarahkgraves' },
]

export default function Footer() {
  return (
    <footer
      className="max-w-6xl mx-auto px-6 py-8 border-t"
      style={{ borderColor: 'rgba(var(--text-secondary), 0.1)' }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p
          className="text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          © 2026 Sarah Graves
        </p>

        <div className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="text-sm transition-colors hover:text-[var(--accent-gold)]"
              style={{ color: 'var(--text-secondary)' }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
