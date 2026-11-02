import { Bot, Code, Handshake, Layers, type LucideIcon } from 'lucide-react'
import { Section } from '../../components/ui/Section'
import { ExecHeader } from '../../components/exec/ExecHeader'
import { PanelButton } from '../../components/overview/parts'
import { DetailDrawer } from '../../components/ui/DetailDrawer'
import { EvidenceLabel } from '../../components/ui/EvidenceLabel'
import { SourceList } from '../../components/ui/SourceEntry'
import { PanelLabel } from '../../components/opportunity/shared'
import { exec } from '../../components/exec/styles'
import { useDrawer } from '../../hooks/useDrawer'
import {
  accountResponses,
  alternativeColumns,
  alternativeRows,
  competitionCase,
  competitiveFindings,
  firstOfferActions,
  landscapeGroups,
  openingConditions,
  type LandscapeGroup,
} from '../../data/opportunity/case'
import { competitionNote, competitors, type Competitor } from '../../data/opportunity/competition'
import { launchPriority } from '../../data/shared/launchPriority'
import { startingPoints } from '../../data/shared/startingPoints'
import { sourceShortLabel } from '../../data/sources'
import type { SourceId } from '../../data/types'

type Panel = 'evidence' | 'implications'

const laneIcons: Record<LandscapeGroup['id'], LucideIcon> = { platforms: Layers, ai: Bot, delivery: Handshake, internal: Code }

/** Software offerings versus service or delivery propositions, for the evidence panel. */
const softwareGroups: LandscapeGroup['id'][] = ['platforms', 'ai']
const serviceGroups: LandscapeGroup['id'][] = ['delivery', 'internal']

/**
 * Competition chapter: one headline, one neutral landscape of alternatives that can coexist in an account, one takeaway,
 * one proposed next move, two buttons. The provider evidence, comparison and first-offer assessment sit in two panels.
 */
