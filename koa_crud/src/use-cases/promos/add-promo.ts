import { PromoDocument } from '@Models/promo';
import { makePromo } from '@Entities/promos';
import { PromoQueries } from '@DataAccess/promos/promos';

export default function makeInsertPromo(promosDB: PromoQueries) {
  return async function insertPromo(promoInfo: PromoDocument): Promise<any> {
    await makePromo(promoInfo);

    return promosDB.createPromo(promoInfo);
  };
}
