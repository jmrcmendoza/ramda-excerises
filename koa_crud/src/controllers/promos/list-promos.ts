import { Context } from 'koa';
import { PromoDocument } from '../../models/promo';

export default function listPromosController({
  listPromos,
}: {
  listPromos: (
    limit: number | null,
    cursor: string | null,
  ) => Promise<PromoDocument>;
}) {
  return async function getListPromos(
    httpRequest: Context,
  ): Promise<Record<string, any>> {
    try {
      const {
        query: { limit, cursor },
      } = httpRequest;

      const result = await listPromos(limit, cursor);

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
