import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Section } from '../../components/ui/Section'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { exec } from '../../components/exec/styles'
import {
  actionSummary,
  actionSummaryNote,
  developmentHeading,
  developmentIntro,
  foundations,
  pauseHeading,
  pauseReasons,
  stages,
  stagesNote,
} from '../../data/offerings/development'
import { families } from '../../data/offerings/families'
import { toneStyles } from '../../styles/tones'

/**
 * Development chapter. One visual: the four evidence gates every package passes, drawn as a connected track, with the
 * shared capabilities as the band underneath that all of them draw on. The proposed next action per family is a short
 * row beside the track's caption. These are stages of a package, not phases of the portfolio, and the page says so.
 * The conditions for pausing are behind a click.
 */
export function DevelopmentSection() {
  const [pauseOpen, setPauseOpen] = useState(false)
  return (
    <Section id="development" headingId="development-title" surface="sky">
      <SectionHeading id="development-title" eyebrow="Development" title={developmentHeading} sentence={developmentIntro} />

      <div className={`${exec.panel} mt-10 bg-white px-5 py-6 sm:px-7`}>
        <p className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <span className={exec.label}>Gates for each package · not phases of the portfolio</span>
          <span className="text-base font-semibold text-heading">{stagesNote}</span>
        </p>
        <ol className="mt-5 grid gap-6 lg:grid-cols-4 lg:gap-0">
          {stages.map((stage, i) => (
            <li key={stage.title} className="relative lg:pr-6">
              {i < stages.length - 1 && <span aria-hidden className="absolute left-12 top-[1.375rem] hidden h-0.5 w-[calc(100%-3.25rem)] bg-navy-3/35 lg:block" />}
              <span className="relative flex size-11 items-center justify-center rounded-full bg-navy-3 text-lg font-bold text-white">{i + 1}</span>
              <h3 className="mt-3 text-xl font-bold leading-tight text-heading">{stage.title}</h3>
              <p className="mt-1 text-base leading-snug text-slate">{stage.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-6 border-t border-hairline-soft pt-4">
          <p className={exec.label}>Proposed next action by family</p>
          <ul className="mt-3 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
            {actionSummary.map((item) => {
              const family = families.find((f) => f.id === item.family)!
              const tone = toneStyles[family.tone]
              return (
                <li key={item.family} className="flex gap-2.5">
                  <span aria-hidden className={`mt-1 h-10 w-1.5 shrink-0 rounded-full ${tone.solid}`} />
                  <p className="leading-snug">
                    <span className="block text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-slate">{family.shortTitle}</span>
                    <span className="block text-lg font-semibold text-heading">{item.action}</span>
                  </p>
                </li>
              )
            })}
          </ul>
          <p className={`mt-3 ${exec.meta}`}>{actionSummaryNote}</p>
        </div>
      </div>

      <div className="mt-4 rounded-panel bg-navy-3 px-6 py-6 text-white sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-bright">{foundations.label}</p>
        <ul className="mt-4 grid gap-y-3 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/20">
          {foundations.items.map((item) => (
            <li key={item} className="text-lg font-semibold leading-snug lg:px-5 lg:first:pl-0">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-lg leading-snug text-white/90">
          {foundations.copy} <span className="text-[0.9375rem] text-white/75">{foundations.note}</span>
        </p>
      </div>

      <div className="mt-6">
        <button
          type="button"
          aria-expanded={pauseOpen}
          aria-controls="pause-reasons"
          onClick={() => setPauseOpen((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-md text-base font-semibold text-amber underline-offset-4 hover:underline"
        >
          {pauseHeading}
          <ChevronDown aria-hidden className={`size-4 transition-transform ${pauseOpen ? 'rotate-180' : ''}`} />
        </button>
        {pauseOpen && (
          <ul id="pause-reasons" className="swap-in mt-3 max-w-2xl space-y-2.5 rounded-panel border border-amber/40 bg-amber-soft px-6 py-5">
            {pauseReasons.map((reason) => (
              <li key={reason} className="flex gap-2.5 text-[1.0625rem] leading-snug">
                <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-amber" />
                {reason}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  )
}
