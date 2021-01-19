import { PromoEnrollmentRequestDocument } from '../../models/promo-enrollment-requests';
import { makePromoEnrollmentRequest } from '../../entities/promo-enrollment-requests';
import { PromoEnrollmentRequestQueries } from '../../data-access/promo-enrollment-requests/promo-enrollment-requests';

export default function makeEnrollToPromo(
  promoEnrollmentRequestsDB: PromoEnrollmentRequestQueries,
) {
  return async function enrollToPromo(
    enrollmentInfo: PromoEnrollmentRequestDocument,
  ): Promise<boolean> {
    await makePromoEnrollmentRequest(enrollmentInfo);

    return promoEnrollmentRequestsDB.enrollToPromo(enrollmentInfo);
  };
}
