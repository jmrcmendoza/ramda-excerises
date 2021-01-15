import makeListPromos from './list-promos';
import makeSelectPromo from './select-promo';
import makeInsertPromo from './add-promo';
import makeUpdatePromo from './edit-promo';

import promosDB from '../../data-access/promos';

export const listPromos = makeListPromos(promosDB);
export const selectPromo = makeSelectPromo(promosDB);
export const insertPromo = makeInsertPromo(promosDB);
export const updatePromo = makeUpdatePromo(promosDB);
