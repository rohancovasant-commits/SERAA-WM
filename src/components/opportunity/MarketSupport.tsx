import type { RefObject } from 'react'
import { DetailDrawer } from '../ui/DetailDrawer'
import { EvidenceBody } from '../market/EvidenceDrawer'
import { IcpDiagram } from '../market/IcpDiagram'
import { RoleDiagram } from '../market/RoleDiagram'
import { UserScale } from '../market/UserScale'
import { familyOfficeNote, icpTitle, rolesTitle, scaleTitle } from '../../data/opportunity/market'
import { PanelLabel } from './shared'
import { marketCase, pursuitGroups } from '../../data/opportunity/case'

interface MarketSupportProps {
  open: boolean
  onClose: () => void
  returnFocusRef: RefObject<HTMLElement | null>
}

const sectionTitle = 'mb-4 text-[1.5rem] font-bold leading-tight tracking-tight text-heading'

/**
 * Supporting detail for the Market chapter, in one panel: the fit criteria, who buys, uses and approves with the
 * company-reported user scale, and the sizing boundary with regulatory counts and their units, dates and limits.
 */
export function MarketSupport({ open, onClose, returnFocusRef }: MarketSupportProps) {
  return (
    <DetailDrawer open={open} onClose={onClose} title="Market evidence and definitions" eyebrow="Supporting evidence" returnFocusRef={returnFocusRef} wide>
      <div className="space-y-10">
        <section aria-labelledby="support-directions">
          <h3 id="support-directions" className={sectionTitle}>
            {marketCase.landscapeLabel}
          </h3>
          <ul className="divide-y divide-line">
            {pursuitGroups.map((g) => (
              <li key={g.id} className="py-3 first:pt-0 leading-snug">
                <p className="font-semibold text-heading">
                  {g.step}. {g.label}: {g.who}
                </p>
                <p className="text-slate">{g.why}</p>
              </li>
            ))}
          </ul>
          <p className="mt-3 rounded-card bg-wash px-4 py-3 leading-snug">{marketCase.landscapeNote}</p>
          <p className="mt-5 font-semibold text-heading">{marketCase.populationsLabel}</p>
          <ul className="mt-2 divide-y divide-line">
            {marketCase.populations.map((p) => (
              <li key={p.id} className="py-2.5 first:pt-0 leading-snug">
                <span className="font-semibold text-heading">{p.label}: </span>
                {p.text}
              </li>
            ))}
          </ul>
          <p className="mt-3 leading-snug text-slate">{marketCase.implication}</p>
        </section>

        <section aria-labelledby="support-fit" className="border-t border-line pt-8">
          <h3 id="support-fit" className={sectionTitle}>
            {icpTitle}
          </h3>
          <IcpDiagram />
          <p className="mt-5 rounded-card bg-wash px-4 py-3 leading-snug">{familyOfficeNote}</p>
        </section>

        <section aria-labelledby="support-roles" className="border-t border-line pt-8">
          <h3 id="support-roles" className={sectionTitle}>
            {rolesTitle}
          </h3>
          <RoleDiagram />
          <div className="mt-8">
            <PanelLabel>{scaleTitle}</PanelLabel>
            <div className="mt-3">
              <UserScale />
            </div>
          </div>
        </section>

        <section aria-labelledby="support-sizing" className="border-t border-line pt-8">
          <h3 id="support-sizing" className="sr-only">
            Sizing boundary, regulatory counts and sources
          </h3>
          <EvidenceBody onNavigate={onClose} />
        </section>
      </div>
    </DetailDrawer>
  )
}
