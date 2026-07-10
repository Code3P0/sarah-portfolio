'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import type { ReactNode } from 'react'

interface RailProps {
  items: ReactNode[]
  /** Responsive width for each card. */
  itemClassName?: string
  /** Max width of the scroll viewport (controls how much of the neighbour peeks). */
  viewportClassName?: string
  ariaLabel: string
}

/**
 * Stable, decisive rail: one clear active card centered with the neighbours
 * peeking ~15%, snap-mandatory. No loop, no clones, no center-focus scaling.
 * Controls (prev / progress / next) sit in one fixed row below the cards, not
 * over them. Native scroll + snap on touch; arrows + keyboard on desktop.
 */
export default function Rail({
  items,
  itemClassName = 'w-[min(460px,86vw)]',
  viewportClassName = 'max-w-[620px]',
  ariaLabel,
}: RailProps) {
  const scroller = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  // Gutter that centers the first/last card; derived from the actual card width
  // so the rail works for any card size.
  const [pad, setPad] = useState(0)

  const computeActive = useCallback(() => {
    const el = scroller.current
    if (!el) return
    const first = el.querySelector<HTMLElement>('[data-card]')
    if (first) setPad(Math.max(0, (el.clientWidth - first.offsetWidth) / 2))
    const center = el.scrollLeft + el.clientWidth / 2
    let best = 0
    let bestD = Infinity
    el.querySelectorAll<HTMLElement>('[data-card]').forEach((c, i) => {
      const cc = c.offsetLeft + c.offsetWidth / 2
      const d = Math.abs(cc - center)
      if (d < bestD) {
        bestD = d
        best = i
      }
    })
    setActive(best)
  }, [])

  useEffect(() => {
    const el = scroller.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0
          computeActive()
        })
    }
    computeActive()
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [computeActive])

  const goTo = (i: number) => {
    const el = scroller.current
    if (!el) return
    const clamped = Math.max(0, Math.min(items.length - 1, i))
    const card = el.querySelectorAll<HTMLElement>('[data-card]')[clamped]
    if (card) {
      el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: 'smooth' })
    }
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      goTo(active + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goTo(active - 1)
    }
  }

  const pad2 = (n: number) => String(n).padStart(2, '0')
  const arrowBtn =
    'rail-arrow flex h-11 w-11 items-center justify-center rounded-full text-lg disabled:pointer-events-none disabled:opacity-30'

  return (
    <div>
      <div
        ref={scroller}
        role="group"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className={`no-scrollbar mx-auto flex ${viewportClassName} snap-x snap-mandatory gap-6 overflow-x-auto rounded-[24px] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]`}
        style={{ scrollBehavior: 'smooth', paddingLeft: pad, paddingRight: pad }}
      >
        {items.map((item, i) => (
          <div key={i} data-card className={`shrink-0 snap-center ${itemClassName}`}>
            {item}
          </div>
        ))}
      </div>

      {/* Controls — one fixed row, outside the cards */}
      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          aria-label={`Previous ${ariaLabel}`}
          onClick={() => goTo(active - 1)}
          disabled={active <= 0}
          className={arrowBtn}
        >
          ←
        </button>
        <span className="type-caption tabular-nums" aria-live="polite">
          {pad2(active + 1)} / {pad2(items.length)}
        </span>
        <button
          type="button"
          aria-label={`Next ${ariaLabel}`}
          onClick={() => goTo(active + 1)}
          disabled={active >= items.length - 1}
          className={arrowBtn}
        >
          →
        </button>
      </div>
    </div>
  )
}
