import type { SourceId } from '../types'

/**
 * Wealth capability map: what Covasant would need to be able to do, repeatedly, for a wealth customer.
 *
 * The classification is a planning label. It is deliberately separate from the Readiness 0-3 / Unverified scale
 * (data/readiness/ratings.ts) and must never be averaged, counted into a score or shown as a rating. A row is
 * 'Not yet classified' where the evidence reviewed is insufficient to choose; missing evidence does not establish a
 * missing capability. No row is 'Available' because none has reviewed evidence of accepted, supported use.
 *
 * Each row keeps three kinds of evidence apart: what the SERAA platform is described as offering, what wealth-specific
 * adaptation the selected workflow would need, and customer acceptance. A gap in one is not a finding about the others.
 */
export type CapabilityClass =
  | 'Available'
  | 'Needs verification'
  | 'Needs adaptation'
  | 'Needs development'
  | 'Not yet classified'

export const capabilityClasses: { label: CapabilityClass; meaning: string }[] = [
  { label: 'Available', meaning: 'Reviewed evidence shows it exists and is usable for this purpose.' },
  { label: 'Needs verification', meaning: 'Something relevant is described or claimed; it has not been inspected or tested.' },
  { label: 'Needs adaptation', meaning: 'A verified asset exists but must be changed for wealth enterprise use.' },
  { label: 'Needs development', meaning: 'The evidence explicitly establishes the capability is missing, so new work is required.' },
  { label: 'Not yet classified', meaning: 'Evidence is insufficient to choose a class.' },
]

export interface WealthCapability {
  id: 'knowledge' | 'context' | 'compatibility' | 'reliability' | 'execution' | 'packages'
  name: string
  /** Short label for the overview. The full name stays in the detail. */
  displayName: string
  businessPurpose: string
  /** What exists today, with its basis. Descriptions and claims are labelled as such. */
  existingEvidence: string[]
  /** Platform capability, wealth-specific adaptation and customer acceptance, kept separate. */
  evidenceSplit: { platform: string; adaptation: string; acceptance: string }
  requiredWork: string[]
  /** One line for the overview. */
  nextAction: string
  /** Proposed role only. */
  proposedOwnerRole: string
  namedOwner: null
  classification: CapabilityClass
  /** Why this class and not another. Required, so a class never stands without a reason. */
  classificationBasis: string
  /** Readiness requirement ids this row draws on. Cross-reference only; ratings stay on the Readiness page. */
  readinessRefs: string[]
  sourceIds: SourceId[]
}

export const capabilityMap = {
  title: 'Wealth capability map',
  intro:
    'Six capabilities a wealth customer would expect to see for the selected workflow. The classification is a planning label, separate from the Readiness ratings.',
  classificationNote:
    'Classification is not a readiness rating. It is never averaged or scored. No capability is classified Available on the evidence reviewed.',
  caveat: 'Classifications rest on descriptions, discovery material and company-published claims, not inspected artefacts.',
  splitLabels: {
    platform: 'Platform capability',
    adaptation: 'Wealth-specific adaptation',
    acceptance: 'Customer acceptance',
  },
}

