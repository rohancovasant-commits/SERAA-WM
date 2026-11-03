import type { EvidenceKind, SourceId } from './types'
import { businessFunctions } from './offerings/families'

/**
 * Executive overview content for the six pages, written for a senior leader who already knows SERAA.
 *
 * Each overview answers three questions without a click: what we recommend (the headline and one focal element), why
 * (two or three short reasons placed beside the visual they explain) and what follows (one next-action line), with at
 * most two evidence buttons. Everything else is kept under `detail` and shown in the page's detail panels or chapters,
 * so nothing is lost: findings, recommendations, qualifications and sources.
 *
 * Counts are derived from the data files. Nothing here adds a budget, owner, date, result, partnership or readiness
 * score. Statuses stay as in the research: nothing is selected, assigned, approved or funded.
 */

export interface DetailFinding {
  label: string
  text: string
  evidence?: EvidenceKind
  sourceIds?: SourceId[]
}

/** The strategic framing used across the detail panels. */
export const proposedDirection = {
  label: 'Proposed direction',
  text: 'Build Covasant’s wealth business through SERAA-enabled packaged solutions, integration and accountable delivery. Start with a commercially justified workflow and expand through accepted outcomes and reusable capabilities.',
}

/** Shared qualifier: the three kinds of evidence are never merged into one claim. */
export const evidenceSeparation =
  'Platform capability, wealth-specific adaptation and customer acceptance are assessed separately for the selected workflow.'

/* ------------------------------------------------------------- Opportunity */

export const opportunityOverview = {
  headline: 'Our focus within BFSI: Wealth Management',
  detail: {
    recommendation: 'Develop an account-led wealth offering, beginning with accessible non-bank wealth businesses and a measurable workflow gap.',
    qualifier: 'The market map is a selected research list, not national market size, a qualified pipeline or evidence of demand.',
    icpLabel: 'Proposed ICP · to validate',
    icpItems: ['Repeated, measurable workflow', 'Gap versus existing tools', 'Sponsor, authorised access and commercial route'],
    findings: [
      {
        label: 'Access',
        text: 'Existing relationships give a way in. Their delivery scope and commercial commitment are still to be verified.',
        evidence: 'internal',
      },
      {
        label: 'Alternatives',
        text: 'Wealth platforms, CRM vendors, specialist AI and customers’ own teams already serve this market. Our advantage must be demonstrated.',
        evidence: 'vendor',
      },
      {
        label: 'Demand',
        text: 'Demand evidence is global. Indian budgets, urgency and price acceptance remain to be validated.',
        evidence: 'research',
        sourceIds: ['S03'],
      },
    ] as DetailFinding[],
  },
}

/* ---------------------------------------------------------------- Position */

export const positionOverview = {
  headline: 'Become a wealth AI solutions and delivery specialist.',
  lede: 'SERAA-enabled packages. Integrated and operated by Covasant.',
  label: 'Proposed model; integrations and wealth-specific capability require verification.',
  layers: [
    { id: 'customer' as const, title: 'Customer environment', subtitle: undefined, items: ['Wealth systems', 'CRM', 'Approved sources'] },
    { id: 'solution' as const, title: 'SERAA', subtitle: 'Packaged wealth workflows', items: ['Context', 'Workflow', 'Controls'] },
    { id: 'delivery' as const, title: 'Covasant delivery', subtitle: undefined, items: ['Implement', 'Integrate', 'Operate'] },
  ],
  advantagesLabel: 'Advantages to substantiate',
  advantages: [
    { id: 'customer' as const, label: 'Existing systems', text: 'Fit the customer environment.' },
    { id: 'solution' as const, label: 'Workflow value', text: 'Measure the business outcome.' },
    { id: 'delivery' as const, label: 'Delivery ownership', text: 'Make accountability explicit.' },
  ],
  next: 'Select one workflow and confirm SERAA’s contribution.',
  buttons: ['Why choose us?', 'Delivery model details'] as [string, string],
  detail: {
    advantagesLabel: 'Advantages to substantiate',
    advantages: ['Fits the existing environment', 'Solves a measurable workflow problem', 'Has clear delivery and operating ownership'],
    advantagesNote: 'None is claimed as unique. Each needs evidence from customer fit, delivery quality and economics.',
    direction: proposedDirection,
    layerNotes: [
      { id: 'customer', text: 'Wealth systems, CRM, repositories and approved sources the firm already uses.' },
      { id: 'solution', text: 'Packaged wealth workflows with context, workflow and control capabilities. SERAA’s contribution is confirmed workflow by workflow.' },
      { id: 'delivery', text: 'Implementation, integration and agreed ongoing operation.' },
    ],
    modelCaption: 'Illustrative layers. Not evidence of existing connectors.',
    findings: [
      {
        label: 'SERAA’s role',
        text: 'SERAA is the proposed reusable foundation. Its contribution is confirmed workflow by workflow; not every customer needs every component.',
        evidence: 'proposed',
        sourceIds: ['S31', 'S32'],
      },
      {
        label: 'Evidence',
        text: 'Product pages describe platform capabilities. Wealth-specific adaptation and customer acceptance are separate evidence, still to be established.',
        evidence: 'vendor',
      },
    ] as DetailFinding[],
  },
}

