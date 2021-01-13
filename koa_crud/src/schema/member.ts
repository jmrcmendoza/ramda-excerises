import { gql } from 'apollo-server-koa';

export const typeDefs = gql`
  type Member {
    id: ID!
    username: String!
    password: String!
    realName: String
    createdAt: String!
    updatedAt: String
  }

  extend type Query {
    members: [Member]
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

  extend type Mutation {
    createMember(input: CreateMemberInput!): Boolean
    updateMember(id: ID!, input: UpdateMemberInput!): Boolean
    deleteMember(id: ID!): Boolean
  }
`;
