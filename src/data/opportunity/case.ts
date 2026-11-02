import type { SourceId } from '../types'
import { marketCompanies, categoryOf, type CompanyCategoryId, type MarketCompany } from './marketCompanies'
import type { Tone } from './opening'

/**
 * Business-case content for the seven Opportunity chapters, written for a senior leader.
 *
 * Everything here reuses existing research, source ids and status wording. Nothing adds a score, forecast, price,
 * market size or account intelligence that the research does not support. Where a fact is missing the page says
 * `notEstablished`. Counts are derived from `marketCompanies`; never type them by hand.
 */

export const notEstablished = 'Not established'

/** The five kinds of statement kept visibly apart. Never merged into one claim. */
export type CaseTag = 'published' | 'reported' | 'proposed' | 'hypothesis' | 'unresolved'

export const caseTags: Record<CaseTag, string> = {
  published: 'Published external finding',
  reported: 'Team-reported activity',
  proposed: 'Proposed direction',
  hypothesis: 'Commercial hypothesis',
  unresolved: 'Unresolved input',
}

/* ---------------------------------------------------------------- 1. Overview */

export const overview = {
  eyebrow: 'The business judgement',
  entry: 'Proposed entry: accessible non-bank wealth businesses, starting with a measurable workflow gap.',
  modelLabel: 'Proposed business model',
  modelNote: 'A proposed model, not evidence of existing sales.',
  model: [
    { id: 'problem', label: 'Customer problem', text: 'RM, service or operational friction.' },
    { id: 'offering', label: 'SERAA-enabled offering', text: 'Scoped solution, integration and support.' },
    { id: 'value', label: 'Commercial value', text: 'Measurable customer benefit and viable contract economics.' },
  ],
  evidenceLabel: 'Entry evidence',
  evidence: [
    { name: 'Motilal', basis: 'Reported agent work' },
    { name: 'Centrum', basis: 'Discovery' },
    { name: 'Liquidity Pulse', basis: 'POC' },
  ],
  considerationsLabel: 'Strategic considerations',
  considerations: [
    { id: 'alternatives', label: 'Alternatives', text: 'Installed platforms, specialists and internal teams.' },
    { id: 'dependencies', label: 'Delivery dependencies', text: 'Customer systems, approved sources and partners.' },
  ],
  boundary: 'Paid demand, differentiation and economics remain to be established.',
  next: 'Develop an account-specific offering and initial commercial case.',
}

/* ------------------------------------------------------------------ 2. Market */

export type PursuitGroupId = 'start' | 'expand' | 'dependent'

export interface PursuitGroup {
  id: PursuitGroupId
  step: number
  label: string
  who: string
  why: string
  tone: Tone | 'navy'
}

export const marketCase = {
  eyebrow: 'Market · Where is the plausible buyer?',
  headline: 'Start where access and workflow fit intersect.',
  landscapeLabel: 'Proposed pursuit directions',
  landscapeNote: 'Proposed pursuit directions, not measured attractiveness. Selected research list · qualification pending · not national market size.',
  populationsLabel: 'Three different populations',
  populations: [
    { id: 'buyer', label: 'Buying organisation or unit', text: 'The account that contracts.' },
    { id: 'users', label: 'Users', text: 'RMs, service and operations teams.' },
    { id: 'investors', label: 'Investor segments', text: 'HNI and UHNI: the firm’s clients, not our default purchaser.' },
  ],
  implication: 'Qualify the buying unit and workflow; a firm name alone is not an opportunity.',
}

export const pursuitGroups: PursuitGroup[] = [
  {
    id: 'start',
    step: 1,
    label: 'Start here',
    who: 'Accessible non-bank wealth businesses',
    why: 'Existing access, and RM, service and operating workflows that recur.',
    tone: 'teal',
  },
  {
    id: 'expand',
    step: 2,
    label: 'Expand selectively',
    who: 'Comparable wealth and advisory firms, and selected PMS businesses',
    why: 'Similar workflows, qualified against the same conditions.',
    tone: 'blue',
  },
  {
    id: 'dependent',
    step: 3,
    label: 'Account-dependent',
    who: 'Bank wealth units and distribution platforms',
    why: 'The sponsoring unit, shared platforms and buying route decide whether a pursuit is practical.',
    tone: 'navy',
  },
]

