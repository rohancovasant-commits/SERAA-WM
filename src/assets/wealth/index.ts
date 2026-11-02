import wealthFirm from '../buyers/specialist.webp'
import financialGroup from '../buyers/divisions.webp'
import privateBank from '../buyers/banks.webp'
import familyOffice from '../buyers/family-offices.webp'

/**
 * The supplied building illustrations, under the names they were supplied with (wealth-firm, financial-group,
 * private-bank, family-office). They are the same files the Opportunity page uses, background-removed WebP that
 * already carry their aqua motif, so no second circle is added anywhere.
 */
export const wealthImages = { wealthFirm, financialGroup, privateBank, familyOffice }

export const wealthImageAlt = {
  wealthFirm: 'A modern glass wealth-firm office building.',
  financialGroup: 'A cluster of financial-group towers.',
  privateBank: 'A columned private-bank building.',
  familyOffice: 'A low, modern family-office building among trees.',
} as const
