import { Section } from '../../components/ui/Section'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { BulletList, Disclosure } from '../../components/growth/Disclosure'
import { MeasureLenses } from '../../components/growth/MeasureLenses'
import { MilestonePath } from '../../components/growth/MilestonePath'
import { measuresNote, moreMeasures, planActions, scalingHeading } from '../../data/growth/scaling'

export function ScalingSection() {
  return (
    <Section id="scaling" headingId="scaling-title">
      <SectionHeading id="scaling-title" eyebrow="Scaling" title={scalingHeading} />

      <div className="mt-10">
        <MilestonePath />
      </div>

      <div className="mt-16">
        <MeasureLenses />
        <p className="mt-4 text-lg font-semibold text-navy">{measuresNote}</p>
        <Disclosure label={moreMeasures.label} className="mt-5">
          <BulletList items={moreMeasures.items} />
        </Disclosure>
      </div>

      <div className="mt-10">
        <Disclosure label={planActions.label}>
          <ol className="space-y-3">
            {planActions.items.map((item, i) => (
              <li key={item} className="flex gap-3.5 leading-snug">
                <span aria-hidden className="flex size-7 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="pt-0.5">{item}</span>
              </li>
            ))}
          </ol>
          <p className="mt-5 rounded-card bg-amber-soft px-4 py-3 text-[0.9375rem] leading-snug">{planActions.note}</p>
        </Disclosure>
      </div>
    </Section>
  )
}
