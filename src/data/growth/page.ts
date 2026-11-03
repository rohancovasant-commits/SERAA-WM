import type { SectionLink, SourceId } from '../types'
import { overviewHeadlines } from '../overviews'

export const growthHero = {
  eyebrow: '05 / GROWTH',
  title: overviewHeadlines.growth,
  subtitle:
    'Use current account access to prove useful workflows, package what transfers and expand through comparable customers and qualified partners.',
  status: 'Proposed growth plan · India first',
  note: 'A proposed plan, not a proven growth process.',
  primaryAction: 'Explore the approach',
  secondaryAction: 'View research',
}

/** Content slides after the first (Win the first offer is the introduction slide). */
export const growthSections: SectionLink[] = [
  { id: 'expand', label: 'Expand what works' },
  { id: 'organise', label: 'Organise to grow' },
]
export const firstSlideLabel = 'Win the first offer'

/** Old chapter anchors land on the slide that now carries their content. */
export const legacyAnchors: Record<string, string> = {
  approach: 'expand',
  sales: 'introduction',
  'commercial-model': 'expand',
  partnerships: 'expand',
  ownership: 'organise',
  scaling: 'expand',
}

export const researchPanel = {
  title: 'Growth research',
  intro:
    'Research date 28 October 2026. External commercial models show which approaches exist. They do not validate Covasant pricing, eligibility or demand.',
  published: [
    'TIFIN and Accenture describe wealth AI offered as a product, or as services around a platform.',
    'Salesforce publishes a pricing structure for its agent products. No vendor price is copied into this plan.',
    'Microsoft, Google and AWS document different marketplace and co-sell routes, each with its own eligibility.',
    'The FinOps framework describes relating cost to a unit of business value.',
  ],
  internal: [
    'Motilal work, Centrum discovery and the Liquidity Pulse POC are the current account and product starting points.',
    'Covasant publishes partner relationships. Programme tier, wealth credentials and sales support are not established.',
  ],
  toValidate: [
    'What each account relationship actually bought, and who sponsors the next scope.',
    'Whether a billing unit fits both customer value and full cost-to-serve.',
    'Which partner routes Covasant is eligible for, and who owns them.',
    'Whether delivered work transfers to a comparable customer with viable effort.',
  ],
  sourceIds: ['S09', 'S11', 'S34', 'S35', 'S36', 'S37', 'S38', 'S39', 'S17', 'S12', 'S40', 'S14'] as SourceId[],
}

export const growthClosing = {
  eyebrow: 'Growth principle',
  statement: 'Increase investment when accepted delivery transfers sustainably.',
  primary: { label: 'Next: Leadership decisions', path: '/decisions' },
  secondary: { label: 'Back to readiness', path: '/readiness' },
}
