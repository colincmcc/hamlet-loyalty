import composeWithJson from 'graphql-compose-json'
import {
  createFindByIdResolver,
  createFindByUrlListResolver,
  createFindAllResolver,
  createFindByIdListResolver,
  createFindByMetaResolver
} from '../../utils';


const restApiResponse = {

    id: 41,
    status: "publish",
    acf: {
      review_source: "Trip Advisor",
      source_link: "https://www.tripadvisor.com/ShowUserReviews-g53449-d10065653-r578623626-Industry_Public_House-Pittsburgh_Pennsylvania.html#",
      review_snippet: "very expansive CRAFT Beer and ",
      full_review: "Found this spot near our overnight Hotel. Sta",
      review_date: "05/2018",
      review_topic: [
          "Drink",
          "NF"
      ],
      review_author: "Name"
  },
}

const ReviewTC = composeWithJson('Review', restApiResponse)
export const ReviewGraphQLType = ReviewTC.getType()


createFindByIdResolver(ReviewTC, 'review')
createFindByUrlListResolver(ReviewTC)
createFindAllResolver(ReviewTC, 'review')
createFindByIdListResolver(ReviewTC, 'review')
createFindByMetaResolver(ReviewTC, 'review', 'review_source')

export function getReviewResolvers(){
    return {
      reviewsById: ReviewTC.getResolver('findById'),
      allReviews: ReviewTC.getResolver('findAll'),
      reviewsByMeta: ReviewTC.getResolver('findByMeta'),
    }
}
export default ReviewTC