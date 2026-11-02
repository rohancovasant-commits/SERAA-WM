import specialist from './specialist.webp'
import divisions from './divisions.webp'
import banks from './banks.webp'
import familyOffices from './family-offices.webp'

/** Building illustrations for the four buying environments. */
export const buyerImages: Record<'specialist' | 'divisions' | 'banks' | 'family-offices', string> = {
  specialist,
  divisions,
  banks,
  'family-offices': familyOffices,
}
