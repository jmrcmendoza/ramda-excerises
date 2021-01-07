export default function makeDeleteVendor(vendorsDB: Record<string, any>) {
  return async function deleteVendor(id: string): Promise<any> {
    if (!id) {
      throw new Error('ID must be provided.');
    }

    const result = await vendorsDB.deleteVendor(id);

    const data = {
      message: 'Successfull..',
      result,
    };

    return data;
  };
}
