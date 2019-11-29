/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk');
const { processUpdates, processEvents } = require('./updatesProcessor');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const FOLLOW_TABLE_NAME = process.env.FOLLOW_TABLE_NAME;
const BOOKMARK_TABLE_NAME = process.env.BOOKMARK_TABLE_NAME;
const EVENT_DELTA_TABLE_NAME = process.env.EVENT_DELTA_TABLE_NAME;
const SCHEDULE_DELTA_TABLE_NAME = process.env.SCHEDULE_DELTA_TABLE_NAME;

const gsiFollowingScheduleEvents = process.env.GSI_FOLLOWING_SCHEDULE_EVENTS;
const gsiFollowingScheduleEventsKey = process.env.GSI_FOLLOWING_SCHEDULE_EVENTS_KEY;
const gsiFollowings = process.env.GSI_FOLLOWINGS;
const gsiFollowingsKey = process.env.GSI_FOLLOWINGS_KEY;
const gsiUserBookmarks = process.env.GSI_USER_BOOKMARKS;
const gsiUserBookmarksKey = process.env.GSI_USER_BOOKMARKS_KEY;

exports.handler = async function (event) { //eslint-disable-line
  const id = event.identity.claims.email;
  const lastSync = Number(event.arguments.lastSync);

  const followingIds = await getFieldsById({
    id,
    TableName: FOLLOW_TABLE_NAME,
    IndexName: gsiFollowings,
    primaryKey: gsiFollowingsKey,
    Field: 'followScheduleId'
  });
  const bookmarksIds = await getFieldsById({
    id,
    TableName: BOOKMARK_TABLE_NAME,
    IndexName: gsiUserBookmarks,
    primaryKey: gsiUserBookmarksKey,
    Field: 'bookmarkEventId'
  });

  // Get following schedules events updates
  const followingScheduleEventsUpdates = await queryIndexByIds({
    ids:followingIds,
    lastSync,
    primaryKey: gsiFollowingScheduleEventsKey,
    TableName: EVENT_DELTA_TABLE_NAME,
    IndexName: gsiFollowingScheduleEvents
  });
  
  // Get following schedules updates
  const followingSchedulesUpdates = await queryTableByIds({
    ids: followingIds,
    lastSync,
    primaryKey: 'id',
    TableName: SCHEDULE_DELTA_TABLE_NAME
  });
  
  // Get bookmarks updates of schedule events user isn't following or created
  const expValues = {
    ':author': id,
  };
  const expNames = {
    '#author': 'eventAuthorId',
  };
  for (let index in followingIds) {
    const key = `:item${index}`;
    const value = followingIds[index];
    expValues[key] = value;
  }
  
  let FilterExpression = `(NOT (#author = :author))`;
  const inExp = Object.keys(expValues).toString();
  if (inExp) {
    expNames['#filter'] = 'eventScheduleId';
    FilterExpression = `${FilterExpression} and (NOT (#filter IN (${inExp})))`;
  }
  const bookmarksUpdates = await queryTableByIds({
    ids: bookmarksIds,
    lastSync,
    primaryKey: 'id',
    TableName: EVENT_DELTA_TABLE_NAME,
    FilterExpression,
    expNames,
    expValues
  });

  const events = processEvents(followingScheduleEventsUpdates);
  const bookmarks = processUpdates(bookmarksUpdates);
  const schedules = processUpdates(followingSchedulesUpdates);

  return {
    events: [...events, ...bookmarks],
    schedules: schedules 
  };
};

async function queryTableByIds({
  ids,
  lastSync,
  TableName,
  primaryKey,
  FilterExpression,
  expValues={},
  expNames={}
}) {
  const items = [];
  for (let id of ids) {
    const params = {
      TableName,
      KeyConditionExpression: '#key = :id and #timestamp > :lastSync',
      FilterExpression,
      ExpressionAttributeValues: {
        ':id': id,
        ':lastSync': lastSync,
        ...expValues
      },
      ExpressionAttributeNames: {
        '#key': primaryKey,
        '#timestamp': 'timestamp',
        ...expNames
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
