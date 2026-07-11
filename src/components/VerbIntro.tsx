'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import ImageFrame from '@/components/ImageFrame'
import Placeholder from '@/components/Placeholder'
import { verbItems } from '@/data/verbs'

const CYCLE_MS = 3000
const RESUME_AFTER_MANUAL_MS = 12000

// External-store subscriptions (no setState-in-effect):
function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      mq.addEventListener('change', cb)
      return () => mq.removeEventListener('change', cb)
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false
  )
}
function useTabHidden() {
  return useSyncExternalStore(
    (cb) => {
      document.addEventListener('visibilitychange', cb)
      return () => document.removeEventListener('visibilitychange', cb)
    },
    () => document.hidden,
    () => false
  )
}

/**
 * "I like to [verb]." — prototype transition section between the hero and
 * Selected Work. One large sentence whose final word cycles every 3s with a
 * quiet rise/fade, and one medium visual artifact crossfading in step.
 *
 * - The word stack is an inline-grid sized by its widest verb, so cycling
 *   never shifts layout horizontally.
 * - Only the previous, current, and next artifacts are mounted (no eager
 *   six-image load; the next is pre-mounted so its crossfade is ready).
 * - Cycling pauses on hover, focus within, hidden tab, and for 12s after a
 *   manual selection. Under prefers-reduced-motion there is no auto-cycling
 *   at all — manual switching only (transitions snap via the global override).
 * - The animated sentence is aria-hidden; a static sr-only sentence carries
 *   the meaning, so screen readers never hear repeated announcements.
 */
export default function VerbIntro() {
  const n = verbItems.length
  const [idx, setIdx] = useState({ active: 0, prev: -1 })
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [manualHold, setManualHold] = useState(false)
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const reduced = useReducedMotion()
  const hidden = useTabHidden()

  const { active, prev } = idx
  const running = !reduced && !hovered && !focused && !hidden && !manualHold

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setIdx((s) => ({ active: (s.active + 1) % n, prev: s.active })), CYCLE_MS)
    return () => clearInterval(id)
  }, [running, n])

  useEffect(
    () => () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current)
    },
    []
  )

  const select = useCallback((i: number) => {
    setIdx((s) => (s.active === i ? s : { active: i, prev: s.active }))
    setManualHold(true)
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => setManualHold(false), RESUME_AFTER_MANUAL_MS)
  }, [])

  // Mount window derived in render: outgoing (still fading), current, next.
  const mountedIdx = new Set([active, (active + 1) % n])
  if (prev >= 0) mountedIdx.add(prev)

  return (
    <section
      className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-[72px]"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false)
      }}
    >
      {/* Static sentence for assistive tech — never re-announced */}
      <p className="sr-only">I like to make, ask, study, connect, build, and edit.</p>

      {/* The sentence */}
      <p
        aria-hidden
        className="font-serif font-normal"
        style={{ fontSize: 'clamp(34px, 7vw, 64px)', lineHeight: 1.1, color: 'var(--ink)' }}
      >
        I like to{' '}
        <span className="relative inline-grid overflow-hidden align-bottom">
          {verbItems.map((item, i) => (
            <span
              key={item.verb}
              style={{ gridArea: '1 / 1', transitionTimingFunction: 'var(--ease)' }}
              className={`transition-[opacity,transform] duration-[600ms] ${
                i === active ? 'translate-y-0 opacity-100' : 'translate-y-[0.45em] opacity-0'
              }`}
            >
              {item.verb}
            </span>
          ))}
        </span>
        .
      </p>

      {/* The artifact — one medium visual thought, crossfading with the verb */}
      <div className="relative mt-12 w-full max-w-[620px] overflow-hidden rounded-[24px]" style={{ aspectRatio: '4 / 3' }}>
        {verbItems.map((item, i) => {
          if (!mountedIdx.has(i)) return null
          return (
            <div
              key={item.verb}
              aria-hidden={i !== active}
              className={`absolute inset-0 transition-opacity duration-[600ms] ${
                i === active ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionTimingFunction: 'var(--ease)' }}
            >
              {item.mediaSrc ? (
                <ImageFrame
                  src={item.mediaSrc}
                  alt={item.mediaAlt ?? ''}
                  className="absolute inset-0 h-full w-full"
                  objectPosition={item.objectPosition}
                  sizes="(max-width: 768px) 92vw, 620px"
                />
              ) : (
                <Placeholder ratio="4:3" caption={item.placeholderCaption} alt="" mark={false} />
              )}
            </div>
          )
        })}
      </div>

      {/* Manual selection — six quiet text buttons; real buttons, keyboardable */}
      <div role="group" aria-label="Choose a verb" className="mt-8 flex flex-wrap justify-center gap-x-2 gap-y-1">
        {verbItems.map((item, i) => (
          <button
            key={item.verb}
            type="button"
            aria-pressed={i === active}
            onClick={() => select(i)}
            className="rounded-full px-3 py-2.5 font-sans text-[13px] uppercase tracking-[0.08em] transition-colors duration-200"
            style={{ color: i === active ? 'var(--accent)' : 'var(--ink-muted)' }}
          >
            {item.verb}
          </button>
        ))}
      </div>
    </section>
  )
}
