export default function makeSelectVendor(vendorsDB: Record<string, any>) {
  return async function selectVendor(id: string): Promise<any> {
    const vendor = await vendorsDB.selectOneVendor(id);

    const data = {
      message: 'Successfull..',
      vendor,
    };

    return data;
  };
}
