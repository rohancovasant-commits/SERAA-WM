import { Section } from '../../components/ui/Section'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { DecisionsExplorer } from '../../components/decisions/DecisionsExplorer'
import { decisionsHeading, decisionsNote } from '../../data/decisions/decisions'

export function DecisionsSection() {
  return (
    <Section id="decisions" headingId="decisions-title" surface="sky">
      <SectionHeading id="decisions-title" eyebrow="Decisions" title={decisionsHeading} sentence={decisionsNote} />
      <div className="mt-10">
        <DecisionsExplorer />
      </div>
    </Section>
  )
}
