import { VendorDocument } from '../../models/vendor';
import { makeVendor } from '../../entities/vendors';
import { VendorQueries } from '../../data-access/vendors/vendors';

export default function makeInsertVendor(vendorsDB: VendorQueries) {
  return async function insertVendor(vendorInfo: VendorDocument): Promise<any> {
    await makeVendor(vendorInfo);

    const createVendor = await vendorsDB.createVendor(vendorInfo);

    const data = {
      message: 'Successfull..',
      result: createVendor,
    };

    return data;
  };
}