/** Start: non-bank firms with a reported relationship or discovery. Expand: other non-bank firms and portfolio managers. */
export function pursuitGroupOf(company: MarketCompany): PursuitGroupId {
  if (company.category === 'non-bank' && company.status !== 'candidate') return 'start'
  if (company.category === 'non-bank' || company.category === 'portfolio') return 'expand'
  return 'dependent'
}

export function companiesInGroup(id: PursuitGroupId): MarketCompany[] {
  return marketCompanies.filter((company) => pursuitGroupOf(company) === id)
}

/** Example names shown on the landscape, per group. Each must match an entry in `marketCompanies`. */
export const groupExamples: Record<PursuitGroupId, string[]> = {
  start: ['motilal-oswal-private-wealth', 'centrum-wealth'],
  expand: ['360-one', 'nuvama', 'anand-rathi-wealth', 'abakkus'],
  dependent: ['kotak-private', 'hdfc-bank-wealth', 'prudent-corporate'],
}


/* ----------------------------- account explorer: category-level hypotheses */

/** Proposed, to confirm per account. Never presented as account intelligence. */
export const categoryHypotheses: Record<CompanyCategoryId, { users: string; sponsor: string; workflow: string }> = {
  'non-bank': {
    users: 'RMs, service managers, client servicing and operations teams.',
    sponsor: 'Wealth, service or operations leadership (COO).',
    workflow: 'An RM briefing, knowledge or service-support, or operations workflow with a measurable gap.',
  },
  bank: {
    users: 'RMs and service teams in the sponsoring wealth or private-banking unit.',
    sponsor: 'Wealth-unit leadership; shared bank platforms and vendor onboarding also apply.',
    workflow: 'Depends on the unit that would sponsor; to identify.',
  },
  portfolio: {
    users: 'Client-servicing and distributor-support teams.',
    sponsor: 'Leadership of the investment-management unit.',
    workflow: 'Client or distributor servicing, rather than fund management; to confirm.',
  },
  distribution: {
    users: 'Partner-facing support teams, at the platform or its distributors.',
    sponsor: 'Platform leadership, if it buys centrally for its partners.',
    workflow: 'A partner-facing support workflow; central or per-partner purchase to confirm.',
  },
}

export interface AccountFacts {
  access?: string
  systems?: { text: string; sources: SourceId[] }
  workflow?: string
}

/** Account-specific facts that exist in the research. Anything absent from here reads "Not established". */
export const accountFacts: Record<string, AccountFacts> = {
  'motilal-oswal-private-wealth': {
    access: 'Reported Covasant agent work. Division, scope, production status and acceptance not established.',
    workflow: 'An operational workflow adjacent to the reported agent work, once division and scope are confirmed.',
  },
  'centrum-wealth': {
    access: 'Discovery calls complete. Proposed AI agent options sent and under review by Centrum; no statement of work.',
    workflow: 'RM knowledge, service information or compliance and oversight support, from discovery.',
  },
  nuvama: {
    systems: {
      text: 'Reports technology, AI and productivity initiatives within its Wealth business. Their scope, and whether they are built or bought, are not established.',
      sources: ['S04'],
    },
  },
  'anand-rathi-wealth': {
    systems: { text: 'Annual report describes an existing RM Workstation. What it leaves uncovered is not established.', sources: ['S18'] },
  },
  'prudent-corporate': {
    systems: { text: 'Describes edge+, an AI tool offered free to its partners in beta. What it leaves unmet is not established.', sources: ['S48'] },
  },
}

/* ------------------------------------------------------------------ 3. Demand */

export interface DemandProblem {
  id: 'briefing' | 'information' | 'processing' | 'oversight'
  title: string
  role: string
  today: string
  support: string
  value: string
  /** The one evidence/status line shown beneath the example. */
  evidenceLine: string
  detail: {
    problem: string
    users: string
    evidence: string
    existing: string
    proposed: string
    dependencies: string[]
    measures: string[]
  }
}

export const demandCase = {
  eyebrow: 'Demand · Which problems could justify investment?',
  heading: 'Where could SERAA help?',
  subheading: 'Illustrative opportunities to validate with customers.',
  selectorLabel: 'Customer problem',
  relationshipLabel: 'A proposed change to the work, not sequential workflow steps',
  columns: { today: 'Today', support: 'Possible SERAA support', value: 'Value to test' },
  evidenceButton: 'View evidence & measures',
  implication: 'Confirm the customer problem, existing alternatives and measurable value before proposing a solution.',
}

