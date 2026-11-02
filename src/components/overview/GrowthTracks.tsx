import { ChevronRight } from 'lucide-react'
import { growthOverview } from '../../data/overviews'
import { exec } from '../exec/styles'


/**
 * Two aligned tracks across four stages, as one connected journey: a rising step names the stage, and each track's
 * output sits under it with a link to the next. The business track is teal and the credibility track violet; colour
 * groups, it never scores. A table on wide screens (each output stays under its stage) and a list per stage on
 * narrow ones. Proposed; no step is done.
 */
export function GrowthTracks() {
  const { stages, business, credibility, label } = growthOverview
  const rows = [
    { ...business, text: '!text-accent-strong', edge: 'border-l-accent' },
    { ...credibility, text: '!text-violet', edge: 'border-l-violet' },
  ]
  return (
    <>
      <table className="hidden w-full table-fixed border-separate border-spacing-y-2 text-left md:table">
        <caption className="sr-only">{label}</caption>
        <thead>
          <tr>
            <th scope="col" className="w-[7rem] lg:w-[8.5rem]">
              <span className="sr-only">Track</span>
            </th>
            {stages.map((stage, i) => (
              <th key={stage} scope="col" className="p-0 pr-6 align-bottom">
                <span className="flex items-end rounded-t-lg bg-navy-3 px-4 pb-2.5 text-lg font-bold text-white" style={{ height: `${2.75 + i * 1.25}rem` }}>
                  <span aria-hidden className="mr-2 text-[0.9375rem] font-semibold text-teal-bright">
                    {i + 1}
                  </span>
                  {stage}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row" className={`pr-3 align-middle ${exec.label} ${row.text}`}>
                {row.label}
              </th>
              {row.steps.map((step, i) => (
                <td key={step} className="relative p-0 pr-6 align-middle">
                  <span className={`flex min-h-[3.5rem] items-center rounded-md border border-l-[3px] border-hairline bg-white px-3 py-2 text-base font-semibold leading-snug text-heading ${row.edge}`}>{step}</span>
                  {i < row.steps.length - 1 && <ChevronRight aria-hidden className="absolute right-1 top-1/2 size-4 -translate-y-1/2 text-slate" />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <ol aria-label={label} className="space-y-3 md:hidden">
        {stages.map((stage, i) => (
          <li key={stage} className="rounded-lg border border-hairline-soft bg-quiet px-4 py-3">
            <p className="text-lg font-bold text-heading">
              <span aria-hidden className="mr-2 text-[0.9375rem] text-accent">
                {i + 1}
              </span>
              {stage}
            </p>
            <p className={`mt-1 ${exec.body} !text-heading`}>
              <span className="font-semibold text-accent-strong">{business.label}:</span> {business.steps[i]}
            </p>
            <p className={`${exec.body} !text-heading`}>
              <span className="font-semibold text-violet">{credibility.label}:</span> {credibility.steps[i]}
            </p>
          </li>
        ))}
      </ol>
    </>
  )
}
