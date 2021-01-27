import { VendorQueries } from '@DataAccess/vendors/vendors';
import { VendorValidationError } from '@Entities/vendors/vendor';

export default function makeSelectVendor(vendorsDB: VendorQueries) {
  return async function selectVendor(id: string): Promise<any> {
    if (!id) {
      throw new VendorValidationError('ID must be provided.');
    }

    return vendorsDB.selectOneVendor(id);
  };
}
