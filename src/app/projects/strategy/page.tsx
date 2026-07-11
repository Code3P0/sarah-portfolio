import type { Metadata } from 'next'
import ProjectDetail from '@/components/ProjectDetail'
import { domains } from '@/data/projects'

export const metadata: Metadata = { title: 'Strategy · Sarah Graves' }

export default function Page() {
  return <ProjectDetail domain={domains.strategy} />
}
