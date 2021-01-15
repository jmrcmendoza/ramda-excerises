import { PromoDocument } from '../../models/promo';

export default function listPromosController({
  listPromos,
}: {
  listPromos: () => Promise<PromoDocument>;
}) {
  return async function getListPromos(): Promise<Record<string, any>> {
    try {
      const result = await listPromos();

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
