import { PromoEnrollmentRequestQueries } from '@DataAccess/promo-enrollment-requests/promo-enrollment-requests';

export default function makeListPromoEnrollmentRequests(
  promoEnrollmentRequestsDB: PromoEnrollmentRequestQueries,
) {
  return async function listPromoEnrollmentRequests(
    limit: number | null,
    cursor: string | null,
  ): Promise<any> {
    return promoEnrollmentRequestsDB.listPromoEnrollmentRequests(limit, cursor);
  };
}
