import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Handshake, PackageCheck, ShieldCheck, type LucideIcon } from 'lucide-react'
import { ExecHeader } from '../../components/exec/ExecHeader'
import { exec } from '../../components/exec/styles'
import { ClosingBand } from '../../components/position/parts'
import { Section } from '../../components/ui/Section'
import { actionClass } from '../../components/ui/actionClass'
import { slideOne as one, slideThree as three, slideTwo as two } from '../../data/growth/slides'

const label = 'text-[0.75rem] font-bold uppercase tracking-[0.14em]'

function DetailButton({ onOpen, children }: { onOpen: (opener: HTMLElement) => void; children: string }) {
  return (
    <button type="button" aria-haspopup="dialog" onClick={(event) => onOpen(event.currentTarget)} className={actionClass('secondary')}>
      {children}
      <ArrowUpRight aria-hidden className="size-4" />
    </button>
  )
}

/** Slide 1: three proposed pursuits, one selection lens, one output. Not a pipeline: nothing is qualified or selected. */
export function WinFirstOffer({ eyebrow, onOpenDetails }: { eyebrow: string; onOpenDetails: (opener: HTMLElement) => void }) {
  return (
    <>
      <ExecHeader id="introduction-title" eyebrow={eyebrow} title={one.headline} wide />

      <p className={`mt-8 ${label} text-slate`}>{one.label}</p>
      <ul className="mt-3 grid gap-5 md:grid-cols-3">
        {one.cards.map((card) => (
          <li key={card.id} className="rounded-[12px] border border-hairline bg-white px-6 py-6">
            <p className="text-2xl font-bold leading-tight text-heading">{card.name}</p>
            <p className="mt-3 text-lg leading-snug text-slate">{card.text}</p>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-y border-line py-4">
        <span className={`${label} text-slate`}>{one.lensLabel}</span>
        <ul className="flex flex-wrap gap-x-6 gap-y-1 text-lg font-semibold text-heading">
          {one.lens.map((item, i) => (
            <li key={item} className="flex items-center gap-6">
              {i > 0 && <span aria-hidden className="hidden h-4 w-px bg-line-strong sm:block" />}
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <ClosingBand tag="Output" buttons={<DetailButton onOpen={onOpenDetails}>{one.button}</DetailButton>}>
          {one.output}
        </ClosingBand>
      </div>
    </>
  )
}

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

/** Slide 2: one working solution leads to two proposed routes to more sales. A proposed approach: no forecast, no guarantee. */
export function ExpandWhatWorks({ onOpenDetails }: { onOpenDetails: (opener: HTMLElement) => void }) {
  return (
    <Section id="expand" headingId="expand-title">
      <ExecHeader id="expand-title" as="h2" eyebrow="Growth · Expand what works" title={two.headline} wide />

      <div className="mt-8 flex flex-col items-center">
        <p className="max-w-xl rounded-[12px] bg-navy px-8 py-4 text-center text-xl font-bold leading-snug text-white">{two.start}</p>
        <span aria-hidden className="hidden h-5 w-px bg-accent md:block" />
        <span aria-hidden className="hidden h-5 w-1/2 max-w-[24rem] rounded-t-xl border-x border-t border-accent md:block" />
        <ul className="grid w-full max-w-4xl gap-x-8 md:grid-cols-2">
          {two.routes.map((r) => (
            <li key={r.id} className="flex flex-col items-center">
              <ArrowDown aria-hidden strokeWidth={1.75} className="my-1 size-6 text-accent" />
              <div className="h-full w-full rounded-[12px] border border-accent/40 bg-tint px-6 py-5">
                <p className="text-xl font-bold leading-snug text-heading">{r.title}</p>
                <p className="mt-2 text-lg leading-snug text-heading">{r.text}</p>
                <p className="mt-4 border-t border-accent/25 pt-3 text-[0.9375rem] leading-snug text-slate">{r.example}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="mx-auto mt-8 max-w-4xl text-center text-xl font-bold leading-snug text-heading">{two.takeaway}</p>

      <ul className="mx-auto mt-5 grid max-w-4xl divide-y divide-line border-y border-line md:grid-cols-3 md:divide-x md:divide-y-0">
        {two.checks.map((c) => (
          <li key={c} className="py-3 text-center text-lg font-semibold leading-snug text-heading md:px-4">
            {c}
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <p className={exec.meta}>{two.qualification}</p>
        <DetailButton onOpen={onOpenDetails}>{two.button}</DetailButton>
      </div>
    </Section>
  )
}

const roleIcon: Record<string, LucideIcon> = { sales: Handshake, product: PackageCheck, delivery: ShieldCheck }

/** Slide 3: one accountable owner above three supporting roles, then the leadership action. Roles only; no names. */
export function OrganiseToGrow({ onOpenDetails }: { onOpenDetails: (opener: HTMLElement) => void }) {
  return (
    <Section id="organise" headingId="organise-title">
      <ExecHeader id="organise-title" as="h2" eyebrow="Growth · Organise to grow" title={three.headline} lede={three.lede} wide />

      <div className="mt-8 flex flex-col items-center">
        <div className="w-full max-w-md rounded-[12px] bg-navy px-7 py-5 text-center text-white">
          <p className={`${label} text-teal-bright`}>{three.owner.label}</p>
          <p className="mt-1 text-lg font-semibold leading-snug">{three.owner.text}</p>
        </div>
        <svg aria-hidden viewBox="0 0 400 40" preserveAspectRatio="none" className="hidden h-10 w-full max-w-4xl text-accent md:block" {...stroke}>
          <path d="M200 0v14M67 40V22a8 8 0 0 1 8-8h250a8 8 0 0 1 8 8v18M200 14v26" strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
        </svg>
        <span aria-hidden className="h-6 w-px border-l border-dashed border-accent md:hidden" />
        <ul className="grid w-full max-w-4xl gap-5 md:grid-cols-3">
          {three.roles.map((r) => {
            const Icon = roleIcon[r.id]
            return (
              <li key={r.id} className="rounded-[12px] border border-hairline bg-white px-5 py-5">
                <Icon aria-hidden strokeWidth={1.75} className="size-5 text-accent" />
                <p className="mt-2 text-xl font-bold leading-tight text-heading">{r.label}</p>
                <p className="mt-1 text-base leading-snug text-slate">{r.text}</p>
              </li>
            )
          })}
        </ul>
        <p className={`mt-3 ${exec.meta}`}>{three.note}</p>
      </div>

      <div className="mx-auto mt-8 max-w-4xl">
        <ClosingBand tag={three.action.tag} buttons={<DetailButton onOpen={onOpenDetails}>{three.button}</DetailButton>}>
          {three.action.text}
        </ClosingBand>
        <p className={`mt-6 ${label} text-slate`}>{three.outputsLabel}</p>
        <ol className="mt-2 grid divide-y divide-line border-y border-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {three.outputs.map((q, i) => (
            <li key={q} className="flex items-baseline gap-3 py-3 md:px-5 md:first:pl-0">
              <span aria-hidden className="text-sm font-bold text-accent-strong">{i + 1}</span>
              <span className="text-lg font-semibold leading-snug text-heading">{q}</span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
