import type { SourceId } from '../types'
import type { ContentItem } from './types'

export const directionHeading = 'The business we should build'
export const directionIntro = 'A wealth AI solutions and delivery specialist.'

export interface BusinessModel extends ContentItem {
  id: 'standalone' | 'bespoke' | 'packaged'
  recommended?: boolean
}

export const businessModels: BusinessModel[] = [
  { id: 'standalone', title: 'Standalone product', shortCopy: 'A standard tool for a recurring job.' },
  { id: 'bespoke', title: 'Bespoke project', shortCopy: 'Engineering for one customer’s requirements.' },
  {
    id: 'packaged',
    title: 'Packaged solutions + delivery',
    shortCopy: 'Reusable capabilities, adapted to the firm and supported in production.',
    evidenceStatus: 'proposed',
    recommended: true,
  },
]

export const directionStatement = 'Keep a broad wealth offering. Invest selectively in repeatable solutions.'

export interface Alternative extends ContentItem {
  /** What the customer buys. */
  purchase: string
  /** The strategic tradeoff. */
  tradeoff: string
  highlighted?: boolean
}

export const alternatives: Alternative[] = [
  {
    id: 'platform',
    title: 'Full wealth platform provider',
    shortCopy: '',
    purchase: 'The customer buys a core wealth platform and its modules.',
    tradeoff: 'Breadth is high, but it means a large product and support commitment alongside established platform vendors.',
  },
  {
    id: 'saas',
    title: 'Standalone wealth SaaS provider',
    shortCopy: '',
    purchase: 'The customer subscribes to a standard tool for a defined job.',
    tradeoff: 'Repeatability is strong, but the tool must fit beside the firm’s existing systems and compete with published products.',
  },
  {
    id: 'horizontal',
    title: 'Horizontal AI platform vendor',
    shortCopy: '',
    purchase: 'The customer buys general AI capabilities usable across functions.',
    tradeoff: 'Reach is wide, but wealth workflows, controls and adoption still have to be built by someone.',
  },
  {
    id: 'bespoke',
    title: 'Bespoke implementation firm',
    shortCopy: '',
    purchase: 'The customer buys engineering for its own requirements.',
    tradeoff: 'Fit can be high, but reuse and economics depend on every engagement.',
  },
  {
    id: 'native',
    title: 'Native-platform implementation specialist',
    shortCopy: '',
    purchase: 'The customer buys configuration and extension of a platform it already owns.',
    tradeoff: 'It stays close to existing systems, but value is bounded by what the platform provides.',
  },
  {
    id: 'specialist',
    title: 'Wealth AI solutions and delivery specialist',
    shortCopy: '',
    purchase: 'The customer buys reusable wealth workflows, adapted, integrated and supported.',
    tradeoff: 'It balances reuse and fit, but needs evidence of customer fit, delivery quality and economics.',
    highlighted: true,
  },
]

export const directionResearch = {
  heading: 'Research context',
  points: [
    'TIFIN already publishes composable wealth agents.',
    'Accenture already combines wealth workflows, software and implementation.',
    'The proposed business model therefore needs evidence of customer fit, delivery quality and economics.',
  ],
  caveat: 'The highlighted option is a proposed direction. It is not uniquely available to Covasant.',
  sourceIds: ['S09', 'S11'] as SourceId[],
}
