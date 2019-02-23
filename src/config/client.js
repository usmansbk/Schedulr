import AWSAppSyncClient from 'aws-appsync';
import { Auth } from 'aws-amplify';
import aws_config from '../aws-exports';

const client = new AWSAppSyncClient({
  url: aws_config.aws_appsync_graphqlEndpoint,
  region: aws_config.aws_appsync_region,
  auth: {
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
          getCacheKey({ __typename: 'User', id: args.id })),
        getComment: (_, args, { getCacheKey }) => (
          getCacheKey({ __typename: 'Comment', id: args.id })
        )
      },
    }
  }
});

export default client;