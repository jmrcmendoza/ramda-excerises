import { MemberDocument } from '../models/member';

import {
  insertMember,
  listMembers,
  selectMember,
  updateMember,
  deleteMember,
} from '../use-cases/members';

import { VendorDocument } from '../models/vendor';

import {
  insertVendor,
  listVendors,
  selectVendor,
  updateVendor,
  deleteVendor,
} from '../use-cases/vendors';

export default {
  Query: {
    vendors: async (): Promise<any> => listVendors(),
    vendor: async (
      _obj: any,
      vendor: { id: string },
    ): Promise<Record<string, any>> => selectVendor(vendor.id),
    members: async (): Promise<any> => listMembers(),
    member: async (
      _obj: any,
      args: { id: string },
    ): Promise<Record<string, any>> => selectMember(args.id),
  },

  Member: {
    password(): string {
      return '';
    },
  },

  Vendor: {
    type(obj: { type: string }): string {
      if (obj.type === 'SEAMLESS') return 'SEAMLESS';
      if (obj.type === 'TRANSFER') return 'TRANSFER';
      return 'SEAMLESS';
    },
    // name: (obj: any) => `Vendor - ${obj.name}`,
  },

  Mutation: {
    createMember: async (
      _obj: any,
      args: {
        input: MemberDocument;
      },
    ): Promise<boolean> => insertMember(args.input),
    updateMember: async (
      _obj: any,
      args: {
        id: string;
        input: MemberDocument;
      },
    ): Promise<boolean> => updateMember(args.id, args.input),

    deleteMember: async (_obj: any, args: { id: string }): Promise<boolean> =>
      deleteMember(args.id),

    createVendor: async (
      _obj: any,
      args: {
        input: VendorDocument;
      },
    ): Promise<Record<string, any>> => insertVendor(args.input),
    updateVendor: async (
      _obj: any,
      args: {
        id: string;
        input: VendorDocument;
      },
    ): Promise<boolean> => updateVendor(args.id, args.input),

    deleteVendor: async (_obj: any, args: { id: string }): Promise<boolean> =>
      deleteVendor(args.id),
  },
};
