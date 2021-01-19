import { Context } from 'koa';
import { PromoEnrollmentRequestDocument } from '../../models/promo-enrollment-requests';

export default function enrollToPromoController({
  enrollToPromo,
}: {
  enrollToPromo: (document: PromoEnrollmentRequestDocument) => Promise<boolean>;
}) {
  return async function postEnrollToPromo(
    httpRequest: Context,
  ): Promise<Record<string, any>> {
    try {
      const { body: enrollmentInfo } = httpRequest;
      const result = await enrollToPromo(enrollmentInfo);

      return {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 201,
        body: result,
      };
    } catch (e) {
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        status: e.status ? e.status : 400,
        body: { errorMsg: e.message },
      };
    }
  };
}
