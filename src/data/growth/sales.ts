import type { SourceId } from '../types'

export const salesHeading = 'Start where access can become a buying opportunity'

export interface SalesRoute {
  id: 'relationships' | 'comparable' | 'partner'
  letter: 'A' | 'B' | 'C'
  title: string
  caption: string
}

export const salesRoutes: SalesRoute[] = [
  { id: 'relationships', letter: 'A', title: 'Existing relationships', caption: 'Verify the buying history and qualify adjacent workflows.' },
  { id: 'comparable', letter: 'B', title: 'Comparable accounts', caption: 'Test whether the same offer solves a similar problem elsewhere.' },
  { id: 'partner', letter: 'C', title: 'Partner-assisted opportunities', caption: 'Bring a partner into a named opportunity with a clear role.' },
]
export const partnerRoles = ['Sales access', 'Technical access', 'Procurement']

export interface AccountExample {
  id: 'motilal' | 'centrum' | 'liquidity-pulse'
  name: string
  /** Maturity qualifier. Always visible beside the name. */
  status: string
  action: string
  evidenceNeeded: string[]
  sourceIds: SourceId[]
}

export const accountsLabel = 'Selected-account examples'
export const accountExamples: AccountExample[] = [
  {
    id: 'motilal',
    name: 'Motilal',
    status: 'Reported existing work',
    action: 'Verify what was bought, why Covasant won and which adjacent workflow has a sponsor.',
    evidenceNeeded: ['Entity/division', 'Scope', 'Acceptance', 'Outcomes', 'Contract', 'Reuse/reference rights'],
    sourceIds: [],
  },
  {
    id: 'centrum',
    name: 'Centrum',
    status: 'Discovery',
    action: 'Qualify a bounded knowledge/service or oversight opportunity.',
    evidenceNeeded: ['Current sponsor', 'Priority', 'Alternatives', 'System access', 'Budget', 'Procurement route'],
    sourceIds: [],
  },
  {
    id: 'liquidity-pulse',
    name: 'Liquidity Pulse',
    status: 'POC',
    action: 'Test repeated RM usefulness and a product purchase.',
    evidenceNeeded: ['Quality', 'Adoption', 'Source rights', 'Price acceptance', 'Operating cost'],
    sourceIds: [],
  },
]

export const relevanceDisclosure = {
  label: 'What makes an account relevant?',
  items: [
    'Recurring workflow problem.',
    'Named business owner.',
    'Appropriate user group.',
    'Credible data and system-access path.',
    'Budget and procurement route.',
    'Deliverable scope and viable economics.',
  ],
  note: 'Firm type and HNI/UHNI client segments are kept separate from workflow qualification.',
}

export interface SalesStep {
  id: 'qualify' | 'scope' | 'evaluate' | 'implement' | 'expand'
  label: string
  output: string
}

export const processLabel = 'Sales process'
export const processDefault: SalesStep['id'] = 'evaluate'
export const salesSteps: SalesStep[] = [
  { id: 'qualify', label: 'Qualify', output: 'Workflow, user, sponsor, current approach and buying route.' },
  { id: 'scope', label: 'Scope and compare', output: 'Solution boundary, dependencies, alternatives and value/cost case.' },
  { id: 'evaluate', label: 'Evaluate', output: 'Agreed data, owners, measures and purchasing decision.' },
  { id: 'implement', label: 'Implement', output: 'Contracted scope, acceptance and operating responsibilities.' },
  { id: 'expand', label: 'Expand', output: 'Sustained adoption, measured value and a qualified next scope.' },
]
export const processStatement = 'Agree the commercial destination before substantial evaluation work.'
export const processDisclosure = {
  label: 'How evaluations should be commercialised',
  items: [
    'Substantial evaluation should normally have a paid, bounded proposal.',
    'Limited demonstrations and discovery can remain part of selling.',
    'Subsidised design-partner work needs an investment reason and cost boundary.',
    'Technical success alone does not establish budget or procurement acceptance.',
    'Existing engagements enter at their evidenced stage.',
  ],
}

export const sellingPack = {
  label: 'Build a credible selling pack',
  items: [
    'Recognisable workflow problem and value case.',
    'Domain-relevant demonstration.',
    'Native/internal alternative comparison.',
    'Scope and dependency sheet.',
    'Deployment/data-flow view.',
    'Supplier assurance summary.',
    'Pricing structure.',
    'Permitted customer evidence or clearly labelled POC example.',
  ],
  explanation:
    'Use account workshops, practitioner discussions, targeted executive material and relevant partner sessions to support qualified buying conversations.',
  cautions: [
    'Use synthetic or authorised demonstration data.',
    'Do not invent case studies or publish unverified outcomes.',
    'No marketing calendar, event budget or lead-conversion target is proposed here.',
  ],
}
