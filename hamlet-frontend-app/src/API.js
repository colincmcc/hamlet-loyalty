/* @flow */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateBlogInput = {|
  name: string,
|};

export type UpdateBlogInput = {|
  id: string,
  name?: ?string,
|};

export type DeleteBlogInput = {|
  id?: ?string,
|};

export type CreatePostInput = {|
  title: string,
  postBlogId?: ?string,
|};

export type UpdatePostInput = {|
  id: string,
  title?: ?string,
  postBlogId?: ?string,
|};

export type DeletePostInput = {|
  id?: ?string,
|};

export type CreateCommentInput = {|
  content?: ?string,
  commentPostId?: ?string,
|};

export type UpdateCommentInput = {|
  id: string,
  content?: ?string,
  commentPostId?: ?string,
|};

export type DeleteCommentInput = {|
  id?: ?string,
|};

export type ModelBlogFilterInput = {|
  id?: ?ModelIDFilterInput,
  name?: ?ModelStringFilterInput,
  and?: ?Array< ?ModelBlogFilterInput >,
  or?: ?Array< ?ModelBlogFilterInput >,
  not?: ?ModelBlogFilterInput,
|};

export type ModelIDFilterInput = {|
  ne?: ?string,
  eq?: ?string,
  le?: ?string,
  lt?: ?string,
  ge?: ?string,
  gt?: ?string,
  contains?: ?string,
  notContains?: ?string,
  between?: ?Array< ?string >,
  beginsWith?: ?string,
|};

export type ModelStringFilterInput = {|
  ne?: ?string,
  eq?: ?string,
  le?: ?string,
  lt?: ?string,
  ge?: ?string,
  gt?: ?string,
  contains?: ?string,
  notContains?: ?string,
  between?: ?Array< ?string >,
  beginsWith?: ?string,
|};

export type ModelPostFilterInput = {|
  id?: ?ModelIDFilterInput,
  title?: ?ModelStringFilterInput,
  and?: ?Array< ?ModelPostFilterInput >,
  or?: ?Array< ?ModelPostFilterInput >,
  not?: ?ModelPostFilterInput,
|};

export type ModelCommentFilterInput = {|
  id?: ?ModelIDFilterInput,
  content?: ?ModelStringFilterInput,
  and?: ?Array< ?ModelCommentFilterInput >,
  or?: ?Array< ?ModelCommentFilterInput >,
  not?: ?ModelCommentFilterInput,
|};

export type CreateBlogMutationVariables = {|
  input: CreateBlogInput,
|};

export type CreateBlogMutation = {|
  createBlog: ? {|
    __typename: "Blog",
    id: string,
    name: string,
    posts: ? {|
      __typename: string,
      items: ? Array<? {|
        __typename: string,
        id: string,
        title: string,
      |} >,
      nextToken: ?string,
    |},
  |},
|};

export type UpdateBlogMutationVariables = {|
  input: UpdateBlogInput,
|};

export type UpdateBlogMutation = {|
  updateBlog: ? {|
    __typename: "Blog",
    id: string,
    name: string,
    posts: ? {|
      __typename: string,
      items: ? Array<? {|
        __typename: string,
        id: string,
        title: string,
      |} >,
      nextToken: ?string,
    |},
  |},
|};

export type DeleteBlogMutationVariables = {|
  input: DeleteBlogInput,
|};

export type DeleteBlogMutation = {|
  deleteBlog: ? {|
    __typename: "Blog",
    id: string,
    name: string,
    posts: ? {|
      __typename: string,
      items: ? Array<? {|
        __typename: string,
        id: string,
        title: string,
      |} >,
      nextToken: ?string,
    |},
  |},
|};

export type CreatePostMutationVariables = {|
  input: CreatePostInput,
|};

export type CreatePostMutation = {|
  createPost: ? {|
    __typename: "Post",
    id: string,
    title: string,
    blog: ? {|
      __typename: string,
      id: string,
      name: string,
    |},
    comments: ? {|
      __typename: string,
      items: ? Array<? {|
        __typename: string,
        id: string,
        content: ?string,
      |} >,
      nextToken: ?string,
    |},
  |},
|};

