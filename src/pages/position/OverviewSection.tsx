import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ClipboardCheck, FileText, KeyRound, LifeBuoy, Database, Server, Wrench, type LucideIcon } from 'lucide-react'
import { PanelButton } from '../../components/overview/parts'
import { ExecHeader } from '../../components/exec/ExecHeader'
import { ClosingBand } from '../../components/position/parts'
import { exec } from '../../components/exec/styles'
import { overview as c } from '../../data/position/content'

/**
 * Position overview, explained through one illustrative example. The firm supplies the environment, the SERAA-enabled
 * solution supports a defined task, and Covasant is accountable for the agreed delivery and support scope. Proposed,
 * not built, deployed or selected for launch; the response preview is a schematic with no answer in it.
 */
const firmIcons: LucideIcon[] = [Server, Database, KeyRound]
const covasantIcons: LucideIcon[] = [Wrench, ClipboardCheck, LifeBuoy]

export function PositionOverview({
  eyebrow,
  onOpenModel,
  onOpenEvidence,
}: {
  eyebrow: string
  onOpenModel: (opener: HTMLElement) => void
  onOpenEvidence: (opener: HTMLElement) => void
}) {
  return (
    <>
      <ExecHeader id="introduction-title" eyebrow={eyebrow} title={c.headline} wide />
      <div className="mt-5 max-w-4xl border-l-[5px] border-accent pl-5">
        <p className="text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-accent-strong">{c.label}</p>
        <p className="mt-1.5 text-xl font-semibold leading-snug text-heading sm:text-2xl sm:leading-snug">{c.statement}</p>
      </div>

      <section aria-labelledby="practice-title" className="mt-10">
        <h2 id="practice-title" className="text-xl font-bold leading-tight text-heading">
          {c.practice}
        </h2>
        <p className={`mt-1 ${exec.meta}`}>{c.example}</p>

        <div className="mt-5 grid items-stretch gap-2 lg:grid-cols-[minmax(0,1fr)_9rem_minmax(0,1.3fr)_9rem_minmax(0,1fr)] lg:items-center lg:gap-0">
          <section aria-label={c.firm.title} className="rounded-xl border border-hairline bg-white px-5 py-6">
            <p className={exec.label}>{c.firm.title}</p>
            <p className="mt-1 text-xl font-bold leading-snug text-heading">{c.firm.role}</p>
            <ul className="mt-4 space-y-3">
              {c.firm.items.map((item, i) => {
                const Icon = firmIcons[i]
                return (
                  <li key={item} className="flex items-center gap-3 text-base font-medium leading-snug text-heading">
                    <Icon aria-hidden strokeWidth={1.6} className="size-5 shrink-0 text-slate" />
                    {item}
                  </li>
                )
              })}
            </ul>
          </section>

          <Link label={c.firmLink} lg={ArrowRight} narrow={ArrowDown} />

          <section aria-label={c.solution.title} className="flex flex-col justify-center rounded-xl bg-accent-strong px-6 py-6 text-white shadow-lift">
            <p className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-teal-bright">{c.solution.title}</p>
            <p className="mt-1 text-2xl font-bold leading-tight">{c.solution.role}</p>

            <div className="mt-4 rounded-lg bg-white px-4 py-3 text-heading">
              <p className="flex items-center gap-2 text-base font-semibold leading-snug">
                <span aria-hidden className="flex size-5 shrink-0 items-center justify-center rounded-full bg-wash text-[0.6875rem] font-bold text-slate">
                  RM
                </span>
                {c.solution.steps.ask}
              </p>
              <div className="mt-3 border-t border-line pt-3">
                <p className="text-base font-semibold leading-snug">{c.solution.steps.draft}</p>
                <div aria-hidden className="mt-2 space-y-1.5">
                  <div className="h-1.5 w-full rounded bg-line" />
                  <div className="h-1.5 w-3/4 rounded bg-line" />
                </div>
                <p aria-hidden className="mt-2 flex flex-wrap gap-1.5">
                  {['Source 1', 'Source 2'].map((s) => (
                    <span key={s} className="inline-flex items-center gap-1 rounded border border-line-strong px-1.5 py-0.5 text-[0.75rem] font-medium text-slate">
                      <FileText className="size-3" />
                      {s}
                    </span>
                  ))}
                </p>
              </div>
              <p className="mt-3 inline-block rounded bg-ev-validate-bg px-2 py-0.5 text-[0.8125rem] font-semibold text-ev-validate-fg">{c.solution.steps.review}</p>
            </div>
            <p className="mt-2 text-[0.8125rem] text-white/80">{c.solution.note}</p>
          </section>

          <Link label={c.covasantLink} lg={ArrowLeft} narrow={ArrowUp} />

          <section aria-label={c.covasant.title} className="rounded-xl border border-hairline border-t-[5px] border-t-navy-3 bg-white px-5 py-6">
            <p className={exec.label}>{c.covasant.title}</p>
            <p className="mt-1 text-xl font-bold leading-snug text-heading">{c.covasant.role}</p>
            <ul className="mt-4 space-y-3">
              {c.covasant.items.map((item, i) => {
                const Icon = covasantIcons[i]
                return (
                  <li key={item} className="flex items-center gap-3 text-base font-medium leading-snug text-heading">
                    <Icon aria-hidden strokeWidth={1.6} className="size-5 shrink-0 text-navy-3" />
                    {item}
                  </li>
                )
              })}
            </ul>
          </section>
        </div>
      </section>

      <div className="mt-8">
        <ClosingBand
          support={c.status}
          buttons={
            <>
              <PanelButton onOpen={onOpenModel}>{c.buttons.model}</PanelButton>
              <PanelButton onOpen={onOpenEvidence}>{c.buttons.evidence}</PanelButton>
            </>
          }
        >
          {c.recommendation}
        </ClosingBand>
      </div>
    </>
  )
}

/** A one-way labelled link pointing at the solution: a ruled arrow sideways on wide screens, up or down on narrow ones. */
function Link({ label, lg: Wide, narrow: Narrow }: { label: string; lg: typeof ArrowRight; narrow: typeof ArrowDown }) {
  const pointsLeft = Wide === ArrowLeft
  return (
    <div className="flex items-center justify-center gap-3 py-1 text-slate lg:flex-col lg:gap-2 lg:px-3 lg:py-0">
      <Narrow aria-hidden className="size-6 text-accent lg:hidden" />
      <span className="text-center text-[0.9375rem] font-semibold leading-tight text-heading lg:order-first">{label}</span>
      <span aria-hidden className={`hidden w-full items-center text-accent lg:flex ${pointsLeft ? 'flex-row-reverse' : ''}`}>
        <span className="h-0.5 flex-1 bg-accent/60" />
        <Wide className="-mx-1 size-5 shrink-0" />
      </span>
    </div>
  )
}
