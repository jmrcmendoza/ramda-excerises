import R from 'ramda';

class PaginateValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PAGINATE_VALIDATION_ERROR';
  }
}

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
  limit: number | null,
  data,
): Connection<Record<string, any>> => {
  const hasNextPage = limit ? R.length(data) > limit : false;
  const nodes = hasNextPage ? R.slice(0, -1, data) : data;

  if (R.find((node) => !R.includes('createdAt', R.keys(node)))(nodes)) {
    throw new PaginateValidationError('Created At field is missing.');
  }

  const edges: any = R.map((node: any) => {
    return { node, cursor: toCursorHash(node.createdAt) };
  })(nodes);

  const endCursor: any = R.compose(R.prop('cursor'), R.last)(edges);

  return {
    totalCount: R.length(nodes),
    pageInfo: { hasNextPage, endCursor },
    edges,
  };
};
