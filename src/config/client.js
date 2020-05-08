import AWSAppSyncClient, { createAppSyncLink } from 'aws-appsync';
import { Auth, I18n } from 'aws-amplify';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import aws_config from 'aws_config';
import logger from './logger';
import {
  EVENT_TYPE,
  SCHEDULE_TYPE,
  USER_TYPE,
  COMMENT_TYPE
} from 'lib/constants';
import snackbar from 'helpers/snackbar';

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(error => {
      const message = error.message;
      if (message.includes("Not Found") || message.includes("Token")) {
        // Dont log elasticsearch "Not found"
        // Dont log server token expired
      } else if (message.includes("The conditional request failed")) {
        logger.logError(error);
      }else {
        snackbar(I18n.get('ERROR_serverError')(error.message), true);
        logger.logError(error);
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
}, { link });

export default client;