import type { LucideIcon } from 'lucide-react'

export type EvidenceKind = 'research' | 'vendor' | 'internal' | 'poc' | 'proposed' | 'validate'

export type SourceId =
  | 'S02' | 'S03' | 'S04' | 'S05' | 'S06' | 'S07' | 'S08' | 'S09'
  | 'S10' | 'S11' | 'S12' | 'S13' | 'S14' | 'S15' | 'S16' | 'S17'
  | 'S18' | 'S19' | 'S20' | 'S21' | 'S23' | 'S24' | 'S25' | 'S26'
  | 'S27' | 'S28' | 'S29' | 'S30' | 'S31' | 'S32' | 'S34' | 'S35'
  | 'S36' | 'S37' | 'S38' | 'S39' | 'S40' | 'S42' | 'S43'
  | 'S44' | 'S45' | 'S46' | 'S47' | 'S48' | 'S49'

/** How a source should be weighed. One source can support several findings without becoming several independent proofs. */
export type SourceType =
  | 'Company-published claim'
  | 'External corroboration'
  | 'Assessment benchmark'

export interface Source {
  id: SourceId
  /** Optional weighting label used by the readiness assessment. */
  sourceType?: SourceType
  title: string
  /** Publisher or owner, where distinct from the title. */
  publisher?: string
  evidence: EvidenceKind
  /** Publication or display date, as stated in the brief. Omitted where unknown. */
  date?: string
  /** What the source is and how far it can be relied on. */
  note: string
  url?: string
  /** Internal sources can require authorised access. */
  access: 'external' | 'internal'
}

export interface NavItem {
  label: string
  path: string
  status: 'built' | 'placeholder'
  /** Number shown in the page eyebrow, e.g. "01". */
  number: string
}

export interface SectionLink {
  id: string
  label: string
}

export interface IconText {
  icon: LucideIcon
  title: string
  text: string
}

/** What a page says about itself: its introduction chapter, plus an evidence action in the rail and section menu. */
export interface PageIntro {
  /** One-line statement of the page. */
  summary?: string
  status?: string
  note?: string
  /** Short headline statements, each with a colour dot. */
  points?: { text: string; dotClass: string }[]
  /** A secondary action, such as opening the page's evidence drawer. */
  action?: { label: string; onOpen: (opener: HTMLElement) => void }
}
