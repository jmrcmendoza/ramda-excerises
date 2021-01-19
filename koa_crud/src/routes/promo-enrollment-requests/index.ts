import Router from 'koa-router';

import { getPromoEnrollmentRequests } from '../../controllers/promo-enrollment-requests';

import { serialize } from '../../serialize';

const router = new Router();

router.get(
  '/api/promos/enrollment/requests',
  serialize(getPromoEnrollmentRequests),
);

export default router;
