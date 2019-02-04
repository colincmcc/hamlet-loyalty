import composeWithJson from 'graphql-compose-json';
import {
  createFindByIdResolver,
  createFindByUrlListResolver,
  createFindAllResolver
} from '../../utils';


const restApiResponse = {
  id: 48,
  acf: {
    price: '13',
    name: 'Breakfast 1',
    description: 'blah / blah / blah'
  }
};

const CocktailTC = composeWithJson('Cocktail', restApiResponse);
export const CocktailGraphQLType = CocktailTC.getType();

createFindByIdResolver(CocktailTC, 'drinks');
createFindByUrlListResolver(CocktailTC);
createFindAllResolver(CocktailTC, 'drinks');

export function getCocktailResolvers() {
  return {
    allCocktails: CocktailTC.getResolver('findAll'),
    cocktailsById: CocktailTC.getResolver('findById')
  };
}

export default CocktailTC;
