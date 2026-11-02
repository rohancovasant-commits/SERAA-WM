import { marketPhotos } from '../../assets/market'
import type { FamilyId } from '../../data/offerings/families'

/**
 * Scene-setting photographs for the four offering families, from the supplied market set. They show the working setting
 * only (reports, a meeting, a workspace, an institution) and imply no organisation or product.
 */
export const familyPhoto: Record<FamilyId, string> = {
  intelligence: marketPhotos.portfolioManagers,
  relationships: marketPhotos.wealthAdvisory,
  operations: marketPhotos.distribution,
  oversight: marketPhotos.bankWealth,
}
