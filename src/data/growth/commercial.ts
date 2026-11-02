import type { SourceId } from '../types'

export const commercialHeading = 'Make the offer understandable—and supportable'

export interface CommercialComponent {
  id: 'implementation' | 'recurring' | 'operation'
  label: string
  text: string
  /** The visual object that stands for the component. */
  object: string
}

export const commercialComponents: CommercialComponent[] = [
  { id: 'implementation', label: 'Implementation', text: 'Integration, configuration, acceptance and adoption.', object: 'Implementation plan' },
  { id: 'recurring', label: 'Recurring capability', text: 'Supported solution access and maintained assets, where applicable.', object: 'Application package' },
  { id: 'operation', label: 'Optional operation', text: 'Contracted monitoring, evaluations, incidents and maintenance.', object: 'Service runbook' },
]

export const commercialStatement = 'Price the combination the customer needs.'
export const pricingStatus = 'Pricing hypothesis'

export interface PricingFamily {
  id: 'intelligence' | 'service' | 'operations' | 'oversight'
  label: string
  unit: string
  define: string
}

export const pricingFamilies: PricingFamily[] = [
  { id: 'intelligence', label: 'Intelligence', unit: 'Firm/team subscription', define: 'Define recipients, frequency, source scope and additions.' },
  { id: 'service', label: 'Relationship/service', unit: 'Team or user bands', define: 'Define users, sources, usage allowance and escalation.' },
  { id: 'operations', label: 'Operations', unit: 'Case/document volume bands', define: 'Define billable work, exceptions, retries and duplicates.' },
  { id: 'oversight', label: 'Oversight', unit: 'Entity/obligation scope', define: 'Define approved coverage, updates and operating responsibilities.' },
]
export const pricingFamiliesLabel = 'Pricing families'
export const pricingUnitsNote = 'Units to test—not a published rate card.'

export const economics = {
  label: 'Check the economics',
  customer: {
    title: 'Customer value',
    items: [
      'Current effort and cost.',
      'Usable capacity released.',
      'Review and rework.',
      'Service quality and adoption.',
      'Evidenced business effects.',
    ],
  },
  covasant: {
    title: 'Covasant economics',
    items: [
      'Discovery and domain work.',
      'Integration and implementation.',
      'Content and partner charges.',
      'Compute and model usage.',
      'Evaluation, support and changes.',
    ],
  },
  notes: [
    'Separate implementation and recurring economics.',
    'Track reusable product investment explicitly.',
    'Distinguish software revenue from recurring managed services.',
    'Include customer-paid cloud/model costs in total-cost comparisons.',
    'Set pricing floors and discount authority after reviewing actual costs.',
    'Do not use AUM growth or market returns as the default fee basis.',
  ],
  sourceIds: ['S40', 'S34'] as SourceId[],
  sourceNote: 'External pricing and the FinOps framework show how others structure and test pricing. They are not Covasant rates.',
}

export const nativeWork = {
  label: 'Native-platform and specialist-product work',
  text: 'These can be legitimate delivery routes. Track their revenue, costs and reusable assets separately from SERAA software growth.',
}
