/** Copy for the single Decisions slide. Proposals, milestones, review outputs and the record stay in the other decisions data files. */

export type DetailsTab = 'proposals' | 'record' | 'read' | 'sources'
export type RoadmapTab = 'roadmap' | 'review'

export const detailsTabs: { id: DetailsTab; label: string }[] = [
  { id: 'proposals', label: 'Five proposals' },
  { id: 'record', label: 'Decision record' },
  { id: 'read', label: 'How to read' },
  { id: 'sources', label: 'Evidence and sources' },
]

export const roadmapTabs: { id: RoadmapTab; label: string }[] = [
  { id: 'roadmap', label: 'Four milestones' },
  { id: 'review', label: 'Next review' },
]

/** Old chapter anchors open the supporting panel that now carries their content. */
export const legacyAnchors: Record<string, { panel: 'details' | 'roadmap'; tab: DetailsTab | RoadmapTab }> = {
  overview: { panel: 'details', tab: 'read' },
  decisions: { panel: 'details', tab: 'proposals' },
  roadmap: { panel: 'roadmap', tab: 'roadmap' },
  'next-review': { panel: 'roadmap', tab: 'review' },
  'decision-record': { panel: 'details', tab: 'record' },
}

export const slide = {
  headline: 'Agree the direction. Assign a lead. Request the first-customer plan.',
  asks: [
    {
      id: 'direction',
      label: 'Agree the direction',
      text: 'Build and deliver wealth AI solutions on SERAA, integrated into customers’ existing systems.',
    },
    {
      id: 'lead',
      label: 'Assign one lead',
      text: 'Nominate someone to coordinate Sales, Product and Delivery and stay accountable for progress.',
    },
    {
      id: 'plan',
      label: 'Request a concrete plan',
      text: 'Recommend the first customer and solution, with the people, cost and delivery approach required.',
    },
  ],
  reviewLabel: 'The next review should answer',
  questions: [
    'Which customer and problem—and why?',
    'What can SERAA deliver, and what needs changing or building?',
    'What will it cost, who will deliver it, and how will success be measured?',
  ],
  takeaway: 'Return for a delivery investment decision once the opportunity, capability needs and costs are clear.',
  note: 'Agree the named lead and next review date during the discussion.',
  buttons: { details: 'Decision details', roadmap: 'Roadmap and next-review requirements' },
}
