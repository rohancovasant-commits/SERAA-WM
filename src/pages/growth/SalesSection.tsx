import { Section } from '../../components/ui/Section'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { AccountExamples } from '../../components/growth/AccountExamples'
import { BulletList, Disclosure } from '../../components/growth/Disclosure'
import { SalesProcess } from '../../components/growth/SalesProcess'
import { SalesRoutes } from '../../components/growth/SalesRoutes'
import {
  accountsLabel,
  processDisclosure,
  processLabel,
  processStatement,
  relevanceDisclosure,
  salesHeading,
  sellingPack,
} from '../../data/growth/sales'

export function SalesSection() {
  return (
    <Section id="sales" headingId="sales-title" surface="sky">
      <SectionHeading id="sales-title" eyebrow="Sales" title={salesHeading} />

      <div className="mt-10">
        <SalesRoutes />
      </div>

      <div className="mt-16">
        <h3 className="text-2xl font-bold text-navy">{accountsLabel}</h3>
        <div className="mt-5">
          <AccountExamples />
        </div>
        <Disclosure label={relevanceDisclosure.label} className="mt-6">
          <BulletList items={relevanceDisclosure.items} />
          <p className="mt-4 rounded-card bg-wash px-4 py-3 text-[0.9375rem] leading-snug">{relevanceDisclosure.note}</p>
        </Disclosure>
      </div>

      <div className="mt-16">
        <h3 className="text-2xl font-bold text-navy">{processLabel}</h3>
        <div className="mt-5">
          <SalesProcess />
        </div>
        <p className="mt-10 max-w-3xl border-l-4 border-blue pl-6 text-2xl font-bold leading-snug text-navy sm:text-[1.75rem]">{processStatement}</p>
        <div className="mt-6 space-y-5">
          <Disclosure label={processDisclosure.label}>
            <BulletList items={processDisclosure.items} />
          </Disclosure>
          <Disclosure label={sellingPack.label}>
            <BulletList items={sellingPack.items} />
            <p className="mt-4 leading-snug">{sellingPack.explanation}</p>
            <BulletList items={sellingPack.cautions} className="mt-4 text-[0.9375rem] text-slate" />
          </Disclosure>
        </div>
      </div>
    </Section>
  )
}
