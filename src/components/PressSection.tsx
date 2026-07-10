import Section from '@/components/Section'
import ScrollReveal from '@/components/ScrollReveal'
import Placeholder from '@/components/Placeholder'
import Rail from '@/components/Rail'
import { pressArticles, pressLogos, type PressArticle } from '@/data/press'

function formatDate(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function ArticleCard({ a }: { a: PressArticle }) {
  return (
    <a
      href={a.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-lift flex h-full flex-col rounded-[24px] border p-5"
      style={{ background: 'var(--canvas-raised)', borderColor: 'var(--line)' }}
    >
      <span className="type-caption">{a.outlet}</span>
      <h3 className="type-h3 mt-3 flex-1">{a.headline}</h3>
      <div className="mt-5 flex items-center justify-between">
        <span className="type-caption">{formatDate(a.date)}</span>
        <span style={{ color: 'var(--accent)' }}>↗</span>
      </div>
    </a>
  )
}

export default function PressSection() {
  // Article rail items — show a single placeholder card while none exist yet.
  const items =
    pressArticles.length > 0
      ? pressArticles.map((a, i) => <ArticleCard key={i} a={a} />)
      : [
          <div
            key="ph"
            className="flex h-full flex-col rounded-[24px] border p-5"
            style={{ background: 'var(--canvas-raised)', borderColor: 'var(--line)' }}
          >
            <Placeholder ratio="16:9" caption="IN THE PRESS · 2026" alt="Press coverage placeholder" className="!rounded-[12px]" mark={false} />
            <h3 className="type-h3 mt-4 flex-1">Coverage lands here</h3>
            <span className="type-caption mt-4">Sarah Graves</span>
          </div>,
        ]

  return (
    <Section>
      <ScrollReveal>
        <p className="type-caption mb-8">Press</p>
      </ScrollReveal>

      {/* Logo capsule — renders nothing until logos are populated */}
      {pressLogos.length > 0 && (
        <ScrollReveal>
          <div
            className="mx-auto mb-12 flex max-w-[720px] flex-wrap items-center justify-center gap-x-10 gap-y-4 rounded-full border px-8 py-4"
            style={{ borderColor: 'var(--line)' }}
          >
            {pressLogos.map((logo) =>
              logo.src ? (
                <img
                  key={logo.name}
                  src={logo.src}
                  alt={logo.name}
                  className="h-5 w-auto opacity-60"
                  style={{ filter: 'grayscale(1)' }}
                />
              ) : (
                <span key={logo.name} className="type-caption opacity-60">
                  {logo.name}
                </span>
              )
            )}
          </div>
        </ScrollReveal>
      )}

      <ScrollReveal>
        <Rail
          items={items}
          ariaLabel="Press articles"
          itemClassName="w-[min(340px,82vw)]"
          viewportClassName="max-w-[460px]"
        />
      </ScrollReveal>
    </Section>
  )
}
