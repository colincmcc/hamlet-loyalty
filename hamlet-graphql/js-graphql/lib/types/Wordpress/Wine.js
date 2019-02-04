import composeWithJson from 'graphql-compose-json'
import {
  createFindByIdResolver,
  createFindByUrlListResolver,
  createFindAllResolver,
} from '../../utils';



const restApiResponse = {
  id: 48,
  acf: {
      price: "13",
      name: "Breakfast 1",
      description: "blah / blah / blah"
  }
}

const WineTC = composeWithJson('Wine', restApiResponse)
export const WineGraphQLType = WineTC.getType()

createFindByIdResolver(WineTC, 'wines')
createFindByUrlListResolver(WineTC)
createFindAllResolver(WineTC, 'wines')

export function getCocktailResolvers() {
  return {
    allWines: WineTC.getResolver('findAll'),
    winesById: WineTC.getResolver('findById'),
  }
}

export default WineTC