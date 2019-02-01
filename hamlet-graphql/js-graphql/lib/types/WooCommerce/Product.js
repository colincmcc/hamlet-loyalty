import { TypeComposer } from 'graphql-compose';
import composeWithJson from 'graphql-compose-json';
import {
  createFindAllWCResolver,
  createFindWCByIdResolver
} from '../../utils';

/*
const WooReviewTC = TypeComposer.create(`
type Review {
  id: Int
  date_created: String
  date_created_gmt: String
  review: String
  rating: Int
  name: String
  email: String
  verified: Boolean
}
`);
const WooTagTC = TypeComposer.create(`
type Tag {
  id: Int
  name: String
  slug: String
}
`);
const WooAttributeTC = TypeComposer.create(`
type Attribute {
  id: Int
  name: String
  position: Int
  visible: Boolean
  variation: Boolean
  options: [String]
}
`);
const WooMetaDataTC = TypeComposer.create(`
type MetaData {
  id: Int
  key: String
  value: String
}
`);
const WooDefaultAttributeTC = TypeComposer.create(`
type DefaultAttribute {
  id: Int
  name: String
  option: String
}
`);
const WooCategoryTC = TypeComposer.create(`
type Category {
  id: Int
  name: String
  slug: String
}
`);
const WooDownloadTC = TypeComposer.create(`
type Download {
  id: String
  name: String
  file: String
}
`);

const WooImageTC = TypeComposer.create(`
type Image {
  id: Int
  date_created: String
  date_created_gmt: String
  date_modified: String
  date_modified_gmt: String
  src: String
  name: String
  alt: String
  position: Int
}
`);

const WooDimensionsTC = TypeComposer.create(`
type Dimensions {
  length: String
  width: String
  height: String
}
`);

export const WooProductTC = TypeComposer.create(`
type Product {
  id: Int
  name: String
  slug: String
  permalink: String
  date_created: String
  date_created_gmt: String
  date_modified: String
  date_modified_gmt: String
  type: String
  status: String
  featured: Boolean
  catalog_visibility: String
  description: String
  short_description: String
  sku: String
  price: String
  regular_price: String
  sale_price: String
  date_on_sale_from: String
  date_on_sale_from_gmt: String
  date_on_sale_to: String
  date_on_sale_to_gmt: String
  price_html: String
  on_sale: Boolean
  purchasable: Boolean
  total_sales: Int
  virtual: Boolean
  downloadable: Boolean
  downloads: [Download]
  download_limit: Int
  download_expiry: Int
  external_url: String
  button_text: String
  tax_status: String
  tax_class: String
  manage_stock: Boolean
  stock_quantity: Int
  in_stock: Boolean
  backorders: String
  backorders_allowed: Boolean
  backordered: Boolean
  sold_individually: Boolean
  weight: String
  dimensions: Dimensions
  shipping_required: Boolean
  shipping_taxable: Boolean
  shipping_class: String
  shipping_class_id: Int
  reviews_allowed: Boolean
  average_rating: String
  rating_count: Int
  related_ids: [Int]
  upsell_ids: [Int]
  cross_sell_ids: [Int]
  parent_id: Int
  purchase_note: String
  categories: [Category]
  tags: [Tag]
  images: [Image]
  attributes: [Attribute]
  default_attributes: [DefaultAttribute]
  variations: [Int]
  grouped_products: [Int]
  menu_order: Int
  meta_data: [MetaData]
  reviews: [Review]
}
type Dimensions {
  length: String
  width: String
  height: String
}
type Image {
  id: Int
  date_created: String
  date_created_gmt: String
  date_modified: String
  date_modified_gmt: String
  src: String
  name: String
  alt: String
  position: Int
}
type Download {
  id: String
  name: String
  file: String
}
type Category {
  id: Int
  name: String
  slug: String
}
type DefaultAttribute {
  id: Int
  name: String
  option: String
}
type MetaData {
  id: Int
  key: String
  value: String
}
type Attribute {
  id: Int
  name: String
  position: Int
  visible: Boolean
  variation: Boolean
  options: [String]
}
type Tag {
  id: Int
  name: String
  slug: String
}
type Review {
  id: Int
  date_created: String
  date_created_gmt: String
  review: String
  rating: Int
  name: String
  email: String
  verified: Boolean
}
`);

*/

