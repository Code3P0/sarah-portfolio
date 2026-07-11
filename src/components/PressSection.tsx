'use client'

import { useRef } from 'react'
import Section from '@/components/Section'
import ScrollReveal from '@/components/ScrollReveal'
import ImageFrame from '@/components/ImageFrame'
import { pressArticles, type PressArticle } from '@/data/press'

function PressCard({ a }: { a: PressArticle }) {
  return (
    <a
      href={a.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${a.outlet}: ${a.headline}, opens in a new tab`}
      className="press-card group relative block w-[300px] shrink-0 snap-start overflow-hidden rounded-[24px] border sm:w-[320px]"
      style={{ aspectRatio: '3 / 4', background: 'var(--canvas-raised)', borderColor: 'var(--line)' }}
    >
      {a.image && (
        <ImageFrame
          src={a.image}
          alt={`${a.outlet}: Sarah Graves, Texas Women's Basketball guard. ${a.headline}`}
          className="absolute inset-0 h-full w-full"
          objectPosition={a.objectPosition}
          sizes="340px"
        />
      )}
      {/* top scrim so the outlet eyebrow reads on any photo */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-24" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)' }} />
      {/* bottom scrim so the headline never fights the photo or covers a face */}
      <div className="pointer-events-none absolute inset-0 z-[2]" style={{ background: 'linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.66) 100%)' }} />

      <p className="absolute left-5 top-5 z-[3] type-caption" style={{ color: 'rgba(255,255,255,0.9)' }}>
        {a.outlet}
      </p>
      <p className="absolute inset-x-5 bottom-5 z-[3] font-serif text-xl font-normal leading-snug" style={{ color: '#F5F5F3' }}>
        {a.headline}
      </p>
    </a>
  )
}

export default function PressSection() {
  const strip = useRef<HTMLDivElement>(null)
  const drag = useRef({ down: false, x: 0, start: 0, moved: false })

  const step = () => (strip.current?.querySelector<HTMLElement>('.press-card')?.offsetWidth ?? 320) + 24

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      strip.current?.scrollBy({ left: step(), behavior: 'smooth' })
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      strip.current?.scrollBy({ left: -step(), behavior: 'smooth' })
    }
  }
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return
    const el = strip.current
    if (!el) return
    drag.current = { down: true, x: e.clientX, start: el.scrollLeft, moved: false }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.down) return
    const el = strip.current
    if (!el) return
    const dx = e.clientX - drag.current.x
    if (Math.abs(dx) > 4) drag.current.moved = true
    el.scrollLeft = drag.current.start - dx
  }
  const endDrag = () => {
    drag.current.down = false
  }
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      drag.current.moved = false
    }
  }

  if (pressArticles.length === 0) return null

  return (
    <Section>
      <ScrollReveal>
        <p className="type-caption mb-8">Press</p>
      </ScrollReveal>
      <ScrollReveal>
        <div
          ref={strip}
          aria-label="Press coverage of Sarah Graves, scrollable"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={onClickCapture}
          className="press-strip no-scrollbar flex snap-x gap-6 overflow-x-auto rounded-[24px] px-2 py-5 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          style={{ cursor: 'grab', scrollBehavior: 'smooth' }}
        >
          {pressArticles.map((a, i) => (
            <PressCard key={i} a={a} />
          ))}
        </div>
      </ScrollReveal>
    </Section>
  )
}
