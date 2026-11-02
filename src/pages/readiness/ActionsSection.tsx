import { Section } from '../../components/ui/Section'
import { DetailDrawer } from '../../components/ui/DetailDrawer'
import { ExecHeader } from '../../components/exec/ExecHeader'
import { exec } from '../../components/exec/styles'
import { useDrawer } from '../../hooks/useDrawer'
import { actionsNote, actionsHeading, actionsTakeaway, evidenceRegister as reg, evidenceRequests } from '../../data/readiness/page'
import { actionTypeInfo, actionTypeNote, type ActionType } from '../../data/readiness/plan'
import { NAMED_OWNER_NOTE } from '../../data/readiness/requirements'

const accent: Record<string, string> = {
  motilal: 'border-t-accent',
  demand: 'border-t-blue',
  cost: 'border-t-amber',
  seraa: 'border-t-violet',
}
const label = 'text-[0.75rem] font-bold uppercase tracking-[0.1em] text-slate'
const actionOrder: ActionType[] = ['retrieve', 'validate', 'adapt', 'develop', 'decide']

/**
 * Next actions: four deliverables shown as working-brief previews. Previews carry content labels only: no results,
 * dates or completion status. Each opens its output definition and evidence request. Roles only; no named owner.
 */
export function ActionsSection() {
  const drawer = useDrawer<string>()
  const selected = reg.rows.find((r) => r.id === drawer.value) ?? null

  return (
    <Section id="actions" headingId="actions-title">
      <ExecHeader id="actions-title" as="h2" eyebrow="Readiness · Next actions" title={actionsHeading} wide />

      <ul id="evidence-register" className="mt-12 grid gap-6 sm:grid-cols-2 lg:gap-8">
        {reg.rows.map((row) => (
          <li key={row.id} className="flex">
            <button
              type="button"
              aria-haspopup="dialog"
              aria-label={`${row.preview.title}: open output definition and evidence request`}
              onClick={(event) => drawer.open(row.id, event.currentTarget)}
              className={`flex w-full flex-col rounded-[12px] border border-hairline border-t-4 bg-white px-6 py-6 text-left transition-colors hover:border-accent/60 ${accent[row.id]}`}
            >
              <span className={label}>Working brief</span>
              <span className="mt-1 block text-2xl font-bold leading-tight text-heading">{row.preview.title}</span>
              <span className="mt-2 block text-lg leading-snug text-heading">{row.preview.question}</span>
              <span className="mt-5 block border-y border-line py-3">
                <span className={`${label} block`}>Will cover</span>
                <span className="mt-1 block text-base font-semibold leading-snug text-heading">{row.preview.labels}</span>
              </span>
              <span className="mt-4 block">
                <span className={`${label} block`}>Proposed owner</span>
                <span className="mt-0.5 block text-base leading-snug text-slate">{row.owner}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <p className={`mt-6 ${exec.meta}`}>{reg.ownerStatus}</p>

      <p className="mt-10 max-w-3xl border-l-4 border-accent pl-5 text-xl font-bold leading-snug text-heading">{actionsTakeaway}</p>

      <DetailDrawer
        open={selected !== null}
        onClose={drawer.close}
        title={selected ? `${selected.preview.title}: output definition` : ''}
        eyebrow="Output definition and evidence request"
        returnFocusRef={drawer.trigger}
      >
        {selected && (
          <div className="space-y-8">
            <section>
              <p className="text-lg font-semibold leading-snug text-heading">{selected.preview.question}</p>
              <dl className="mt-4 divide-y divide-line border-y border-line">
                {[
                  { k: 'Register entry', v: selected.title },
                  { k: 'What it should resolve', v: selected.resolves },
                  { k: 'Minimum reviewable output', v: selected.output },
                  { k: 'Proposed owner', v: `${selected.owner}. ${NAMED_OWNER_NOTE}` },
                ].map((x) => (
                  <div key={x.k} className="py-2.5 sm:grid sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-x-4">
                    <dt className={`${label} mb-1 sm:mb-0 sm:pt-0.5`}>{x.k}</dt>
                    <dd className="leading-snug">{x.v}</dd>
                  </div>
                ))}
              </dl>
              <p className={`mt-2 ${exec.meta}`}>{reg.ownerStatus}</p>
            </section>

            {selected.id === 'seraa' && (
              <section>
                <h3 className={label}>{reg.seraaRequires.label}</h3>
                <ul className="mt-2 space-y-2">
                  {reg.seraaRequires.items.map((item) => (
                    <li key={item} className="flex gap-2.5 leading-snug">
                      <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section>
              <h3 className={label}>Action types</h3>
              <ul className="mt-2 divide-y divide-line">
                {actionOrder.map((id) => (
                  <li key={id} className="py-2.5 first:pt-0 leading-snug">
                    <span className="font-semibold text-heading">{actionTypeInfo[id].label}: </span>
                    {actionTypeInfo[id].text}
                  </li>
                ))}
              </ul>
              <p className={`mt-2 ${exec.meta}`}>
                {actionTypeNote} {actionsNote}
              </p>
            </section>

            <section>
              <h3 className={label}>{evidenceRequests.label}</h3>
              <ul className="mt-2 divide-y divide-line">
                {evidenceRequests.items.map((item) => (
                  <li key={item.title} className="py-2.5 first:pt-0 leading-snug">
                    <span className="font-semibold text-heading">{item.title}</span>
                    <span className="block text-slate">
                      {item.owner} · {NAMED_OWNER_NOTE}
                    </span>
                  </li>
                ))}
              </ul>
              <p className={`mt-2 ${exec.meta}`}>{evidenceRequests.note}</p>
            </section>
          </div>
        )}
      </DetailDrawer>
    </Section>
  )
}
