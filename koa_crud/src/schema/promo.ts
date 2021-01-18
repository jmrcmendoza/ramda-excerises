import { gql } from 'apollo-server-koa';

export const typeDefs = gql`
  enum Template {
    DEPOSIT
    SIGN_UP
  }

  enum Status {
    DRAFT
    ACTIVE
    INACTIVE
  }

  enum MemberFields {
    EMAIL
    REAL_NAME
    BANK_ACCOUNT
  }

  type Promo {
    id: ID!
    name: String!
    template: Template!
    title: String!
    description: String!
    submitted: Boolean
    enabled: Boolean
    status: Status!
    minimumBalance: Float
    requiredMemberFields: [String]
    createdAt: String!
    updatedAt: String
  }

  extend type Query {
    promos: [Promo]!
    promo(id: ID!): Promo
  }

  input CreatePromoInput {
    name: String!
    template: Template!
    title: String!
    description: String!
    submitted: Boolean
    enabled: Boolean
    status: Status
    minimumBalance: Float
    requiredMemberFields: [String]
  }

  input UpdatePromoInput {
    name: String!
    template: Template!
    title: String!
    description: String!
    submitted: Boolean
    enabled: Boolean
    status: Status!
    minimumBalance: Float
    requiredMemberFields: [String]
  }

  extend type Mutation {
    createPromo(input: CreatePromoInput!): Boolean!
    updatePromo(input: UpdatePromoInput!): Boolean!
    deletePromo(id: ID!): Boolean!
  }
`;
