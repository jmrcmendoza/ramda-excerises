export default function vendorsQueries({ vendors }): any {
  async function listVendors() {
    const result = await vendors.find({});

    return result;
  }

  async function selectOneVendor(_id: string) {
    const result = await vendors.findById(_id);

    return result;
  }

  async function createVendor(vendorInfo: any) {
    const result = await vendors.create(vendorInfo);

    return result;
  }

  async function updateVendor(_id: string, vendorInfo: any) {
    const result = await vendors.findOneAndUpdate(
      { _id },
      { ...vendorInfo },
      { useFindAndModify: false },
    );

    return result;
  }

  async function deleteVendor(_id: string) {
    const result = await vendors.deleteOne({ _id });

    return result;
  }

  return Object.freeze({
    listVendors,
    selectOneVendor,
    createVendor,
    updateVendor,
    deleteVendor,
  });
}
