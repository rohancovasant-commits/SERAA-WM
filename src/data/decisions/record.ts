import type { DecisionStatus } from './types'

export const recordHeading = 'Record the commitment—not just the discussion'
export const registerCaption = 'Decision register. Read-only: it records no approvals.'
export const registerOwnerTbc = 'TBC'

export const recordDisclosure = {
  label: 'Complete decision record',
  fieldsLabel: 'Each decision record should hold',
  fields: [
    'Decision requested',
    'Evidence reviewed',
    'Recommendation',
    'Chosen disposition',
    'Scope and conditions',
    'Accountable owner',
    'Resource commitment',
    'Next output',
    'Review date',
  ],
  statusesLabel: 'Possible future decision statuses',
  statuses: ['pending', 'endorsed', 'amended', 'deferred', 'declined'] as DecisionStatus[],
  statusNote: 'Only Pending applies today.',
  partialNote: 'A direction can be endorsed while funding or production scope remains pending.',
  noWorkflowNote: 'This page is a presentation. It has no approval workflow, backend or saved state.',
  separationLabel: 'Five kinds of status, kept separate',
  separation: [
    { name: 'Evidence status', text: 'How far the evidence can be relied on.' },
    { name: 'Technical maturity', text: 'POC, discovery or reported work, to verify.' },
    { name: 'Proposal status', text: 'Proposed, hypothesis or priority hypothesis.' },
    { name: 'Decision status', text: 'Pending until leadership records a disposition.' },
    { name: 'Execution progress', text: 'Not assessed until actual evidence is recorded.' },
  ],
}
