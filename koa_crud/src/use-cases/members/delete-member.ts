import { MemberQueries } from '../../data-access/members/members';

export default function makeDeleteMember(membersDB: MemberQueries) {
  return async function deleteMember(id: string): Promise<any> {
    if (!id) {
      throw new Error('ID must be provided.');
    }

    return membersDB.deleteMember(id);
  };
}