export function CompetitionSection() {
  const panel = useDrawer<Panel>()
  const open = panel.value
  const allSources = Array.from(new Set<SourceId>(competitors.flatMap((c) => c.sources)))

  return (
    <Section id="competition" headingId="competition-title">
      <ExecHeader id="competition-title" as="h2" eyebrow={competitionCase.eyebrow} title={competitionCase.headline} wide />

      <section aria-label={competitionCase.landscapeLabel} className="mt-6">
        <ul className="divide-y divide-line border-y border-line">
          {landscapeGroups.map((group) => {
            const Icon = laneIcons[group.id]
            return (
              <li key={group.id} className="grid items-center gap-x-6 gap-y-1 py-3.5 lg:grid-cols-[15rem_minmax(0,1.2fr)_minmax(0,1fr)]">
                <p className="flex items-center gap-2.5 text-[0.9375rem] font-bold uppercase tracking-[0.06em] text-slate">
                  <Icon aria-hidden strokeWidth={1.6} className="size-5 shrink-0 text-slate" />
                  {group.name}
                </p>
                <p className="text-xl font-bold leading-snug text-heading">{group.names.join(' · ')}</p>
                <p className="text-base leading-snug text-slate">{group.descriptor}</p>
              </li>
            )
          })}
        </ul>
        <p className={`mt-3 ${exec.meta}`}>{competitionCase.landscapeNote}</p>
      </section>

      <p className="mt-8 max-w-4xl text-2xl font-bold leading-snug text-heading">{competitionCase.takeaway}</p>

      <section aria-label={competitionCase.moveTag} className={`mt-6 ${exec.panel} border-l-[6px] border-l-accent bg-tint px-5 py-4 sm:px-6`}>
        <p className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-accent-strong">{competitionCase.moveTag}</p>
        <p className="mt-1 text-xl font-bold leading-snug text-heading">{competitionCase.move}</p>
      </section>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <PanelButton onOpen={(opener) => panel.open('evidence', opener)}>{competitionCase.evidenceButton}</PanelButton>
        <PanelButton onOpen={(opener) => panel.open('implications', opener)}>{competitionCase.implicationsButton}</PanelButton>
      </div>

      <DetailDrawer open={open === 'evidence'} onClose={panel.close} title="Competitor evidence" eyebrow="Supporting evidence" returnFocusRef={panel.trigger} wide>
        <div className="space-y-8">
          <p className="rounded-card bg-wash px-4 py-3 leading-snug">
            {competitionNote} {competitionCase.findingsNote}
          </p>

          <section>
            <PanelLabel>Evidence behind the takeaway</PanelLabel>
            <ul className="mt-2 divide-y divide-line">
              {competitiveFindings.map((f) => (
                <li key={f.id} className="py-3 first:pt-0">
                  <p className="font-semibold text-heading">
                    {f.provider} <span className="font-normal text-slate">· {f.headline}</span>
                  </p>
                  <p className="mt-1 leading-snug">
                    <span className="font-semibold text-heading">Published capability: </span>
                    {f.capability}
                  </p>
                  <p className="mt-1 leading-snug">
                    <span className="font-semibold text-heading">Implication for SERAA: </span>
                    {f.implication}
                  </p>
                  <p className={`mt-1 ${exec.meta}`}>Source: {sourceShortLabel[f.source]}</p>
                </li>
              ))}
            </ul>
            <p className={`mt-2 ${exec.meta}`}>None of these offerings is established as installed at Motilal or Centrum. India availability, regulatory suitability, pricing and adoption are not assumed.</p>
          </section>

          <OfferingBlock title="Software offerings" note="Published product scope, from vendor sources." ids={softwareGroups} />
          <OfferingBlock title="Service and delivery propositions" note="Packaged delivery and internal programmes. Announced benefits are expected outcomes, not achieved results." ids={serviceGroups} />

          <section>
            <PanelLabel>Typical delivery patterns</PanelLabel>
            <p className={`mt-2 ${exec.meta}`}>Typical patterns to confirm per account. These are not published capabilities.</p>
            <div className="mt-3 space-y-4">
              {alternativeRows.map((row) => (
                <div key={row.id}>
                  <p className="font-semibold text-heading">{row.label}</p>
                  <dl className="mt-1.5 divide-y divide-line rounded-card border border-line">
                    {alternativeColumns.map((column) => (
                      <div key={column.id} className="grid gap-0.5 px-3 py-2 sm:grid-cols-[11rem_1fr] sm:gap-3">
                        <dt className="text-[0.9375rem] font-semibold text-slate">
                          {column.name} <span className="font-normal">({column.basis})</span>
                        </dt>
                        <dd className="text-[0.9375rem] leading-snug">{row.cells[column.id]}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </section>

          <section>
            <PanelLabel>Account-specific unknowns</PanelLabel>
            <p className="mt-2 leading-snug">{competitionCase.mayAlreadyMeet}</p>
            <ul className="mt-2 space-y-1">
              {competitionCase.questions.map((q) => (
                <li key={q} className="flex gap-2.5 leading-snug">
                  <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
                  {q}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <PanelLabel>Sources</PanelLabel>
            <div className="mt-3">
              <SourceList ids={allSources} />
            </div>
          </section>
        </div>
      </DetailDrawer>

      <DetailDrawer open={open === 'implications'} onClose={panel.close} title="First-offer implications" eyebrow="Proposed assessment actions" returnFocusRef={panel.trigger}>
        <div className="space-y-8">
          <p className="rounded-card bg-wash px-4 py-3 leading-snug">
            Proposed assessment actions, not completed comparisons. {launchPriority.statement}
          </p>

          {firstOfferActions.map((a) => {
            const point = startingPoints.find((p) => p.id === a.startingPoint)
            return (
              <section key={a.id}>
                <PanelLabel>{a.name}</PanelLabel>
                <p className="mt-2 font-semibold leading-snug text-heading">{a.action}</p>
                {point && (
                  <>
                    <p className="mt-2 flex flex-wrap items-center gap-2 leading-snug">
                      <EvidenceLabel kind={point.evidenceKind} />
                      <span>{point.reportedStatus}</span>
                    </p>
                    <p className={`mt-1 ${exec.meta}`}>{point.materialLimitation}</p>
                  </>
                )}
              </section>
            )
          })}

          <section>
            <PanelLabel>Account-level assessment paths</PanelLabel>
            <ul className="mt-2 divide-y divide-line">
              {accountResponses.map((r) => (
                <li key={r.condition} className="py-2.5 leading-snug first:pt-0">
                  <span className="font-semibold text-heading">{r.condition}: </span>
                  {r.response}
                </li>
              ))}
            </ul>
            <p className={`mt-2 ${exec.meta}`}>{competitionCase.responseNote}</p>
          </section>

          <section>
            <PanelLabel>Proposed differentiation</PanelLabel>
            <p className={`mt-2 ${exec.meta}`}>{competitionCase.conditionsNote} Only existing evidence is shown; no customer results or competitor weaknesses are claimed.</p>
            <div className="mt-3 space-y-5">
              {openingConditions.map((c) => (
                <div key={c.id}>
                  <p className="font-semibold text-heading">
                    {c.title}: <span className="font-normal">{c.text}</span>
                  </p>
                  <p className={`mt-2 ${exec.label}`}>Evidence that would substantiate it</p>
                  <ul className="mt-1.5 space-y-1.5">
                    {c.substantiate.map((s) => (
                      <li key={s.area} className="leading-snug">
                        <span className="font-semibold text-heading">{s.area}: </span>
                        {s.evidence}
                      </li>
                    ))}
                  </ul>
                  <p className={`mt-2 ${exec.label}`}>Existing evidence</p>
                  <p className="mt-1 leading-snug">{c.existing}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </DetailDrawer>
    </Section>
  )
}

function OfferingBlock({ title, note, ids }: { title: string; note: string; ids: LandscapeGroup['id'][] }) {
  const groups = landscapeGroups.filter((g) => ids.includes(g.id))
  return (
    <section>
      <PanelLabel>{title}</PanelLabel>
      <p className={`mt-2 ${exec.meta}`}>{note}</p>
      <div className="mt-3 space-y-5">
        {groups.map((group) => (
          <div key={group.id}>
            <p className="font-bold text-heading">{group.name}</p>
            <ul className="mt-2 divide-y divide-line">
              {group.competitorIds
                .map((id) => competitors.find((c) => c.id === id))
                .filter((c): c is Competitor => c !== undefined)
                .map((c) => (
                  <li key={c.id} className="py-3 first:pt-0">
                    <p className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-heading">{c.name}</span>
                      <EvidenceLabel kind={c.evidence} />
                    </p>
                    <p className="mt-1.5 text-[0.9375rem] font-semibold text-slate">{c.scopeHeading}</p>
                    <ul className="mt-1 space-y-1">
                      {c.scope.map((line) => (
                        <li key={line} className="flex gap-2.5 leading-snug">
                          <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
                          {line}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 leading-snug">
                      <span className="font-semibold text-heading">Implication for SERAA: </span>
                      {c.implication}
                    </p>
                    {c.caveat && <p className="mt-2 rounded-card bg-ev-validate-bg/60 px-3 py-2 text-[0.9375rem] leading-snug text-ev-validate-fg">{c.caveat}</p>}
                    {c.sources.length > 0 && <p className={`mt-1.5 ${exec.meta}`}>Sources: {c.sources.map((s) => sourceShortLabel[s]).join(', ')}</p>}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
