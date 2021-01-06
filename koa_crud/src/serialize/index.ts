export function serialize(controller: any) {
  return async (ctx: any) => {
    const httpRequest = {
      body: ctx.request.body,
      query: ctx.query,
      params: ctx.params,
      ip: ctx.ip,
      method: ctx.method,
      path: ctx.path,
      headers: {
        'Content-Type': ctx.get('Content-Type'),
        Referer: ctx.get('Referer'),
        'User-Agent': ctx.get('User-Agent'),
      },
    };
    try {
      const httpResponse = await controller(httpRequest);

      if (httpResponse.headers) {
        ctx.set(httpResponse.headers);
      }
      ctx.type = 'json';
      ctx.status = httpResponse.status;
      ctx.body = httpResponse.body;
    } catch (e) {
      ctx.status = 500;
      ctx.body = {
        error: 'An unkown error occurred.',
      };
    }
  };
}
