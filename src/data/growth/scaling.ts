import type { Milestone } from './types'

export const scalingHeading = 'Expand investment when the evidence improves'

export const milestones: Milestone[] = [
  {
    id: 'market',
    title: 'Market and right to win',
    summary: 'Named buying situations and compared alternatives.',
    evidenceNeeded: ['Named buying situations with buyer roles.', 'The current approach and the alternatives compared, including native and incumbent options.'],
    investmentImplication: 'Supports continued qualification and selling effort. It does not by itself support product build.',
  },
  {
    id: 'offer',
    title: 'Sellable, deliverable offer',
    summary: 'Package, prerequisites, price hypothesis, cost view and owners.',
    evidenceNeeded: ['A defined package and its prerequisites.', 'A price hypothesis and a cost view.', 'Named owners across product, sales and delivery.'],
    investmentImplication: 'Supports bounded evaluation and implementation proposals.',
  },
  {
    id: 'production',
    title: 'Production value',
    summary: 'Accepted quality, adoption and owned operation.',
    evidenceNeeded: ['Customer acceptance of quality.', 'Adoption by the intended users.', 'A named operating owner.'],
    investmentImplication: 'Supports maintaining the assets and operating capacity for that scope.',
  },
  {
    id: 'repeatability',
    title: 'Repeatability',
    summary: 'Maintained assets transfer with viable effort and economics.',
    evidenceNeeded: ['Assets reused in a comparable environment.', 'Effort to accepted delivery, and recurring economics, that remain viable.'],
    investmentImplication: 'Supports wider package investment and qualified expansion.',
  },
]
export const milestoneNote = 'Business milestones—not a rigid sequence for every account.'
export const milestoneDetailLabel = 'Evidence and investment implication'

export interface MeasureLens {
  id: 'value' | 'reuse' | 'viability'
  lens: string
  measures: [string, string]
}

export const measuresHeading = 'Three lenses, read together'
export const measureLenses: MeasureLens[] = [
  { id: 'value', lens: 'Customer value', measures: ['Adoption', 'Accepted work and review burden'] },
  { id: 'reuse', lens: 'Delivery reuse', measures: ['Effort to accepted delivery', 'Customisation and support load'] },
  { id: 'viability', lens: 'Commercial viability', measures: ['Purchase progression', 'Implementation and recurring economics'] },
]
export const measuresNote = 'Agree definitions and baselines before numerical targets.'
export const moreMeasures = {
  label: 'More measures',
  items: [
    'Qualified workflow opportunities.',
    'Reasons for loss or no-purchase.',
    'Evaluation-to-paid implementation progression.',
    'Customer dependencies and delivery time.',
    'Renewal/expansion where available.',
    'Comparable-environment evidence.',
    'Partner-assisted opportunities that actually advance.',
  ],
}

export const planActions = {
  label: 'First planning-cycle actions',
  items: [
    'Assign the accountable owner and protected capacity.',
    'Verify current account, product and delivery evidence.',
    'Select the first package and evaluation focus.',
    'Prepare qualification, evaluation, pricing and handoff materials.',
    'Qualify the first actionable partner route and comparable account.',
    'Review whether to advance, revise, pause or stop each investment.',
  ],
  note: 'Proposed actions, not an approved budget or committed calendar.',
}
