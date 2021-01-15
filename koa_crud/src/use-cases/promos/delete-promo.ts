import { PromoQueries } from '../../data-access/promos/promos';

export default function makeDeletePromo(promosDB: PromoQueries) {
  return async function deletePromo(id: string): Promise<any> {
    if (!id) {
      throw new Error('ID must be provided.');
    }

    return promosDB.deletePromo(id);
  };
}
