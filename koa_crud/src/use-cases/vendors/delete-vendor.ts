import { VendorQueries } from '../../data-access/vendors/vendors';

export default function makeDeleteVendor(vendorsDB: VendorQueries) {
  return async function deleteVendor(id: string): Promise<any> {
    if (!id) {
      throw new Error('ID must be provided.');
    }

    const result = await vendorsDB.deleteVendor(id);

    return {
      message: 'Successful',
      result,
    };
  };
}
