'use client'

import { useEffect, useRef, useState } from 'react'
import ImageFrame from '@/components/ImageFrame'
import { verbItems } from '@/data/verbs'

/**
 * "I like to [word]." — click-driven identity switcher. No auto-rotate: the
 * word changes only on user input, via the index row (real buttons) or by
 * clicking the gold word itself (advances to the next word).
 *
 * - The word slot is a fixed-width inline block sized by the longest word
 *   (invisible sizer), text-left, so the period never floats or reflows.
 * - Word swap: out fades+slides up 8px, in from below, 280ms; instant under
 *   reduced motion (global override snaps transitions).
 * - The wide 21:9 strip crossfades 400ms opacity-only; all frames stay
 *   mounted in one fixed-aspect box (zero layout shift, instant swaps).
 * - Index: aria-pressed buttons, 44px targets, arrow-key navigation, sliding
 *   underline under the active word; a polite live region announces changes.
 */
export default function VerbIntro() {
  const n = verbItems.length
  const [active, setActive] = useState(0)
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([])
  const rowRef = useRef<HTMLDivElement>(null)
  const [bar, setBar] = useState({ x: 0, y: 0, w: 0 })

  // Slide the underline beneath the active index word (measured, resize-aware).
  useEffect(() => {
    const measure = () => {
      const btn = btnRefs.current[active]
      const row = rowRef.current
      if (!btn || !row) return
      const b = btn.getBoundingClientRect()
      const r = row.getBoundingClientRect()
      setBar({ x: b.left - r.left, y: b.bottom - r.top - 6, w: b.width })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [active])

  const onIndexKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = e.key === 'ArrowRight' ? (active + 1) % n : (active - 1 + n) % n
    setActive(next)
    btnRefs.current[next]?.focus()
  }

  return (
    <section className="flex min-h-[65vh] flex-col items-center justify-center px-6 py-[72px]">
      {/* Sentence. The animated stack is aria-hidden; the live region below
          carries the current word politely for assistive tech. */}
      <p
        className="font-serif font-normal"
        style={{ fontSize: 'clamp(34px, 7vw, 64px)', lineHeight: 1.1, color: 'var(--ink)' }}
      >
        I like to{' '}
        <button
          type="button"
          onClick={() => setActive((active + 1) % n)}
          aria-label={`Change word, current word ${verbItems[active].verb}`}
          className="group relative inline-grid cursor-pointer overflow-hidden text-left align-bottom transition-opacity duration-150 hover:opacity-80"
          style={{ font: 'inherit', color: 'var(--accent)' }}
        >
          {/* invisible sizer: reserves the longest word's width, so zero CLS */}
          <span aria-hidden className="invisible" style={{ gridArea: '1 / 1' }}>
            {verbItems.reduce((a, b) => (b.verb.length > a.length ? b.verb : a), '')}
          </span>
          {verbItems.map((item, i) => (
            <span
              key={item.verb}
              aria-hidden={i !== active}
              style={{ gridArea: '1 / 1', transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
              className={`transition-[opacity,transform] duration-[280ms] ${
                i === active ? 'translate-y-0 opacity-100' : i === (active + n - 1) % n ? '-translate-y-[8px] opacity-0' : 'translate-y-[8px] opacity-0'
              }`}
            >
              {item.verb}
            </span>
          ))}
        </button>
        .
      </p>
      <span aria-live="polite" className="sr-only">
        I like to {verbItems[active].verb}.
      </span>

      {/* Wide low strip: all frames mounted in one fixed-aspect box, 400ms
          opacity crossfade (cut under reduced motion via global override). */}
      <div
        className="relative mt-10 max-h-[180px] w-full max-w-[1120px] overflow-hidden rounded-[24px] md:max-h-[300px]"
        style={{ aspectRatio: '21 / 9' }}
      >
        {verbItems.map((item, i) => (
          <div
            key={item.verb}
            aria-hidden={i !== active}
            className={`absolute inset-0 transition-opacity duration-[400ms] ${i === active ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
          >
            <ImageFrame
              src={item.image}
              alt={item.alt}
              className="absolute inset-0 h-full w-full"
              objectPosition={item.objectPosition}
              sizes="(max-width: 768px) 92vw, 1120px"
            />
          </div>
        ))}
      </div>

      {/* Word index: the control. Real buttons, eyebrow style, sliding underline. */}
      <div
        ref={rowRef}
        role="group"
        aria-label="Choose a word"
        onKeyDown={onIndexKeyDown}
        className="relative mt-8 flex flex-wrap items-center justify-center"
      >
        {verbItems.map((item, i) => (
          <span key={item.verb} className="flex items-center">
            {i > 0 && (
              <span aria-hidden className="px-1 sm:px-2" style={{ color: 'var(--ink-muted)', opacity: 0.5 }}>
                ·
              </span>
            )}
            <button
              ref={(el) => {
                btnRefs.current[i] = el
              }}
              type="button"
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className={`min-h-[44px] cursor-pointer px-2 font-sans text-[13px] font-medium uppercase tracking-[0.08em] transition-opacity duration-150 sm:px-3 ${
                i === active ? 'opacity-100' : 'opacity-40 hover:opacity-70'
              }`}
              style={{ color: i === active ? 'var(--accent)' : 'var(--ink)' }}
            >
              {item.verb}
            </button>
          </span>
        ))}
        {/* sliding underline */}
        <span
          aria-hidden
          className="absolute left-0 top-0 h-[2px] rounded-full transition-[transform,width] duration-[280ms]"
          style={{
            width: bar.w,
            transform: `translate(${bar.x}px, ${bar.y}px)`,
            background: 'var(--accent)',
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </div>
    </section>
  )
}
