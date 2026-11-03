import type { ReactNode } from 'react'
import { exec } from '../exec/styles'
import { SourceList } from '../ui/SourceEntry'
import { directions } from '../../data/growth/approach'
import { commercialComponents, economics, nativeWork, pricingFamilies, pricingFamiliesLabel, pricingUnitsNote } from '../../data/growth/commercial'
import { channelPanel, relationshipTypes } from '../../data/growth/partnerships'
import { accountExamples, accountsLabel, partnerRoles, relevanceDisclosure, salesRoutes, salesSteps, processStatement, processDisclosure, sellingPack } from '../../data/growth/sales'
import { decisionRights, handoff, ownerBlock, ownershipRoles, ownershipStatus, sharedFoundation } from '../../data/growth/ownership'
import { milestoneNote, milestones, measureLenses, measuresNote, moreMeasures, planActions } from '../../data/growth/scaling'
import { growthPanels, slideTwo } from '../../data/growth/slides'
import { growthOverview } from '../../data/overviews'
import type { SourceId } from '../../data/types'

const label = 'text-sm font-semibold uppercase tracking-[0.08em] text-slate'

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line pt-6 first:border-t-0 first:pt-0">
      <h3 className={`mb-3 ${label}`}>{title}</h3>
      {children}
    </section>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 leading-snug">
          <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function Lead({ children }: { children: ReactNode }) {
  return <p className="rounded-card bg-wash px-4 py-3 leading-snug">{children}</p>
}

