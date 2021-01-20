import { gql } from 'apollo-server-koa';

export const typeDefs = gql`
  type Member {
    id: ID!
    username: String!
    password: String!
    realName: String
    email: String
    bankAccount: Int
    createdAt: String!
    updatedAt: String
  }

  type Token {
    token: String!
  }

  type MemberEdge {
    node: Member
    cursor: String
  }

  type MemberPageInfo {
    endCursor: String
    hasNextPage: Boolean!
  }

  type MemberConnection {
    totalCount: Int
    edges: [MemberEdge]
    pageInfo: MemberPageInfo
  }

  extend type Query {
    members: MemberConnection
    member(id: ID!): Member
  }

  input CreateMemberInput {
    username: String!
    password: String!
    realName: String
  }

  input UpdateMemberInput {
    username: String
    password: String
    realName: String
  }

  input AuthenticateMemberInput {
    username: String!
    password: String!
  }

  extend type Mutation {
    createMember(input: CreateMemberInput!): Boolean
    updateMember(id: ID!, input: UpdateMemberInput!): Boolean
    deleteMember(id: ID!): Boolean
    authenticate(input: AuthenticateMemberInput!): Token
  }
`;
