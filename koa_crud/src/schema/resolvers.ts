import { MemberDocument } from '../models/member';
import { Context } from 'koa';

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

import { authenticateMember } from '../use-cases/authenticate';

export default {
  Query: {
    vendors: async (_obj: any, _arg: any, ctx: Context): Promise<any> => {
      if (!ctx.verified) {
        throw new Error('Forbidden');
      }

      return listVendors();
    },
    vendor: async (
      _obj: any,
      vendor: { id: string },
      ctx: Context,
    ): Promise<Record<string, any>> => {
      if (!ctx.verified) {
        throw new Error('Forbidden');
      }

      return selectVendor(vendor.id);
    },
    members: async (_obj: any, _arg: any, ctx: Context): Promise<any> => {
      if (!ctx.verified) {
        throw new Error('Forbidden');
      }

      return listMembers();
    },
    member: async (
      _obj: any,
      args: { id: string },
      ctx: Context,
    ): Promise<Record<string, any>> => {
      if (!ctx.verified) {
        throw new Error('Forbidden');
      }

      return selectMember(args.id);
    },
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
      ctx: Context,
    ): Promise<boolean> => {
      if (!ctx.verified) {
        throw new Error('Forbidden');
      }

      return insertMember(args.input);
    },
    updateMember: async (
      _obj: any,
      args: {
        id: string;
        input: MemberDocument;
      },
      ctx: Context,
    ): Promise<boolean> => {
      if (!ctx.verified) {
        throw new Error('Forbidden');
      }

      return updateMember(args.id, args.input);
    },

    deleteMember: async (
      _obj: any,
      args: { id: string },
      ctx: Context,
    ): Promise<boolean> => {
      if (!ctx.verified) {
        throw new Error('Forbidden');
      }

      return deleteMember(args.id);
    },

    authenticate: async (
      _obj: any,
      args: { input: MemberDocument },
    ): Promise<{ token: string }> => {
      return authenticateMember(args.input);
    },

    createVendor: async (
      _obj: any,
      args: {
        input: VendorDocument;
      },
      ctx: Context,
    ): Promise<Record<string, any>> => {
      if (!ctx.verified) {
        throw new Error('Forbidden');
      }

      return insertVendor(args.input);
    },
    updateVendor: async (
      _obj: any,
      args: {
        id: string;
        input: VendorDocument;
      },
      ctx: Context,
    ): Promise<boolean> => {
      if (!ctx.verified) {
        throw new Error('Forbidden');
      }

      return updateVendor(args.id, args.input);
    },

    deleteVendor: async (
      _obj: any,
      args: { id: string },
      ctx: Context,
    ): Promise<boolean> => {
      if (!ctx.verified) {
        throw new Error('Forbidden');
      }

      return deleteVendor(args.id);
    },
  },
};
