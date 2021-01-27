import { MemberDocument } from '@Models/member';
import { makeMember } from '@Entities/members';
import { MemberQueries } from '@DataAccess/members/members';

export default function makeInsertMember(membersDB: MemberQueries) {
  return async function insertMember(
    memberInfo: MemberDocument,
  ): Promise<boolean> {
    await makeMember(memberInfo);

    return membersDB.createMember(memberInfo);
  };
}
