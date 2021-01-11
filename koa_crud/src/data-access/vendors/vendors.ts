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
    updateVendor(id: any, vendorInfo: VendorDocument) {
      return vendors.findOneAndUpdate(
        { ...id },
        { ...vendorInfo },
        { useFindAndModify: false },
      );
    },
    async deleteVendor(id: any) {
      const result = await vendors.deleteOne({ ...id });

      return result.deletedCount > 0;
    },
  });
}