/* --------------------------------------------------------------- Offerings */

export const offeringsOverview = {
  headline: 'Four offering families. Select one launch scope.',
  caption: 'Proposed portfolio areas',
  families: [
    { id: 'relationships' as const, name: 'Relationships', text: 'Knowledge and service support', tag: 'Proposed first focus', reason: 'Centrum discovery gives a basis for a bounded trial.' },
    { id: 'intelligence' as const, name: 'Intelligence', text: 'RM market briefings', tag: 'POC starting point', reason: undefined },
    { id: 'operations' as const, name: 'Operations', text: 'Client workflow support', tag: undefined, reason: undefined },
    { id: 'oversight' as const, name: 'Oversight', text: 'Obligations and evidence', tag: undefined, reason: undefined },
  ],
  recommendation: 'Proposed first focus: relationship and service support. Confirm through account-level comparison.',
  statusNote: 'Recommendation only; launch priority remains unresolved.',
  sequence: {
    label: 'Development sequence for the selected scope',
    note: 'Not a sequence of families.',
    steps: ['Focused scope', 'Accepted delivery', 'Supported reuse', 'Expansion'],
  },
  next: 'Compare urgency, access, alternatives, effort and commercial route.',
  buttons: ['Compare launch candidates', 'Worked workflow'] as [string, string],
  workflowLabel: 'Illustrative proposed workflow; not an approved launch selection.',
  detail: {
    criteriaLabel: 'Compare on',
    findings: [
      {
        label: 'Portfolio',
        text: `The four families are hypotheses serving ${businessFunctions.length} business functions, not four finished products or phases.`,
        evidence: 'proposed',
      },
      { label: 'Evidence gates', text: 'Each family advances through evidence gates. None is a commitment to build.', evidence: 'proposed' },
      { label: 'Assessment', text: evidenceSeparation, evidence: 'validate' },
    ] as DetailFinding[],
    recommendation:
      'Invest selectively. Relationship and service support is the proposed first focus; confirm it through the account-level comparison before any launch decision.',
  },
}

/* --------------------------------------------------------------- Readiness */

export const readinessOverview = {
  headline: 'What must SERAA add for wealth?',
  startingLabel: 'Starting assets',
  startingPoints: [
    { id: 'motilal' as const, name: 'Motilal', label: 'Reported engagement' },
    { id: 'centrum' as const, name: 'Centrum', label: 'Discovery' },
    { id: 'liquidity-pulse' as const, name: 'Liquidity Pulse', label: 'POC' },
  ],
  qualification: 'Customer and deployment totals unconfirmed in this review.',
  assessmentLabel: 'Capability assessment',
  mapCaption: 'Planning labels, not ratings. Unverified is not absent.',
  conclusion: 'Repeatable wealth delivery is not yet established in the evidence reviewed.',
  next: 'Verify delivered scope, appoint a wealth reviewer and assess one workflow.',
  buttons: ['Starting-point evidence', 'Detailed assessment'] as [string, string],
  detail: {
    qualification:
      'These are different starting points, not three confirmed customers. Total wealth customer count is not established in this review.',
    findings: [
      {
        label: 'Starting assets',
        text: 'They support discovery and controlled proof-of-concept work. Accepted outcomes and reusable packages have not been established in the evidence reviewed.',
        evidence: 'internal',
      },
      { label: 'Assessment', text: `${evidenceSeparation} Missing evidence is not a confirmed gap.`, evidence: 'validate' },
      {
        label: 'Classification',
        text: 'Classifications are planning labels, not readiness ratings, and are never averaged or scored. Unverified is not zero.',
        evidence: 'validate',
      },
    ] as DetailFinding[],
    standard: {
      label: 'Proposed credibility standard',
      text: 'Domain-reviewed workflows, accepted customer outcomes, supported reuse and viable delivery economics.',
    },
  },
}

/* ------------------------------------------------------------------ Growth */

