import Link from 'next/link'
import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary'
  external?: boolean
  className?: string
}

/**
 * Pill button. Primary = solid ink pill with canvas text (max one per screen).
 * Secondary = 1px hairline border pill. Renders as a link when href is given.
 */
export default function Button({
  children,
  href,
  variant = 'primary',
  external = false,
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium transition-[transform,box-shadow,background-color,color] duration-200 hover:-translate-y-0.5'

  const variantClass =
    variant === 'primary'
      ? 'bg-[var(--ink)] text-[var(--canvas)] hover:shadow-[var(--shadow-lift)]'
      : 'border border-[var(--line)] text-[var(--ink)] hover:border-[var(--ink)]'

  const cls = `${base} ${variantClass} ${className}`

  if (href) {
    return (
      <Link
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={cls}
      >
        {children}
      </Link>
    )
  }

  return <button className={cls}>{children}</button>
}
