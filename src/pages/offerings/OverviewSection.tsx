import { DevelopmentSequence, FirstFocusStatement, PortfolioMap, portfolioColumns } from '../../components/overview/PortfolioMap'
import { NextAction, PanelButton } from '../../components/overview/parts'
import { ExecHeader } from '../../components/exec/ExecHeader'
import { offeringsOverview as content } from '../../data/overviews'

/**
 * Offerings overview. One visual: a portfolio map of four proposed families with Relationships raised as the proposed
 * first-focus candidate and Intelligence labelled as the POC starting point. The recommendation line and a compact
 * development sequence for the selected scope sit under it. The launch status stays unresolved: this is a
 * recommendation, not a decision, and the families are not phases. The comparison and the workflow are in two panels.
 */
export function OfferingsOverview({
  eyebrow,
  onOpenCompare,
  onOpenWorkflow,
}: {
  eyebrow: string
  onOpenCompare: (opener: HTMLElement) => void
  onOpenWorkflow: (opener: HTMLElement) => void
}) {
  return (
    <>
      <ExecHeader id="introduction-title" eyebrow={eyebrow} title={content.headline} wide />

      <div className="mt-8 space-y-6">
        <PortfolioMap />

        <div className={`grid gap-5 lg:items-start lg:gap-3 ${portfolioColumns}`}>
          <FirstFocusStatement />
          <DevelopmentSequence />
        </div>
      </div>

      <div className="mt-6">
        <NextAction
          buttons={
            <>
              <PanelButton onOpen={onOpenCompare}>{content.buttons[0]}</PanelButton>
              <PanelButton onOpen={onOpenWorkflow}>{content.buttons[1]}</PanelButton>
            </>
          }
        >
          {content.next}
        </NextAction>
      </div>
    </>
  )
}
