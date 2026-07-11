import type { Metadata } from 'next'
import ProjectDetail from '@/components/ProjectDetail'
import { domains } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Media',
  description: 'Filmed conversations, interviews, and video.',
}

export default function Page() {
  return <ProjectDetail domain={domains.media} />
}
