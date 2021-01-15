import { PromoQueries } from '../../data-access/promos/promos';

export default function makeListPromos(promosDB: PromoQueries) {
  return async function listPromos(): Promise<any> {
    return promosDB.listPromos();
  };
}
