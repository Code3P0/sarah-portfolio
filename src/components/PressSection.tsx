import Section from '@/components/Section'
import ScrollReveal from '@/components/ScrollReveal'
import ImageFrame from '@/components/ImageFrame'
import { pressArticles, type PressArticle } from '@/data/press'

function PressCard({ a }: { a: PressArticle }) {
  const hasImage = !!a.image
  return (
    <a
      href={a.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-lift group relative block overflow-hidden rounded-[24px] border"
      style={{ aspectRatio: '3 / 4', background: 'var(--canvas-raised)', borderColor: 'var(--line)' }}
    >
      {hasImage && (
        <>
          <ImageFrame
            src={a.image as string}
            alt={`${a.outlet}: Sarah Graves — ${a.headline}`}
            className="absolute inset-0 h-full w-full"
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
          />
          {/* Scrim behind the text for legibility */}
          <div
            className="absolute inset-0 z-[2]"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.15) 45%, transparent 70%)' }}
          />
        </>
      )}
      <div className="absolute inset-0 z-[3] flex flex-col p-5">
        <p className="type-caption" style={{ color: hasImage ? 'rgba(255,255,255,0.85)' : 'var(--ink-muted)' }}>
          {a.outlet}
        </p>
        <p className="font-serif text-lg leading-snug mt-2" style={{ color: hasImage ? '#F5F5F3' : 'var(--ink)' }}>
          {a.headline}
        </p>
        <span className="mt-auto pt-4 type-body" style={{ color: 'var(--accent)' }}>
          Read <span className="inline-block transition-transform duration-150 group-hover:translate-x-0.5">→</span>
        </span>
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
        {/* 4-up desktop, 2-up tablet, 1-up mobile; 1-3 center in the row */}
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
