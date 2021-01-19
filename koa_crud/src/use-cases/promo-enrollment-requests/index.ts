import makeListPromoEnrollmentRequests from './list-promo-enrollment-requests';
import makeEnrollToPromo from './enroll-to-promo';
import makeApprovePromoEnrollmentRequest from './approve-promo-enrollment-request';

import promoEnrollmentRequestsDB from '../../data-access/promo-enrollment-requests';

export const listPromoEnrollmentRequests = makeListPromoEnrollmentRequests(
  promoEnrollmentRequestsDB,
);
export const enrollToPromo = makeEnrollToPromo(promoEnrollmentRequestsDB);
export const approvePromoEnrollmentRequest = makeApprovePromoEnrollmentRequest(
  promoEnrollmentRequestsDB,
);
