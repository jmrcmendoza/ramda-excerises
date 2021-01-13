import MemberModel, { MemberDocument } from '../../models/member';

export type MemberQueries = {
  listMembers: () => Promise<MemberDocument>;
  selectOneMember: (id: string) => Promise<MemberDocument>;
  createMember: (document: MemberDocument) => Promise<boolean>;
  updateMember: (id: string, document: MemberDocument) => Promise<boolean>;
  deleteMember: (id: string) => Promise<boolean>;
};

export default function ({
  member,
}: {
  member: typeof MemberModel;
}): MemberQueries {
  return Object.freeze({
    listMembers() {
      return member.find({}, { password: 0 }).lean();
    },
    selectOneMember(id: string) {
      return member.findById(id, { password: 0 }).lean();
    },
    async createMember(vendorInfo: MemberDocument) {
      const result = await member.create(vendorInfo);

      return !!result;
    },
    async updateMember(id: string, vendorInfo: MemberDocument) {
      const result = await member.findByIdAndUpdate(id, vendorInfo, {
        useFindAndModify: false,
      });

      return !!result;
    },
    async deleteMember(id: string) {
      const result = await member.findByIdAndDelete(id);

      return !!result;
    },
  });
}
