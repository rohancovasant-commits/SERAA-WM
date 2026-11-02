import { ArrowRight } from 'lucide-react'
import { competitionConclusion, competitionNote, competitionSentence, competitors, competitorCategories } from '../../data/opportunity/competition'
import { demandFigures, demandFootnote, demandQualifier, nuvamaLimits, pressures } from '../../data/opportunity/demand'
import type { SourceId } from '../../data/types'
import { opportunityOverview } from '../../data/overviews'
import { exec } from '../exec/styles'
import { FindingList, PanelBlock, PanelBullets } from './parts'
import { SourceList } from '../ui/SourceEntry'
import { StatStrip } from '../exec/StatStrip'

const heading = 'text-sm font-semibold uppercase tracking-[0.08em] text-slate'

/**
 * Supporting evidence for the Opportunity overview: the global demand figures and the existing alternatives. Plain
 * text and an inline source list, so nothing opens on top of the panel.
 */
export function DemandAlternativesPanel({ onGo }: { onGo: (chapter: 'demand' | 'competition') => void }) {
  const { operational, automation, unifiedView } = demandFigures
  return (
    <div className="space-y-8">
      <section>
        <p className="rounded-card bg-wash px-4 py-3 font-semibold leading-snug text-navy">{opportunityOverview.detail.recommendation}</p>
        <div className="mt-5">
          <FindingList items={opportunityOverview.detail.findings} />
        </div>
        <div className="mt-5">
          <PanelBlock title={opportunityOverview.detail.icpLabel}>
            <PanelBullets items={opportunityOverview.detail.icpItems} />
          </PanelBlock>
        </div>
        <p className={`mt-4 ${exec.meta}`}>{opportunityOverview.detail.qualifier}</p>
      </section>

      <section>
        <h3 className={heading}>Demand signals · global research</h3>
        <StatStrip
          columns={3}
          className="mt-3"
          items={[
            { value: `${operational.value}%`, label: 'of advisor time on operational tasks' },
            { value: automation.value, label: 'of advisors want AI automation' },
            { value: unifiedView.value, label: 'of wealth executives lack a unified client view' },
          ]}
        />
        <p className={`mt-3 ${exec.meta}`}>{demandQualifier}</p>
        <p className={`mt-1 ${exec.meta}`}>{demandFootnote}</p>
        <ul className="mt-4 divide-y divide-line">
          {pressures.map((p) => (
            <li key={p.id} className="py-2.5 first:pt-0">
              <span className="font-semibold text-navy">{p.title}. </span>
              {p.text}
            </li>
          ))}
        </ul>
        <p className={`mt-3 ${exec.meta}`}>{nuvamaLimits}</p>
        <button type="button" onClick={() => onGo('demand')} className={`${exec.link} mt-3`}>
          Open the Demand chapter
          <ArrowRight aria-hidden className="size-4" />
        </button>
      </section>

      <section>
        <h3 className={heading}>Existing alternatives</h3>
        <p className="mt-2 font-semibold text-navy">{competitionSentence}</p>
        <ul className="mt-3 divide-y divide-line">
          {competitorCategories.map((category) => (
            <li key={category.id} className="py-2.5 first:pt-0">
              <span className="font-semibold text-navy">{category.name}: </span>
              {competitors
                .filter((c) => c.categoryId === category.id)
                .map((c) => c.name)
                .join(', ')}
            </li>
          ))}
        </ul>
        <p className="mt-3 rounded-card bg-wash px-4 py-3 leading-snug">{competitionConclusion}</p>
        <p className={`mt-3 ${exec.meta}`}>{competitionNote}</p>
        <button type="button" onClick={() => onGo('competition')} className={`${exec.link} mt-3`}>
          Open the Competition chapter
          <ArrowRight aria-hidden className="size-4" />
        </button>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-slate">Sources</h3>
        <SourceList ids={Array.from(new Set<SourceId>(['S03', 'S04', ...competitors.flatMap((c) => c.sources)]))} />
      </section>
    </div>
  )
}
