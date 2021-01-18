import { gql } from 'apollo-server-koa';
import { typeDefs as VendorTypeDef } from './vendor';
import { typeDefs as MemberTypeDef } from './member';
import { typeDefs as PromoTypeDef } from './promo';

const root = gql`
  type Query
  type Mutation
`;

export const typeDefs = gql`
  ${root}
  ${MemberTypeDef}
  ${VendorTypeDef}
  ${PromoTypeDef}
`;
