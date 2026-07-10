'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import type { ReactNode } from 'react'

interface RailProps {
  items: ReactNode[]
  /** Responsive width for each card. */
  itemClassName?: string
  /** Centering gutter (used only when not looping). */
  gutterClassName?: string
  ariaLabel: string
  /** Show the one-time mobile swipe hint. */
  hint?: boolean
  /** Seamless wrap-around: the last card sits to the left of the first, so the
   *  rail opens with a card centered and neighbors on both sides (no dead space). */
  loop?: boolean
}

const GAP = 24 // gap-6

/**
 * Horizontal center-focus rail. Focused (centered) card is full scale/opacity;
 * neighbors ease toward 0.96 / 0.7. Native scroll + scroll-snap, arrow buttons
 * (desktop), mouse drag, and keyboard arrows. With `loop`, three copies are
 * rendered and the scroll position wraps within the middle copy for an infinite
 * feel that always shows a card centered between two neighbors.
 */
export default function Rail({
  items,
  itemClassName = 'w-[78vw] max-w-[420px] md:w-[420px]',
  gutterClassName = 'px-[11vw] md:px-[calc(50%-210px)]',
  ariaLabel,
  hint = true,
  loop = false,
}: RailProps) {
  const scroller = useRef<HTMLDivElement>(null)
  const [showHint, setShowHint] = useState(false)
  const canLoop = loop && items.length > 1
  const rendered = canLoop ? [...items, ...items, ...items] : items
  const copyW = useRef(0)
  const centered = useRef(false)

  const updateFocus = useCallback(() => {
    const el = scroller.current
    if (!el) return
    const center = el.scrollLeft + el.clientWidth / 2
    const half = el.clientWidth / 2
    Array.from(el.children).forEach((raw) => {
      const child = raw as HTMLElement
      if (!child.dataset.card) return
      const c = child.offsetLeft + child.offsetWidth / 2
      const d = Math.min(Math.abs(c - center) / half, 1)
      child.style.setProperty('--focus-scale', String(1 - d * 0.04))
      child.style.setProperty('--focus-opacity', String(1 - d * 0.3))
    })
  }, [])

  // Center the first card of the middle copy (looping) after layout.
  useEffect(() => {
    const el = scroller.current
    if (!el) return
    if (canLoop) {
      const cards = el.querySelectorAll<HTMLElement>('[data-card]')
      const target = cards[items.length]
      copyW.current = el.scrollWidth / 3
      if (target) {
        el.scrollLeft = target.offsetLeft + target.offsetWidth / 2 - el.clientWidth / 2
      }
    }
    centered.current = true
    updateFocus()
  }, [canLoop, items.length, updateFocus])

  useEffect(() => {
    const el = scroller.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      if (showHint) setShowHint(false)
      // Keep looping scroll inside the middle copy (jumps are instant/invisible).
      if (canLoop) {
        const w = copyW.current || el.scrollWidth / 3
        copyW.current = w
        if (w) {
          if (el.scrollLeft < w * 0.5) el.scrollLeft += w
          else if (el.scrollLeft >= w * 1.5) el.scrollLeft -= w
        }
      }
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0
          updateFocus()
        })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [updateFocus, canLoop, showHint])

  useEffect(() => {
    if (!hint) return
    try {
      if (!localStorage.getItem('rail-hint-seen')) {
        setShowHint(true)
        localStorage.setItem('rail-hint-seen', '1')
      }
    } catch {
      /* ignore */
    }
  }, [hint])

  const step = () => {
    const el = scroller.current
    const first = el?.querySelector<HTMLElement>('[data-card]')
    return first ? first.offsetWidth + GAP : (el?.clientWidth ?? 0) * 0.8
  }
  const scrollByCard = (dir: 1 | -1) => {
    scroller.current?.scrollBy({ left: dir * step(), behavior: 'smooth' })
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      scrollByCard(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      scrollByCard(-1)
    }
  }

  // Mouse drag-to-scroll (touch uses native swipe).
  const drag = useRef({ down: false, startX: 0, start: 0, moved: false })
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return
    const el = scroller.current
    if (!el) return
    drag.current = { down: true, startX: e.clientX, start: el.scrollLeft, moved: false }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.down) return
    const el = scroller.current
    if (!el) return
    const dx = e.clientX - drag.current.startX
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

  const arrowBtn =
    'pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full text-lg shadow-lg shadow-black/5 transition-[transform,background-color] duration-200 hover:-translate-y-0.5'

  return (
    <div className="relative">
      {/* Arrow controls — desktop only (hidden on touch) */}
      <div className="pointer-events-none absolute inset-0 z-20 hidden items-center justify-between px-2 md:flex">
        <button
          type="button"
          aria-label={`Scroll ${ariaLabel} left`}
          onClick={() => scrollByCard(-1)}
          className={arrowBtn}
          style={{ background: 'var(--canvas)', border: '1px solid var(--line)', color: 'var(--ink)' }}
        >
          ←
        </button>
        <button
          type="button"
          aria-label={`Scroll ${ariaLabel} right`}
          onClick={() => scrollByCard(1)}
          className={arrowBtn}
          style={{ background: 'var(--canvas)', border: '1px solid var(--line)', color: 'var(--ink)' }}
        >
          →
        </button>
      </div>

      <div
        ref={scroller}
        role="group"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        className={`no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto rounded-[24px] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] ${canLoop ? 'px-[11vw] md:px-8' : gutterClassName}`}
        style={{ cursor: 'grab', scrollBehavior: 'smooth' }}
      >
        {rendered.map((item, i) => {
          // With loop, only the middle copy is real/interactive; the flanking
          // copies are decorative peeks — hide them from AT and tab order.
          const isClone = canLoop && (i < items.length || i >= items.length * 2)
          return (
            <div
              key={i}
              data-card
              aria-hidden={isClone || undefined}
              inert={isClone || undefined}
              className={`shrink-0 snap-center ${itemClassName}`}
              style={{
                transform: 'scale(var(--focus-scale, 1))',
                opacity: 'var(--focus-opacity, 1)' as unknown as number,
                transition: 'transform var(--dur-ui) var(--ease), opacity var(--dur-ui) var(--ease)',
              }}
            >
              {item}
            </div>
          )
        })}
      </div>

      {/* One-time mobile swipe hint */}
      {showHint && (
        <div className="pointer-events-none mt-4 flex justify-center md:hidden">
          <span
            className="rounded-full px-4 py-1.5 text-xs uppercase tracking-widest"
            style={{ background: 'var(--canvas-raised)', border: '1px solid var(--line)', color: 'var(--ink-muted)' }}
          >
            Swipe →
          </span>
        </div>
      )}
    </div>
  )
}
