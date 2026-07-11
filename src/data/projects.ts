// Projects are organised by domain. Add real entries by editing the arrays
// below — the routes and layout render straight from this data. Each domain
// ships with two clearly-labelled placeholder entries; find-and-replace the
// "Project one/two" / "in progress" copy with real content.

export interface ProjectEntry {
  /** Eyebrow parts: role · year · context */
  role: string
  year: string
  context: string
  title: string
  summary: string
  /** "What I did / Outcome" block */
  body: string
  /** Optional media; when absent, the designed placeholder renders. */
  image?: string
  /** Optional external link; the "View ->" link only renders when present. */
  url?: string
}

export interface Domain {
  slug: DomainSlug
  title: string
  /** Short display word used as the card's large typographic graphic. */
  word: string
  tag: string
  descriptor: string
  entries: ProjectEntry[]
}

export type DomainSlug = 'strategy' | 'data' | 'media' | 'writing'

const placeholderEntries = (context: string): ProjectEntry[] => [
  { role: 'ROLE', year: '2026', context, title: 'Project one', summary: 'Summary in progress.', body: 'Details in progress.' },
  { role: 'ROLE', year: '2026', context, title: 'Project two', summary: 'Summary in progress.', body: 'Details in progress.' },
]

export const domains: Record<DomainSlug, Domain> = {
  strategy: {
    slug: 'strategy',
    title: 'Strategy',
    word: 'Strategy',
    tag: 'STRATEGY',
    descriptor: 'Operating, advising, and building inside sports business.',
    entries: placeholderEntries('ADVISORY'),
  },
  data: {
    slug: 'data',
    title: 'Data Analytics',
    word: 'Data',
    tag: 'DATA',
    descriptor: 'Turning performance and market data into decisions.',
    entries: placeholderEntries('ANALYTICS'),
  },
  media: {
    slug: 'media',
    title: 'Media',
    word: 'Media',
    tag: 'MEDIA',
    descriptor: 'Filmed conversations, interviews, and video.',
    entries: placeholderEntries('PRODUCTION'),
  },
  writing: {
    slug: 'writing',
    title: 'Writing',
    word: 'Writing',
    tag: 'WRITING',
    descriptor: 'Essays and arguments on sports, business, and reform.',
    entries: placeholderEntries('ESSAY'),
  },
}

export const domainList: Domain[] = [domains.strategy, domains.data, domains.media, domains.writing]
