import type { DimensionId } from './requirements'

/**
 * Planning layer over the 28 requirement records. Nothing here changes a rating, an evidence statement, an owner or a
 * review date. Action types are planning labels, never readiness ratings. Missing evidence is not an absent capability.
 */

// ---------------------------------------------------------------- action types
export type ActionType = 'retrieve' | 'validate' | 'adapt' | 'develop' | 'decide'

export const actionTypeInfo: Record<ActionType, { label: string; text: string }> = {
  retrieve: { label: 'Retrieve existing evidence', text: 'Find existing acceptance records, reports, documents and test results.' },
  validate: { label: 'Validate', text: 'Test described behaviour or assumptions in the relevant environment, with the relevant people.' },
  adapt: { label: 'Adapt', text: 'Fit an existing capability to the wealth task or customer environment.' },
  develop: { label: 'Develop', text: 'Build what evidence has established as unmet.' },
  decide: { label: 'Decide', text: 'Assign ownership, agree supported scope or settle terms.' },
}

export const actionTypeNote =
  'Planning labels, not readiness ratings. Develop is marked only where evidence establishes an unmet requirement; no requirement is currently rated as a gap.'

/** The primary kind of work each requirement's recorded next action calls for. */
export const requirementAction: Record<string, ActionType> = {
  D1: 'validate', D2: 'decide', D3: 'validate', D4: 'validate',
  O1: 'retrieve', O2: 'adapt', O3: 'retrieve', O4: 'adapt', O5: 'decide',
  X1: 'validate', X2: 'validate', X3: 'retrieve', X4: 'validate',
  T1: 'retrieve', T2: 'retrieve', T3: 'validate', T4: 'validate', T5: 'retrieve', T6: 'validate',
  C1: 'validate', C2: 'retrieve', C3: 'validate', C4: 'retrieve',
  M1: 'validate', M2: 'validate', M3: 'decide', M4: 'validate', M5: 'retrieve',
}

// ---------------------------------------------------------------- three layers
/** Technical and offering dimensions separate what the platform has, what wealth needs and what a customer accepted. */
export const technicalDimensions: DimensionId[] = ['offerings', 'ecosystem', 'delivery']

export const layerLabels = {
  platform: 'SERAA platform foundation',
  adaptation: 'Wealth-specific adaptation',
  acceptance: 'Customer acceptance evidence',
}

export const layerText = {
  platformDescribed: 'Company-published SERAA descriptions exist (see sources). Not independently verified for this requirement.',
  platformUnknown: 'Platform support for this requirement has not been reviewed.',
  adaptation: 'To assess against the chosen workflow. Development is not marked as required.',
  acceptance: 'No customer acceptance evidence reviewed for this requirement.',
}

/** Other dimensions show the equivalent domain, customer or commercial work instead of a software template. */
export const nonTechnicalWork: Record<'domain' | 'customer' | 'commercial', { label: string; text: string }[]> = {
  domain: [
    { label: 'Existing basis', text: 'What the reviewed records describe about the wealth task.' },
    { label: 'Domain work', text: 'Expert definition, reference scenarios and review for the chosen task.' },
    { label: 'Customer confirmation', text: 'The user and business owner confirm the task, boundaries and completion criteria.' },
  ],
  customer: [
    { label: 'Existing basis', text: 'Discovery and reported work, as described to this project.' },
    { label: 'Customer work', text: 'Problem, sponsor, acceptance measures and adoption evidence to gather with the customer.' },
    { label: 'Reference rights', text: 'Permission to name the customer or use results, to be confirmed.' },
  ],
  commercial: [
    { label: 'Existing basis', text: 'No contracted buying or cost record was reviewed.' },
    { label: 'Commercial work', text: 'Buyer, budget route, pricing basis, cost drivers and terms to establish.' },
    { label: 'Customer evidence', text: 'An accepted price or contracted scope from a buyer.' },
  ],
}

// ---------------------------------------------------------------- capability tiles
/** Short presentation names and one-line findings for the six areas. Findings restate existing records; no rating is implied. */
export const areaTiles: Record<DimensionId, { title: string; finding: string }> = {
  domain: { title: 'Wealth expertise', finding: 'Workflow understanding; validation to establish' },
  offerings: { title: 'Defined offerings', finding: 'POC and discovery starting points' },
  ecosystem: { title: 'System fit', finding: 'Target interfaces to verify' },
  delivery: { title: 'Enterprise delivery', finding: 'Wealth-specific operating proof to review' },
  customer: { title: 'Customer proof', finding: 'Acceptance and outcomes to verify' },
  commercial: { title: 'Commercial viability', finding: 'Demand and economics to validate' },
}

// ---------------------------------------------------------------- dimension rows
export const dimensionPlan: Record<DimensionId, { question: string; next: string }> = {
  domain: { question: 'Can we define and evaluate the wealth task?', next: 'Validate one workflow with a named wealth reviewer.' },
  offerings: { question: 'Is there a defined solution customers can buy?', next: 'Review the Liquidity Pulse build and retrieve the Motilal scope evidence.' },
  ecosystem: { question: 'Can it work with the firm’s systems and sources?', next: 'Name the target systems; test access, interfaces and source rights.' },
  delivery: { question: 'Can we deploy and support it reliably?', next: 'Review assurance documents and scope a wealth-specific quality evaluation.' },
  customer: { question: 'Has a customer accepted useful outcomes?', next: 'Confirm entity, scope and acceptance for the reported delivery.' },
  commercial: { question: 'Will customers pay enough for viable delivery?', next: 'Verify the buyer and budget route; separate implementation from operating cost.' },
}

// ---------------------------------------------------------------- before customer commitment
export type StageId = 'discovery' | 'poc' | 'production' | 'reuse'