export const demandProblems: DemandProblem[] = [
  {
    id: 'briefing',
    title: 'Too much briefing preparation',
    role: 'RM / Investment team',
    today: 'RM gathers market updates and prepares a briefing.',
    support: 'Draft a briefing from selected sources for review.',
    value: 'Less preparation effort with acceptable factual and source quality.',
    evidenceLine: 'Starting asset: Liquidity Pulse POC. Quality and customer value require validation.',
    detail: {
      problem: 'Relationship managers spend time gathering market updates and preparing briefings.',
      users: 'Relationship managers and investment team members.',
      evidence: 'Liquidity Pulse: an RM market-intelligence POC reported by the team. Report quality not yet evaluated. Date not established in the research reviewed.',
      existing: 'Existing: the Liquidity Pulse POC.',
      proposed: 'Proposed: drafting a briefing from selected sources for RM review. This is not delivered capability.',
      dependencies: ['Licensed content and the right to use it in outputs.', 'Reviewer acceptance of factual and source quality.', 'The customer’s existing briefing process and tools.'],
      measures: ['Preparation effort', 'Factual and source quality', 'Repeat use'],
    },
  },
  {
    id: 'information',
    title: 'Hard-to-find approved information',
    role: 'RM / Client service',
    today: 'Staff search documents or ask colleagues for an answer.',
    support: 'Retrieve approved information with source references and appropriate access.',
    value: 'Faster answers with acceptable accuracy and traceability.',
    evidenceLine: 'Starting evidence: Centrum discovery. Proposed solution; delivery not established.',
    detail: {
      problem: 'Staff cannot easily find reliable product, client and process information.',
      users: 'Relationship managers and client service staff.',
      evidence: 'Centrum discovery calls: RM knowledge and service-information needs. Proposed options are under review by Centrum; no agreed scope or statement of work. Date not established in the research reviewed.',
      existing: 'Existing: discovery findings only.',
      proposed: 'Proposed: retrieval of approved information with source references and access controls. No delivered product is established.',
      dependencies: ['Access to approved content sources.', 'A permissions model matching staff entitlements.', 'Knowledge tools the customer may already use.'],
      measures: ['Search or resolution time', 'Answer accuracy', 'Source validity'],
    },
  },
  {
    id: 'processing',
    title: 'Delayed client processing',
    role: 'Onboarding / Operations',
    today: 'Operations checks documents and follows up on missing information.',
    support: 'Assist document checks, flag missing items and route exceptions for review.',
    value: 'Less rework and faster processing without weakening required checks.',
    evidenceLine: 'Illustrative workflow. Relevant Motilal scope and reusable capability require verification.',
    detail: {
      problem: 'Document checking and follow-up on missing information slow client processing and create rework.',
      users: 'Onboarding and operations teams.',
      evidence: 'Illustrative workflow. Motilal Oswal agent work is reported by the team; division, scope, production status and outcomes are not established. This onboarding workflow is not claimed as delivered there.',
      existing: 'Existing: reported agent work at Motilal, scope unverified.',
      proposed: 'Proposed: document-check assistance, missing-item flags and exception routing. Reuse of any existing capability is unverified.',
      dependencies: ['Verification of the Motilal scope and reuse rights.', 'The customer’s required checks and approval rules.', 'Integration with onboarding systems.'],
      measures: ['Turnaround', 'Rework', 'Exception handling', 'Missed checks'],
    },
  },
  {
    id: 'oversight',
    title: 'Unclear compliance status',
    role: 'Compliance / Management',
    today: 'Teams track deadlines, completion and supporting evidence across records.',
    support: 'Consolidate obligations, reminders and completion evidence for review.',
    value: 'Clearer status and fewer missed follow-ups.',
    evidenceLine: 'Starting evidence: Centrum requirements. Applicable obligations and solution scope require domain review.',
    detail: {
      problem: 'Deadlines, completion and supporting evidence sit across separate records, so status is hard to see.',
      users: 'Compliance teams and management.',
      evidence: 'Centrum discovery: calendar, reminder and evidence requirements. No published external finding is cited for this problem. Date not established in the research reviewed.',
      existing: 'Existing: discovery requirements only.',
      proposed: 'Proposed: consolidated obligations, reminders and completion evidence for review. This does not establish regulatory compliance or guarantee prevention of missed obligations.',
      dependencies: ['Domain review of applicable obligations.', 'A customer-owned definition of completion evidence.', 'Existing compliance tools and records.'],
      measures: ['Status accuracy', 'Follow-up completion', 'Evidence completeness'],
    },
  },
]

