export default function makeSelectVendor(vendorsDB: Record<string, any>) {
  return async function selectVendor(id: string): Promise<any> {
    if (!id) {
      throw new Error('ID must be provided.');
    }

    const vendor = await vendorsDB.selectOneVendor(id);

    const data = {
      message: 'Successfull..',
      vendor,
    };

    return data;
  };
}
