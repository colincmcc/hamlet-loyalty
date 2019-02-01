
#[derive(Debug, Serialize, Deserialize, GraphQLObject)]
pub struct Rendered {
  pub rendered: String
}

#[derive(Debug, Serialize, Deserialize, GraphQLObject)]
pub struct MediaSizes {
  thumbnail: ImageSize,
  medium: ImageSize,
  medium_large: ImageSize,
  large: ImageSize,
  full: ImageSize,
}

#[derive(Debug, Serialize, Deserialize, GraphQLObject)]
struct ImageSize {
  file: String,
  width: i32,
  height: i32,
  mime_type: String,
  source_url: String
}