/* ------------------------------------------------------------- 4. Competition */

export const competitionCase = {
  eyebrow: 'Competition · What must we beat or complement?',
  headline: 'Existing tools set the bar for SERAA.',
  landscapeLabel: 'Who competes for the customer’s investment',
  landscapeNote: 'Published offerings; capabilities overlap. Target-account suitability requires assessment.',
  takeaway: 'Generic assistants, connected agents and implementation alone do not establish differentiation.',
  moveTag: 'Proposed next move',
  move: 'Identify an account-specific workflow advantage. Compare customer value, delivery effort and full cost.',
  evidenceButton: 'Competitor evidence',
  implicationsButton: 'First-offer implications',
  groupAction: 'Inspect',
  findingsLabel: 'What competition means for SERAA',
  findingColumns: { provider: 'Named alternative', capability: 'Published capability', implication: 'Implication for SERAA' },
  findingsNote: 'Provider-published capabilities; performance and target-account suitability have not been independently tested.',
  directionTag: 'Proposed direction',
  direction: 'Build the first offer around a customer-specific advantage we can demonstrate.',
  directionSupport: 'Use existing account access to compare actual alternatives, customer value and delivery cost.',
  actionsLabel: 'What this changes for our first offer',
  actionsNote: 'Proposed assessment actions, not completed comparisons. The launch decision remains unresolved.',
  conditionsNote: 'Conditions to substantiate—not proven advantages.',
  responseLabel: 'Account-level assessment paths',
  responseNote: 'Conditional choices to assess per account, not an automatic recommendation or an existing partnership.',
  compareButton: 'Compare published offerings',
  differentiationButton: 'Inspect proposed differentiation',
  mayAlreadyMeet: 'Native tooling or another supplier may already meet a requirement. The opportunity depends on a worthwhile remaining gap.',
  questionsLabel: 'Ask at each account',
  questions: ['What exists today?', 'What is missing?', 'Why would the customer pay us?'],
  implication: 'Win on account-specific fit, accepted outcomes and delivery economics.',
  nextAction: 'Compare the chosen workflow against the customer’s actual alternatives.',
}

export interface CompetitiveFinding {
  id: string
  headline: string
  provider: string
  capability: string
  implication: string
  source: SourceId
}

export const competitiveFindings: CompetitiveFinding[] = [
  {
    id: 'native',
    headline: 'Native RM assistance already exists',
    provider: 'Salesforce',
    capability: 'Meeting preparation, portfolio summaries and wealth-specific actions.',
    implication: 'Compare our RM offer with the customer’s available platform features.',
    source: 'S08',
  },
  {
    id: 'connected',
    headline: 'Connected wealth AI already exists',
    provider: 'CogniCor',
    capability: 'Client context, enterprise search, CRM integration and workflow automation.',
    implication: 'Connecting information and agents alone will not differentiate SERAA.',
    source: 'S49',
  },
  {
    id: 'packaged',
    headline: 'Packaged AI delivery already exists',
    provider: 'Accenture Trusted Wealth Ops',
    capability: 'A wealth proposition combining Salesforce, Claude and industry workflow delivery.',
    implication: 'Implementation and operating ownership alone are insufficient differentiation.',
    source: 'S11',
  },
]

export const firstOfferActions: { id: string; name: string; action: string; startingPoint: 'centrum' | 'liquidity-pulse' | 'motilal' }[] = [
  { id: 'service', name: 'Relationship/service support', action: 'Compare against existing knowledge, search and CRM tools.', startingPoint: 'centrum' },
  { id: 'liquidity', name: 'Liquidity Pulse', action: 'Compare against current briefing and research/reporting alternatives: usefulness, source coverage, preparation effort and full cost.', startingPoint: 'liquidity-pulse' },
  { id: 'motilal', name: 'Motilal assets', action: 'Confirm delivered scope and potentially reusable assets before proposing additional build.', startingPoint: 'motilal' },
]

