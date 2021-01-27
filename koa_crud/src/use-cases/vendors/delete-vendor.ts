import { VendorQueries } from '@DataAccess/vendors/vendors';
import { VendorValidationError } from '@Entities/vendors/vendor';

export default function makeDeleteVendor(vendorsDB: VendorQueries) {
  return async function deleteVendor(id: string): Promise<any> {
    if (!id) {
      throw new VendorValidationError('ID must be provided.');
    }

    return vendorsDB.deleteVendor(id);
  };
}
