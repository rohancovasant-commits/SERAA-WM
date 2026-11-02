import { ArrowRight, Plus } from 'lucide-react'
import { Section } from '../../components/ui/Section'
import { ExecHeader } from '../../components/exec/ExecHeader'
import { PanelButton } from '../../components/overview/parts'
import { DetailDrawer } from '../../components/ui/DetailDrawer'
import { PanelLabel } from '../../components/opportunity/shared'
import { exec } from '../../components/exec/styles'
import { useDrawer } from '../../hooks/useDrawer'
import { commercialCase as c, commercialDetailGroups, notComputed } from '../../data/opportunity/case'

/**
 * Commercial potential chapter: a proposed revenue model, not a forecast. One surface with three commercial
 * considerations (value, revenue, delivery economics), a repeatability test and one next action. No price, margin,
 * market size or reuse claim: those inputs do not exist yet.
 */
export function CommercialSection() {
  const detail = useDrawer<true>()

  return (
    <Section id="commercial-potential" headingId="commercial-title" surface="sky">
      <ExecHeader id="commercial-title" as="h2" eyebrow={c.eyebrow} title={c.headline} lede={c.support} wide />

      <section aria-labelledby="model-label" className="mt-6 rounded-panel bg-white shadow-[0_1px_2px_rgb(13_26_53/0.06)]">
        <p id="model-label" className="border-b border-line px-5 py-3 text-sm font-semibold text-accent-strong sm:px-7">
          {c.modelLabel}
        </p>
        <div className="grid divide-y divide-line lg:grid-cols-[1fr_1.25fr_1fr] lg:divide-x lg:divide-y-0">
          <div className="px-5 py-5 sm:px-7">
            <Heading label={c.value.label} question={c.value.question} />
            <ul className="mt-4 space-y-2.5">
              {c.value.items.map((item) => (
                <li key={item} className="flex gap-2.5 text-lg font-semibold leading-snug text-heading">
                  <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <p className={`mt-4 ${exec.meta}`}>{c.value.note}</p>
          </div>

          <div className="px-5 py-5 sm:px-7">
            <Heading label={c.revenue.label} question={c.revenue.question} />
            <div className="mt-4 space-y-2">
              <Component tag={c.revenue.oneOff.tag} title={c.revenue.oneOff.title} text={c.revenue.oneOff.text} />
              <Plus aria-hidden className="mx-auto size-5 text-slate" />
              <Component tag={c.revenue.recurring.tag} title={c.revenue.recurring.title} text={c.revenue.recurring.text} emphasis />
            </div>
            <p className={`mt-4 ${exec.meta}`}>{c.revenue.note}</p>
          </div>

          <div className="px-5 py-5 sm:px-7">
            <Heading label={c.economics.label} question={c.economics.question} />
            <div className="mt-4 space-y-4">
              <Cost tag={c.economics.initial.tag} text={c.economics.initial.text} />
              <Cost tag={c.economics.ongoing.tag} text={c.economics.ongoing.text} />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="expansion-label" className="mt-8">
        <h3 id="expansion-label" className={exec.label}>
          {c.expansion.label}
        </h3>
        <div className="mt-2 grid items-start gap-3 md:grid-cols-[1fr_auto_1fr] md:gap-5">
          <div>
            <p className="text-lg font-bold leading-snug text-heading">{c.expansion.first.tag}</p>
            <p className="text-base leading-snug text-slate">{c.expansion.first.text}</p>
          </div>
          <ArrowRight aria-hidden className="hidden size-5 self-center text-slate md:block" />
          <div>
            <p className="text-lg font-bold leading-snug text-heading">{c.expansion.comparable.tag}</p>
            <p className="text-base leading-snug text-slate">{c.expansion.comparable.text}</p>
          </div>
        </div>
        <p className="mt-3 text-xl font-bold leading-snug text-heading">{c.expansion.question}</p>
      </section>

      <section aria-label="Next step" className={`mt-8 ${exec.panel} border-l-[6px] border-l-accent bg-tint px-5 py-4 sm:px-6`}>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <p className="min-w-0 flex-1 basis-[22rem]">
            <span className="block text-xl font-bold leading-snug text-heading">{c.next}</span>
            <span className="mt-1 block text-base leading-snug text-slate">{c.nextLabels.join(' · ')}</span>
          </p>
          <PanelButton onOpen={(opener) => detail.open(true, opener)}>{c.detailButton}</PanelButton>
        </div>
      </section>

      <DetailDrawer open={detail.value !== null} onClose={detail.close} title={c.detailTitle} eyebrow="Supporting detail" returnFocusRef={detail.trigger}>
        <div className="space-y-8">
          <p className="rounded-card bg-wash px-4 py-3 leading-snug">{notComputed}</p>
          {commercialDetailGroups.map((group) => (
            <section key={group.id}>
              <PanelLabel>{group.title}</PanelLabel>
              <ul className="mt-2 divide-y divide-line">
                {group.items.map((item) => (
                  <li key={item.label} className="py-2.5 first:pt-0">
                    <p className="font-semibold text-heading">{item.label}</p>
                    <p className="mt-0.5 leading-snug">{item.text}</p>
                  </li>
                ))}
              </ul>
              {group.note && <p className={`mt-2 ${exec.meta}`}>{group.note}</p>}
            </section>
          ))}
        </div>
      </DetailDrawer>
    </Section>
  )
}

function Heading({ label, question }: { label: string; question: string }) {
  return (
    <div>
      <p className={exec.label}>{label}</p>
      <p className="mt-1 text-xl font-bold leading-snug text-heading">{question}</p>
    </div>
  )
}

function Component({ tag, title, text, emphasis = false }: { tag: string; title: string; text: string; emphasis?: boolean }) {
  return (
    <div className={`rounded-lg px-4 py-3 ${emphasis ? 'bg-tint ring-1 ring-accent/40' : 'bg-wash'}`}>
      <p className={`text-[0.75rem] font-bold uppercase tracking-[0.1em] ${emphasis ? 'text-accent-strong' : 'text-slate'}`}>{tag}</p>
      <p className="mt-0.5 text-lg font-bold leading-snug text-heading">{title}</p>
      <p className="text-base leading-snug text-slate">{text}</p>
    </div>
  )
}

function Cost({ tag, text }: { tag: string; text: string }) {
  return (
    <div>
      <p className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-slate">{tag}</p>
      <p className="mt-0.5 text-lg font-semibold leading-snug text-heading">{text}</p>
    </div>
  )
}
