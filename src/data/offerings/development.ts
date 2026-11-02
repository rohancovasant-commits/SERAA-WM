import type { FamilyId } from './families'

export const developmentHeading = 'Develop each package through evidence gates'
export const developmentIntro = 'Advance solutions independently. Expand when quality, reuse and economics support it.'

/** Proposed actions, not rankings or calendar phases. Listed in the order given in the brief. */
export const actionSummary: { family: FamilyId; action: string }[] = [
  { family: 'relationships', action: 'Qualify a package' },
  { family: 'operations', action: 'Verify reusable assets' },
  { family: 'intelligence', action: 'Validate the existing POC' },
  { family: 'oversight', action: 'Scope a customer-led pilot' },
]
export const actionSummaryNote = 'Proposed actions. Not rankings or fixed phases.'

export const stages: { title: string; text: string }[] = [
  { title: 'Qualify the need', text: 'Owner, recurring problem, baseline, alternatives and buying route.' },
  { title: 'Prove a bounded workflow', text: 'Access, quality, permissions and known failure behaviour.' },
  { title: 'Accept production delivery', text: 'Customer acceptance, adoption, monitoring, support and full cost.' },
  { title: 'Demonstrate reuse', text: 'Maintained assets transferred with acceptable effort and quality.' },
]
export const stagesNote = 'Existing work enters at its evidenced stage.'

export const pauseHeading = 'When should we pause?'
export const pauseReasons = [
  'Native functionality meets the need adequately.',
  'Important systems cannot be accessed.',
  'Outputs are not repeatedly useful.',
  'Customisation or support undermines the commercial case.',
  'Necessary ownership or content rights are unavailable.',
]

export const foundations = {
  label: 'Shared capabilities—where reuse helps',
  items: ['Sources and permissions', 'References and document handling', 'Workflow and controlled actions', 'Evaluation and monitoring'],
  copy: 'Assess availability with product and engineering owners.',
  note: 'Proposed shared requirements. Not confirmed SERAA capabilities.',
}

export const closingStatement = 'Grow portfolio breadth as evidence and delivery capacity improve.'
export const closingActions = {
  primary: { label: 'Next: Assess readiness', path: '/readiness' },
  secondary: { label: 'Back to position', path: '/position' },
}
