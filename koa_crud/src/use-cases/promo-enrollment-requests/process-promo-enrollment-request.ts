import { PromoEnrollmentRequestQueries } from '@DataAccess/promo-enrollment-requests/promo-enrollment-requests';
import { PromoEnrollmentRequestValidationError } from '@Entities/promo-enrollment-requests/promo-enrollment-request';

export default function makeProcessPromoEnrollmentRequest(
  promoEnrollmentRequestsDB: PromoEnrollmentRequestQueries,
) {
  return async function processPromoEnrollmentRequest(
    id: string,
  ): Promise<boolean> {
    if (!id) {
      throw new PromoEnrollmentRequestValidationError('ID must be provided.');
    }

    return promoEnrollmentRequestsDB.processPromoEnrollmentRequest(id);
  };
}
