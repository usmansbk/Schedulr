const AWS = require('aws-sdk');
const appsync = require('aws-appsync');
require('isomorphic-fetch');

const { created, following } = require('./queries');

const region = process.env.AWS_REGION
const apiSchdlrGraphQLAPIEndpointOutput = process.env.API_SCHDLR_GRAPHQLAPIENDPOINTOUTPUT

// AWS.config.update({
//   region,
//   credentials: new AWS.Credentials(
//     process.env.AWS_ACCESS_KEY_ID,
//     process.env.AWS_SECRET_ACCESS_KEY,
//     process.env.AWS_SESSION_TOKENV
//   ),
// });
// const credentials = AWS.config.credentials;

const client = new appsync.AWSAppSyncClient(
  {
    url: apiSchdlrGraphQLAPIEndpointOutput,
    region,
    auth: {
      type: appsync.AUTH_TYPE.AWS_IAM,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN
      }
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
    created: async (ctx) => {
      const id = ctx.source.id;
      console.log('user', region, id);
      const response = await client.query({
        query: created,
        variables: {
          id
        }
      });
      console.log(JSON.stringify(response));
      return ModelConnection;
    },
    following: (ctx) => {
      return ModelConnection;
    }
  }
};

module.exports = resolvers;