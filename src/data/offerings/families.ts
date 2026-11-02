import type { EvidenceKind, SourceId } from '../types'
import type { Tone } from '../opportunity/opening'

/** Who performs the work. Deliberately separate from client segments (HNI, UHNI) and from firm types. */
export type BusinessFunction =
  | 'RMs'
  | 'Research'
  | 'Investments'
  | 'Products'
  | 'Client servicing'
  | 'Operations'
  | 'Onboarding'
  | 'KYC'
  | 'Compliance'
  | 'Management'

/** Order shown in the filter. */
export const businessFunctions: BusinessFunction[] = [
  'RMs',
  'Research',
  'Investments',
  'Products',
  'Client servicing',
  'Operations',
  'Onboarding',
  'KYC',
  'Compliance',
  'Management',
]

export type PackageStatus = 'POC starting point' | 'Proposed candidate' | 'Later extension' | 'To verify'
/** The four statuses in the order they are shown. A status groups candidates; it never ranks them. */
export const statusKinds: PackageStatus[] = ['POC starting point', 'Proposed candidate', 'To verify', 'Later extension']

export interface CandidatePackage {
  id: string
  title: string
  /** Status of this candidate only. It never describes the whole family. */
  status: PackageStatus
}

export interface StartingAsset {
  name: string
  /** Short statement of what kind of evidence this is. */
  status: string
  evidence: EvidenceKind
  /** The visible "Starting asset" sentence. */
  description: string
}

export type FamilyId = 'intelligence' | 'relationships' | 'operations' | 'oversight'

export interface OfferingFamily {
  id: FamilyId
  tone: Tone
  /** Full name used in the overview. */
  title: string
  shortTitle: string
  /** Section headline. */
  headline: string
  /** One outcome sentence in the portfolio overview. */
  outcome: string
  /** Outcome sentence in the family section. */
  sectionOutcome: string
  businessFunctions: BusinessFunction[]
  candidatePackages: CandidatePackage[]
  /** Shown under the candidates where a status needs a plain-language caution. */
  packageNote?: string
  /** The visible "Need and alternatives" sentence. */
  customerNeed: string
  /** Alternatives to compare before adding SERAA. */
  alternatives: string[]
  startingAssets: StartingAsset[]
  /** Short starting-evidence label for the overview, e.g. "Liquidity Pulse — POC". */
  startingLabel: string
  evidenceStatus: EvidenceKind
  dependencies: string
  /** The visible "Next investment" text. */
  proposedPriorityAction: string
  /** Short action in the development summary. */
  summaryAction: string
  priorityRationale: string
  /** What must be measured to justify advancing. */
  advancementEvidence: string[]
  /** Expandable supporting assessment. */
  supportingAssessment: string[]
  sourceIds: SourceId[]
}

