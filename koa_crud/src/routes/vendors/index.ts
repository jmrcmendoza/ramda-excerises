import Router from 'koa-router';

import { getVendors } from '../../controllers/vendors';

import { serialize } from '../../serialize';

const router = new Router();

router.get('/test', serialize(getVendors));

export default router;
