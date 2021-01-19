import makeListPromoEnrollmentRequests from './list-promo-enrollment-requests';
import makeEnrollToPromo from './enroll-to-promo';

import promoEnrollmentRequestsDB from '../../data-access/promo-enrollment-requests';

export const listPromoEnrollmentRequests = makeListPromoEnrollmentRequests(
  promoEnrollmentRequestsDB,
);
export const enrollToPromo = makeEnrollToPromo(promoEnrollmentRequestsDB);
