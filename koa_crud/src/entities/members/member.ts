import { MemberDocument } from '../../models/member';

export default function () {
  return async function makeVendor(
    member: MemberDocument,
  ): Promise<void | Error> {
    const { username, password } = member;

    if (!username) {
      throw new Error('Username must be provided.');
    }

    if (!password) {
      throw new Error('Password must be provided.');
    }
  };
}
