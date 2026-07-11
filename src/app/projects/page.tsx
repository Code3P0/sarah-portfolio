import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import Section from '@/components/Section'
import ScrollReveal from '@/components/ScrollReveal'
import FilmBanner from '@/components/FilmBanner'
import { domainList, domainPhotos } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected work across strategy, data, media, and writing.',
  alternates: { canonical: '/projects' },
}

// Distinct subtle tonal field per card, derived from the warm palette; both
// modes inherit via --canvas-raised.
const tints = [
  'color-mix(in srgb, var(--canvas-raised) 88%, #C9A227 12%)',
  'color-mix(in srgb, var(--canvas-raised) 90%, #BF5700 10%)',
  'color-mix(in srgb, var(--canvas-raised) 91%, #8A6D3B 9%)',
  'color-mix(in srgb, var(--canvas-raised) 92%, #4A3F35 8%)',
]

export default function ProjectsPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--canvas)' }}>
      <Section as="header" className="!pb-0" containerClassName="pt-16 text-center">
        <h1 className="type-h1">Projects</h1>
      </Section>

      {/* Cinematic film strip; poster + caption until a URL exists. Pulled
          tight to the header and the card grid (tighter than Section rhythm)
          so the page reads header / film / work as one composition. */}
      <Section className="!py-0" containerClassName="pt-10 md:pt-12">
        <ScrollReveal media>
          <FilmBanner />
        </ScrollReveal>
      </Section>

      {/* Four domains as designed typographic covers */}
      <Section className="!pt-0" containerClassName="pt-10 md:pt-12">
        <ScrollReveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {domainList.map((d, i) => (
              <Link
                key={d.slug}
                href={`/projects/${d.slug}`}
                className="work-card group relative flex min-h-[300px] flex-col overflow-hidden rounded-[24px] border p-6 md:min-h-[360px]"
                style={{ background: tints[i], borderColor: 'var(--line)' }}
              >
                {/* correlating photo (shared domainPhotos map), hidden at rest,
                    revealed at low opacity on hover/focus under the typography */}
                <div aria-hidden className="work-card-photo pointer-events-none absolute inset-0">
                  <Image
                    src={domainPhotos[d.slug].src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: domainPhotos[d.slug].objectPosition }}
                  />
                </div>

                {/* index + entry count */}
                <div className="relative flex items-start justify-between">
                  <span className="type-caption">0{i + 1}</span>
                  <span className="type-caption">
                    {d.entries.length} {d.entries.length === 1 ? 'study' : 'studies'}
                  </span>
                </div>

                {/* the domain word as the card's graphic; bleeds off the right edge */}
                <div
                  aria-hidden
                  className="pointer-events-none select-none absolute -right-3 top-14 whitespace-nowrap font-serif font-normal leading-none md:-right-4 md:top-16"
                  style={{ fontSize: 'clamp(64px, 10vw, 112px)', color: 'var(--ink)', opacity: 0.92 }}
                >
                  {d.word}
                </div>

                {/* base block: descriptor + two-line action pattern */}
                <div className="relative z-10 mt-auto">
                  <p className="type-body max-w-[75%]" style={{ color: 'var(--ink-muted)' }}>
                    {d.descriptor}
                  </p>
                  <p className="type-caption mt-6">{d.title}</p>
                  <p className="type-body mt-1" style={{ color: 'var(--ink)' }}>
                    Inside the work{' '}
                    <span className="inline-block transition-transform duration-150 group-hover:translate-x-0.5" style={{ color: 'var(--accent)' }}>
                      →
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      <Footer />
    </main>
  )
}
