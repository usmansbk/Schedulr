import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import { Auth } from 'aws-amplify';
import aws_config from '../aws-exports';

export default client = new AWSAppSyncClient({
  url: aws_config.aws_appsync_graphqlEndpoint,
  region: aws_config.aws_appsync_region,
  auth: {
    // type: AUTH_TYPE.API_KEY,
    //apiKey: aws_config.aws_appsync_apiKey,
    type: AUTH_TYPE.AWS_IAM,
    credentials: () => Auth.currentCredentials()
  }
});