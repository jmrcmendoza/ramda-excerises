import { VendorQueries } from '../../data-access/vendors/vendors';

export default function makeListVendors(vendorsDB: VendorQueries) {
  return async function listVendors(): Promise<any> {
    return vendorsDB.listVendors();
  };
}
