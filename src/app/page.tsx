'use client'
import Image from 'next/image'
import Footer from '@/components/Footer'
import Section from '@/components/Section'
import ContactBand from '@/components/ContactBand'
import EditorialStatement from '@/components/EditorialStatement'
import VerbIntro from '@/components/VerbIntro'
import NewsletterSection from '@/components/NewsletterSection'
import WorkRail from '@/components/WorkRail'
import PressSection from '@/components/PressSection'

// Prototype toggle — flip to false to restore the previous identity statement.
const useChangingVerbIntro = true

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      {/* HERO. Layered cinematic day/night composition, bottom to top:
          plates (back + front, one drifting wrapper so the rough front matte
          never shears) -> LOCALIZED scrims (left third + floor only; the right
          side of the photo stays at full richness) -> amber edge light (dark
          mode, screen blend = lit, not dimmed) -> wordmark + Contact -> a
          clipped duplicate of the front plate over the wordmark tail so the
          type tucks behind Sarah (type behind subject, subject in front). */}
      <div className="hero-fade p-4 md:p-6">
        <section
          data-hero
          className="relative flex min-h-[86vh] flex-col justify-center overflow-hidden rounded-[24px]"
          style={{ background: 'var(--canvas-raised)' }}
        >
          {/* Plates. In dark the photo sits into the theme via a slight
              brightness pull; warmth and saturation are kept, never veiled. */}
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

          {/* Wordmark + single action */}
          <div className="relative z-10 flex w-full flex-col items-center px-6 md:items-start md:px-0 md:pl-[6%]">
            <Image
              src="/images/signature.png"
              alt="Sarah Graves"
              width={1600}
              height={364}
              priority
              className="block h-auto w-full max-w-[560px] transition-[filter] duration-[600ms] md:w-[min(63%,900px)] md:max-w-none dark:invert"
            />
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

          {/* Depth: duplicate front plate clipped to a band through Sarah's
              torso, drifting in sync (same animation), so the wordmark's tail
              sits behind her. Desktop only; decorative. */}
          <div
            aria-hidden
            className="hero-drift pointer-events-none absolute inset-0 z-20 hidden md:block"
            style={{
              // Feathered band (not a hard clip): edges dissolve over ~4-5% so
              // no seam can render even where the rough matte double-composites.
              maskImage:
                'linear-gradient(to right, transparent 57%, #000 62%, #000 68%, transparent 73%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 57%, #000 62%, #000 68%, transparent 73%)',
            }}
          >
            {/* brightness on the IMAGE only (not the scrims) so the compositing
                order matches the scene below exactly: (image x .85) -> scrims */}
            <Image
              src="/images/front-hero-sarah-graves.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover dark:brightness-[.85] dark:saturate-[1.06]"
              style={{ objectPosition: '74% 32%' }}
            />
            {/* Same night treatments inside the band (identical geometry,
                clipped by the parent) so the band grades exactly like the
                scene below it: no seam at the clip edges. */}
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
        </section>
      </div>

      {/* Intro (prototype toggle) → Newsletter → Selected Work → Press → Contact → Footer */}
      {useChangingVerbIntro ? <VerbIntro /> : <EditorialStatement />}
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
