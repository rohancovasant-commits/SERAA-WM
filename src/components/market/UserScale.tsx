import { Users } from 'lucide-react'
import { pulseCallout, scaleEvidence, scaleQualification } from '../../data/opportunity/market'
import { SourceReference } from '../ui/SourceReference'
import { EvidenceLabel } from '../ui/EvidenceLabel'

/** Two company-disclosed RM counts, shown as evidence of scale inside one account. Never summed or extrapolated. */
export function UserScale() {
  return (
    <div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {scaleEvidence.map((item) => (
          <li key={item.company} className="flex">
            <article className="flex w-full flex-col rounded-panel border border-line bg-white p-5 shadow-[0_1px_2px_rgb(13_26_53/0.04)] sm:p-6">
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em] text-slate">
                <Users aria-hidden className="size-4 text-accent" />
                {item.company}
              </p>
              <p className="mt-2 text-3xl font-bold leading-tight text-accent sm:text-[2rem]">{item.figure}</p>
              <p className="mt-1.5 text-[1.0625rem] leading-snug">{item.basis}</p>
              <p className="mt-0.5 text-[0.9375rem] leading-snug text-slate">Source: {item.sourceLabel}.</p>
              <p className="mt-3">
                <SourceReference ids={item.sources} />
              </p>
            </article>
          </li>
        ))}
      </ul>
      <p className="mt-4 rounded-card border-l-4 border-amber bg-amber-soft px-4 py-3 text-[1.0625rem] font-medium leading-snug">
        {scaleQualification}
      </p>

      <aside
        aria-label={pulseCallout.title}
        className="mt-8 rounded-panel border-2 border-dashed border-violet/50 bg-violet-soft px-5 py-5 sm:px-7 sm:py-6"
      >
        <div className="flex flex-wrap items-center gap-2.5">
          <EvidenceLabel kind="poc" />
          <span className="rounded-full bg-amber-soft px-3 py-1 text-[0.8125rem] font-bold uppercase tracking-[0.06em] text-amber ring-1 ring-amber-mid">
            {pulseCallout.status}
          </span>
        </div>
        <h4 className="mt-3 text-xl font-bold leading-snug text-navy">{pulseCallout.title}</h4>
        <p className="mt-1.5 max-w-3xl leading-snug">{pulseCallout.text}</p>
      </aside>
    </div>
  )
}
