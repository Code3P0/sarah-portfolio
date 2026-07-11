import Link from 'next/link'
import Section from '@/components/Section'
import ScrollReveal from '@/components/ScrollReveal'
import Placeholder from '@/components/Placeholder'
import ImageFrame from '@/components/ImageFrame'
import { domainList, domainPhotos, type Domain } from '@/data/projects'

type Work = Domain
const work: Work[] = domainList

const cardStyle = { background: 'var(--canvas-raised)', borderColor: 'var(--line)' }

// Gold arrow that nudges right on card hover
function Arrow() {
  return <span className="inline-block transition-transform duration-150 group-hover:translate-x-0.5">→</span>
}

// Full-width featured project (media left, text right on desktop)
function FeaturedCard({ item }: { item: Work }) {
  return (
    <Link
      href={`/projects/${item.slug}`}
      className="work-card group flex flex-col gap-4 rounded-[24px] border p-4 md:col-span-2 md:flex-row md:gap-6"
      style={cardStyle}
    >
      <div className="md:w-[60%]">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[12px]">
          <ImageFrame
            src={domainPhotos[item.slug].src}
            alt=""
            className="absolute inset-0 h-full w-full"
            objectPosition={domainPhotos[item.slug].objectPosition}
            sizes="(max-width: 768px) 92vw, 660px"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center md:w-[40%] md:pr-4">
        <h3 className="type-h2">{item.title}</h3>
        <p className="type-body mt-3" style={{ color: 'var(--ink-muted)' }}>
          {item.descriptor}
        </p>
        <span className="type-body mt-6" style={{ color: 'var(--accent)' }}>
          View <Arrow />
        </span>
      </div>
    </Link>
  )
}

function WorkCard({ item }: { item: Work }) {
  return (
    <Link href={`/projects/${item.slug}`} className="work-card group flex flex-col rounded-[24px] border p-4" style={cardStyle}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[12px]">
        <ImageFrame
          src={domainPhotos[item.slug].src}
          alt=""
          className="absolute inset-0 h-full w-full"
          objectPosition={domainPhotos[item.slug].objectPosition}
          sizes="(max-width: 768px) 92vw, 540px"
        />
      </div>
      <h3 className="type-h3 mt-5">{item.title}</h3>
      <p className="type-body mt-2 flex-1" style={{ color: 'var(--ink-muted)' }}>
        {item.descriptor}
      </p>
      <span className="type-body mt-6" style={{ color: 'var(--accent)' }}>
        View <Arrow />
      </span>
    </Link>
  )
}

export default function WorkRail() {
  const [featured, ...rest] = work
  return (
    <Section id="work" className="scroll-mt-28">
      <ScrollReveal>
        <p className="type-caption mb-8">Selected Work</p>
      </ScrollReveal>
      <ScrollReveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FeaturedCard item={featured} />
          {rest.map((item) => (
            <WorkCard key={item.slug} item={item} />
          ))}
          {/* More in progress — placeholder, no destination, so no arrow */}
          <div className="flex flex-col rounded-[24px] border p-4" style={cardStyle}>
            <Placeholder ratio="4:3" caption="MORE IN PROGRESS · MCCOMBS 2027" alt="More work in progress" />
            <h3 className="type-h3 mt-5">More in progress</h3>
            <p className="type-body mt-2 flex-1" style={{ color: 'var(--ink-muted)' }}>
              New projects landing through 2027.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </Section>
  )
}
