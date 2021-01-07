import VendorModel from '../../models/vendor';

export default function vendorsQueries({
  vendors,
}: {
  vendors: typeof VendorModel;
}): any {
  return Object.freeze({
    listVendors() {
      return vendors.find({}).lean();
    },
    selectOneVendor(id: string) {
      return vendors.findById(id).lean();
    },
    createVendor(vendorInfo: any) {
      return vendors.create(vendorInfo);
    },
    updateVendor(id: string, vendorInfo: any) {
      return vendors.findOneAndUpdate(
        { _id: id },
        { ...vendorInfo },
        { useFindAndModify: false },
      );
    },
    deleteVendor(id: string) {
      return vendors.deleteOne({ _id: id });
    },
  });
}
