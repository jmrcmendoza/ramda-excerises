import VendorModel, { VendorDocument } from '../../models/vendor';

export type VendorQueries = {
  listVendors: () => Promise<VendorDocument>;
  selectOneVendor: (id: string) => Promise<VendorDocument>;
  createVendor: (document: VendorDocument) => Promise<boolean>;
  updateVendor: (id: string, document: VendorDocument) => Promise<boolean>;
  deleteVendor: (id: string) => Promise<boolean>;
};

export default function ({
  vendors,
}: {
  vendors: typeof VendorModel;
}): VendorQueries {
  return Object.freeze({
    listVendors() {
      return vendors.find({}).lean({ virtuals: true });
    },
    selectOneVendor(id: string) {
      return vendors.findById(id).lean({ virtuals: true });
    },
    async createVendor(vendorInfo: VendorDocument) {
      const result = await vendors.create(vendorInfo);

      return !!result;
    },
    async updateVendor(id: string, vendorInfo: VendorDocument) {
      const result = await vendors.findByIdAndUpdate(id, vendorInfo, {
        useFindAndModify: false,
      });

      return !!result;
    },
    async deleteVendor(id: string) {
      const result = await vendors.findByIdAndDelete(id);

      return !!result;
    },
  });
}
