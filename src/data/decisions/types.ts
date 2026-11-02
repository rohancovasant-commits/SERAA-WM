import type { SourceId } from '../types'

/** The three statement types used throughout the page. They are never merged into one paragraph. */
export type StatementKind = 'know' | 'recommend' | 'decide'

/**
 * Decision status is its own axis: it is separate from evidence status, technical maturity, proposal status
 * and execution progress. Only 'pending' applies today; the others are possible future outcomes.
 */
export type DecisionStatus = 'pending' | 'endorsed' | 'amended' | 'deferred' | 'declined'

/** Execution progress against a milestone. Deliberately not "not started": existing work may already satisfy parts. */
export type ProgressStatus = 'not-assessed'

export interface ReasoningGroup {
  heading?: string
  items: string[]
  /** Render as a numbered list. */
  ordered?: boolean
}

export interface LeadershipDecision {
  id: 'd1' | 'd2' | 'd3' | 'd4' | 'd5'
  number: string
  title: string
  shortRecommendation: string
  whatWeKnow: string
  /** Qualifiers on the evidence behind "what we know". */
  evidenceLimitations: string[]
  whatWeRecommend: string
  leadershipDecisionNeeded: string
  alternatives: string[]
  reasoning: ReasoningGroup[]
  nextReviewableOutput: string
  /** A proposed role, never a person. */
  proposedOwnerRole: string
  ownerNote: string
  namedOwner: null
  recommendedDisposition: string
  /** Qualifies the status where part of the decision, such as funding, stays separately pending. */
  statusNote?: string
  actualDecisionStatus: 'pending'
  sourceIds: SourceId[]
}

export interface Milestone {
  id: 'm1' | 'm2' | 'm3' | 'm4'
  number: number
  title: string
  purpose: string
  reviewableOutputs: string[]
  advancementEvidence: string
  nextLeadershipDecision: string
  progressStatus: ProgressStatus
}

export interface ReviewDocument {
  id: string
  title: string
  contents: string
  proposedPreparer: string
}

export interface ReviewOutcome {
  id: 'proceed' | 'revise' | 'pause' | 'stop'
  label: string
  summary: string
  record: string[]
}
