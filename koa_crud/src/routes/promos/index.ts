import Router from 'koa-router';

import { getPromos, postPromo } from '../../controllers/promos';

import { serialize } from '../../serialize';

const router = new Router();

router.get('/api/promos', serialize(getPromos));
router.post('/api/promos/', serialize(postPromo));

export default router;
