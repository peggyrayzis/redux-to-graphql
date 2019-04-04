const { ApolloServer, gql } = require('apollo-server');
const fetch = require('node-fetch');

const typeDefs = gql`
  type Query {
    subreddit(name: String!): Subreddit
  }

  type Subreddit {
    posts: [Post]!
  }

  type Post {
    title: String!
    author: String!
    ups: Int!
  }
`;

const resolvers = {
  Query: {
    subreddit: (root, { name }) => {
      return fetch(`https://www.reddit.com/r/${name}.json`)
        .then(res => res.json())
        .then(({ data }) => data);
    },
  },
  Subreddit: {
    posts: subreddit =>
      subreddit ? subreddit.children.map(child => child.data) : [],
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
