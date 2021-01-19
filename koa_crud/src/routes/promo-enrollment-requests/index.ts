import Router from 'koa-router';

import {
  getPromoEnrollmentRequests,
  postEnrollToPromo,
} from '../../controllers/promo-enrollment-requests';

import { serialize } from '../../serialize';

const router = new Router();

router.get(
  '/api/promos/enrollment/requests',
  serialize(getPromoEnrollmentRequests),
);
router.post('/api/promos/enrollment/requests', serialize(postEnrollToPromo));

export default router;
