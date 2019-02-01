import composeWithJson from 'graphql-compose-json'
import {
  createFindByIdResolver,
  createFindByUrlListResolver,
  createFindAllResolver,
  createFindByMetaResolver
} from '../../utils';

const restApiResponse = {
  id: 48,
  acf: {
      price: "13",
      food_type: "brunch",
      name: "Breakfast 1",
      description: "blah / blah / blah"
  }
}

const FoodTC = composeWithJson('Food', restApiResponse)


export const FoodGraphQLType = FoodTC.getType()

createFindByIdResolver(FoodTC, 'foods')
createFindByUrlListResolver(FoodTC)
createFindAllResolver(FoodTC, 'foods')
createFindByMetaResolver(FoodTC, 'foods', 'food_type')

export function getFoodResolvers(){
  return {
    foodById: FoodTC.getResolver('findById'),
    allFoods: FoodTC.getResolver('findAll'),
    foodsByMeta: FoodTC.getResolver('findByMeta')
  }
}

export default FoodTC