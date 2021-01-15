import { listPromos, insertPromo } from '../../use-cases/promos';

import listPromosController from './list-promos';
import insertPromoController from './add-promo';

export const getPromos = listPromosController({ listPromos });
export const postPromo = insertPromoController({ insertPromo });
