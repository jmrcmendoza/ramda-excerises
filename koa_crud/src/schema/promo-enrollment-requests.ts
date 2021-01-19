import { gql } from 'apollo-server-koa';

export const typeDefs = gql`
  enum PromoEnrollmentRequestStatus {
    PENDING
    REJECTED
    PROCESSING
    APPROVED
  }

  type PromoEnrollmentRequest {
    id: ID!
    promo: Promo!
    member: Member!
    status: PromoEnrollmentRequestStatus!
    createdAt: String!
    updatedAt: String
  }

  extend type Query {
    promoEnrollmentRequests: [PromoEnrollmentRequest]!
    promoEnrollmentRequest(id: ID!): PromoEnrollmentRequest
  }

  extend type Mutation {
    enrollToPromo(promo: ID!): Boolean!
    processPromoEnrollmentRequest(id: ID!): Boolean!
    approvePromoEnrollmentRequest(id: ID!): Boolean!
    rejectPromoEnrollmentRequest(id: ID!): Boolean!
  }
`;
