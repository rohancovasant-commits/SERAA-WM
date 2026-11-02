import type { SourceId } from '../types'
import { marketCompanies } from './marketCompanies'

/* ---------------------------------------------------------------- opening */

export const marketEyebrow = 'Market & customer focus'
export const marketHeading = 'A defined market. A focused starting point.'
export const marketSentence = 'Start with wealth firms where a recurring workflow and a sponsor justify action.'
export const marketRecommendation = 'Proposed focus: existing account access, followed by similar wealth workflows.'
export const sourcesLinkLabel = 'Research & sources'

/* --------------------------------------------------------- starting universe */

export const universeTitle = 'Potential market'
/** Derived from the dataset, so the headline can never drift from the explorer. */
export const universeCount = marketCompanies.length
export const universeBadge = `${universeCount} named organisations mapped`
export const universeStatement = `${universeCount} named potential buying organisations mapped`
export const universeQualifier = 'Selected initial research list—not a complete market census or qualified sales pipeline.'
export const universeFootnote = `${universeCount} named organisations in this selected research list—not the total Indian market.`
export const universeCategoryNote =
  'Categories are assignments within this list. Real businesses can span several operating models.'
export const exploreLabel = 'Explore organisations'

/* ------------------------------------------------------------- ICP summary */

export const icpPanel = {
  tag: 'Proposed ICP',
  title: 'Our initial customer focus',
  text: 'Wealth teams with repeated RM, service or operational work.',
  criteria: ['A repeated, measurable problem', 'Usable systems and authorised data', 'A sponsor and credible budget path'],
  more: 'View all 6 fit criteria',
  accessTitle: 'Start with existing access',
  access: [
    { name: 'Motilal Oswal', status: 'Reported delivery · scope to verify' },
    { name: 'Centrum Wealth', status: 'Discovery' },
  ],
  footer: 'Then qualify firms with similar workflows.',
  /** The three rings of the target, innermost first. */
  rings: ['Start with existing access', 'Then qualify firms with similar workflows', 'Pursue banks and platforms selectively'],
  criteriaIcons: ['repeat', 'data', 'budget'] as const,
}

/* ----------------------------------------------------------- roles summary */

export const rolesStrip = {
  title: 'One account. Different roles.',
  columns: [
    { key: 'buyer' as const, label: 'Buyer / sponsor', items: ['Business and budget owners'] },
    { key: 'users' as const, label: 'Users', items: ['RMs', 'SRMs', 'service & operations'] },
    { key: 'reviewers' as const, label: 'Reviewers', items: ['IT', 'security', 'compliance'] },
  ],
  link: 'Role details',
}

export const investorShortLine = 'Affluent · HNI · UHNI: investor clients served.'
export const evidenceLinkLabel = 'Evidence & definitions'

/* --------------------------------------------------------------------- ICP */

export const icpTitle = 'What makes a firm a strong fit?'
export const icpStatement =
  'An Indian wealth or advisory business—or a selected investment-management unit—with repeated RM, servicing or operational work, a measurable problem, accessible authorised systems and a credible commercial route.'
export const icpLabel = 'Proposed ICP — to validate through account discovery'
export const icpTakeaway = 'A prestigious name or large AUM does not establish customer fit.'

export interface IcpCondition {
  id: string
  /** Always-visible label. */
  title: string
  /** Always-visible three-or-four word cue. */
  cue: string
  /** Expanded explanation. */
  detail: string
  /** Questions that would test the condition in account discovery. */
  tests: string[]
  /** Side of the diagram on wide screens. */
  side: 'left' | 'right'
}

