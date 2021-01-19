import { listPromoEnrollmentRequests } from '../../use-cases/promo-enrollment-requests';

import listPromoEnrollmentRequestsController from './list-promo-enrollment-requests';

export const getPromoEnrollmentRequests = listPromoEnrollmentRequestsController(
  { listPromoEnrollmentRequests },
);
