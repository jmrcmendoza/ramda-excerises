import { PromoEnrollmentRequestQueries } from '../../data-access/promo-enrollment-requests/promo-enrollment-requests';

export default function makeListPromoEnrollmentRequests(
  promoEnrollmentRequestsDB: PromoEnrollmentRequestQueries,
) {
  return async function listPromoEnrollmentRequests(): Promise<any> {
    return promoEnrollmentRequestsDB.listPromoEnrollmentRequests();
  };
}
