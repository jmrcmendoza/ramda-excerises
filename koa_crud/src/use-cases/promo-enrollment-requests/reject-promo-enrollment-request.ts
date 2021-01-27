import { PromoEnrollmentRequestQueries } from '@DataAccess/promo-enrollment-requests/promo-enrollment-requests';
import { PromoEnrollmentRequestValidationError } from '@Entities/promo-enrollment-requests/promo-enrollment-request';

export default function makeRejectPromoEnrollmentRequest(
  promoEnrollmentRequestsDB: PromoEnrollmentRequestQueries,
) {
  return async function rejectPromoEnrollmentRequest(
    id: string,
  ): Promise<boolean> {
    if (!id) {
      throw new PromoEnrollmentRequestValidationError('ID must be provided.');
    }

    return promoEnrollmentRequestsDB.rejectPromoEnrollmentRequest(id);
  };
}
