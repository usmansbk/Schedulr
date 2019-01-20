import AWSAppSyncClient, {
  createAppSyncLink,
  createLinkWithCache,
} from 'aws-appsync';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { Auth } from 'aws-amplify';
import aws_config from '../aws-exports';
import {
  defaults,
  resolvers
} from '../graphql/localstate';

const stateLink = createLinkWithCache(cache => withClientState({
  cache,
  resolvers,
  defaults
}));

const appSyncLink = createAppSyncLink({
  url: aws_config.aws_appsync_graphqlEndpoint,
  region: aws_config.aws_appsync_region,
  auth: {
    // type: AUTH_TYPE.API_KEY,
    // apiKey: aws_config.aws_appsync_apiKey,
    type: aws_config.aws_appsync_authenticationType,
    credentials: () => Auth.currentCredentials()
  }
});

const link = ApolloLink.from([stateLink, appSyncLink]);

const client = new AWSAppSyncClient({
  cacheOptions: {
    cacheRedirects: {
      Query: {
        getBoard: (_, args, { getCacheKey }) => (
          getCacheKey({ __typename: 'Board', id: args.id })),
        getEvent: (_, args, { getCacheKey }) => (
          getCacheKey({ __typename: 'Event', id: args.id })),
        getUser: (_, args, { getCacheKey }) => (
          getCacheKey({ __typename: 'User', id: args.id }))
      }
    }
  }
}, { link });

client.onResetStore(stateLink.writeDefaults);

export default client;