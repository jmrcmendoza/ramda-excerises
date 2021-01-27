import { MemberQueries } from '@DataAccess/members/members';

export default function makeListMembers(membersDB: MemberQueries) {
  return async function listMembers(
    limit: number | null,
    cursor: string | null,
  ): Promise<any> {
    return membersDB.listMembers(limit, cursor);
  };
}