const restApiResponse = {
  id: 794,
  name: 'Premium Quality',
  slug: 'premium-quality-19',
  permalink: 'https://example.com/product/premium-quality-19/',
  date_created: '2017-03-23T17:01:14',
  date_created_gmt: '2017-03-23T20:01:14',
  date_modified: '2017-03-23T17:01:14',
  date_modified_gmt: '2017-03-23T20:01:14',
  type: 'simple',
  status: 'publish',
  featured: false,
  catalog_visibility: 'visible',
  description: '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>\n',
  short_description: '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>\n',
  sku: '',
  price: '21.99',
  regular_price: '21.99',
  sale_price: '',
  date_on_sale_from: null,
  date_on_sale_from_gmt: null,
  date_on_sale_to: null,
  date_on_sale_to_gmt: null,
  price_html: '<span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">&#36;</span>21.99</span>',
  on_sale: false,
  purchasable: true,
  total_sales: 0,
  virtual: false,
  downloadable: false,
  downloads: [],
  download_limit: -1,
  download_expiry: -1,
  external_url: '',
  button_text: '',
  tax_status: 'taxable',
  tax_class: '',
  manage_stock: false,
  stock_quantity: null,
  stock_status: 'instock',
  backorders: 'no',
  backorders_allowed: false,
  backordered: false,
  sold_individually: false,
  weight: '',
  dimensions: {
    length: '',
    width: '',
    height: ''
  },
  shipping_required: true,
  shipping_taxable: true,
  shipping_class: '',
  shipping_class_id: 0,
  reviews_allowed: true,
  average_rating: '0.00',
  rating_count: 0,
  related_ids: [
    53,
    40,
    56,
    479,
    99
  ],
  upsell_ids: [],
  cross_sell_ids: [],
  parent_id: 0,
  purchase_note: '',
  categories: [
    {
      id: 9,
      name: 'Clothing',
      slug: 'clothing'
    },
    {
      id: 14,
      name: 'T-shirts',
      slug: 't-shirts'
    }
  ],
  tags: [],
  images: [
    {
      id: 792,
      date_created: '2017-03-23T14:01:13',
      date_created_gmt: '2017-03-23T20:01:13',
      date_modified: '2017-03-23T14:01:13',
      date_modified_gmt: '2017-03-23T20:01:13',
      src: 'https://example.com/wp-content/uploads/2017/03/T_2_front-4.jpg',
      name: '',
      alt: ''
    },
    {
      id: 793,
      date_created: '2017-03-23T14:01:14',
      date_created_gmt: '2017-03-23T20:01:14',
      date_modified: '2017-03-23T14:01:14',
      date_modified_gmt: '2017-03-23T20:01:14',
      src: 'https://example.com/wp-content/uploads/2017/03/T_2_back-2.jpg',
      name: '',
      alt: ''
    }
  ],
  attributes: [],
  default_attributes: [],
  variations: [],
  grouped_products: [],
  menu_order: 0,
  meta_data: [],
  _links: {
    self: [
      {
        href: 'https://example.com/wp-json/wc/v3/products/794'
      }
    ],
    collection: [
      {
        href: 'https://example.com/wp-json/wc/v3/products'
      }
    ]
  }
};


export const WooProductTC = composeWithJson('WooProduct', restApiResponse);


export const WooProductGraphQLType = WooProductTC.getType();

// Query Resolvers
createFindAllWCResolver(WooProductTC, 'products');

// Mutation Resolvers

// Subscription Resolvers

export function getWooProductQueries() {
  return {
    allProducts: WooProductTC.getResolver('findAllProducts')
  };
}

export function getWooProductMutations() {
  return {
  };
}

export function getWooProductSubscriptions() {
  return {

  };
}

export default WooProductTC;
