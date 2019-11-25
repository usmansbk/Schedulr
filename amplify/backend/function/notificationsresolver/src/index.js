/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk');
const dayjs = require('dayjs');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const gsiFollowings = process.env.GSI_FOLLOWINGS;
const gsiFollowingsKey = process.env.GSI_FOLLOWINGS_KEY;

exports.handler = async function (event, context) { //eslint-disable-line
  const userId = event.identity.claims.email;
  const lastSync = Number(event.arguments.lastSync);

  const followings = await getFollowings(userId);
  const createdIds = await getCreatedScheduleIds(userId);
  const bookmarkIds = await getBookmarkIds(userId);
  
  // Get following schedules events updates
  // Get following schedules status updates
  // Get created events comments
  // Get following schedules events admins comments
  // Get comments replies
  // Get new followers updates
  // Get new bookmarks updates

  return [];
};

async function getFollowings(userId) {

} 

async function getCreatedScheduleIds(userId) {

}

async function getBookmarkIds(userId) {

}