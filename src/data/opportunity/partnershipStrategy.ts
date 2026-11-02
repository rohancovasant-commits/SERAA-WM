import type { SourceId } from '../types'
import type { Tone } from './opening'

export const partnershipsStrategy = {
  eyebrow: 'Partnerships · What makes the offering deliverable?',
  headline: 'Which relationships can accelerate SERAA in wealth?',
  support: 'Build from existing relationships. Pursue partners that unlock customer delivery and growth.',
  mapLabel: 'Ecosystem shortlist',
  mapNote: 'An ecosystem shortlist, not a list of confirmed partners. Each area has a different evidence status.',
  detailsAffordance: 'Evidence and limits',
  route: {
    title: 'joint delivery and ecosystem introductions. No referral or co-selling channel is established.',
  },
  exchange: {
    tag: 'Proposed exchange',
    title: 'Why partners might participate',
    text: 'Covasant contributes implementation capacity and complementary wealth workflows; potential partners contribute platform access, data or market reach.',
    limit: 'Participation must be tested with each organisation. No organisation has agreed or declined.',
  },
  priority: 'First pursuit: the system or data relationship needed by the selected customer workflow.',
  evidenceButton: 'Check relationship evidence',
  pursuitsButton: 'Review proposed pursuits',
}

export interface EcosystemArea {
  id: 'cloud' | 'systems' | 'data' | 'validation'
  label: string
  names: { name: string; note?: string }[]
  extra?: string
  status: string
  outcome: string
  tone: Tone
  /** Entries in `evidenceEntries` this area opens. */
  entryIds: string[]
}

export const ecosystemAreas: EcosystemArea[] = [
  {
    id: 'cloud',
    label: 'Deployment foundation',
    names: [{ name: 'Microsoft Azure' }, { name: 'Google Cloud' }, { name: 'Databricks' }],
    status: 'Published relationships',
    outcome: 'Build on familiar enterprise infrastructure.',
    tone: 'blue',
    entryIds: ['cloud'],
  },
  {
    id: 'systems',
    label: 'Customer systems',
    names: [{ name: 'WealthSpectrum' }, { name: 'Salesforce' }],
    status: 'Integration candidates',
    outcome: 'Fit into the wealth firm’s existing systems.',
    tone: 'teal',
    entryIds: ['wealthspectrum', 'salesforce'],
  },
  {
    id: 'data',
    label: 'Research and data',
    names: [{ name: 'Morningstar' }, { name: 'LSEG' }, { name: 'FactSet' }],
    status: 'Candidate suppliers',
    outcome: 'Support intelligence with licensed information.',
    tone: 'violet',
    entryIds: ['morningstar', 'lseg', 'factset'],
  },
  {
    id: 'validation',
    label: 'Customer and domain validation',
    names: [
      { name: 'Motilal Oswal', note: 'reported engagement' },
      { name: 'Centrum', note: 'discovery' },
    ],
    status: 'Account starting points',
    outcome: 'Validate workflow needs and establish customer proof.',
    tone: 'amber',
    entryIds: ['motilal', 'centrum', 'practitioners'],
  },
]

/** Integration access, a supplier contract and a strategic partnership are different arrangements. */
export const arrangementNote =
  'Integration access, a supplier contract and a strategic partnership are different arrangements. Each entry says which one the evidence relates to.'

export interface EvidenceEntry {
  id: string
  name: string
  role: string
  arrangement: string
  status: string
  evidence: string
  sources: SourceId[]
  establishes: string
  unconfirmed: string[]
}