/** Slide 1 detail: account evidence, how relevance is judged, the sales process and the selling pack. */
export function PursuitDetails() {
  return (
    <div className="space-y-8">
      <Lead>Proposed pursuits, not qualified pipeline. None is a confirmed wealth customer, and no budget or first offer has been selected.</Lead>

      <Block title={accountsLabel}>
        <ul className="divide-y divide-line">
          {accountExamples.map((a) => (
            <li key={a.id} className="py-4 first:pt-0">
              <p className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-lg font-bold text-heading">{a.name}</span>
                <span className="text-slate">· {a.status}</span>
              </p>
              <p className="mt-1 leading-snug">{a.action}</p>
              <p className={`mt-2 ${exec.meta}`}>Evidence needed: {a.evidenceNeeded.join(' · ')}</p>
              {a.sourceIds.length > 0 && (
                <div className="mt-2">
                  <SourceList ids={a.sourceIds} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </Block>

      <Block title={relevanceDisclosure.label}>
        <Bullets items={relevanceDisclosure.items} />
        <p className={`mt-2 ${exec.meta}`}>{relevanceDisclosure.note}</p>
      </Block>

      <Block title="Routes to a first sale">
        <ul className="divide-y divide-line">
          {salesRoutes.map((r) => (
            <li key={r.id} className="py-2.5 first:pt-0 leading-snug">
              <span className="font-semibold text-heading">
                {r.letter}. {r.title}:
              </span>
              {r.caption}
            </li>
          ))}
        </ul>
        <p className={`mt-2 ${exec.meta}`}>A partner can bring: {partnerRoles.join(', ').toLowerCase()}.</p>
      </Block>

      <Block title="Sales process">
        <p className="mb-3 font-semibold leading-snug text-navy">{processStatement}</p>
        <ol className="divide-y divide-line">
          {salesSteps.map((s) => (
            <li key={s.id} className="py-2.5 first:pt-0 leading-snug">
              <span className="font-semibold text-heading">{s.label}: </span>
              {s.output}
            </li>
          ))}
        </ol>
        <div className="mt-4">
          <p className="mb-2 font-semibold text-heading">{processDisclosure.label}</p>
          <Bullets items={processDisclosure.items} />
        </div>
      </Block>

      <Block title={sellingPack.label}>
        <Bullets items={sellingPack.items} />
        <p className={`mt-3 ${exec.meta}`}>{sellingPack.explanation}</p>
        <Bullets items={sellingPack.cautions} />
      </Block>
    </div>
  )
}

/** Slide 2 detail: pricing hypotheses, partnership options, credibility tracks, milestones and measures. */
export function ExpansionDetails() {
  const sourceIds = Array.from(new Set<SourceId>([...economics.sourceIds, ...channelPanel.findings.flatMap((f) => f.sourceIds), ...channelPanel.apiKeySourceIds]))
  return (
    <div className="space-y-8">
      <Lead>Pricing and partnership options are hypotheses. No Covasant rate, channel enrolment or partner eligibility is assumed, and delivery costs do not automatically fall with reuse.</Lead>

      <Block title="Credibility">
        <p className="leading-snug">{slideTwo.credibility}</p>
        <p className={`mt-2 ${exec.meta}`}>Proposed. Domain reviewers, customer permissions and reference rights are not yet established.</p>
      </Block>

      <Block title="Commercial components">
        <ul className="divide-y divide-line">
          {commercialComponents.map((c) => (
            <li key={c.id} className="py-2.5 first:pt-0 leading-snug">
              <span className="font-semibold text-heading">{c.label}. </span>
              {c.text}
            </li>
          ))}
        </ul>
      </Block>

      <Block title={pricingFamiliesLabel}>
        <ul className="divide-y divide-line">
          {pricingFamilies.map((f) => (
            <li key={f.id} className="py-2.5 first:pt-0 leading-snug">
              <span className="font-semibold text-heading">
                {f.label}: {f.unit}.
              </span>
              {f.define}
            </li>
          ))}
        </ul>
        <p className={`mt-2 ${exec.meta}`}>{pricingUnitsNote}</p>
      </Block>

      <Block title={economics.label}>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 font-semibold text-heading">{economics.customer.title}</p>
            <Bullets items={economics.customer.items} />
          </div>
          <div>
            <p className="mb-2 font-semibold text-heading">{economics.covasant.title}</p>
            <Bullets items={economics.covasant.items} />
          </div>
        </div>
        <div className="mt-4">
          <Bullets items={economics.notes} />
        </div>
        <p className={`mt-3 ${exec.meta}`}>{economics.sourceNote}</p>
        <p className={`mt-2 ${exec.meta}`}>
          <span className="font-semibold">{nativeWork.label}: </span>
          {nativeWork.text}
        </p>
      </Block>

      <Block title="Partnerships">
        <p className="mb-3 font-semibold leading-snug text-navy">{growthOverview.detail.partnership}</p>
        <ul className="divide-y divide-line">
          {relationshipTypes.map((r) => (
            <li key={r.id} className="py-3 first:pt-0 leading-snug">
              <p className="font-semibold text-heading">
                {r.label} <span className="font-normal text-slate">· {r.status}</span>
              </p>
              <p>{r.mutualValue}</p>
              <p className="text-slate">Next: {r.nextAction}</p>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <p className="mb-2 font-semibold text-heading">{channelPanel.label}</p>
          <ul className="space-y-2">
            {channelPanel.findings.map((f) => (
              <li key={f.text} className="flex gap-2.5 leading-snug">
                <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
                {f.text}
              </li>
            ))}
          </ul>
          <p className={`mt-2 ${exec.meta}`}>{channelPanel.apiKeyNote}</p>
        </div>
      </Block>

      <Block title="Credibility and business tracks">
        <ol className="divide-y divide-line">
          {growthOverview.detail.stages.map((s) => (
            <li key={s.id} className="py-3 first:pt-0 leading-snug">
              <p className="font-semibold text-heading">{s.label}</p>
              <p>
                <span className="font-semibold text-slate">Business: </span>
                {s.business}
              </p>
              <p>
                <span className="font-semibold text-slate">Credibility: </span>
                {s.credibility}
              </p>
            </li>
          ))}
        </ol>
        <p className={`mt-2 ${exec.meta}`}>{growthOverview.qualification}</p>
      </Block>

      <Block title="Business milestones">
        <p className={`mb-3 ${exec.meta}`}>{milestoneNote}</p>
        <ul className="divide-y divide-line">
          {milestones.map((m) => (
            <li key={m.id} className="py-3 first:pt-0 leading-snug">
              <p className="font-semibold text-heading">{m.title}</p>
              <p className="text-slate">{m.summary}</p>
              <p className="mt-1">Evidence: {m.evidenceNeeded.join(' ')}</p>
              <p className="text-slate">Investment implication: {m.investmentImplication}</p>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Ten proposed directions">
        <ul className="divide-y divide-line">
          {directions.map((d) => (
            <li key={d.id} className="py-3 first:pt-0 leading-snug">
              <p className="font-semibold text-heading">
                {d.topic} <span className="font-normal text-slate">· {d.status}</span>
              </p>
              <p>{d.shortTag}</p>
              <p className="text-slate">Validate: {d.validationTest}</p>
              <p className="text-slate">Proposed owner role: {d.proposedOwnerRole}. Named owner TBC.</p>
            </li>
          ))}
        </ul>
      </Block>

      {sourceIds.length > 0 && (
        <Block title="Sources">
          <SourceList ids={sourceIds} />
        </Block>
      )}
    </div>
  )
}

/** Slide 3 detail: owner, decision rights, handoff, shared foundations, measures and first-cycle actions. */
export function OwnershipDetails() {
  return (
    <div className="space-y-8">
      <Lead>{growthPanels.decisionsNote}</Lead>

      <Block title={ownerBlock.title}>
        <p className="leading-snug">{ownerBlock.subtitle}</p>
        <ul className="mt-3 divide-y divide-line">
          {ownershipRoles.map((r) => (
            <li key={r.id} className="py-2.5 first:pt-0 leading-snug">
              <span className="font-semibold text-heading">{r.label}: </span>
              {r.text}
            </li>
          ))}
        </ul>
        <p className={`mt-2 ${exec.meta}`}>Shared foundations: {sharedFoundation.join(', ')}. {ownershipStatus}.</p>
      </Block>

      <Block title={decisionRights.label}>
        <Bullets items={decisionRights.items} />
      </Block>

      <Block title={handoff.label}>
        <Bullets items={handoff.items} />
      </Block>

      <Block title="Measures to read together">
        <ul className="divide-y divide-line">
          {measureLenses.map((m) => (
            <li key={m.id} className="py-2.5 first:pt-0 leading-snug">
              <span className="font-semibold text-heading">{m.lens}: </span>
              {m.measures.join('; ')}
            </li>
          ))}
        </ul>
        <p className={`mt-2 ${exec.meta}`}>{measuresNote}</p>
        <div className="mt-3">
          <p className="mb-2 font-semibold text-heading">{moreMeasures.label}</p>
          <Bullets items={moreMeasures.items} />
        </div>
      </Block>

      <Block title={planActions.label}>
        <Bullets items={planActions.items} />
        <p className={`mt-2 ${exec.meta}`}>{planActions.note}</p>
      </Block>
    </div>
  )
}
