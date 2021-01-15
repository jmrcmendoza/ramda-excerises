import { PromoQueries } from '../../data-access/promos/promos';

export default function makeSelectPromo(promosDB: PromoQueries) {
  return async function selectPromo(id: string): Promise<any> {
    if (!id) {
      throw new Error('ID must be provided.');
    }

    return promosDB.selectOnePromo(id);
  };
}
