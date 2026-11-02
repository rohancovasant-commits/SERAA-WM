import { Fragment, useId, useRef, useState, type KeyboardEvent } from 'react'
import { ArrowRight, ChevronDown, FileText } from 'lucide-react'
import { familyPhoto } from '../exec/familyPhoto'
import { PhotoFrame } from '../exec/PhotoFrame'
import { RatingBadge } from './RatingBadge'
import { ratingInfo } from '../../data/readiness/ratings'
import { families } from '../../data/offerings/families'
import {
  domainChecks,
  evaluationHeading,
  examplesLabel,
  familyChecks,
  outsideProgression,
  proofExamples,
  proofFolders,
  type ProofFolder,
} from '../../data/readiness/proof'
import { toneStyles } from '../../styles/tones'

const folderEdge: Record<ProofFolder['rating'], string> = {
  1: 'border-amber',
  2: 'border-blue',
  3: 'border-accent',
}

/** One dossier. The tab carries the rating; the sheets inside are the evidence it needs. */
function Folder({ folder }: { folder: ProofFolder }) {
  const info = ratingInfo(folder.rating)
  return (
    <div className="relative h-full pt-7">
      <div className={`absolute left-0 top-0 flex h-9 w-44 items-center gap-2 rounded-t-2xl px-4 ${info.solid}`}>
        <span aria-hidden className="flex size-5 items-center justify-center rounded-full bg-white/25 text-xs font-bold">
          {info.symbol}
        </span>
        <span className="text-base font-bold">{folder.label}</span>
      </div>
      <div className={`h-full rounded-b-2xl rounded-tr-2xl border-2 bg-white px-5 pb-6 pt-6 ${folderEdge[folder.rating]}`}>
        <p className="text-[0.9375rem] leading-snug text-slate">{info.meaning}</p>
        <ul className="mt-4 space-y-2.5">
          {folder.contents.map((item) => (
            <li key={item} className={`flex items-center gap-3 rounded-lg border border-line px-3.5 py-3 ${info.soft}`}>
              <FileText aria-hidden className={`size-5 shrink-0 ${info.text}`} />
              <span className="text-lg font-semibold leading-snug text-navy">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function ProofFolders() {
  return (
    <div>
      <ol className="grid items-stretch gap-8 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:gap-4">
        {proofFolders.map((folder, i) => (
          <Fragment key={folder.rating}>
            {i > 0 && (
              <li aria-hidden className="hidden items-center lg:flex">
                <ArrowRight className="size-6 text-slate" />
              </li>
            )}
            <li className="h-full">
              <Folder folder={folder} />
            </li>
          </Fragment>
        ))}
      </ol>

      {/* Unverified and Gap sit outside the progression: neither is a step on a scale. */}
      <div className="mt-10">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate">{outsideProgression.label}</p>
        <div className="mt-3 grid gap-5 sm:grid-cols-2">
          {[
            { key: 'unverified' as const, style: 'border-slate/50 bg-wash', ...outsideProgression.unverified, rating: 'unverified' as const },
            { key: 'gap' as const, style: 'border-gap/50 bg-gap-soft', ...outsideProgression.gap, rating: 0 as const },
          ].map((item) => {
            const info = ratingInfo(item.rating)
            return (
              <div key={item.key} className={`flex items-center gap-4 rounded-panel border-2 border-dashed px-5 py-5 ${item.style}`}>
                <span aria-hidden className={`flex size-12 shrink-0 items-center justify-center rounded-full text-xl font-bold ${info.solid}`}>
                  {info.symbol}
                </span>
                <div>
                  <p className={`text-lg font-bold ${info.text}`}>{item.label}</p>
                  <p className="text-lg leading-snug text-ink">{item.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/** Two selectable examples. They state what proof would be needed, not what has been achieved. */
export function ProofExamples() {
  const [selected, setSelected] = useState(proofExamples[0].id)
  const baseId = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const current = proofExamples.find((e) => e.id === selected) ?? proofExamples[0]

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = proofExamples.length - 1
    let next = index
    if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1
    else if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1
    else return
    event.preventDefault()
    setSelected(proofExamples[next].id)
    refs.current[next]?.focus()
  }

  return (
    <div>
      <div role="tablist" aria-label="Proof example" className="flex flex-wrap gap-2.5">
        {proofExamples.map((example, i) => {
          const active = example.id === selected
          return (
            <button
              key={example.id}
              ref={(el) => {
                refs.current[i] = el
              }}
              id={`${baseId}-${example.id}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`${baseId}-panel`}
              tabIndex={active ? 0 : -1}
              onClick={() => setSelected(example.id)}
              onKeyDown={(event) => onKeyDown(event, i)}
              className={`rounded-full border px-5 py-2.5 text-base font-semibold transition-colors ${
                active ? 'border-navy bg-navy text-white' : 'border-navy/20 bg-white text-navy hover:border-accent hover:text-accent'
              }`}
            >
              {example.name}
            </button>
          )
        })}
      </div>
      <p className="mt-3 text-[0.9375rem] font-medium text-amber">{examplesLabel}</p>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-${current.id}`}
        key={current.id}
        className="swap-in mt-5 grid gap-6 rounded-panel bg-white px-6 py-7 lg:grid-cols-[auto_1fr_1fr] lg:gap-8"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate">Current</p>
          <p className="mt-2">
            <RatingBadge rating={current.current} />
          </p>
        </div>
        <div className="lg:border-l lg:border-line lg:pl-8">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue">To demonstrate</p>
          <p className="mt-2 text-lg leading-snug text-ink">{current.toDemonstrate}</p>
        </div>
        <div className="lg:border-l lg:border-line lg:pl-8">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-accent-strong">To repeat</p>
          <p className="mt-2 text-lg leading-snug text-ink">{current.toRepeat}</p>
        </div>
      </div>
    </div>
  )
}

/** One correctness check per offering family, beside that family's scene. */
export function FamilyChecks() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <h3 className="text-2xl font-bold text-navy">{evaluationHeading}</h3>
      <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {familyChecks.map((item) => {
          const family = families.find((f) => f.id === item.family)!
          const tone = toneStyles[family.tone]
          return (
            <li key={item.family} className={`rounded-panel p-3 ${tone.soft}`}>
              <PhotoFrame src={familyPhoto[item.family]} aspect="aspect-[16/9]" />
              <p className={`mt-4 px-1 text-sm font-semibold uppercase tracking-[0.12em] ${tone.text}`}>{item.name}</p>
              <p className="mt-1 px-1 pb-1 text-lg font-semibold leading-snug text-navy">{item.check}</p>
            </li>
          )
        })}
      </ul>

      <div className="mt-6">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="domain-checks"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-md text-base font-semibold text-accent underline-offset-4 hover:underline"
        >
          {domainChecks.label}
          <ChevronDown aria-hidden className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <div id="domain-checks" className="swap-in mt-3 max-w-3xl rounded-panel border border-line-strong bg-white px-6 py-5">
            <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {domainChecks.items.map((item) => (
                <li key={item} className="flex gap-2.5 leading-snug">
                  <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.9375rem] text-slate">{domainChecks.note}</p>
          </div>
        )}
      </div>
    </div>
  )
}