export interface LandscapeGroup {
  id: 'platforms' | 'ai' | 'delivery' | 'internal'
  name: string
  tone: Tone | 'navy'
  /** Names shown in the lane. */
  names: string[]
  descriptor: string
  /** Ids from `competitors` covered by this group. */
  competitorIds: string[]
}

export const landscapeGroups: LandscapeGroup[] = [
  {
    id: 'platforms',
    name: 'Existing platforms',
    tone: 'blue',
    names: ['Salesforce', 'WealthSpectrum', 'Intellect'],
    descriptor: 'Core wealth and CRM capabilities',
    competitorIds: ['wealthspectrum', 'intellect', 'salesforce'],
  },
  {
    id: 'ai',
    name: 'Wealth AI products',
    tone: 'violet',
    names: ['TIFIN', 'CogniCor'],
    descriptor: 'Advisor intelligence and workflow AI',
    competitorIds: ['tifin', 'cognicor'],
  },
  {
    id: 'delivery',
    name: 'Delivery providers',
    tone: 'amber',
    names: ['Accenture'],
    descriptor: 'Industry solutions and implementation',
    competitorIds: ['accenture'],
  },
  {
    id: 'internal',
    name: 'Internal teams',
    tone: 'navy',
    names: ['Customer technology teams'],
    descriptor: 'Customer-specific tools and development',
    competitorIds: ['internal'],
  },
]

export interface OpeningCondition {
  id: 'fit' | 'quality' | 'economics'
  title: string
  text: string
  /** What would substantiate it, by area. */
  substantiate: { area: string; evidence: string }[]
  /** Existing evidence only. */
  existing: string
}

export const openingConditions: OpeningCondition[] = [
  {
    id: 'fit',
    title: 'Workflow fit',
    text: 'A worthwhile gap remains beyond existing tools.',
    substantiate: [
      { area: 'Customer workflow fit', evidence: 'A named workflow, its owner and what the installed platform, specialist product or internal team already covers.' },
    ],
    existing: 'Native tooling or another supplier may already meet a requirement. Centrum has described RM knowledge, service and oversight needs in discovery; no scope is agreed.',
  },
  {
    id: 'quality',
    title: 'Domain quality',
    text: 'Outputs and outcomes withstand wealth-specific evaluation.',
    substantiate: [
      { area: 'Domain evaluation', evidence: 'Review of outputs by wealth practitioners against an agreed method.' },
      { area: 'Accepted outcomes', evidence: 'Outcomes the customer has defined as acceptable and measured against its own baseline.' },
    ],
    existing: 'Liquidity Pulse report quality has not yet been evaluated. No customer results are established.',
  },
  {
    id: 'economics',
    title: 'Delivery economics',
    text: 'Integration and ongoing operation justify the purchase.',
    substantiate: [
      { area: 'Integration effort', evidence: 'Effort to connect to the customer’s approved systems and access.' },
      { area: 'Operating ownership', evidence: 'Who runs, supports and maintains the solution, as agreed with the customer.' },
      { area: 'Economics', evidence: 'Full delivery and operating cost set against the customer’s accepted value, compared with buying or building.' },
    ],
    existing: 'Reuse and falling delivery cost have not yet been demonstrated. Implementation and operation alone are not a unique differentiator: packaged solutions with specialist delivery already exist.',
  },
]

export const accountResponses: { condition: string; response: string }[] = [
  { condition: 'Existing tooling meets the need', response: 'Assess configuration or extension.' },
  { condition: 'A specialist product fits', response: 'Assess integration or delivery participation.' },
  { condition: 'A valuable gap remains', response: 'Compare a SERAA-enabled solution with buying or building alternatives.' },
]

export interface AlternativeColumn {
  id: 'installed' | 'specialist' | 'internal' | 'covasant'
  name: string
  basis: string
  /** Ids from `competitors`, shown as expandable examples. */
  examples: string[]
}

export const alternativeColumns: AlternativeColumn[] = [
  { id: 'installed', name: 'Installed wealth or CRM platform', basis: 'Vendor-published scope', examples: ['wealthspectrum', 'intellect', 'salesforce'] },
  { id: 'specialist', name: 'Specialist product', basis: 'Vendor-published scope', examples: ['tifin', 'cognicor', 'accenture'] },
  { id: 'internal', name: 'Internal development', basis: 'Customer-specific, to assess', examples: ['internal'] },
  { id: 'covasant', name: 'Covasant / SERAA', basis: 'Proposed', examples: [] },
]

