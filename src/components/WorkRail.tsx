import Link from 'next/link'
import Section from '@/components/Section'
import ScrollReveal from '@/components/ScrollReveal'
import Placeholder from '@/components/Placeholder'
import Rail from '@/components/Rail'

const work = [
  {
    id: 'operators-lens',
    title: "The Operator's Lens",
    caption: 'WRITING',
    desc: 'Content framework exploring sports business through market analysis',
  },
  {
    id: 'path',
    title: 'Path',
    caption: 'PRODUCT',
    desc: 'Swipe-based career discovery app for students in sports',
  },
  {
    id: 'bosi',
    title: 'BOSI Initiatives',
    caption: 'PROGRAM',
    desc: 'Systematic internship access for student-athletes',
  },
  {
    id: 'noah',
    title: 'NOAH Analytics',
    caption: 'ANALYTICS',
    desc: 'Shooting analytics and data visualization',
  },
]

const cardBase = 'flex h-full flex-col rounded-[24px] border p-4'
const cardStyle = { background: 'var(--canvas-raised)', borderColor: 'var(--line)' }

function WorkCard({ item }: { item: (typeof work)[number] }) {
  return (
    <Link href={`/projects#${item.id}`} className={`card-lift ${cardBase}`} style={cardStyle}>
      <Placeholder ratio="4:3" caption={item.caption} alt={`${item.title} preview`} className="!rounded-[12px]" />
      <h3 className="type-h3 mt-5">{item.title}</h3>
      <p className="type-body mt-2 flex-1" style={{ color: 'var(--ink-muted)' }}>
        {item.desc}
      </p>
      <span className="type-body mt-6" style={{ color: 'var(--accent)' }}>
        View →
      </span>
    </Link>
  )
}

export default function WorkRail() {
  const items = [
    ...work.map((item) => <WorkCard key={item.id} item={item} />),
    // Final placeholder card — no destination, so no arrow.
    <div key="more" className={cardBase} style={cardStyle}>
      <Placeholder ratio="4:3" caption="MORE IN PROGRESS · MCCOMBS 2027" alt="More work in progress" />
      <h3 className="type-h3 mt-5">More in progress</h3>
      <p className="type-body mt-2 flex-1" style={{ color: 'var(--ink-muted)' }}>
        New projects landing through 2027.
      </p>
    </div>,
  ]

  return (
    <Section>
      <ScrollReveal>
        <p className="type-caption mb-8">Selected Work</p>
      </ScrollReveal>
      <ScrollReveal>
        <Rail items={items} ariaLabel="Selected work" loop />
      </ScrollReveal>
    </Section>
  )
}
