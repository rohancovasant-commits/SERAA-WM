/**
 * The selected initial research list: named potential buying organisations. A research candidate is not a qualified
 * account. Category counts and the total shown on the page are derived from `marketCompanies`, never typed by hand.
 *
 * Source links are each organisation's own public website (or, for Nuvama, the investor presentation already cited
 * elsewhere), checked as reachable on 29 October 2026. Operating-model tags and relevance lines are deliberately
 * general: they describe the kind of business, not a Covasant relationship, budget or intent to buy.
 */

import type { Tone } from './opening'

export type CompanyCategoryId = 'non-bank' | 'bank' | 'portfolio' | 'distribution'

export type CompanyStatusKind = 'candidate' | 'delivery' | 'discovery'

export interface CompanyCategory {
  id: CompanyCategoryId
  /** Heading on the map and in the explorer filter. */
  title: string
  /** Short form used on filter chips. */
  chip: string
  /** Muted colour that links a category's row, its share of the list and its photograph. Groups only; no score. */
  tone: Tone
  /** Short name on the map tile. */
  shortTitle: string
  /** Two example names shown on the category row. Must match entries in `marketCompanies`. */
  tileExamples: string[]
  /** One short line shown under the selected category's photograph. */
  previewLine: string
  /** One short explanation shown on the map. */
  blurb: string
  /** Operating-model tag shown on each explorer row. */
  modelTag: string
  /** Key into `marketPhotos` (src/assets/market). */
  photo: 'wealthAdvisory' | 'bankWealth' | 'portfolioManagers' | 'distribution'
  /** Shown under the category name where the proposed pursuit order starts here. */
  focusTag?: string
  /** Qualification questions that apply to every organisation in the category. */
  qualification: string[]
}

export const companyCategories: CompanyCategory[] = [
  {
    id: 'non-bank',
    title: 'Non-bank wealth & advisory businesses',
    chip: 'Non-bank wealth',
    tone: 'teal',
    shortTitle: 'Wealth & advisory',
    previewLine: 'Shared RM, client-service and operating workflows.',
    tileExamples: ['360 ONE', 'Nuvama'],
    blurb: 'Dedicated wealth and advisory firms, and wealth divisions of financial groups.',
    modelTag: 'Non-bank wealth / advisory',
    photo: 'wealthAdvisory',
    focusTag: 'Proposed initial focus',
    qualification: [
      'Which RM, servicing or operations workflow carries a measurable problem?',
      'Does the wealth business or a central group function own technology and budget?',
      'Which authorised systems hold the information the workflow needs?',
    ],
  },
  {
    id: 'bank',
    title: 'Bank wealth businesses',
    chip: 'Bank wealth',
    tone: 'blue',
    shortTitle: 'Bank wealth',
    previewLine: 'Wealth teams within a broader banking organisation.',
    tileExamples: ['Kotak', 'HDFC'],
    blurb: 'Private-banking and wealth units inside banks, where the sponsoring unit matters.',
    modelTag: 'Bank wealth / private banking',
    photo: 'bankWealth',
    qualification: [
      'Which wealth or private-banking unit would sponsor and fund the work?',
      'How far does the unit depend on shared bank platforms and bank-wide vendor onboarding?',
      'What security, risk and compliance review applies before any system access?',
    ],
  },
  {
    id: 'portfolio',
    title: 'Additional portfolio-management firms',
    chip: 'Portfolio managers',
    tone: 'violet',
    shortTitle: 'Portfolio managers',
    previewLine: 'Investment, investor-service and operational workflows.',
    tileExamples: ['Abakkus', 'Marcellus'],
    blurb: 'Investment-management firms where client and distributor servicing may repeat.',
    modelTag: 'Portfolio management',
    photo: 'portfolioManagers',
    qualification: [
      'Is there a repeated RM, client-servicing or distributor-support workflow, not only fund management?',
      'Who owns the problem and the budget in the investment-management unit?',
      'Which existing tools or in-house work already cover it?',
    ],
  },
  {
    id: 'distribution',
    title: 'Distribution platforms',
    chip: 'Distribution',
    tone: 'amber',
    shortTitle: 'Distribution platforms',
    previewLine: 'Tools and support across distributor networks.',
    tileExamples: ['Prudent', 'NJ Wealth'],
    blurb: 'Platforms serving distributor partners, where buyer and users may sit in different places.',
    modelTag: 'Distribution platform',
    photo: 'distribution',
    qualification: [
      'Would the platform buy centrally for its partners, or would each partner buy separately?',
      'Which partner-facing workflow has a measurable problem?',
      'What tools does the platform already provide to partners?',
    ],
  },
]

