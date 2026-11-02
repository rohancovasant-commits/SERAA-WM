import { ArrowDown, ArrowRight, BookOpen, Check, FileText, ListChecks, Settings, ShieldCheck, User, Users, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Section } from '../../components/ui/Section'
import { ExecHeader } from '../../components/exec/ExecHeader'
import { DetailDrawer } from '../../components/ui/DetailDrawer'
import { PanelButton } from '../../components/overview/parts'
import { PanelLabel } from '../../components/opportunity/shared'
import { exec } from '../../components/exec/styles'
import { useDrawer } from '../../hooks/useDrawer'
import { systemFit as c } from '../../data/position/content'
import { approaches, chooseCriteria, systemBlocks, systemFitCaption } from '../../data/position/systemFit'

const sourceIcon: Record<string, LucideIcon> = { policy: FileText, crm: Users, guidance: BookOpen }
const roleIcon: LucideIcon[] = [Settings, ShieldCheck, Users]

/** Five columns on wide screens: Ask, arrow, Use approved sources, arrow, Review draft. */
const cols = 'lg:grid-cols-[minmax(0,1.15fr)_2.25rem_minmax(0,2.3fr)_2.25rem_minmax(0,1.7fr)]'

function StepHeading({ n, children }: { n: number; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden className="flex size-7 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">{n}</span>
      <h3 className="text-lg font-bold leading-tight text-heading">{children}</h3>
      <span aria-hidden className="h-px flex-1 bg-line-strong" />
    </div>
  )
}

function Next() {
  return (
    <>
      <span aria-hidden className="hidden items-center justify-center lg:flex">
        <ArrowRight className="size-5 text-slate" />
      </span>
      <ArrowDown aria-hidden className="mx-auto size-5 text-slate lg:hidden" />
    </>
  )
}

/**
 * System fit: one worked example, left to right. An RM asks, SERAA drafts from approved sources held in the firm's
 * own systems, and the RM reviews. Covasant's role runs beneath. Schematic only; no connector is established.
 */
