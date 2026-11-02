import { milestoneDetailLabel, milestoneNote, milestones } from '../../data/growth/scaling'
import { BulletList, Disclosure } from './Disclosure'

/** Heights step upward so the pathway reads as accumulating evidence. No dates, no quantities. */
const rise = ['lg:mt-24', 'lg:mt-16', 'lg:mt-8', 'lg:mt-0']
const tone = [
  { edge: 'border-blue', badge: 'bg-blue' },
  { edge: 'border-violet', badge: 'bg-violet' },
  { edge: 'border-accent', badge: 'bg-accent' },
  { edge: 'border-accent-strong', badge: 'bg-accent-strong' },
]

/** Four evidence milestones as ascending steps. Evidence and investment detail sits in one disclosure beneath. */
export function MilestonePath() {
  return (
    <div>
      <ol className="grid items-start gap-5 lg:grid-cols-4 lg:gap-4">
        {milestones.map((m, i) => (
          <li key={m.id} className={`min-w-0 rounded-panel border-t-4 bg-white px-5 pb-6 pt-6 ring-1 ring-line ${tone[i].edge} ${rise[i]}`}>
            <span aria-hidden className={`flex size-10 items-center justify-center rounded-full text-lg font-bold text-white ${tone[i].badge}`}>
              {i + 1}
            </span>
            <h3 className="mt-4 text-[0.9375rem] font-bold uppercase tracking-[0.1em] text-navy">{m.title}</h3>
            <p className="mt-2 text-lg leading-snug text-ink">{m.summary}</p>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-[0.9375rem] font-semibold italic text-slate">{milestoneNote}</p>
      <Disclosure label={milestoneDetailLabel} className="mt-4">
        <ol className="grid gap-x-10 gap-y-7 md:grid-cols-2">
          {milestones.map((m, i) => (
            <li key={m.id}>
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em] text-navy">
                <span aria-hidden className={`flex size-6 items-center justify-center rounded-full text-xs text-white ${tone[i].badge}`}>
                  {i + 1}
                </span>
                {m.title}
              </h3>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.08em] text-slate">Evidence needed</p>
              <BulletList items={m.evidenceNeeded} className="mt-1.5 text-[0.9375rem]" />
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.08em] text-slate">Investment implication</p>
              <p className="mt-1 text-[0.9375rem] leading-snug">{m.investmentImplication}</p>
            </li>
          ))}
        </ol>
      </Disclosure>
    </div>
  )
}
