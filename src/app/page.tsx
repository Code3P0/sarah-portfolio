'use client'
import Image from 'next/image'
import Footer from '@/components/Footer'
import Section from '@/components/Section'
import ContactBand from '@/components/ContactBand'
import EditorialStatement from '@/components/EditorialStatement'
import WorkRail from '@/components/WorkRail'
import PressSection from '@/components/PressSection'

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      {/* HERO — layered: photo → scrim → drifting clouds → wordmark → Contact */}
      <div className="hero-fade p-4 md:p-6">
        <section
          data-hero
          className="relative flex min-h-[84vh] flex-col items-center justify-center overflow-hidden rounded-[24px]"
        >
          {/* (a) hero photo — object-position biased right to keep Sarah framed */}
          <Image
            src="/images/sarah-graves-hero.jpg"
            alt="Sarah Graves, Texas Women's Basketball guard, standing courtside at the Moody Center in Austin"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: '70% 35%' }}
          />

          {/* (b) scrim — only as strong as needed for the white wordmark */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(10,10,12,0.42) 0%, rgba(10,10,12,0.26) 45%, rgba(10,10,12,0.5) 100%)' }}
          />

          {/* (c) drifting clouds as atmosphere (freeze under reduced-motion via the global rule) */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <img src="/images/cloud1.png" alt="" className="absolute w-[560px] animate-cloud-drift md:w-[820px]" style={{ top: '-6%', left: '-12%', opacity: 0.5, animationDuration: '52s' }} />
            <img src="/images/cloud2.png" alt="" className="absolute w-[520px] animate-cloud-drift-2 md:w-[760px]" style={{ top: '28%', right: '-14%', opacity: 0.42, animationDuration: '60s', animationDelay: '-10s' }} />
            <img src="/images/cloud3.png" alt="" className="absolute w-[440px] animate-cloud-drift-3 md:w-[640px]" style={{ top: '6%', right: '18%', opacity: 0.4, animationDuration: '46s', animationDelay: '-18s' }} />
            <img src="/images/cloud4.png" alt="" className="absolute w-[480px] animate-cloud-drift-4 md:w-[680px]" style={{ bottom: '-8%', left: '18%', opacity: 0.36, animationDuration: '56s', animationDelay: '-30s' }} />
          </div>

          {/* (d) wordmark — white over the photo in both modes (inverted black signature) */}
          <div className="relative z-10 w-full max-w-4xl px-6">
            <img src="/images/black_signature.gif" alt="Sarah Graves" className="mx-auto block w-full invert" />
          </div>

          {/* (e) one action */}
          <div className="relative z-10 mt-10">
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
      </div>

      {/* Editorial statement → Selected Work → Press → Contact → Footer */}
      <EditorialStatement />
      <WorkRail />
      <PressSection />

      <Section className="!pt-0">
        <ContactBand />
      </Section>
      <Footer />
    </main>
  )
}
