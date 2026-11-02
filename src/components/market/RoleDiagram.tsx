import { Building2, Landmark, ShieldCheck, Users, Wallet } from 'lucide-react'
import { useTabs } from '../../hooks/useTabs'
import {
  investorCaption,
  investorClientsLabel,
  investorSegments,
  roleDefinitions,
  roleMappings,
  rolesMapping,
  rolesNote,
  rolesSeatNote,
  type OfferingFamilyId,
} from '../../data/opportunity/market'

const familyIds = roleMappings.map((mapping) => mapping.id) as readonly OfferingFamilyId[]

function Chip({ children, tone }: { children: string; tone: 'blue' | 'violet' }) {
  const styles = tone === 'blue' ? 'bg-blue-soft text-blue ring-blue-mid' : 'bg-violet-soft text-violet ring-violet-mid'
  return <li className={`rounded-full px-3.5 py-1.5 text-[0.9375rem] font-semibold leading-snug ring-1 ${styles}`}>{children}</li>
}

/**
 * Who buys, who sponsors, who approves and who uses, for one offering family at a time. The roles are deliberately
 * not drawn as a sequence: real purchasing paths vary, and sponsor and economic buyer can be different people.
 */
export function RoleDiagram() {
  const tabs = useTabs(familyIds, 'intelligence')
  const current = roleMappings.find((mapping) => mapping.id === tabs.selected) ?? roleMappings[0]

  return (
    <div>
      <div role="tablist" aria-label="Offering family" className="flex flex-wrap gap-2">
        {roleMappings.map((mapping, index) => {
          const active = mapping.id === tabs.selected
          return (
            <button
              key={mapping.id}
              ref={tabs.setRef(index)}
              type="button"
              role="tab"
              id={`roles-tab-${mapping.id}`}
              aria-selected={active}
              aria-controls="roles-panel"
              tabIndex={active ? 0 : -1}
              onClick={() => tabs.setSelected(mapping.id)}
              onKeyDown={(event) => tabs.onKeyDown(event, index)}
              className={`rounded-full border px-4 py-2 text-[0.9375rem] font-semibold transition-colors ${
                active ? 'border-navy bg-navy text-white' : 'border-violet-mid bg-white text-navy hover:border-violet hover:text-violet'
              }`}
            >
              {mapping.label}
            </button>
          )
        })}
      </div>

      <div
        id="roles-panel"
        role="tabpanel"
        aria-labelledby={`roles-tab-${current.id}`}
        className="mt-5 rounded-panel border-2 border-violet/60 bg-white p-4 sm:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <p className="flex items-center gap-2.5">
            <span aria-hidden className="inline-flex size-9 items-center justify-center rounded-lg bg-navy text-white">
              <Building2 className="size-5" />
            </span>
            <span>
              <span className="block text-lg font-bold leading-tight text-navy">{roleDefinitions.account.title}</span>
              <span className="block text-[0.9375rem] leading-snug text-slate">{roleDefinitions.account.text}</span>
            </span>
          </p>
          <span className="rounded-full bg-amber-soft px-3 py-1 text-[0.8125rem] font-bold uppercase tracking-[0.06em] text-amber ring-1 ring-amber-mid">
            {rolesMapping}
          </span>
        </div>

        <div key={current.id} className="swap-in mt-5 space-y-4">
          {/* Sponsor and buyer: owners of the problem and the budget. */}
          <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr]">
            <div className="rounded-card bg-accent-soft p-4">
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.08em] text-accent-strong">
                <Landmark aria-hidden className="size-4" />
                {roleDefinitions.sponsor.title}
              </p>
              <p className="mt-1.5 text-[0.9375rem] text-slate">{roleDefinitions.sponsor.text}</p>
              <p className="mt-1 text-lg font-semibold leading-snug text-navy">
                <span className="sr-only">Candidate sponsor: </span>
                {current.sponsor}
              </p>
            </div>
            <p className="flex items-center justify-center text-center text-[0.8125rem] font-semibold leading-tight text-slate md:w-28">
              <span className="rounded-full border border-dashed border-slate/50 px-3 py-1.5">may be different people</span>
            </p>
            <div className="rounded-card bg-accent-soft p-4">
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.08em] text-accent-strong">
                <Wallet aria-hidden className="size-4" />
                {roleDefinitions.buyer.title}
              </p>
              <p className="mt-1.5 text-[0.9375rem] text-slate">{roleDefinitions.buyer.text}</p>
              <p className="mt-1 text-lg font-semibold leading-snug text-navy">Budget owner: confirm per account</p>
            </div>
          </div>

          {/* Approvals: a set of reviews, not a pipeline. */}
          <div className="rounded-card bg-blue-soft p-4">
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.08em] text-blue">
              <ShieldCheck aria-hidden className="size-4" />
              {roleDefinitions.approvals.title}
            </p>
            <p className="mt-1.5 text-[0.9375rem] text-slate">{roleDefinitions.approvals.text}</p>
            <ul className="mt-2.5 flex flex-wrap gap-2" aria-label="Candidate approvals for this family">
              {current.approvals.map((approval) => (
                <li key={approval} className="rounded-full bg-white px-3.5 py-1.5 text-[0.9375rem] font-semibold leading-snug text-navy ring-1 ring-blue-mid">
                  {approval}
                </li>
              ))}
            </ul>
            <p className="mt-2.5 text-[0.9375rem] font-medium text-blue">{roleDefinitions.approvalsNote}</p>
          </div>

          {/* Users: the people doing the work. */}
          <div className="rounded-card bg-violet-soft p-4">
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.08em] text-violet">
              <Users aria-hidden className="size-4" />
              {roleDefinitions.users.title}
            </p>
            <p className="mt-1.5 text-[0.9375rem] text-slate">{roleDefinitions.users.text}</p>
            <ul className="mt-2.5 flex flex-wrap gap-2" aria-label="Candidate users for this family">
              {current.users.map((user) => (
                <Chip key={user} tone="violet">
                  {user}
                </Chip>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-1 text-[0.9375rem] leading-snug text-slate">
        <p>{rolesNote}</p>
        <p>{rolesSeatNote}</p>
      </div>

      {/* Investor segments: who the firm serves, kept apart from who buys. */}
      <div className="mt-6 flex flex-col gap-2.5 rounded-card bg-white px-4 py-3.5 ring-1 ring-violet-mid sm:flex-row sm:items-center sm:gap-4">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="text-[0.9375rem] font-bold text-navy">{investorClientsLabel}:</span>
          <span className="flex flex-wrap gap-2">
            {investorSegments.map((segment, i) => (
              <span
                key={segment}
                className="rounded-full px-3 py-0.5 text-[0.9375rem] font-semibold text-white"
                style={{ background: ['#6f52c9', '#5b3aa8', '#4d3190'][i] }}
              >
                {segment}
              </span>
            ))}
          </span>
        </p>
        <p className="text-[0.9375rem] leading-snug text-slate sm:ml-auto sm:max-w-md">{investorCaption}</p>
      </div>
    </div>
  )
}
