// Press data. Add entries here without touching any layout code.

export interface PressArticle {
  outlet: string
  headline: string
  /** ISO date, e.g. "2026-03-14" */
  date: string
  url: string
  /** Optional path to a monochrome outlet logo. */
  logo?: string
}

export interface PressLogo {
  name: string
  /** Path to a monochrome/SVG logo. */
  src?: string
}

// Outlet logos for the slim capsule (grayscale, evenly spaced).
// The capsule renders nothing while this array is empty.
export const pressLogos: PressLogo[] = []

// Article cards for the press rail. Ships empty with two examples to copy.
export const pressArticles: PressArticle[] = [
  // {
  //   outlet: 'Sports Business Journal',
  //   headline: 'The student-athlete building at the intersection of sports and tech',
  //   date: '2026-03-14',
  //   url: 'https://example.com/article',
  //   logo: '/images/press/sbj.svg',
  // },
  // {
  //   outlet: 'Boardroom',
  //   headline: "Inside BOSI's push to open sports internships to athletes",
  //   date: '2026-01-22',
  //   url: 'https://example.com/article-2',
  // },
]
