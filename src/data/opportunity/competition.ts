import type { EvidenceKind, SourceId } from '../types'
import type { Tone } from './opening'

export interface Competitor {
  id: string
  /** Full name, used as the drawer title. */
  name: string
  categoryId: string
  /** Product line shown under the logo. */
  caption: string
  /** Key of the logo asset; omitted where only a text wordmark is available. */
  logo?: 'wealthspectrum' | 'intellect' | 'salesforce' | 'tifin' | 'accenture'
  /** Text wordmark used when no official logo asset could be obtained. */
  wordmark?: string
  evidence: EvidenceKind
  scopeHeading: string
  scope: string[]
  /** What this means for SERAA. Shown in the drawer, not on the landscape. */
  implication: string
  caveat?: string
  sources: SourceId[]
}

export interface CompetitorCategory {
  id: string
  name: string
  tone: Tone | 'navy'
  capabilities: string[]
}

export const competitionHeading = 'Who already serves this market?'
export const competitionSentence = 'Customers can buy, extend or build. SERAA must earn its place.'

export const competitorCategories: CompetitorCategory[] = [
  { id: 'platforms', name: 'Wealth platforms', tone: 'blue', capabilities: ['Portfolios', 'Reporting', 'Operations'] },
  { id: 'crm', name: 'CRM and relationships', tone: 'teal', capabilities: ['Client context', 'Advisor assistance', 'Tasks'] },
  { id: 'specialist-ai', name: 'Specialist wealth AI', tone: 'violet', capabilities: ['Intelligence', 'Assistants', 'Workflows'] },
  { id: 'delivery', name: 'Delivery and operation', tone: 'amber', capabilities: ['Implementation', 'Integration', 'Operation'] },
  { id: 'internal', name: 'Internal development', tone: 'navy', capabilities: ['Existing teams', 'Prototypes', 'Custom tools'] },
]

export const competitors: Competitor[] = [
  {
    id: 'wealthspectrum',
    name: 'WealthSpectrum',
    categoryId: 'platforms',
    caption: 'Wealth platform',
    logo: 'wealthspectrum',
    evidence: 'vendor',
    scopeHeading: 'Published scope',
    scope: [
      'Wealth operations, portfolio accounting, reporting and RM/client access.',
      'Documentation describes CRM, onboarding and WhatsApp-related integrations.',
    ],
    implication:
      'Establish what the incumbent already handles and where complementary extensions are useful.',
    sources: ['S05', 'S06'],
  },
  {
    id: 'intellect',
    name: 'Intellect eMACH.ai Wealth',
    categoryId: 'platforms',
    caption: 'eMACH.ai Wealth',
    logo: 'intellect',
    evidence: 'vendor',
    scopeHeading: 'Published scope',
    scope: ['Wealth lifecycle capabilities.', 'Advisor intelligence and automation.', 'API-oriented integration.'],
    implication: 'Broad coverage and integration are already competitive claims.',
    sources: ['S07'],
  },
  {
    id: 'salesforce',
    name: 'Salesforce Agentforce Financial Services',
    categoryId: 'crm',
    caption: 'Agentforce Financial Services',
    logo: 'salesforce',
    evidence: 'vendor',
    scopeHeading: 'Published scope',
    scope: ['Wealth-advisor assistance.', 'Financial summaries and portfolio context.', 'Meeting tasks.'],
    implication: 'Compare adding SERAA with extending capabilities the customer already owns.',
    sources: ['S08'],
  },
  {
    id: 'tifin',
    name: 'TIFIN.AI',
    categoryId: 'specialist-ai',
    caption: 'TIFIN.AI',
    logo: 'tifin',
    evidence: 'vendor',
    scopeHeading: 'Published scope',
    scope: ['Coordinated components and agents across wealth operations, investments, growth and management.'],
    implication: 'Connected wealth agents alone would have direct competitive overlap.',
    sources: ['S09'],
  },
  {
    id: 'cognicor',
    name: 'CogniCor',
    categoryId: 'specialist-ai',
    caption: 'Wealthbox integration',
    wordmark: 'CogniCor',
    evidence: 'vendor',
    scopeHeading: 'Published evidence',
    scope: ['A documented Wealthbox meeting-assistant integration with summaries and task suggestions.'],
    implication: 'Individual workflows also have specialist alternatives.',
    sources: ['S10', 'S49'],
  },
  {
    id: 'accenture',
    name: 'Accenture Trusted Wealth Ops',
    categoryId: 'delivery',
    caption: 'Trusted Wealth Ops',
    logo: 'accenture',
    evidence: 'vendor',
    scopeHeading: 'Published scope',
    scope: ['September 2026 announcement combining Salesforce, Claude, wealth workflows and implementation.'],
    implication: 'Packaged solutions plus specialist delivery is already a competing business model.',
    caveat: 'Announced benefits are treated as expected outcomes, not independently achieved results.',
    sources: ['S11'],
  },
  {
    id: 'internal',
    name: 'Internal development',
    categoryId: 'internal',
    caption: 'The customer’s own team',
    evidence: 'internal',
    scopeHeading: 'What to assess',
    scope: [
      'The customer’s technology team.',
      'Existing prototypes.',
      'Existing service providers.',
      'Nuvama’s published initiatives, and what Centrum has described about its own plans.',
    ],
    implication:
      'Covasant may need to accelerate, extend or operate an existing programme.',
    sources: ['S04'],
  },
]

export const competitionNote =
  'Descriptions reflect published scope, not comparative testing or independent verification of performance.'

export const competitionConclusion =
  'Connected agents and integration are already market offerings. Our differentiation needs evidence.'
