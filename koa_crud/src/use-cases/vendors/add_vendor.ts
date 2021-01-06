import { makeVendor } from '../../entities/vendors';

export default function makeInsertVendor(vendorsDB) {
  return async function insertVendor(vendorInfo): Promise<any> {
    await makeVendor(vendorInfo);

    const createVendor = await vendorsDB.createVendor(vendorInfo);

    const data = {
      message: 'Successfull..',
      result: createVendor,
    };

    return data;
  };
}
