import { MemberDocument } from '../../models/member';
import { makeMember } from '../../entities/members';
import { MemberQueries } from '../../data-access/members/members';

export default function makeInsertMember(membersDB: MemberQueries) {
  return async function insertMember(
    memberInfo: MemberDocument,
  ): Promise<boolean> {
    await makeMember(memberInfo);

    return membersDB.createMember(memberInfo);
  };
}
