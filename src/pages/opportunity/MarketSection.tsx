import { Section } from '../../components/ui/Section'
import { ExecHeader } from '../../components/exec/ExecHeader'
import { DrawerLink } from '../../components/exec/Links'
import { PanelButton } from '../../components/overview/parts'
import { AccountExplorer, type ExplorerTarget } from '../../components/opportunity/AccountExplorer'
import { MarketSupport } from '../../components/opportunity/MarketSupport'
import { Populations } from '../../components/opportunity/Populations'
import { PursuitLandscape } from '../../components/opportunity/PursuitLandscape'
import { Implication } from '../../components/opportunity/shared'
import { useSources } from '../../context/SourcesContext'
import { useDrawer } from '../../hooks/useDrawer'
import { marketCase } from '../../data/opportunity/case'
import { sourcesLinkLabel } from '../../data/opportunity/market'

/**
 * Market chapter: where the plausible buyer is. The dominant visual is the three proposed pursuit groups; the research
 * three populations sit under it. The account explorer and the supporting evidence open in panels.
 */
export function MarketSection() {
  const { openAll } = useSources()
  const explorer = useDrawer<ExplorerTarget>()
  const support = useDrawer<true>()

  return (
    <Section id="market" headingId="market-title" surface="warm">
      <ExecHeader
        id="market-title"
        as="h2"
        eyebrow={marketCase.eyebrow}
        title={marketCase.headline}
        wide
        action={<DrawerLink onOpen={openAll}>{sourcesLinkLabel}</DrawerLink>}
      />

      <div className="mt-6 space-y-4">
        <PursuitLandscape
          onOpenGroup={(group, opener) => explorer.open({ group }, opener)}
          onOpenAccount={(account, opener) => explorer.open({ account }, opener)}
        />
        <Populations />
      </div>

      <div className="mt-5">
        <Implication
          buttons={
            <>
              <PanelButton onOpen={(opener) => explorer.open({}, opener)}>Account explorer</PanelButton>
              <PanelButton onOpen={(opener) => support.open(true, opener)}>Supporting evidence</PanelButton>
            </>
          }
        >
          {marketCase.implication}
        </Implication>
      </div>

      <AccountExplorer open={explorer.value !== null} target={explorer.value ?? {}} onClose={explorer.close} returnFocusRef={explorer.trigger} />
      <MarketSupport open={support.value !== null} onClose={support.close} returnFocusRef={support.trigger} />
    </Section>
  )
}
