import type { ReviewDocument } from '../../data/decisions/types'
import { reviewTbc } from '../../data/decisions/review'

/**
 * Intended contents of one proposed review document. It is a description of what leadership should be able to
 * inspect, not a file: there is no download, no date and no named preparer.
 */
export function ProposedOutputPreview({ document, id, labelledBy }: { document: ReviewDocument; id: string; labelledBy: string }) {
  return (
    <div id={id} role="region" aria-labelledby={labelledBy} className="swap-in border-t border-line bg-accent-soft/40 px-4 pb-5 pt-4 sm:px-5">
      <dl className="space-y-3.5">
        <div>
          <dt className="text-sm font-bold uppercase tracking-[0.1em] text-accent-strong">Intended contents</dt>
          <dd className="mt-1 text-lg leading-snug text-navy">{document.contents}</dd>
        </div>
        <div>
          <dt className="text-sm font-bold uppercase tracking-[0.1em] text-slate">Proposed preparer</dt>
          <dd className="mt-1 text-lg leading-snug text-navy">
            {document.proposedPreparer}
            <span className="mt-0.5 block text-[0.9375rem] font-semibold text-amber">Named preparer: TBC.</span>
          </dd>
        </div>
      </dl>
      <p className="mt-4 text-[0.875rem] italic text-slate">{reviewTbc}</p>
    </div>
  )
}
