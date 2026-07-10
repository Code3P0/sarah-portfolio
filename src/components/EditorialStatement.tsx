import Section from '@/components/Section'
import ScrollReveal from '@/components/ScrollReveal'
import ImageFrame from '@/components/ImageFrame'

/**
 * A photo set inline within the sentence like a typographic glyph — ~1em tall,
 * 1.6em wide, 8px radius, baseline-aligned. Graded/animated like all site
 * photography via ImageFrame.
 */
function Glyph({ src, alt }: { src: string; alt: string }) {
  return (
    <ImageFrame
      src={src}
      alt={alt}
      className="mx-[0.15em] inline-block h-[1em] w-[1.6em] rounded-[8px] align-[-0.14em]"
      sizes="80px"
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
            <Glyph src="/images/sarah-graves-bball.jpg" alt="Sarah Graves, Texas Women's Basketball guard, on the court" /> a
          </span>{' '}
          guard at Texas,{' '}
          <span className="whitespace-nowrap">
            <Glyph src="/images/sarah-graves-speaking.jpg" alt="Sarah Graves speaking at a McCombs event as an MBA student" /> an
          </span>{' '}
          MBA student, and an artist. I create{' '}
          <span className="whitespace-nowrap">
            <Glyph src="/images/sarah-graves-painting.jpg" alt="Sarah Graves with one of her paintings" /> film
          </span>{' '}
          and writing. I build in sports, media, and AI.
        </p>
      </ScrollReveal>
    </Section>
  )
}
