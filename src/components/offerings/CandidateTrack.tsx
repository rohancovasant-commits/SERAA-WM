import type { PackageStatus } from '../../data/offerings/families'

/** Status chip colours for a candidate solution. A status groups candidates; it never ranks them. */
export const statusStyle: Record<PackageStatus, string> = {
  'POC starting point': 'bg-ev-poc-bg text-ev-poc-fg ring-1 ring-ev-poc-fg/25',
  'Proposed candidate': 'bg-ev-proposed-bg text-ev-proposed-fg ring-1 ring-ev-proposed-fg/25',
  'Later extension': 'bg-wash text-slate ring-1 ring-line-strong',
  'To verify': 'bg-ev-validate-bg text-ev-validate-fg ring-1 ring-ev-validate-fg/25',
}

