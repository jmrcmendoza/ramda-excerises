import { MemberDocument } from '../../models/member';
import { makeMember } from '../../entities/members';
import { MemberQueries } from '../../data-access/members/members';

export default function makeUpdateMember(membersDB: MemberQueries) {
  return async function updateMember(
    id: string,
    memberInfo: MemberDocument,
  ): Promise<boolean> {
    await makeMember(memberInfo);

    if (!id) {
      throw new Error('ID must be provided.');
    }

    return membersDB.updateMember(id, memberInfo);
  };
}
