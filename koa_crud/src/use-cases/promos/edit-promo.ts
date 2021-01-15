import { PromoDocument } from '../../models/promo';
import { makePromo } from '../../entities/promos';
import { PromoQueries } from '../../data-access/promos/promos';

export default function makeUpdatePromo(promosDB: PromoQueries) {
  return async function updatePromo(
    id: string,
    promoInfo: PromoDocument,
  ): Promise<boolean> {
    await makePromo(promoInfo);

    if (!id) {
      throw new Error('ID must be provided.');
    }

    return promosDB.updatePromo(id, promoInfo);
  };
}
