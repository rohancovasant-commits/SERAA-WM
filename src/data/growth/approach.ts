import type { ProposedDirection } from './types'

export const approachHeading = 'Turn account learning into a repeatable business'

export interface PathStage {
  id: 'access' | 'value' | 'package' | 'expansion'
  label: string
  caption: string
}

export const pathStages: PathStage[] = [
  { id: 'access', label: 'Current access', caption: 'Understand the buyer, problem and environment.' },
  { id: 'value', label: 'Accepted value', caption: 'Prove useful work within an agreed scope.' },
  { id: 'package', label: 'Supported package', caption: 'Maintain what can transfer.' },
  { id: 'expansion', label: 'Qualified expansion', caption: 'Expand where fit and economics hold.' },
]

export const feedbackLabel = 'Delivery learning improves the package'
export const pathNote = 'A proposed business mechanism, not guaranteed compounding growth.'
export const approachStatement = 'Commercial qualification and solution development move together.'
export const directionsButton = 'View the proposed directions'
export const directionsPanelIntro =
  'Ten proposed directions. Each has a strategic status, a validation test and a proposed owner role. Owner roles are proposed until confirmed.'

export const directions: ProposedDirection[] = [
  {
    id: 'initial-sales',
    topic: 'Initial sales',
    shortTag: 'Existing access and account expansion.',
    explanation: 'Start through real relationships and discovery routes.',
    status: 'Proposed',
    supportingEvidence: ['Motilal work, Centrum discovery and the Liquidity Pulse POC are named starting points, described internally and not yet verified.'],
    validationTest: 'Verify what each relationship bought, who sponsors the next scope and the buying route.',
    proposedOwnerRole: 'Accountable wealth offering owner, with account leads',
    sourceIds: [],
  },
  {
    id: 'target-market',
    topic: 'Target market',
    shortTag: 'India-first, workflow-qualified accounts.',
    explanation: 'Select by problem, buyer, systems and delivery fit.',
    status: 'Proposed',
    supportingEvidence: ['Earlier pages group buyers by firm type. Fit depends on the workflow, not the firm type alone.'],
    validationTest: 'Assess named accounts against workflow, sponsor, system access and delivery fit before outreach.',
    proposedOwnerRole: 'Sales lead, with domain reviewers',
    sourceIds: [],
  },
  {
    id: 'entry-offers',
    topic: 'Entry offers',
    shortTag: 'Selective package qualification.',
    explanation: 'Qualify service support, verify operational reuse and validate Liquidity Pulse.',
    status: 'Priority hypothesis',
    supportingEvidence: ['Liquidity Pulse is a POC. Operational reuse is reported but not yet evidenced.'],
    validationTest: 'Run each candidate package through qualification, reuse and purchase tests, then select the first.',
    proposedOwnerRole: 'Product owner',
    sourceIds: [],
  },
  {
    id: 'offering-model',
    topic: 'Offering model',
    shortTag: 'Packaged capability + implementation + optional operation.',
    explanation: 'Scope each component separately.',
    status: 'Proposed positioning',
    supportingEvidence: ['Published wealth AI offers combine a product with services around it, in different proportions.'],
    validationTest: 'Confirm customers can buy, and Covasant can support, each component on its own.',
    proposedOwnerRole: 'Product owner, with finance/commercial',
    sourceIds: ['S09', 'S11'],
  },
  {
    id: 'pricing',
    topic: 'Pricing',
    shortTag: 'Implementation plus recurring charges.',
    explanation: 'Test the billing unit against value and full costs.',
    status: 'Hypothesis',
    supportingEvidence: ['External vendors publish different pricing structures. They show available approaches, not Covasant rates.'],
    validationTest: 'Compare each candidate unit with customer value and full cost-to-serve across representative accounts.',
    proposedOwnerRole: 'Finance/commercial lead',
    sourceIds: ['S34', 'S40'],
  },
  {
    id: 'partnerships',
    topic: 'Partnerships',
    shortTag: 'Account-linked relationships.',
    explanation: 'Remove a specific commercial or delivery dependency.',
    status: 'Proposed',
    supportingEvidence: ['Covasant lists partner relationships. Programme tier and wealth-specific support are not established.'],
    validationTest: 'Name the dependency, counterpart and customer benefit before engaging a partner.',
    proposedOwnerRole: 'Alliances lead',
    sourceIds: ['S12', 'S17'],
  },
  {
    id: 'demand-generation',
    topic: 'Demand generation',
    shortTag: 'Workflow proof and targeted outreach.',
    explanation: 'Help relevant buyers assess the proposition.',
    status: 'Proposed',
    supportingEvidence: ['Selling material depends on authorised demonstration data and permitted customer evidence.'],
    validationTest: 'Test whether the selling pack lets a qualified buyer assess fit and agree a bounded evaluation.',
    proposedOwnerRole: 'Sales lead, with marketing',
    sourceIds: [],
  },
  {
    id: 'ownership',
    topic: 'Ownership',
    shortTag: 'One accountable wealth offering owner.',
    explanation: 'Coordinate product, domain, sales and delivery decisions.',
    status: 'Leadership decision',
    supportingEvidence: ['Readiness evidence sits across product, domain, account and delivery teams, with no single owner assigned.'],
    validationTest: 'Confirm authority, protected capacity and decision rights in writing.',
    proposedOwnerRole: 'Leadership team',
    sourceIds: [],
  },
  {
    id: 'delivery',
    topic: 'Delivery',
    shortTag: 'Shared platform, wealth-specific ownership.',
    explanation: 'Reuse SERAA foundations while maintaining domain packages.',
    status: 'Leadership decision',
    supportingEvidence: ['SERAA product pages describe platform capabilities. Wealth-specific reuse is not yet evidenced.'],
    validationTest: 'Decide which assets are platform, which are wealth packages and who maintains each.',
    proposedOwnerRole: 'Leadership team, with product/platform lead',
    sourceIds: ['S31', 'S32'],
  },
  {
    id: 'scaling',
    topic: 'Scaling',
    shortTag: 'Quality, reuse and economics.',
    explanation: 'Increase investment when accepted delivery transfers sustainably.',
    status: 'Proposed decision rule',
    supportingEvidence: ['Quality, reuse and economics must improve together. One strong measure does not justify expansion.'],
    validationTest: 'Agree measure definitions and baselines, then review each investment against them.',
    proposedOwnerRole: 'Accountable wealth offering owner, with finance/commercial',
    sourceIds: ['S40'],
  },
]
