import { TypeComposer, EnumTypeComposer } from 'graphql-compose';

import {
  createTransactionResolver,
  createDbFindOneResolver
} from '../../utils/resolverFunctions';


export const DataTypeTC = EnumTypeComposer.create(`
enum DataType {
  TYPE_UNSET
  BYTES
  BOOLEAN
  NUMBER
  STRING
  ENUM
  STRUCT
  LOCATION
}
`);

const PropertySchemaTC = TypeComposer.create(`
type PropertySchema {
  id: String
  data_type: DataType
  required: Boolean
  fixed: Boolean
  delayed: Boolean
  number_exponent: Int
  enum_options: [String]
  unit: String
}
`);


export default PropertySchemaTC;
