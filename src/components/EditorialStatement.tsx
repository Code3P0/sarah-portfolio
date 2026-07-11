import Link from 'next/link'
import Section from '@/components/Section'
import ScrollReveal from '@/components/ScrollReveal'
import ImageFrame from '@/components/ImageFrame'

/**
 * Inline photo glyph that sits in the sentence like type (1.6em x 1em, 8px
 * radius) and grows dramatically when its parent link is hovered/focused —
 * the layout slot stays fixed (transform-only, no reflow). See .glyph-* in
 * globals.css.
 */
function Glyph({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="glyph-slot mx-[0.15em]">
      <span className="glyph-scale">
        <ImageFrame src={src} alt={alt} className="block h-full w-full" sizes="220px" />
      </span>
    </span>
  )
}

/**
 * Identity statement — one large serif sentence where each identity is a live
 * link: MBA student (LinkedIn) and basketball (the original court photo's
 * post) grow their inline photos on hover; "building" goes straight to the
 * four project domains.
 */
export default function EditorialStatement() {
  return (
    <Section>
      <ScrollReveal>
        <p
          className="max-w-[18ch] font-serif font-normal sm:max-w-none"
          style={{ fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1.16, color: 'var(--ink)' }}
        >
          I am an{' '}
          <a
            href="https://www.linkedin.com/in/sarahkgraves/"
            target="_blank"
            rel="noopener noreferrer"
            className="glyph-link link-accent whitespace-nowrap"
          >
            <Glyph src="/images/sarah-graves-speaking.jpg" alt="Sarah Graves speaking on a panel at Texas McCombs" />{' '}
            MBA student
          </a>{' '}
          <span className="whitespace-normal">playing</span>{' '}
          <a
            href="https://x.com/TexasWBB/status/2035903853816664282?s=20"
            target="_blank"
            rel="noopener noreferrer"
            className="glyph-link link-accent whitespace-nowrap"
          >
            <Glyph src="/images/sarah-graves-bball.jpg" alt="Sarah Graves celebrating on court for Texas Women's Basketball" />{' '}
            basketball
          </a>{' '}
          and{' '}
          <Link href="/projects" className="link-accent whitespace-nowrap">
            building
          </Link>
          .
        </p>
      </ScrollReveal>
    </Section>
  )
}
