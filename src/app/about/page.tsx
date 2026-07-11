'use client'
import Footer from '@/components/Footer'
import Section from '@/components/Section'
import Button from '@/components/Button'
import VideoSlot from '@/components/VideoSlot'
import ContactBand from '@/components/ContactBand'

const background = [
  { org: "Texas Women's Basketball", detail: 'Guard (2022-present)' },
  { org: 'BOSI Advisory Board', detail: 'Member (2024-present)' },
  { org: 'RedBird Capital', detail: 'Summer Analyst, NYC (2024)' },
  { org: 'McCombs School of Business', detail: 'BBA Finance (May 2026)' },
]

const interests = [
  'Market mapping',
  'Product thinking',
  'Sports media economics',
  'NIL strategy',
  'Building from scratch',
]

export default function AboutPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--canvas)' }}>
      {/* Two-column: constrained portrait video left, bio content right.
          Mobile: video first (height-constrained), text below. */}
      <Section containerClassName="pt-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-14">
          {/* Video — constrained (~65vh) portrait, left column on desktop */}
          <div className="mx-auto w-full max-w-[400px] md:mx-0 md:shrink-0">
            <VideoSlot
              ratio="1080/1544"
              alt="Sarah Graves, Texas Women's Basketball guard, in a portrait video shoot"
              src="/sarah-graves-texas-portrait.mp4"
              srcWebm="/sarah-graves-texas-portrait.webm"
              poster="/sarah-graves-texas-portrait-poster.jpg"
            />
          </div>

          {/* Bio content: one clear editorial column */}
          <div className="md:flex-1 md:pt-2">
            <h1 className="type-h1">About</h1>

            {/* Resume action at the top, before the bio begins */}
            <div className="mt-6">
              <Button href="/resume.pdf" variant="secondary">
                Resume ↓
              </Button>
            </div>

            <div className="mt-10 max-w-[560px] space-y-6">
              <p className="type-body">
                I&apos;m a guard on the Texas Women&apos;s Basketball team and a finance major at McCombs. Off the court, I build things at the intersection of sports, media, and technology.
              </p>
              <p className="type-body">
                I sit on the BOSI advisory board alongside Kevin Durant, Rich Kleiman, and Kirk Goldsberry. Last summer I interned at RedBird Capital in New York.
              </p>
              {/* "Currently building Path" moved to src/data/draft-copy.ts (TODO) */}
            </div>

            {/* Background as a designed index list */}
            <div className="mt-12 max-w-[560px]">
              <p className="type-caption mb-2">Background</p>
              <ul className="divide-y" style={{ borderColor: 'var(--line)' }}>
                {background.map((item) => (
                  <li key={item.org} className="flex flex-wrap items-baseline justify-between gap-x-6 py-3" style={{ borderColor: 'var(--line)' }}>
                    <span className="type-body font-medium">{item.org}</span>
                    <span className="type-body" style={{ color: 'var(--ink-muted)' }}>
                      {item.detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What I'm Into, same index-list language */}
            <div className="mt-12 max-w-[560px]">
              <p className="type-caption mb-2">What I&apos;m Into</p>
              <ul className="divide-y" style={{ borderColor: 'var(--line)' }}>
                {interests.map((item) => (
                  <li key={item} className="type-body py-3" style={{ borderColor: 'var(--line)' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section className="!pt-0">
        <ContactBand />
      </Section>

      <Footer />
    </main>
  )
}
