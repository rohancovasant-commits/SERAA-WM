/**
 * The three initiatives behind the opening verdict, summarised on the Readiness overview.
 * These are initiative evidence summaries, not readiness ratings: nothing here is rated, scored or averaged.
 * The evidence basis is description only. No technical artefact, contract, production log or acceptance record
 * is claimed to have been inspected.
 */
export interface InitiativeEvidence {
  id: string
  name: string
  /** Precise label for the kind of evidence available. */
  basisLabel: 'Reported work' | 'POC description' | 'Discovery requirements'
  /** What is currently available, in one line. */
  basis: string
  /** Short list shown in the table. */
  unverified: string
  /** One sentence for the detail drawer: what the basis does and does not show. */
  limit: string
}

export const initiativeEvidence: InitiativeEvidence[] = [
  {
    id: 'motilal',
    name: 'Motilal Oswal',
    basisLabel: 'Reported work',
    basis: 'Reported existing agent delivery',
    unverified: 'Exact division and scope, production acceptance, measured outcomes, reuse economics and reference permission',
    limit:
      'Delivery is reported. The division, scope and acceptance of the work are not established, so it cannot yet be treated as an accepted customer outcome or a reusable capability.',
  },
  {
    id: 'pulse',
    name: 'Liquidity Pulse',
    basisLabel: 'POC description',
    basis: 'User-described RM intelligence POC',
    unverified: 'Evaluated quality, sustained adoption, willingness to pay and supported production operation',
    limit:
      'A POC is described by its users. Quality has not been evaluated, and nothing shows sustained use, a paying customer or an owned production service.',
  },
  {
    id: 'centrum',
    name: 'Centrum',
    basisLabel: 'Discovery requirements',
    basis: 'Discovery requirements',
    unverified: 'Agreed commercial scope, implementation, acceptance and measured outcomes',
    limit:
      'Discovery identified requirements. It does not establish an agreed scope, a delivered solution or a customer outcome.',
  },
]

export const initiativeSummary = {
  title: 'What the initiatives show today',
  note: 'Initiative summaries, not readiness ratings.',
  columns: { initiative: 'Initiative', basis: 'Evidence basis currently available', unverified: 'Not yet verified' },
  drawerLink: 'Three initiatives behind this',
  drawer: {
    title: 'Initiative evidence and limits',
    eyebrow: 'Initial evidence review',
    intro:
      'These summaries rest on descriptions of the work. They do not rely on, and should not be read as having inspected, technical artefacts, contracts, production logs or acceptance records.',
    rules: [
      'They are not readiness ratings. A reported delivery is not rated Demonstrated on that basis.',
      'Each requirement in the assessment is still rated on its own evidence, and unknown evidence stays “?”.',
      'Nothing is converted to zero, and no overall score or average is calculated.',
    ],
  },
}
