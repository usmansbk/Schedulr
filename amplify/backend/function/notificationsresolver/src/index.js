/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const FOLLOW_TABLE_NAME = process.env.FOLLOW_TABLE_NAME;
const SCHEDULE_TABLE_NAME = process.env.SCHEDULE_TABLE_NAME;
const EVENT_DELTA_TABLE_NAME = process.env.EVENT_DELTA_TABLE_NAME;
const SCHEDULE_DELTA_TABLE_NAME = process.env.SCHEDULE_DELTA_TABLE_NAME;

const gsiFollowingScheduleEvents = process.env.GSI_FOLLOWING_SCHEDULE_EVENTS;
const gsiFollowingScheduleEventsKey = process.env.GSI_FOLLOWING_SCHEDULE_EVENTS_KEY;
const gsiUserSchedules = process.env.GSI_USER_SCHEDULES;
const gsiUserSchedulesKey = process.env.GSI_USER_SCHEDULES_KEY;
const gsiFollowings = process.env.GSI_FOLLOWINGS;
const gsiFollowingsKey = process.env.GSI_FOLLOWINGS_KEY;

exports.handler = async function (event, context) { //eslint-disable-line
  const id = event.identity.claims.email;
  const lastSync = Number(event.arguments.lastSync);
  console.log('userId', id);
  console.log('lastSync', lastSync);

  const followingIds = await getFieldsById({
    id,
    TableName: FOLLOW_TABLE_NAME,
    IndexName: gsiFollowings,
    primaryKey: gsiFollowingsKey,
    Field: 'followScheduleId'
  });
  const createdIds = await getFieldsById({
    id,
    TableName: SCHEDULE_TABLE_NAME,
    IndexName: gsiUserSchedules,
    primaryKey: gsiUserSchedulesKey,
    Field: 'id'
  });
  console.log('followingIds',followingIds);
  console.log('createdIds', createdIds);

  // Get following schedules events updates
  const followingScheduleEventsUpdates = await queryIndexByIds({
    ids:followingIds,
    lastSync,
    primaryKey: gsiFollowingScheduleEventsKey,
    TableName: EVENT_DELTA_TABLE_NAME,
    IndexName: gsiFollowingScheduleEvents
  });
  console.log('following schedules events updates', JSON.stringify(followingScheduleEventsUpdates));
  
  // Get following schedules updates
  const followingSchedulesUpdates = await queryTableByIds({
    ids: followingIds,
    lastSync,
    primaryKey: 'id',
    TableName: SCHEDULE_DELTA_TABLE_NAME
  });
  console.log('following schedules updates', JSON.stringify(followingSchedulesUpdates));
  // Get created events comments
  // Get following schedules events admins comments
  // Get comments replies
  // Get new followers updates
  // Get new bookmarks updates

  return [];
};

async function queryTableByIds({
  ids,
  lastSync,
  TableName,
  primaryKey
}) {
  const items = [];
  for (let id of ids) {
    const params = {
      TableName,
      KeyConditionExpression: '#key = :id and #timestamp > :lastSync',
      ExpressionAttributeValues: {
        ':id': id,
        ':lastSync': lastSync
      },
      ExpressionAttributeNames: {
        '#key': primaryKey,
        '#timestamp': 'timestamp'
      }
    };
    const group = {
      id,
      items: []
    };
    try {
      const { Items, LastEvaluatedKey } = await dynamodb.query(params).promise();
      group.items = Items;
      let ExclusiveStartKey = LastEvaluatedKey;
      while(ExclusiveStartKey) {
        params.ExclusiveStartKey = ExclusiveStartKey;
        const { Items, LastEvaluatedKey }= await dynamodb.query(params).promise();
        group.items = [...group.items, ...Items];
        ExclusiveStartKey = LastEvaluatedKey;
      }
    } catch(error) {
      console.error(error);
    }
    items.push(group);
  }
  return items;
}

async function queryIndexByIds({
  ids,
  lastSync,
  primaryKey,
  TableName,
  IndexName,
}) {
  const items = [];
  for (let id of ids) {
    const params = {
      TableName,
      IndexName,
      KeyConditionExpression: '#key = :id and #timestamp > :lastSync',
      ExpressionAttributeValues: {
        ':id': id,
        ':lastSync': lastSync
      },
      ExpressionAttributeNames: {
        '#key': primaryKey,
        '#timestamp': 'timestamp'
      }
    };
    const group = {
      id,
      items: []
    };
    try {
      const { Items, LastEvaluatedKey } = await dynamodb.query(params).promise();
      group.items = Items;
      let ExclusiveStartKey = LastEvaluatedKey;
      while(ExclusiveStartKey) {
        params.ExclusiveStartKey = ExclusiveStartKey;
        const { Items, LastEvaluatedKey }= await dynamodb.query(params).promise();
        group.items = [...group.items, ...Items];
        ExclusiveStartKey = LastEvaluatedKey;
      }
    } catch(error) {
      console.error(error);
    }
    items.push(group);
  }
  return items;
}

async function getFieldsById({
  id,
  TableName,
  IndexName,
  primaryKey,
  Field
}) {
  let items = [];
  const params = {
    TableName,
    IndexName,
    KeyConditionExpression: '#key = :id',
    ExpressionAttributeNames: {
      '#key': primaryKey 
    },
    ExpressionAttributeValues: {
      ':id': id 
    }
  };
  try {
    const { Items, LastEvaluatedKey }= await dynamodb.query(params).promise();
    items = Items;
    let ExclusiveStartKey = LastEvaluatedKey;
    while(ExclusiveStartKey) {
      params.ExclusiveStartKey = ExclusiveStartKey;
      const { Items, LastEvaluatedKey }= await dynamodb.query(params).promise();
      items = [...items, ...Items];
      ExclusiveStartKey = LastEvaluatedKey;
    }
  } catch(error) {
    console.log(error);
  }
  return items.map(item => item[Field]);
}
