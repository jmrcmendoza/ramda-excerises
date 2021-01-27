import { VendorDocument } from '@Models/vendor';
import { makeVendor } from '@Entities/vendors';
import { VendorQueries } from '@DataAccess/vendors/vendors';

export default function makeInsertVendor(vendorsDB: VendorQueries) {
  return async function insertVendor(vendorInfo: VendorDocument): Promise<any> {
    await makeVendor(vendorInfo);

    return vendorsDB.createVendor(vendorInfo);
  };
}
