import type { ReviewDocument, ReviewOutcome } from './types'

export const reviewHeading = 'What leadership should be able to inspect next'
export const reviewLabel = 'Proposed outputs—not completed documents.'
export const reviewTbc = 'Named preparers, effort, financial cap and review date remain TBC.'
export const reviewListLabel = 'Proposed next-review documents'

export const reviewDocuments: ReviewDocument[] = [
  {
    id: 'direction',
    title: 'Direction and focus brief',
    contents: 'Target customer, position, chosen workflow, alternatives and exclusions.',
    proposedPreparer: 'Offering/product lead',
  },
  {
    id: 'evidence',
    title: 'Current initiative evidence pack',
    contents: 'Verified account/product status, permissions and limitations.',
    proposedPreparer: 'Account/product custodians',
  },
  {
    id: 'readiness',
    title: 'Updated readiness register',
    contents: 'Requirement evidence, rating, limitation, action and owner.',
    proposedPreparer: 'Product/architecture/evaluation leads',
  },
  {
    id: 'offer',
    title: 'Offer and evaluation brief',
    contents: 'User, trigger, output, completion state, data, review points and buying decision.',
    proposedPreparer: 'Solution/domain/account leads',
  },
  {
    id: 'resource',
    title: 'Resource and cost work order',
    contents:
      'Availability, dependencies and investment boundary, with costs for people and specialist effort, integration and deployment, evaluation and assurance, infrastructure, model and data licensing, and support and operation. Estimate required before funding commitment.',
    proposedPreparer: 'Delivery/finance leads',
  },
  {
    id: 'partnership',
    title: 'Partnership pursuit brief',
    contents: 'Dependency, counterpart, route, terms and next deliverable.',
    proposedPreparer: 'Alliances lead',
  },
]

export const outcomesHeading = 'Four possible outcomes of a review'
export const outcomesNote = 'These explain possible outcomes only. Selecting one does not record a decision.'
export const reviewOutcomes: ReviewOutcome[] = [
  {
    id: 'proceed',
    label: 'Proceed',
    summary: 'Evidence supports the specified next commitment.',
    record: ['Scope', 'Owner', 'Resources', 'Conditions', 'Review'],
  },
  {
    id: 'revise',
    label: 'Revise',
    summary: 'Change the scope, architecture, approach or price.',
    record: ['Change', 'Reason', 'Owner', 'Retest'],
  },
  {
    id: 'pause',
    label: 'Pause',
    summary: 'Resolve a dependency before the next commitment.',
    record: ['Blocking condition', 'Resource implications', 'Revisit trigger'],
  },
  {
    id: 'stop',
    label: 'Stop',
    summary: 'The current proposition or investment is not justified.',
    record: ['Rationale', 'Reusable learning/assets', 'Any continuing obligations'],
  },
]
