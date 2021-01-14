import { MemberDocument } from '../../models/member';
import { makeMember } from '../../entities/members';
import { MemberQueries } from '../../data-access/members/members';
import { createToken } from '../../middleware/authorization';

export default function makeAuthenticateMember(membersDB: MemberQueries) {
  return async function authenticateMember(
    memberInfo: MemberDocument,
  ): Promise<{ token: string }> {
    await makeMember(memberInfo);

    const result = await membersDB.authenticateMember(memberInfo);

    if (result) {
      const token = await createToken(memberInfo.username);

      return { token };
    }

    throw new Error('Authenticate failed.');
  };
}
