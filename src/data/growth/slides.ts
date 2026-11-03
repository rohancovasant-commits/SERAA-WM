/** Copy for the three Growth slides. Longer research, commercial assumptions and ownership notes stay in the other growth data files. */

export const slideOne = {
  eyebrow: '05 / Growth',
  headline: 'Choose one account and workflow to pursue first.',
  label: 'Proposed pursuits—not qualified pipeline.',
  cards: [
    { id: 'motilal', name: 'Motilal Oswal', text: 'Verify delivered work and explore adjacent customer needs.' },
    { id: 'centrum', name: 'Centrum', text: 'Test whether discovery can become a scoped commercial proposal.' },
    { id: 'liquidity-pulse', name: 'Liquidity Pulse', text: 'Test buyer demand for the RM intelligence offer.' },
  ],
  lensLabel: 'Selection lens',
  lens: ['Customer priority', 'Buyer access', 'Delivery feasibility', 'Commercial potential'],
  output: 'Recommend one account, buyer, workflow and commercial next step.',
  button: 'View pursuit details',
}

export const slideTwo = {
  headline: 'Make one successful solution the starting point for more sales.',
  start: 'Deliver a solution that solves an agreed customer problem.',
  routes: [
    {
      id: 'same',
      title: 'Sell more to the same firm',
      text: 'Take the solution to another team—or solve another related problem.',
      example: 'Illustrative: A service-team knowledge assistant expands to support RMs.',
    },
    {
      id: 'other',
      title: 'Sell to another wealth firm',
      text: 'Offer the solution to a firm with a similar problem, adapting it to their systems.',
      example: 'Illustrative: The assistant built for Firm A becomes the starting point for Firm B.',
    },
  ],
  takeaway: 'Reuse what works. Price the solution, customer-specific setup and agreed support.',
  checks: ['Does the customer need it?', 'What must change?', 'Will the revenue cover delivery and support?'],
  qualification: 'Proposed growth approach; successful reuse and expansion still need to be demonstrated.',
  button: 'Pricing and expansion details',
  /** Moved from the slide into the supporting panel. */
  credibility: 'Build credibility through domain review, customer-approved results and reference permission.',
}

export const slideThree = {
  headline: 'Assign one lead to turn the first wealth opportunity into a customer delivery.',
  lede: 'Bring Sales, Product and Delivery together around one customer and one agreed solution.',
  owner: { label: 'Wealth business lead', text: 'Coordinate the teams and stay accountable for moving the opportunity through to delivery.' },
  roles: [
    { id: 'sales', label: 'Sales', text: 'Confirm the customer’s need, buyer and buying process.' },
    { id: 'product', label: 'Product / platform', text: 'Define the solution and what SERAA can reuse, adapt or build.' },
    { id: 'delivery', label: 'Delivery', text: 'Estimate the work, implement the solution and agree customer acceptance and support.' },
  ],
  note: 'Proposed coordination across existing teams; named responsibilities to agree.',
  action: { tag: 'Leadership action', text: 'Nominate the lead and request a first-customer delivery plan.' },
  outputsLabel: 'The plan should answer',
  outputs: ['Which customer and problem?', 'What will we deliver?', 'What people and cost are required?'],
  button: 'View responsibilities',
}

export const growthPanels = {
  pursuit: { title: 'Pursuit details', eyebrow: 'Growth · Win the first offer' },
  expansion: { title: 'Pricing and expansion details', eyebrow: 'Growth · Expand what works' },
  ownership: { title: 'Responsibilities and scaling details', eyebrow: 'Growth · Organise to grow' },
  decisionsNote: 'Formal investment approvals remain on the Decisions page. Nothing here is an approved budget, owner or commitment.',
}
