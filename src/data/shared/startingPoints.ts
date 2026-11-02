import type { EvidenceKind, SourceId } from '../types'

/**
 * Starting-point register: the one authoritative record of Motilal, Centrum and Liquidity Pulse.
 *
 * Other pages should read from here rather than restate the three initiatives. Every field describes what was
 * described to or reviewed by this project. No technical artefact, contract, production log, acceptance record,
 * financial record or customer reference was inspected. Missing evidence is not evidence of absence.
 *
 * The register does not establish a customer count, a production deployment count or revenue. Motilal and Centrum
 * are named account relationships; Liquidity Pulse is a product. None is presented as a confirmed customer.
 */
export interface StartingPoint {
  id: 'motilal' | 'centrum' | 'liquidity-pulse'
  name: string
  /** What kind of activity this is, not how far it progressed. */
  activityType: 'Reported agent engagement' | 'Customer discovery' | 'Product proof of concept'
  /** The status as reported to this project. Never upgraded to "customer", "live" or "deployed". */
  reportedStatus: string
  evidenceKind: EvidenceKind
  /** What was actually reviewed. */
  evidenceReviewed: string[]
  /** The limitation that must stay visible wherever this starting point is mentioned. */
  materialLimitation: string
  /** Proposed, not committed. */
  nextAction: string
  /** Proposed role only. Named owner stays null until assigned. */
  proposedOwnerRole: string
  namedOwner: null
  /** Offering families this starting point informs (see data/offerings/families.ts). */
  families: ('intelligence' | 'relationships' | 'operations' | 'oversight')[]
  /** Readiness requirement ids that cite this starting point (see data/readiness/requirements.ts). */
  readinessRefs: string[]
  sourceIds: SourceId[]
}

export const startingPointRegister = {
  title: 'Starting-point register',
  statement:
    'Three starting points contribute different kinds of evidence. None is a confirmed customer outcome, a production deployment or a reusable package.',
  reviewBasis: 'Team descriptions and discovery material. No artefact, contract, production log or acceptance record was inspected.',
  /** What the register deliberately does not say. Show on any page that quotes it. */
  notEstablished: [
    'Total number of customers.',
    'Number of production deployments.',
    'Revenue, contract value or renewal from any of the three.',
    'Permission to reference any of them externally.',
  ],
  columns: {
    activity: 'Activity type',
    status: 'Reported status',
    evidence: 'Evidence reviewed',
    limitation: 'Material limitation',
    next: 'Next action',
  },
  /** The evidence request that would close most of the limitations below. */
  evidenceRegisterLink: { label: 'Evidence requests for the next validation stage', to: '/readiness#actions' },
}

export const startingPoints: StartingPoint[] = [
  {
    id: 'motilal',
    name: 'Motilal Oswal',
    activityType: 'Reported agent engagement',
    reportedStatus: 'Existing agent work reported by the team. Business division and scope not established.',
    evidenceKind: 'internal',
    evidenceReviewed: [
      'Team members’ descriptions of the work in discovery conversations.',
      'Public relationship labels.',
    ],
    materialLimitation:
      'Division, scope, production status, acceptance, outcomes and reuse rights are not established. It cannot yet be treated as an accepted customer outcome or a reusable capability, and financial-group work is not automatically wealth-division experience.',
    nextAction:
      'Prepare a scoped case brief covering delivery, acceptance, outcomes, limitations, reuse and reference rights; then select a bounded adjacent workflow.',
    proposedOwnerRole: 'Account and delivery leads',
    namedOwner: null,
    families: ['operations'],
    readinessRefs: ['O3', 'C2'],
    sourceIds: [],
  },
  {
    id: 'centrum',
    name: 'Centrum',
    activityType: 'Customer discovery',
    reportedStatus: 'Discovery calls complete. Proposed AI agent options sent; Centrum is reviewing them before a statement of work. Not a deployed system, and no SOW has been sent.',
    evidenceKind: 'internal',
    evidenceReviewed: [
      'Discovery record: RM knowledge, service-information and compliance-support needs, including calendar, reminder and evidence requirements.',
      'A WhatsApp channel preference was discussed.',
    ],
    materialLimitation:
      'Discovery does not establish an agreed commercial scope, a sponsor or budget route, system access, a delivered solution or a measured outcome. Channel approval and integration cost are unconfirmed.',
    nextAction:
      'Qualify one bounded knowledge/service or oversight opportunity: current sponsor, priority, alternatives (including native SharePoint and CRM tools), system access, budget and procurement route.',
    proposedOwnerRole: 'Accountable wealth offering owner, with account lead',
    namedOwner: null,
    families: ['relationships', 'oversight'],
    readinessRefs: ['O2', 'O4', 'C1'],
    sourceIds: ['S20'],
  },
  {
    id: 'liquidity-pulse',
    name: 'Liquidity Pulse',
    activityType: 'Product proof of concept',
    reportedStatus: 'RM-focused market-intelligence SaaS POC, as described by its users.',
    evidenceKind: 'poc',
    evidenceReviewed: [
      'User description of configurable sources, AI-model selection, backend prompts, daily scanning and report delivery to selected recipients.',
      'Description of optional connected paid sources, where access and usage are authorised.',
    ],
    materialLimitation:
      'Report quality has not been evaluated. Nothing reviewed shows sustained use, a paying customer, an owned production service or cleared source and redistribution rights.',
    nextAction:
      'Assemble a review pack: representative reports, evaluated quality and factual grounding, source rights, adoption, willingness to pay and full operating cost.',
    proposedOwnerRole: 'Liquidity Pulse product owner',
    namedOwner: null,
    families: ['intelligence'],
    readinessRefs: ['O1', 'T3', 'X3', 'C1'],
    sourceIds: ['S14'],
  },
]
