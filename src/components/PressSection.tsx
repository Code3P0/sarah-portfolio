import Section from '@/components/Section'
import ScrollReveal from '@/components/ScrollReveal'
import { pressArticles, type PressArticle } from '@/data/press'

function PressCard({ a }: { a: PressArticle }) {
  const hasImage = !!a.image
  return (
    <a
      href={a.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-lift group relative flex overflow-hidden rounded-[24px] border"
      style={{ aspectRatio: '3 / 4', background: 'var(--canvas-raised)', borderColor: 'var(--line)' }}
    >
      {hasImage && <img src={a.image} alt="" className="absolute inset-0 h-full w-full object-cover" />}
      {hasImage && (
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 55%)' }} />
      )}
      <div className="relative z-10 p-5">
        <p className="type-caption" style={{ color: hasImage ? 'rgba(255,255,255,0.82)' : 'var(--ink-muted)' }}>
          {a.outlet}
        </p>
        <p className="type-body mt-2" style={{ color: hasImage ? '#F5F5F3' : 'var(--ink)' }}>
          {a.headline}{' '}
          <span className="whitespace-nowrap" style={{ color: 'var(--accent)' }}>
            Read <span className="inline-block transition-transform duration-150 group-hover:translate-x-0.5">→</span>
          </span>
        </p>
      </div>
    </a>
  )
}

export default function PressSection() {
  // Section does not render at all when there are no articles.
  if (pressArticles.length === 0) return null

  return (
    <Section>
      <ScrollReveal>
        <p className="type-caption mb-8">Press</p>
      </ScrollReveal>
      <ScrollReveal>
        {/* flex-wrap + justify-center: 4-up on desktop, 2-up tablet, 1-up mobile;
            1-3 articles center in the row at the same card size */}
        <div className="flex flex-wrap justify-center gap-6">
          {pressArticles.map((a, i) => (
            <div key={i} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
              <PressCard a={a} />
            </div>
          ))}
        </div>
      </ScrollReveal>
    </Section>
  )
}
