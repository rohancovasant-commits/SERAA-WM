import { Handshake, PackageCheck, Store, type LucideIcon } from 'lucide-react'
import { Section } from '../../components/ui/Section'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { SourceReference } from '../../components/ui/SourceReference'
import { Disclosure } from '../../components/growth/Disclosure'
import { PartnerExplorer } from '../../components/growth/PartnerExplorer'
import { GlyphTile } from '../../components/exec/GlyphTile'
import { activitiesHeading, channelPanel, partnerActivities, partnershipsHeading } from '../../data/growth/partnerships'

const activityIcon: Record<(typeof partnerActivities)[number]['id'], LucideIcon> = {
  cosell: Handshake,
  delivery: PackageCheck,
  marketplace: Store,
}

export function PartnershipsSection() {
  return (
    <Section id="partnerships" headingId="partnerships-title">
      <SectionHeading id="partnerships-title" eyebrow="Partnerships" title={partnershipsHeading} />

      <div className="mt-10">
        <PartnerExplorer />
      </div>

      <div className="mt-16 grid items-center gap-8 lg:grid-cols-[1fr_1.7fr] lg:gap-12">
        <p className="text-2xl font-bold leading-snug text-navy sm:text-[1.75rem]">{activitiesHeading}</p>
        <ul className="grid gap-4 sm:grid-cols-3">
          {partnerActivities.map((activity) => (
            <li key={activity.id} className="flex flex-col items-center rounded-panel border border-line bg-white px-3 py-5 text-center">
              <GlyphTile icon={activityIcon[activity.id]} tone="blue" className="h-24" />
              <p className="mt-3 text-lg font-bold leading-tight text-navy">{activity.label}</p>
            </li>
          ))}
        </ul>
      </div>

      <Disclosure label={channelPanel.label} className="mt-10">
        <ul className="space-y-3.5">
          {channelPanel.findings.map((finding) => (
            <li key={finding.text} className="flex gap-2.5 leading-snug">
              <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
              <span>
                {finding.text}
                {finding.sourceIds.length > 0 && <SourceReference ids={finding.sourceIds} className="ml-2" />}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-5 rounded-card bg-amber-soft px-4 py-3 leading-snug">
          {channelPanel.apiKeyNote}
          <SourceReference ids={channelPanel.apiKeySourceIds} className="ml-2" />
        </p>
      </Disclosure>
    </Section>
  )
}
