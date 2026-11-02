import { exec } from '../exec/styles'
import { SourceList } from '../ui/SourceEntry'
import { ratingsPanel } from '../../data/readiness/page'
import { evaluationHeading, examplesLabel, familyChecks, proofExamples, proofHeading, proofNote } from '../../data/readiness/proof'
import { RatingLegend } from './RatingBadge'
import { ProofFolders } from './ProofStandards'

const label = 'text-sm font-semibold uppercase tracking-[0.08em] text-slate'

/** Rating methodology and proof standards. Shown in the rail panel and inline in the requirements panel (never nested). */
export function RatingsMethod() {
  return (
    <div className="space-y-8">
      <p className="rounded-card bg-wash px-4 py-3 leading-snug">{ratingsPanel.intro}</p>
      <RatingLegend />
      <p className="rounded-card border border-line-strong px-4 py-3 text-[0.9375rem] leading-snug">{ratingsPanel.currentNote}</p>
      <ul className="space-y-2.5">
        {ratingsPanel.rules.map((rule) => (
          <li key={rule} className="flex gap-2.5 leading-snug">
            <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
            {rule}
          </li>
        ))}
      </ul>

      <section aria-label={proofHeading}>
        <h3 className="text-xl font-bold text-heading">{proofHeading}</h3>
        <p className={`mt-1 mb-5 ${exec.meta}`}>{proofNote}</p>
        <ProofFolders />
      </section>

      <section>
        <h3 className={label}>{examplesLabel}</h3>
        <ul className="mt-2 divide-y divide-line">
          {proofExamples.map((e) => (
            <li key={e.id} className="py-3 first:pt-0 leading-snug">
              <p className="font-semibold text-heading">{e.name}</p>
              <p className="mt-1">
                <span className="font-semibold">To demonstrate: </span>
                {e.toDemonstrate}
              </p>
              <p className="mt-1">
                <span className="font-semibold">To repeat: </span>
                {e.toRepeat}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className={label}>{evaluationHeading}</h3>
        <ul className="mt-2 divide-y divide-line">
          {familyChecks.map((f) => (
            <li key={f.family} className="py-2.5 first:pt-0 leading-snug">
              <span className="font-semibold text-heading">{f.name}: </span>
              {f.check}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className={`mb-2 ${label}`}>Research and benchmarks</h3>
        <p className="mb-3 text-[0.9375rem] leading-snug text-slate">{ratingsPanel.sourceNote}</p>
        <SourceList ids={ratingsPanel.sourceIds} />
      </section>
    </div>
  )
}
