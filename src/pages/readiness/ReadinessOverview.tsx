import { CircleDollarSign, FileSearch, FileText, ListChecks, UserRound, Wrench, type LucideIcon } from 'lucide-react'
import { ChapterButton, OverviewButtons, PanelButton } from '../../components/overview/parts'
import { ExecHeader } from '../../components/exec/ExecHeader'
import { overviewCopy as c } from '../../data/readiness/page'

const workIcon: Record<string, { icon: LucideIcon; tone: string }> = {
  evidence: { icon: FileSearch, tone: 'text-blue' },
  capability: { icon: Wrench, tone: 'text-accent' },
  ownership: { icon: UserRound, tone: 'text-violet' },
}
const outputIcons: LucideIcon[] = [ListChecks, FileText, UserRound, CircleDollarSign]

const areaLabel = 'text-[0.75rem] font-bold uppercase tracking-[0.14em]'

/**
 * Readiness overview as a decision brief: three answers (today, work needed, authorise next), the expected output,
 * and a small starting-evidence strip. The areas answer three questions; they are not stages and are not connected.
 * The authorisation is a proposal only: no budget, capacity or customer-delivery permission is implied.
 */
export function ReadinessOverview({
  eyebrow,
  onOpenStartingPoints,
  onGo,
}: {
  eyebrow: string
  onOpenStartingPoints: (opener: HTMLElement, id?: string) => void
  onGo: (id: string) => void
}) {
  return (
    <>
      <ExecHeader id="introduction-title" eyebrow={eyebrow} title={c.headline} wide />

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-10">
        <section aria-labelledby="ans-today" className="border-t-4 border-navy pt-4">
          <h2 id="ans-today" className={`${areaLabel} text-navy`}>
            {c.today.label}
          </h2>
          <p className="mt-2 text-[0.9375rem] leading-snug text-slate">{c.today.question}</p>
          <p className="mt-1 text-xl font-bold leading-snug text-heading">{c.today.answer}</p>
          <p className="mt-2 text-[0.9375rem] leading-snug text-slate">{c.today.support}</p>
          <p className="mt-2 text-[0.875rem] font-semibold leading-snug text-heading">{c.today.note}</p>
        </section>

        <section aria-labelledby="ans-work" className="pt-4">
          <h2 id="ans-work" className={`${areaLabel} text-slate`}>
            {c.work.label}
          </h2>
          <p className="mt-2 text-[0.9375rem] leading-snug text-slate">{c.work.question}</p>
          <ul className="mt-2 divide-y divide-dashed divide-line-strong">
            {c.work.items.map((item) => {
              const { icon: Icon, tone } = workIcon[item.id]
              return (
                <li key={item.id} className="flex items-start gap-3 py-2.5 first:pt-1">
                  <Icon aria-hidden strokeWidth={1.75} className={`mt-0.5 size-5 shrink-0 ${tone}`} />
                  <p className="text-base font-semibold leading-snug text-heading">
                    <span className={`${areaLabel} block text-[0.6875rem] text-slate`}>{item.label}</span>
                    {item.text}
                  </p>
                </li>
              )
            })}
          </ul>
        </section>

        <section aria-labelledby="ans-authorise" className="rounded-[12px] bg-navy px-6 py-5 text-white">
          <h2 id="ans-authorise" className={`${areaLabel} text-teal-bright`}>
            {c.authorise.label}
          </h2>
          <p className="mt-2 text-[0.9375rem] leading-snug text-white/75">{c.authorise.question}</p>
          <p className="mt-1 text-xl font-bold leading-snug">{c.authorise.answer}</p>
          <ul className="mt-3 space-y-1">
            {c.authorise.needs.map((n) => (
              <li key={n} className="flex items-center gap-2.5 text-base leading-snug">
                <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-teal-bright" />
                {n}
              </li>
            ))}
          </ul>
          <p className="mt-3 border-t border-white/20 pt-3 text-[0.875rem] font-semibold leading-snug text-teal-bright">{c.authorise.status}</p>
        </section>
      </div>

      <section aria-labelledby="expected-output" className="mt-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-0.5">
          <h2 id="expected-output" className={`${areaLabel} text-slate`}>
            {c.output.label}
          </h2>
          <p className="text-[0.875rem] text-slate">{c.output.support}</p>
        </div>
        <ul className="mt-2 grid divide-y divide-line border-y border-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {c.output.items.map((item, i) => {
            const Icon = outputIcons[i]
            return (
              <li key={item} className="flex items-center gap-2.5 py-2.5 lg:px-4 lg:first:pl-0">
                <Icon aria-hidden strokeWidth={1.75} className="size-4 shrink-0 text-accent" />
                <span className="text-[0.9375rem] font-semibold leading-snug text-heading">{item}</span>
              </li>
            )
          })}
        </ul>
      </section>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <section aria-labelledby="starting-evidence">
          <h2 id="starting-evidence" className={`${areaLabel} text-slate`}>
            {c.startsLabel}
          </h2>
          <ul className="mt-1 flex flex-wrap gap-x-6">
            {c.starts.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={(event) => onOpenStartingPoints(event.currentTarget, p.id)}
                  className="rounded-md py-0.5 text-left text-[0.9375rem] text-slate underline-offset-4 hover:text-accent hover:underline"
                >
                  <span className="font-semibold text-heading">{p.name}</span> · {p.status}
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-0.5 text-[0.875rem] leading-snug text-slate">{c.qualification}</p>
        </section>
        <OverviewButtons>
          <PanelButton onOpen={(opener) => onOpenStartingPoints(opener)}>{c.buttons[0]}</PanelButton>
          <ChapterButton onClick={() => onGo('assessment')}>{c.buttons[1]}</ChapterButton>
        </OverviewButtons>
      </div>
    </>
  )
}
