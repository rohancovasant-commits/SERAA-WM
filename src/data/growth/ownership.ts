export const ownershipHeading = 'One accountable owner. Clear delivery responsibilities.'

export const ownerBlock = {
  title: 'Accountable wealth offering owner',
  subtitle: 'Portfolio priorities, investment, supported scope and performance.',
}

export interface OwnershipRole {
  id: 'product' | 'sales' | 'delivery'
  label: string
  text: string
}

export const ownershipRoles: OwnershipRole[] = [
  { id: 'product', label: 'Product', text: 'Packages, roadmap, releases and reusable assets.' },
  { id: 'sales', label: 'Sales', text: 'Qualification, sponsor, buying process and commercial next steps.' },
  { id: 'delivery', label: 'Delivery', text: 'Feasibility, effort, acceptance and operating transition.' },
]

export const sharedFoundation = ['Domain evaluation', 'Alliances', 'Finance/commercial/legal', 'Customer success']
export const ownershipStatus = 'Leadership decision · Named assignments TBC'

export const decisionRights = {
  label: 'Decision rights and capacity',
  items: [
    'The accountable owner needs authority and protected capacity.',
    'Domain reviewers own business rules and quality interpretation.',
    'Alliances owns counterparts, eligibility and joint account actions.',
    'Finance/commercial owns cost methodology, pricing authority and relevant terms.',
    'Customer success supports adoption and outcome review.',
    'Company-wide engineering headcount is not evidence of available wealth capacity.',
  ],
}

export const handoff = {
  label: 'Sales-to-delivery handoff',
  items: [
    'Requirements and exclusions.',
    'Dependencies and access.',
    'Baseline and acceptance.',
    'Commercial scope.',
    'Relevant readiness conditions.',
    'Customer/Covasant responsibilities.',
    'Support and handover.',
    'Change control.',
  ],
}
