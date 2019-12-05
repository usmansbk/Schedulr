import AWSAppSyncClient, { createAppSyncLink } from 'aws-appsync';
import { Auth, I18n } from 'aws-amplify';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import aws_config from 'aws_config';
import logger from './logger';
import stores from 'stores';
import {
  EVENT_TYPE,
  SCHEDULE_TYPE,
  USER_TYPE,
  COMMENT_TYPE
} from 'lib/constants';

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(error => {
      const message = error.message;
      if (message.includes("Not Found")) {
        // Dont log elasticsearch "Not found"
      } else {
        if (__DEV__) {
          stores.snackbar.show(I18n.get('ERROR_serverError')(error.message), true);
        }
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
  offlineConfig: {
    callback: (error, success) => {
      if (error) {
        const { mutation, variables: { input } } = error;
        let message;
        switch(mutation) {
          case 'createEvent':
          case 'updateEvent':
            message = `Failed to save event: ${input.title}`;
            break;
          case 'createSchedule':
          case 'updateSchedule':
            message = `Failed to save schedule: ${input.name}`;
            break;
          case 'createBookmark':
            message = `Failed to bookmark event`;
            break;
          case 'createFollow':
            message = `Failed to follow schedule`;
            break;
          case 'createComment':
            message = `Failed to deliver comment: ${input.content}`;
            break;
          case 'deleteEvent':
            message = `Failed to delete event`;
            break;
          case 'deleteSchedule':
            message = `Failed to delete schedule`;
            break;
          case 'deleteFollow':
            message = `Failed to unfollow schedule`;
            break;
          case 'deleteBookmark':
            message = `Failed to remove bookmark`;
            break;
          case 'deleteComment':
            message = `Failed to delete comment`;
            break;
          default:
            message = `Fatal error`;
            break;
        }
        message = `. Please Sync now and try again.`;
        stores.snackbar.show(message, true);
      }
    }
  }
}, { link });

export default client;