import type { SourceId } from '../types'

/**
 * Strategic status of a proposed direction. Deliberately separate from the Readiness page's numerical
 * scale and from technical maturity: it says how firmly a direction is held, not how ready it is.
 */
export type StrategicStatus =
  | 'Proposed'
  | 'Proposed positioning'
  | 'Priority hypothesis'
  | 'Hypothesis'
  | 'Leadership decision'
  | 'Proposed decision rule'

export interface ProposedDirection {
  id: string
  /** Area of the plan, e.g. "Initial sales". */
  topic: string
  /** The one-line proposed answer. */
  shortTag: string
  explanation: string
  status: StrategicStatus
  supportingEvidence: string[]
  validationTest: string
  /** A proposed role, never a named person. All owner assignments remain proposed until confirmed. */
  proposedOwnerRole: string
  sourceIds: SourceId[]
}

export interface Milestone {
  id: string
  title: string
  /** The short line shown on the pathway. */
  summary: string
  evidenceNeeded: string[]
  investmentImplication: string
}
