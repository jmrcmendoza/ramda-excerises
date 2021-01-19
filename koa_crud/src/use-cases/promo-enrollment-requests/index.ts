import makeListPromoEnrollmentRequests from './list-promo-enrollment-requests';
import makeSelectPromoEnrollmentRequest from './select-promo-enrollment-request';
import makeEnrollToPromo from './enroll-to-promo';
import makeProcessPromoEnrollmentRequest from './process-promo-enrollment-request';
import makeApprovePromoEnrollmentRequest from './approve-promo-enrollment-request';
import makeRejectPromoEnrollmentRequest from './reject-promo-enrollment-request';

import promoEnrollmentRequestsDB from '../../data-access/promo-enrollment-requests';

export const listPromoEnrollmentRequests = makeListPromoEnrollmentRequests(
  promoEnrollmentRequestsDB,
);
export const selectOnePromoEnrollmentRequest = makeSelectPromoEnrollmentRequest(
  promoEnrollmentRequestsDB,
);
export const enrollToPromo = makeEnrollToPromo(promoEnrollmentRequestsDB);
export const processPromoEnrollmentRequest = makeProcessPromoEnrollmentRequest(
  promoEnrollmentRequestsDB,
);
export const approvePromoEnrollmentRequest = makeApprovePromoEnrollmentRequest(
  promoEnrollmentRequestsDB,
);
export const rejectPromoEnrollmentRequest = makeRejectPromoEnrollmentRequest(
  promoEnrollmentRequestsDB,
);
