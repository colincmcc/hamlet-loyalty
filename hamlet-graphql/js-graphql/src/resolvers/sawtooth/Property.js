import { TypeComposer } from 'graphql-compose';

import {
  createTransactionResolver,
  createDbFindOneResolver
} from '../../utils/resolverFunctions';
import { DataTypeTC } from './PropertySchema';

const PropertyTC = TypeComposer.create(`
type Property {
  name: String
  record_id: String
  data_type: DataType
  reporters: [Account]
  current_page: Int
  wrapped: Boolean
  fixed: Boolean
  number_exponent: Int
  enum_options: [String]
  unit: String
}
`);

export const PropertyValueTC = TypeComposer.create(`
type PropertyValue {
  name: String
  data_type: DataType
  value: String
  location_value: Location
}
`);

export const ReportedValueTC = TypeComposer.create(`
type ReportedValue {
  reported_index: Int
  timestamp: Int
  value: String
  location_value: Location
}
`);

export const LocationTC = TypeComposer.create(`
type Location {
  latitude: Int
  longitude: Int
}
`);

export const PropertyPageTC = TypeComposer.create(`
type PropertyPage {
  name: String
  record_id: String
  reported_values: [ReportedValue]
}
`);

createTransactionResolver(PropertyTC);
createDbFindOneResolver(PropertyTC, {
  name: 'String',
  recordId: 'String',
  reporter: 'String'
});

export function getPropertyResolvers() {
  return {
    findProperty: PropertyTC.getResolver('dbFindOne')
  };
}

export function getPropertyMutations() {
  return {
    createProperty: PropertyTC.getResolver('createBcTransaction')
  };
}

export default PropertyTC;
