import { VendorQueries } from '../../data-access/vendors/vendors';

export default function makeSelectVendor(vendorsDB: VendorQueries) {
  return async function selectVendor(id: string): Promise<any> {
    if (!id) {
      throw new Error('ID must be provided.');
    }

    return vendorsDB.selectOneVendor(id);
  };
}
