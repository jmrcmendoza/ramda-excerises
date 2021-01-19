import { PromoEnrollmentRequestDocument } from '../../models/promo-enrollment-requests';

export default function listPromoEnrollmentRequestsController({
  listPromoEnrollmentRequests,
}: {
  listPromoEnrollmentRequests: () => Promise<PromoEnrollmentRequestDocument>;
}) {
  return async function getListPromoEnrollmentRequests(): Promise<
    Record<string, any>
  > {
    try {
      const result = await listPromoEnrollmentRequests();

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
