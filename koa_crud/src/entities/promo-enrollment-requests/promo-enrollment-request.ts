import { PromoEnrollmentRequestDocument } from '../../models/promo-enrollment-requests';

export default function () {
  return async function makeVendor(
    promoEnrollmentRequest: PromoEnrollmentRequestDocument,
  ): Promise<void | Error> {
    const { member, promo } = promoEnrollmentRequest;

    if (!promo) {
      throw new Error('Promo must be provided.');
    }

    if (!member) {
      throw new Error('Member must be provided.');
    }
  };
}
