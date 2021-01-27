import { VendorQueries } from '@DataAccess/vendors/vendors';

export default function makeListVendors(vendorsDB: VendorQueries) {
  return async function listVendors(
    limit: number | null,
    cursor: string | null,
  ): Promise<any> {
    return vendorsDB.listVendors(limit, cursor);
  };
}
