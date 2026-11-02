import type { SectionLink } from '../types'
import { overviewHeadlines } from '../overviews'

export type Tone = 'teal' | 'blue' | 'violet' | 'amber'

export const opening = {
  eyebrow: '01 / OPPORTUNITY',
  title: overviewHeadlines.opportunity,
  subtitle: 'The business case for an account-led wealth AI business',
  assessment: [
    { tone: 'teal' as Tone, text: 'Demand signals are global.' },
    { tone: 'blue' as Tone, text: 'Established alternatives exist.' },
    { tone: 'amber' as Tone, text: 'Our advantage is yet to be demonstrated.' },
  ],
}

export const sectionLinks: SectionLink[] = [
  { id: 'market', label: 'Market' },
  { id: 'demand', label: 'Demand' },
  { id: 'competition', label: 'Competition' },
  { id: 'partnerships', label: 'Partnerships' },
  { id: 'covasant-fit', label: 'Covasant fit' },
  { id: 'commercial-potential', label: 'Commercial potential' },
]
