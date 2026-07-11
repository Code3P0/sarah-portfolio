import type { Metadata } from 'next'
import ProjectDetail from '@/components/ProjectDetail'
import { domains } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Strategy',
  description: 'Operating, advising, and building inside sports business.',
}

export default function Page() {
  return <ProjectDetail domain={domains.strategy} />
}
