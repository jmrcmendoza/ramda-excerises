import { Context } from 'koa';
import { VendorDocument } from '../../models/vendor';

export default function updateVendorController({
  updateVendor,
}: {
  updateVendor: (
    id: string,
    document: VendorDocument,
  ) => Promise<VendorDocument>;
}) {
  return async function postInsertVendor(
    httpRequest: Context,
  ): Promise<Record<string, any>> {
    try {
      const { id } = httpRequest.params;

      const vendorInfo = httpRequest.body;

      const result = await updateVendor(id, vendorInfo);

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
