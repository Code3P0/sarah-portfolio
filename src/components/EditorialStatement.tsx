import Section from '@/components/Section'
import ScrollReveal from '@/components/ScrollReveal'

/**
 * Small rounded-rectangle image placeholder that sits inline within the
 * sentence like a typographic glyph — ~1em tall, 1.6em wide, 8px radius,
 * baseline-centered. Swap in the real photo later at the same dimensions.
 */
function Glyph({ alt }: { alt: string }) {
  return (
    <span
      role="img"
      aria-label={alt}
      className="mx-[0.15em] inline-block"
      style={{
        width: '1.6em',
        height: '1em',
        borderRadius: '8px',
        verticalAlign: '-0.14em',
        background: 'var(--canvas-raised)',
        border: '1px solid var(--line)',
        boxShadow: 'inset 0 0 0 100px color-mix(in srgb, var(--ink-muted) 6%, transparent)',
      }}
    />
  )
}

export default function EditorialStatement() {
  return (
    <Section>
      <ScrollReveal>
        {/* nowrap groups keep each glyph attached to its following word so it
            never orphans onto its own line */}
        <p
          className="max-w-[16ch] font-serif font-normal sm:max-w-none"
          style={{ fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1.12, color: 'var(--ink)' }}
        >
          I am{' '}
          <span className="whitespace-nowrap">
            <Glyph alt="Sarah playing guard for Texas" /> a
          </span>{' '}
          guard at Texas,{' '}
          <span className="whitespace-nowrap">
            <Glyph alt="Sarah as an MBA student at McCombs" /> an
          </span>{' '}
          MBA student, and an artist. I create{' '}
          <span className="whitespace-nowrap">
            <Glyph alt="A still from Sarah's film work" /> film
          </span>{' '}
          and writing. I build in sports, media, and AI.
        </p>
      </ScrollReveal>
    </Section>
  )
}
