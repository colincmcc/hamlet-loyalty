import composeWithJson from 'graphql-compose-json'
import {
  createFindByIdResolver,
  createFindByUrlListResolver,
  createFindAllResolver,
  createFindByIdListResolver
} from '../../utils';

const restApiResponse = {
  id: 48,
  title: {
    rendered: "Lawrenceville"
  },
  acf: {
    loc_symbol: "LV",
    loc_num: "1",
    address: {
      address: "4305 Butler St, Pittsburgh, PA 15201, USA",
      lat: "40.4709302",
      lng: "-79.96044130000001"
    },
    open_hours: "text",
    happy_hour: "text",
    phone_number: "412-683-1100",
    email: "reservations@industrypgh.com",
    number_of_taps: "43",
    loc_description: "",
    facebook: "https://www.facebook.com/industrypublichouse",
    twitter: "https://twitter.com/industrypgh",
    instagram: "https://www.instagram.com/industrypublichouse/",
    trip_advisor: "https://www.tripadvisor.com/Restaurant_Review-g53449-d10035864-Reviews-Industry_Public_House-Pittsburgh_Pennsylvania.html"

  }
}
const LocationTC = composeWithJson('Location', restApiResponse)

createFindByIdResolver(LocationTC, 'location')
createFindByUrlListResolver(LocationTC)
createFindAllResolver(LocationTC, 'location')
createFindByIdListResolver(LocationTC, 'location')

export const LocationGraphQLType = LocationTC.getType()



LocationTC.addRelation('cans', {
  resolver: () => LocationTC.getResolver('findByIdList'),
  prepareArgs: {
    ids: source => source.acf.locations
  }
})

export function getLocationResolvers() {

  return {
    locationById: LocationTC.getResolver('findById'),
    allLocations: LocationTC.getResolver('findAll'),
  }
}
export default LocationTC