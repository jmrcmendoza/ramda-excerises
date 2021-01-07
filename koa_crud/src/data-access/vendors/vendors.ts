import VendorModel, { VendorDocument } from '../../models/vendor';

export type VendorQueries = {
  listVendors: () => Promise<VendorDocument>;
  selectOneVendor: (id: string) => Promise<VendorDocument>;
  createVendor: (document: VendorDocument) => Promise<VendorDocument>;
  updateVendor: (
    id: string,
    document: VendorDocument,
  ) => Promise<VendorDocument>;
  deleteVendor: (id: string) => any;
};

export default function ({
  vendors,
}: {
  vendors: typeof VendorModel;
}): VendorQueries {
  return Object.freeze({
    listVendors() {
      return vendors.find({}).lean();
    },
    selectOneVendor(id: string) {
      return vendors.findById(id).lean();
    },
    createVendor(vendorInfo: VendorDocument) {
      return vendors.create(vendorInfo);
    },
    updateVendor(id: string, vendorInfo: VendorDocument) {
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
