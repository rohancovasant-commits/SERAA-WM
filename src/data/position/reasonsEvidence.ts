import type { SourceId } from '../types'

/**
 * Evidence map behind the Why choose us comparison: one entry per proposed response. It describes what existing
 * records are relevant and what they do not show. Nothing here is scored, and no customer result, integration,
 * support commitment or reference permission is claimed. Initiative records are team descriptions; no artefact,
 * contract, log or acceptance record was inspected, and their dates are not established in the research reviewed.
 */
export interface ResponseEvidence {
  /** Matches a row id in the comparison. */
  id: 'workflow' | 'systems' | 'ownership'
  response: string
  startingPoint: string[]
  reviewed: string
  supports: string
  unverified: string[]
  next: string
  sourceIds: SourceId[]
}

export const evidencePanel = {
  title: 'What supports these claims?',
  eyebrow: 'Why choose us',
  intro:
    'Existing records mapped to each proposed response. They show where a starting point exists, not that a promise has been met. Platform capability, wealth-specific adaptation and customer acceptance are kept separate.',
  labels: {
    startingPoint: 'Relevant starting point',
    reviewed: 'What was reviewed',
    supports: 'What it supports',
    unverified: 'What remains unverified',
    next: 'Next evidence needed',
  },
  dateNote: 'Initiative records carry no date in the research reviewed. Platform sources are company-published pages with no stated publication date.',
}

export const responseEvidence: ResponseEvidence[] = [
  {
    id: 'workflow',
    response: 'A defined wealth solution, evaluated with practitioners and users.',
    startingPoint: [
      'Liquidity Pulse: the described RM intelligence POC is a tangible wealth-focused starting point.',
      'Centrum: discovery and requirements give insight into wealth service and oversight needs.',
    ],
    reviewed: 'Team descriptions of the POC and of the discovery calls. No outputs, reports, requirements documents or user feedback were inspected.',
    supports: 'A concrete place to begin, and a view of the service and oversight needs a wealth firm describes.',
    unverified: [
      'Liquidity Pulse: output quality, adoption, production support and commercial viability.',
      'Centrum: an accepted solution, production deployment or reference customer. Options are under review and no scope is agreed.',
    ],
    next: 'Domain-reviewed scenarios run with relationship managers and users, then recorded customer acceptance.',
    sourceIds: [],
  },
  {
    id: 'systems',
    response: 'Integrate into the firm’s approved environment.',
    startingPoint: [
      'Motilal Oswal: reported agent work may provide relevant delivery evidence.',
      'SERAA platform: Cortex and Axon descriptions, used only for the capabilities they state.',
    ],
    reviewed: 'The team’s report of the Motilal work, and company-published SERAA product pages. No integration, interface specification or customer environment was inspected.',
    supports: 'That platform capabilities are described, and that Covasant reports delivering agent work for a wealth customer. No specific workflow or successful outcome is inferred.',
    unverified: [
      'Motilal: the entity, delivered scope, customer acceptance and reuse rights.',
      'Platform: wealth-specific adaptation and any integration with a wealth firm’s systems. Platform-wide production claims are not wealth-specific proof.',
    ],
    next: 'Tested access to the firm’s approved systems, a list of required interfaces and a credible delivery estimate.',
    sourceIds: ['S31', 'S32'],
  },
  {
    id: 'ownership',
    response: 'Agreed implementation and ongoing support responsibility.',
    startingPoint: [
      'SERAA platform: company-published deployment and governance descriptions.',
      'Motilal Oswal: reported delivery, whose support arrangements are not described.',
    ],
    reviewed: 'Company-published product and certification pages. The applicable entity, scope, periods, reports and exceptions were not inspected.',
    supports: 'That the platform’s operating and governance features are described by Covasant. It does not show who would own a wealth customer’s service.',
    unverified: [
      'A named service owner, monitoring arrangements and support terms for any wealth deployment.',
      'Production support for Liquidity Pulse, and reference permission for any customer.',
    ],
    next: 'A named service owner, monitoring in place and written support terms agreed with the customer.',
    sourceIds: ['S31', 'S30'],
  },
]
