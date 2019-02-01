import { TypeComposer } from 'graphql-compose';

import {

} from '../../utils';

export const WooCouponTC = TypeComposer.create(`
  type Coupon {
    id: Int
    code: String
    amount: String
    date_created: String
    date_created_gmt: String
    date_modified: String
    date_modified_gmt: String
    discount_type: String
    description: String
    date_expires: String
    date_expires_gmt: String
    usage_count: Int
    individual_use: Boolean
    product_ids: [Int]
    excluded_product_ids: [Int]
    usage_limit: Int
    usage_limit_per_user: Int
    limit_usage_to_x_items: Int
    free_shipping: Boolean
    product_categories: [Int]
    excluded_product_categories: [Int]
    exlude_sale_items: Boolean
    minimum_amount: String
    maximum_amount: String
    email_restrictions: [String]
    used_by: [String]
    meta_data: [MetaData]
  }
`);


export const WooCouponGraphQLType = WooCouponTC.getType();

// Query Resolvers


// Mutation Resolvers

// Subscription Resolvers

export function getWooCouponResolvers() {
  return {

  };
}

export function getWooCouponMutations() {
  return {
  };
}

export function getWooCouponSubscriptions() {
  return {

  };
}

export default WooCouponTC;
