/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */
const aws = require('aws-sdk');
const dayjs = require('dayjs');

exports.handler = async function (event, context) { //eslint-disable-line
  const userId = event.identity.claims.email;
  const lastSync = Number(event.arguments.lastSync);
  return [];
};
