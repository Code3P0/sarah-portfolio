import Link from 'next/link'
import Footer from '@/components/Footer'
import Section from '@/components/Section'
import ScrollReveal from '@/components/ScrollReveal'
import ImageFrame from '@/components/ImageFrame'
import Placeholder from '@/components/Placeholder'
import type { Domain, ProjectEntry } from '@/data/projects'

function EntryMedia({ entry }: { entry: ProjectEntry }) {
  if (!entry.image) {
    return <Placeholder ratio="4:3" caption="CASE STUDY · IN PROGRESS" mark={false} alt={`${entry.title}, case study in progress`} />
  }
  return (
    <div
      className="relative aspect-[4/3] overflow-hidden rounded-[24px] border"
      style={{ background: 'var(--canvas-raised)', borderColor: 'var(--line)' }}
    >
      <ImageFrame
        src={entry.image}
        alt={`Sarah Graves, ${entry.title}`}
        className="absolute inset-0 h-full w-full"
        sizes="(max-width: 768px) 90vw, 45vw"
      />
    </div>
  )
}

function Entry({ entry, flip }: { entry: ProjectEntry; flip: boolean }) {
  return (
    <Section>
      <ScrollReveal>
        <div className={`flex flex-col gap-8 md:flex-row md:items-center md:gap-14 ${flip ? 'md:flex-row-reverse' : ''}`}>
          <div className="md:w-1/2">
            <EntryMedia entry={entry} />
          </div>
          <div className="md:w-1/2">
            <p className="type-caption">
              {entry.role} · {entry.year} · {entry.context}
            </p>
            <h2 className="type-h2 mt-3">{entry.title}</h2>
            <p className="type-body mt-3" style={{ color: 'var(--ink-muted)' }}>
              {entry.summary}
            </p>
            <p className="type-body mt-6">{entry.body}</p>
            {entry.url && (
              <Link
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-accent mt-6 inline-block type-body"
                style={{ color: 'var(--accent)' }}
              >
                View →
              </Link>
            )}
          </div>
        </div>
      </ScrollReveal>
    </Section>
  )
}

/**
 * Shared layout for every project domain route. Header (title + descriptor +
 * back link) followed by a vertically stacked, image-alternating list of
 * entries rendered straight from data — identical structure across domains.
 */
export default function ProjectDetail({ domain }: { domain: Domain }) {
  return (
    <main className="min-h-screen" style={{ background: 'var(--canvas)' }}>
      <Section className="!pb-0" containerClassName="pt-16">
        <Link href="/projects" className="link-accent type-caption">
          ← Projects
        </Link>
        <h1 className="type-h1 mt-6">{domain.title}</h1>
        <p className="type-body mt-4 max-w-[560px]" style={{ color: 'var(--ink-muted)' }}>
          {domain.descriptor}
        </p>
      </Section>

      {domain.entries.map((entry, i) => (
        <Entry key={i} entry={entry} flip={i % 2 === 1} />
      ))}

      <Footer />
    </main>
  )
}
