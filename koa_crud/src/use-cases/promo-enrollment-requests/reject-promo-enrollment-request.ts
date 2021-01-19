import { PromoEnrollmentRequestQueries } from '../../data-access/promo-enrollment-requests/promo-enrollment-requests';

export default function makeRejectPromoEnrollmentRequest(
  promoEnrollmentRequestsDB: PromoEnrollmentRequestQueries,
) {
  return async function rejectPromoEnrollmentRequest(
    id: string,
  ): Promise<boolean> {
    if (!id) {
      throw new Error('ID must be provided.');
    }

    return promoEnrollmentRequestsDB.rejectPromoEnrollmentRequest(id);
  };
}
