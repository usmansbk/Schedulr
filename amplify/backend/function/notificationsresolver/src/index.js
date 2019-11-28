/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk');

const processFollows = require('./processFollows');
const processBookmarks = require('./processBookmarks');
const processComments = require('./processComments');
const processEvents = require('./processEvents');
const processSchedules = require('./processSchedules');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const FOLLOW_TABLE_NAME = process.env.FOLLOW_TABLE_NAME;
const SCHEDULE_TABLE_NAME = process.env.SCHEDULE_TABLE_NAME;
const EVENT_DELTA_TABLE_NAME = process.env.EVENT_DELTA_TABLE_NAME;
const BOOKMARK_TABLE_NAME = process.env.BOOKMARK_TABLE_NAME;
const SCHEDULE_DELTA_TABLE_NAME = process.env.SCHEDULE_DELTA_TABLE_NAME;
const FOLLOW_DELTA_TABLE_NAME = process.env.FOLLOW_DELTA_TABLE_NAME;
const BOOKMARK_DELTA_TABLE_NAME = process.env.BOOKMARK_DELTA_TABLE_NAME;
const COMMENT_DELTA_TABLE_NAME = process.env.COMMENT_DELTA_TABLE_NAME;

const gsiFollowingScheduleEvents = process.env.GSI_FOLLOWING_SCHEDULE_EVENTS;
const gsiFollowingScheduleEventsKey = process.env.GSI_FOLLOWING_SCHEDULE_EVENTS_KEY;
const gsiUserSchedules = process.env.GSI_USER_SCHEDULES;
const gsiUserSchedulesKey = process.env.GSI_USER_SCHEDULES_KEY;
const gsiFollowings = process.env.GSI_FOLLOWINGS;
const gsiFollowingsKey = process.env.GSI_FOLLOWINGS_KEY;
const gsiNewFollowers = process.env.GSI_NEW_FOLLOWERS;
const gsiNewFollowersKey = process.env.GSI_NEW_FOLLOWERS_KEY;
const gsiEventBookmarks = process.env.GSI_EVENT_BOOKMARKS;
const gsiEventBookmarksKey = process.env.GSI_EVENT_BOOKMARKS_KEY;
const gsiScheduleComments = process.env.GSI_SCHEDULE_COMMENTS;
const gsiScheduleCommentsKey = process.env.GSI_SCHEDULE_COMMENTS_KEY;
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
  // ============================================================================================

  // Get following schedules events updates
  const followingScheduleEventsUpdates = await queryIndexByIds({
    ids:followingIds,
    lastSync,
    primaryKey: gsiFollowingScheduleEventsKey,
    TableName: EVENT_DELTA_TABLE_NAME,
    IndexName: gsiFollowingScheduleEvents
  });
  console.log('following schedule Event updates', JSON.stringify(followingScheduleEventsUpdates));
  // ============================================================================================
  
  // Get following schedules updates
  const followingSchedulesUpdates = await queryTableByIds({
    ids: followingIds,
    lastSync,
    primaryKey: 'id',
    TableName: SCHEDULE_DELTA_TABLE_NAME
  });
  console.log('following schedules updates', JSON.stringify(followingSchedulesUpdates));
  // ============================================================================================
  
  // Get new followers updates
  const followersUpdates = await queryIndexByIds({
    ids: createdIds,
    lastSync,
    primaryKey: gsiNewFollowersKey,
    TableName: FOLLOW_DELTA_TABLE_NAME,
    IndexName: gsiNewFollowers 
  });
  console.log('new followers updates', JSON.stringify(followersUpdates));
  // ============================================================================================

  // Get new bookmarks updates
  const bookmarksUpdates = await queryIndexByIds({
    ids: [id],
    lastSync,
    primaryKey: gsiEventBookmarksKey,
    TableName: BOOKMARK_DELTA_TABLE_NAME,
    IndexName: gsiEventBookmarks
  });
  console.log('new bookmarks updates', JSON.stringify(bookmarksUpdates));
  // ============================================================================================

  // Get created schedules new comments
  const createdSchedulesComments = await queryIndexByIds({
    ids: createdIds,
    lastSync,
    primaryKey: gsiScheduleCommentsKey,
    TableName: COMMENT_DELTA_TABLE_NAME,
    IndexName: gsiScheduleComments,
    FilterExpression: 'NOT (#author = :author)',
    expNames: {
      '#author': 'commentAuthorId'
    },
    expValues: {
      ':author': id
    }
  });
  console.log('created schedules comments', JSON.stringify(createdSchedulesComments));
  // ============================================================================================

  const followingSchedulesComments = await queryIndexByIds({
    ids: followingIds,
    lastSync,
    primaryKey: gsiScheduleCommentsKey,
    TableName: COMMENT_DELTA_TABLE_NAME,
    IndexName: gsiScheduleComments,
    FilterExpression: 'NOT (#author = :author)',
    expNames: {
      '#author': 'commentAuthorId'
    },
    expValues: {
      ':author': id
    }
  });
  console.log('following schedules comments', JSON.stringify(followingSchedulesComments));
  // ============================================================================================

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
  const bookmarkedEventsUpdates = await queryTableByIds({
    ids: bookmarksIds,
    lastSync,
    primaryKey: 'id',
    TableName: EVENT_DELTA_TABLE_NAME,
    FilterExpression,
    expNames,
    expValues
  });
  console.log('bookmarked events updates', JSON.stringify(bookmarkedEventsUpdates));
  // ============================================================================================

  const followingScheduleEventsNotifications = processEvents({
    followingScheduleEventsUpdates,
    bookmarkedEventsUpdates
  });
  const followingScheduleNotifications = processSchedules({
    followingSchedulesUpdates
  });
  const newCommentNotifications = processComments({
    followingSchedulesComments,
    createdSchedulesComments
  });
  const newFollowerNotifications = processFollows({
    followersUpdates
  });
  const newBookmarkNotifications = processBookmarks({
    bookmarksUpdates
  });
  
  return [
    ...followingScheduleEventsNotifications,
    ...followingScheduleNotifications,
    ...newCommentNotifications,
    ...newBookmarkNotifications,
    ...newFollowerNotifications
  ];
};

async function getItemById({
  id,
  TableName,
}) {
  const params = {
    TableName,
    Key: {
      id
    }
  }
  try {
    const { Item } = await dynamodb.get(params).promise();
    return Item;
  } catch (error) {
    console.error(error);
    return null;
  }
}


async function queryTableByIds({
  ids,
  lastSync,
  TableName,
  primaryKey,
  FilterExpression,
  expNames={},
  expValues={}
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
  FilterExpression,
  expNames={},
  expValues={}
}) {
  const items = [];
  for (let id of ids) {
    const params = {
      TableName,
      IndexName,
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
