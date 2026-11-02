import type { ContentItem } from './types'

export const commitmentsHeading = 'What makes this position credible?'

export interface Foundation extends ContentItem {
  id: 'expertise' | 'reuse' | 'delivery'
}

export const foundations: Foundation[] = [
  { id: 'expertise', title: 'Wealth expertise', shortCopy: 'People who define and evaluate the workflow.' },
  { id: 'reuse', title: 'Reusable solutions', shortCopy: 'Maintained packages that transfer between customers.' },
  { id: 'delivery', title: 'Accountable delivery', shortCopy: 'Clear ownership from acceptance through operation.' },
]

export const contributionLabel = 'How our current initiatives contribute'
export const contributionNote = 'These contribute different kinds of evidence. None is presented as an equivalent production case study.'

export interface Contribution extends ContentItem {
  /** Label shown beside the name; states the kind of evidence. */
  status: string
}

export const contributions: Contribution[] = [
  {
    id: 'motilal',
    title: 'Motilal',
    status: 'Reported delivery experience',
    shortCopy: 'Verify the division, production scope, outcomes and reusable assets.',
    evidenceStatus: 'internal',
    sourceIds: [],
  },
  {
    id: 'centrum',
    title: 'Centrum',
    status: 'Discovery evidence',
    shortCopy: 'Validate the service and knowledge needs, sponsor and installed systems.',
    evidenceStatus: 'internal',
    sourceIds: [],
  },
  {
    id: 'liquidity-pulse',
    title: 'Liquidity Pulse',
    status: 'POC',
    shortCopy: 'Test report usefulness, source rights, adoption and commercial potential.',
    evidenceStatus: 'poc',
    sourceIds: [],
  },
]

export const closingStatement = 'Scale when quality, reuse and economics improve together.'
export const closingActions = {
  primary: { label: 'Next: Define the offering', path: '/offerings' },
  secondary: { label: 'Assess readiness', path: '/readiness' },
}
