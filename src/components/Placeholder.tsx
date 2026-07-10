'use client'

import type { ReactNode } from 'react'

interface PlaceholderProps {
  /** Aspect ratio of the frame — 4:3 for cards, 16:9 for video */
  ratio?: '4:3' | '16:9'
  /** Bottom-left eyebrow caption, e.g. "FILM 001 · FALL 2026" or "CASE STUDY · IN PROGRESS".
   *  When a real asset is supplied via children, this becomes the credit line. */
  caption?: string
  /** Show the centered registration / crosshair mark (like an unexposed frame) */
  mark?: boolean
  className?: string
  /** The real asset. When present it fills the same frame and the placeholder
   *  treatment (noise + crosshair) drops away, leaving just the credit caption. */
  children?: ReactNode
}

const ratioClass: Record<NonNullable<PlaceholderProps['ratio']>, string> = {
  '4:3': 'aspect-[4/3]',
  '16:9': 'aspect-video',
}

// Subtle film-grain — same fractal-noise SVG used by the global grain overlay
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='ph-noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23ph-noise)'/%3E%3C/svg%3E\")"

/**
 * Intentional placeholder for any missing asset. Never "coming soon" on gray —
 * a correctly-proportioned frame with a hairline border, faint grain, an
 * optional registration mark, and an eyebrow caption. When the real asset
 * exists it drops into the same box and the caption becomes its credit line.
 */
export default function Placeholder({
  ratio = '16:9',
  caption,
  mark = true,
  className = '',
  children,
}: PlaceholderProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[24px] ${ratioClass[ratio]} ${className}`}
      style={{
        background: 'var(--canvas-raised)',
        border: '1px solid var(--line)',
      }}
    >
      {/* Real asset fills the frame when supplied */}
      {children && <div className="absolute inset-0">{children}</div>}

      {/* Placeholder treatment — only while empty */}
      {!children && (
        <>
          {/* Faint film-grain texture (~3.5%) */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: NOISE, opacity: 0.035 }}
          />

          {/* Centered registration / crosshair mark, like an unexposed frame */}
          {mark && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="relative h-8 w-8 opacity-30">
                <span
                  className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
                  style={{ background: 'var(--ink-muted)' }}
                />
                <span
                  className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2"
                  style={{ background: 'var(--ink-muted)' }}
                />
              </div>
            </div>
          )}
        </>
      )}

      {/* Bottom-left eyebrow caption / credit line */}
      {caption && (
        <span
          className="absolute bottom-3 left-4 font-sans text-xs uppercase tracking-widest"
          style={{ color: 'var(--ink-muted)' }}
        >
          {caption}
        </span>
      )}
    </div>
  )
}