export const evidenceEntries: EvidenceEntry[] = [
  {
    id: 'cloud',
    name: 'Microsoft Azure · Google Cloud · Databricks',
    role: 'Deployment and platform providers',
    arrangement: 'Relationship listed by Covasant',
    status: 'Published by Covasant',
    evidence: 'Covasant’s own partner overview.',
    sources: ['S12'],
    establishes: 'Covasant publicly lists these relationships.',
    unconfirmed: ['Programme tier and wealth-specific credentials.', 'Co-selling eligibility, customer referrals and sales support.', 'Commercial and technical terms.'],
  },
  {
    id: 'wealthspectrum',
    name: 'WealthSpectrum',
    role: 'Customer-system compatibility; possible relationship pursuit',
    arrangement: 'Integration access, if approved',
    status: 'Integration to assess',
    evidence: 'Vendor-published platform and integration documentation.',
    sources: ['S05', 'S06'],
    establishes: 'The vendor publishes wealth-platform capabilities and CRM, onboarding and WhatsApp-related integrations.',
    unconfirmed: ['Approved integration access and documentation.', 'Whether SERAA scope is complementary or overlapping.', 'Access and support terms.', 'Whether the provider would participate; no relationship is established.'],
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    role: 'Customer-system compatibility; possible relationship pursuit',
    arrangement: 'Integration access, if approved',
    status: 'Integration to assess',
    evidence: 'Official product documentation.',
    sources: ['S08'],
    establishes: 'Salesforce publishes wealth-advisor assistance capabilities.',
    unconfirmed: ['Approved integration access.', 'Overlap with the customer’s native Salesforce features.', 'Access and support terms.', 'Whether the provider would participate; no relationship is established.'],
  },
  {
    id: 'morningstar',
    name: 'Morningstar',
    role: 'Candidate research and data provider',
    arrangement: 'Supplier contract, if licensed',
    status: 'Candidate; not an established partner',
    evidence: 'Vendor-published research, analytics and API capabilities.',
    sources: ['S13'],
    establishes: 'The provider publishes research, analytics and API capabilities.',
    unconfirmed: ['Content coverage.', 'AI usage permissions, output and redistribution rights.', 'Access and support terms.', 'Cost, and who bears it.'],
  },
  {
    id: 'lseg',
    name: 'LSEG',
    role: 'Candidate research and data provider',
    arrangement: 'Supplier contract, if licensed',
    status: 'Candidate; not an established partner',
    evidence: 'Provider explanation of data redistribution.',
    sources: ['S14'],
    establishes: 'The provider explains that redistribution rights depend on the applicable agreement and intended use. An API key alone does not establish all intended usage rights.',
    unconfirmed: ['Content coverage.', 'AI usage permissions, output and redistribution rights.', 'Access and support terms.', 'Cost, and who bears it.'],
  },
  {
    id: 'factset',
    name: 'FactSet',
    role: 'Candidate research and data provider',
    arrangement: 'Supplier contract, if licensed',
    status: 'Candidate; not an established partner',
    evidence: 'No source reviewed for this entry.',
    sources: [],
    establishes: 'Named as a candidate only.',
    unconfirmed: ['Content coverage.', 'AI usage permissions, output and redistribution rights.', 'Access and support terms.', 'Cost, and who bears it.'],
  },
  {
    id: 'motilal',
    name: 'Motilal Oswal',
    role: 'Account starting point: reported agent engagement',
    arrangement: 'Customer engagement, as reported by the team',
    status: 'Reported engagement; not a confirmed strategic partnership or reference customer',
    evidence: 'Team members’ descriptions of the work in discovery conversations, and public relationship labels.',
    sources: [],
    establishes: 'Existing agent work is reported by the team.',
    unconfirmed: ['Business division, scope and production status.', 'Acceptance, outcomes and reuse rights.', 'Reference permission.', 'Willingness to validate a new offering.'],
  },
  {
    id: 'centrum',
    name: 'Centrum',
    role: 'Account starting point: customer discovery',
    arrangement: 'Prospective customer discussion',
    status: 'Discovery; proposed options under review by Centrum; no statement of work',
    evidence: 'Discovery record of RM knowledge, service-information and compliance-support needs.',
    sources: [],
    establishes: 'Discovery calls are complete and proposed AI agent options were sent.',
    unconfirmed: ['An agreed commercial scope, sponsor or budget route.', 'System access.', 'Reference permission.', 'Willingness to validate a new offering.'],
  },
  {
    id: 'practitioners',
    name: 'Wealth practitioners and reviewers',
    role: 'Domain validation of workflow quality',
    arrangement: 'Advisory or validation relationship',
    status: 'To establish',
    evidence: 'No source: a proposed requirement, not an existing relationship.',
    sources: [],
    establishes: 'Nothing yet; this is a requirement.',
    unconfirmed: ['Availability of expertise.', 'How evaluations would be run.', 'Whether participants would act as references.'],
  },
]

