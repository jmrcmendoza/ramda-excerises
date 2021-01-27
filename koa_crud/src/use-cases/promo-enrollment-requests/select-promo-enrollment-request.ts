import { PromoEnrollmentRequestQueries } from '@DataAccess/promo-enrollment-requests/promo-enrollment-requests';
import { PromoEnrollmentRequestValidationError } from '@Entities/promo-enrollment-requests/promo-enrollment-request';
import { PromoEnrollmentRequestDocument } from '@Models/promo-enrollment-requests';

export default function makeSelectPromoEnrollmentRequest(
  promoEnrollmentRequestsDB: PromoEnrollmentRequestQueries,
) {
  return async function selectPromo(
    id: string,
  ): Promise<PromoEnrollmentRequestDocument> {
    if (!id) {
      throw new PromoEnrollmentRequestValidationError('ID must be provided.');
    }

    return promoEnrollmentRequestsDB.selectOnePromoEnrollmentRequest(id);
  };
}
