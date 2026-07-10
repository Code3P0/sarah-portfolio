'use client'

import { useEffect, useRef, useState } from 'react'
import type { ElementType, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  /** Add the media scale (1.015 -> 1) alongside the fade + rise */
  media?: boolean
  /** Delay before revealing, ms */
  delay?: number
  /** Upward-rise distance in px (default 20) */
  rise?: number
  as?: ElementType
}

/**
 * Reveals children on scroll: opacity + 20px upward translate (and an optional
 * 1.015->1 media scale). Uses IntersectionObserver, fires once, and is a no-op
 * under prefers-reduced-motion (CSS forces the visible state).
 */
export default function ScrollReveal({
  children,
  className = '',
  media = false,
  delay = 0,
  rise,
  as,
}: ScrollRevealProps) {
  const Tag = (as ?? 'div') as ElementType
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setVisible(true)
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true)
            obs.disconnect()
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${media ? 'reveal-media' : ''} ${visible ? 'is-visible' : ''} ${className}`}
      style={{
        ...(delay ? { transitionDelay: `${delay}ms` } : null),
        ...(rise !== undefined ? ({ '--reveal-rise': `${rise}px` } as React.CSSProperties) : null),
      }}
    >
      {children}
    </Tag>
  )
}
