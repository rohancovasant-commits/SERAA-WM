import { Section } from '../../components/ui/Section'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { actionClass } from '../../components/ui/actionClass'
import { DocumentTrio } from '../../components/decisions/DocumentTrio'
import { Statement } from '../../components/decisions/StatementLabel'
import { evidencePanel, overview } from '../../data/decisions/page'
import type { StatementKind } from '../../data/decisions/types'

const kinds: StatementKind[] = ['know', 'recommend', 'decide']

export function OverviewSection({ onOpenEvidence }: { onOpenEvidence: (opener: HTMLElement) => void }) {
  return (
    <Section id="overview" headingId="overview-title">
      <SectionHeading id="overview-title" eyebrow="How to read" title={overview.heading} />
      <p className="mt-5 max-w-3xl border-l-4 border-accent pl-6 text-2xl font-bold leading-snug text-navy sm:text-[1.75rem]">{overview.recommendation}</p>

      <div className="mt-10">
        <DocumentTrio />
      </div>

      <div className="mt-14">
        <h3 className="text-2xl font-bold text-navy">{overview.exampleHeading}</h3>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {kinds.map((kind) => (
            <Statement key={kind} kind={kind} withMeaning>
              {overview.example[kind]}
            </Statement>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-5 rounded-card bg-wash px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <p className="max-w-2xl text-lg leading-snug text-navy">{overview.note}</p>
        <button type="button" aria-haspopup="dialog" className={`${actionClass('secondary')} shrink-0 self-start sm:self-auto`} onClick={(event) => onOpenEvidence(event.currentTarget)}>
          {evidencePanel.button}
        </button>
      </div>
    </Section>
  )
}
