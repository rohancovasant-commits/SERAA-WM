import type { SourceId } from '../types'
import { overviewHeadlines } from '../overviews'
import type { DecisionStatus, StatementKind } from './types'

export const decisionsHero = {
  eyebrow: '06 / DECISIONS',
  title: overviewHeadlines.decisions,
  subtitle: 'Agree the direction, ownership and next investment—with reviewable outputs at each milestone.',
  status: 'Proposals for review',
  note: 'Proposals only. No endorsement or funding is implied.',
  primaryAction: 'Review the five decisions',
  secondaryAction: 'Explore the roadmap',
}

/** The three statement types. The same labels are used for every decision. */
export const statementTypes: Record<StatementKind, { label: string; meaning: string }> = {
  know: { label: 'What we know', meaning: 'Available evidence, with its scope and limitations.' },
  recommend: { label: 'What we recommend', meaning: 'The proposed action and its rationale.' },
  decide: { label: 'Leadership decision needed', meaning: 'The authority, resource or commitment to resolve.' },
}

export const overview = {
  heading: 'Back a defined next stage',
  recommendation: 'Endorse a direction and a bounded validation stage, with clear ownership, resources, evidence and a review point.',
  documents: [
    { id: 'evidence', title: 'Evidence', caption: 'What we know', lines: ['Scope', 'Source', 'Limits'] },
    { id: 'recommendation', title: 'Recommendation', caption: 'What we recommend', lines: ['Action', 'Rationale', 'Alternatives'] },
    { id: 'decision', title: 'Decision', caption: 'Leadership decision needed', lines: ['Authority', 'Resource', 'Commitment'] },
  ],
  exampleHeading: 'One example, three statement types',
  example: {
    know: 'Liquidity Pulse is described as an RM-focused POC.',
    recommend: 'Validate usefulness and economics before broadening the product.',
    decide: 'Assign the owner, capacity and next-review evidence.',
  } satisfies Record<StatementKind, string>,
  note: 'The recommendation concerns the next stage. A full-scale investment case still needs supporting evidence.',
}

/**
 * The shape of the next commitment. It asks for sponsorship to estimate and qualify, not approval of an uncosted
 * implementation. No amounts, headcount, margins, budgets or ranges appear anywhere: costs are listed as drivers only.
 */
export const nextStage = {
  tag: 'Next commitment',
  title: 'The proposed stage should produce',
  outputs: [
    'A verified account evidence pack.',
    'A scoped offering and comparison with existing alternatives.',
    'An evaluation and acceptance plan.',
    'A costed validation work order.',
  ],
  costLabel: 'The estimate should identify',
  costItems: [
    'People and specialist effort.',
    'Integration and deployment work.',
    'Evaluation and assurance.',
    'Infrastructure, model and data-licensing costs.',
    'Support and ongoing-operation requirements.',
  ],
  estimateStatement: 'Estimate required before funding commitment.',
  sponsorship: 'The request is sponsorship to estimate and qualify. It is not approval of an uncosted implementation.',
  registerLink: 'Evidence requests feeding this stage',
  registerTo: '/readiness#actions',
}

export const decisionStatusLabels: Record<DecisionStatus, string> = {
  pending: 'Pending',
  endorsed: 'Endorsed',
  amended: 'Amended',
  deferred: 'Deferred',
  declined: 'Declined',
}

export const evidencePanel = {
  button: 'Evidence and sources',
  title: 'Evidence and sources',
  intro: 'Research date 28 October 2026. This page turns earlier research into proposals. It does not record any decision.',
  notes: [
    'Governance references inform the decision structure.',
    'They do not establish Covasant market fit, readiness or investment amounts.',
  ],
  sourceGroups: [
    { title: 'Governance references', ids: ['S23', 'S42', 'S43', 'S40'] as SourceId[] },
  ],
}

export const decisionsClosing = {
  eyebrow: 'Closing the six pages',
  statement: 'Build the next commitment around evidence we can review.',
  primary: { label: 'Return to the opportunity', path: '/opportunity' },
  secondary: { label: 'Review the growth plan', path: '/growth' },
}
