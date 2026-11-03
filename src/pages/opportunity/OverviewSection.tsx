import { ArrowUpRight } from 'lucide-react'
import { exec } from '../../components/exec/styles'

const copy = {
  headline: 'Our focus within BFSI: Wealth Management',
  root: { title: 'BFSI', text: 'Banking, Financial Services & Insurance' },
  branches: ['Banking', 'Investment & related services', 'Insurance'],
  leaves: ['Asset management', 'Brokerage & securities'],
  focus: { tag: 'Our focus', title: 'Wealth management' },
  callout: {
    title: 'Helps individuals and families manage their wealth.',
    services: 'Advice · Investments · Ongoing client service',
    providers: 'Provided by specialist firms and bank wealth businesses.',
  },
  note: 'Simplified activity map; banks and financial groups can operate across branches.',
  seraa: 'SERAA focus: support the firms and teams serving wealth clients.',
  evidence: 'Explore the evidence',
  map: 'Market map',
}

const box = 'flex items-center justify-center rounded-[10px] px-4 py-4 text-center text-lg font-bold leading-snug sm:text-xl'
const neutral = `${box} bg-wash text-navy`

/** Elbow connector between a parent box and three evenly spaced children (decorative). */
function Fork() {
  return (
    <div aria-hidden className="relative hidden h-10 sm:block">
      <span className="absolute left-1/2 top-0 h-5 w-px bg-navy" />
      <span className="absolute left-[16.667%] right-[16.667%] top-5 h-px bg-navy" />
      <span className="absolute left-[16.667%] top-5 h-5 w-px bg-navy" />
      <span className="absolute left-1/2 top-5 h-5 w-px bg-navy" />
      <span className="absolute left-[83.333%] top-5 h-5 w-px bg-navy" />
    </div>
  )
}

/**
 * Opportunity overview, and the landing page: where wealth management sits within BFSI. A simplified activity map,
 * not a market-size or ranking diagram: banks and financial groups can operate across branches. The market map and the
 * evidence behind the judgement open in panels.
 */
export function OpportunityOverview({
  onOpenAccountMap,
  onOpenEvidence,
}: {
  eyebrow: string
  onOpenAccountMap: (opener: HTMLElement) => void
  onOpenEvidence: (opener: HTMLElement) => void
}) {
  return (
    <>
      <h1 id="introduction-title" className={`max-w-5xl ${exec.title}`}>
        {copy.headline}
      </h1>

      <div className="mt-8 grid items-end gap-x-6 gap-y-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,1.35fr)]">
        <div role="group" aria-label="Activity map: BFSI to wealth management">
          <div className="mx-auto max-w-sm rounded-[10px] bg-navy px-6 py-4 text-center text-white">
            <p className="text-3xl font-bold leading-tight">{copy.root.title}</p>
            <p className="mt-0.5 text-base leading-snug text-white/90">{copy.root.text}</p>
          </div>

          <Fork />

          <ul className="mt-4 grid gap-3 sm:mt-0 sm:grid-cols-3 sm:gap-6">
            {copy.branches.map((b, i) => (
              <li key={b} className={i === 1 ? `${box} bg-accent-soft text-navy ring-1 ring-accent/30` : neutral}>
                {b}
              </li>
            ))}
          </ul>

          <div aria-hidden className="relative hidden h-10 sm:block">
            <span className="absolute left-1/2 top-0 h-5 w-px bg-navy" />
            <span className="absolute left-[16.667%] right-[16.667%] top-5 h-px bg-navy" />
            <span className="absolute left-[16.667%] top-5 h-5 w-px bg-navy" />
            <span className="absolute left-1/2 top-5 h-5 w-px bg-navy" />
            <span className="absolute left-[83.333%] top-5 h-5 w-px bg-navy" />
          </div>

          <ul className="mt-6 grid gap-3 sm:mt-0 sm:grid-cols-3 sm:gap-6">
            {copy.leaves.map((l) => (
              <li key={l} className={`${neutral} text-base sm:min-h-[4.5rem] sm:text-lg`}>
                {l}
              </li>
            ))}
            <li className="relative">
              <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-accent bg-white px-3 py-0.5 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-accent-strong">
                {copy.focus.tag}
              </span>
              <p className={`${box} h-full bg-accent text-white sm:min-h-[4.5rem]`}>{copy.focus.title}</p>
            </li>
          </ul>
        </div>

        <aside className="relative rounded-xl border border-accent bg-white px-5 py-4 lg:mb-0 lg:ml-0">
          <span aria-hidden className="absolute -left-6 bottom-9 hidden h-px w-6 bg-accent lg:block" />
          <span aria-hidden className="absolute -left-[1.625rem] bottom-[2.1rem] hidden size-2 rounded-full bg-accent lg:block" />
          <p className="text-lg font-bold leading-snug text-accent-strong">{copy.callout.title}</p>
          <p className="mt-2 text-[0.9375rem] leading-snug text-heading">{copy.callout.services}</p>
          <p className="mt-2 border-t border-line pt-2 text-[0.9375rem] leading-snug text-slate">{copy.callout.providers}</p>
        </aside>
      </div>

      <p className="mt-4 text-[0.9375rem] italic text-slate">{copy.note}</p>

      <div className="mt-6 border-t-2 border-accent pt-4">
        <p className="text-2xl font-bold leading-snug text-navy sm:text-[1.75rem]">
          <span className="text-accent-strong">SERAA focus</span>
          {copy.seraa.slice('SERAA focus'.length)}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={(event) => onOpenEvidence(event.currentTarget)}
            className="inline-flex items-center gap-1.5 border-b border-accent pb-0.5 text-base font-medium text-accent hover:text-accent-strong"
          >
            {copy.evidence}
            <ArrowUpRight aria-hidden className="size-4" />
          </button>
          <button type="button" aria-haspopup="dialog" onClick={(event) => onOpenAccountMap(event.currentTarget)} className={`${exec.link} text-base`}>
            {copy.map}
          </button>
        </div>
      </div>
    </>
  )
}
