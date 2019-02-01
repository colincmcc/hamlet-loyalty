import composeWithJson from 'graphql-compose-json';
import LocationTC from './Location';
import {
  createFindByIdResolver,
  createFindByUrlListResolver,
  createFindAllResolver,
  createFindByIdListResolver
} from '../../utils';


const restApiResponse = {
  id: 48,
  acf: {
    locations: [
      104,
      103
    ],
    price: '13',
    name: 'Breakfast 1',
    description: 'blah / blah / blah'
  }

};


const CanTC = composeWithJson('Can', restApiResponse);


export const CanGraphQLType = CanTC.getType();

createFindByIdResolver(CanTC, 'cans');
createFindByUrlListResolver(CanTC);
createFindAllResolver(CanTC, 'cans');
createFindByIdListResolver(CanTC, 'cans');


CanTC.addRelation('locations', {
  resolver: () => LocationTC.getResolver('findByIdList'),
  prepareArgs: {
    ids: source => source.acf.locations
  }
});

export function getCanResolvers() {
  return {
    allCans: CanTC.getResolver('findAll'),
    canById: CanTC.getResolver('findById')
  };
}

export default CanTC;
