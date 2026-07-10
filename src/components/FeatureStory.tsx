import Section from '@/components/Section'
import ScrollReveal from '@/components/ScrollReveal'
import VideoSlot from '@/components/VideoSlot'

/**
 * Feature story (the KD interview). Full-width raised band. Title, media, and
 * caption card are locked into ONE coordinated reveal (single opacity + 12px
 * rise — no per-element scale or drift). Title sits above the media as a clean
 * editorial heading with a thin rule (no dark gradient bar). The caption card
 * overlaps the media's lower-right on desktop and tucks below on mobile.
 */
export default function FeatureStory() {
  return (
    <Section className="bg-[var(--canvas-raised)]">
      <ScrollReveal rise={12}>
        <div className="md:w-[62%]">
          <h2 className="type-h2">In conversation</h2>
          <span className="mb-8 mt-3 block h-px w-24" style={{ background: 'var(--line)' }} />

          <div className="relative">
            <VideoSlot ratio="4:5" alt="In conversation — interview in production" />

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
        </div>
      </ScrollReveal>
    </Section>
  )
}
