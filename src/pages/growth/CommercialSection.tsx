import { Section } from '../../components/ui/Section'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { SourceReference } from '../../components/ui/SourceReference'
import { BulletList, Disclosure } from '../../components/growth/Disclosure'
import { QualifierPill } from '../../components/growth/StatusChip'
import { CommercialObjects } from '../../components/growth/CommercialObjects'
import { PricingFamilies } from '../../components/growth/PricingFamilies'
import { commercialHeading, commercialStatement, economics, nativeWork, pricingStatus } from '../../data/growth/commercial'

export function CommercialSection() {
  return (
    <Section id="commercial-model" headingId="commercial-model-title" surface="lilac">
      <SectionHeading id="commercial-model-title" eyebrow="Commercial model" title={commercialHeading} />

      <div className="mt-10">
        <CommercialObjects />
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3">
        <p className="border-l-4 border-violet pl-6 text-2xl font-bold leading-snug text-navy sm:text-[1.75rem]">{commercialStatement}</p>
        <QualifierPill>{pricingStatus}</QualifierPill>
      </div>

      <div className="mt-10">
        <PricingFamilies />
      </div>

      <div className="mt-10 space-y-5">
        <Disclosure label={economics.label}>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              { ...economics.customer, tone: 'text-accent-strong' },
              { ...economics.covasant, tone: 'text-violet' },
            ].map((column) => (
              <section key={column.title}>
                <h3 className={`text-sm font-bold uppercase tracking-[0.12em] ${column.tone}`}>{column.title}</h3>
                <BulletList items={column.items} className="mt-3" />
              </section>
            ))}
          </div>
          <div className="mt-7 border-t border-line pt-5">
            <BulletList items={economics.notes} className="text-[0.9375rem]" />
            <p className="mt-4 text-[0.9375rem] text-slate">{economics.sourceNote}</p>
            <SourceReference ids={economics.sourceIds} className="mt-2" />
          </div>
        </Disclosure>

        <Disclosure label={nativeWork.label}>
          <p className="leading-snug">{nativeWork.text}</p>
        </Disclosure>
      </div>
    </Section>
  )
}
