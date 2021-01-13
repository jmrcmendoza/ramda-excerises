import { MemberQueries } from '../../data-access/members/members';

export default function makeListMembers(membersDB: MemberQueries) {
  return async function listMembers(): Promise<any> {
    return membersDB.listMembers();
  };
}
