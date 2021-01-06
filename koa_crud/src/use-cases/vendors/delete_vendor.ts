export default function makeDeleteVendor(vendorsDB) {
  return async function deleteVendor(_id: string, vendorInfo): Promise<any> {
    if (!_id) {
      throw new Error('ID must be provided.');
    }

    const result = await vendorsDB.deleteVendor(_id);

    const data = {
      message: 'Successfull..',
      result,
    };

    return data;
  };
}
