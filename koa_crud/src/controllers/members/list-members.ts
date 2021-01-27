import { Context } from 'koa';
import { MemberDocument } from '@Models/member';

export default function listMembersController({
  listMembers,
}: {
  listMembers: (
    limit: number | null,
    cursor: string | null,
  ) => Promise<MemberDocument>;
}) {
  return async function getListMembers(
    httpRequest: Context,
  ): Promise<Record<string, any>> {
    try {
      const {
        query: { limit, cursor },
      } = httpRequest;

      const result = await listMembers(limit, cursor);

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
