import { useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Section } from '../../components/ui/Section'
import { ExecHeader } from '../../components/exec/ExecHeader'
import { PanelButton } from '../../components/overview/parts'
import { DetailDrawer } from '../../components/ui/DetailDrawer'
import { SourceList } from '../../components/ui/SourceEntry'
import { PanelLabel } from '../../components/opportunity/shared'
import { exec } from '../../components/exec/styles'
import { useDrawer } from '../../hooks/useDrawer'
import { toneStyles } from '../../styles/tones'
import { alsoListed, relationshipNote } from '../../data/opportunity/partnerships'
import { channelPanel } from '../../data/growth/partnerships'
import {
  arrangementNote,
  ecosystemAreas,
  evidenceEntries,
  partnershipsStrategy as copy,
  pursuitBands,
  pursuits,
} from '../../data/opportunity/partnershipStrategy'
import { sources, sourceShortLabel } from '../../data/sources'
import type { SourceId } from '../../data/types'

type Panel = { kind: 'evidence'; focus?: string } | { kind: 'pursuits' }

const sourceLine = (ids: SourceId[]) =>
  ids.map((id) => `${sourceShortLabel[id]} (${sources[id].date ?? 'date not stated in source record'})`).join('; ')

/**
 * Partnerships chapter: one ecosystem diagram (what relationships unlock), one hypothetical mutual-benefit example,
 * one priority band, and two panels. Every relationship is a proposed role; nothing here is a confirmed partnership,
 * sales channel, referral source or commercial arrangement.
 */
