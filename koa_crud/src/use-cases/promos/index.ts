import makeListPromos from './list-promos';
import makeInsertPromo from './add-promo';

import promosDB from '../../data-access/promos';

export const listPromos = makeListPromos(promosDB);
export const insertPromo = makeInsertPromo(promosDB);
