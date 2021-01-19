import { PromoEnrollmentRequestQueries } from '../../data-access/promo-enrollment-requests/promo-enrollment-requests';

export default function makeApprovePromoEnrollmentRequest(
  promoEnrollmentRequestsDB: PromoEnrollmentRequestQueries,
) {
  return async function approvePromoEnrollmentRequest(
    id: string,
  ): Promise<boolean> {
    if (!id) {
      throw new Error('ID must be provided.');
    }

    return promoEnrollmentRequestsDB.approvePromoEnrollmentRequest(id);
  };
}
