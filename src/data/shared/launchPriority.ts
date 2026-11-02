/**
 * Launch priority: deliberately left unresolved.
 *
 * The existing project already labels relationship and service support the lead candidate for package
 * qualification (data/offerings/families.ts), and Liquidity Pulse is the existing intelligence POC. This file keeps
 * both statements and does not change the ranking. It records that choosing the launch scope is a comparison still
 * to be made, and that the comparison belongs to leadership decision D1 (data/decisions/decisions.ts).
 */
export const launchPriority = {
  status: 'Unresolved',
  title: 'Launch priority',
  /** One sentence for any overview or chapter that mentions priority. */
  statement:
    'Launch priority is unresolved. It requires comparison against customer urgency, access, existing alternatives, delivery effort and commercial route.',
  /** The existing positions, unchanged. */
  currentPositions: [
    {
      family: 'relationships' as const,
      label: 'Relationship and service support',
      position: 'Lead candidate for package qualification.',
      basis: 'Centrum discovery gives a basis for a bounded customer trial; it is discovery, not a signed scope.',
    },
    {
      family: 'intelligence' as const,
      label: 'Market and investment intelligence',
      position: 'Existing POC: validate before expanding.',
      basis: 'Liquidity Pulse is a user-described POC; quality, adoption and willingness to pay are unverified.',
    },
  ],
  /** The comparison to run, in the order given in the brief. */
  comparisonCriteria: [
    { id: 'urgency', label: 'Customer urgency', question: 'Which problem does a named sponsor most need solved?' },
    { id: 'access', label: 'Access', question: 'Where can we reach the users, data and systems soonest?' },
    { id: 'alternatives', label: 'Existing alternatives', question: 'Where is the gap in native, specialist or internal options largest?' },
    { id: 'effort', label: 'Delivery effort', question: 'Where is effort to accepted delivery lowest and most repeatable?' },
    { id: 'route', label: 'Commercial route', question: 'Where is there a credible budget and procurement path?' },
  ],
  note: 'The other two families (operations and oversight) are not ranked here. Oversight is proposed as a bounded, customer-led pilot; operations awaits verification of reuse.',
  /** Where the choice is recorded. */
  decision: { id: 'd1', label: 'D1 Position and priorities', to: '/decisions' },
}
