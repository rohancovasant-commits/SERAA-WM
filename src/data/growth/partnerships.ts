import type { SourceId } from '../types'

export const partnershipsHeading = 'Give every partnership a customer purpose'

export interface RelationshipType {
  id: 'cloud' | 'crm' | 'supplier' | 'domain'
  label: string
  mutualValue: string
  nextAction: string
  status: string
}

export const relationshipTypes: RelationshipType[] = [
  {
    id: 'cloud',
    label: 'Cloud/data ecosystem',
    mutualValue: 'Relevant implementations, technical support and account development.',
    nextAction: 'Confirm status and connect a named opportunity to a counterpart.',
    status: 'Account-linked qualification',
  },
  {
    id: 'crm',
    label: 'CRM/core wealth systems',
    mutualValue: 'Implementation capacity or a complementary extension.',
    nextAction: 'Qualify approved access, responsibilities and commercial terms.',
    status: 'Candidate route',
  },
  {
    id: 'supplier',
    label: 'Research/data supplier',
    mutualValue: 'Licensed content used within a useful workflow.',
    nextAction: 'Validate coverage, AI/output rights, recipients and cost.',
    status: 'Candidate route',
  },
  {
    id: 'domain',
    label: 'Domain expertise',
    mutualValue: 'Paid workflow judgement and validation.',
    nextAction: 'Agree capacity, deliverables and evaluation ownership.',
    status: 'Proposed requirement',
  },
]

export const targetAccountLabel = 'Target account'
export const dependencyLabel = 'Adjacent workflow dependency'
export const relationshipTypesLabel = 'Relationship types'
export const relationshipRecord = ['Target account', 'Dependency removed', 'Mutual benefit', 'Owner', 'Next action']
export const relationshipRecordLabel = 'Every relationship record'

export const activitiesHeading = 'Different activities, with different eligibility and responsibilities.'
export const partnerActivities = [
  { id: 'cosell', label: 'Co-selling' },
  { id: 'delivery', label: 'Delivery' },
  { id: 'marketplace', label: 'Marketplace procurement' },
] as const

export const channelPanel = {
  label: 'Channel eligibility matters',
  findings: [
    { text: 'Microsoft documents a services co-sell route for qualified partners; Covasant eligibility needs confirmation.', sourceIds: ['S35', 'S36'] as SourceId[] },
    { text: 'Google’s documented professional-services Marketplace route currently requires US buyers and sellers. Software offers and other partner routes have separate conditions.', sourceIds: ['S37'] as SourceId[] },
    { text: 'AWS documents a domestic India seller/buyer route covering software and services, subject to registration and offer conditions.', sourceIds: ['S38', 'S39'] as SourceId[] },
    { text: 'No Covasant enrolment or eligibility is assumed.', sourceIds: [] as SourceId[] },
    { text: 'Do not change customer architecture simply to create a marketplace transaction.', sourceIds: [] as SourceId[] },
  ],
  apiKeyNote: 'Customer-supplied API keys do not automatically establish content-use or redistribution rights.',
  apiKeySourceIds: ['S14'] as SourceId[],
}
