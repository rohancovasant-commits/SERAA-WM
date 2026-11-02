export const systemFitHeading = 'Build around the firm’s existing systems'
export const systemFitCopy = 'Choose the approach that meets the requirement and earns its cost.'

export const workingSurface = 'Useful work for RMs and operations'
export const covasantRole = 'Design · Integrate · Support'
export const systemsLabel = 'The firm’s existing systems'
export const systemBlocks = ['CRM', 'Portfolio systems', 'Documents', 'Approved data sources']

export type BlockKind = 'native' | 'specialist' | 'seraa'

export interface Approach {
  id: 'native' | 'specialist' | 'seraa' | 'combined'
  label: string
  /** One sentence shown when the tab is selected. */
  sentence: string
  /** Blocks drawn in the middle layer. */
  blocks: { kind: BlockKind; label: string }[]
}

export const approaches: Approach[] = [
  {
    id: 'native',
    label: 'Native tools',
    sentence: 'Configure and extend available functionality when it meets the need.',
    blocks: [{ kind: 'native', label: 'Native tools' }],
  },
  {
    id: 'specialist',
    label: 'Specialist product',
    sentence: 'Integrate a suitable product when it offers the strongest acceptable solution.',
    blocks: [{ kind: 'specialist', label: 'Specialist product' }],
  },
  {
    id: 'seraa',
    label: 'SERAA solution',
    sentence: 'Use reusable SERAA capabilities where a meaningful requirement remains.',
    blocks: [{ kind: 'seraa', label: 'SERAA solution' }],
  },
  {
    id: 'combined',
    label: 'Combined approach',
    sentence: 'Combine capabilities where the additional complexity is justified.',
    blocks: [
      { kind: 'native', label: 'Native tools' },
      { kind: 'specialist', label: 'Specialist product' },
      { kind: 'seraa', label: 'SERAA solution' },
    ],
  },
]

export const systemFitCaption = 'Illustrative delivery approaches.'

export const chooseHeading = 'How we choose'
export const chooseCriteria: { title: string; question: string }[] = [
  { title: 'Workflow fit', question: 'Does it support the work the user actually does?' },
  { title: 'Available functionality', question: 'What do the existing systems already provide?' },
  { title: 'Access', question: 'Can we reach the data, permissions and interfaces we need?' },
  { title: 'Quality', question: 'Does it meet the agreed acceptance measures?' },
  { title: 'Operating responsibility', question: 'Who owns running and supporting it?' },
  { title: 'Total cost', question: 'Does the benefit justify implementation and operating cost?' },
]
