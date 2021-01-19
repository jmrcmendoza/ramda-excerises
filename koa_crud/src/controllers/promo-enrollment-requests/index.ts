import {
  listPromoEnrollmentRequests,
  enrollToPromo,
} from '../../use-cases/promo-enrollment-requests';

import listPromoEnrollmentRequestsController from './list-promo-enrollment-requests';
import enrollToPromoController from './enroll-to-promo';

export const getPromoEnrollmentRequests = listPromoEnrollmentRequestsController(
  { listPromoEnrollmentRequests },
);
export const postEnrollToPromo = enrollToPromoController({ enrollToPromo });
