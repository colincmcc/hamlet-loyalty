use crate::schema::wordpress::common::{Rendered};
use crate::schema::common::{ValidationError};
use juniper::{FieldResult, FieldError};

use crate::schema::wordpress::media::{Media};

// At the moment serde does not serialize traits or impl
// NewPost and NewPostMut are placeholder structs for an empty RootMutation

#[derive(GraphQLInputObject)]
#[graphql(description = "A humanoid creature in the Star Wars universe")]
pub struct NewPost {
    pub id: i32
}

#[derive(GraphQLObject)]
#[graphql(description = "A humanoid creature in the Star Wars universe")]
pub struct NewPostMut {
    pub id: i32
}

#[derive(Debug, Serialize, Deserialize)]
#[graphql(description="A Wordpress Post")]
pub struct Post {
  pub id: i32,
  pub date: String,
  pub slug: String,
  pub status: String,
  pub link: String,
  pub title: Rendered,
  pub content: Rendered,
  pub author: i32,
  pub featured_media: i32,
  #[serde(rename = "type")]
  type_: String
}

graphql_object!(Post: () |&self| {
    field id() -> i32 {
        self.id
    }

    field date() -> &str {
        self.date.as_str()
    }

    field slug() -> &str {
        self.slug.as_str()
    }

    field status() -> &str {
        self.status.as_str()
    }

    field link() -> &str {
        self.link.as_str()
    }

    field title() -> Rendered {
        Rendered {
          rendered: self.title.rendered.to_owned()
        }
    }

    field content() -> Rendered {
        Rendered {
          rendered: self.content.rendered.to_owned()
        }
    }

    field author() -> i32 {
        self.author
    }

    field type_() -> &str {
        self.type_.as_str()
    }

    field featured_media_details(&executor) -> FieldResult<Media> {
        let id = self.featured_media;
        println!("{:?}", id);

        let request_url = format!("https://hauntandhorror.com/wp-json/wp/v2/media/{id}",
                    id = &id);

        let mut response = reqwest::get(&request_url)?;
        let data: Media = response.json()?;
        println!("{:?}", data);

        Ok(data)
    }
});
