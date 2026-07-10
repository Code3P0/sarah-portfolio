import type { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  /** Extra classes on the outer <section> (e.g. background) */
  className?: string
  /** Extra classes on the inner 1120px container */
  containerClassName?: string
  id?: string
  as?: 'section' | 'header' | 'footer'
}

/**
 * The single owner of vertical rhythm and horizontal container.
 * 120px block padding on desktop, 72px on mobile; content capped at 1120px
 * and centered, with 24px side gutters on mobile. Every section on every
 * page uses this so spacing is never set one-off.
 */
export default function Section({
  children,
  className = '',
  containerClassName = '',
  id,
  as = 'section',
}: SectionProps) {
  const Tag = as
  return (
    <Tag id={id} className={`px-6 py-[72px] md:py-[120px] ${className}`}>
      <div className={`mx-auto w-full max-w-[1120px] ${containerClassName}`}>
        {children}
      </div>
    </Tag>
  )
}
