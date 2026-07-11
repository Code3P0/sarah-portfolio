'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import ImageFrame from '@/components/ImageFrame'
import Placeholder from '@/components/Placeholder'
import { verbItems } from '@/data/verbs'

const CYCLE_MS = 2500

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
 * "I like to [verb]." — transition section between the hero and Selected Work.
 * The final word rotates through the gold accent (2.5s per word, 300ms
 * crossfade) inside a fixed-width slot sized by the longest word, so the
 * sentence's period never drifts. One medium artifact crossfades in step.
 *
 * Pauses on hover/focus within and while the tab is hidden. Under
 * prefers-reduced-motion the first word renders statically (no cycling).
 * The animated sentence is aria-hidden; a static sr-only sentence carries the
 * meaning so screen readers never hear repeated announcements.
 */
export default function VerbIntro() {
  const n = verbItems.length
  const [idx, setIdx] = useState({ active: 0, prev: -1 })
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const reduced = useReducedMotion()
  const hidden = useTabHidden()

  const { active, prev } = idx
  const running = !reduced && !hovered && !focused && !hidden

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setIdx((s) => ({ active: (s.active + 1) % n, prev: s.active })), CYCLE_MS)
    return () => clearInterval(id)
  }, [running, n])

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
      {/* Static sentence for assistive tech, never re-announced */}
      <p className="sr-only">I like to make, build, study, connect, and write.</p>

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
              style={{ gridArea: '1 / 1', transitionTimingFunction: 'var(--ease)', color: 'var(--accent)' }}
              className={`transition-[opacity,transform] duration-300 ${
                i === active ? 'translate-y-0 opacity-100' : 'translate-y-[0.4em] opacity-0'
              }`}
            >
              {item.verb}
            </span>
          ))}
        </span>
        .
      </p>

      {/* The artifact, one medium visual thought crossfading with the verb */}
      <div className="relative mt-12 w-full max-w-[620px] overflow-hidden rounded-[24px]" style={{ aspectRatio: '4 / 3' }}>
        {verbItems.map((item, i) => {
          if (!mountedIdx.has(i)) return null
          return (
            <div
              key={item.verb}
              aria-hidden={i !== active}
              className={`absolute inset-0 transition-opacity duration-300 ${
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
    </section>
  )
}
