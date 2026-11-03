import type { SourceId } from '../types'
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

export type SupportingTab = 'areas' | 'requirements' | 'commitment' | 'requests'

export const supportingTabs: { id: SupportingTab; label: string }[] = [
  { id: 'areas', label: 'Capability areas' },
  { id: 'requirements', label: 'Requirements' },
  { id: 'commitment', label: 'Before commitment' },
  { id: 'requests', label: 'Evidence requests' },
]

/** Readiness is one slide. Old chapter anchors open the supporting-assessment tab that now carries their content. */
export const legacyAnchors: Record<string, SupportingTab> = {
  overview: 'areas',
  assessment: 'areas',
  'proof-standards': 'requirements',
  'before-commitment': 'commitment',
  'critical-requirements': 'commitment',
  actions: 'requests',
}

export const railCopy = {
  overview: 'Overview',
  supporting: 'Supporting assessment',
  ratings: 'How ratings work',
}

export const overviewCopy = {
  headline: 'What must SERAA add for wealth?',
  finding: 'Wealth-specific readiness is not yet sufficiently assessed to define the build or investment required.',
  board: {
    label: 'Classification pending capability review',
    columns: [
      { id: 'reuse', label: 'Reuse', question: 'What already works for the chosen wealth workflow?' },
      { id: 'adapt', label: 'Adapt', question: 'What needs wealth-specific changes or integration?' },
      { id: 'build', label: 'Build', question: 'What assessed requirements are genuinely unmet?' },
    ],
    note: 'Missing evidence may require verification—not new engineering.',
  },
  deliverable: {
    tag: 'Next deliverable',
    title: 'Capability gap assessment for the proposed first offer',
    outputs: ['Existing capability and proof', 'Required changes and dependencies', 'Delivery effort and cost estimate'],
    support: 'Review Motilal delivery evidence to verify, Liquidity Pulse and relevant SERAA platform capabilities against the selected workflow.',
    participantsLabel: 'Proposed participants',
    participants: 'Platform + delivery + wealth reviewer',
  },
  starts: {
    label: 'Starting evidence',
    items: [
      { id: 'motilal', name: 'Motilal', status: 'Reported work' },
      { id: 'centrum', name: 'Centrum', status: 'Discovery' },
      { id: 'liquidity-pulse', name: 'Liquidity Pulse', status: 'POC' },
    ],
    note: 'Different starting points, not three confirmed wealth customers.',
  },
  buttons: ['Inspect capability questions', 'Supporting assessment'] as [string, string],
  /** Added to the starting-point evidence panel. */
  panelNotes: [
    {
      label: 'How to read the overview',
      items: [
        'The three initiatives are different starting points, not three confirmed wealth customers.',
        '“Not demonstrated in this review” does not mean the capability is absent.',
        'Verify Motilal’s entity, workflow, delivered scope, acceptance, outcomes, operating arrangements and reuse rights.',
        'Centrum discovery does not establish an accepted deployment.',
        'Liquidity Pulse remains a POC; quality, adoption and economics require evaluation.',
        'Accepted delivery and repeatability must be assessed for a defined wealth scope.',
        'This slide does not replace the existing readiness ratings or reclassify requirements.',
      ],
    },
    {
      label: 'Scope of this review',
      items: [
        'Production delivery readiness is unresolved in this review; it is not established as absent.',
        'Existing contractual commitments are outside this review unless specifically evidenced.',
        'A candidate workflow is needed for any assessment. This slide does not select or approve the launch offer.',
        'Assessment participants, named owner, access to evidence, effort, cost boundary and review date are to be agreed before work is authorised.',
        'Formal decision recording remains on the Decisions page.',
      ],
    },
  ],
}

/**
 * Plain-language review questions behind Reuse / Adapt / Build. They are questions, not confirmed product gaps. The
 * requirement ids link each to the existing records; the status stays "To assess" until a scoped review of the chosen
 * workflow says otherwise.
 */
export const capabilityQuestions = {
  title: 'Capability questions',
  eyebrow: 'Readiness · Reuse, adapt or build',
  intro: 'These are the questions the review must answer for the selected workflow. They are review questions, not confirmed product gaps.',
  status: 'To assess',
  items: [
    {
      id: 'permissions',
      title: 'Knowledge and permissions',
      question: 'Can existing retrieval respect document, user and client-access permissions?',
      refs: ['X2', 'X3'],
    },
    {
      id: 'understanding',
      title: 'Wealth-specific understanding',
      question: 'What terminology, product knowledge, business rules and workflow boundaries need adaptation?',
      refs: ['D1', 'D3', 'D4'],
    },
    {
      id: 'evaluation',
      title: 'Financial-output evaluation',
      question: 'How will financial facts, calculations, source accuracy and outdated information be evaluated for the selected task?',
      refs: ['T3', 'D3'],
    },
    {
      id: 'integration',
      title: 'System integration',
      question: 'Which relevant connections exist, and which require account-specific work?',
      refs: ['X1', 'X4'],
    },
    {
      id: 'operation',
      title: 'Controlled operation',
      question: 'What human review, monitoring, exception handling and support can be reused?',
      refs: ['T4', 'T5', 'T6', 'T2'],
    },
  ],
  outcomesLabel: 'The resulting assessment must distinguish',
  outcomes: [
    'Retrieve existing proof.',
    'Adapt or integrate.',
    'Build a confirmed missing capability.',
    'Resolve ownership or scope decisions.',
    'Further verification where a conclusion remains premature.',
  ],
}

export const assessmentCopy = {
  headline: 'Six areas to establish wealth credibility.',
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
