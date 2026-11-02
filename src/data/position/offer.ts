import type { ContentItem } from './types'

export const offerHeading = 'What a customer buys'

export interface OfferPart extends ContentItem {
  id: 'capability' | 'implementation' | 'operation'
  /** Small uppercase label above the caption. */
  label: string
}

export const offerParts: OfferPart[] = [
  {
    id: 'capability',
    label: 'Packaged capability',
    title: 'Packaged capability',
    shortCopy: 'A defined workflow with reusable software and evaluation assets.',
  },
  {
    id: 'implementation',
    label: 'Implementation',
    title: 'Implementation',
    shortCopy: 'Integration, configuration, acceptance and adoption.',
  },
  {
    id: 'operation',
    label: 'Ongoing operation',
    title: 'Ongoing operation',
    shortCopy: 'Monitoring, support, quality checks and agreed updates.',
  },
]

export const offerStatement = 'Scope each part separately. Combine them to fit the customer.'

export const packageHeading = 'What makes this a real package?'
export const packageChecklist = [
  'Supported workflow and user.',
  'Inputs, outputs and system compatibility.',
  'Data and licensing dependencies.',
  'Permissions, approvals and exception handling.',
  'Evaluation and acceptance measures.',
  'Implementation prerequisites.',
  'Release and support ownership.',
  'Pricing basis and exclusions.',
]
