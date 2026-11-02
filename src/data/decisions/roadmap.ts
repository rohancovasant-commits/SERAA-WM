import type { Milestone } from './types'

export const roadmapHeading = 'Four milestones. Reviewable outputs at each stage.'
export const roadmapStatusLabel = 'Progress'
export const roadmapStatusText = 'Not assessed'
export const roadmapNotes = [
  'Existing work enters where its evidence places it.',
  'Milestones can overlap.',
  'A second customer alone does not establish repeatability.',
]
export const roadmapProgressNote =
  'Progress stays Not assessed until actual evidence is recorded. It is not “not started”: existing work may already satisfy parts of a milestone.'

export const milestones: Milestone[] = [
  {
    id: 'm1',
    number: 1,
    title: 'Choose the market and right to win',
    purpose: 'Select the buying situations and workflows worth pursuing.',
    reviewableOutputs: [
      'Strategy charter.',
      'Named account/workflow shortlist.',
      'Current account evidence summary.',
      'Native, specialist and internal alternative comparison.',
    ],
    advancementEvidence: 'Meaningful problem, identifiable buyer/user and a credible access and buying path.',
    nextLeadershipDecision: 'Confirm focus and fund offer validation.',
    progressStatus: 'not-assessed',
  },
  {
    id: 'm2',
    number: 2,
    title: 'Define a sellable and deliverable offer',
    purpose: 'Make the proposed package commercially and operationally assessable.',
    reviewableOutputs: [
      'Package specification and exclusions.',
      'Architecture and dependency assessment.',
      'Evaluation and acceptance plan.',
      'Pricing hypothesis.',
      'Full cost and capacity work order.',
    ],
    advancementEvidence: 'Feasible scope and access, defined quality, named responsibilities and a commercial route.',
    nextLeadershipDecision: 'Commit to the appropriate bounded implementation or commercial scope.',
    progressStatus: 'not-assessed',
  },
  {
    id: 'm3',
    number: 3,
    title: 'Prove customer value in production',
    purpose: 'Establish accepted usefulness and owned operation.',
    reviewableOutputs: [
      'Customer acceptance evidence.',
      'Quality and adoption results.',
      'Monitoring and support runbook.',
      'Review/rework and actual delivery-cost results.',
    ],
    advancementEvidence: 'Relevant production requirements met, accepted value and sustainable operating responsibility.',
    nextLeadershipDecision: 'Consider account expansion and package-transfer validation.',
    progressStatus: 'not-assessed',
  },
  {
    id: 'm4',
    number: 4,
    title: 'Establish repeatability and scale',
    purpose: 'Test whether the supported capability transfers sustainably.',
    reviewableOutputs: [
      'Reuse/transfer evidence.',
      'Maintained release and support documentation.',
      'Comparable economics.',
      'Capacity plan and investment case.',
    ],
    advancementEvidence: 'Acceptable quality, support, effort, commercial evidence and capacity across reuse.',
    nextLeadershipDecision: 'Increase investment or revise the model.',
    progressStatus: 'not-assessed',
  },
]
