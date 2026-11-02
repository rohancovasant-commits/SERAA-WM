import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Section } from '../../components/ui/Section'
import { ExecHeader } from '../../components/exec/ExecHeader'
import { DetailDrawer } from '../../components/ui/DetailDrawer'
import { EvidenceLabel } from '../../components/ui/EvidenceLabel'
import { SourceList } from '../../components/ui/SourceEntry'
import { PanelButton, RouteButton } from '../../components/overview/parts'
import { ClosingBand } from '../../components/position/parts'
import { PanelLabel } from '../../components/opportunity/shared'
import { exec } from '../../components/exec/styles'
import { useDrawer } from '../../hooks/useDrawer'
import { customers as c } from '../../data/position/content'
import { startingPoints } from '../../data/shared/startingPoints'
import type { SourceId } from '../../data/types'

const rowGrid = 'md:grid md:grid-cols-[9.5rem_minmax(0,1.1fr)_minmax(0,1.2fr)_minmax(0,1.2fr)] md:gap-x-10'

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-1">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 leading-snug">
          <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  )
}

/**
 * Target customers: one comparison of four customer groups, a recommendation, and a compact role strip.
 * The groups are not ranked or sized; the first row is only the proposed place to start. Rationale sits in a panel.
 */
export function CustomersSection() {
  const drawer = useDrawer<true>()
  const [more, setMore] = useState(false)
  const p = c.panel
  const sourceIds = [...new Set(startingPoints.flatMap((s) => s.sourceIds))] as SourceId[]

  return (
    <Section id="customers" headingId="customers-title" surface="sky">
      <ExecHeader id="customers-title" as="h2" eyebrow="Position · Target customers" title={c.headline} lede={c.lede} wide />

      <section aria-label="Customer group comparison" className="mt-6">
        <div role="table" aria-label="Customer groups compared" className="border-y border-line">
          <div role="row" className={`hidden border-b border-line-strong py-2.5 md:grid pl-5 pr-3 ${rowGrid}`}>
            <span role="columnheader" className={exec.label}>{c.columns.priority}</span>
            <span role="columnheader" className={exec.label}>{c.columns.group}</span>
            <span role="columnheader" className={exec.label}>{c.columns.reason}</span>
            <span role="columnheader" className={exec.label}>{c.columns.approach}</span>
          </div>
          {c.rows.map((r, i) => (
            <div
              key={r.id}
              role="row"
              className={`space-y-2 border-l-4 py-5 pl-5 pr-4 md:space-y-0 md:items-start ${rowGrid} ${r.lead ? 'border-l-accent bg-tint' : 'border-l-transparent'} ${i > 0 ? 'border-t border-t-line' : ''}`}
            >
              <p role="cell" className={`text-[0.8125rem] font-bold uppercase tracking-[0.1em] ${r.lead ? "text-accent-strong" : "text-slate"}`}>{r.status}</p>
              <div role="cell">
                <p className="text-xl font-bold leading-snug text-heading">{r.group}</p>
                <ul aria-label="Example organisations" className="mt-2.5 flex flex-wrap gap-1.5">
                  {r.names.map((n) => (
                    <li key={n.name} className={`rounded-full px-3 py-1 text-[0.875rem] font-semibold leading-5 ${n.start ? "bg-accent text-white" : "border border-line-strong bg-white text-heading"}`}>
                      {n.name}
                    </li>
                  ))}
                </ul>
              </div>
              <p role="cell" className="leading-snug">
                <span className="block text-[1.0625rem] font-semibold text-heading">{r.reason}</span>
                {more && <span className="mt-1 block text-[1.0625rem] text-heading/75">{r.detail}</span>}
              </p>
              <p role="cell" className="leading-snug">
                <span className="block text-[1.0625rem] font-semibold text-heading">{r.next}</span>
                {more && <span className="mt-1 block text-[1.0625rem] text-heading/75">{r.impact}</span>}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
          <p className={`min-w-0 flex-1 basis-[24rem] ${exec.meta}`}>{c.note}</p>
          <button type="button" aria-expanded={more} onClick={() => setMore((v) => !v)} className={exec.link}>
            {more ? "Show less" : "Show more"}
            <ChevronDown aria-hidden className={`size-4 transition-transform ${more ? "rotate-180" : ""}`} />
          </button>
        </div>
      </section>

      <div className="mt-8">
        <ClosingBand
          support={
            <>
              {c.reason}<span className="mt-1 block font-semibold text-heading">{c.qualifier}</span>
            </>
          }
          buttons={
            <>
              <PanelButton onOpen={(opener) => drawer.open(true, opener)}>{c.buttons.rationale}</PanelButton>
              <RouteButton to={c.accountsRoute}>{c.buttons.accounts}</RouteButton>
            </>
          }
        >
          {c.recommendation}
        </ClosingBand>
      </div>

      <section aria-label="Customer, users and buyer" className="mt-8">
        <dl className="grid divide-y divide-line border-y border-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {c.roles.map((s) => (
            <div key={s.label} className="px-0 py-4 md:px-6 md:first:pl-0">
              <dt className={exec.label}>{s.label}</dt>
              <dd className="mt-1.5 text-[1.0625rem] font-semibold leading-snug text-heading">{s.text}</dd>
            </div>
          ))}
        </dl>
        <p className={`mt-2 ${exec.meta}`}>{c.rolesCaption}</p>
      </section>

      <DetailDrawer open={drawer.value !== null} onClose={drawer.close} title={p.title} eyebrow="Supporting detail" returnFocusRef={drawer.trigger}>
        <div className="space-y-8">
          <p className="rounded-card bg-wash px-4 py-3 leading-snug">{p.intro}</p>
          <section>
            <PanelLabel>Group by group</PanelLabel>
            <ul className="mt-2 divide-y divide-line">
              {c.rows.map((r) => (
                <li key={r.id} className="py-3 first:pt-0">
                  <p className="font-semibold text-heading">{r.group}</p>
                  <p className="mt-1 leading-snug">{r.detail}</p>
                  <p className={`mt-1 ${exec.meta}`}>
                    <span className="font-semibold">To prove: </span>
                    {r.next} {r.impact}
                  </p>
                </li>
              ))}
            </ul>
          </section>
          {[p.whyAccess, p.notProof, p.qualification, p.alternatives, p.unresolved].map((block) => (
            <section key={block.label}>
              <PanelLabel>{block.label}</PanelLabel>
              <Bullets items={block.points} />
            </section>
          ))}

          <section>
            <PanelLabel>{p.evidenceLabel}</PanelLabel>
            <ul className="mt-2 divide-y divide-line">
              {startingPoints.map((sp) => (
                <li key={sp.id} className="py-3 first:pt-0">
                  <p className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-heading">{sp.name}</span>
                    <EvidenceLabel kind={sp.evidenceKind} />
                  </p>
                  <p className="mt-1 leading-snug">{sp.reportedStatus}</p>
                  <p className={`mt-1 ${exec.meta}`}>{p.startingPointNote}</p>
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <SourceList ids={sourceIds} />
            </div>
          </section>
        </div>
      </DetailDrawer>
    </Section>
  )
}
