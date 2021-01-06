export default function makeListVendors(vendorsDB) {
  return async function listVendors(): Promise<any> {
    const allVendors = await vendorsDB.listVendors();

    const data = {
      message: 'Successfull..',
      vendors: allVendors,
    };

    return data;
  };
}
