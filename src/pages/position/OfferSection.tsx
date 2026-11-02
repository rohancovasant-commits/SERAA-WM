import { Fragment, useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Section } from '../../components/ui/Section'
import { ExecHeader } from '../../components/exec/ExecHeader'
import { DetailDrawer } from '../../components/ui/DetailDrawer'
import { PanelButton } from '../../components/overview/parts'
import { ClosingBand } from '../../components/position/parts'
import { PanelLabel } from '../../components/opportunity/shared'
import { exec } from '../../components/exec/styles'
import { useDrawer } from '../../hooks/useDrawer'
import { offer as c } from '../../data/position/content'
import { packageChecklist } from '../../data/position/offer'


const statusStyle = {
  lead: 'bg-white text-accent-strong ring-1 ring-accent/40',
  poc: 'bg-ev-poc-bg text-ev-poc-fg',
} as const

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
 * The offer: four potential entry points compared on one surface. The first row is the provisional lead; statuses
 * describe where each came from, not readiness. The example package and the comparative reasoning sit in panels.
 */
export function OfferSection() {
  const [more, setMore] = useState(false)
  const why = useDrawer<true>()
  const example = useDrawer<true>()
  const w = c.whyPanel
  const ex = c.example

  return (
    <Section id="offer" headingId="offer-title">
      <ExecHeader id="offer-title" as="h2" eyebrow="Position · The offer" title={c.headline} lede={c.lede} wide />

      <section aria-label="Entry point comparison" className="mt-8">
        <ul className="grid gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-4 xl:gap-y-0">
          {c.rows.map((r, i) => (
            <li
              key={r.id}
              className={`border-t-[3px] px-5 pb-6 pt-5 xl:row-span-3 xl:grid xl:grid-rows-subgrid ${i === 0 ? 'border-t-accent bg-tint' : 'border-t-line-strong'}`}
            >
              <div className="pb-5">
                <div className="min-h-7">
                  {r.status && r.statusKind && (
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[0.8125rem] font-semibold leading-5 ${statusStyle[r.statusKind]}`}>{r.status}</span>
                  )}
                </div>
                <h3 className="mt-1 text-xl font-bold leading-snug text-heading">{r.entry}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-snug text-slate">{r.users}</p>
              </div>

              <div className="border-t border-line-strong py-4">
                <p className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-accent-strong">{c.columns.why}</p>
                <p className="mt-1.5 text-[1.0625rem] font-semibold leading-snug text-heading">{r.whyShort}</p>
                {more && <p className="mt-1.5 text-[0.9375rem] leading-snug text-heading/75">{r.why}</p>}
              </div>

              <div className="border-t border-line-strong pt-4">
                <p className={exec.label}>{c.columns.tradeoff}</p>
                <p className="mt-1.5 text-[1.0625rem] font-semibold leading-snug text-heading">{r.tradeoffShort}</p>
                {more && <p className="mt-1.5 text-[0.9375rem] leading-snug text-heading/75">{r.tradeoff}</p>}
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
          <p className={`min-w-0 flex-1 basis-[24rem] ${exec.meta}`}>{c.note}</p>
          <button type="button" aria-expanded={more} onClick={() => setMore((v) => !v)} className={exec.link}>
            {more ? 'Show less' : 'Show more'}
            <ChevronDown aria-hidden className={`size-4 transition-transform ${more ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </section>

      <div className="mt-8">
        <ClosingBand
          support={
            <>
              {c.reason}<span className="mt-1 block font-semibold text-heading">{c.status}</span>
            </>
          }
          buttons={
            <>
              <PanelButton onOpen={(opener) => why.open(true, opener)}>{c.buttons.why}</PanelButton>
              <PanelButton onOpen={(opener) => example.open(true, opener)}>{c.buttons.example}</PanelButton>
            </>
          }
        >
          {c.recommendation}
        </ClosingBand>
      </div>

      <DetailDrawer open={why.value !== null} onClose={why.close} title={w.title} eyebrow="Supporting detail" returnFocusRef={why.trigger} wide>
        <div className="space-y-8">
          <p className="rounded-card bg-wash px-4 py-3 leading-snug">{w.intro}</p>

          <section>
            <PanelLabel>{w.comparisonLabel}</PanelLabel>
            <div className="mt-3 space-y-5">
              {w.candidates.map((cand) => (
                <div key={cand.id}>
                  <p className="font-semibold text-heading">{cand.name}</p>
                  <dl className="mt-1 divide-y divide-line border-y border-line">
                    {w.criteria.map((crit, i) => {
                      const text = cand.evidence[i]
                      const missing = text === 'To establish'
                      return (
                        <div key={crit} className="grid gap-0.5 py-1.5 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-4">
                          <dt className="text-[0.9375rem] text-slate">{crit}</dt>
                          <dd className={`leading-snug ${missing ? 'italic text-slate' : 'font-medium text-heading'}`}>{text}</dd>
                        </div>
                      )
                    })}
                  </dl>
                </div>
              ))}
            </div>
          </section>

          <section>
            <PanelLabel>{w.reasoningLabel}</PanelLabel>
            <Bullets items={w.reasoning} />
            <p className="mt-3 text-[0.9375rem] font-medium leading-snug">{w.closing}</p>
          </section>
        </div>
      </DetailDrawer>

      <DetailDrawer open={example.value !== null} onClose={example.close} title={ex.title} eyebrow="Supporting detail" returnFocusRef={example.trigger}>
        <div className="space-y-8">
          <section>
            <p className={exec.label}>{ex.status}</p>
            <p className="mt-1 text-xl font-bold leading-snug text-heading">“{ex.name}”</p>
          </section>

          <section>
            <PanelLabel>{ex.deliverablesLabel}</PanelLabel>
            <ul className="mt-2 divide-y divide-line">
              {ex.deliverables.map((d) => (
                <li key={d.title} className="py-3 first:pt-0">
                  <p className="font-semibold text-heading">{d.title}</p>
                  <p className="mt-0.5 leading-snug">{d.text}</p>
                  <p className={`mt-0.5 ${exec.label}`}>{d.tag}</p>
                </li>
              ))}
            </ul>
            <p className={`mt-1 ${exec.meta}`}>Intended for reuse; to validate.</p>
          </section>

          <section>
            <PanelLabel>{ex.workflowLabel}</PanelLabel>
            <ol className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-2">
              {ex.steps.map((step, i) => (
                <Fragment key={step}>
                  <li className="rounded-md border border-hairline bg-white px-3 py-1.5 text-[0.9375rem] font-medium text-heading">{step}</li>
                  {i < ex.steps.length - 1 && <ArrowRight aria-hidden className="size-4 text-slate" />}
                </Fragment>
              ))}
            </ol>
          </section>

          <section>
            <PanelLabel>{ex.scopeLabel}</PanelLabel>
            <ul className="mt-2 divide-y divide-line">
              {c.details.map((d) => (
                <li key={d.title} className="py-3 first:pt-0">
                  <p className="font-semibold text-heading">{d.title}</p>
                  <p className="mt-0.5 leading-snug">{d.text}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <PanelLabel>Measures to establish</PanelLabel>
            <Bullets items={c.measures} />
            <p className={`mt-2 ${exec.meta}`}>{c.measuresNote}</p>
          </section>

          <section>
            <PanelLabel>What makes this a real package</PanelLabel>
            <Bullets items={packageChecklist} />
          </section>

          <p className="rounded-card bg-wash px-4 py-3 leading-snug">{c.boundary}</p>
        </div>
      </DetailDrawer>
    </Section>
  )
}
