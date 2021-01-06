import Router from 'koa-router';

import { getVendors, postVendor } from '../../controllers/vendors';

import { serialize } from '../../serialize';

const router = new Router();

router.get('/api/vendors', serialize(getVendors));
router.post('/api/vendors/create', serialize(postVendor));

export default router;
