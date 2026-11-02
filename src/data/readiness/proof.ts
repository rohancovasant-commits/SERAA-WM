import type { FamilyId } from '../offerings/families'
import type { ReadinessRating } from './ratings'

export const proofHeading = 'What evidence moves a capability forward?'
export const proofNote = 'Each promotion applies to a specific requirement and scope.'

export interface ProofFolder {
  rating: 1 | 2 | 3
  label: string
  contents: string[]
}

export const proofFolders: ProofFolder[] = [
  { rating: 1, label: 'Emerging', contents: ['Concept', 'POC', 'Known limitations'] },
  { rating: 2, label: 'Demonstrated', contents: ['Relevant implementation', 'Inspectable results', 'Acceptance status'] },
  { rating: 3, label: 'Repeatable', contents: ['Production evidence', 'Maintained assets', 'Ownership and support', 'Credible reuse'] },
]

/** Shown apart from the progression. Neither sits on a scale. */
export const outsideProgression = {
  label: 'Outside the progression',
  unverified: { label: 'Unverified', text: 'Evidence needed to assess.' },
  gap: { label: 'Gap', text: 'Scoped review confirms absence.' },
}

export interface ProofExample {
  id: 'liquidity-pulse' | 'motilal'
  name: string
  current: ReadinessRating
  toDemonstrate: string
  toRepeat: string
}

export const examplesLabel = 'Proof requirements, not achieved milestones.'
export const proofExamples: ProofExample[] = [
  {
    id: 'liquidity-pulse',
    name: 'Liquidity Pulse',
    current: 1,
    toDemonstrate: 'Inspect implementation, representative reports, evaluated quality, correct distribution and user acceptance.',
    toRepeat: 'Establish supported releases, source maintenance, production operation and reuse.',
  },
  {
    id: 'motilal',
    name: 'Motilal processing',
    current: 'unverified',
    toDemonstrate: 'Inspect the actual scope, implementation and acceptance evidence.',
    toRepeat: 'Establish maintained reusable assets, production operation and support.',
  },
]

export const evaluationHeading = 'Wealth-specific evaluation'
export const familyChecks: { family: FamilyId; name: string; check: string }[] = [
  { family: 'intelligence', name: 'Intelligence', check: 'Correct source, entity, date and recipient.' },
  { family: 'relationships', name: 'Relationships', check: 'Correct policy version and authorised client record.' },
  { family: 'operations', name: 'Operations', check: 'Correct exception handling and controlled retries.' },
  { family: 'oversight', name: 'Oversight', check: 'Correct owner, deadline and reviewer-accepted evidence.' },
]

export const domainChecks = {
  label: 'Additional domain checks',
  items: [
    'Household/account identity.',
    'Valuation and effective dates.',
    'Currency and lakh/crore conventions.',
    'Percentages versus basis points.',
    'Trusted calculation sources.',
    'Conflicting or missing information.',
    'Unauthorised requests.',
    'Instructions in source material that conflict with workflow authority.',
    'Human review effort and recurring failure patterns.',
  ],
  note: 'Proposed test themes, not identified defects. No universal accuracy threshold is proposed.',
}
