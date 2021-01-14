import { gql } from 'apollo-server-koa';

export const typeDefs = gql`
  enum VendorType {
    SEAMLESS
    TRANSFER
  }

  type Vendor {
    _id: ID!
    name: String!
    type: VendorType!
    createdAt: String!
    updatedAt: String
  }

  extend type Query {
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

  extend type Mutation {
    createVendor(input: CreateVendorInput!): Boolean
    updateVendor(id: ID!, input: UpdateVendorInput!): Boolean
    deleteVendor(id: ID!): Boolean
  }
`;