export const families: OfferingFamily[] = [
  {
    id: 'intelligence',
    tone: 'blue',
    title: 'Market and investment intelligence',
    shortTitle: 'Intelligence',
    headline: 'Make intelligence useful in an RM’s day',
    outcome: 'Help teams interpret developments and distribute useful intelligence.',
    sectionOutcome: 'Relevant, timely information that supports better-informed conversations.',
    businessFunctions: ['Research', 'Investments', 'Products', 'RMs'],
    candidatePackages: [
      { id: 'rm-brief', title: 'RM market brief', status: 'POC starting point' },
      { id: 'house-view', title: 'House-view and product briefing', status: 'Proposed candidate' },
      { id: 'portfolio-context', title: 'Portfolio-context briefing', status: 'Later extension' },
    ],
    packageNote: 'The two extensions are proposed. They are not current Liquidity Pulse features.',
    customerNeed: 'Qualify gaps in relevance and delivery against internal research, data products and existing wealth AI.',
    alternatives: ['Internal research', 'Market-data products', 'Specialist wealth AI'],
    startingAssets: [
      {
        name: 'Liquidity Pulse',
        status: 'POC',
        evidence: 'poc',
        description: 'Liquidity Pulse is an RM-focused SaaS POC for selected-source scanning and report distribution.',
      },
    ],
    startingLabel: 'Liquidity Pulse — POC',
    evidenceStatus: 'poc',
    dependencies: 'Permitted sources, freshness, recipient access and reliable delivery.',
    proposedPriorityAction: 'Validate the POC before expanding.',
    summaryAction: 'Validate the existing POC',
    priorityRationale: 'Prove repeated usefulness, quality and a commercial case.',
    advancementEvidence: ['Usefulness', 'Factual grounding', 'Source freshness', 'Corrections', 'Recurring use', 'Full operating cost'],
    supportingAssessment: [
      'Current user-described functionality includes model choice, backend prompts, selected sources, daily scanning and report delivery.',
      'Connected paid sources require suitable access and usage rights.',
      'An API key does not establish unrestricted AI or redistribution rights.',
      'Approved editorial workflows, portfolio context and production reliability remain unverified.',
      'Portfolio-context briefing would require additional client data, permissions and evaluation.',
      'Compare internal research, market-data products and specialist wealth AI.',
      'Assess usefulness, factual grounding, source freshness, corrections, recurring use and full operating cost.',
      'Do not treat email opens alone as proof of value.',
    ],
    sourceIds: ['S14', 'S09', 'S19'],
  },
  {
    id: 'relationships',
    tone: 'teal',
    title: 'Relationship and service support',
    shortTitle: 'Relationships',
    headline: 'Put approved knowledge within reach',
    outcome: 'Improve access to approved knowledge and client-service information.',
    sectionOutcome: 'Help RMs and service teams find usable answers with fewer unnecessary handoffs.',
    businessFunctions: ['RMs', 'Client servicing', 'Products', 'Operations'],
    candidatePackages: [
      { id: 'product-knowledge', title: 'Product and policy knowledge', status: 'Proposed candidate' },
      { id: 'service-information', title: 'Client-service information', status: 'Proposed candidate' },
      { id: 'rm-preparation', title: 'RM preparation and follow-through', status: 'Later extension' },
    ],
    customerNeed: 'Reduce searching and service friction; compare native SharePoint, CRM and service tools.',
    alternatives: ['Native SharePoint', 'CRM tools', 'Service tools'],
    startingAssets: [
      {
        name: 'Centrum',
        status: 'Discovery done · options sent',
        evidence: 'internal',
        description: 'Discovery calls with Centrum are complete and identified knowledge, service-information and access needs. Proposed AI agent options have been sent; Centrum is reviewing them, and a statement of work follows. No SOW has been sent.',
      },
    ],
    startingLabel: 'Centrum — discovery done; options sent',
    evidenceStatus: 'internal',
    dependencies: 'Source ownership, versions, permissions, system access and escalation.',
    proposedPriorityAction: 'Lead candidate for package qualification.',
    summaryAction: 'Qualify a package',
    priorityRationale: 'Direct account needs provide a basis for a bounded customer trial.',
    advancementEvidence: ['Accepted answers', 'Source and version accuracy', 'Access behaviour', 'Resolution effort', 'Recurring use'],
    supportingAssessment: [
      'General product knowledge and private client information require different access treatment.',
      'Centrum evidence is discovery, not a signed deployment or a reusable package.',
      'Microsoft already documents permission-aware SharePoint agents.',
      'Compare actual licensed native functionality before adding SERAA.',
      'WhatsApp was discussed as a preference; channel approval, integration and operating cost remain to be confirmed.',
      'Begin with controlled sources and a defined user group.',
      'Evaluate accepted answers, source/version accuracy, access behaviour, resolution effort and recurring use.',
      'RM preparation and follow-through is an adjacent proposal.',
      'Book-of-business prioritisation can be assessed later as growth support.',
    ],
    sourceIds: ['S20', 'S08'],
  },
  {
    id: 'operations',
    tone: 'violet',
    title: 'Client and operational workflows',
    shortTitle: 'Operations',
    headline: 'Move cases forward with fewer avoidable exceptions',
    outcome: 'Reduce processing delays, exception effort and avoidable rework.',
    sectionOutcome: 'Reduce processing delays and rework across selected client workflows.',
    businessFunctions: ['RMs', 'Onboarding', 'KYC', 'Operations', 'Client servicing'],
    candidatePackages: [
      { id: 'document-triage', title: 'Document checks and triage', status: 'To verify' },
      { id: 'onboarding', title: 'Onboarding coordination', status: 'To verify' },
      { id: 'maintenance', title: 'Client maintenance and service processing', status: 'Proposed candidate' },
    ],
    customerNeed: 'Identify processing bottlenecks and compare existing onboarding, document and workflow tools.',
    alternatives: ['Onboarding tools', 'Document tools', 'Workflow tools'],
    startingAssets: [
      {
        name: 'Motilal',
        status: 'AI agents built',
        evidence: 'internal',
        description: 'AI agents have been built for Motilal, and discovery sessions identified more use cases that are not built. Scope, production status, outcomes and reuse still require verification.',
      },
    ],
    startingLabel: 'Motilal — AI agents built; scope to verify',
    evidenceStatus: 'internal',
    dependencies: 'Forms, rules, approved interfaces, exception ownership and review.',
    proposedPriorityAction: 'Verify reuse before packaging.',
    summaryAction: 'Verify reusable assets',
    priorityRationale: 'Confirmed delivery assets could support a strong operational entry offer.',
    advancementEvidence: ['Rework', 'Incorrect acceptance or rejection', 'Exception resolution', 'Integration failures'],
    supportingAssessment: [
      'Verify the legal entity and business division.',
      'Verify workflow, production status, measured outcomes and actual reusable assets.',
      'Confirm contractual reuse rights.',
      'Financial-group work is not automatically wealth-division experience.',
      'A customer implementation is not automatically a maintained package.',
      'Compare complete processing effort, including human review and exceptions.',
      'Potential dependencies include onboarding/core systems and approved identity/KYC providers.',
      'Measure rework, incorrect acceptance/rejection, exception resolution and integration failures.',
      'Reconciliation, fee and transaction workflows need separate validation before inclusion.',
    ],
    sourceIds: ['S06'],
  },
  {
    id: 'oversight',
    tone: 'amber',
    title: 'Compliance and operational oversight',
    shortTitle: 'Oversight',
    headline: 'Make obligations and exceptions visible',
    outcome: 'Improve visibility of obligations, exceptions and completion evidence.',
    sectionOutcome: 'Help teams see what needs action, who owns it and what evidence supports completion.',
    businessFunctions: ['Compliance', 'Operations', 'Management'],
    candidatePackages: [
      { id: 'obligation-calendar', title: 'Obligation calendar and evidence', status: 'Proposed candidate' },
      { id: 'change-triage', title: 'Regulatory-change triage', status: 'Proposed candidate' },
      { id: 'exception-oversight', title: 'Operational exception oversight', status: 'Later extension' },
    ],
    customerNeed: 'Improve ownership and evidence visibility; compare existing calendars, GRC and regulatory-information tools.',
    alternatives: ['Calendars', 'GRC tools', 'Regulatory-information tools'],
    startingAssets: [
      {
        name: 'Centrum',
        status: 'Discovery done · options sent',
        evidence: 'internal',
        description: 'Discovery calls with Centrum are complete and included calendar, reminder and evidence requirements. Proposed AI agent options have been sent; Centrum is reviewing them, and a statement of work follows. No SOW has been sent.',
      },
    ],
    startingLabel: 'Centrum — discovery done; options sent',
    evidenceStatus: 'internal',
    dependencies: 'Approved scope, qualified reviewers, source access and reliable records.',
    proposedPriorityAction: 'Bounded customer-led pilot.',
    summaryAction: 'Scope a customer-led pilot',
    priorityRationale: 'Start with an approved obligation set and accountable owners.',
    advancementEvidence: ['Ownership', 'Due dates', 'Missed or duplicate items', 'Alert burden', 'Reviewer acceptance'],
    supportingAssessment: [
      'Regulatory interpretation and task completion are distinct jobs.',
      'No comprehensive regulatory-content service or obligations library is established.',
      'FinregE publishes relevant obligation, change and evidence workflows; Indian suitability is unverified.',
      'Regulatory-change triage should support qualified review.',
      'Operational oversight requires reliable event data.',
      'Completion status alone does not demonstrate evidence adequacy or compliance.',
      'Assess ownership, due dates, missed/duplicate items within the agreed set, alert burden and reviewer acceptance.',
      'Leadership capacity and profitability analytics are later candidates requiring suitable data.',
    ],
    sourceIds: ['S21'],
  },
]
