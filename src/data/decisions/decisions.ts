import type { LeadershipDecision } from './types'

export const decisionsHeading = 'Five choices to resolve'
export const decisionsNote = 'Inspecting a proposal does not record a decision. Every decision is Pending.'
export const reasoningLabel = 'Explore the reasoning'

export const leadershipDecisions: LeadershipDecision[] = [
  {
    id: 'd1',
    number: 'D1',
    title: 'Position and priorities',
    shortRecommendation: 'Endorse the working position and initial focus.',
    whatWeKnow: 'Relevant POC, discovery and reported delivery starting points exist. Commercial fit and repeatability remain unverified.',
    evidenceLimitations: [
      'The POC, discovery and reported delivery are internal descriptions still to be verified.',
      'Public vendor material is published claims, not verified product behaviour.',
    ],
    whatWeRecommend: 'Validate an India-first wealth AI solutions and delivery position, with selective package investment.',
    leadershipDecisionNeeded:
      'Confirm the target customer, company role, initial priorities and balance between services and reusable product growth.',
    alternatives: ['A narrower standalone-product approach.', 'A primarily services-led approach.', 'Either may suit better if investment objectives differ.'],
    reasoning: [
      {
        items: [
          'Proposed position: packaged wealth capabilities, implementation and optional ongoing operation.',
          'Treat SERAA as the proposed reusable foundation, and confirm its contribution for each workflow.',
          'Compare native-platform and specialist-product routes where appropriate.',
          'Qualify knowledge/service support.',
          'Verify operational assets for reuse.',
          'Evaluate Liquidity Pulse as a separate POC/product track.',
          'Keep oversight customer-led and bounded.',
          'Change the starting priority when stronger evidence emerges.',
        ],
      },
    ],
    nextReviewableOutput: 'Strategy charter and prioritised account/workflow shortlist.',
    proposedOwnerRole: 'Wealth offering owner, with product, sales and delivery participation.',
    ownerNote: 'Named assignment: TBC.',
    namedOwner: null,
    recommendedDisposition: 'Endorse for validation, with scope and priorities recorded.',
    actualDecisionStatus: 'pending',
    sourceIds: [],
  },
  {
    id: 'd2',
    number: 'D2',
    title: 'Ownership and evidence',
    shortRecommendation: 'Assign an accountable owner and evidence custodians.',
    whatWeKnow: 'Important implementation, assurance and commercial evidence was not available for inspection.',
    evidenceLimitations: [
      'Missing evidence does not establish absence.',
      'Items not inspected remain Unverified. They are not confirmed capability gaps.',
    ],
    whatWeRecommend: 'Name one accountable offering owner and designated evidence custodians.',
    leadershipDecisionNeeded: 'Assign authority, participating teams, authorised review access and an escalation route.',
    alternatives: ['Leave evidence requests with each team separately, with no single accountable owner.'],
    reasoning: [
      {
        heading: 'Prioritise',
        items: [
          'Motilal account, buying and delivery records.',
          'Centrum’s current opportunity status.',
          'Liquidity Pulse build, outputs and user evidence.',
          'Applicable SERAA components, versions and capability proof.',
          'Underlying assurance documents.',
          'Relevant costs and contractual terms.',
        ],
      },
      {
        heading: 'Important',
        items: [
          'Missing evidence does not establish absence.',
          'Internal access and public-reference permissions are separate.',
          'Leadership sponsorship does not waive customer confidentiality, content rights or contractual restrictions.',
          'Do not assign a new readiness rating without a recorded assessment.',
        ],
      },
    ],
    nextReviewableOutput: 'Owner-and-evidence register linked to the readiness assessment.',
    proposedOwnerRole: 'Wealth offering owner, supported by account, product, security, finance and commercial custodians.',
    ownerNote: 'Named assignments: TBC.',
    namedOwner: null,
    recommendedDisposition: 'Assign ownership and evidence access.',
    actualDecisionStatus: 'pending',
    sourceIds: ['S31', 'S30', 'S42'],
  },
  {
    id: 'd3',
    number: 'D3',
    title: 'Next-stage resources',
    shortRecommendation: 'Resource a bounded validation stage.',
    whatWeKnow: 'No costed wealth capacity plan or validated investment amount was reviewed.',
    evidenceLimitations: ['Not having reviewed a plan does not mean none exists.', 'No capacity, effort or cost figure is assumed anywhere on this page.'],
    whatWeRecommend: 'Protect capacity for evidence review, offer definition, critical validation and a commercial case.',
    leadershipDecisionNeeded: 'Agree the stage scope, available capacity, cost owner, investment boundary and review date.',
    alternatives: ['Defer resourcing and continue opportunistic account work only.', 'Commit a wider build before a costed work order exists.'],
    reasoning: [
      {
        heading: 'Four proposed workstreams',
        ordered: true,
        items: [
          'Verify current account, product and delivery evidence.',
          'Define and compare the selected package.',
          'Assess critical integration, quality and operating requirements.',
          'Prepare customer value, full cost and the next commercial proposal.',
        ],
      },
      {
        heading: 'Resource responsibilities',
        items: ['Product/domain.', 'Account participation.', 'Architecture/integration.', 'Evaluation.', 'Security, finance and commercial support as relevant.'],
      },
      {
        heading: 'The work order should show',
        items: [
          'Tasks and deliverables.',
          'Actual availability.',
          'Effort and costs.',
          'Dependencies.',
          'Internal and external spend.',
          'Investment limits.',
          'Review decision.',
        ],
      },
      {
        heading: 'Do not',
        items: ['Invent full-time allocations.', 'Count general company headcount as available wealth capacity.'],
      },
    ],
    nextReviewableOutput: 'Costed validation work order.',
    proposedOwnerRole: 'Wealth offering owner with delivery and finance leads.',
    ownerNote: 'Named assignments: TBC.',
    namedOwner: null,
    recommendedDisposition:
      'Endorse the bounded scope and accountable team. Confirm financial commitment after the costed work order and spending cap are agreed.',
    statusNote: 'Funding is unapproved and remains pending.',
    actualDecisionStatus: 'pending',
    sourceIds: ['S40', 'S43'],
  },
  {
    id: 'd4',
    number: 'D4',
    title: 'Partnership sponsorship',
    shortRecommendation: 'Sponsor pursuits linked to real dependencies.',
    whatWeKnow: 'General ecosystem relationships exist, while account-specific access, terms and benefits need confirmation.',
    evidenceLimitations: [
      'Covasant’s published partner relationships do not establish programme tier, eligibility or sales support.',
      'Account-specific terms were not inspected.',
    ],
    whatWeRecommend: 'Activate relevant existing relationships and pursue new interfaces or content access where they unblock the selected offer.',
    leadershipDecisionNeeded: 'Select the pursuits receiving executive sponsorship, alliance capacity and bounded investigation.',
    alternatives: ['Pursue partners generally, without a named account dependency.', 'Leave partnerships to opportunistic account activity.'],
    reasoning: [
      {
        heading: 'For each pursuit record',
        items: [
          'Target account/workflow.',
          'Dependency removed.',
          'Mutual value.',
          'Named counterpart.',
          'Access or terms required.',
          'Cost and resource implications.',
          'Next output.',
        ],
      },
      {
        heading: 'Prioritise',
        items: [
          'Relevant existing cloud/data routes.',
          'Wealth-system interfaces.',
          'Permitted research/data access.',
          'Domain evaluation support.',
        ],
      },
      {
        heading: 'Do not assume',
        items: ['Guaranteed leads.', 'Programme eligibility.', 'Automatic marketplace procurement.', 'Signed partnership status.'],
      },
      {
        heading: 'Authority',
        items: [
          'Distinguish exploratory sponsorship from contractual commitments.',
          'Apply the company’s actual authority arrangements.',
        ],
      },
    ],
    nextReviewableOutput: 'Account-linked partnership pursuit brief.',
    proposedOwnerRole: 'Alliances lead with account and solution owners.',
    ownerNote: 'Executive sponsor: TBC.',
    namedOwner: null,
    recommendedDisposition: 'Sponsor a focused, account-linked shortlist.',
    actualDecisionStatus: 'pending',
    sourceIds: ['S12', 'S17', 'S35', 'S37', 'S38'],
  },
  {
    id: 'd5',
    number: 'D5',
    title: 'Further investment',
    shortRecommendation: 'Agree the evidence and review decisions.',
    whatWeKnow: 'Readiness, pricing and growth assumptions still contain unresolved evidence.',
    evidenceLimitations: [
      'Readiness ratings are provisional and dated 28 October 2026.',
      'Pricing and growth directions are proposals and hypotheses.',
    ],
    whatWeRecommend: 'Release further investment against scoped evidence gates across the four milestones.',
    leadershipDecisionNeeded:
      'Agree acceptance conditions, review authority, next review date and escalation for critical unresolved requirements.',
    alternatives: ['Release investment at fixed intervals rather than at evidence gates.', 'Decide once on a full-scale case.'],
    reasoning: [
      {
        heading: 'Review',
        items: ['Customer and commercial fit.', 'Quality and compatibility.', 'Delivery and ownership.', 'Economics and reuse.'],
      },
      {
        heading: 'Rules',
        items: [
          'Preserve critical requirements rather than averaging them.',
          'Use Proceed, Revise, Pause or Stop with a documented rationale.',
          'Do not require every portfolio requirement to reach Repeatable before any bounded activity can proceed.',
          'Do not let a strong result elsewhere waive a critical unresolved requirement for the proposed commitment.',
        ],
      },
    ],
    nextReviewableOutput: 'Stage-review pack and recommended next commitment.',
    proposedOwnerRole: 'Wealth offering owner prepares the recommendation; authorised leadership makes the investment decision.',
    ownerNote: 'Named assignments: TBC.',
    namedOwner: null,
    recommendedDisposition: 'Agree evidence-based reviews and decision conditions.',
    actualDecisionStatus: 'pending',
    sourceIds: ['S23', 'S40', 'S42', 'S43'],
  },
]
