import { Compass, Rocket, Boxes, Handshake, type LucideIcon } from 'lucide-react'
import { ownerBlock, ownershipRoles, ownershipStatus, sharedFoundation, type OwnershipRole } from '../../data/growth/ownership'
import { QualifierPill } from './StatusChip'

const roleStyle: Record<OwnershipRole['id'], { surface: string; edge: string; label: string; icon: LucideIcon; iconTone: string }> = {
  product: { surface: 'bg-violet-soft', edge: 'border-violet', label: 'text-violet', icon: Boxes, iconTone: 'bg-violet text-white' },
  sales: { surface: 'bg-blue-soft', edge: 'border-blue', label: 'text-blue', icon: Handshake, iconTone: 'bg-blue text-white' },
  delivery: { surface: 'bg-accent-soft', edge: 'border-accent', label: 'text-accent-strong', icon: Rocket, iconTone: 'bg-accent text-white' },
}

/** One owner above three role blocks, with a shared foundation beneath. Roles, not named people. */
export function OwnershipDiagram() {
  return (
    <div className="rounded-panel border border-line bg-white px-5 py-9 sm:px-9 sm:py-12">
      <div className="mx-auto max-w-2xl rounded-panel bg-navy px-6 py-6 text-center text-white sm:px-9">
        <span aria-hidden className="mx-auto mb-3 flex size-10 items-center justify-center rounded-full bg-white/10 text-teal-bright">
          <Compass className="size-5" />
        </span>
        <h3 className="text-2xl font-bold leading-tight sm:text-[1.75rem]">{ownerBlock.title}</h3>
        <p className="mt-2 text-lg leading-snug text-white/80">{ownerBlock.subtitle}</p>
      </div>

      {/* Connector from the owner to the three roles. */}
      <div aria-hidden className="relative mx-auto hidden h-12 lg:block">
        <span className="absolute left-1/2 top-0 h-6 w-0.5 -translate-x-1/2 bg-navy/30" />
        <span className="absolute left-[16.67%] right-[16.67%] top-6 h-0.5 bg-navy/30" />
        {['16.67%', '50%', '83.33%'].map((left) => (
          <span key={left} className="absolute top-6 h-6 w-0.5 -translate-x-1/2 bg-navy/30" style={{ left }} />
        ))}
      </div>
      <div aria-hidden className="mx-auto h-8 w-0.5 bg-navy/30 lg:hidden" />

      <ul className="grid gap-5 lg:grid-cols-3 lg:gap-6">
        {ownershipRoles.map((role) => {
          const s = roleStyle[role.id]
          const Icon = s.icon
          return (
            <li key={role.id} className={`rounded-panel border-t-4 px-6 py-7 ${s.surface} ${s.edge}`}>
              <span aria-hidden className={`flex size-11 items-center justify-center rounded-xl ${s.iconTone}`}>
                <Icon className="size-5" />
              </span>
              <h3 className={`mt-4 text-sm font-bold uppercase tracking-[0.14em] ${s.label}`}>{role.label}</h3>
              <p className="mt-2 text-xl font-semibold leading-snug text-navy">{role.text}</p>
            </li>
          )
        })}
      </ul>

      {/* Shared foundation. */}
      <div aria-hidden className="mx-auto h-6 w-0.5 border-l-2 border-dashed border-navy/30" />
      <div className="rounded-panel border border-dashed border-line-strong bg-canvas px-5 py-5 sm:px-7">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-slate">Shared foundation</p>
        <ul className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 text-lg font-semibold text-navy">
          {sharedFoundation.map((item, i) => (
            <li key={item} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden className="hidden text-slate sm:inline">·</span>}
              {item}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-center">
        <QualifierPill>{ownershipStatus}</QualifierPill>
      </p>
    </div>
  )
}
