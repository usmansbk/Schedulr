import AWSAppSyncClient from 'aws-appsync';
import { Auth } from 'aws-amplify';
import aws_config from '../aws-exports';

export default client = new AWSAppSyncClient({
  url: aws_config.aws_appsync_graphqlEndpoint,
  region: aws_config.aws_appsync_region,
  auth: {
    // type: AUTH_TYPE.API_KEY,
    // apiKey: aws_config.aws_appsync_apiKey,
    type: aws_config.aws_appsync_authenticationType,
    credentials: () => Auth.currentCredentials()
  },
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
});