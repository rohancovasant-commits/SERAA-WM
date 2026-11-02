import { CheckSquare } from 'lucide-react'
import { Section } from '../../components/ui/Section'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { BulletList, Disclosure } from '../../components/growth/Disclosure'
import { OwnershipDiagram } from '../../components/growth/OwnershipDiagram'
import { decisionRights, handoff, ownershipHeading } from '../../data/growth/ownership'

export function OwnershipSection() {
  return (
    <Section id="ownership" headingId="ownership-title" surface="sky">
      <SectionHeading id="ownership-title" eyebrow="Ownership" title={ownershipHeading} />

      <div className="mt-10">
        <OwnershipDiagram />
      </div>

      <div className="mt-8 space-y-5">
        <Disclosure label={decisionRights.label}>
          <BulletList items={decisionRights.items} />
          <p className="mt-4 text-[0.9375rem] text-slate">No named person, headcount or full-time allocation is assumed. All assignments remain proposed until confirmed.</p>
        </Disclosure>
        <Disclosure label={handoff.label}>
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {handoff.items.map((item) => (
              <li key={item} className="flex gap-2.5 leading-snug">
                <CheckSquare aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>
        </Disclosure>
      </div>
    </Section>
  )
}
