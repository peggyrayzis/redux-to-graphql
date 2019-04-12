import React from 'react';
import * as ApolloTypes from '../__generated__/GetSubreddit';

type Props = {
  posts: Array<ApolloTypes.GetSubreddit_subreddit_posts | null>;
};

const Posts: React.FC<Props> = ({ posts }) => (
  <ul>
    {posts.map(post => post && <li key={post.title}>{`${post.title}`}</li>)}
  </ul>
);

export default Posts;
