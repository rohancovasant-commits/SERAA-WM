import type { ReactNode } from 'react'
import { FileCheck2, Handshake, PlugZap, type LucideIcon } from 'lucide-react'
import { marketPhotos } from '../../assets/market'
import { partnerRoles, salesRoutes, type SalesRoute } from '../../data/growth/sales'
import { PhotoFrame } from '../exec/PhotoFrame'

const roleIcons: LucideIcon[] = [Handshake, PlugZap, FileCheck2]
const roleTone = ['bg-blue-soft text-blue', 'bg-violet-soft text-violet', 'bg-amber-soft text-amber']

/** Scene-setting photographs from the supplied market set. They show the setting only and imply no account or partner. */
const visuals: Record<SalesRoute['id'], ReactNode> = {
  relationships: <PhotoFrame src={marketPhotos.wealthAdvisory} aspect="aspect-[3/2]" />,
  comparable: <PhotoFrame src={marketPhotos.portfolioManagers} aspect="aspect-[3/2]" />,
  partner: (
    <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,11rem)] sm:items-center">
      <PhotoFrame src={marketPhotos.bankWealth} aspect="aspect-[4/3]" />
      <ul className="flex w-full flex-col gap-2.5">
        {partnerRoles.map((role, i) => {
          const Icon = roleIcons[i]
          return (
            <li key={role} className="flex items-center gap-2.5 rounded-card border border-hairline bg-white px-3 py-2.5">
              <span aria-hidden className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${roleTone[i]}`}>
                <Icon className="size-4" />
              </span>
              <span className="text-[0.9375rem] font-semibold leading-tight text-navy">{role}</span>
            </li>
          )
        })}
      </ul>
    </div>
  ),
}

/** Three selling routes, alternating image side. Captions stay short and carry no promise of speed or cost. */
export function SalesRoutes() {
  return (
    <ol className="space-y-8 sm:space-y-10">
      {salesRoutes.map((route, i) => (
        <li key={route.id} className="grid items-center gap-6 rounded-panel border border-hairline bg-white p-5 sm:p-8 lg:grid-cols-2 lg:gap-12">
          <div className={`min-w-0 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>{visuals[route.id]}</div>
          <div className="min-w-0">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue">Route {route.letter}</p>
            <h3 className="mt-2 text-[1.75rem] font-bold leading-tight text-navy sm:text-3xl">{route.title}</h3>
            <p className="mt-3 text-xl leading-snug text-ink">{route.caption}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
