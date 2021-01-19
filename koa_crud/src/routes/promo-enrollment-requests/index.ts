import Router from 'koa-router';

import {
  getPromoEnrollmentRequests,
  postEnrollToPromo,
  putProcessPromoEnrollmentRequest,
  putApprovePromoEnrollmentRequest,
  putRejectPromoEnrollmentRequest,
} from '../../controllers/promo-enrollment-requests';

import { serialize } from '../../serialize';

const router = new Router();

router.get(
  '/api/promos/enrollment/requests',
  serialize(getPromoEnrollmentRequests),
);
router.post('/api/promos/enrollment/requests', serialize(postEnrollToPromo));
router.put(
  '/api/promos/enrollment/requests/process/:id',
  serialize(putProcessPromoEnrollmentRequest),
);
router.put(
  '/api/promos/enrollment/requests/approve/:id',
  serialize(putApprovePromoEnrollmentRequest),
);
router.put(
  '/api/promos/enrollment/requests/reject/:id',
  serialize(putRejectPromoEnrollmentRequest),
);

export default router;
