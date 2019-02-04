import composeWithJson from 'graphql-compose-json'
import LocationTC from './Location'
import {
  createFindByIdResolver,
  createFindByUrlListResolver,
  createFindAllResolver,
  createFindByIdListResolver
} from '../../utils';


const restApiResponse = {
  id: 48,
  acf: {
    tasting_notes: "See a hazy, copper color. Taste a rich, supple entry, leading to a decadent, huge, full-bodied palate with intense caramel, toffee and peppery brown spice flavors. Then, enjoy a finish with an extreme, long, complex, evolving fade of spice and wood notes. Experts deem it a seductive, exotic and virtually flawless bourbon.",
    proof: "107",
    aged: "15",
    background_picture: "http://localhost:8080/wp-content/uploads/2018/07/15_year.jpg",
    distillery: "Pappy Van Winkle",
    product_name: "Family Reserve 15yr",
    locations: [
        104,
        103
    ]
},

  }


const PremiumTC = composeWithJson('Premium', restApiResponse)


export const PremiumGraphQLType = PremiumTC.getType()

createFindByIdResolver(PremiumTC, 'premium')
createFindByUrlListResolver(PremiumTC)
createFindAllResolver(PremiumTC, 'premium')
createFindByIdListResolver(PremiumTC, 'premium')


PremiumTC.addRelation('locations', {
  resolver: () => LocationTC.getResolver('findByIdList'),
  prepareArgs: {
    ids: source => source.acf.locations
  }
})

export function getPremiumResolvers() {
  return {
    allPremium: PremiumTC.getResolver('findAll'),
    premiumById: PremiumTC.getResolver('findById'),
  }
}

export default PremiumTC
