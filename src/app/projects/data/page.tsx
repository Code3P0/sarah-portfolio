import type { Metadata } from 'next'
import ProjectDetail from '@/components/ProjectDetail'
import { domains } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Data Analytics',
  description: 'Turning performance and market data into decisions.',
}

export default function Page() {
  return <ProjectDetail domain={domains.data} />
}
