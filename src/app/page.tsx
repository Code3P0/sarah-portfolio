'use client'
import Footer from '@/components/Footer'
import Section from '@/components/Section'
import ScrollReveal from '@/components/ScrollReveal'
import ContactBand from '@/components/ContactBand'
import EditorialStatement from '@/components/EditorialStatement'
import WorkRail from '@/components/WorkRail'
import PressSection from '@/components/PressSection'
import FeatureStory from '@/components/FeatureStory'
import Finale from '@/components/Finale'

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
  return (
    <main className="relative overflow-x-hidden">
      {/* SECTION 1 — HERO: clean canvas, script wordmark + one action */}
      <section
        data-hero
        className="hero-fade flex min-h-[84vh] flex-col items-center justify-center px-6"
      >
        {/* Script wordmark — the primary identity. Black ink inverts to white in
            dark mode (white_signature.gif is a duplicate dark asset), full width
            so the whole "Sarah Graves" is always visible (no clip). */}
        <div className="w-full max-w-4xl">
          <img
            src="/images/black_signature.gif"
            alt="Sarah Graves"
            className="mx-auto block w-full dark:invert"
          />
        </div>

        {/* One action — glassy pill, jumps to the contact panel (no scroll anim) */}
        <div className="mt-10">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('contact')
              if (el) el.scrollIntoView({ behavior: 'instant' as ScrollBehavior })
              history.replaceState(null, '', '#contact')
            }}
            className="hero-cta inline-flex items-center justify-center rounded-full px-12 py-5 text-xl font-medium"
          >
            Contact
          </button>
        </div>
      </section>

      {/* SECTION 2 — EDITORIAL STATEMENT (inline image glyphs) */}
      <EditorialStatement />

      {/* SECTION 3 — SELECTED WORK */}
      <WorkRail />

      {/* SECTION 4 — PRESS */}
      <PressSection />

      {/* SECTION 5 — FEATURE STORY */}
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
