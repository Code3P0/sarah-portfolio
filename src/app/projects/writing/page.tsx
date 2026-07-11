import type { Metadata } from 'next'
import ProjectDetail from '@/components/ProjectDetail'
import { domains } from '@/data/projects'

export const metadata: Metadata = { title: 'Writing — Sarah Graves' }

export default function Page() {
  return <ProjectDetail domain={domains.writing} />
}
