const AWS = require("aws-sdk");
const sendMessage = require('./push');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userPrefTableName = process.env.USER_PREF_TABLE_NAME;
const followTableName = process.env.FOLLOW_TABLE_NAME;
const gsiFollowers = process.env.GSI_FOLLOWERS;
const gsiFollowersKey = process.env.GSI_FOLLOWERS_KEY;
const BATCH_SIZE = Number(process.env.BATCH_SIZE);
const EVENT_TABLE_NAME = process.env.EVENT_TABLE_NAME;
const USER_TABLE_NAME = process.env.USER_TABLE_NAME;

console.log('Loading function');

exports.handler = async (event, context) => {
	const { Records } = event;

	for (let i = 0; i < Records.length; i++) {
    try {
      await processRecord(Records[i]);
    } catch(error) {
      console.log(error);
    }
	}
	return `Successfully processed ${event.Records.length} records.`;
};

async function processRecord(record) {
  const {
    Keys,
    NewImage,
    OldImage
  } = record.dynamodb;
  const keys = unmarshall(Keys);
  const newImage = unmarshall(NewImage);
  const oldImage = unmarshall(OldImage);
  const eventObject = newImage.__typename ? newImage : oldImage;
  const eventName = record.eventName;
  if (eventName === 'INSERT' || eventName === 'MODIFY') {
    const Item = {
      id: keys.id,
      eventName,
      oldImage: oldImage.__typename && oldImage,
      newImage: newImage.__typename && newImage,
    };
    const person = await getItem({
      id: eventObject.commentAuthorId,
      TableName: USER_TABLE_NAME
    });
    const event = await getItem({
      id: eventObject.commentEventId,
      TableName: EVENT_TABLE_NAME
    });
    const admin = await getItem({
      id: event.Item.eventAuthorId,
      TableName: userPrefTableName
    });
    
    const adminToken = event.Item.eventAuthorId === Item.newImage.commentAuthorId ? undefined : admin.Item.userId;
    
    if (person.Item && event.Item) {
      const notification = formatNotification(Item, person.Item, event.Item);
      if (notification) {
        await sendPushNotification({
          notification,
          eventScheduleId: event.Item.eventScheduleId,
          event: event.Item,
          comment: newImage,
          adminToken
        });
      }    
    }
  }
}

async function sendPushNotification({ notification, eventScheduleId, event, comment, adminToken }) {
	const followersIds = await getScheduleFollowersId(eventScheduleId);
	if (followersIds.length) {
		const users = await getUsers(followersIds);
		if (users.length) {
			const playerIds = getPlayerIds(users, event, comment, adminToken);
			await sendMessage(notification, playerIds);
		}
	}
}

function getPlayerIds(users, event, comment, adminToken) {
	// const initialValue = ["a828747f-f24c-4c03-a7c8-9efca9562c0b"];
	const initialValue = [];
	if (adminToken) initialValue.push(adminToken);
	
	return users.reduce((accumulator, currentValue) => {
		const {
		  id,
      userId,
      disablePush,
      disableComments
    } = currentValue;

    const shouldAdd = !(disablePush || disableComments);
    const isAuthor = id === comment.commentAuthorId;
    const hasReceiver = comment.commentAtId;
    const foundReceiver = comment.commentAtId === id;
    const shouldProceed = (userId && shouldAdd && !isAuthor);
    
    if (hasReceiver && foundReceiver && shouldProceed) {
      accumulator.push(userId);
    } else if (!hasReceiver && shouldProceed) {
      accumulator.push(userId);   
		}
		return accumulator;
	}, initialValue);
}

async function getUsers(ids) {
  let users = [];
  const Keys = ids.map(id => ({ id }));
  for (let i = 0; i <= ids.length; i += BATCH_SIZE) {
    const params = {
      RequestItems: {
        [userPrefTableName]: {
          Keys: Keys.slice(i, i + BATCH_SIZE)
        }
      }
    };
    const result = await dynamodb.batchGet(params).promise();
    const { Responses } = result;
    const data = Responses[userPrefTableName];
    if (data) users = users.concat(data);
  }
  return users;
}

async function getScheduleFollowersId(id) {
  const params = {
    TableName: followTableName,
    IndexName: gsiFollowers,
    KeyConditionExpression: 'followScheduleId = :id',
    ExpressionAttributeValues: {
      ':id': id
    }
  };
  const ids = [];
  const result = await dynamodb.query(params).promise();
  const { Items, LastEvaluatedKey } = result;
  Items.forEach((item) => ids.push(item.followUserId));
  
  let ExclusiveStartKey = LastEvaluatedKey;
  while(ExclusiveStartKey) {
    params.ExclusiveStartKey = ExclusiveStartKey;
    const result = await dynamodb.query(params).promise();
    const { Items, LastEvaluatedKey } = result;
    Items.forEach((item) => ids.push(item[gsiFollowersKey]));
    ExclusiveStartKey = LastEvaluatedKey;
  }
  return ids;
}

function unmarshall(object) {
  return AWS.DynamoDB.Converter.unmarshall(object);
}

function formatNotification(item, person, event) {
  const title = `${event.title}: ${person.name}`;
  const { newImage } = item;
	return {
		title,
		message: newImage.content,
    ttl: 30,
    data: {
      type: 'Comment',
      id: event.id
    }
	};
}

async function getItem({ id, TableName }) {
  const params = {
    TableName,
    Key: {
      id
    }
  };
  return await dynamodb.get(params).promise();
}