import { VendorDocument } from '../../models/vendor';
import { makeVendor } from '../../entities/vendors';

export default function makeInsertVendor(vendorsDB: Record<string, any>) {
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
