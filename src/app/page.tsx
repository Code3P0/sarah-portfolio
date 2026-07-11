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
      {/* HERO — layered cinematic day/night composition:
          back plate → front cutout → theme treatment → grain → wordmark → Contact.
          Both plates share one drifting wrapper so the (rough) front matte can
          never shear against the background; the treatment sits above both,
          grading them uniformly and doubling as light-wrap around the cutout. */}
      <div className="hero-fade p-4 md:p-6">
        <section
          data-hero
          className="relative flex min-h-[86vh] flex-col justify-center overflow-hidden rounded-[24px]"
          style={{ background: 'var(--canvas-raised)' }}
        >
          {/* Plates — identical 2560x1440 sources, identical positioning */}
          <div className="hero-drift absolute inset-0">
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

          {/* Night treatment — espresso grade + localized amber along Sarah's edge */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[600ms] dark:opacity-100"
            style={{
              background:
                'radial-gradient(ellipse 52% 78% at 76% 52%, rgba(255,158,66,0.30), transparent 62%), linear-gradient(to right, rgba(12,11,10,0.82) 0%, rgba(12,11,10,0.55) 46%, rgba(12,11,10,0.30) 100%)',
            }}
          />
          {/* Day treatment — quiet lift for the wordmark, same world in daylight */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-[600ms] dark:opacity-0"
            style={{
              background:
                'linear-gradient(to right, rgba(245,245,243,0.34) 0%, rgba(245,245,243,0.12) 45%, transparent 75%)',
            }}
          />

          {/* Moving film grain — atmosphere; static under reduced motion */}
          <div aria-hidden className="hero-grain pointer-events-none absolute inset-0" />

          {/* Wordmark + single action */}
          <div className="relative z-10 flex w-full flex-col items-center px-6 md:items-start md:pl-[6%]">
            <div className="w-full max-w-2xl lg:max-w-3xl">
              <img src="/images/black_signature.gif" alt="Sarah Graves" className="block w-full transition-[filter] duration-[600ms] dark:invert" />
            </div>
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
