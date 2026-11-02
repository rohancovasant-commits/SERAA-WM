import type { SectionLink, SourceId } from '../types'
import { overviewHeadlines } from '../overviews'

export const positionHero = {
  eyebrow: '02 / POSITION',
  titleLines: [overviewHeadlines.position],
  subtitle:
    'Build Covasant’s wealth business through SERAA-enabled packaged solutions, integration and accountable delivery, starting with a commercially justified workflow.',
  status: 'Proposed strategic direction',
  primaryAction: 'Explore the position',
  secondaryAction: 'View research',
}

/** Four content chapters after the Overview. Old anchors: #direction opens the Overview, #commitments opens Why choose us. */
export const positionSections: SectionLink[] = [
  { id: 'customers', label: 'Target customers' },
  { id: 'offer', label: 'The offer' },
  { id: 'system-fit', label: 'System fit' },
  { id: 'reasons-to-choose', label: 'Why choose us' },
]

/** Old chapter anchors and the chapter that now carries their content. */
export const legacyAnchors: Record<string, string> = { direction: 'introduction', commitments: 'reasons-to-choose' }

/** Content of the page-level research drawer opened from the hero. */
export const researchPanel = {
  title: 'Research behind this position',
  intro: 'This page is a proposed direction for leadership to evaluate. It is not an established market position.',
  published: [
    'TIFIN publishes composable wealth agents.',
    'Accenture combines wealth workflows, software and implementation.',
    'Salesforce, Intellect and CogniCor publish advisor-focused capabilities.',
    'Google Cloud names Covasant in its AI-native services ecosystem.',
  ],
  internal: [
    'Motilal Oswal: reported delivery experience.',
    'Centrum: discovery evidence.',
    'Liquidity Pulse: proof of concept.',
  ],
  toValidate: ['Customer fit.', 'Delivery quality.', 'Economics.'],
  sourceIds: ['S09', 'S11', 'S08', 'S15', 'S16', 'S17', 'S18', 'S04', 'S12'] as SourceId[],
}
