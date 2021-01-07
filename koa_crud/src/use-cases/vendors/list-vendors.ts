import { VendorQueries } from '../../data-access/vendors/vendors';

export default function makeListVendors(vendorsDB: VendorQueries) {
  return async function listVendors(): Promise<any> {
    const allVendors = await vendorsDB.listVendors();

    const data = {
      message: 'Successfull..',
      vendors: allVendors,
    };

    return data;
  };
}