export interface CompanyStatus {
  label: string
  /** Visual treatment: amber is unverified, blue a reported relationship. */
  tone: 'amber' | 'blue'
}

export const companyStatuses: Record<CompanyStatusKind, CompanyStatus> = {
  candidate: { label: 'Market candidate — commercial fit unverified', tone: 'amber' },
  delivery: { label: 'Reported existing delivery relationship — division and scope to verify', tone: 'blue' },
  discovery: { label: 'Discovery — commercial scope unverified', tone: 'blue' },
}

export interface MarketCompany {
  id: string
  /** Account label, unique across the list. */
  name: string
  category: CompanyCategoryId
  /** One concise explanation of why the organisation is on the research list. */
  relevance: string
  status: CompanyStatusKind
  /** Primary public source. */
  sourceUrl: string
  sourceLabel: string
  /** Company-specific points added to the category's qualification questions. */
  extraQualification?: string[]
}

const site = 'Company website'

export const marketCompanies: MarketCompany[] = [
  // Non-bank wealth / advisory — 16
  {
    id: '360-one',
    name: '360 ONE',
    category: 'non-bank',
    relevance: 'Dedicated wealth and asset-management business serving HNI and UHNI clients.',
    status: 'candidate',
    sourceUrl: 'https://www.360.one/',
    sourceLabel: site,
  },
  {
    id: 'nuvama',
    name: 'Nuvama',
    category: 'non-bank',
    relevance: 'Wealth business that discloses its RM count and describes technology and productivity initiatives.',
    status: 'candidate',
    sourceUrl: 'https://www.nuvama.com/wp-content/uploads/2026/07/Nuvama_Investor-Presentation_Q1-FY-26-27-1.pdf',
    sourceLabel: 'Q1 FY27 investor presentation',
    extraQualification: ['Whether the disclosed initiatives are built in-house, bought, or open to an external offering.'],
  },
  {
    id: 'anand-rathi-wealth',
    name: 'Anand Rathi Wealth',
    category: 'non-bank',
    relevance: 'Dedicated wealth firm that discloses its RM base and describes an existing RM Workstation.',
    status: 'candidate',
    sourceUrl: 'https://www.anandrathiwealth.in/',
    sourceLabel: site,
    extraQualification: ['What gap remains beside the RM Workstation it already describes.'],
  },
  {
    id: 'motilal-oswal-private-wealth',
    name: 'Motilal Oswal Private Wealth',
    category: 'non-bank',
    relevance: 'Wealth business within a broader financial-services group, with a reported Covasant delivery relationship.',
    status: 'delivery',
    sourceUrl: 'https://www.motilaloswalprivatewealth.com/',
    sourceLabel: site,
    extraQualification: [
      'Which division and workflow the existing delivery covers.',
      'Whether any of that work is reusable beyond its original scope.',
    ],
  },
  {
    id: 'centrum-wealth',
    name: 'Centrum Wealth',
    category: 'non-bank',
    relevance: 'Wealth business within a financial group, recorded at discovery stage.',
    status: 'discovery',
    sourceUrl: 'https://www.centrumwealth.in/',
    sourceLabel: site,
    extraQualification: ['Which needs surfaced in discovery and which bounded workflow they point to.'],
  },
  {
    id: 'avendus-wealth',
    name: 'Avendus Wealth',
    category: 'non-bank',
    relevance: 'Wealth business within a diversified financial-services group.',
    status: 'candidate',
    sourceUrl: 'https://www.avendus.com/business/wealth-management',
    sourceLabel: site,
  },
  {
    id: 'waterfield-advisors',
    name: 'Waterfield Advisors',
    category: 'non-bank',
    relevance: 'Independent wealth advisory firm; whether its workflows are family-oriented needs a separate check.',
    status: 'candidate',
    sourceUrl: 'https://waterfieldadvisors.com/',
    sourceLabel: site,
  },
  {
    id: 'client-associates',
    name: 'Client Associates',
    category: 'non-bank',
    relevance: 'Independent wealth and advisory firm.',
    status: 'candidate',
    sourceUrl: 'https://www.clientassociates.com/',
    sourceLabel: site,
  },
  {
    id: 'sanctum-wealth',
    name: 'Sanctum Wealth',
    category: 'non-bank',
    relevance: 'Independent wealth platform.',
    status: 'candidate',
    sourceUrl: 'https://www.sanctumwealth.com/',
    sourceLabel: site,
  },
  {
    id: 'neo-group',
    name: 'Neo Group',
    category: 'non-bank',
    relevance: 'Wealth and asset-management group.',
    status: 'candidate',
    sourceUrl: 'https://www.neo.group/',
    sourceLabel: site,
  },
  {
    id: 'dezerv',
    name: 'Dezerv',
    category: 'non-bank',
    relevance: 'Technology-led wealth platform; the tools it already runs need checking first.',
    status: 'candidate',
    sourceUrl: 'https://www.dezerv.in/',
    sourceLabel: site,
  },
  {
    id: 'equirus',
    name: 'Equirus',
    category: 'non-bank',
    relevance: 'Financial-services group with a wealth business alongside investment banking.',
    status: 'candidate',
    sourceUrl: 'https://www.equirus.com/',
    sourceLabel: site,
  },
  {
    id: 'ambit',
    name: 'Ambit',
    category: 'non-bank',
    relevance: 'Financial-services group whose wealth activity needs separating from its other businesses.',
    status: 'candidate',
    sourceUrl: 'https://www.ambit.co/',
    sourceLabel: site,
  },
  {
    id: 'jm-financial',
    name: 'JM Financial',
    category: 'non-bank',
    relevance: 'Diversified financial group with wealth and advisory activity; the relevant unit must be identified.',
    status: 'candidate',
    sourceUrl: 'https://www.jmfl.com/',
    sourceLabel: site,
  },
  {
    id: 'julius-baer-india',
    name: 'Julius Baer India',
    category: 'non-bank',
    relevance: 'India presence of a global private-banking group; the local mandate and buying route need confirming.',
    status: 'candidate',
    sourceUrl: 'https://www.juliusbaer.com/in/en/',
    sourceLabel: site,
    extraQualification: ['Whether technology purchases are decided in India or by the global group.'],
  },
  {
    id: 'lgt-wealth-india',
    name: 'LGT Wealth India',
    category: 'non-bank',
    relevance: 'Indian wealth business backed by a global private-banking group.',
    status: 'candidate',
    sourceUrl: 'https://www.lgtindia.in/en',
    sourceLabel: site,
    extraQualification: ['Whether technology purchases are decided in India or by the global group.'],
  },

  // Bank wealth businesses — 8
  {
    id: 'kotak-private',
    name: 'Kotak Mahindra Bank / Kotak Private',
    category: 'bank',
    relevance: 'Private-banking unit of a large Indian bank.',
    status: 'candidate',
    sourceUrl: 'https://www.kotak.bank.in/en/private-banking.html',
    sourceLabel: site,
  },
  {
    id: 'hdfc-bank-wealth',
    name: 'HDFC Bank Wealth / Private Banking',
    category: 'bank',
    relevance: 'Wealth and private-banking unit of a large Indian bank.',
    status: 'candidate',
    sourceUrl: 'https://v.hdfc.bank.in/wealth/index.html',
    sourceLabel: site,
  },
  {
    id: 'icici-private-banking',
    name: 'ICICI Bank Private Banking',
    category: 'bank',
    relevance: 'Private-banking unit of a large Indian bank.',
    status: 'candidate',
    sourceUrl: 'https://www.icici.bank.in/private-banking',
    sourceLabel: site,
  },
  {
    id: 'axis-burgundy-private',
    name: 'Axis Bank / Burgundy Private',
    category: 'bank',
    relevance: 'Private-banking proposition of a large Indian bank.',
    status: 'candidate',
    sourceUrl: 'https://www.axis.bank.in/burgundy-private',
    sourceLabel: site,
  },
  {
    id: 'sbi-wealth',
    name: 'SBI Wealth',
    category: 'bank',
    relevance: 'Relationship-manager-led wealth banking at a public-sector bank.',
    status: 'candidate',
    sourceUrl: 'https://sbi.bank.in/web/wealth-management/home',
    sourceLabel: site,
  },
  {
    id: 'hsbc-india-wealth',
    name: 'HSBC India wealth / Premier',
    category: 'bank',
    relevance: 'India wealth proposition of a global bank; local and global buying routes may differ.',
    status: 'candidate',
    sourceUrl: 'https://www.hsbc.bank.in/wealth/',
    sourceLabel: site,
  },
  {
    id: 'standard-chartered-india',
    name: 'Standard Chartered India',
    category: 'bank',
    relevance: 'India wealth activity of a global bank; the relevant unit must be identified.',
    status: 'candidate',
    sourceUrl: 'https://www.sc.bank.in/',
    sourceLabel: site,
  },
  {
    id: 'dbs-india-treasures',
    name: 'DBS India / Treasures',
    category: 'bank',
    relevance: 'India wealth proposition of a global bank; local and global buying routes may differ.',
    status: 'candidate',
    sourceUrl: 'https://www.dbs.bank.in/in/treasures/default.page',
    sourceLabel: site,
  },

  // Additional portfolio-management firms — 4
  {
    id: 'abakkus',
    name: 'Abakkus',
    category: 'portfolio',
    relevance: 'Asset manager running portfolio-management and fund products.',
    status: 'candidate',
    sourceUrl: 'https://www.abakkusinvest.com/en',
    sourceLabel: site,
  },
  {
    id: 'marcellus',
    name: 'Marcellus',
    category: 'portfolio',
    relevance: 'Portfolio-management firm.',
    status: 'candidate',
    sourceUrl: 'https://marcellus.in/',
    sourceLabel: site,
  },
  {
    id: 'unifi-capital',
    name: 'Unifi Capital',
    category: 'portfolio',
    relevance: 'Portfolio-management and asset-management firm.',
    status: 'candidate',
    sourceUrl: 'https://unificap.com/',
    sourceLabel: site,
  },
  {
    id: 'whiteoak-capital',
    name: 'WhiteOak Capital',
    category: 'portfolio',
    relevance: 'Asset manager with portfolio-management products.',
    status: 'candidate',
    sourceUrl: 'https://www.whiteoakindia.com/',
    sourceLabel: site,
  },

  // Distribution platforms — 2
  {
    id: 'prudent-corporate',
    name: 'Prudent Corporate',
    category: 'distribution',
    relevance: 'Distribution platform that describes edge+, an AI tool offered free to its partners in beta.',
    status: 'candidate',
    sourceUrl: 'https://www.prudentcorporate.com/',
    sourceLabel: site,
    extraQualification: ['What a free partner tool leaves unmet, and whether the platform would pay for more.'],
  },
  {
    id: 'nj-wealth',
    name: 'NJ Wealth / NJ Group',
    category: 'distribution',
    relevance: 'Distribution and wealth platform serving a partner network.',
    status: 'candidate',
    sourceUrl: 'https://www.njwealth.in/',
    sourceLabel: site,
  },
]

export const companyNote =
  'Company inclusion establishes a research candidate. Budget, unmet need, system access and buying intent require qualification.'

export const relationshipNote =
  'Relationship notes do not establish budget, procurement approval, production acceptance or willingness to buy a new offering.'

export function categoryOf(id: CompanyCategoryId): CompanyCategory {
  const found = companyCategories.find((category) => category.id === id)
  if (!found) throw new Error(`Unknown company category: ${id}`)
  return found
}

export function companiesIn(id: CompanyCategoryId): MarketCompany[] {
  return marketCompanies.filter((company) => company.category === id)
}

/** Qualification points for one organisation: its category's, then any specific to it. */
export function qualificationFor(company: MarketCompany): string[] {
  return [...(company.extraQualification ?? []), ...categoryOf(company.category).qualification]
}
