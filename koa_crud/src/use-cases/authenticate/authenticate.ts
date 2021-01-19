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

    if (result.verified) {
      const token = await createToken(result.id);

      return { token };
    }

    throw new Error('Authenticate failed.');
  };
}
