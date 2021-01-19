import makeListPromoEnrollmentRequests from './list-promo-enrollment-requests';

import promoEnrollmentRequestsDB from '../../data-access/promo-enrollment-requests';

export const listPromoEnrollmentRequests = makeListPromoEnrollmentRequests(
  promoEnrollmentRequestsDB,
);
