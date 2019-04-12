import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import Picker from './components/Picker';
import Posts from './components/Posts';

import * as ApolloTypes from './__generated__/GetSubreddit';

const clientSchema = gql`
  extend type Subreddit {
    lastUpdated: String!
  }
`;

const resolvers = {
  Subreddit: {
    lastUpdated: () => new Date(Date.now()).toLocaleTimeString(),
  },
};

const GET_SUBREDDIT = gql`
  query GetSubreddit($name: String!) {
    subreddit(name: $name) {
      posts {
        title
      }
      lastUpdated @client
    }
  }
`;

const App: React.FC = () => {
  const [selectedSubreddit, setSelectedSubreddit] = useState('reactjs');

  return (
    <Query<ApolloTypes.GetSubreddit, ApolloTypes.GetSubredditVariables>
      query={GET_SUBREDDIT}
      variables={{ name: selectedSubreddit }}
      notifyOnNetworkStatusChange
    >
      {({ data, loading, error, refetch, networkStatus, client }) => {
        client.addResolvers(resolvers);

        const refetching = networkStatus === 4;

        if (loading && !refetching) return <h2>Loading...</h2>;
        if (error) return <h2>{`Error: ${error}`}</h2>;

        return (
          <div>
            <Picker
              value={selectedSubreddit}
              onChange={setSelectedSubreddit}
              options={['reactjs', 'frontend']}
            />
            <p>
              <span>
                {data &&
                  `Last updated at ${data.subreddit &&
                    data.subreddit.lastUpdated}.`}
              </span>
              {!loading && <button onClick={() => refetch()}>Refresh</button>}
            </p>
            <div style={{ opacity: refetching ? 0.5 : 1 }}>
              <Posts
                posts={data && data.subreddit ? data.subreddit.posts : []}
              />
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default App;
