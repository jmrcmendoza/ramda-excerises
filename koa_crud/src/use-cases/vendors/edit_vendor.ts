import { VendorDocument } from '../../models/vendor';
import { makeVendor } from '../../entities/vendors';

export default function makeUpdateVendor(vendorsDB: Record<string, any>) {
  return async function updateVendor(
    _id: string,
    vendorInfo: VendorDocument,
  ): Promise<any> {
    await makeVendor(vendorInfo);

    if (!_id) {
      throw new Error('ID must be provided.');
    }

    const result = await vendorsDB.updateVendor(_id, vendorInfo);

    const data = {
      message: 'Successfull..',
      result,
    };

    return data;
  };
}
