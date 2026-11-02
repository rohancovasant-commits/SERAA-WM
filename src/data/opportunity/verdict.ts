/**
 * The cross-page verdict, shown first on the Opportunity overview (the landing page). It runs in one order:
 * what exists, what is still unverified, what we recommend, what commitment is needed next.
 * Wording is deliberately about the evidence reviewed, not a completed assessment. No figures, owners, dates or costs.
 */
export const verdict = {
  headline: 'Relevant starting points exist. Enterprise wealth readiness remains unverified.',
  statement: 'The evidence reviewed does not yet establish repeatable enterprise delivery in Indian wealth management.',

  existsLabel: 'What exists',
  startingPoints: [
    {
      name: 'Motilal Oswal',
      basis: 'Reported delivery',
      text: 'Existing agent work; exact scope, acceptance and outcomes need verification.',
    },
    {
      name: 'Liquidity Pulse',
      basis: 'POC',
      text: 'RM-focused market intelligence; production operation and paid adoption remain unverified.',
    },
    {
      name: 'Centrum',
      basis: 'Discovery',
      text: 'Relevant requirements identified; implementation and commercial scope remain unverified.',
    },
  ],

  neededLabel: 'Evidence still needed',
  /** Context for the three needs, shown in the drawer. */
  need: 'The next investment needs evidence of accepted customer outcomes, reusable and supported capabilities, and commercially viable delivery.',
  needed: ['Accepted customer outcomes', 'Reusable, supported capabilities', 'Viable commercial and delivery economics'],

  recommendation: {
    tag: 'Recommendation',
    title: 'Qualify a bounded wealth offering',
    text: 'Qualify it through existing account access, compare it with the customer’s current alternatives, and establish its delivery and operating economics.',
  },
  decision: {
    tag: 'Leadership decision needed',
    title: 'Endorse a bounded validation stage',
    text: 'Assign an accountable owner, and agree its scope, cost ceiling and review outputs once estimated.',
  },

  links: {
    evidence: { label: 'Review evidence', destination: 'Readiness', to: '/readiness' },
    commitment: { label: 'Review next commitment', destination: 'Leadership decisions', to: '/decisions' },
  },

  /** The overview shows titles only; the full wording opens in a drawer. */
  drawerLink: 'Full verdict',
  drawerTitle: 'Verdict in full',

  /** Two-word versions of the three needs, for the overview. The full wording is in `needed` and the drawer. */
  neededShort: ['Customer outcomes', 'Reusable capability', 'Delivery economics'],

  /** Short labels for the demand figures on the overview. The first three are global; the count is our own list. */
  demand: {
    title: 'Demand signals',
    scope: 'Global research',
    operational: 'advisor time on operations',
    automation: 'want AI automation',
    unifiedView: 'lack a unified client view',
    universe: 'organisations mapped, not qualified',
  },

  /** The Opportunity page finding, as the heading over the market evidence. */
  marketLabel: 'Market evidence',
  marketTitle: 'Existing access supports a focused entry; commercial scale still needs validation.',
}
