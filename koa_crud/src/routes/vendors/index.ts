import Router from 'koa-router';

import {
  getVendors,
  getOneVendor,
  postVendor,
  putVendor,
  delVendor,
} from '../../controllers/vendors';

import { serialize } from '../../serialize';

const router = new Router();

router.get('/api/vendors', serialize(getVendors));
router.get('/api/vendors/:_id', serialize(getOneVendor));
router.post('/api/vendors/', serialize(postVendor));
router.put('/api/vendors/:_id', serialize(putVendor));
router.delete('/api/vendors/:_id', serialize(delVendor));

export default router;
