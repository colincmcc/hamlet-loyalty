use crate::schema::wordpress::common::{MediaSizes};


#[derive(Debug, Serialize, Deserialize, GraphQLObject)]
#[graphql(description="A Wordpress Post")]
pub struct Media {
  pub id: i32,
  pub date: String,
  pub slug: String,
  pub status: String,
  pub media_details: MediaDetails
}

#[derive(Debug, Serialize, Deserialize, GraphQLObject)]
pub struct MediaDetails {
  pub width: i32,
  pub height: i32,
  pub file: String,
  pub sizes: MediaSizes
}
