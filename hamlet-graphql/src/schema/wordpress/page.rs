use crate::schema::wordpress::common::{Rendered};

#[derive(Debug, Serialize, Deserialize, GraphQLObject)]
#[graphql(description="A Wordpress Page")]
pub struct Page {
  pub id: i32,
  pub date: String,
  pub slug: String,
  pub status: String,
  pub link: String,
  pub title: Rendered,
  pub content: Rendered,
  pub excerpt: Rendered,
  pub author: i32,
  pub featured_media: i32,
  #[serde(rename = "type")]
  type_: String
}

