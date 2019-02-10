use actix::prelude::Message;
use actix_web::{ Error };
use juniper::http::GraphQLRequest;



#[derive(GraphQLObject)]
pub struct ValidationError {
    pub field: String,
    pub message: String,
}

pub struct QueryResult<T>(Result<T, Vec<ValidationError>>);

#[derive(Serialize, Deserialize)]
pub struct GraphQLData(pub GraphQLRequest);

impl Message for GraphQLData {
    type Result = Result<String, Error>;
}