import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { EvidenceLabel } from '../../components/ui/EvidenceLabel'
import { evidenceLabels } from '../../data/evidence'
import { Section } from '../../components/ui/Section'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { SourceReference } from '../../components/ui/SourceReference'
import { statusStyle } from '../../components/offerings/CandidateTrack'
import { IdentifiedUseCases } from '../../components/offerings/IdentifiedUseCases'
import { exec } from '../../components/exec/styles'
import { statusKinds, type OfferingFamily } from '../../data/offerings/families'
import { toneStyles } from '../../styles/tones'

interface FamilySectionProps {
  family: OfferingFamily
  /** Swaps the conclusion and the ladder, so consecutive families do not read as one template. */
  reverse?: boolean
  surface?: 'canvas' | 'sky' | 'lilac'
}

/**
 * One offering family. Left: the conclusion, the proposed next investment, set large on a tinted ground. Right: an
 * evidence ladder, a vertical line with a filled node for the starting asset (what the evidence actually is, with its
 * label) and hollow nodes for each candidate solution (proposed or to verify, with its status). Filled against hollow
 * is the message. Need, alternatives and dependencies are two short ruled facts, not cards; the fuller assessment is
 * behind a click.
 */
export function FamilySection({ family, reverse = false, surface = 'canvas' }: FamilySectionProps) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const tone = toneStyles[family.tone]
  const asset = family.startingAssets[0]
  // Show the asset's own status only when the evidence label does not already say it.
  const showStatus = !evidenceLabels[asset.evidence].label.toLowerCase().includes(asset.status.toLowerCase())
  const candidates = statusKinds.flatMap((s) => family.candidatePackages.filter((p) => p.status === s))

  return (
    <Section id={family.id} headingId={`${family.id}-title`} surface={surface}>
      <SectionHeading id={`${family.id}-title`} eyebrow={family.shortTitle} title={family.headline} sentence={family.sectionOutcome} />

      <div className="mt-10 grid items-start gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className={`rounded-panel px-7 py-8 ${tone.soft} ${reverse ? 'lg:order-2' : ''}`}>
          <p className={`text-sm font-bold uppercase tracking-[0.14em] ${tone.text}`}>Next investment</p>
          <p className="mt-3 text-[2rem] font-bold leading-[1.15] tracking-tight text-navy">{family.proposedPriorityAction}</p>
          <p className="mt-4 text-lg leading-snug text-ink">{family.priorityRationale}</p>
        </div>

        <ol aria-label="Starting asset and candidate solutions" className="relative">
          <span aria-hidden className="absolute bottom-3 left-[0.6875rem] top-3 w-0.5 bg-navy-3/25" />
          <li className="relative flex gap-4 pb-6">
            <span aria-hidden className={`relative z-10 mt-1 size-6 shrink-0 rounded-full ring-4 ring-white/0 ${tone.solid}`} />
            <div>
              <p className={exec.label}>Starting asset</p>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-2xl font-bold text-navy">{asset.name}</span>
                {/* "Internal discovery" would misdescribe built work, so built agents say who describes them instead. */}
                {asset.evidence === 'internal' && /built/i.test(asset.status) ? (
                  <span className="rounded-full bg-ev-internal-bg px-2.5 py-0.5 text-[0.8125rem] font-semibold text-ev-internal-fg">Described by the Covasant team</span>
                ) : (
                  <EvidenceLabel kind={asset.evidence} />
                )}
                {showStatus && <span className="text-[0.9375rem] text-slate">{asset.status}</span>}
              </p>
              <p className="mt-1 text-lg leading-snug text-ink">{asset.description}</p>
            </div>
          </li>
          {candidates.map((p, i) => (
            <li key={p.id} className="relative flex gap-4 pb-4 last:pb-0">
              <span aria-hidden className={`relative z-10 mt-0.5 size-6 shrink-0 rounded-full border-[3px] bg-white ${tone.ring}`} />
              <div className="min-w-0">
                {i === 0 && <p className={`mb-1 ${exec.label}`}>Candidate solutions</p>}
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-xl font-semibold leading-snug text-heading">{p.title}</span>
                  <span className={`rounded px-1.5 py-px text-[0.6875rem] font-bold uppercase tracking-[0.06em] ${statusStyle[p.status]}`}>{p.status}</span>
                </p>
              </div>
            </li>
          ))}
          {family.packageNote && <li className={`relative pl-10 pt-2 ${exec.meta}`}>{family.packageNote}</li>}
        </ol>
      </div>

      {family.id === 'operations' && (
        <div className="mt-10">
          <IdentifiedUseCases />
        </div>
      )}

      <dl className="mt-10 grid gap-x-12 gap-y-6 border-t border-hairline pt-6 md:grid-cols-2">
        <div>
          <dt className={exec.label}>Need · compare first</dt>
          <dd className="mt-1.5 text-lg leading-snug text-ink">{family.customerNeed}</dd>
        </div>
        <div>
          <dt className={exec.label}>Depends on</dt>
          <dd className="mt-1.5 text-lg leading-snug text-ink">{family.dependencies}</dd>
        </div>
      </dl>
      <p className={`mt-4 ${exec.meta}`}>
        <span className="font-semibold text-heading">Serves: </span>
        {family.businessFunctions.join(' · ')}
      </p>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="mt-6 inline-flex items-center gap-1.5 rounded-md text-base font-semibold text-accent underline-offset-4 hover:underline"
      >
        Supporting assessment
        <ChevronDown aria-hidden className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div id={panelId} className="swap-in mt-4 max-w-4xl space-y-5 rounded-card border border-line-strong bg-white px-5 py-5">
          <ul className="space-y-2.5">
            {family.supportingAssessment.map((item) => (
              <li key={item} className="flex gap-2.5 leading-snug">
                <span aria-hidden className={`mt-[0.55em] size-1.5 shrink-0 rounded-full ${tone.dot}`} />
                {item}
              </li>
            ))}
          </ul>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-slate">Evidence to advance</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {family.advancementEvidence.map((item) => (
                <li key={item} className="rounded-full bg-wash px-2.5 py-0.5 text-[0.8125rem] font-medium text-ink">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {family.sourceIds.length > 0 && (
            <p>
              <SourceReference ids={family.sourceIds} />
            </p>
          )}
        </div>
      )}
    </Section>
  )
}
