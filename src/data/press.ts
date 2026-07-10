// Press data. Add entries here without touching any layout code.

export interface PressArticle {
  outlet: string
  headline: string
  /** ISO date, e.g. "2026-03-14" */
  date: string
  url: string
  /** Optional article/media image that fills the card. */
  image?: string
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
  {
    outlet: 'Forbes',
    headline: 'Hiring is missing one thing. Her name is Sarah.',
    date: 'May 2026',
    url: 'https://www.forbes.com/sites/susanlamotte/2026/05/22/hiring-is-missing-one-thing-her-name-is-sarah/',
    image: '/images/sarah-graves-speaking.jpg',
  },
  {
    outlet: 'The New York Times',
    headline: "The 'personality hire' powering Texas basketball",
    date: 'Mar 2026',
    url: 'https://www.nytimes.com/athletic/7105083/2026/03/14/sarah-graves-texas-personlity-hire-basketball/',
    image: '/images/sarah-graves-media-photo-basketball.jpg',
  },
  {
    outlet: 'Associated Press',
    headline: 'Walk-on Graves becomes a Final Four story',
    date: 'Mar 2026',
    url: 'https://apnews.com/article/march-madness-texas-final-four-graves-bacbe4714221d3e18ae0fd5963f39fd5',
    image: '/images/sarah-graves-fans.jpg',
  },
  {
    outlet: 'ESPN',
    headline: "Graves' late basket sends Texas into a frenzy",
    date: 'Mar 2026',
    url: 'https://www.espn.co.uk/video/clip/_/id/48361563',
    image: '/images/sarah-graves-bball.jpg',
  },
  {
    outlet: 'The University of Texas',
    headline: 'Taking her shot',
    date: 'May 2026',
    url: 'https://news.utexas.edu/2026/05/29/taking-her-shot/',
    image: '/images/sarah-graves-march-picture.jpg',
  },
  {
    outlet: 'Austin American-Statesman',
    headline: 'From walk-on to McCombs, with Durant watching',
    date: '2026',
    url: 'https://www.statesman.com/sports/college/longhorns/womens-basketball/article/sarah-graves-texas-mccombs-business-kevin-durant-21121024.php',
    image: '/images/sarah-graves-media-microphone-march-madness.jpg',
  },
]
