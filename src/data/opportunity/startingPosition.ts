import type { EvidenceKind, SourceId } from '../types'
import type { Tone } from './opening'

export interface Initiative {
  id: 'motilal' | 'centrum' | 'liquidity-pulse'
  name: string
  tone: Tone
  status: string
  evidence: EvidenceKind
  copy: string
  /** The qualification that must stay visible beside the initiative. */
  qualification: string
  /** Fuller description, shown when the panel is expanded. */
  detail: string
  verifyHeading: string
  verify: string[]
  sources: SourceId[]
  chips?: string[]
  caption: string
}

export const startingHeading = 'What can we build on?'
export const startingSentence = 'Three existing starting points contribute different kinds of evidence.'

export const initiatives: Initiative[] = [
  {
    id: 'motilal',
    name: 'Motilal Oswal',
    tone: 'blue',
    status: 'Reported delivery experience',
    evidence: 'internal',
    copy: 'Relevant operational agents and implementation learning.',
    qualification: 'Division, production scope and outcomes to verify.',
    detail: 'Existing Covasant work may provide relevant agents, integration experience and domain learning.',
    verifyHeading: 'Details to verify',
    verify: [
      'Business division and scope.',
      'Production status.',
      'Accepted outcomes.',
      'Integrations.',
      'Reusable assets and rights.',
      'Delivery economics.',
    ],
    sources: [],
    caption: 'Illustrative workflow from team-described experience.',
  },
  {
    id: 'centrum',
    name: 'Centrum',
    tone: 'violet',
    status: 'Customer discovery',
    evidence: 'internal',
    copy: 'Requirements across knowledge, service information and compliance.',
    qualification: 'Scope and commercial commitment to confirm.',
    detail: 'Discovery identifies needs across RM knowledge, service information and compliance support.',
    verifyHeading: 'Details to verify',
    verify: [
      'Priority and funded scope.',
      'Sponsor and budget route.',
      'System and data access.',
      'Permissions.',
      'Acceptance measures.',
    ],
    sources: [],
    caption: 'Needs identified in discovery; not a deployed system.',
  },
  {
    id: 'liquidity-pulse',
    name: 'Liquidity Pulse',
    tone: 'teal',
    status: 'SaaS POC',
    evidence: 'poc',
    copy: 'Market-signal reports for relationship managers.',
    qualification: 'Adoption, quality and willingness to pay to validate.',
    detail:
      'An RM-focused platform that scans selected market sources and generates reports for selected recipients. Supports configurable sources, AI-model selection and connected paid sources where access and usage are authorised.',
    verifyHeading: 'Details to validate',
    verify: [
      'Report usefulness and factual grounding.',
      'Source rights.',
      'Adoption.',
      'Willingness to pay.',
      'Production readiness.',
    ],
    sources: [],
    chips: ['Sources', 'Model selection', 'Report delivery'],
    caption: 'Reporting workflow schematic; not a screenshot.',
  },
]

export const familiesLabel = 'Opportunity families to validate'

export const opportunityFamilies: { short: string; full: string; link: string; tone: Tone }[] = [
  { short: 'Intelligence', full: 'Market and investment intelligence', link: 'Liquidity Pulse POC', tone: 'teal' },
  { short: 'Relationship support', full: 'Relationship and service support', link: 'Centrum discovery', tone: 'blue' },
  { short: 'Operations', full: 'Client and operational workflows', link: 'Motilal Oswal reported experience', tone: 'violet' },
  { short: 'Oversight', full: 'Compliance and oversight support', link: 'Centrum discovery', tone: 'amber' },
]
