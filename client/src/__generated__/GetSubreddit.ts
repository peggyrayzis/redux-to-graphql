/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSubreddit
// ====================================================

export interface GetSubreddit_subreddit_posts {
  __typename: "Post";
  title: string;
}

export interface GetSubreddit_subreddit {
  __typename: "Subreddit";
  posts: (GetSubreddit_subreddit_posts | null)[];
  lastUpdated: string;
}

export interface GetSubreddit {
  subreddit: GetSubreddit_subreddit | null;
}

export interface GetSubredditVariables {
  name: string;
}
