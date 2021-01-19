import {
  listPromoEnrollmentRequests,
  enrollToPromo,
  processPromoEnrollmentRequest,
  approvePromoEnrollmentRequest,
} from '../../use-cases/promo-enrollment-requests';

import listPromoEnrollmentRequestsController from './list-promo-enrollment-requests';
import enrollToPromoController from './enroll-to-promo';
import processPromoEnrollmentRequestController from './process-promo-enrollment-request';
import approvePromoEnrollmentRequestController from './approve-promo-enrollment-request';

export const getPromoEnrollmentRequests = listPromoEnrollmentRequestsController(
  { listPromoEnrollmentRequests },
);
export const postEnrollToPromo = enrollToPromoController({ enrollToPromo });
export const putProcessPromoEnrollmentRequest = processPromoEnrollmentRequestController(
  { processPromoEnrollmentRequest },
);
export const putApprovePromoEnrollmentRequest = approvePromoEnrollmentRequestController(
  { approvePromoEnrollmentRequest },
);