export const growthOverview = {
  headline: 'Start with existing accounts. Expand through proven packages.',
  label: 'Proposed growth approach',
  stages: ['Anchor', 'Prove', 'Package', 'Expand'],
  business: { label: 'Business', steps: ['Customer workflow', 'Accepted value', 'Supported offer', 'Comparable account'] },
  credibility: { label: 'Credibility', steps: ['Domain reviewer', 'Approved case', 'India perspective', 'Referenceable results'] },
  qualification: 'Reviewers, customer permissions, partner eligibility and a second account are not yet established.',
  commercial: { label: 'Commercial', text: 'Implementation + recurring charges · pricing hypothesis' },
  partnership: { label: 'Partnership role', text: 'Unblock a specific customer or delivery dependency.' },
  next: 'Agree an anchor workflow, acceptance measures and operating economics.',
  buttons: ['Commercial & partnership plan', 'Credibility plan'] as [string, string],
  detail: {
    stages: [
      { id: 'anchor', label: 'Anchor', business: 'Agree a customer workflow and acceptance basis.', credibility: 'Involve a named domain reviewer.' },
      { id: 'prove', label: 'Prove', business: 'Establish accepted value and operating cost.', credibility: 'Prepare customer-approved proof.' },
      { id: 'package', label: 'Package', business: 'Define reusable scope, dependencies and support.', credibility: 'Publish a substantive India wealth point of view.' },
      { id: 'expand', label: 'Expand', business: 'Test transfer to another qualified account.', credibility: 'Develop referenceable, repeated results.' },
    ],
    commercial: 'Implementation + recurring solution/operation charges — pricing hypothesis.',
    partnership: 'Prioritise relationships that remove a specific account or delivery barrier.',
    findings: [
      {
        label: 'Reusable delivery',
        text: 'Package only what transfers between customers with viable effort. Wealth-specific reuse of SERAA is not yet evidenced.',
        evidence: 'validate',
        sourceIds: ['S31', 'S32'],
      },
      {
        label: 'Not assumed',
        text: 'A second account, customer reference, advisor participation and partner eligibility are not assumed. Each must be established.',
        evidence: 'validate',
      },
    ] as DetailFinding[],
    recommendation: 'Increase investment only when quality, reuse and economics improve together.',
  },
}

/* --------------------------------------------------------------- Decisions */

export const decisionsOverview = {
  headline: 'Endorse the direction. Assign ownership. Define the investment.',
  label: 'Proposals for leadership review',
  groups: [
    { id: 'position' as const, refs: ['D1'], title: 'Position & first offer', text: 'Endorse the specialist position and confirm launch priority.' },
    { id: 'ownership' as const, refs: ['D2', 'D3'], title: 'Ownership & resources', text: 'Assign an offering owner and review a costed delivery plan.' },
    { id: 'partners' as const, refs: ['D4', 'D5'], title: 'Partners & expansion', text: 'Sponsor account-linked pursuits and agree evidence for further investment.' },
  ],
  roadmap: ['Market', 'Offer', 'Production value', 'Repeatability'],
  roadmapCaption: 'Proposed roadmap · progress not assessed',
  qualification: 'Funding approval requires a reviewed estimate.',
  next: 'Return with a scoped offer, capability plan and reviewed estimate.',
  buttons: ['All five decisions', 'Outputs & assumptions'] as [string, string],
  detail: {
    scope: {
      title: 'Proposed next stage',
      items: [
        'Consolidate account and capability evidence.',
        'Recommend one offer against alternatives.',
        'Define adaptation or development, acceptance and operating requirements.',
        'Produce a reviewed delivery and commercial estimate.',
      ],
    },
    milestones: [
      { id: 'm1' as const, label: 'Market and right to win', output: 'Strategy charter and account shortlist' },
      { id: 'm2' as const, label: 'Sellable and deliverable offer', output: 'Package specification and costed work order' },
      { id: 'm3' as const, label: 'Accepted production value', output: 'Customer acceptance evidence' },
      { id: 'm4' as const, label: 'Repeatability and scale', output: 'Reuse and transfer evidence' },
    ],
    decisions: [
      { id: 'd1' as const, number: 'D1', label: 'Position and priority' },
      { id: 'd2' as const, number: 'D2', label: 'Ownership and evidence access' },
      { id: 'd3' as const, number: 'D3', label: 'Resources' },
      { id: 'd4' as const, number: 'D4', label: 'Partnership sponsorship' },
      { id: 'd5' as const, number: 'D5', label: 'Expansion criteria' },
    ],
    findings: [
      {
        label: 'Not proposed',
        text: 'No amounts, dates, named owners or headcount are proposed. Every decision is Pending.',
        evidence: 'validate',
      },
    ] as DetailFinding[],
    cost: 'Cost, capacity and planning dates require internal estimation before funding approval.',
  },
}

export const overviewHeadlines = {
  opportunity: opportunityOverview.headline,
  position: positionOverview.headline,
  offerings: offeringsOverview.headline,
  readiness: readinessOverview.headline,
  growth: growthOverview.headline,
  decisions: decisionsOverview.headline,
}
