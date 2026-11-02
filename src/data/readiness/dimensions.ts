import type { SourceId } from '../types'
import type { Tone } from '../opportunity/opening'
import type { DimensionId } from './requirements'

export interface Dimension {
  id: DimensionId
  name: string
  /** One short conclusion. No score, no percentage. */
  conclusion: string
  tone: Tone
}

export const dimensions: Dimension[] = [
  {
    id: 'domain',
    name: 'Domain capability',
    conclusion: 'Early workflow understanding; domain expertise and validation need evidence.',
    tone: 'violet',
  },
  {
    id: 'offerings',
    name: 'Relevant offerings',
    conclusion: 'POC and discovery starting points; supported packages need verification.',
    tone: 'teal',
  },
  {
    id: 'ecosystem',
    name: 'Ecosystem compatibility',
    conclusion: 'Relationships provide context; actual wealth-system compatibility needs testing.',
    tone: 'blue',
  },
  {
    id: 'delivery',
    name: 'Enterprise delivery',
    conclusion: 'Published capabilities need scoped security, quality and operating proof.',
    tone: 'blue',
  },
  {
    id: 'customer',
    name: 'Customer evidence',
    conclusion: 'Discovery is visible; implementation acceptance and results need verification.',
    tone: 'violet',
  },
  {
    id: 'commercial',
    name: 'Commercial evidence',
    conclusion: 'Buying evidence, economics and sustainable delivery need validation.',
    tone: 'amber',
  },
]

export const overviewHeading = 'Six dimensions of wealth credibility'

export const foundationsStrip = {
  label: 'Existing foundations',
  note: 'These are not equivalent, and none establishes production readiness.',
  items: [
    {
      id: 'google',
      title: 'Google Cloud relationship',
      text: 'Externally corroborated ecosystem participation.',
      kind: 'External corroboration',
      sourceIds: ['S17'] as SourceId[],
    },
    {
      id: 'assurance',
      title: 'Published assurance claims',
      text: 'Underlying scope and reports to review.',
      kind: 'Company-published claim',
      sourceIds: ['S30'] as SourceId[],
    },
    {
      id: 'initiatives',
      title: 'Wealth initiatives',
      text: 'POC, discovery and reported delivery starting points.',
      kind: 'Internal evidence',
      sourceIds: [] as SourceId[],
    },
  ],
}
