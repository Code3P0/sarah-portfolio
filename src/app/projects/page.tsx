import Link from 'next/link'
import Footer from '@/components/Footer'
import Section from '@/components/Section'
import ScrollReveal from '@/components/ScrollReveal'
import Placeholder from '@/components/Placeholder'
import { domainList } from '@/data/projects'

export default function ProjectsPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--canvas)' }}>
      <Section as="header" className="!pb-0" containerClassName="pt-16 text-center">
        <h1 className="type-h1">Projects</h1>
        <p className="type-body mx-auto mt-4 max-w-[520px]" style={{ color: 'var(--ink-muted)' }}>
          Four domains I work across — strategy, data, media, and writing.
        </p>
      </Section>

      <Section>
        <ScrollReveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {domainList.map((d) => (
              <Link
                key={d.slug}
                href={`/projects/${d.slug}`}
                className="work-card group flex flex-col rounded-[24px] border p-4"
                style={{ background: 'var(--canvas-raised)', borderColor: 'var(--line)' }}
              >
                {/* Domains, not photo subjects — a clean tonal field + the tag */}
                <Placeholder ratio="4:3" caption={d.tag} mark={false} alt="" className="!rounded-[12px]" />
                <h2 className="type-h3 mt-5">{d.title}</h2>
                <p className="type-body mt-2 flex-1" style={{ color: 'var(--ink-muted)' }}>
                  {d.descriptor}
                </p>
                <span className="type-body mt-6" style={{ color: 'var(--accent)' }}>
                  View <span className="inline-block transition-transform duration-150 group-hover:translate-x-0.5">→</span>
                </span>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      <Footer />
    </main>
  )
}
