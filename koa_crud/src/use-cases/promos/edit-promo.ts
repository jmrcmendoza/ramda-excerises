import { PromoDocument } from '@Models/promo';
import { makePromo } from '@Entities/promos';
import { PromoQueries } from '@DataAccess/promos/promos';
import { PromoValidationError } from '@Entities/promos/promo';

export default function makeUpdatePromo(promosDB: PromoQueries) {
  return async function updatePromo(
    id: string,
    promoInfo: PromoDocument,
  ): Promise<boolean> {
    await makePromo(promoInfo);

    if (!id) {
      throw new PromoValidationError('ID must be provided.');
    }

    return promosDB.updatePromo(id, promoInfo);
  };
}
