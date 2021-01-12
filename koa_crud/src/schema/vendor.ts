import { gql } from 'apollo-server-koa';

import {
  insertVendor,
  listVendors,
  selectVendor,
  updateVendor,
  deleteVendor,
} from '../use-cases/vendors';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = gql`
  enum VendorType {
    SEAMLESS
    TRANSFER
  }

  type Vendor {
    id: ID!
    name: String!
    type: VendorType!
    createdAt: String!
    updatedAt: String
  }

  type Query {
    vendors: [Vendor]
    vendor(id: ID!): Vendor
  }

  input CreateVendorInput {
    name: String!
    type: VendorType!
  }

  input UpdateVendorInput {
    name: String
    type: VendorType
  }

  type Mutation {
    createVendor(input: CreateVendorInput!): Boolean
    updateVendor(id: ID!, input: UpdateVendorInput!): Boolean
    deleteVendor(id: ID!): Boolean
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
export const resolvers = {
  Query: {
    vendors: async (): Promise<any> => listVendors(),
    vendor: async (
      _obj: any,
      vendor: { id: string },
    ): Promise<Record<string, any>> => selectVendor(vendor.id),
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
    createVendor: async (
      _obj: any,
      vendor: any,
    ): Promise<Record<string, any>> => insertVendor(vendor.input),
    updateVendor: async (
      _obj: any,
      vendor: any,
    ): Promise<Record<string, any>> => updateVendor(vendor.id, vendor),

    deleteVendor: async (_obj: any, vendor: { id: string }): Promise<boolean> =>
      deleteVendor(vendor.id),
  },
};
