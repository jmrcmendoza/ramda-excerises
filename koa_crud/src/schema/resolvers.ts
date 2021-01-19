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
import { PromoDocument } from '../models/promo';
import {
  deletePromo,
  insertPromo,
  listPromos,
  selectPromo,
  updatePromo,
} from '../use-cases/promos';
import {
  approvePromoEnrollmentRequest,
  enrollToPromo,
  listPromoEnrollmentRequests,
  processPromoEnrollmentRequest,
  rejectPromoEnrollmentRequest,
  selectOnePromoEnrollmentRequest,
} from '../use-cases/promo-enrollment-requests';

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
    promos: async (_obj: any, _arg: any, ctx: Context): Promise<any> => {
      if (!ctx.verified) {
        throw new Error('Forbidden');
      }

      return listPromos();
    },
    promo: async (
      _obj: any,
      args: { id: string },
      ctx: Context,
    ): Promise<Record<string, any>> => {
      if (!ctx.verified) {
        throw new Error('Forbidden');
      }

      return selectPromo(args.id);
    },
    promoEnrollmentRequests: async (
      _obj: any,
      _arg: any,
      ctx: Context,
    ): Promise<any> => {
      if (!ctx.verified) {
        throw new Error('Forbidden');
      }

      return listPromoEnrollmentRequests();
    },
    promoEnrollmentRequest: async (
      _obj: any,
      args: { id: string },
      ctx: Context,
    ): Promise<Record<string, any>> => {
      if (!ctx.verified) {
        throw new Error('Forbidden');
      }

      return selectOnePromoEnrollmentRequest(args.id);
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

  Promo: {
    __resolveType(obj: { template: string }): string {
      if (obj.template === 'SIGN_UP') return 'SignUpPromo';
      return 'DepositPromo';
    },
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

    createPromo: async (
      _obj: any,
      args: {
        input: PromoDocument;
      },
      ctx: Context,
    ): Promise<boolean> => {
      if (!ctx.isAdmin) {
        throw new Error('Forbidden');
      }

      return insertPromo(args.input);
    },

    updatePromo: async (
      _obj: any,
      args: {
        id: string;
        input: PromoDocument;
      },
      ctx: Context,
    ): Promise<boolean> => {
      if (!ctx.isAdmin) {
        throw new Error('Forbidden');
      }

      return updatePromo(args.id, args.input);
    },

    deletePromo: async (
      _obj: any,
      args: { id: string },
      ctx: Context,
    ): Promise<boolean> => {
      if (!ctx.isAdmin) {
        throw new Error('Forbidden');
      }

      return deletePromo(args.id);
    },

    enrollToPromo: async (
      _obj: any,
      args: { promo: string },
      ctx: Context,
    ): Promise<boolean> => {
      if (!ctx.verified) {
        throw new Error('Forbidden');
      }

      const data: any = {
        promo: args.promo,
        member: ctx.userId,
      };

      return enrollToPromo(data);
    },

    processPromoEnrollmentRequest: async (
      _obj: any,
      args: { id: string },
      ctx: Context,
    ): Promise<boolean> => {
      if (!ctx.isAdmin) {
        throw new Error('Forbidden');
      }

      return processPromoEnrollmentRequest(args.id);
    },

    approvePromoEnrollmentRequest: async (
      _obj: any,
      args: { id: string },
      ctx: Context,
    ): Promise<boolean> => {
      if (!ctx.isAdmin) {
        throw new Error('Forbidden');
      }

      return approvePromoEnrollmentRequest(args.id);
    },

    rejectPromoEnrollmentRequest: async (
      _obj: any,
      args: { id: string },
      ctx: Context,
    ): Promise<boolean> => {
      if (!ctx.isAdmin) {
        throw new Error('Forbidden');
      }

      return rejectPromoEnrollmentRequest(args.id);
    },
  },
};