export function PartnershipsSection() {
  const panel = useDrawer<Panel>()
  const open = panel.value
  const focus = open?.kind === 'evidence' ? open.focus : undefined
  useEffect(() => {
    if (!focus) return
    const id = window.setTimeout(() => document.getElementById(`entry-${focus}`)?.scrollIntoView({ block: 'start' }), 60)
    return () => window.clearTimeout(id)
  }, [focus])
  const marketIds = Array.from(new Set<SourceId>(channelPanel.findings.flatMap((f) => f.sourceIds)))
  const allSources = Array.from(new Set<SourceId>([...evidenceEntries.flatMap((e) => e.sources), ...marketIds]))

  return (
    <Section id="partnerships" headingId="partnerships-title" surface="canvas">
      <ExecHeader id="partnerships-title" as="h2" eyebrow={copy.eyebrow} title={copy.headline} lede={copy.support} wide />

      <section aria-label={copy.mapLabel} className="mt-8">
        <ul className="grid gap-4 md:grid-cols-2">
          {ecosystemAreas.map((area) => {
            const t = toneStyles[area.tone]
            return (
              <li key={area.id}>
                <button
                  type="button"
                  aria-haspopup="dialog"
                  aria-label={`${area.label}: ${area.names.map((n) => n.name).join(', ')}. ${area.status}. Open evidence and limits.`}
                  onClick={(event) => panel.open({ kind: 'evidence', focus: area.entryIds[0] }, event.currentTarget)}
                  className={`group flex h-full w-full items-start justify-between gap-4 rounded-xl border border-hairline border-l-[6px] bg-white px-5 py-4 text-left transition-colors hover:border-line-strong ${t.ring}`}
                >
                  <span className="min-w-0">
                    <span className={`block text-[0.8125rem] font-bold uppercase tracking-[0.14em] ${t.text}`}>{area.label}</span>
                    <span className="mt-2 block text-2xl font-bold leading-snug text-heading">{area.names.map((n) => n.name).join(' · ')}</span>
                    <span className="mt-1.5 block text-base leading-snug text-slate">{area.status}</span>
                  </span>
                  <ArrowUpRight aria-hidden className="mt-1 size-5 shrink-0 text-slate group-hover:text-accent" />
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <p className="mt-6 border-y border-line py-3 text-base leading-snug text-slate">
        <span className="font-bold text-heading">Next route to investigate: </span>
        {copy.route.title}
      </p>

      <section aria-label="Proposed priority" className={`mt-6 ${exec.panel} border-l-[6px] border-l-accent bg-tint px-5 py-4 sm:px-6`}>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <p className="min-w-0 flex-1 basis-[22rem] text-xl font-bold leading-snug text-heading">{copy.priority}</p>
          <div className="flex flex-wrap items-center gap-3">
            <PanelButton onOpen={(opener) => panel.open({ kind: 'evidence' }, opener)}>{copy.evidenceButton}</PanelButton>
            <PanelButton onOpen={(opener) => panel.open({ kind: 'pursuits' }, opener)}>{copy.pursuitsButton}</PanelButton>
          </div>
        </div>
      </section>

      <DetailDrawer open={open?.kind === 'evidence'} onClose={panel.close} title="Relationship evidence" eyebrow="Supporting evidence" returnFocusRef={panel.trigger} wide>
        <div className="space-y-8">
          <p className="rounded-card bg-wash px-4 py-3 leading-snug">{arrangementNote}</p>

          <ul className="divide-y divide-line">
            {evidenceEntries.map((e) => (
              <li key={e.id} id={`entry-${e.id}`} className="scroll-mt-4 py-4 first:pt-0">
                <p className="text-lg font-bold leading-snug text-heading">{e.name}</p>
                <dl className="mt-2 grid gap-x-6 gap-y-2 sm:grid-cols-[10rem_1fr]">
                  <Row label="Relationship role">{e.role}</Row>
                  <Row label="Arrangement">{e.arrangement}</Row>
                  <Row label="Current status">{e.status}</Row>
                  <Row label="Evidence reviewed">
                    {e.evidence}
                    {e.sources.length > 0 && <span className={`mt-0.5 block ${exec.meta}`}>Source: {sourceLine(e.sources)}</span>}
                  </Row>
                  <Row label="What it establishes">{e.establishes}</Row>
                  <Row label="Unconfirmed">
                    <ul className="space-y-1">
                      {e.unconfirmed.map((u) => (
                        <li key={u} className="flex gap-2.5">
                          <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-amber" />
                          {u}
                        </li>
                      ))}
                    </ul>
                  </Row>
                </dl>
              </li>
            ))}

            <li className="py-4">
              <p className="text-lg font-bold leading-snug text-heading">Market-access relationships</p>
              <dl className="mt-2 grid gap-x-6 gap-y-2 sm:grid-cols-[10rem_1fr]">
                <Row label="Relationship role">Proposed routes to investigate, not existing channels</Row>
                <Row label="Arrangement">Co-sell, marketplace or delivery routes, each with its own eligibility</Row>
                <Row label="Current status">Proposed; no Covasant enrolment or eligibility assumed</Row>
                <Row label="Evidence reviewed">
                  <ul className="space-y-1.5">
                    {channelPanel.findings
                      .filter((f) => f.sourceIds.length > 0)
                      .map((f) => (
                        <li key={f.text}>
                          {f.text}
                          <span className={`block ${exec.meta}`}>Source: {sourceLine(f.sourceIds)}</span>
                        </li>
                      ))}
                  </ul>
                </Row>
                <Row label="What it establishes">Which routes are documented by the platform providers, and their published conditions.</Row>
                <Row label="Unconfirmed">Covasant’s eligibility, programme tier, co-selling access, customer referrals and commercial terms.</Row>
              </dl>
            </li>
          </ul>

          <section>
            <PanelLabel>Also listed by Covasant</PanelLabel>
            <p className="mt-2 leading-snug">{alsoListed.join(', ')}</p>
            <p className={`mt-1 ${exec.meta}`}>{relationshipNote}</p>
          </section>

          <section>
            <PanelLabel>Licensing and usage</PanelLabel>
            <p className="mt-2 leading-snug">{channelPanel.apiKeyNote} Source licensing, AI usage permissions, redistribution rights, access and support terms must each be confirmed per provider.</p>
          </section>

          <section>
            <PanelLabel>Sources</PanelLabel>
            <div className="mt-3">
              <SourceList ids={allSources} />
            </div>
          </section>
        </div>
      </DetailDrawer>

      <DetailDrawer open={open?.kind === 'pursuits'} onClose={panel.close} title="Proposed pursuits" eyebrow="Pursuit register" returnFocusRef={panel.trigger} wide>
        <div className="space-y-8">
          <p className="rounded-card bg-wash px-4 py-3 leading-snug">
            Proposed, not active. No named owners, negotiations, partner commitments, referral volumes, commercial terms or timelines are established. Unknown fields read “To confirm”.
          </p>
          <section>
            <PanelLabel>{copy.exchange.tag}</PanelLabel>
            <p className="mt-2 leading-snug">{copy.exchange.text}</p>
            <p className={`mt-1 ${exec.meta}`}>{copy.exchange.limit}</p>
          </section>
          {pursuitBands.map((band) => (
            <section key={band.id}>
              <PanelLabel>{band.label}</PanelLabel>
              <p className={`mt-1 ${exec.meta}`}>{band.note}</p>
              <ul className="mt-3 divide-y divide-line">
                {pursuits
                  .filter((p) => p.band === band.id)
                  .map((p) => (
                    <li key={p.id} className="py-4 first:pt-0">
                      <p className="font-bold leading-snug text-heading">{p.name}</p>
                      <dl className="mt-2 grid gap-x-6 gap-y-2 sm:grid-cols-[11rem_1fr]">
                        <Row label="Target account or dependency">{p.target}</Row>
                        <Row label="Benefit to Covasant">{p.covasantBenefit}</Row>
                        <Row label="Proposed benefit to them">{p.otherBenefit}</Row>
                        <Row label="Next validation step">{p.next}</Row>
                        <Row label="Proposed owner role">{p.owner}</Row>
                        <Row label="Leadership sponsorship">{p.sponsorship}</Row>
                      </dl>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      </DetailDrawer>
    </Section>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <dt className="text-[0.9375rem] font-semibold text-slate">{label}</dt>
      <dd className="text-[0.9375rem] leading-snug text-heading">{children}</dd>
    </>
  )
}
