import { VendorDocument } from '../../models/vendor';

export default function buildVendor() {
  return async function makeVendor(
    vendor: VendorDocument,
  ): Promise<void | Error> {
    const { name, type } = vendor;

    if (!name) {
      throw new Error('Vendor name must be provided.');
    }

    if (!type) {
      throw new Error('Vendor type must be provided.');
    }
  };
}
