import R from 'ramda';

type Connection<T> = {
  totalCount: number;
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
  };
  edges: {
    node: T;
    cursor: Buffer;
  }[];
};

export const toCursorHash = (string) => Buffer.from(string).toString('base64');

export const fromCursorHash = (string) =>
  Buffer.from(string, 'base64').toString('ascii');

export const paginate = (
  limit: string,
  data,
): Connection<Record<string, any>> => {
  const hasNextPage = R.length(data) > limit;
  const nodes = hasNextPage ? R.slice(0, -1, data) : data;

  const edges = await R.map((node: any) => {
    return { node, cursor: toCursorHash(node.createdAt) };
  })(nodes);

  const endCursor: any = R.compose(R.prop('cursor'), R.last)(edges);

  return {
    totalCount: R.length(nodes),
    pageInfo: { hasNextPage, endCursor },
    edges,
  };
};
