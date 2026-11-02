import type { ContentItem } from './types'
import type { Tone } from '../opportunity/opening'

export const reasonsHeading = 'Give a wealth firm a reason to choose us'
export const reasonsCopy = 'Each promise needs evidence.'
export const reasonsLabel = 'Advantages to demonstrate'

export interface Reason extends ContentItem {
  /** shortCopy holds the proof. */
  tone: Tone
  icon: 'fit' | 'delivery' | 'integration' | 'operation' | 'economics'
}

export const reasons: Reason[] = [
  { id: 'fit', title: 'Workflow fit', shortCopy: 'Domain-reviewed scenarios and user acceptance.', tone: 'teal', icon: 'fit' },
  {
    id: 'delivery',
    title: 'Predictable delivery',
    shortCopy: 'Known prerequisites and repeatable implementation effort.',
    tone: 'blue',
    icon: 'delivery',
  },
  {
    id: 'integration',
    title: 'Integration fit',
    shortCopy: 'Tested interfaces, permissions and failure handling.',
    tone: 'violet',
    icon: 'integration',
  },
  {
    id: 'operation',
    title: 'Reliable operation',
    shortCopy: 'Named owners, monitoring and incident resolution.',
    tone: 'amber',
    icon: 'operation',
  },
  {
    id: 'economics',
    title: 'Viable economics',
    shortCopy: 'Benefits assessed after implementation and operating costs.',
    tone: 'teal',
    icon: 'economics',
  },
]

export const googleNote = {
  text: 'Google Cloud names Covasant in its AI-native services ecosystem.',
  qualifier: 'Ecosystem credibility; wealth-specific delivery proof still required.',
  sourceId: 'S17' as const,
}

export const marketHeading = 'What already exists in the market?'
export const marketIntro = 'Competitive context only; the Opportunity page covers the wider landscape.'
export const marketItems: ContentItem[] = [
  { id: 'tifin', title: 'TIFIN', shortCopy: 'Wealth agent components and shared context.', evidenceStatus: 'vendor', sourceIds: ['S09'] },
  { id: 'salesforce', title: 'Salesforce', shortCopy: 'Advisor assistance within its platform.', evidenceStatus: 'vendor', sourceIds: ['S08'] },
  { id: 'intellect', title: 'Intellect', shortCopy: 'Wealth platform and advisor capabilities.', evidenceStatus: 'vendor', sourceIds: ['S15'] },
  {
    id: 'cognicor',
    title: 'CogniCor',
    shortCopy: 'Advisor workflows extending beyond meeting notes.',
    evidenceStatus: 'vendor',
    sourceIds: ['S16'],
  },
  {
    id: 'accenture',
    title: 'Accenture',
    shortCopy: 'Packaged wealth workflows and implementation.',
    evidenceStatus: 'vendor',
    sourceIds: ['S11'],
  },
]
