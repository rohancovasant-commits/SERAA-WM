import type { SectionLink, SourceId } from '../types'
import { overviewHeadlines } from '../overviews'

export const offeringsHero = {
  eyebrow: '03 / OFFERINGS',
  titleLines: [overviewHeadlines.offerings],
  subtitle:
    'Four offering families, serving multiple business functions—with selective investment in solutions we can deliver and repeat.',
  status: 'Starting portfolio hypothesis',
  primaryAction: 'Explore the portfolio',
  secondaryAction: 'View supporting assessment',
}

export const offeringsSections: SectionLink[] = [
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'intelligence', label: 'Intelligence' },
  { id: 'relationships', label: 'Relationships' },
  { id: 'operations', label: 'Operations' },
  { id: 'oversight', label: 'Oversight' },
  { id: 'development', label: 'Development' },
]

export const portfolioHeading = 'Four families. Two start from existing work.'
export const filterLabel = 'Business function'

export const segmentNote = {
  label: 'Functions and client segments',
  text: 'Business functions describe who performs the work. Client segments such as HNI and UHNI describe whom the wealth firm serves. Segment suitability must be assessed separately.',
}

/** Page-level supporting assessment, opened from the hero. */
export const assessmentPanel = {
  title: 'Supporting assessment',
  intro: 'The four families are portfolio hypotheses. They are not four finished products, four departments or four sequential phases. One offering can serve several functions.',
  alternativesLabel: 'Existing alternatives to compare',
  alternatives: [
    { name: 'TIFIN and FactSet', text: 'Wealth workflow AI, including a published partnership.', sourceIds: ['S09', 'S19'] as SourceId[] },
    { name: 'Salesforce', text: 'Advisor assistance within its platform.', sourceIds: ['S08'] as SourceId[] },
    { name: 'Microsoft SharePoint', text: 'Permission-aware agents over organisational content.', sourceIds: ['S20'] as SourceId[] },
    { name: 'WealthSpectrum', text: 'Wealth platform and integrations.', sourceIds: ['S06'] as SourceId[] },
    { name: 'FinregE', text: 'Obligation, change and evidence workflows.', sourceIds: ['S21'] as SourceId[] },
    { name: 'LSEG', text: 'Market-data redistribution terms that bear on source rights.', sourceIds: ['S14'] as SourceId[] },
  ],
  caveat:
    'Provider-published features establish relevant alternatives, not independently verified performance or Covasant compatibility.',
  sourceIds: ['S09', 'S19', 'S14', 'S20', 'S08', 'S06', 'S21'] as SourceId[],
}
