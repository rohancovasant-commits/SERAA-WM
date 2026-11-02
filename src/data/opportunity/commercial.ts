export const commercialHeading = 'How does the opportunity become revenue?'

export const qualificationStages = [
  { name: 'Relevant organisations', criterion: 'Business fit' },
  { name: 'Suitable accounts', criterion: 'Need and access' },
  { name: 'Reachable opportunities', criterion: 'Sponsor and budget' },
  { name: 'Paying customers', criterion: 'Agreed commitment' },
]

export const revenueLabel = 'Proposed commercial components'

export const revenueComponents = [
  { name: 'Implementation', text: 'Integration and deployment.', nature: 'One-off' },
  { name: 'Software', text: 'An ongoing licence or subscription.', nature: 'Recurring' },
  { name: 'Operation', text: 'Support and managed services.', nature: 'Recurring, where agreed' },
]

export const revenueModel = {
  result: 'Serviceable annual revenue',
  terms: ['Qualified accounts', 'Validated annual contract value'],
  note: 'Model recurring revenue and one-off implementation fees separately.',
  /** Full statement, shown when the model note is expanded. */
  detail:
    'These are potential commercial components, not approved pricing. Account counts, contract values and conversion assumptions still require validation. Separate recurring revenue from one-off implementation fees.',
}

export const supportingEvidence = [
  'Relevant business needs',
  'Existing customer access',
  'Product and delivery initiatives',
  'Established technology markets',
]

export const requiredEvidence = [
  'Budgets and price acceptance',
  'Repeatable acquisition',
  'Verified outcomes and reusable scope',
  'Implementation and recurring margins',
]
