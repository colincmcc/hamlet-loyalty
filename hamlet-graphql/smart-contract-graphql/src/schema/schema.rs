use juniper::{FieldResult, FieldError, RootNode, EmptyMutation};
use crate::schema::wordpress::post::{NewPost, Post, NewPostMut};
use crate::schema::wordpress::page::{Page};
use crate::schema::wordpress::media::{Media};
use reqwest;

pub struct QueryRoot;

graphql_object!(QueryRoot: () as "Query" |&self| {

    field getPost(&executor, id: i32) -> FieldResult<Post> {
        let request_url = format!("https://hauntandhorror.com/wp-json/wp/v2/posts/{id}",
                    id = &id);

        let mut response = reqwest::get(&request_url)?;
        let data: Post = response.json()?;
        println!("{:?}", data);

        Ok(data)
    }

    field getAllPosts(&executor) -> FieldResult<Vec<Post>> {
        let request_url ="https://hauntandhorror.com/wp-json/wp/v2/posts/";

        let mut response = reqwest::get(request_url)?;
        let data: Vec<Post> = response.json()?;
        println!("{:?}", data);

        Ok(data)
    }

    field getPage(&executor, id: i32) -> FieldResult<Page> {
        let request_url = format!("https://hauntandhorror.com/wp-json/wp/v2/pages/{id}",
                    id = &id);

        let mut response = reqwest::get(&request_url)?;
        let data: Page = response.json()?;
        println!("{:?}", data);

        Ok(data)
    }

    field getAllPages(&executor) -> FieldResult<Vec<Page>> {
        let request_url ="https://hauntandhorror.com/wp-json/wp/v2/pages/";

        let mut response = reqwest::get(request_url)?;
        let data: Vec<Page> = response.json()?;
        println!("{:?}", data);

        Ok(data)
    }

    field getMedia(&executor, id: i32) -> FieldResult<Media> {
        let request_url = format!("https://hauntandhorror.com/wp-json/wp/v2/media/{id}",
                    id = &id);

        let mut response = reqwest::get(&request_url)?;
        let data: Media = response.json()?;
        println!("{:?}", data);

        Ok(data)
    }

    field getAllMedia(&executor) -> FieldResult<Vec<Media>> {
        let request_url ="https://hauntandhorror.com/wp-json/wp/v2/media/";

        let mut response = reqwest::get(request_url)?;
        let data: Vec<Media> = response.json()?;
        println!("{:?}", data);

        Ok(data)
    }

});
pub struct MutationRoot;

graphql_object!(MutationRoot: () |&self| {
    field createPost(&executor, new_post: NewPost) -> FieldResult<NewPostMut> {
        Ok(NewPostMut{
            id: 1234.to_owned(),
        })
    }
});

pub type Schema = RootNode<'static, QueryRoot, MutationRoot>;

pub fn create_schema() -> Schema {
    Schema::new(QueryRoot {}, MutationRoot {})
}