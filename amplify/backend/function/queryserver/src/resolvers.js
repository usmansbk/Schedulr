const AWS = require('aws-sdk');
const appsync = require('aws-appsync');
const gql = require('graphql-tag');

const region = process.env.REGION
const apiSchdlrGraphQLAPIEndpointOutput = process.env.API_SCHDLR_GRAPHQLAPIENDPOINTOUTPUT

AWS.config.update({
  region,
  credentials: new AWS.Credentials(
    process.env.AWS_ACCESS_KEY_ID,
    process.env.AWS_SECRET_ACCESS_KEY,
    process.env.AWS_SESSION_TOKEN
  ),
});
const credentials = AWS.config.credentials;

const client = new appsync.AWSAppSyncClient(
  {
    url: apiSchdlrGraphQLAPIEndpointOutput,
    region,
    auth: {
      type: appsync.AUTH_TYPE.AWS_IAM,
      credentials
    },
    disableOffline: true,
  },
  {
    defaultOptions: {
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all'
      }
    }
  }
);

const ModelConnection = {
  items: [],
  nextToken: null
};

const resolvers = {
  User: {
    created: (ctx) => {
      return ModelConnection;
    },
    following: (ctx) => {
      return ModelConnection;
    }
  }
};

module.exports = resolvers;