export type UpdatePostMutationVariables = {|
  input: UpdatePostInput,
|};

export type UpdatePostMutation = {|
  updatePost: ? {|
    __typename: "Post",
    id: string,
    title: string,
    blog: ? {|
      __typename: string,
      id: string,
      name: string,
    |},
    comments: ? {|
      __typename: string,
      items: ? Array<? {|
        __typename: string,
        id: string,
        content: ?string,
      |} >,
      nextToken: ?string,
    |},
  |},
|};

export type DeletePostMutationVariables = {|
  input: DeletePostInput,
|};

export type DeletePostMutation = {|
  deletePost: ? {|
    __typename: "Post",
    id: string,
    title: string,
    blog: ? {|
      __typename: string,
      id: string,
      name: string,
    |},
    comments: ? {|
      __typename: string,
      items: ? Array<? {|
        __typename: string,
        id: string,
        content: ?string,
      |} >,
      nextToken: ?string,
    |},
  |},
|};

export type CreateCommentMutationVariables = {|
  input: CreateCommentInput,
|};

export type CreateCommentMutation = {|
  createComment: ? {|
    __typename: "Comment",
    id: string,
    content: ?string,
    post: ? {|
      __typename: string,
      id: string,
      title: string,
    |},
  |},
|};

export type UpdateCommentMutationVariables = {|
  input: UpdateCommentInput,
|};

export type UpdateCommentMutation = {|
  updateComment: ? {|
    __typename: "Comment",
    id: string,
    content: ?string,
    post: ? {|
      __typename: string,
      id: string,
      title: string,
    |},
  |},
|};

export type DeleteCommentMutationVariables = {|
  input: DeleteCommentInput,
|};

export type DeleteCommentMutation = {|
  deleteComment: ? {|
    __typename: "Comment",
    id: string,
    content: ?string,
    post: ? {|
      __typename: string,
      id: string,
      title: string,
    |},
  |},
|};

export type GetBlogQueryVariables = {|
  id: string,
|};

export type GetBlogQuery = {|
  getBlog: ? {|
    __typename: "Blog",
    id: string,
    name: string,
    posts: ? {|
      __typename: string,
      items: ? Array<? {|
        __typename: string,
        id: string,
        title: string,
      |} >,
      nextToken: ?string,
    |},
  |},
|};

export type ListBlogsQueryVariables = {|
  filter?: ?ModelBlogFilterInput,
  limit?: ?number,
  nextToken?: ?string,
|};

export type ListBlogsQuery = {|
  listBlogs: ? {|
    __typename: "ModelBlogConnection",
    items: ? Array<? {|
      __typename: string,
      id: string,
      name: string,
      posts: ? {|
        __typename: string,
        items: ? Array<? {|
          __typename: string,
          id: string,
          title: string,
        |} >,
        nextToken: ?string,
      |},
    |} >,
    nextToken: ?string,
  |},
|};

export type GetPostQueryVariables = {|
  id: string,
|};

export type GetPostQuery = {|
  getPost: ? {|
    __typename: "Post",
    id: string,
    title: string,
    blog: ? {|
      __typename: string,
      id: string,
      name: string,
    |},
    comments: ? {|
      __typename: string,
      items: ? Array<? {|
        __typename: string,
        id: string,
        content: ?string,
      |} >,
      nextToken: ?string,
    |},
  |},
|};

export type ListPostsQueryVariables = {|
  filter?: ?ModelPostFilterInput,
  limit?: ?number,
  nextToken?: ?string,
|};

export type ListPostsQuery = {|
  listPosts: ? {|
    __typename: "ModelPostConnection",
    items: ? Array<? {|
      __typename: string,
      id: string,
      title: string,
      blog: ? {|
        __typename: string,
        id: string,
        name: string,
      |},
      comments: ? {|
        __typename: string,
        items: ? Array<? {|
          __typename: string,
          id: string,
          content: ?string,
        |} >,
        nextToken: ?string,
      |},
    |} >,
    nextToken: ?string,
  |},
|};

