import { MemberDocument } from '../../models/member';

export default function listMembersController({
  listMembers,
}: {
  listMembers: () => Promise<MemberDocument>;
}) {
  return async function getListMembers(): Promise<Record<string, any>> {
    try {
      const result = await listMembers();

      return {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
        body: result,
      };
    } catch (e) {
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        status: e.status ? e.status : 400,
        body: { errorMsg: e.message },
      };
    }
  };
}
