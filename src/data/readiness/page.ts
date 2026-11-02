import type { SectionLink, SourceId } from '../types'
import { overviewHeadlines } from '../overviews'

export const readinessHero = {
  eyebrow: '04 / READINESS',
  title: overviewHeadlines.readiness,
  subtitle:
    'Assess the wealth capabilities we can substantiate, the proof still needed and the actions that enable the next decision.',
  status: 'Initial evidence review',
  note: 'An assessment of reviewed evidence—not a technical audit.',
  primaryAction: 'Explore the assessment',
  secondaryAction: 'How ratings work',
}

/** Content chapters; the Overview is added ahead of them by the page frame, giving four chapters in all. */
export const readinessSections: SectionLink[] = [
  { id: 'assessment', label: 'Capability assessment' },
  { id: 'before-commitment', label: 'Before customer commitment' },
  { id: 'actions', label: 'Next actions' },
]

/** Old chapter anchors land on the chapter that now carries their content. */
export const legacyAnchors: Record<string, string> = {
  overview: 'assessment',
  'proof-standards': 'assessment',
  'critical-requirements': 'before-commitment',
}

export const overviewCopy = {
  headline: 'Establish the first offer’s scope before committing to delivery.',
  today: {
    label: 'Today',
    question: 'What can we credibly commit to?',
    answer: 'A scoped assessment of a candidate wealth workflow.',
    support: 'Use existing account activity and the Liquidity Pulse POC to investigate capability and customer fit.',
    note: 'Any delivery commitment needs its own scoped evidence.',
  },
  work: {
    label: 'Work needed',
    question: 'What still needs work?',
    items: [
      { id: 'evidence', label: 'Evidence', text: 'Confirm what has been delivered and accepted.' },
      { id: 'capability', label: 'Capability', text: 'Determine what to reuse, adapt or build.' },
      { id: 'ownership', label: 'Ownership', text: 'Agree evaluation, acceptance and support responsibilities.' },
    ],
  },
  authorise: {
    label: 'Authorise next',
    question: 'What should leadership authorise?',
    answer: 'A bounded capability and delivery assessment.',
    needs: ['Accountable lead', 'Access to relevant evidence', 'Scoped team effort'],
    status: 'Proposed · Resources and cost to agree',
  },
  output: {
    label: 'Expected output from the assessment',
    items: ['Reuse / adapt / build plan', 'Acceptance criteria', 'Proposed operating owner', 'Costed delivery scope'],
    support: 'Establish what we can offer, what it requires and what it will cost.',
  },
  starts: [
    { id: 'motilal', name: 'Motilal Oswal', status: 'Reported agent work' },
    { id: 'centrum', name: 'Centrum', status: 'Discovery' },
    { id: 'liquidity-pulse', name: 'Liquidity Pulse', status: 'POC' },
  ],
  startsLabel: 'Starting evidence',
  qualification: 'These are different starting points, not three confirmed wealth customers.',
  buttons: ['Inspect current evidence', 'Explore capability assessment'] as [string, string],
  /** Added to the starting-point evidence panel. */
  panelNotes: {
    label: 'What this review does and does not settle',
    items: [
      'Production delivery readiness is unresolved in this review; it is not established as absent.',
      'The next assessment must examine the chosen workflow against actual SERAA capabilities and customer requirements.',
      'Existing contractual commitments are outside this review unless specifically evidenced.',
      'A candidate workflow is needed for the assessment. This overview does not approve the launch offer.',
      'Assessment scope, named ownership, effort, cost boundary and review date must be agreed before work is authorised.',
      'Formal decision recording remains on the Decisions page.',
    ],
  },
}

export const assessmentCopy = {
  headline: 'What can we build on—and what needs work?',
  supports: 'What evidence supports',
  uncertain: 'What remains uncertain',
  next: 'Next work',
  inspect: 'Inspect requirements',
  panelTitle: 'Requirements and ratings',
}

export const ratingsPanel = {
  title: 'How ratings work',
  intro: 'Each requirement is rated on its own, from the evidence reviewed. All initial ratings are provisional and dated 28 October 2026.',
  rules: [
    'Unverified is not zero. It means the evidence was insufficient for this review.',
    'Missing evidence does not establish a missing capability.',
    'A company relationship or certification does not establish workflow readiness.',
    'Ratings are never averaged or weighted, and no dimension or overall score is calculated.',
    'Owner roles are proposed. Named owners are TBC.',
    'Ratings apply to specific requirements and scopes. The progression is a standard of proof, not a project completion timeline.',
  ],
  currentNote: 'No current requirement has sufficient reviewed evidence for Gap, Demonstrated or Repeatable.',
  sourceIds: ['S23', 'S24', 'S25', 'S26', 'S27', 'S28'] as SourceId[],
  sourceNote:
    'NIST is a voluntary framework. FINRA and SEC material is United States context. SEBI applicability depends on the institution and use case. Vendor pages are published claims. Google’s announcement corroborates ecosystem participation only.',
}

// ---------------------------------------------------------------- explorer
export const assessmentHeading = 'Inspect the evidence behind each requirement'
export const sourceReuseNote = 'One source can support several requirements. It is not independent proof for each.'

