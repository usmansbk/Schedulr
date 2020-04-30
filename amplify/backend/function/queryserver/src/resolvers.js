const appsync = require('aws-appsync');
require('isomorphic-fetch');

const { created, following } = require('./queries');
const { filterCreatedSchedules, filterFollowingSchedules } = require('./utils');

const region = process.env.AWS_REGION
const apiSchdlrGraphQLAPIEndpointOutput = process.env.API_SCHDLR_GRAPHQLAPIENDPOINTOUTPUT

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

const resolvers = {
  User: {
    created: async (ctx) => {
      const id = ctx.source.id;
      const {
        data: { getUser: { allCreated } }
      } = await client.query({
        query: created,
        variables: {
          id
        }
      });
      return filterCreatedSchedules(allCreated);
    },
    following: async (ctx) => {
      const id = ctx.source.id;
      const {
        data: { getUser: { allFollowing } }
      } = await client.query({
        query: following,
        variables: {
          id
        }
      });
      return filterFollowingSchedules(allFollowing);
    }
  }
};

module.exports = resolvers;