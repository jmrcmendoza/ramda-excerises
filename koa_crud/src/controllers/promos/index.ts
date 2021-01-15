import { listPromos, selectPromo, insertPromo } from '../../use-cases/promos';

import listPromosController from './list-promos';
import selectPromoController from './select-promo';
import insertPromoController from './add-promo';

export const getPromos = listPromosController({ listPromos });
export const getOnePromo = selectPromoController({ selectPromo });
export const postPromo = insertPromoController({ insertPromo });
