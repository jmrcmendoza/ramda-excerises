import Router from 'koa-router';

import { getVendors, postVendor, putVendor } from '../../controllers/vendors';

import { serialize } from '../../serialize';

const router = new Router();

router.get('/api/vendors', serialize(getVendors));
router.post('/api/vendors/create', serialize(postVendor));
router.put('/api/vendors/update/:_id', serialize(putVendor));

export default router;
