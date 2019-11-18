import AWSAppSyncClient, { createAppSyncLink } from 'aws-appsync';
import { Auth, Analytics, I18n } from 'aws-amplify';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import SimpleToast from 'react-native-simple-toast';
import aws_config from 'aws_config';
import {
  EVENT_TYPE,
  SCHEDULE_TYPE,
  USER_TYPE,
  COMMENT_TYPE
} from 'lib/constants';

// Analytics.disable();

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(error => {
      const message = error.message;
      if (message.includes("Not Found")) {
        // Dont log elasticsearch "Not found"
      } else {
        SimpleToast.show(I18n.get('ERROR_serverError')(error.message), SimpleToast.LONG);
        console.log(error);
        Analytics.record({
          name: 'GraphQLError',
          attributes: {
            errorName: error.name,
            errorMessage: error.message,
          }
        }).catch((e) => { /* Ignore */});
      }
    });  
  }
  if (__DEV__) return;
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
          getCacheKey({ __typename: SCHEDULE_TYPE, id: args.id })),
        getEvent: (_, args, { getCacheKey }) => (
          getCacheKey({ __typename: EVENT_TYPE, id: args.id })),
        getUser: (_, args, { getCacheKey }) => (
          getCacheKey({ __typename: USER_TYPE, id: args.id })),
        getComment: (_, args, { getCacheKey }) => (
          getCacheKey({ __typename: COMMENT_TYPE, id: args.id })
        )
      },
    }
  },
  offlineConfig: {
    callback: (error) => {
      if (error) {
        console.log(error);
        SimpleToast.show(error.message, SimpleToast.SHORT);
      }
    }
  }
}, { link });

export default client;