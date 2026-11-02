import type { RefObject } from 'react'
import { DetailDrawer } from '../ui/DetailDrawer'
import { EvidenceBody } from '../market/EvidenceDrawer'
import { IcpDiagram } from '../market/IcpDiagram'
import { RoleDiagram } from '../market/RoleDiagram'
import { UserScale } from '../market/UserScale'
import { familyOfficeNote, icpTitle, rolesTitle, scaleTitle } from '../../data/opportunity/market'
import { PanelLabel } from './shared'

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
        <section aria-labelledby="support-fit">
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
