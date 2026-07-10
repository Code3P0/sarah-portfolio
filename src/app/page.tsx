'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Footer from '@/components/Footer'
import Section from '@/components/Section'
import Placeholder from '@/components/Placeholder'
import { AuroraEffect } from '@/components/AuroraEffect'
import { useState, useEffect, Fragment } from 'react'

// Star configuration for dark mode background
interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  duration: number
  delay: number
}

// Generate scattered stars. Random positions must be produced on the client
// only — generating them during render (server + client) causes a hydration
// mismatch, so we start empty and populate after mount.
function useStars(count: number): Star[] {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    setStars(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 12 + Math.random() * 16,
        opacity: 0.15 + Math.random() * 0.25,
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 4,
      }))
    )
  }, [count])

  return stars
}

// Statement lines. Terms are joined by " · " with real spaces so long lines
// can wrap at the separators (adjacent JSX elements give no break opportunity).
type Item = { t: string; href?: string; external?: boolean }

const statementLines: { label: string; items: Item[] }[] = [
  {
    label: 'I am',
    items: [
      { t: 'MBA Student', href: 'https://www.linkedin.com/in/sarahkgraves/', external: true },
      { t: 'Basketball Player', href: 'https://x.com/TexasWBB/status/2035903853816664282?s=20', external: true },
      { t: 'Artist', href: 'https://www.facebook.com/watch/?v=1584307012898073', external: true },
    ],
  },
  { label: 'I create', items: [{ t: 'Podcast' }, { t: 'YouTube' }] },
  {
    label: 'I build',
    items: [
      { t: 'Path', href: '/projects#path' },
      { t: "The Operator's Lens", href: '/projects#operators-lens' },
      { t: 'BOSI Initiatives', href: '/projects#bosi' },
      { t: 'NOAH Analytics', href: '/projects#noah' },
    ],
  },
  { label: 'I speak', items: [{ t: 'NIL Economics' }, { t: 'Athlete to Operator' }, { t: 'Sports Business & Media' }] },
  { label: 'I work', items: [{ t: 'RedBird Capital' }, { t: 'BOSI Advisory Board' }, { t: 'Boardroom' }] },
  {
    label: 'Contact',
    items: [
      { t: 'Email', href: 'mailto:sarahkgraves2@gmail.com' },
      { t: 'LinkedIn', href: 'https://linkedin.com/in/sarahkgraves', external: true },
      { t: 'Instagram', href: 'https://instagram.com/sarahkgraves', external: true },
      { t: 'X', href: 'https://x.com/sarahkgraves', external: true },
    ],
  },
]

function StatementLine({ label, items }: { label: string; items: Item[] }) {
  return (
    <p className="type-h2">
      <span style={{ color: 'var(--ink-muted)' }}>{label}</span>{' '}
      {items.map((it, i) => (
        <Fragment key={it.t}>
          {i > 0 && <span style={{ color: 'var(--ink-muted)' }}> · </span>}
          {it.href ? (
            <Link
              href={it.href}
              target={it.external ? '_blank' : undefined}
              rel={it.external ? 'noopener noreferrer' : undefined}
              className="link-accent"
            >
              {it.t}
            </Link>
          ) : (
            <span style={{ color: 'var(--ink)' }}>{it.t}</span>
          )}
        </Fragment>
      ))}
    </p>
  )
}

