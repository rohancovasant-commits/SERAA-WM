import { Section } from '../../components/ui/Section'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { DecisionRegister } from '../../components/decisions/DecisionRegister'
import { recordHeading } from '../../data/decisions/record'

export function RecordSection() {
  return (
    <Section id="decision-record" headingId="decision-record-title" surface="sky">
      <SectionHeading id="decision-record-title" eyebrow="Decision record" title={recordHeading} />
      <div className="mt-10">
        <DecisionRegister />
      </div>
    </Section>
  )
}