export const wealthCapabilities: WealthCapability[] = [
  {
    id: 'knowledge',
    name: 'Wealth knowledge',
    displayName: 'Wealth knowledge',
    businessPurpose:
      'Judge what is correct, relevant and permitted in a wealth workflow: product and portfolio terms, client-facing conventions and regulatory boundaries.',
    existingEvidence: [
      'Liquidity Pulse context and Centrum discovery identify RM, service and oversight needs (early workflow understanding).',
      'No named wealth-expert roster, approved data dictionary or domain test set was reviewed.',
    ],
    evidenceSplit: {
      platform: 'Not a platform feature: it depends on named people and approved definitions.',
      adaptation: 'Workflow definitions, data dictionary and decision boundaries for the selected workflow: to be agreed.',
      acceptance: 'No domain-reviewer sign-off was reviewed.',
    },
    requiredWork: [
      'Name wealth reviewers, their relevant experience and the time they can give.',
      'Agree financial and business definitions for the chosen workflow.',
      'Map decision boundaries and regulatory applicability with compliance and legal review.',
    ],
    nextAction: 'Name wealth reviewers and agree workflow definitions.',
    proposedOwnerRole: 'Wealth practice lead, with domain SME and compliance/legal leads',
    namedOwner: null,
    classification: 'Not yet classified',
    classificationBasis:
      'No expert, dictionary or applicability evidence was reviewed. General BFSI or engineering experience does not establish wealth judgement, and missing evidence is not a confirmed gap.',
    readinessRefs: ['D1', 'D2', 'D3', 'D4'],
    sourceIds: [],
  },
  {
    id: 'context',
    name: 'Customer and workflow context',
    displayName: 'Workflow context',
    businessPurpose:
      'Understand one customer’s user, trigger, systems, baseline and buying route well enough to scope a bounded workflow and measure it.',
    existingEvidence: [
      'Centrum discovery record, and the intended RM use of Liquidity Pulse.',
      'Motilal work is reported by the team; its scope is not established.',
      'No baseline, usage or outcome evidence was reviewed.',
    ],
    evidenceSplit: {
      platform: 'Not platform-dependent.',
      adaptation: 'Workflow, user, baseline and buying route for one account: to be defined.',
      acceptance: 'No accepted customer outcome was reviewed.',
    },
    requiredWork: [
      'Select one workflow with a named business owner, user group and completion criteria.',
      'Record the current approach, alternatives and baseline effort.',
      'Confirm sponsor, budget route and procurement path.',
    ],
    nextAction: 'Select one workflow with a sponsor and baseline.',
    proposedOwnerRole: 'Account lead, with wealth practice lead',
    namedOwner: null,
    classification: 'Needs verification',
    classificationBasis:
      'Discovery material exists for Centrum and Liquidity Pulse, but it has not been verified, and Motilal scope is unestablished.',
    readinessRefs: ['D1', 'C1', 'C2', 'C3'],
    sourceIds: [],
  },
  {
    id: 'compatibility',
    name: 'System compatibility',
    displayName: 'System compatibility',
    businessPurpose:
      'Work with the customer’s existing wealth platform, CRM, document stores, identity and channels, instead of asking the customer to change them.',
    existingEvidence: [
      'Company-published SERAA product descriptions and a corroborated Google Cloud ecosystem relationship (published claims, not tested against wealth systems).',
      'Discovery mentions differentiated access and channel preferences.',
      'No target-account interface, permission test or deployment evidence was reviewed.',
    ],
    evidenceSplit: {
      platform: 'Company-published product and deployment descriptions (SERAA Cortex, Axon). Not tested in this review, and not assessed as absent.',
      adaptation: 'Interfaces, entitlements and channel for the target wealth systems: to be scoped and tested.',
      acceptance: 'No customer security or integration acceptance was reviewed.',
    },
    requiredWork: [
      'Confirm the target account’s systems and which interfaces are approved.',
      'Test identity, client entitlements and permissions.',
      'Establish channel and deployment routes the customer’s security team can approve.',
      'Compare with native and specialist alternatives before adding SERAA.',
    ],
    nextAction: 'Test interfaces and entitlements in a target account.',
    proposedOwnerRole: 'Solution/integration architect, with IAM/security architect',
    namedOwner: null,
    classification: 'Needs verification',
    classificationBasis:
      'Published product and deployment descriptions exist, but compatibility with specific wealth systems has not been tested.',
    readinessRefs: ['X1', 'X2', 'X4'],
    sourceIds: ['S31', 'S32', 'S17'],
  },
  {
    id: 'reliability',
    name: 'Financial-output reliability',
    displayName: 'Financial reliability',
    businessPurpose:
      'Show that outputs are correct, sourced and fit for client-facing use: right source, entity, date, figure and recipient.',
    existingEvidence: [
      'A POC is described; no accepted domain evaluation results were reviewed.',
      'No expert-reviewed cases, baselines or regression results were reviewed.',
    ],
    evidenceSplit: {
      platform: 'Evaluation tooling in SERAA was not reviewed; it is not assessed as absent.',
      adaptation: 'Expert-reviewed wealth cases, severity criteria and baselines for the selected workflow: to be built.',
      acceptance: 'No accepted evaluation results were reviewed.',
    },
    requiredWork: [
      'Build expert-reviewed evaluation cases and severity criteria for the chosen workflow.',
      'Test wealth-specific themes: effective dates, currency and lakh/crore conventions, percentages versus basis points, conflicting sources.',
      'Set baselines and track corrections and recurring failure patterns. No universal accuracy threshold is proposed.',
    ],
    nextAction: 'Build expert-reviewed evaluation cases.',
    proposedOwnerRole: 'Evaluation/QA lead, with domain SME lead',
    namedOwner: null,
    classification: 'Not yet classified',
    classificationBasis:
      'The absence of reviewed evaluation material does not show that none exists. There is not enough to choose between verification and development.',
    readinessRefs: ['T3', 'D3'],
    sourceIds: ['S24'],
  },
  {
    id: 'execution',
    name: 'Controlled execution',
    displayName: 'Controlled execution',
    businessPurpose:
      'Keep actions inside approved boundaries: permissions, review points, audit records, secure data handling and reliable operation.',
    existingEvidence: [
      'Company-published governance and deployment claims for SERAA Cortex and SERAA Axon (not independently verified).',
      'Public assurance claims; the entity, scope, periods and reports were not inspected.',
      'No scoped data-flow, enforcement, runbook or recovery evidence was reviewed for the selected workflow.',
    ],
    evidenceSplit: {
      platform: 'Company-published governance and deployment claims (SERAA Cortex, Axon). Platform capability is not assessed as absent.',
      adaptation: 'Approval boundaries, audit and data handling in the selected wealth workflow: to be scoped and tested.',
      acceptance: 'No customer acceptance or production operating evidence was reviewed for this scope.',
    },
    requiredWork: [
      'Review the underlying assurance documents and their exclusions.',
      'Test permitted and denied actions, approvals, audit records and duplicate prevention in the target workflow.',
      'Define data flows, retention and provider terms; name the operating owner and incident route.',
    ],
    nextAction: 'Test approvals, audit and data handling in the workflow.',
    proposedOwnerRole: 'Engineering lead, with security/privacy lead and service operations lead',
    namedOwner: null,
    classification: 'Needs verification',
    classificationBasis:
      'Governance and assurance are described publicly, but nothing was inspected or tested for the selected wealth workflow.',
    readinessRefs: ['T1', 'T2', 'T4', 'T5'],
    sourceIds: ['S30', 'S31', 'S32', 'S23'],
  },
  {
    id: 'packages',
    name: 'Supported solution packages',
    displayName: 'Supported packages',
    businessPurpose:
      'Offer a defined, maintained and supported package that transfers between customers, with a known scope, price basis and exclusions.',
    existingEvidence: [
      'Candidate packages are proposed on the Offerings page; only the RM market brief has a POC starting point.',
      'No approved package definition, release catalogue or support documentation was reviewed.',
      'A customer implementation is not automatically a maintained package.',
    ],
    evidenceSplit: {
      platform: 'Reusable SERAA foundations are described publicly. Package-level reuse for wealth is not evidenced either way.',
      adaptation: 'Which existing POC or delivery assets can be adapted, and on what rights: to be verified.',
      acceptance: 'No supported package or accepted customer deployment was reviewed.',
    },
    requiredWork: [
      'Define the first package against the eight-point checklist: workflow, inputs and outputs, dependencies, permissions, acceptance, prerequisites, support ownership, pricing basis and exclusions.',
      'Verify which existing assets can be reused, and on what rights.',
      'Agree release and dependency management and who maintains each asset.',
    ],
    nextAction: 'Define the first package and verify reusable assets.',
    proposedOwnerRole: 'Wealth portfolio product lead, with platform engineering lead',
    namedOwner: null,
    classification: 'Not yet classified',
    classificationBasis:
      'Candidate packages are proposed. The evidence does not show whether existing assets can be reused or whether new development is needed, and missing evidence does not establish a missing capability.',
    readinessRefs: ['O5', 'T6', 'M4'],
    sourceIds: [],
  },
]
