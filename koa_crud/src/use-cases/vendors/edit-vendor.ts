import { VendorDocument } from '@Models/vendor';
import { makeVendor } from '@Entities/vendors';
import { VendorQueries } from '@DataAccess/vendors/vendors';
import { VendorValidationError } from '@Entities/vendors/vendor';

export default function makeUpdateVendor(vendorsDB: VendorQueries) {
  return async function updateVendor(
    id: string,
    vendorInfo: VendorDocument,
  ): Promise<boolean> {
    await makeVendor(vendorInfo);

    if (!id) {
      throw new VendorValidationError('ID must be provided.');
    }

    return vendorsDB.updateVendor(id, vendorInfo);
  };
}