export type PursuitBand = 'first' | 'credibility' | 'later'

export const pursuitBands: { id: PursuitBand; label: string; note: string }[] = [
  { id: 'first', label: 'First-offer dependencies', note: 'Needed to deliver the first customer offer.' },
  { id: 'credibility', label: 'Credibility relationships', note: 'Needed to show quality and customer proof.' },
  { id: 'later', label: 'Later market-access opportunities', note: 'Proposed routes to investigate after customer value and delivery fit are demonstrated.' },
]

export interface Pursuit {
  id: string
  band: PursuitBand
  name: string
  target: string
  covasantBenefit: string
  otherBenefit: string
  next: string
  owner: string
  sponsorship: string
}

const TBC = 'To confirm'

export const pursuits: Pursuit[] = [
  {
    id: 'platform',
    band: 'first',
    name: 'Wealth-platform or CRM provider (candidates: WealthSpectrum, Salesforce)',
    target: 'Target account to confirm; approved integration access for the first offer.',
    covasantBenefit: 'Approved integration access and a possible delivery route.',
    otherBenefit: 'Implementation capacity and complementary workflows that could increase adoption (hypothesis).',
    next: 'Confirm a target account, a useful workflow gap and the provider’s participation model.',
    owner: 'Accountable wealth offering owner, with account lead',
    sponsorship: TBC,
  },
  {
    id: 'cloud',
    band: 'first',
    name: 'Cloud and deployment relationships (Microsoft Azure, Google Cloud, Databricks)',
    target: 'The customer’s approved hosting route; account to confirm.',
    covasantBenefit: 'Deployment capability and possible joint account support.',
    otherBenefit: 'Customer solution opportunities on their platform, to be confirmed with them.',
    next: 'Confirm which existing relationships have wealth-relevant programmes, whether joint account support is available, and terms.',
    owner: TBC,
    sponsorship: TBC,
  },
  {
    id: 'data',
    band: 'first',
    name: 'Research and data provider (candidates: Morningstar, LSEG, FactSet)',
    target: 'Market and investment intelligence offering, including Liquidity Pulse.',
    covasantBenefit: 'Licensed content for intelligence workflows.',
    otherBenefit: 'A further route to use of their content, within the applicable agreement (hypothesis).',
    next: 'Validate coverage, AI and output rights, recipients and cost.',
    owner: 'Liquidity Pulse product owner',
    sponsorship: TBC,
  },
  {
    id: 'domain',
    band: 'credibility',
    name: 'Wealth practitioners and domain advisors',
    target: 'Evaluation of the first offer’s workflow quality; account to confirm.',
    covasantBenefit: 'Domain expertise, review of workflows and evidence from real use.',
    otherBenefit: 'Influence over what is built; to be confirmed with each participant.',
    next: 'Confirm availability, how evaluations would be run, and whether they would act as references.',
    owner: TBC,
    sponsorship: TBC,
  },
  {
    id: 'customers',
    band: 'credibility',
    name: 'Participating customers',
    target: 'Account to confirm.',
    covasantBenefit: 'Credible customer proof from real use.',
    otherBenefit: 'Early access and input into the offering; to be confirmed.',
    next: 'Agree a bounded trial, accepted outcomes and reference permission.',
    owner: 'Accountable wealth offering owner, with account lead',
    sponsorship: TBC,
  },
  {
    id: 'ecosystems',
    band: 'later',
    name: 'Relevant platform ecosystems',
    target: 'Accounts that use the relevant platform; to confirm.',
    covasantBenefit: 'Explore introductions and qualified opportunities.',
    otherBenefit: TBC,
    next: 'Confirm Covasant’s eligibility for each documented co-sell or marketplace route.',
    owner: TBC,
    sponsorship: TBC,
  },
  {
    id: 'networks',
    band: 'later',
    name: 'Implementation partners and industry networks',
    target: TBC,
    covasantBenefit: 'Explore joint delivery and introductions.',
    otherBenefit: TBC,
    next: 'Define selection criteria once customer value and delivery fit are demonstrated.',
    owner: TBC,
    sponsorship: TBC,
  },
]