export default function Home() {
  const stars = useStars(18)

  return (
    <main className="relative overflow-x-hidden">
      {/* Hero — sky-gradient photo inset as a large rounded rectangle with page
          background visible around it on all sides (no image touches the edge) */}
      <div className="hero-fade p-4 md:p-6">
        <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden rounded-[24px]">
          {/* Light-mode sky gradient */}
          <div
            className="absolute inset-0 block dark:hidden"
            style={{
              background:
                'linear-gradient(to bottom, #4A90D9 0%, #87CEEB 30%, #C8DCE8 60%, #DDE8EE 82%, #EDEDE9 100%)',
            }}
          />

          {/* Dark-mode night sky */}
          <div
            className="absolute inset-0 hidden dark:block"
            style={{
              background:
                'linear-gradient(to bottom, #0a0f1a 0%, #0d1122 45%, #0f1019 100%)',
            }}
          />

          {/* Aurora ribbons — dark only */}
          <div className="pointer-events-none absolute inset-0 hidden dark:block">
            <AuroraEffect />
          </div>

          {/* Scattered stars — dark only */}
          <div className="pointer-events-none absolute inset-0 hidden overflow-hidden dark:block">
            {stars.map((star) => (
              <motion.img
                key={star.id}
                src="/images/icon4.png"
                alt=""
                className="absolute"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: star.size,
                  height: star.size,
                  filter:
                    'invert(1) brightness(2) drop-shadow(0 0 6px rgba(255,255,255,0.4)) drop-shadow(0 0 12px rgba(200,180,255,0.3))',
                  opacity: star.opacity * 0.6,
                }}
                animate={{
                  y: [0, -8, 0, 6, 0],
                  x: [0, 4, 0, -3, 0],
                  opacity: [star.opacity * 0.5, star.opacity * 0.7, star.opacity * 0.5, star.opacity * 0.4, star.opacity * 0.5],
                }}
                transition={{ duration: star.duration, repeat: Infinity, delay: star.delay, ease: 'easeInOut' }}
              />
            ))}
          </div>

          {/* Drifting clouds — light only */}
          <div className="pointer-events-none absolute inset-0 block overflow-hidden dark:hidden">
            <img src="/images/cloud1.png" alt="" className="absolute w-[600px] opacity-40 animate-cloud-drift md:w-[850px]" style={{ top: '0%', right: '-15%' }} />
            <img src="/images/cloud2.png" alt="" className="absolute w-[550px] opacity-35 animate-cloud-drift-2 md:w-[750px]" style={{ top: '15%', left: '-20%', animationDelay: '-12s' }} />
            <img src="/images/cloud3.png" alt="" className="absolute w-[450px] opacity-35 animate-cloud-drift-3 md:w-[650px]" style={{ top: '-5%', left: '20%', animationDelay: '-20s' }} />
            <img src="/images/cloud4.png" alt="" className="absolute w-[500px] opacity-30 animate-cloud-drift-4 md:w-[700px]" style={{ top: '40%', left: '-10%', animationDelay: '-35s' }} />
          </div>

          {/* Signature wordmark */}
          <div className="relative z-10 w-full max-w-3xl px-6">
            <img
              src="/images/black_signature.gif"
              alt="Sarah Graves"
              className="w-full transition-[filter] duration-200 dark:invert"
            />
          </div>

          {/* Welcome text */}
          <div className="relative z-10 mt-8 w-full max-w-2xl px-6 text-center">
            <p className="font-serif text-[22px] font-normal leading-snug md:text-[28px]" style={{ color: 'var(--ink)' }}>
              Welcome to my corner of the internet!
            </p>
            <p className="mt-4 font-serif text-[22px] font-normal leading-snug md:text-[28px]" style={{ color: 'var(--ink)' }}>
              I love helping people.{' '}
              <Link href="mailto:sarahkgraves2@gmail.com" className="link-accent underline decoration-2 underline-offset-4">
                Contact
              </Link>{' '}
              me with any questions or offers :)
            </p>
          </div>
        </section>
      </div>

      {/* Statement stack */}
      <Section containerClassName="space-y-6 md:space-y-8">
        {statementLines.map((line) => (
          <StatementLine key={line.label} label={line.label} items={line.items} />
        ))}
      </Section>

      {/* Featured */}
      <Section containerClassName="!pt-0">
        <p className="type-caption mb-6">Featured</p>
        <Link
          href="https://www.instagram.com/reel/example/"
          target="_blank"
          rel="noopener noreferrer"
          className="card-lift block max-w-[720px] overflow-hidden rounded-[24px] border p-4"
          style={{ background: 'var(--canvas-raised)', borderColor: 'var(--line)' }}
        >
          <Placeholder ratio="16:9" caption="INSTAGRAM REEL" mark className="!rounded-[12px]" />
          <h3 className="type-h3 mt-5">
            My conversation with Kevin Durant about sports, business, and building
          </h3>
          <p className="type-body mt-2" style={{ color: 'var(--ink-muted)' }}>
            A candid talk about the intersection of athletics and entrepreneurship
          </p>
          <span className="mt-4 inline-block type-body" style={{ color: 'var(--accent)' }}>
            Watch on Instagram →
          </span>
        </Link>
      </Section>

      <Footer />
    </main>
  )
}
