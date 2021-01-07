export default function makeListVendors(vendorsDB: Record<string, any>) {
  return async function listVendors(): Promise<any> {
    const allVendors = await vendorsDB.listVendors();

    const data = {
      message: 'Successfull..',
      vendors: allVendors,
    };

    return data;
  };
}
