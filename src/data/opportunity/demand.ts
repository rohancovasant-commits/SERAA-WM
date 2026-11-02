import type { Tone } from './opening'

export const demandHeading = 'Why would firms invest?'

export const demandFigures = {
  operational: {
    value: 41,
    caption: 'Of advisors’ time consumed by operational tasks.',
    segments: [
      { label: 'Operational tasks', value: 41 },
      { label: 'Other activities', value: 59 },
    ],
  },
  automation: {
    value: '76%',
    caption: 'Of advisors want AI-enabled systems to automate routine work.',
  },
  unifiedView: {
    value: '60%',
    caption: 'Of wealth executives acknowledge lacking a unified client view.',
  },
}

export const demandScope = 'Global research · Capgemini 2026'
export const demandFootnote = 'Global findings; customer budgets require validation.'

/** Full scope statement; also carried by the Capgemini source entry. */
export const demandQualifier =
  'Global findings from Capgemini World Wealth Report 2026. These are not India-specific rates or confirmed buying budgets.'

export interface Pressure {
  id: 'capacity' | 'information' | 'execution' | 'oversight'
  title: string
  text: string
  tone: Tone
  /** Original fuller wording, available to assistive technology. */
  detail: string
}

export const pressures: Pressure[] = [
  {
    id: 'capacity',
    title: 'Capacity',
    text: 'Avoidable work consumes staff time.',
    tone: 'blue',
    detail: 'RM capacity: reduce avoidable work so relationship managers can use their time more effectively.',
  },
  {
    id: 'information',
    title: 'Information',
    text: 'Knowledge is fragmented.',
    tone: 'violet',
    detail: 'Information access: help staff find reliable product, client and process information.',
  },
  {
    id: 'execution',
    title: 'Execution',
    text: 'Handoffs create friction.',
    tone: 'amber',
    detail: 'Operational execution: improve processing, handoffs and exception resolution.',
  },
  {
    id: 'oversight',
    title: 'Oversight',
    text: 'Completion and evidence need visibility.',
    tone: 'teal',
    detail: 'Oversight: improve visibility of obligations, evidence and completion.',
  },
]

export const nuvamaLine = 'Nuvama reports technology, AI and productivity initiatives within its Wealth business.'
export const nuvamaLimits =
  'Nuvama’s Q1 FY27 presentation describes technology, AI and productivity initiatives within its Wealth business. This demonstrates an investment priority, rather than a disclosed external AI budget.'
