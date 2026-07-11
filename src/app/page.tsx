'use client'
import Image from 'next/image'
import Footer from '@/components/Footer'
import Section from '@/components/Section'
import ContactBand from '@/components/ContactBand'
import VerbIntro from '@/components/VerbIntro'
import NewsletterSection from '@/components/NewsletterSection'
import WorkRail from '@/components/WorkRail'
import PressSection from '@/components/PressSection'

// Hidden for now, see src/components/VerbIntro.tsx (interactive word switcher;
// its data lives in src/data/verbs.ts). Flip to true to bring it back.
// The earlier statement variant is preserved in src/components/EditorialStatement.tsx.
const showIdentitySection = false

// JSON-LD Person: only factually verifiable fields; sameAs URLs are the real
// profiles already used in the site's contact/footer content.
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sarah Graves',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://sarahgraves.com',
  jobTitle: 'Guard, Texas Women’s Basketball',
  affiliation: [
    { '@type': 'CollegeOrUniversity', name: 'The University of Texas at Austin' },
    { '@type': 'CollegeOrUniversity', name: 'McCombs School of Business' },
  ],
  sameAs: [
    'https://linkedin.com/in/sarahkgraves',
    'https://instagram.com/sarahkgraves',
    'https://x.com/sarahkgraves',
  ],
}

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      {/* HERO. Layered cinematic day/night composition with bold scroll
          parallax. Planes, back to front: back plate (lags hardest) ->
          localized scrims -> wordmark (lags less; recedes behind Sarah) ->
          front cutout (leads the page, swells slightly). The front plane is
          feather-masked around Sarah so the rough matte's rectangle never
          pops over the wordmark; nav + Contact do not parallax. */}
      <div className="hero-fade p-4 md:p-6">
        <section
          data-hero
          className="hero-timeline relative flex min-h-[86vh] flex-col justify-center overflow-hidden rounded-[24px]"
          style={{ background: 'var(--canvas-raised)' }}
        >
          {/* PLANE 1: back plate (deepest, slowest). Keeps drift + grade. */}
          <div className="hero-par-back absolute inset-0">
            <div className="hero-drift absolute inset-0 dark:brightness-[.85] dark:saturate-[1.06]">
              <Image
                src="/images/back-hero.png"
                alt=""
                aria-hidden
                fill
                priority
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: '74% 32%' }}
              />
              {/* Front plate also rides the back plane at rest so the scene is
                  complete; the separate front PLANE above re-draws Sarah so she
                  can lead. Identical position = seamless rest state. */}
              <Image
                src="/images/front-hero-sarah-graves.png"
                alt="Sarah Graves, Texas Women's Basketball guard, standing courtside"
                fill
                priority
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: '74% 32%' }}
              />
            </div>
          </div>

          {/* Localized night scrim: espresso falloff on the left third + floor
              fade. Feathered wide; reads as light falloff, not a box. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[600ms] dark:opacity-100"
            style={{
              background:
                'linear-gradient(to right, rgba(16,13,10,0.78) 0%, rgba(16,13,10,0.42) 30%, transparent 56%), linear-gradient(to top, rgba(14,12,10,0.6) 0%, transparent 26%)',
            }}
          />
          {/* Amber light along Sarah's edge. Screen blend: adds light. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[600ms] dark:opacity-100"
            style={{
              background: 'radial-gradient(ellipse 46% 72% at 68% 48%, rgba(255,158,66,0.38), transparent 64%)',
              mixBlendMode: 'screen',
            }}
          />
          {/* Localized day scrim: quiet canvas lift on the left third only. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-[600ms] dark:opacity-0"
            style={{
              background:
                'linear-gradient(to right, rgba(245,245,243,0.5) 0%, rgba(245,245,243,0.22) 32%, transparent 54%)',
            }}
          />

          {/* Moving film grain; static under reduced motion. z-30: above every
              layer (including the depth band) so the film sits on one plane. */}
          <div aria-hidden className="hero-grain pointer-events-none absolute inset-0 z-30" />

          {/* Wordmark + single action. Plain animated signature GIF, its own
              transparency only, no mask/cutout/compositing. Contained in the
              open left area over the seats, clear of Sarah. Note:
              white_signature.gif is byte-identical to the black file (no true
              white asset exists), so dark mode inverts the black GIF. */}
          <div className="relative z-10 flex w-full -translate-y-24 flex-col items-start px-6 md:translate-y-0 md:pl-[6%]">
            {/* PLANE 2: wordmark (mid). Translate-only: never distorts. */}
            <span className="hero-par-word block w-[58%] max-w-[300px] md:w-[46%] md:max-w-[640px]">
              <Image
                src="/images/black_signature.gif"
                alt="Sarah Graves"
                width={2914}
                height={662}
                priority
                unoptimized
                className="block h-auto w-full dark:invert"
              />
            </span>
            {/* Contact does NOT parallax */}
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('contact')
                if (el) el.scrollIntoView({ behavior: 'instant' as ScrollBehavior })
                history.replaceState(null, '', '#contact')
              }}
              className="hero-cta mt-8 inline-flex items-center justify-center rounded-full px-12 py-5 text-xl font-medium"
            >
              Contact
            </button>
          </div>

          {/* PLANE 3: front cutout (closest, leads the page). Feather-masked
              around Sarah so the rough matte's opaque rectangle never occludes
              the wordmark with invisible wall; drift-synced with the back
              plane; night grades replicated inside so the plane matches the
              scene at rest. */}
          <div
            aria-hidden
            className="hero-par-front pointer-events-none absolute inset-0 z-20"
            style={{
              maskImage: 'linear-gradient(to right, transparent 40%, #000 47%, #000 82%, transparent 92%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 40%, #000 47%, #000 82%, transparent 92%)',
            }}
          >
            <div className="hero-drift absolute inset-0">
              <Image
                src="/images/front-hero-sarah-graves.png"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover dark:brightness-[.85] dark:saturate-[1.06]"
                style={{ objectPosition: '74% 32%' }}
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 transition-opacity duration-[600ms] dark:opacity-100"
                style={{
                  background:
                    'linear-gradient(to right, rgba(16,13,10,0.78) 0%, rgba(16,13,10,0.42) 30%, transparent 56%), linear-gradient(to top, rgba(14,12,10,0.6) 0%, transparent 26%)',
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 transition-opacity duration-[600ms] dark:opacity-100"
                style={{
                  background: 'radial-gradient(ellipse 46% 72% at 68% 48%, rgba(255,158,66,0.38), transparent 64%)',
                  mixBlendMode: 'screen',
                }}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Structured data for search engines */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

      {/* Hero → (identity hidden) → Newsletter → Selected Work → Press → Contact → Footer */}
      {showIdentitySection && <VerbIntro />}
      <NewsletterSection />
      <WorkRail />
      <PressSection />

      <Section className="!pt-0">
        <ContactBand />
      </Section>
      <Footer />
    </main>
  )
}
