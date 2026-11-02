import type { EvidenceKind, SourceId } from '../types'

/** Shared shape for content on the Position page. Layout components read these; they hold no copy of their own. */
export interface ContentItem {
  id: string
  title: string
  /** The one short line shown by default. */
  shortCopy: string
  /** Set only where a status label materially clarifies the claim. */
  evidenceStatus?: EvidenceKind
  sourceIds?: SourceId[]
  /** Deeper material, shown in a drawer or disclosure. */
  expandedContent?: string[]
}
