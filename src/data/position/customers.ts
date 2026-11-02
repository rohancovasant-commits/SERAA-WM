import type { ContentItem } from './types'

export const customersHeading = 'Start with a workflow worth solving'
export const customersCopy = 'Prioritise Indian, RM-led wealth firms and clearly identified wealth business units.'

export interface CustomerTile extends ContentItem {
  /** Key into the supplied market photographs. */
  image: 'wealthAdvisory' | 'distribution' | 'bankWealth'
}

export const customerTiles: CustomerTile[] = [
  {
    id: 'wealth-firms',
    title: 'Wealth firms',
    shortCopy: 'RM, service and operational workflows.',
    image: 'wealthAdvisory',
  },
  {
    id: 'business-units',
    title: 'Wealth business units',
    shortCopy: 'A defined sponsor, scope and system boundary.',
    image: 'distribution',
  },
  {
    id: 'private-banks',
    title: 'Private banks',
    shortCopy: 'Selective opportunities within bank requirements.',
    image: 'bankWealth',
  },
]

export const qualification = ['Named owner', 'Recurring need', 'System access', 'Budget route']

export const buyersHeading = 'Who buys and who uses?'
export const buyers: { role: string; concern: string }[] = [
  { role: 'Wealth head', concern: 'Service capacity and business benefit.' },
  { role: 'COO', concern: 'Processing effort and exceptions.' },
  { role: 'CIO/CTO', concern: 'Architecture and integration.' },
  { role: 'Risk, compliance and security', concern: 'Controls and reviewability.' },
  { role: 'RMs and service teams', concern: 'Daily usefulness.' },
  { role: 'Finance and procurement', concern: 'Supplier confidence and total cost.' },
]

export const otherSituations = {
  label: 'Other customer situations',
  note: 'Each would need its own qualification before it is treated as a target.',
  items: ['PMS enterprises', 'Investment advisers', 'Family offices', 'Wealth technology providers'],
}

export const customersFootnote = 'Proposed customer segments, not sized or ranked.'
