import { Context } from 'koa';
import { PromoEnrollmentRequestDocument } from '@Models/promo-enrollment-requests';

export default function listPromoEnrollmentRequestsController({
  listPromoEnrollmentRequests,
}: {
  listPromoEnrollmentRequests: (
    limit: number | null,
    cursor: string | null,
  ) => Promise<PromoEnrollmentRequestDocument>;
}) {
  return async function getListPromoEnrollmentRequests(
    httpRequest: Context,
  ): Promise<Record<string, any>> {
    try {
      const {
        query: { limit, cursor },
      } = httpRequest;

      const result = await listPromoEnrollmentRequests(limit, cursor);

      return {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
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
