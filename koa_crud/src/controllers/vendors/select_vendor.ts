import { Context } from 'koa';
import { VendorDocument } from '../../models/vendor';

export default function SelectVendorController({
  selectVendor,
}: {
  selectVendor: (arg0: string) => Promise<VendorDocument>;
}) {
  return async function getOneVendor(
    httpRequest: Context,
  ): Promise<Record<string, any>> {
    try {
      const id: string = httpRequest.params;

      const result = await selectVendor(id);

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
