import { LifeBuoy, Plug, Workflow } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Section } from '../../components/ui/Section'
import { ExecHeader } from '../../components/exec/ExecHeader'
import { DetailDrawer } from '../../components/ui/DetailDrawer'
import { SourceList } from '../../components/ui/SourceEntry'
import { PanelButton, RouteButton } from '../../components/overview/parts'
import { ClosingBand } from '../../components/position/parts'
import { exec } from '../../components/exec/styles'
import { useDrawer } from '../../hooks/useDrawer'
import { reasons as c } from '../../data/position/content'
import { evidencePanel, responseEvidence } from '../../data/position/reasonsEvidence'
import type { SourceId } from '../../data/types'

const icons: Record<string, LucideIcon> = { workflow: Workflow, systems: Plug, ownership: LifeBuoy }
const sourceIds = Array.from(new Set<SourceId>(responseEvidence.flatMap((r) => r.sourceIds)))

/** Column grid shared by the header and every row on wide screens. */
const cols = 'lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.3fr)_minmax(0,1fr)]'
/** Labels stay available to screen readers on wide screens, where the column header is decorative. */
const cellLabel = `${exec.label} mb-1 block lg:sr-only`

/**
 * Why choose us: three customer concerns, our proposed response and the proof needed, on one shared surface.
 * These are proposed buying reasons to substantiate, not established advantages. The evidence panel maps each
 * response to existing records and their limits.
 */
export function ReasonsSection() {
  const drawer = useDrawer<true>()

  return (
    <Section id="reasons-to-choose" headingId="reasons-title">
      <ExecHeader id="reasons-title" as="h2" eyebrow="Position · Why choose us" title={c.headline} lede={c.lede} wide />

      <div className={`mt-8 overflow-hidden ${exec.panel}`}>
        <div aria-hidden className={`hidden border-b border-line lg:grid ${cols}`}>
          <span className={`${exec.label} px-6 py-3`}>{c.columns.concern}</span>
          <span className={`${exec.label} bg-tint px-6 py-3 text-accent-strong`}>{c.columns.response}</span>
          <span className={`${exec.label} px-6 py-3`}>{c.columns.proof}</span>
        </div>
        <ul className="divide-y divide-line">
          {c.rows.map((row) => {
            const Icon = icons[row.id]
            return (
              <li key={row.id} className={`grid ${cols}`}>
                <p className="flex items-start gap-3 px-5 pt-5 lg:items-center lg:px-6 lg:py-7">
                  <Icon aria-hidden strokeWidth={1.75} className="mt-1 size-5 shrink-0 text-accent lg:mt-0" />
                  <span>
                    <span className={cellLabel}>{c.columns.concern}</span>
                    <span className="block text-xl font-bold leading-snug text-heading">{row.concern}</span>
                  </span>
                </p>
                <p className="bg-tint px-5 pt-4 lg:px-6 lg:py-7">
                  <span className={`${cellLabel} text-accent-strong`}>{c.columns.response}</span>
                  <span className="block text-lg font-semibold leading-snug text-heading">{row.response}</span>
                </p>
                <p className="px-5 pb-5 pt-4 lg:px-6 lg:py-7">
                  <span className={cellLabel}>{c.columns.proof}</span>
                  <span className={`block ${exec.body}`}>{row.proof}</span>
                </p>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="mt-8 max-w-4xl">
        <p className="text-xl font-bold leading-snug text-heading">{c.test.statement}</p>
        <p className={`mt-1 ${exec.meta}`}>{c.test.support}</p>
      </div>

      <div className="mt-8">
        <ClosingBand
          buttons={
            <>
              <PanelButton onOpen={(opener) => drawer.open(true, opener)}>{c.buttons.evidence}</PanelButton>
              <RouteButton to="/readiness">{c.buttons.readiness}</RouteButton>
            </>
          }
        >
          {c.band.text}
        </ClosingBand>
      </div>

      <DetailDrawer open={drawer.value !== null} onClose={drawer.close} title={evidencePanel.title} eyebrow={evidencePanel.eyebrow} returnFocusRef={drawer.trigger}>
        <div className="space-y-8">
          <p className="rounded-card bg-wash px-4 py-3 leading-snug">{evidencePanel.intro}</p>

          {responseEvidence.map((r) => (
            <section key={r.id} aria-labelledby={`evidence-${r.id}`}>
              <h3 id={`evidence-${r.id}`} className={exec.h3}>
                {r.response}
              </h3>
              <dl className="mt-3 divide-y divide-line">
                <EvidenceRow label={evidencePanel.labels.startingPoint}>
                  <ul className="space-y-1.5">
                    {r.startingPoint.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </EvidenceRow>
                <EvidenceRow label={evidencePanel.labels.reviewed}>{r.reviewed}</EvidenceRow>
                <EvidenceRow label={evidencePanel.labels.supports}>{r.supports}</EvidenceRow>
                <EvidenceRow label={evidencePanel.labels.unverified}>
                  <ul className="space-y-1.5">
                    {r.unverified.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </EvidenceRow>
                <EvidenceRow label={evidencePanel.labels.next}>{r.next}</EvidenceRow>
              </dl>
            </section>
          ))}

          <p className={exec.meta}>{evidencePanel.dateNote}</p>

          <section aria-labelledby="evidence-sources">
            <h3 id="evidence-sources" className={exec.label}>
              Sources
            </h3>
            <div className="mt-3">
              <SourceList ids={sourceIds} />
            </div>
          </section>
        </div>
      </DetailDrawer>
    </Section>
  )
}

function EvidenceRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="py-2.5 sm:grid sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-x-4">
      <dt className={`${exec.label} mb-1 sm:mb-0 sm:pt-0.5`}>{label}</dt>
      <dd className="leading-snug">{children}</dd>
    </div>
  )
}
