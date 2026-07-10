import Section from '@/components/Section'
import ScrollReveal from '@/components/ScrollReveal'
import VideoSlot from '@/components/VideoSlot'

/**
 * Feature story slot (the KD interview). Full-width raised band. Portrait media
 * card left-of-center on desktop, with an editorial title overlaid across it and
 * a small caption card floating over its lower-right edge. On mobile the media
 * goes full-width and the caption card tucks below.
 */
export default function FeatureStory() {
  return (
    <Section className="bg-[var(--canvas-raised)]">
      <ScrollReveal media>
        <div className="relative md:w-[62%]">
          {/* Media (portrait, video-ready) */}
          <div className="relative">
            <VideoSlot ratio="4:5" alt="In conversation — interview in production" />

            {/* Editorial title overlaid across the media, with a scrim so light
                serif reads over both the placeholder and a future photo */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 rounded-t-[24px] p-6 sm:p-10"
              style={{ background: 'linear-gradient(to bottom, rgba(10,10,12,0.55), transparent)' }}
            >
              <h2 className="font-serif text-4xl font-normal sm:text-5xl" style={{ color: '#F5F5F3' }}>
                In conversation
              </h2>
              <span className="mt-4 block h-px w-24" style={{ background: 'rgba(245,245,243,0.6)' }} />
            </div>
          </div>

          {/* Floating caption card — overlaps lower-right on desktop, tucks
              below on mobile */}
          <div
            className="mt-4 rounded-[24px] border p-5 md:absolute md:-bottom-8 md:-right-10 md:mt-0 md:w-64"
            style={{ background: 'var(--canvas)', borderColor: 'var(--line)' }}
          >
            <p className="type-caption">Interview 001 · In production</p>
            <p className="type-body mt-2" style={{ color: 'var(--ink-muted)' }}>
              A long-form conversation on building in sports, media, and AI.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </Section>
  )
}
