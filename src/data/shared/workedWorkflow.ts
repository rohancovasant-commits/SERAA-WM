import type { SourceId } from '../types'

/**
 * Worked workflow: RM market intelligence.
 *
 * An illustrative, proposed workflow used to make the capability map concrete. It is not a product description,
 * a screenshot or a claim about what Liquidity Pulse does today. Two things are kept apart on every step:
 *  - `described`: functionality the Liquidity Pulse users have described (POC, not inspected);
 *  - `proposedExtension`: what an enterprise version would additionally need (proposed, not built or evaluated).
 * It names no integration, accuracy result or customer adoption, and proposes no target values.
 */
export interface WorkflowStep {
  id: 'develop' | 'assess' | 'brief' | 'review' | 'measure'
  order: number
  label: string
  /** One line saying what happens at this step. */
  purpose: string
  /** User-described Liquidity Pulse POC functionality. Empty where nothing is described. */
  described: string[]
  /** Proposed enterprise extension. Not a current feature. */
  proposedExtension: string[]
  inputs: string[]
  dependencies: string[]
  /** Where a person's wealth judgement is required. */
  domainJudgement: string[]
  qualityRisks: string[]
  /** Measures to define. No baseline or target exists. */
  outcomeMeasures: string[]
  /** Capability-map ids this step depends on. */
  capabilities: ('knowledge' | 'context' | 'compatibility' | 'reliability' | 'execution' | 'packages')[]
}

export const workedWorkflow = {
  title: 'Worked workflow: RM market intelligence',
  label: 'Illustrative proposed workflow; not an approved launch selection.',
  intro:
    'Market development → relevance assessment using approved information → sourced briefing → review and distribution → usefulness measurement.',
  separationNote:
    'Described POC functionality and proposed enterprise extensions are shown separately. The extensions are not current Liquidity Pulse features.',
  notEstablished: [
    'No integration with any customer system is claimed.',
    'No accuracy or quality result exists.',
    'No customer adoption or willingness to pay is established.',
    'Portfolio-context briefing would need client data, permissions and evaluation, and is a later extension.',
  ],
  sourceIds: ['S14', 'S09', 'S19'] as SourceId[],
}

export const workflowSteps: WorkflowStep[] = [
  {
    id: 'develop',
    order: 1,
    label: 'Market development',
    purpose: 'Collect the market developments that may matter to relationship managers.',
    described: [
      'Configurable sources and daily scanning of selected sources.',
      'Optional connected paid sources, where access and usage are authorised.',
    ],
    proposedExtension: ['A source list approved by content owners, with recorded rights and refresh expectations.'],
    inputs: ['Selected public and licensed sources', 'Source permissions and any licence terms'],
    dependencies: ['Permitted sources and content-use rights', 'Source freshness', 'Provider and model terms'],
    domainJudgement: ['Which sources are trusted and in scope for RM use.'],
    qualityRisks: [
      'Stale or unreliable source.',
      'Licensed content used or redistributed beyond its rights. An API key alone does not establish those rights.',
    ],
    outcomeMeasures: ['Source freshness', 'Share of sources with cleared rights'],
    capabilities: ['knowledge', 'execution'],
  },
  {
    id: 'assess',
    order: 2,
    label: 'Relevance assessment using approved information',
    purpose: 'Decide which developments matter, using information the firm has approved.',
    described: ['AI-model selection and backend prompts are described. Relevance logic is not described in the material reviewed.'],
    proposedExtension: [
      'Relevance judged against approved house views, product information and recipient roles.',
      'Portfolio-context relevance is a later extension needing client data and permissions.',
    ],
    inputs: ['Approved house views and product information', 'Recipient roles and coverage'],
    dependencies: ['Access to approved content', 'Identity and entitlement rules for recipients', 'Content-owner sign-off'],
    domainJudgement: ['What counts as relevant to a client conversation.', 'Which views and products are approved for use.'],
    qualityRisks: [
      'Relevant development missed, or irrelevant one surfaced.',
      'Unapproved or outdated house view used.',
      'Instructions inside source material that conflict with workflow authority.',
    ],
    outcomeMeasures: ['Developments RMs judge relevant', 'Corrections to relevance'],
    capabilities: ['knowledge', 'context', 'compatibility'],
  },
  {
    id: 'brief',
    order: 3,
    label: 'Sourced briefing',
    purpose: 'Produce a short briefing in which every statement can be traced to a source.',
    described: ['Report generation from selected sources for selected recipients.'],
    proposedExtension: [
      'Each statement linked to its source, entity and date.',
      'Checks on figures, effective dates and unit conventions before release.',
    ],
    inputs: ['Assessed developments', 'Source text and dates', 'Briefing format agreed with users'],
    dependencies: ['Wealth-specific evaluation cases', 'Model behaviour on financial text'],
    domainJudgement: ['Whether the summary is faithful and appropriate for client-facing use.'],
    qualityRisks: [
      'Wrong source, entity, date or figure.',
      'Unsupported claim.',
      'Currency, lakh/crore or percentage versus basis-point errors.',
      'Missing or conflicting information not flagged.',
    ],
    outcomeMeasures: ['Factual grounding', 'Corrections', 'Human review effort'],
    capabilities: ['reliability', 'knowledge'],
  },
  {
    id: 'review',
    order: 4,
    label: 'Review and distribution',
    purpose: 'Approve the briefing and send it only to the right recipients.',
    described: ['Report delivery to selected recipients.'],
    proposedExtension: [
      'An approved editorial and compliance review step before release.',
      'Recipient entitlements and an audit record of what was sent to whom.',
    ],
    inputs: ['Draft briefing', 'Recipient list and entitlements', 'Review rules'],
    dependencies: ['Approved editorial workflow (unverified)', 'Approved delivery channel', 'Reliable delivery'],
    domainJudgement: ['What may be sent, to whom, and what needs compliance review.'],
    qualityRisks: [
      'Briefing sent to the wrong recipient.',
      'Release without required review.',
      'Review effort that removes the time saved.',
    ],
    outcomeMeasures: ['Correct recipient', 'Review turnaround and effort', 'Missed or duplicate sends'],
    capabilities: ['execution', 'compatibility'],
  },
  {
    id: 'measure',
    order: 5,
    label: 'Usefulness measurement',
    purpose: 'Learn whether RMs find the briefings useful enough to keep using, at an acceptable cost.',
    described: [],
    proposedExtension: [
      'Agreed usefulness measures and a baseline before any target.',
      'Recorded corrections and recurring use over time.',
    ],
    inputs: ['RM feedback', 'Usage records', 'Correction log', 'Full operating cost'],
    dependencies: ['A baseline for current RM effort', 'Participating RMs', 'Cost data'],
    domainJudgement: ['What “useful” means in an RM’s day.'],
    qualityRisks: [
      'Email opens treated as proof of value.',
      'Small or unrepresentative pilot group.',
      'Cost omitted from the value case.',
    ],
    outcomeMeasures: ['Usefulness', 'Recurring use', 'Willingness to pay', 'Full operating cost'],
    capabilities: ['context', 'packages'],
  },
]
