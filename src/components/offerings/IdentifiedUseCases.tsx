import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motilalUseCases, motilalUseCaseTotal } from '../../data/offerings/motilalUseCases'
import { exec } from '../exec/styles'

/**
 * The use cases identified in Motilal discovery, as a unit chart: one hollow dot per entry (none is built), one row per
 * theme. The big number is the count of entries supplied. The built agents are a separate set and are not counted here.
 * The full list, with the team's own tags, is behind a click.
 */
export function IdentifiedUseCases() {
  const [open, setOpen] = useState(false)
  const listId = useId()
  return (
    <div className={`${exec.panel} mt-4 bg-white px-5 py-5 sm:px-6`}>
      <div className="flex flex-wrap items-end gap-x-5 gap-y-1">
        <p className="text-6xl font-semibold leading-none tracking-tight text-heading">{motilalUseCaseTotal}</p>
        <p className="max-w-sm pb-1 text-lg font-semibold leading-snug text-heading">more use cases identified in Motilal discovery. None is built yet.</p>
      </div>

      <ul aria-label="Identified use cases by theme" className="mt-5 space-y-2">
        {motilalUseCases.map((theme) => (
          <li key={theme.id} className="grid grid-cols-[minmax(0,1fr)_2rem] items-center gap-x-3 gap-y-1 sm:grid-cols-[13rem_minmax(0,1fr)_2rem]">
            <span className="col-span-2 text-base font-semibold text-heading sm:col-span-1">{theme.label}</span>
            <span aria-hidden className="flex flex-wrap gap-1">
              {theme.items.map((_, i) => (
                <span key={i} className="size-3 rounded-full border-2 border-navy-3/45 bg-white" />
              ))}
            </span>
            <span className="text-right text-base font-bold tabular-nums text-heading">{theme.items.length}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        className="mt-5 inline-flex items-center gap-1.5 rounded-md text-base font-semibold text-accent underline-offset-4 hover:underline"
      >
        All identified use cases
        <ChevronDown aria-hidden className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div id={listId} className="swap-in mt-3 space-y-4">
          {motilalUseCases.map((theme) => (
            <section key={theme.id}>
              <h4 className={exec.label}>{theme.label}</h4>
              <ul className="mt-1.5 space-y-1">
                {theme.items.map((item, i) => (
                  <li key={`${item}-${i}`} className="flex gap-2.5 text-[0.9375rem] leading-snug text-ink">
                    <span aria-hidden className="mt-[0.5em] size-1.5 shrink-0 rounded-full bg-navy-3/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <p className={exec.meta}>As supplied by the team. Tags such as Quick Win and Strategic are theirs. Some entries repeat across business areas. Themes are for reading only, not a ranking.</p>
        </div>
      )}
    </div>
  )
}