export const alternativeRows: { id: string; label: string; cells: Record<AlternativeColumn['id'], string> }[] = [
  {
    id: 'scope',
    label: 'Workflow scope',
    cells: {
      installed: 'Portfolios, reporting, operations, client context and advisor assistance.',
      specialist: 'Advisor assistants, meeting workflows and connected wealth agents.',
      internal: 'Whatever the customer’s teams, prototypes and tools cover.',
      covasant: 'One bounded workflow with a gap beyond existing tools.',
    },
  },
  {
    id: 'fit',
    label: 'Fit with existing systems',
    cells: {
      installed: 'Already in the customer’s estate, where installed.',
      specialist: 'Documented integrations where published; otherwise to assess.',
      internal: 'Built around the customer’s own systems.',
      covasant: 'Integration to assess at each account.',
    },
  },
  {
    id: 'implementation',
    label: 'Implementation responsibility',
    cells: {
      installed: 'Vendor or the customer’s existing providers.',
      specialist: 'Vendor-led, or packaged with a delivery partner.',
      internal: 'Customer technology team and existing providers.',
      covasant: 'Covasant, with scope to agree.',
    },
  },
  {
    id: 'operating',
    label: 'Ongoing operating responsibility',
    cells: {
      installed: 'Per vendor terms; confirm per account.',
      specialist: 'Per vendor terms; confirm per account.',
      internal: 'The customer’s own team.',
      covasant: 'Covasant support or managed service, where agreed.',
    },
  },
]

/* ----------------------------------------------------------- 6. Covasant fit */

export const fitCase = {
  eyebrow: 'Covasant fit · Why do we have a plausible entry?',
  headline: 'Existing wealth activity gives us a starting foothold.',
  support: 'Build from account experience, customer discovery and an RM intelligence POC.',
  columns: { asset: 'Starting point', supports: 'Why it matters', establish: 'Next proof needed' },
  qualification: 'Different starting points—not three confirmed wealth customers or proof of repeatable delivery.',
  routeLabel: 'Proposed route',
  routeHeading: 'How we turn this foothold into a wealth offering',
  route: [
    { id: 'account', title: 'Existing account', label: 'Confirm access' },
    { id: 'workflow', title: 'Valuable workflow', label: 'Establish the gap' },
    { id: 'outcome', title: 'Accepted customer outcome', label: 'Prove value' },
    { id: 'offer', title: 'Reusable offer', label: 'Test transfer' },
  ],
  routeNote: 'A proposed sequence, not completed progress.',
  recommendation: 'Use existing account access to select and prove the first offer.',
  recommendationSupport: 'Liquidity Pulse provides an intelligence POC to evaluate alongside the relationship/service candidate.',
  readinessLabel: 'Full capability assessment',
}

export const fitRows: { id: 'motilal' | 'centrum' | 'liquidity-pulse'; basis: string; supports: string; establish: string }[] = [
  {
    id: 'motilal',
    basis: 'Reported agent work',
    supports: 'Potential delivery experience and reusable assets.',
    establish: 'Delivered scope, customer acceptance and reuse rights.',
  },
  {
    id: 'centrum',
    basis: 'Discovery',
    supports: 'Direct insight into wealth service and oversight needs.',
    establish: 'Priority workflow, sponsor and buying route.',
  },
  {
    id: 'liquidity-pulse',
    basis: 'POC',
    supports: 'A tangible RM intelligence concept to demonstrate and evaluate.',
    establish: 'Usefulness, quality, source rights and operating cost.',
  },
]

/* ------------------------------------------------------- 7. Commercial potential */

const TBE = 'To establish'

