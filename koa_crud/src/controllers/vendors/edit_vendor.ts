export default function cUpdateVendor({ updateVendor }) {
  return async function postInsertVendor(httpRequest: any) {
    try {
      const _id: string = httpRequest.params;

      const vendorInfo = httpRequest.body;

      const result = await updateVendor(_id, vendorInfo);

      return {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
        body: result,
      };
    } catch (e) {
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        status: e.status ? e.status : 400,
        body: { errorMsg: e.message },
      };
    }
  };
}
