import { PromoEnrollmentRequestQueries } from '../../data-access/promo-enrollment-requests/promo-enrollment-requests';
import { PromoEnrollmentRequestDocument } from '../../models/promo-enrollment-requests';

export default function makeSelectPromoEnrollmentRequest(
  promoEnrollmentRequestsDB: PromoEnrollmentRequestQueries,
) {
  return async function selectPromo(
    id: string,
  ): Promise<PromoEnrollmentRequestDocument> {
    if (!id) {
      throw new Error('ID must be provided.');
    }

    return promoEnrollmentRequestsDB.selectOnePromoEnrollmentRequest(id);
  };
}