export type GetCommentQueryVariables = {|
  id: string,
|};

export type GetCommentQuery = {|
  getComment: ? {|
    __typename: "Comment",
    id: string,
    content: ?string,
    post: ? {|
      __typename: string,
      id: string,
      title: string,
    |},
  |},
|};

export type ListCommentsQueryVariables = {|
  filter?: ?ModelCommentFilterInput,
  limit?: ?number,
  nextToken?: ?string,
|};

export type ListCommentsQuery = {|
  listComments: ? {|
    __typename: "ModelCommentConnection",
    items: ? Array<? {|
      __typename: string,
      id: string,
      content: ?string,
      post: ? {|
        __typename: string,
        id: string,
        title: string,
      |},
    |} >,
    nextToken: ?string,
  |},
|};

export type OnCreateBlogSubscription = {|
  onCreateBlog: ? {|
    __typename: "Blog",
    id: string,
    name: string,
    posts: ? {|
      __typename: string,
      items: ? Array<? {|
        __typename: string,
        id: string,
        title: string,
      |} >,
      nextToken: ?string,
    |},
  |},
|};

export type OnUpdateBlogSubscription = {|
  onUpdateBlog: ? {|
    __typename: "Blog",
    id: string,
    name: string,
    posts: ? {|
      __typename: string,
      items: ? Array<? {|
        __typename: string,
        id: string,
        title: string,
      |} >,
      nextToken: ?string,
    |},
  |},
|};

export type OnDeleteBlogSubscription = {|
  onDeleteBlog: ? {|
    __typename: "Blog",
    id: string,
    name: string,
    posts: ? {|
      __typename: string,
      items: ? Array<? {|
        __typename: string,
        id: string,
        title: string,
      |} >,
      nextToken: ?string,
    |},
  |},
|};

export type OnCreatePostSubscription = {|
  onCreatePost: ? {|
    __typename: "Post",
    id: string,
    title: string,
    blog: ? {|
      __typename: string,
      id: string,
      name: string,
    |},
    comments: ? {|
      __typename: string,
      items: ? Array<? {|
        __typename: string,
        id: string,
        content: ?string,
      |} >,
      nextToken: ?string,
    |},
  |},
|};

export type OnUpdatePostSubscription = {|
  onUpdatePost: ? {|
    __typename: "Post",
    id: string,
    title: string,
    blog: ? {|
      __typename: string,
      id: string,
      name: string,
    |},
    comments: ? {|
      __typename: string,
      items: ? Array<? {|
        __typename: string,
        id: string,
        content: ?string,
      |} >,
      nextToken: ?string,
    |},
  |},
|};

export type OnDeletePostSubscription = {|
  onDeletePost: ? {|
    __typename: "Post",
    id: string,
    title: string,
    blog: ? {|
      __typename: string,
      id: string,
      name: string,
    |},
    comments: ? {|
      __typename: string,
      items: ? Array<? {|
        __typename: string,
        id: string,
        content: ?string,
      |} >,
      nextToken: ?string,
    |},
  |},
|};

export type OnCreateCommentSubscription = {|
  onCreateComment: ? {|
    __typename: "Comment",
    id: string,
    content: ?string,
    post: ? {|
      __typename: string,
      id: string,
      title: string,
    |},
  |},
|};

export type OnUpdateCommentSubscription = {|
  onUpdateComment: ? {|
    __typename: "Comment",
    id: string,
    content: ?string,
    post: ? {|
      __typename: string,
      id: string,
      title: string,
    |},
  |},
|};

export type OnDeleteCommentSubscription = {|
  onDeleteComment: ? {|
    __typename: "Comment",
    id: string,
    content: ?string,
    post: ? {|
      __typename: string,
      id: string,
      title: string,
    |},
  |},
|};