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

          {/* Bio content — right column */}
          <div className="md:flex-1 md:pt-2">
            <h1 className="type-h1">About</h1>

            <div className="mt-8 max-w-[560px] space-y-6">
              <p className="type-body">
                I&apos;m a guard on the Texas Women&apos;s Basketball team and a finance major at McCombs. Off the court, I build things at the intersection of sports, media, and technology.
              </p>
              <p className="type-body">
                I sit on the BOSI advisory board alongside Kevin Durant, Rich Kleiman, and Kirk Goldsberry. Last summer I interned at RedBird Capital in New York.
              </p>
              <p className="type-body">
                Currently building Path, a career discovery app for students who want to work in sports.
              </p>
            </div>

            {/* Background */}
            <div className="mt-12">
              <p className="type-caption mb-4">Background</p>
              <ul className="space-y-3">
                {background.map((item) => (
                  <li key={item.org} className="type-body">
                    <span className="font-medium">{item.org}</span>
                    <span style={{ color: 'var(--ink-muted)' }}> — {item.detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What I'm Into */}
            <div className="mt-12">
              <p className="type-caption mb-4">What I&apos;m Into</p>
              <ul className="space-y-2">
                {interests.map((item) => (
                  <li key={item} className="type-body">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Resume — secondary button, left-aligned with the text column */}
            <div className="mt-12">
              <Button href="/resume.pdf" variant="secondary">
                Download Resume (PDF) ↓
              </Button>
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
