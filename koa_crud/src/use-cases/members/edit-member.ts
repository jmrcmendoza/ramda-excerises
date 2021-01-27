import { MemberDocument } from '@Models/member';
import { makeMember } from '@Entities/members';
import { MemberQueries } from '@DataAccess/members/members';
import { MemberValidationError } from '@Entities/members/member';

export default function makeUpdateMember(membersDB: MemberQueries) {
  return async function updateMember(
    id: string,
    memberInfo: MemberDocument,
  ): Promise<boolean> {
    await makeMember(memberInfo);

    if (!id) {
      throw new MemberValidationError('ID must be provided.');
    }

    return membersDB.updateMember(id, memberInfo);
  };
}
