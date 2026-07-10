'use client'

import type { ReactNode } from 'react'

interface PlaceholderProps {
  /** Aspect ratio — preset or custom "w/h" (e.g. "4/5", "1.6/1") */
  ratio?: '4:3' | '16:9' | '4:5' | string
  /** Bottom-left eyebrow caption, e.g. "FILM 001". Becomes the credit line
   *  when a real asset is supplied via children. */
  caption?: string
  /** Show the centered registration / crosshair mark */
  mark?: boolean
  className?: string
  /** Accessible label for the eventual image */
  alt?: string
  /** The real asset. When present it fills the frame and the placeholder
   *  treatment (grain + crosshair) drops away, leaving the caption as credit. */
  children?: ReactNode
}

const ratioClass: Record<string, string> = {
  '4:3': 'aspect-[4/3]',
  '16:9': 'aspect-video',
  '4:5': 'aspect-[4/5]',
}

// Subtle film-grain — same fractal-noise SVG used by the global grain overlay
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='ph-noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23ph-noise)'/%3E%3C/svg%3E\")"

/**
 * Intentional placeholder for a missing asset — a correctly-proportioned frame
 * with a hairline border, faint grain, an optional registration mark, and an
 * eyebrow caption. Never "coming soon". The aspect-ratio box reserves layout
 * space (no CLS). When the real asset exists it drops into the same box.
 */
export default function Placeholder({
  ratio = '16:9',
  caption,
  mark = true,
  className = '',
  alt,
  children,
}: PlaceholderProps) {
  const preset = ratioClass[ratio]
  const customAspect = preset ? undefined : ratio.replace(':', '/')

  return (
    <div
      role={alt ? 'img' : undefined}
      aria-label={alt}
      className={`relative overflow-hidden rounded-[24px] ${preset ?? ''} ${className}`}
      style={{
        background: 'var(--canvas-raised)',
        border: '1px solid var(--line)',
        ...(customAspect ? { aspectRatio: customAspect } : null),
      }}
    >
      {children && <div className="absolute inset-0">{children}</div>}

      {!children && (
        <>
          <div
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: NOISE, opacity: 0.035 }}
          />
          {mark && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="relative h-8 w-8 opacity-30">
                <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2" style={{ background: 'var(--ink-muted)' }} />
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2" style={{ background: 'var(--ink-muted)' }} />
              </div>
            </div>
          )}
        </>
      )}

      {caption && (
        <span
          className="absolute bottom-3 left-4 z-10 font-sans text-xs uppercase tracking-widest"
          style={{ color: 'var(--ink-muted)' }}
        >
          {caption}
        </span>
      )}
    </div>
  )
}