export const commercialCase = {
  eyebrow: 'Commercial potential · How could this become a viable business?',
  headline: 'A proposed revenue model. Economics to prove.',
  support: 'Implementation fees plus recurring solution and support charges.',
  modelLabel: 'Proposed commercial model',
  value: {
    label: 'Customer value',
    question: 'Why would they pay?',
    items: ['Less preparation effort', 'Faster service or processing', 'Reliable, useful outputs'],
    note: 'Benefits to validate against the current workflow and existing tools.',
  },
  revenue: {
    label: 'Proposed revenue',
    question: 'What could we charge for?',
    oneOff: { tag: 'One-off', title: 'Implementation', text: 'Integration · Configuration · Deployment' },
    recurring: { tag: 'Recurring', title: 'Solution and support', text: 'Agreed access · Support · Ongoing operation' },
    note: 'Third-party charges may be billed separately where agreed.',
  },
  economics: {
    label: 'Delivery economics',
    question: 'What must the fees cover?',
    initial: { tag: 'Initial delivery', text: 'Account setup · Integration · Evaluation' },
    ongoing: { tag: 'Ongoing operation', text: 'Models and data · Support · Maintenance' },
  },
  expansion: {
    label: 'Expansion test',
    first: { tag: 'First account', text: 'Establish value, price and delivery cost.' },
    comparable: { tag: 'Comparable account', text: 'Measure what transfers and what must be adapted.' },
    question: 'Can we repeat the offer with viable adaptation and support cost?',
  },
  next: 'Next: cost and price one account-specific offer.',
  nextLabels: ['Target account', 'Buyer', 'Scoped offer', 'Proposed price', 'Delivery estimate'],
  detailButton: 'Commercial assumptions',
  detailTitle: 'Commercial assumptions',
  tbe: TBE,
}

export interface CommercialDetailGroup {
  id: 'value' | 'pricing' | 'delivery' | 'repeat'
  title: string
  items: { label: string; text: string }[]
  note?: string
}

export const commercialDetailGroups: CommercialDetailGroup[] = [
  {
    id: 'value',
    title: '1. Customer value',
    items: [
      { label: 'Workflow baseline and users', text: `${TBE}. The measured problem today and who performs it.` },
      { label: 'Expected benefit and measurement', text: `${TBE}. The outcome the customer would accept, and how it will be measured.` },
      { label: 'Existing alternatives', text: `${TBE}. Native tooling, specialist products and internal options at the target account.` },
      { label: 'Sponsor, budget owner and willingness to pay', text: `${TBE}. Who owns the budget, and what they would pay for the outcome.` },
    ],
    note: 'Time saved is not automatically cash saved.',
  },
  {
    id: 'pricing',
    title: '2. Pricing hypothesis',
    items: [
      { label: 'Implementation scope and proposed fee', text: `${TBE}. Integration, configuration and deployment for the account. No price is proposed.` },
      { label: 'Recurring scope, charging basis and service obligations', text: `${TBE}. Recurring revenue must correspond to an agreed continuing service or entitlement.` },
      { label: 'Included usage', text: TBE },
      { label: 'Third-party costs', text: `${TBE}. Third-party model, data or platform charges may be billed separately where agreed; they are not a revenue source.` },
    ],
    note: 'No prices or commercial commitments are established. Not every customer would buy implementation, software access and managed operation together.',
  },
  {
    id: 'delivery',
    title: '3. Delivery estimate',
    items: [
      { label: 'Initial implementation effort', text: `${TBE}. Account setup, integration and evaluation.` },
      { label: 'Ongoing operating cost', text: `${TBE}. Models and data, support and maintenance.` },
      { label: 'Integration and licensing dependencies', text: `${TBE}. Directly attributable third-party costs are included here, even when passed through to the customer.` },
      { label: 'Support, maintenance and evaluation effort', text: TBE },
      { label: 'Shared product or wealth-adaptation investment', text: `${TBE}. Shown separately from account delivery cost.` },
      { label: 'Cost uncertainty and sensitivity to usage', text: TBE },
    ],
  },
  {
    id: 'repeat',
    title: '4. Repeatability',
    items: [
      { label: 'Assets expected to transfer', text: `${TBE}. Reuse has not yet been demonstrated.` },
      { label: 'Account-specific adaptation', text: `${TBE}. The work that remains specific to each account.` },
      { label: 'Rights to reuse', text: `${TBE}. Including source, data and customer-asset rights.` },
      { label: 'Evidence needed from a comparable account', text: `${TBE}. What transfers, what must be adapted, and at what support cost.` },
    ],
    note: 'Falling delivery cost and improved margins have not been demonstrated.',
  },
]

export const notComputed =
  'This is a commercial hypothesis, not a revenue forecast. No market size, price or revenue is calculated: registrations, investor assets, user headcounts and the research list are not inputs to a revenue estimate.'

/** Convenience for components that need a company's category tone. */
export function toneOfCompany(company: MarketCompany) {
  return categoryOf(company.category).tone
}
