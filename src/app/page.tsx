'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Footer from '@/components/Footer'
import Section from '@/components/Section'
import ScrollReveal from '@/components/ScrollReveal'
import ContactBand from '@/components/ContactBand'
import EditorialStatement from '@/components/EditorialStatement'
import WorkRail from '@/components/WorkRail'
import PressSection from '@/components/PressSection'
import FeatureStory from '@/components/FeatureStory'
import Finale from '@/components/Finale'
import { AuroraEffect } from '@/components/AuroraEffect'
import { useState, useEffect } from 'react'

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

// Random star positions must be produced on the client only (SSR + client
// generation causes a hydration mismatch), so we start empty and populate after mount.
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

// Section 6 — Currently (two-column)
const currently = [
  {
    heading: 'Building',
    items: ['Path — career discovery for sports', 'BOSI internship pipeline', 'The Operator’s Lens essays'],
  },
  {
    heading: 'Exploring',
    items: ['Sports media economics', 'AI in scouting & analytics', 'Long-form interview formats'],
  },
]

export default function Home() {
  const stars = useStars(18)

  return (
    <main className="relative overflow-x-hidden">
      {/* SECTION 1 — HERO: inset sky-gradient rounded rectangle (kept as-is) */}
      <div className="hero-fade p-4 md:p-6">
        <section
          data-hero
          className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden rounded-[24px]"
        >
          {/* Light-mode sky gradient */}
          <div
            className="absolute inset-0 block dark:hidden"
            style={{ background: 'linear-gradient(to bottom, #4A90D9 0%, #87CEEB 30%, #C8DCE8 60%, #DDE8EE 82%, #EDEDE9 100%)' }}
          />
          {/* Dark-mode night sky */}
          <div
            className="absolute inset-0 hidden dark:block"
            style={{ background: 'linear-gradient(to bottom, #0a0f1a 0%, #0d1122 45%, #0f1019 100%)' }}
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
                  filter: 'invert(1) brightness(2) drop-shadow(0 0 6px rgba(255,255,255,0.4)) drop-shadow(0 0 12px rgba(200,180,255,0.3))',
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
            <img src="/images/black_signature.gif" alt="Sarah Graves" className="w-full transition-[filter] duration-200 dark:invert" />
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

      {/* SECTION 2 — EDITORIAL STATEMENT (inline image glyphs) */}
      <EditorialStatement />

      {/* SECTION 3 — SELECTED WORK RAIL */}
      <WorkRail />

      {/* SECTION 4 — PRESS */}
      <PressSection />

      {/* SECTION 5 — FEATURE STORY (KD interview slot) */}
      <FeatureStory />

      {/* SECTION 6 — CURRENTLY (two-column) */}
      <Section>
        <ScrollReveal>
          <h2 className="type-h2 mb-10">Currently</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {currently.map((col) => (
            <ScrollReveal key={col.heading}>
              <p className="type-caption mb-4">{col.heading}</p>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item} className="type-body" style={{ color: 'var(--ink)' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* SECTION 7 — FULL-BLEED DARK FINALE */}
      <Finale />

      {/* SECTION 8 — CONTACT BAND + FOOTER */}
      <Section className="!pt-0">
        <ContactBand />
      </Section>
      <Footer />
    </main>
  )
}
