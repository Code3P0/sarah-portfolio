import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'About',
  description:
    "About Sarah Graves: guard on the Texas women's basketball team, finance major at McCombs, BOSI advisory board member, and former RedBird Capital summer analyst.",
  alternates: { canonical: '/about' },
}

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