// ---------------------------------------------------------------- critical requirements
export const criticalHeading = 'Assess readiness for the next commitment'
export const criticalCopy = 'Different commitments require different proof.'
export const criticalSteps = [
  { name: 'Discovery', criterion: 'Problem, participants and evidence access.' },
  { name: 'Bounded POC', criterion: 'Scope, appropriate data, evaluation and ownership.' },
  { name: 'Production', criterion: 'Accepted quality, authorised access and reliable operation.' },
  { name: 'Reusable expansion', criterion: 'Maintained capability, transfer evidence and viable economics.' },
]
export const criticalStatement = 'A strong result elsewhere cannot waive an unresolved critical requirement.'
export const criticalExamples = {
  label: 'Examples of production-critical requirements',
  items: [
    'Authorised data and source use.',
    'Correct client access.',
    'Acceptable task quality.',
    'Appropriate action and review boundaries.',
    'Customer acceptance.',
    'Named operating responsibility.',
  ],
  notes: [
    'Scope-dependent examples, not a universal regulatory checklist.',
    'Not every requirement must reach Repeatable before a first production deployment.',
    'Unverified production requirements do not stop discovery or controlled POC work.',
  ],
}

// ---------------------------------------------------------------- actions
export const actionsHeading = 'Four outputs for the next leadership review.'
export const actionsTakeaway = 'Assign owners and review the outputs before the next commitment.'
export const actionsButton = 'Output definitions & evidence requests'
export const actionsNote = 'Unverified does not automatically mean new engineering.'

/**
 * The one evidence-request register. It connects four outputs to the next validation stage (Decisions).
 * Other pages link here rather than repeating it. Owner roles are proposals; no person, date or budget is assigned.
 * `output` keeps the earlier minimum reviewable output and is shown in the detail panel.
 */
export const evidenceRegister = {
  heading: 'Outputs for the next validation stage',
  columns: { output: 'Output', resolves: 'What it should resolve', owner: 'Proposed owner' },
  ownerStatus: 'Owner roles proposed; named assignments pending.',
  rows: [
    {
      id: 'motilal',
      preview: { title: 'Delivery brief', question: 'What has Motilal work demonstrated?', labels: 'Scope · Acceptance · Outcomes · Reuse rights' },
      title: 'Motilal delivery brief',
      resolves: 'Delivered scope, acceptance, outcomes and reuse rights.',
      output: 'Scoped case brief covering delivery, acceptance, outcomes, limitations, reuse and reference rights.',
      owner: 'Account and delivery leads',
    },
    {
      id: 'demand',
      preview: { title: 'Demand brief', question: 'Who would buy—and why?', labels: 'Problem · Alternatives · Sponsor · Buying route' },
      title: 'Indian customer demand evidence',
      resolves: 'Priority problem, alternatives, sponsor and buying route.',
      output: 'Account-level evidence of problem importance, alternatives, sponsor and budget route.',
      owner: 'Offering owner and sales',
    },
    {
      id: 'cost',
      preview: { title: 'Cost estimate', question: 'What will the next stage require?', labels: 'Effort · Dependencies · Operating cost' },
      title: 'Next-stage cost estimate',
      resolves: 'Scope, effort, dependencies and operating costs.',
      output: 'Bounded validation estimate with assumptions, exclusions and cost drivers.',
      owner: 'Delivery and finance',
    },
    {
      id: 'seraa',
      preview: { title: 'Capability plan', question: 'What can we reuse, adapt or develop?', labels: 'Foundation · Wealth adaptation · Validation' },
      title: 'SERAA capability assessment',
      resolves: 'What can be reused, adapted or developed—and what needs verification.',
      output: 'Demonstrations and artefacts supporting the relevant readiness requirements.',
      owner: 'Platform and solution owners',
    },
  ],
  seraaRequires: {
    label: 'The SERAA capability assessment should include',
    items: [
      'Demonstrations and relevant artefacts.',
      'A scoped assessment against the candidate workflow.',
      'Proposed wealth adaptation.',
      'Confirmed development requirements, if any.',
      'Validation and customer acceptance work.',
      'A conclusion on reuse, adaptation, development or further verification.',
    ],
  },
}

export const evidenceRequests = {
  label: 'Detailed evidence packs',
  note: 'All roles are proposed. Named owner TBC.',
  items: [
    { title: 'Motilal implementation dossier', owner: 'Account delivery lead' },
    { title: 'Liquidity Pulse review pack', owner: 'Product owner' },
    { title: 'SERAA capability-to-proof register', owner: 'Product/platform lead' },
    { title: 'Assurance and data-handling pack', owner: 'Security assurance lead' },
    { title: 'Target-account integration pack', owner: 'Solution/integration architect' },
    { title: 'Wealth expertise and evaluation pack', owner: 'Practice/evaluation leads' },
    { title: 'Commercial and reference pack', owner: 'Commercial/finance/account leads' },
  ],
}

export const readinessClosing = {
  statement: 'Decide the next commitment on inspected evidence.',
  primary: { label: 'Next: Build the growth plan', path: '/growth' },
  secondary: { label: 'Back to offerings', path: '/offerings' },
}
