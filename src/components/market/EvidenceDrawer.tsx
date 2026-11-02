import type { RefObject } from 'react'
import { DetailDrawer } from '../ui/DetailDrawer'
import { EvidenceLabel } from '../ui/EvidenceLabel'
import { SourceList } from '../ui/SourceEntry'
import { evidenceDrawer as content, sizingTitle } from '../../data/opportunity/market'
import type { SourceId } from '../../data/types'
import { SizingBoundary } from './SizingBoundary'

const heading = 'text-sm font-semibold uppercase tracking-[0.08em] text-slate'

const allSources: SourceId[] = [
  ...content.regulatory.figures.flatMap((figure) => figure.sources),
  ...content.alternatives.items.flatMap((item) => item.sources),
]

interface EvidenceDrawerProps {
  open: boolean
  onClose: () => void
  returnFocusRef: RefObject<HTMLElement | null>
}

/** Body of the market evidence panel: sizing boundary, definitions, counts and sources. Also shown inside other panels. */
export function EvidenceBody({ onNavigate }: { onNavigate?: () => void }) {
  return (
      <div className="space-y-9">
        <section aria-labelledby="sizing-title">
          <h3 id="sizing-title" className="mb-4 text-[1.5rem] font-bold leading-tight tracking-tight text-navy">
            {sizingTitle}
          </h3>
          <SizingBoundary onNavigate={onNavigate} />
        </section>

        <div className="space-y-8 border-t border-line pt-8">
          <section>
            <h3 className={heading}>{content.universe.title}</h3>
            <p className="mt-3 rounded-card bg-wash px-4 py-3 leading-snug">{content.universe.text}</p>
          </section>

          <EvidenceLabel kind="research" />

          <section>
            <h3 className={heading}>{content.regulatory.title}</h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {content.regulatory.figures.map((figure) => (
                <div key={figure.label}>
                  <p className="text-3xl font-semibold leading-tight">{figure.value}</p>
                  <p className="font-medium leading-snug">{figure.label}</p>
                  <p className="text-[0.9375rem] text-slate">{figure.basis}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 rounded-card bg-wash px-4 py-3 leading-snug">{content.regulatory.explanation}</p>
            <p className="mt-2 text-[0.9375rem] font-medium text-amber">{content.regulatory.warning}</p>
          </section>

          <section>
            <h3 className={heading}>{content.industry.title}</h3>
            <p className="mt-3 text-3xl font-semibold leading-tight">{content.industry.value}</p>
            <p className="font-medium leading-snug">{content.industry.label}</p>
            <p className="text-[0.9375rem] text-slate">{content.industry.basis}</p>
            <p className="mt-3 rounded-card bg-wash px-4 py-3 leading-snug">{content.industry.explanation}</p>
          </section>

          <section>
            <h3 className={heading}>{content.alternatives.title}</h3>
            <ul className="mt-3 space-y-3">
              {content.alternatives.items.map((item) => (
                <li key={item.company} className="leading-snug">
                  <span className="font-semibold">{item.company}. </span>
                  {item.text}
                </li>
              ))}
            </ul>
            <p className="mt-3 font-medium leading-snug text-navy">{content.alternatives.takeaway}</p>
            <p className="mt-2 text-[0.9375rem] text-slate">{content.alternatives.caveat}</p>
          </section>

          <section>
            <h3 className={`mb-3 ${heading}`}>Sources</h3>
            <SourceList ids={allSources} />
          </section>
        </div>
      </div>
  )
}

/** Secondary drawer: what can and cannot be sized today, then the regulatory counts, each with its definition, date and source. */
export function EvidenceDrawer({ open, onClose, returnFocusRef }: EvidenceDrawerProps) {
  return (
    <DetailDrawer open={open} onClose={onClose} title={content.title} eyebrow={content.eyebrow} returnFocusRef={returnFocusRef} wide>
      <EvidenceBody onNavigate={onClose} />
    </DetailDrawer>
  )
}
