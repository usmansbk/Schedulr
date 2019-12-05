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
        let message = '';
        switch(mutation) {
          case 'createEvent':
          case 'updateEvent':
            message = I18n.get(`ERROR_failedToCreateEvent`)(input.title);
            break;
          case 'createSchedule':
          case 'updateSchedule':
            message = I18n.get(`ERROR_failedToCreateSchedule`)(input.name);
            break;
          case 'createComment':
            message = I18n.get(`ERROR_failedToCreateComment`)(input.content);
            break;
          case 'createBookmark':
            message = I18n.get(`ERROR_failedToCreateBookmark`);
            break;
          case 'createFollow':
            message = I18n.get(`ERROR_failedToCreateFollow`);
            break;
          case 'deleteEvent':
            message = I18n.get(`ERROR_failedToDeleteEvent`);
            break;
          case 'deleteSchedule':
            message = I18n.get(`ERROR_failedToDeleteSchedule`);
            break;
          case 'deleteFollow':
            message = I18n.get(`ERROR_failedToDeleteFollow`);
            break;
          case 'deleteBookmark':
            message = I18n.get(`ERROR_failedToDeleteBookmark`);
            break;
          case 'deleteComment':
            message = I18n.get(`ERROR_failedToDeleteComment`);
            break;
          default:
            message = I18n.get(`ERROR_fatal`);
            break;
        }
        message = message + I18n.get('ERROR_configHint');
        stores.snackbar.show(message, true);
      }
    }
  }
}, { link });

export default client;