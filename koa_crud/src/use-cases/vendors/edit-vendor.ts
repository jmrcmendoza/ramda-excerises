import { VendorDocument } from '../../models/vendor';
import { makeVendor } from '../../entities/vendors';
import { VendorQueries } from '../../data-access/vendors/vendors';

export default function makeUpdateVendor(vendorsDB: VendorQueries) {
  return async function updateVendor(
    id: string,
    vendorInfo: VendorDocument,
  ): Promise<any> {
    await makeVendor(vendorInfo);

    if (!id) {
      throw new Error('ID must be provided.');
    }

    return vendorsDB.updateVendor(id, vendorInfo);
  };
}
