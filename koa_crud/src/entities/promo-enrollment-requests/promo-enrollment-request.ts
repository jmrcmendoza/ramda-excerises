import { PromoEnrollmentRequestDocument } from '../../models/promo-enrollment-requests';

export default function () {
  return async function makeVendor(
    promoEnrollmentRequest: PromoEnrollmentRequestDocument,
  ): Promise<void | Error> {
    const { memberId, promoId } = promoEnrollmentRequest;

    if (!memberId) {
      throw new Error('Member ID must be provided.');
    }

    if (!promoId) {
      throw new Error('Promo ID must be provided.');
    }
  };
}
