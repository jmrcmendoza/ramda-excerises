enum VendorType {
  Seamless = 'SEAMLESS',
  Transfer = 'TRANSFER',
}

type Vendor = {
  _id: string;
  name: string;
  type: VendorType;
  createdAt: Date;
  updatedAt: Date;
};

export default function buildVendor() {
  return async function makeVendor(vendorInfo: Vendor): Promise<any> {
    const { name, type } = vendorInfo;

    if (!name) {
      throw new Error('Vendor name must be provided.');
    }

    if (!type) {
      throw new Error('Vendor type must be provided.');
    }
  };
}
