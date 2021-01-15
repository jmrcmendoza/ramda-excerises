import { PromoQueries } from '../../data-access/promos/promos';
import R from 'ramda';

export default function makeDeletePromo(promosDB: PromoQueries) {
  return async function deletePromo(id: string): Promise<any> {
    if (!id) {
      throw new Error('ID must be provided.');
    }

    const promo = await promosDB.selectOnePromo(id);

    if (R.prop('status')(promo) === 'ACTIVE') {
      throw new Error('Cannot delete active promo.');
    }

    return promosDB.deletePromo(id);
  };
}
