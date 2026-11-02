import { useState } from 'react'
import { BriefcaseBusiness, CircleDollarSign, Handshake, Network, PackageCheck, ShieldCheck, type LucideIcon } from 'lucide-react'
import { Section } from '../../components/ui/Section'
import { ExecHeader } from '../../components/exec/ExecHeader'
import { exec } from '../../components/exec/styles'
import { PanelButton } from '../../components/overview/parts'
import { dimensions } from '../../data/readiness/dimensions'
import { assessmentCopy as c } from '../../data/readiness/page'
import { areaTiles, dimensionPlan, layerLabels, layerText, nonTechnicalWork, technicalDimensions } from '../../data/readiness/plan'
import { unverifiedNote } from '../../data/readiness/ratings'
import { requirements, type DimensionId } from '../../data/readiness/requirements'

const icons: Record<DimensionId, LucideIcon> = {
  domain: BriefcaseBusiness,
  offerings: PackageCheck,
  ecosystem: Network,
  delivery: ShieldCheck,
  customer: Handshake,
  commercial: CircleDollarSign,
}

const sectionLabel = 'text-[0.75rem] font-bold uppercase tracking-[0.1em] text-slate'

/**
 * Capability assessment: six selectable areas beside one focused detail. Every finding is visible without interaction.
 * Detail is derived from the existing requirement records; nothing is rated, averaged or scored here.
 */
export function AssessmentSection({ onInspect }: { onInspect: (dimension: DimensionId, opener: HTMLElement) => void }) {
  const [selected, setSelected] = useState<DimensionId>('domain')
  const tile = areaTiles[selected]
  const plan = dimensionPlan[selected]
  const own = requirements.filter((r) => r.dimension === selected)
  const supports = own.filter((r) => r.rating !== 'unverified' && r.rating !== 0)
  const unverified = own.filter((r) => r.rating === 'unverified')
  const technical = technicalDimensions.includes(selected)
  const described = own.some((r) => r.sourceIds.some((id) => id === 'S31' || id === 'S32'))
  const layers = technical
    ? [
        { label: layerLabels.platform, text: described ? layerText.platformDescribed : layerText.platformUnknown },
        { label: layerLabels.adaptation, text: layerText.adaptation },
        { label: layerLabels.acceptance, text: layerText.acceptance },
      ]
    : nonTechnicalWork[selected as 'domain' | 'customer' | 'commercial']

  return (
    <Section id="assessment" headingId="assessment-title">
      <ExecHeader id="assessment-title" as="h2" eyebrow="Readiness · Capability assessment" title={c.headline} wide />

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12">
        <div role="group" aria-label="Capability areas" className="grid gap-3 sm:grid-cols-2">
          {dimensions.map((d) => {
            const Icon = icons[d.id]
            const active = selected === d.id
            const t = areaTiles[d.id]
            return (
              <button
                key={d.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSelected(d.id)}
                className={`rounded-[12px] border bg-white px-4 py-4 text-left transition-colors ${
                  active ? 'border-accent ring-2 ring-accent' : 'border-hairline hover:border-accent/60'
                }`}
              >
                <Icon aria-hidden strokeWidth={1.75} className="size-5 text-accent" />
                <span className="mt-3 block text-lg font-bold leading-tight text-heading">{t.title}</span>
                <span className={`mt-1 block ${exec.body}`}>{t.finding}</span>
              </button>
            )
          })}
        </div>

        <section aria-labelledby="area-title" aria-live="polite" className={`${exec.panel} bg-white px-6 py-7 sm:px-8`}>
          <h3 id="area-title" className="text-2xl font-bold leading-tight text-heading">
            {tile.title}
          </h3>
          <p className={`mt-1 ${exec.body}`}>{plan.question}</p>

          <div className="mt-6 space-y-6">
            <div>
              <h4 className={sectionLabel}>{c.supports}</h4>
              {supports.length > 0 ? (
                <ul className="mt-2 space-y-1.5">
                  {supports.map((r) => (
                    <li key={r.id} className="leading-snug">
                      <span className="font-semibold text-accent-strong">{r.id}</span> {r.currentEvidence}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 leading-snug">No reviewed record yet supports a rating above Unverified for this area.</p>
              )}
            </div>

            <div>
              <h4 className={sectionLabel}>{c.uncertain}</h4>
              <p className="mt-2 leading-snug">
                {unverified.length > 0
                  ? `${unverified.length} of ${own.length} requirements are unverified: ${unverified.map((r) => r.title).join('; ')}.`
                  : `All ${own.length} requirements have some reviewed evidence; limitations remain in each record.`}
              </p>
            </div>

            <div>
              <h4 className={sectionLabel}>{c.next}</h4>
              <p className="mt-2 leading-snug">{plan.next}</p>
              <dl className="mt-3 divide-y divide-line border-y border-line">
                {layers.map((l) => (
                  <div key={l.label} className="py-2.5 sm:grid sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-x-4">
                    <dt className="text-[0.9375rem] font-semibold text-heading">{l.label}</dt>
                    <dd className="text-[0.9375rem] leading-snug text-slate">{l.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-7">
            <PanelButton onOpen={(opener) => onInspect(selected, opener)}>{c.inspect}</PanelButton>
          </div>
        </section>
      </div>

      <p className={`mt-8 ${exec.meta}`}>{unverifiedNote}</p>
    </Section>
  )
}
