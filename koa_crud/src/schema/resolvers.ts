import { Context } from 'koa';
import R from 'ramda';
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
import { fromCursorHash, toCursorHash } from '../helpers/opaque-cursor';

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AUTHORIZATION_ERROR';
  }
}

type Connection<T> = {
  totalCount: number;
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
  };
  edges: {
    node: T;
    cursor: Buffer;
  }[];
};

export default {
  Query: {
    vendors: async (_obj, { limit, after }, ctx: Context): Promise<any> => {
      if (!ctx.verified) {
        throw new AuthorizationError('Forbidden');
      }

      const cursor = after ? fromCursorHash(after) : null;

      const vendors = await listVendors(limit ? limit + 1 : null, cursor);

      const hasNextPage = R.length(vendors) > limit;
      const nodes = hasNextPage ? R.slice(0, -1, vendors) : vendors;

      const edges = await R.map((vendor: any) => {
        return { node: vendor, cursor: toCursorHash(vendor.createdAt) };
      })(nodes);

      const endCursor: any = R.compose(R.prop('cursor'), R.last)(edges);

      const result: Connection<Record<string, any>> = {
        totalCount: R.length(vendors),
        pageInfo: { hasNextPage, endCursor },
        edges,
      };

      return result;
    },
    vendor: async (
      _obj,
      vendor: { id: string },
      ctx: Context,
    ): Promise<Record<string, any>> => {
      if (!ctx.verified) {
        throw new AuthorizationError('Forbidden');
      }

      return selectVendor(vendor.id);
    },
    members: async (_obj, _arg, ctx: Context): Promise<any> => {
      if (!ctx.verified) {
        throw new AuthorizationError('Forbidden');
      }

      const members = await listMembers();

      const edges = await R.map((member) => {
        return { node: member, cursor: 'not implemented' };
      })(members);

      const result: Connection<Record<string, any>> = {
        totalCount: R.length(members),
        pageInfo: { hasNextPage: false, endCursor: 'not implemented' },
        edges,
      };

      return result;
    },
    member: async (
      _obj,
      args: { id: string },
      ctx: Context,
    ): Promise<Record<string, any>> => {
      if (!ctx.verified) {
        throw new AuthorizationError('Forbidden');
      }

      return selectMember(args.id);
    },
    promos: async (_obj, _arg, ctx: Context): Promise<any> => {
      if (!ctx.verified) {
        throw new AuthorizationError('Forbidden');
      }

      const promos = await listPromos();

      const edges = await R.map((promo) => {
        return { node: promo, cursor: 'not implemented' };
      })(promos);

      const result: Connection<Record<string, any>> = {
        totalCount: R.length(promos),
        pageInfo: { hasNextPage: false, endCursor: 'not implemented' },
        edges,
      };

      return result;
    },
    promo: async (
      _obj,
      args: { id: string },
      ctx: Context,
    ): Promise<Record<string, any>> => {
      if (!ctx.verified) {
        throw new AuthorizationError('Forbidden');
      }

      return selectPromo(args.id);
    },
    promoEnrollmentRequests: async (_obj, _arg, ctx: Context): Promise<any> => {
      if (!ctx.verified) {
        throw new AuthorizationError('Forbidden');
      }

      const promoEnrollmentRequests = await listPromoEnrollmentRequests();

      const edges = await R.map((promoEnrollmentRequest) => {
        return { node: promoEnrollmentRequest, cursor: 'not implemented' };
      })(promoEnrollmentRequests);

      const result: Connection<Record<string, any>> = {
        totalCount: R.length(promoEnrollmentRequests),
        pageInfo: { hasNextPage: false, endCursor: 'not implemented' },
        edges,
      };

      return result;
    },
    promoEnrollmentRequest: async (
      _obj,
      args: { id: string },
      ctx: Context,
    ): Promise<Record<string, any>> => {
      if (!ctx.verified) {
        throw new AuthorizationError('Forbidden');
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
    // name: (obj) => `Vendor - ${obj.name}`,
  },

  Promo: {
    __resolveType(obj: { template: string }): string {
      if (obj.template === 'SIGN_UP') return 'SignUpPromo';
      return 'DepositPromo';
    },
  },

  Mutation: {
    createMember: async (
      _obj,
      args: {
        input: MemberDocument;
      },
      ctx: Context,
    ): Promise<boolean> => {
      if (!ctx.verified) {
        throw new AuthorizationError('Forbidden');
      }

      return insertMember(args.input);
    },
    updateMember: async (
      _obj,
      args: {
        id: string;
        input: MemberDocument;
      },
      ctx: Context,
    ): Promise<boolean> => {
      if (!ctx.verified) {
        throw new AuthorizationError('Forbidden');
      }

      return updateMember(args.id, args.input);
    },

    deleteMember: async (
      _obj,
      args: { id: string },
      ctx: Context,
    ): Promise<boolean> => {
      if (!ctx.verified) {
        throw new AuthorizationError('Forbidden');
      }

      return deleteMember(args.id);
    },

    authenticate: async (
      _obj,
      args: { input: MemberDocument },
    ): Promise<{ token: string }> => {
      return authenticateMember(args.input);
    },

    createVendor: async (
      _obj,
      args: {
        input: VendorDocument;
      },
      ctx: Context,
    ): Promise<Record<string, any>> => {
      if (!ctx.verified) {
        throw new AuthorizationError('Forbidden');
      }

      return insertVendor(args.input);
    },
    updateVendor: async (
      _obj,
      args: {
        id: string;
        input: VendorDocument;
      },
      ctx: Context,
    ): Promise<boolean> => {
      if (!ctx.verified) {
        throw new AuthorizationError('Forbidden');
      }

      return updateVendor(args.id, args.input);
    },

    deleteVendor: async (
      _obj,
      args: { id: string },
      ctx: Context,
    ): Promise<boolean> => {
      if (!ctx.verified) {
        throw new AuthorizationError('Forbidden');
      }

      return deleteVendor(args.id);
    },

    createPromo: async (
      _obj,
      args: {
        input: PromoDocument;
      },
      ctx: Context,
    ): Promise<boolean> => {
      if (!ctx.isAdmin) {
        throw new AuthorizationError('Forbidden');
      }

      return insertPromo(args.input);
    },

    updatePromo: async (
      _obj,
      args: {
        id: string;
        input: PromoDocument;
      },
      ctx: Context,
    ): Promise<boolean> => {
      if (!ctx.isAdmin) {
        throw new AuthorizationError('Forbidden');
      }

      return updatePromo(args.id, args.input);
    },

    deletePromo: async (
      _obj,
      args: { id: string },
      ctx: Context,
    ): Promise<boolean> => {
      if (!ctx.isAdmin) {
        throw new AuthorizationError('Forbidden');
      }

      return deletePromo(args.id);
    },

    enrollToPromo: async (
      _obj,
      args: { promo: string },
      ctx: Context,
    ): Promise<boolean> => {
      if (!ctx.verified) {
        throw new AuthorizationError('Forbidden');
      }

      const data = {
        promo: args.promo,
        member: ctx.userId,
      };

      return enrollToPromo(data);
    },

    processPromoEnrollmentRequest: async (
      _obj,
      args: { id: string },
      ctx: Context,
    ): Promise<boolean> => {
      if (!ctx.isAdmin) {
        throw new AuthorizationError('Forbidden');
      }

      return processPromoEnrollmentRequest(args.id);
    },

    approvePromoEnrollmentRequest: async (
      _obj,
      args: { id: string },
      ctx: Context,
    ): Promise<boolean> => {
      if (!ctx.isAdmin) {
        throw new AuthorizationError('Forbidden');
      }

      return approvePromoEnrollmentRequest(args.id);
    },

    rejectPromoEnrollmentRequest: async (
      _obj,
      args: { id: string },
      ctx: Context,
    ): Promise<boolean> => {
      if (!ctx.isAdmin) {
        throw new AuthorizationError('Forbidden');
      }

      return rejectPromoEnrollmentRequest(args.id);
    },
  },
};
