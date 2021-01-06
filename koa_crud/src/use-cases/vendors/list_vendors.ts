export default function makeListVendors({ vendor }) {
  return async function listVendors(): Promise<any> {
    const allVendors = await vendor.find({});

    const data = {
      message: 'Successfull..',
      vendors: allVendors,
    };

    return data;
  };
}
