import { exec } from '../exec/styles'
import { initiativeEvidence, initiativeSummary } from '../../data/readiness/initiatives'

const chip = 'inline-block rounded-full border border-hairline bg-quiet px-2.5 py-0.5 text-[0.8125rem] font-semibold text-slate'

/**
 * Three initiatives: what evidence exists and what is not yet verified. A table from md up, stacked rows below.
 * It states the kind of evidence and never a rating.
 */
export function InitiativeTable({ stacked = false }: { stacked?: boolean }) {
  const { columns } = initiativeSummary
  return (
    <>
      <div className={`mt-4 hidden overflow-hidden rounded-lg border border-hairline-soft ${stacked ? '' : 'md:block'}`}>
        <table className="w-full table-fixed border-collapse text-left">
          <caption className="sr-only">Evidence currently available and not yet verified, for each initiative</caption>
          <thead>
            <tr className="bg-quiet">
              <th scope="col" className={`w-[18%] px-4 py-2.5 ${exec.label}`}>{columns.initiative}</th>
              <th scope="col" className={`w-[34%] px-4 py-2.5 ${exec.label}`}>{columns.basis}</th>
              <th scope="col" className={`px-4 py-2.5 ${exec.label}`}>{columns.unverified}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline-soft">
            {initiativeEvidence.map((item) => (
              <tr key={item.id} className="align-top">
                <th scope="row" className={`px-4 py-3.5 text-left ${exec.strong}`}>{item.name}</th>
                <td className="px-4 py-3.5">
                  <span className={chip}>{item.basisLabel}</span>
                  {item.basis !== item.basisLabel && <p className={`mt-1.5 ${exec.body}`}>{item.basis}</p>}
                </td>
                <td className={`px-4 py-3.5 ${exec.body}`}>{item.unverified}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className={`mt-4 divide-y divide-hairline-soft ${stacked ? '' : 'md:hidden'}`}>
        {initiativeEvidence.map((item) => (
          <li key={item.id} className="py-3.5 first:pt-0 last:pb-0">
            <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span className={exec.strong}>{item.name}</span>
              <span className={chip}>{item.basisLabel}</span>
            </p>
            {item.basis !== item.basisLabel && <p className={`mt-1.5 ${exec.body}`}>{item.basis}</p>}
            <p className="mt-2.5">
              <span className={`block ${exec.label}`}>{columns.unverified}</span>
              <span className={`block ${exec.body}`}>{item.unverified}</span>
            </p>
          </li>
        ))}
      </ul>
    </>
  )
}
