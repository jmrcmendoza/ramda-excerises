export default function vendorsQueries({ vendors }): any {
  async function listVendors() {
    const result = await vendors.find({});

    return result;
  }

  async function createVendor(vendorInfo: any) {
    const result = await vendors.create(vendorInfo);

    return result;
  }

  return Object.freeze({
    listVendors,
    createVendor,
  });
}
