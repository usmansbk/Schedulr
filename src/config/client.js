import AWSAppSyncClient from 'aws-appsync';
import aws_config from '../aws-exports';

export default client = new AWSAppSyncClient({
  url: aws_config.aws_appsync_graphqlEndpoint,
  region: aws_config.aws_appsync_region,
  auth: {
    type: aws_config.aws_appsync_authenticationType,
    apiKey: aws_config.aws_appsync_apiKey,
  }
});