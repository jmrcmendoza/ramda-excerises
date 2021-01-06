export default function cSelectVendor({ selectVendor }) {
  return async function getOneVendor(httpRequest: any) {
    try {
      const _id: string = httpRequest.params;

      const result = await selectVendor(_id);

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
