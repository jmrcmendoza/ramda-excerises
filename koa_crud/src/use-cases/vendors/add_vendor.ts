import { addVendor } from '../../entities/vendors';

export default function makeInsertVendor({ vendor }) {
  return async function insertVendor(vendorInfo): Promise<any> {
    await addVendor(vendorInfo);

    const createVendor = await vendor.create(vendorInfo);

    const data = {
      message: 'Successfull..',
      result: createVendor,
    };

    return data;
  };
}
