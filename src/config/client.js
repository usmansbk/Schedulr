import AWSAppSyncClient, { createAppSyncLink } from 'aws-appsync';
import { Auth, Analytics } from 'aws-amplify';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import SimpleToast from 'react-native-simple-toast';
import aws_config from '../../aws-exports';
import logger from './logger';

Analytics.disable();

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(error => {
      logger.log(error);
      SimpleToast.show('Server error: ' + error.message, SimpleToast.LONG);
      Analytics.record({
        name: 'GraphQLError',
        attributes: {
          errorName: error.name,
          errorMessage: error.message,
          errorLocation: error.locations,
          errorPath: error.path,
        }
      });
    });  
  } else if (networkError) SimpleToast.show("No connection", SimpleToast.SHORT);
});

const appSyncLink = createAppSyncLink({
  url: aws_config.aws_appsync_graphqlEndpoint,
  region: aws_config.aws_appsync_region,
  auth: {
    type: aws_config.aws_appsync_authenticationType,
    jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
  },
  complexObjectsCredentials: () => Auth.currentCredentials(),
});

const link = ApolloLink.from([errorLink, appSyncLink]);

const client = new AWSAppSyncClient({
  cacheOptions: {
    cacheRedirects: {
      Query: {
        getSchedule: (_, args, { getCacheKey }) => (
          getCacheKey({ __typename: 'Schedule', id: args.id })),
        getEvent: (_, args, { getCacheKey }) => (
          getCacheKey({ __typename: 'Event', id: args.id })),
        getUser: (_, args, { getCacheKey }) => (
          getCacheKey({ __typename: 'User', id: args.id })),
        getComment: (_, args, { getCacheKey }) => (
          getCacheKey({ __typename: 'Comment', id: args.id })
        )
      },
    }
  },
}, { link });

export default client;