export const icpConditions: IcpCondition[] = [
  {
    id: 'problem',
    title: 'Material problem',
    cue: 'Measurable pain',
    detail: 'A measurable information gap, delay, rework or staff-effort problem.',
    tests: ['How much time, rework or delay does the problem cause today?', 'Who feels it, and how often?'],
    side: 'left',
  },
  {
    id: 'workflow',
    title: 'Repeated workflow',
    cue: 'Shared, recurring work',
    detail: 'Shared work across a team or sufficient case volume to justify deployment.',
    tests: ['Which team repeats this work?', 'Is the case volume enough to justify a deployment?'],
    side: 'left',
  },
  {
    id: 'gap',
    title: 'Gap in existing tools',
    cue: 'Beyond current tools',
    detail: 'A useful advantage over the firm’s current software, native capabilities or internal solution.',
    tests: ['What do current tools and any internal build already cover?', 'What would SERAA do that they do not?'],
    side: 'left',
  },
  {
    id: 'access',
    title: 'Usable system access',
    cue: 'Authorised, implementable',
    detail: 'Authorised sources, appropriate permissions, interfaces and an implementable deployment route.',
    tests: ['Which systems hold the information, and who authorises access?', 'Which interfaces and deployment route are available?'],
    side: 'right',
  },
  {
    id: 'sponsor',
    title: 'Sponsor and budget path',
    cue: 'Owner and buyer',
    detail: 'A business owner, economic buyer and credible procurement route.',
    tests: ['Who owns the problem, and who holds the budget?', 'What is the procurement route and its lead time?'],
    side: 'right',
  },
  {
    id: 'economics',
    title: 'Viable delivery economics',
    cue: 'Repeatable scope',
    detail: 'Agreed outcomes, support ownership and a scope that can become commercially repeatable.',
    tests: ['Which outcomes would be agreed, and who owns support?', 'Could the scope be repeated at another account?'],
    side: 'right',
  },
]

/* ------------------------------------------------------------ pursuit order */

export const pursuitLabel = 'Recommended pursuit order'
export const pursuitNote = 'A proposed sales focus, not an approved pipeline or guaranteed demand.'

export interface PursuitStep {
  number: number
  title: string
  text: string
}

export const pursuitSteps: PursuitStep[] = [
  {
    number: 1,
    title: 'Existing access',
    text: 'Verify Motilal delivery evidence and Centrum discovery needs to select a bounded workflow.',
  },
  {
    number: 2,
    title: 'Similar workflow accounts',
    text: 'Qualify non-bank wealth/advisory businesses and selected portfolio managers against the same criteria.',
  },
  {
    number: 3,
    title: 'Selective opportunities',
    text: 'Pursue bank wealth units and distribution platforms when a sponsor, unmet need and practical delivery route exist.',
  },
]

export const familyOfficeNote =
  'Multi-family offices can share advisory and service workflows across client families. Single-family offices require a separate assessment of bespoke needs and delivery economics.'

/* -------------------------------------------------------------------- roles */

export const rolesTitle = 'The organisation buys. Different teams use and approve.'
export const rolesMapping = 'Proposed — confirm per account'
export const rolesNote =
  'RM and SRM are user roles, not additional customer organisations. Confirm local role titles and responsibilities.'
export const rolesSeatNote = 'Not every RM, SRM or report recipient is a paid software seat.'

export type OfferingFamilyId = 'intelligence' | 'relationship' | 'workflows' | 'compliance'

export interface RoleMapping {
  id: OfferingFamilyId
  label: string
  users: string[]
  sponsor: string
  approvals: string[]
}

export const roleMappings: RoleMapping[] = [
  {
    id: 'intelligence',
    label: 'Market & investment intelligence',
    users: ['RMs', 'Senior RMs', 'Investment counsellors', 'Research and product teams'],
    sponsor: 'Research, advisory or wealth leadership',
    approvals: ['Relevant content owners', 'Compliance', 'IT / security, depending on scope'],
  },
  {
    id: 'relationship',
    label: 'Relationship & service support',
    users: ['RMs', 'Service managers', 'Client servicing', 'Product specialists'],
    sponsor: 'Wealth / service leadership or COO',
    approvals: ['Knowledge / data owners', 'IT / security', 'Relevant control teams'],
  },
  {
    id: 'workflows',
    label: 'Client & operational workflows',
    users: ['Onboarding', 'KYC / operations', 'Client servicing', 'RMs'],
    sponsor: 'COO or operations leadership',
    approvals: ['Process owner', 'Compliance', 'IT / security'],
  },
  {
    id: 'compliance',
    label: 'Compliance & operational oversight',
    users: ['Compliance', 'Operations', 'Management reviewers'],
    sponsor: 'Compliance leadership or COO, depending on the workflow',
    approvals: ['Relevant legal / control teams', 'Technology', 'Evidence owners'],
  },
]

export const roleDefinitions = {
  account: { title: 'Customer account', text: 'The firm or purchasing business unit.' },
  sponsor: { title: 'Business sponsor', text: 'Owns the problem.' },
  buyer: { title: 'Economic buyer', text: 'Owns the budget.' },
  buyerNote: 'Sponsor and economic buyer may be different people.',
  approvals: { title: 'Approval roles', text: 'Technology, security, compliance, procurement and data / process owners.' },
  approvalsNote: 'Reviews vary by account. They are not a fixed sequence.',
  users: { title: 'Users', text: 'The people carrying out the workflow.' },
}

