import { PromoEnrollmentRequestQueries } from '../../data-access/promo-enrollment-requests/promo-enrollment-requests';

export default function makeProcessPromoEnrollmentRequest(
  promoEnrollmentRequestsDB: PromoEnrollmentRequestQueries,
) {
  return async function processPromoEnrollmentRequest(
    id: string,
  ): Promise<boolean> {
    if (!id) {
      throw new Error('ID must be provided.');
    }

    return promoEnrollmentRequestsDB.processPromoEnrollmentRequest(id);
  };
}
