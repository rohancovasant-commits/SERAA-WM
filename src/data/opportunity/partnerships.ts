import type { LucideIcon } from 'lucide-react'
import { Cloud, FlaskConical, LineChart, Plug } from 'lucide-react'
import type { SourceId } from '../types'
import type { Tone } from './opening'

export type RelationshipStatus = 'listed' | 'assess' | 'candidate' | 'establish'

export interface PartnerGroup {
  id: 'cloud' | 'systems' | 'data' | 'proof'
  /** Full name, used as the drawer title. */
  name: string
  /** Short heading and one-word role shown on the diagram. */
  heading: string
  kicker: string
  tone: Tone
  icon: LucideIcon
  /** Label on the connection to the central workflow. */
  connection: string
  names: string[]
  /** A note under one name, such as "To establish". Keyed by name. */
  nameNotes?: Record<string, string>
  /** Researched names shown as examples, marked separately. */
  exampleNames?: string[]
  /** Says what the names are, so a candidate never reads as a partner. */
  caption: string
  /** Link that opens the drawer. */
  action: string
  status: RelationshipStatus
  statusLabel: string
  /** Detail drawer content. */
  summary: string
  gainCovasant: string
  gainOther: string
  dependency: string
  verifyNext: string[]
  sources?: SourceId[]
}

export const partnershipsEyebrow = 'Partnerships'
export const partnershipsTag = 'Proposed ecosystem'
export const partnershipsHeading = 'Make us easier to trust. Easier to deploy.'
export const partnershipsLede = 'Build relationships around the customer’s workflow.'
export const partnershipsEvidenceLink = 'Evidence'
export const partnershipsNote =
  'Names show published relationships or candidates, as labelled. API access, terms and usage rights require confirmation.'

/** The workflow the partners connect to. Illustrative, not a product description. */
export const ecosystemHub = {
  label: 'Illustrative workflow',
  title: 'A wealth workflow',
  product: 'SERAA',
  areas: ['RM knowledge', 'Client service', 'Operations'],
  footnote: 'Works with the firm’s existing environment',
}

export const partnershipsClosing = {
  statement: 'Prioritise the partner that removes a real delivery barrier.',
  link: 'View partnership pursuits',
  to: '/growth#partnerships',
}

export const partnerGroups: PartnerGroup[] = [
  {
    id: 'cloud',
    name: 'Cloud and data foundation',
    heading: 'Cloud & data',
    kicker: 'Run',
    tone: 'blue',
    icon: Cloud,
    connection: 'Deployment foundation',
    names: ['Microsoft Azure', 'Google Cloud', 'Databricks'],
    caption: 'Covasant-listed relationships',
    action: 'Confirm status',
    status: 'listed',
    statusLabel: 'Publicly listed by Covasant',
    summary: 'Begin with relevant existing Covasant relationships.',
    gainCovasant: 'Deployment capability and possible joint account support for customer opportunities.',
    gainOther: 'Customer solution opportunities on their platform, to be confirmed with them.',
    dependency: 'Hosting and deployment routes that customers’ security teams can approve.',
    verifyNext: [
      'Which existing relationships have wealth-relevant programmes.',
      'Whether joint account support is available.',
      'Commercial and technical terms.',
    ],
    sources: ['S12'],
  },
  {
    id: 'systems',
    name: 'Customer systems',
    heading: 'Customer systems',
    kicker: 'Connect',
    tone: 'teal',
    icon: Plug,
    connection: 'Integration candidates',
    names: ['Wealth platform', 'CRM', 'Documents'],
    exampleNames: ['WealthSpectrum', 'Salesforce'],
    caption: 'Integration candidates',
    action: 'Explore fit',
    status: 'assess',
    statusLabel: 'Integration opportunities to assess',
    summary: 'Wealth platforms and CRM systems used by target firms.',
    gainCovasant: 'A route into the workflows and data that live in the systems customers already use.',
    gainOther: 'Complementary capability around their product, if the scope does not overlap.',
    dependency: 'Approved integration access and documentation.',
    verifyNext: [
      'Which approved integrations exist.',
      'Whether SERAA scope is complementary or overlapping.',
      'Terms for access and support.',
    ],
    sources: ['S05', 'S06', 'S08'],
  },
  {
    id: 'data',
    name: 'Research and market data',
    heading: 'Research & market data',
    kicker: 'Inform',
    tone: 'violet',
    icon: LineChart,
    connection: 'Licensed content',
    names: ['Morningstar', 'LSEG', 'FactSet'],
    caption: 'Candidate providers',
    action: 'Check rights',
    status: 'candidate',
    statusLabel: 'Candidate providers',
    summary: 'Potential examples: Morningstar, LSEG and FactSet. Not Covasant partners.',
    gainCovasant: 'Licensed content that market and investment intelligence offerings could draw on.',
    gainOther: 'A further route to use of their content, within the terms of the applicable agreement.',
    dependency: 'Content rights, output permissions and cost.',
    verifyNext: ['Content coverage.', 'Permitted usage and redistribution.', 'Cost, and who bears it.'],
    sources: ['S13', 'S14'],
  },
  {
    id: 'proof',
    name: 'Domain and customer validation',
    heading: 'Domain & customer validation',
    kicker: 'Prove',
    tone: 'amber',
    icon: FlaskConical,
    connection: 'Financial quality + user acceptance',
    names: ['Practitioners', 'Process owners', 'Participating clients'],
    nameNotes: { 'Process owners': 'To establish' },
    caption: 'Participants to be established',
    action: 'Define validation',
    status: 'establish',
    statusLabel: 'To establish',
    summary: 'Wealth practitioners, process owners and participating customers.',
    gainCovasant: 'Domain expertise, review of workflows and evidence from real use.',
    gainOther: 'Influence over what is built and early access, to be confirmed with each participant.',
    dependency: 'Domain expertise and customer evidence that the offering works.',
    verifyNext: ['Availability of expertise.', 'How evaluations would be run.', 'Whether participants would act as references.'],
  },
]

/** Further relationships Covasant lists publicly (S12). Shown in the detail drawer. */
export const alsoListed = ['BotMinds', 'Rampp AI', 'Tada']

export const candidateRelationships = [
  'Relevant wealth systems and CRM providers',
  'Research and market-data providers',
  'Domain specialists',
  'Additional distribution relationships',
]

export const relationshipNote =
  'Published relationships do not establish programme tiers, wealth-specific credentials or guaranteed sales support.'

export const liquidityPulseExample =
  'Paid-source integration requires validation of content rights, output permissions and costs. An API key alone does not establish all intended usage rights.'

/** Heading and intro of the evidence drawer that opens from the top-right link. */
export const partnershipsEvidence = {
  title: 'What each name rests on',
  intro: 'Only the cloud and data relationships are published by Covasant. Every other name is a candidate or a requirement to establish.',
  none: 'No source: a proposed requirement, not an existing relationship.',
}
