export default function buildAddVendor() {
  return async function makeAddVendor(vendorInfo: { name: any; type: any }) {
    const { name, type } = vendorInfo;

    if (!name) {
      throw new Error('Vendor name must be provided.');
    }

    if (!type) {
      throw new Error('Vendor type must be provided.');
    }
  };
}