export function SystemFitSection() {
  const drawer = useDrawer<true>()

  return (
    <Section id="system-fit" headingId="system-fit-title" surface="sky">
      <ExecHeader id="system-fit-title" as="h2" eyebrow="Position · System fit" title={c.headline} lede={c.lede} wide />

      <section aria-label="Worked example" className={`mt-6 ${exec.panel} bg-white px-5 py-6 sm:px-7`}>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-xl font-bold leading-tight text-heading">{c.example.title}</h3>
          <span className="rounded-full bg-tint px-3 py-0.5 text-[0.8125rem] font-semibold text-accent-strong">{c.example.status}</span>
        </div>

        <div className={`mt-6 grid gap-x-0 gap-y-4 lg:gap-y-5 ${cols}`}>
          {/* Headings */}
          <div className="lg:col-start-1"><StepHeading n={1}>{c.steps.ask}</StepHeading></div>
          <div className="hidden lg:col-start-3 lg:block"><StepHeading n={2}>{c.steps.sources}</StepHeading></div>
          <div className="hidden lg:col-start-5 lg:block"><StepHeading n={3}>{c.steps.review}</StepHeading></div>

          {/* 1 Ask */}
          <div className="flex items-center gap-3 lg:col-start-1 lg:row-start-2">
            <div className="flex shrink-0 flex-col items-center">
              <User aria-hidden strokeWidth={1.4} className="size-10 text-navy" />
              <span className="text-[0.9375rem] font-medium text-heading">{c.ask.who}</span>
            </div>
            <p className="relative rounded-xl bg-wash px-4 py-3.5 text-base font-medium leading-snug text-heading before:absolute before:-left-1.5 before:top-1/2 before:size-3 before:-translate-y-1/2 before:rotate-45 before:bg-wash">{c.ask.question}</p>
          </div>

          <div className="lg:col-start-2 lg:row-start-2 lg:flex lg:items-center"><Next /></div>

          {/* 2 Approved sources into SERAA */}
          <div className="lg:col-start-3 lg:row-start-2">
            <div className="mb-3 lg:hidden"><StepHeading n={2}>{c.steps.sources}</StepHeading></div>
            <div className="grid items-stretch gap-y-3 sm:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)]">
              <div className="relative rounded-xl border border-hairline bg-wash/60 px-4 py-4">
                <p className="text-[0.9375rem] font-bold leading-tight text-heading">{c.sources.title}</p>
                <p className="text-[0.8125rem] leading-tight text-slate">{c.sources.sub}</p>
                <div className="mt-3">
                  <ul className="space-y-2">
                    {c.sources.items.map((item) => {
                      const Icon = sourceIcon[item.id]
                      return (
                        <li key={item.id} className="flex items-center gap-2.5 rounded-lg border border-hairline bg-white px-3 py-2.5 text-[0.9375rem] font-medium text-heading">
                          <Icon aria-hidden strokeWidth={1.6} className="size-5 shrink-0 text-navy" />
                          {item.label}
                        </li>
                      )
                    })}
                  </ul>
                  <svg aria-hidden className="absolute left-full top-0 hidden h-full w-12 sm:block" viewBox="0 0 48 100" preserveAspectRatio="none" fill="none">
                    <path d="M0 37 H16 Q24 37 24 45 V52 Q24 60 32 60 H48 M0 60 H48 M0 83 H16 Q24 83 24 75 V68 Q24 60 32 60" stroke="var(--color-line-strong)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                  </svg>
                </div>
              </div>
              <ArrowDown aria-hidden className="mx-auto size-5 text-slate sm:hidden" />
              <span aria-hidden className="hidden sm:block" />
              <div className="flex flex-col justify-center rounded-xl border border-accent/40 bg-tint px-4 py-4 sm:col-start-3 sm:row-start-1">
                <p className="text-center text-lg font-bold tracking-[0.3em] text-navy">{c.seraa.title}</p>
                <div className="mt-3 flex items-center gap-2.5 rounded-lg border border-hairline bg-white px-3 py-2.5 text-[0.9375rem] font-medium leading-snug text-heading">
                  <BookOpen aria-hidden strokeWidth={1.6} className="size-5 shrink-0 text-navy" />
                  {c.seraa.find}
                </div>
                <ArrowDown aria-hidden className="mx-auto my-1.5 size-4 text-slate" />
                <div className="flex items-center gap-2.5 rounded-lg border border-hairline bg-white px-3 py-2.5 text-[0.9375rem] font-medium leading-snug text-heading">
                  <ListChecks aria-hidden strokeWidth={1.6} className="size-5 shrink-0 text-navy" />
                  {c.seraa.draft}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-start-4 lg:row-start-2 lg:flex lg:items-center"><Next /></div>

          {/* 3 Review draft */}
          <div className="lg:col-start-5 lg:row-start-2">
            <div className="mb-3 lg:hidden"><StepHeading n={3}>{c.steps.review}</StepHeading></div>
            <div className="flex items-center gap-4">
              <div className="min-w-0 flex-1 rounded-xl border border-hairline bg-white px-4 py-4 shadow-[0_1px_2px_rgb(13_26_53/0.06)]">
                <p className="text-[0.9375rem] font-bold leading-tight text-heading">
                  {c.draft.title} <span className="font-normal text-slate">{c.draft.sub}</span>
                </p>
                <div aria-hidden className="mt-2.5 space-y-1.5">
                  <span className="block h-2 rounded-full bg-line" />
                  <span className="block h-2 rounded-full bg-line" />
                  <span className="block h-2 w-3/5 rounded-full bg-line" />
                </div>
                <p className={`mt-3 ${exec.label}`}>{c.draft.sourcesLabel}</p>
                <ul className="mt-1.5 flex flex-wrap gap-1.5">
                  {c.sources.items.map((item) => (
                    <li key={item.id} className="flex items-center gap-1 rounded-md border border-hairline bg-wash px-2 py-1 text-[0.8125rem] text-slate">
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-20 shrink-0 flex-col items-center text-center">
                <span className="relative">
                  <User aria-hidden strokeWidth={1.4} className="size-11 text-navy" />
                  <Check aria-hidden strokeWidth={3} className="absolute -bottom-0.5 -right-2 size-5 rounded-full bg-navy p-1 text-white" />
                </span>
                <span className="mt-1 text-[0.8125rem] font-medium leading-tight text-heading">{c.reviewer}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Covasant */}
        <div className="mt-7 flex flex-col gap-4 rounded-xl bg-navy px-7 py-6 text-white sm:flex-row sm:items-center sm:gap-0">
          <p className="text-2xl font-bold sm:w-56 sm:border-r sm:border-white/25">{c.covasant.name}</p>
          <ul className="grid flex-1 gap-3 sm:grid-cols-3 sm:gap-0">
            {c.covasant.roles.map((role, i) => {
              const Icon = roleIcon[i]
              return (
                <li key={role} className="flex items-center gap-3 text-lg font-medium sm:justify-center sm:border-r sm:border-white/25 sm:last:border-r-0">
                  <Icon aria-hidden strokeWidth={1.6} className="size-6 text-teal-bright" />
                  {role}
                </li>
              )
            })}
          </ul>
        </div>
        <p className={`mt-2.5 ${exec.meta}`}>{c.note}</p>
      </section>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <PanelButton onOpen={(opener) => drawer.open(true, opener)}>{c.button}</PanelButton>
        <p className={exec.meta}>{c.caption}</p>
      </div>

      <DetailDrawer open={drawer.value !== null} onClose={drawer.close} title="Integration requirements" eyebrow="Supporting detail" returnFocusRef={drawer.trigger}>
        <div className="space-y-8">
          <p className="rounded-card bg-wash px-4 py-3 font-semibold leading-snug text-heading">{c.principle}</p>

          <section>
            <PanelLabel>Approaches to compare</PanelLabel>
            <ul className="mt-2 divide-y divide-line">
              {approaches.map((a) => (
                <li key={a.id} className="py-3 first:pt-0">
                  <p className="font-semibold text-heading">{a.label}</p>
                  <p className="mt-0.5 leading-snug">{a.sentence}</p>
                </li>
              ))}
            </ul>
            <p className={`mt-2 ${exec.meta}`}>{systemFitCaption}</p>
          </section>

          <section>
            <PanelLabel>How we choose</PanelLabel>
            <ul className="mt-2 divide-y divide-line">
              {chooseCriteria.map((q) => (
                <li key={q.title} className="py-2.5 first:pt-0 leading-snug">
                  <span className="font-semibold text-heading">{q.title}: </span>
                  {q.question}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <PanelLabel>Customer systems to assess</PanelLabel>
            <p className="mt-2 leading-snug">{systemBlocks.join(', ')}</p>
            <p className={`mt-1 ${exec.meta}`}>Interfaces, permissions and ownership are agreed per workflow. Records and transactions stay in the customer’s designated systems. No connector is established.</p>
          </section>
        </div>
      </DetailDrawer>
    </Section>
  )
}