export const investorClientsLabel = 'Investor clients served'
export const investorSegments = ['Affluent', 'HNI', 'UHNI']
export const investorCaption = 'These describe the wealth firm’s clients, rather than SERAA’s default purchaser.'

/* --------------------------------------------------------------- user scale */

export const scaleTitle = 'One account can contain a substantial user population'

export interface ScaleEvidence {
  company: string
  figure: string
  basis: string
  sourceLabel: string
  sources: SourceId[]
}

export const scaleEvidence: ScaleEvidence[] = [
  {
    company: 'Nuvama',
    figure: '1,250+ wealth RMs',
    basis: 'Company disclosure, 30 June 2026.',
    sourceLabel: 'Q1 FY27 investor presentation',
    sources: ['S04'],
  },
  {
    company: 'Anand Rathi Wealth',
    figure: 'Approximately 431 RMs',
    basis: 'Company disclosure, 30 September 2026.',
    sourceLabel: 'Official company pages',
    sources: ['S46', 'S47'],
  },
]

export const scaleQualification =
  'Company-reported workforce scale—not guaranteed SERAA users. Geography, workflow eligibility and adoption require confirmation.'

export const pulseCallout = {
  title: 'A separate subscription opportunity to test',
  text: 'Liquidity Pulse may suit wealth/advisory teams with recurring market-briefing needs. Smaller practices become relevant if source rights, onboarding, support and pricing allow a simple subscription.',
  status: 'POC / commercial hypothesis',
}

/* ---------------------------------------------------------- sizing boundary */

export const sizingTitle = 'What we can size today, and what we cannot'

export interface SizingStage {
  title: string
  text: string
}

export const sizingStages: SizingStage[] = [
  { title: 'Research universe', text: `${universeCount} named organisations in this initial map.` },
  { title: 'Qualified accounts', text: 'Requires evidence against the proposed ICP.' },
  { title: 'Eligible users or workflows', text: 'Requires account-level team, activity and permission data.' },
  { title: 'Commercial opportunity', text: 'Requires offering-specific pricing, adoption and delivery assumptions.' },
]

export const sizingNote =
  'We can identify real potential accounts today. A defensible revenue estimate requires qualification, eligible-user or workflow scope, and tested contract assumptions.'
export const sizingStageNote = 'A conceptual progression, not a measured funnel.'
export const sizingLink = { label: 'Commercial potential', hash: 'commercial-potential' }

/* -------------------------------------------------------- evidence drawer */

export const evidenceDrawer = {
  title: 'Market evidence and definitions',
  eyebrow: 'Supporting evidence',
  trigger: 'Market evidence and definitions',
  universe: {
    title: 'The research universe',
    text: `The ${universeCount}-organisation map is a selected prospecting universe. It does not establish qualified demand, software spending or obtainable revenue.`,
  },
  regulatory: {
    title: 'Regulatory screening populations',
    figures: [
      {
        value: '542',
        label: 'SEBI portfolio-manager registrations',
        basis: 'As of 28 October 2026.',
        sources: ['S44'] as SourceId[],
      },
      {
        value: '1,065',
        label: 'SEBI investment-adviser registrations',
        basis: 'As of 28 October 2026; includes organisations and individuals.',
        sources: ['S45'] as SourceId[],
      },
    ],
    explanation:
      'These are regulatory registration populations, not unique qualified customer accounts. Registration records help identify entities. They do not equal unique wealth groups, employees, qualified enterprise buyers or a complete wealth-market census. Categories and group entities can overlap.',
    warning: 'The two counts are not added together as distinct customers.',
  },
  industry: {
    title: 'Industry context',
    value: '$2.7T',
    label: 'estimated serviceable financial assets',
    basis: 'Bernstein, July 2025. Supplied industry report; no public link is provided.',
    explanation: 'Industry asset values are context, not SERAA’s revenue market. They are investor assets relevant to the wealth industry, not spending available to SERAA.',
  },
  alternatives: {
    title: 'Existing alternatives',
    items: [
      {
        company: 'Anand Rathi Wealth',
        text: 'The annual report describes an existing RM Workstation.',
        sources: ['S18'] as SourceId[],
      },
      {
        company: 'Prudent Corporate',
        text: 'Describes edge+ as an AI tool offered free to its partners in beta.',
        sources: ['S48'] as SourceId[],
      },
    ],
    takeaway: 'Customer qualification must identify a valuable gap in the tools already available.',
    caveat: 'These are public provider descriptions, not independently tested product assessments.',
  },
}
