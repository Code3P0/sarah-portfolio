'use client'
import Link from 'next/link'
import Footer from '@/components/Footer'
import Section from '@/components/Section'
import Placeholder from '@/components/Placeholder'
import ContactBand from '@/components/ContactBand'
import SignatureField from '@/components/SignatureField'

interface Project {
  id: string
  title: string
  description: string
  caption: string
  /** Anchor or stub route for the project. When absent, the card renders
   *  without a "View project" arrow and is not clickable (no dead affordance). */
  href?: string
  external?: boolean
}

const projects: Project[] = [
  {
    id: 'path',
    title: 'Path',
    description: 'Swipe-based career discovery app for students interested in sports industry careers',
    caption: 'PRODUCT',
  },
  {
    id: 'operators-lens',
    title: "The Operator's Lens",
    description: 'Content framework exploring sports business through market analysis',
    caption: 'WRITING',
  },
  {
    id: 'bosi',
    title: 'BOSI Initiatives',
    description: 'Building systematic internship access for student-athletes',
    caption: 'PROGRAM',
  },
  {
    id: 'noah',
    title: 'NOAH Analytics',
    description: 'Shooting analytics and data visualization projects',
    caption: 'ANALYTICS',
  },
]

function ProjectCard({ project }: { project: Project }) {
  const inner = (
    <>
      <Placeholder ratio="4:3" caption={project.caption} className="!rounded-[12px]" />
      <h2 className="type-h3 mt-5">{project.title}</h2>
      <p className="type-body mt-2 flex-1" style={{ color: 'var(--ink-muted)' }}>
        {project.description}
      </p>
      {project.href && (
        <span className="type-body mt-6" style={{ color: 'var(--accent)' }}>
          View project →
        </span>
      )}
    </>
  )

  const base = 'flex scroll-mt-28 flex-col rounded-[24px] border p-4'
  const style = { background: 'var(--canvas-raised)', borderColor: 'var(--line)' }

  // A card is only interactive (link + lift) when it has a real destination.
  if (project.href) {
    return (
      <Link
        id={project.id}
        href={project.href}
        target={project.external ? '_blank' : undefined}
        rel={project.external ? 'noopener noreferrer' : undefined}
        className={`card-lift ${base}`}
        style={style}
      >
        {inner}
      </Link>
    )
  }

  return (
    <div id={project.id} className={base} style={style}>
      {inner}
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden" style={{ background: 'var(--canvas)' }}>
      {/* Header */}
      <Section as="header" className="!pb-0" containerClassName="pt-16 text-center">
        <h1 className="type-h1">Projects</h1>
      </Section>

      {/* Project grid — the site's one signature moment (gold aura + sparkles) */}
      <Section>
        <SignatureField>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </SignatureField>
      </Section>

      {/* Contact */}
      <Section className="!pt-0">
        <ContactBand />
      </Section>

      <Footer />
    </main>
  )
}
