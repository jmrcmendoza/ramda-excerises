import VendorModel from '../../models/vendor';

export default function vendorsQueries({
  vendors,
}: {
  vendors: typeof VendorModel;
}): any {
  async function listVendors() {
    const result = await vendors.find({});

    return result;
  }

  async function selectOneVendor(id: string) {
    const result = await vendors.findById(id);

    return result;
  }

  async function createVendor(vendorInfo: any) {
    const result = await vendors.create(vendorInfo);

    return result;
  }

  async function updateVendor(id: string, vendorInfo: any) {
    const result = await vendors.findOneAndUpdate(
      { _id: id },
      { ...vendorInfo },
      { useFindAndModify: false },
    );

    return result;
  }

  async function deleteVendor(id: string) {
    const result = await vendors.deleteOne({ _id: id });

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
