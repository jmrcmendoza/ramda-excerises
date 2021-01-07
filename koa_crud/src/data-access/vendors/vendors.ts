import VendorModel from '../../models/vendor';

export default function vendorsQueries({
  vendors,
}: {
  vendors: typeof VendorModel;
}): any {
  async function listVendors() {
    return vendors.find({}).lean();
  }

  async function selectOneVendor(id: string) {
    return vendors.findById(id).lean();
  }

  async function createVendor(vendorInfo: any) {
    return vendors.create(vendorInfo);
  }

  async function updateVendor(id: string, vendorInfo: any) {
    return vendors.findOneAndUpdate(
      { _id: id },
      { ...vendorInfo },
      { useFindAndModify: false },
    );
  }

  async function deleteVendor(id: string) {
    return vendors.deleteOne({ _id: id });
  }

  return Object.freeze({
    listVendors,
    selectOneVendor,
    createVendor,
    updateVendor,
    deleteVendor,
  });
}
