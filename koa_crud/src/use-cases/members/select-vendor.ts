import { MemberQueries } from '../../data-access/members/members';

export default function makeSelectMember(membersDB: MemberQueries) {
  return async function selectMember(id: string): Promise<any> {
    if (!id) {
      throw new Error('ID must be provided.');
    }

    return membersDB.selectOneMember(id);
  };
}
