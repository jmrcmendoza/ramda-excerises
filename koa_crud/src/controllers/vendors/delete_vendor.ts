export default function cDeleteVendor({ deleteVendor }) {
  return async function makeDeleteVendor(httpRequest: any) {
    try {
      const _id: string = httpRequest.params;

      const result = await deleteVendor(_id);

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
