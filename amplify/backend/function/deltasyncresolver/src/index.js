/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const FOLLOW_TABLE_NAME = process.env.FOLLOW_TABLE_NAME;
const SCHEDULE_TABLE_NAME = process.env.SCHEDULE_TABLE_NAME;
const BOOKMARK_TABLE_NAME = process.env.BOOKMARK_TABLE_NAME;
const EVENT_DELTA_TABLE_NAME = process.env.EVENT_DELTA_TABLE_NAME;
const SCHEDULE_DELTA_TABLE_NAME = process.env.SCHEDULE_DELTA_TABLE_NAME;

const gsiFollowingScheduleEvents = process.env.GSI_FOLLOWING_SCHEDULE_EVENTS;
const gsiFollowingScheduleEventsKey = process.env.GSI_FOLLOWING_SCHEDULE_EVENTS_KEY;
const gsiUserSchedules = process.env.GSI_USER_SCHEDULES;
const gsiUserSchedulesKey = process.env.GSI_USER_SCHEDULES_KEY;
const gsiFollowings = process.env.GSI_FOLLOWINGS;
const gsiFollowingsKey = process.env.GSI_FOLLOWINGS_KEY;
const gsiUserBookmarks = process.env.GSI_USER_BOOKMARKS;
const gsiUserBookmarksKey = process.env.GSI_USER_BOOKMARKS_KEY;

exports.handler = async function (event) { //eslint-disable-line
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
  const bookmarksIds = await getFieldsById({
    id,
    TableName: BOOKMARK_TABLE_NAME,
    IndexName: gsiUserBookmarks,
    primaryKey: gsiUserBookmarksKey,
    Field: 'bookmarkEventId'
  });
  // console.log('followingIds',followingIds);
  // console.log('createdIds', createdIds);
  // console.log('bookmarksIds', bookmarksIds);

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
  
  // Get bookmarks updates
  const bookmarksUpdates = await queryBookmarksTableByIds({
    ids: bookmarksIds,
    lastSync,
    primaryKey: 'id',
    userId: id,
    filterIds: followingIds,
    TableName: EVENT_DELTA_TABLE_NAME
  });
  console.log('bookmarks updates', JSON.stringify(bookmarksUpdates));

  return {
    events: [],
    schedules: []
  };
};

async function queryBookmarksTableByIds({
  ids,
  lastSync,
  userId,
  primaryKey,
  filterIds,
  TableName
}) {
  const filteredValues = {};
  for (let index in filterIds) {
    let key = `:item${index}`;
    let value = filterIds[index];
    filteredValues[key] = value;
  }

  const items = [];
  for (let id of ids) {
    const params = {
      TableName,
      KeyConditionExpression: '#key = :id and #timestamp > :lastSync',
      FilterExpression: `(NOT (#author = :author)) and (NOT (#filter IN (${Object.keys(filteredValues)})))`,
      ExpressionAttributeValues: {
        ':id': id,
        ':lastSync': lastSync,
        ':author': userId,
        ...filteredValues
      },
      ExpressionAttributeNames: {
        '#key': primaryKey,
        '#timestamp': 'timestamp',
        '#author': 'eventAuthorId',
        '#filter': 'eventScheduleId'
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
