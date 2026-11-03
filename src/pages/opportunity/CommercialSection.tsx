import { Cloud, Plus, Settings } from 'lucide-react'
import { Section } from '../../components/ui/Section'
import { exec } from '../../components/exec/styles'

const copy = {
  eyebrow: 'Commercial potential · Proposed model',
  tag: '02 / Two revenue streams',
  headline: ['Charge for setup.', 'Earn ongoing revenue from the solution.'],
  oneOff: { label: 'One-off fee', title: 'Set up the solution', text: 'Integration, configuration and deployment.' },
  recurring: { label: 'Recurring fees', title: 'Provide the solution and agreed support', text: 'Solution access, maintenance and optional operation.' },
  note: 'Proposed pricing model; customer willingness to pay remains to be tested.',
}

/**
 * Commercial potential chapter: a proposed revenue model, not a forecast. Two revenue streams, a one-off setup fee and
 * recurring fees. No price, margin, market size or reuse claim: those inputs do not exist yet.
 */
export function CommercialSection() {
  return (
    <Section id="commercial-potential" headingId="commercial-title" surface="warm">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p aria-hidden className="text-[0.8125rem] font-bold uppercase tracking-[0.16em] text-accent">
          {copy.eyebrow}
        </p>
        <p aria-hidden className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-slate">
          {copy.tag}
        </p>
      </div>
      <h2 id="commercial-title" className={`mt-3 max-w-5xl ${exec.title}`}>
        {copy.headline[0]} <span className="block sm:inline lg:block">{copy.headline[1]}</span>
      </h2>

      <div className="mt-8 grid items-stretch gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.15fr)] lg:gap-6">
        <section aria-labelledby="fee-one-off" className="rounded-[10px] border border-hairline border-t-4 border-t-navy bg-white px-8 py-8">
          <Settings aria-hidden strokeWidth={1.5} className="size-10 text-navy" />
          <h3 id="fee-one-off" className="mt-8 text-3xl font-bold uppercase leading-tight text-navy">
            {copy.oneOff.label}
          </h3>
          <p className="mt-3 text-xl font-semibold leading-snug text-heading">{copy.oneOff.title}</p>
          <p className="mt-2 text-lg leading-snug text-slate">{copy.oneOff.text}</p>
        </section>

        <Plus aria-hidden strokeWidth={1.5} className="mx-auto size-8 self-center text-navy" />

        <section aria-labelledby="fee-recurring" className="rounded-[10px] bg-navy px-8 py-8 text-white">
          <Cloud aria-hidden strokeWidth={1.5} className="size-10 text-white" />
          <h3 id="fee-recurring" className="mt-8 text-3xl font-bold uppercase leading-tight text-teal-bright">
            {copy.recurring.label}
          </h3>
          <p className="mt-3 text-xl font-semibold leading-snug">{copy.recurring.title}</p>
          <p className="mt-2 text-lg leading-snug text-white/85">{copy.recurring.text}</p>
        </section>
      </div>

      <p className={`mt-6 ${exec.meta}`}>{copy.note}</p>
    </Section>
  )
}