export const stages: { id: StageId; label: string }[] = [
  { id: 'discovery', label: 'Discovery' },
  { id: 'poc', label: 'Bounded POC' },
  { id: 'production', label: 'Production' },
  { id: 'reuse', label: 'Reusable expansion' },
]

export interface CommitmentCheck {
  id: string
  title: string
  /** Existing requirement records that bear on this check. */
  refs: string[]
  next: string
  /** Proposed applicability only; to confirm for the chosen workflow. */
  stages: StageId[]
}

export interface CommitmentGate {
  id: 'information' | 'acceptable' | 'operate'
  number: number
  question: string
  checks: CommitmentCheck[]
}

/** Three assessment categories, not a completed sequence. */
export const commitmentGates: CommitmentGate[] = [
  {
    id: 'information',
    number: 1,
    question: 'Can we use the information?',
    checks: [
      { id: 'source', title: 'Source rights', refs: ['X3'], next: 'Confirm intended use, audience, terms, retention and permissions for each source.', stages: ['discovery', 'poc', 'production'] },
      { id: 'access', title: 'Authorised access', refs: ['X2', 'T2'], next: 'Test allowed and denied access, revocation and data handling for client records.', stages: ['discovery', 'poc', 'production'] },
    ],
  },
  {
    id: 'acceptable',
    number: 2,
    question: 'Does it work acceptably?',
    checks: [
      { id: 'quality', title: 'Domain-reviewed quality', refs: ['D3', 'T3', 'O1'], next: 'Establish expert-reviewed cases, severity criteria and baselines for the chosen workflow.', stages: ['poc', 'production', 'reuse'] },
      { id: 'review', title: 'Review and exceptions', refs: ['D4', 'T4'], next: 'Map the permitted task, decision owner, review and escalation boundaries.', stages: ['poc', 'production'] },
      { id: 'acceptance', title: 'Customer acceptance', refs: ['C1', 'C2', 'C3'], next: 'Confirm the problem, sponsor, scope and acceptance measures with the customer.', stages: ['discovery', 'poc', 'production'] },
    ],
  },
  {
    id: 'operate',
    number: 3,
    question: 'Can we operate it responsibly?',
    checks: [
      { id: 'operating', title: 'Operating ownership', refs: ['T5', 'T6', 'M3'], next: 'Name the service owner; define monitoring, incident ownership, support and change control.', stages: ['poc', 'production', 'reuse'] },
      { id: 'economics', title: 'Delivery economics', refs: ['M1', 'M2'], next: 'Separate implementation from recurring cost; verify buyer, budget route and charging basis.', stages: ['production', 'reuse'] },
    ],
  },
]

export const commitmentCopy = {
  headline: 'What must we establish before committing?',
  qualification: 'Applicability and evidence must be assessed for the chosen workflow.',
  status: 'To assess',
  statusNote: 'No workflow-specific assessment exists yet.',
  stageButton: 'Checks by deployment stage',
  stageNote: 'A filter for which checks may apply, not a progress tracker. Stage mapping is proposed.',
  closing: 'Resolve critical requirements before making the commitment that depends on them.',
}

// ---------------------------------------------------------------- capability panel
/**
 * The three short statements shown for each selected area. "Not yet established" refers to this review, not to a
 * confirmed absence. Bases are checked against the requirement records and the starting-point register: where a
 * proposed statement went beyond them it was narrowed (wealth expertise, system fit, enterprise delivery,
 * commercial viability). Actions and outputs are proposals, not assigned work.
 */
export const areaPanel: Record<DimensionId, { basis: string; notYet: string; action: string; output: string }> = {
  domain: {
    basis: 'Centrum discovery and Liquidity Pulse identify RM, service, processing and oversight needs.',
    notYet: 'A named wealth reviewer and agreed rules for evaluating the selected task.',
    action: 'Assign a wealth expert to define and evaluate the first workflow.',
    output: 'Agreed workflow boundaries and expert-reviewed test cases.',
  },
  offerings: {
    basis: 'Liquidity Pulse provides a POC; Centrum discovery informs potential service and oversight solutions.',
    notYet: 'A maintained package with defined scope, prerequisites and acceptance criteria.',
    action: 'Review existing assets and specify one candidate package.',
    output: 'Package definition separating reusable elements from customer-specific work.',
  },
  ecosystem: {
    basis: 'Discovery discusses differentiated access and channel preferences; integration claims reviewed are general.',
    notYet: 'Target-account interfaces, permissions and source-use rights.',
    action: 'Assess the selected workflow in the customer’s actual environment.',
    output: 'Integration and access plan with dependencies and effort.',
  },
  delivery: {
    basis: 'Company-published assurance, governance and lifecycle claims give a starting point for review.',
    notYet: 'Workflow-specific security, quality and operating evidence.',
    action: 'Review existing assurance evidence and test the chosen deployment scope.',
    output: 'Evaluation plan and proposed operating responsibilities.',
  },
  customer: {
    basis: 'Motilal agent work is reported; Centrum discovery captures customer requirements.',
    notYet: 'Accepted scope, measurable outcomes and reference permissions for relevant delivery.',
    action: 'Retrieve delivery and acceptance evidence, starting with Motilal.',
    output: 'Scoped customer case brief with verified results and limitations.',
  },
  commercial: {
    basis: 'Motilal and Centrum are named account relationships where demand can be investigated.',
    notYet: 'Willingness to pay, delivery cost and sustainable operating economics.',
    action: 'Build an account-specific commercial case with sales, delivery and finance.',
    output: 'Proposed price and cost estimate with explicit assumptions.',
  },
}

export const areaPanelLabels = { basis: 'Current basis', notYet: 'Not yet established', action: 'Recommended action', output: 'Output:' }
