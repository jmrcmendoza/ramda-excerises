export default function cinsertVendor({ insertVendor }) {
  return async function postInsertVendor(httpRequest: any) {
    try {
      const vendorInfo = httpRequest.body;
      const result = await insertVendor(vendorInfo);

      return {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 201,
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
