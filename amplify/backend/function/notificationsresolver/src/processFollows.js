const uuid = require('uuid/v1');
const { uniqueFlat } = require('./utils');

const USER_TABLE_NAME = process.env.USER_TABLE_NAME;
const SCHEDULE_TABLE_NAME = process.env.SCHEDULE_TABLE_NAME;

async function processUpdates({ followersUpdates, getItemById }) {
  let allNotifications = [];
  for (let schedule of followersUpdates) {
    const { items } = schedule;
    const followers = uniqueFlat(items);
    const notifications = await processFollowers(followers, getItemById);
    allNotifications = [...allNotifications, ...notifications];
  }
  return allNotifications; 
}

async function processFollowers(followers, getItem) {
  let notifications = [];
  const count = followers.length;
  if (count) {
    const firstFollower = followers[0];
    const {
      followUserId,
      followScheduleId,
      newImage,
      timestamp
    } = firstFollower;
    const user = await getItem({
      TableName: USER_TABLE_NAME,
      id: followUserId 
    });
    const schedule = await getItem({
      TableName: SCHEDULE_TABLE_NAME,
      id: followScheduleId 
    });
    if (user && schedule) {
      const notification = {
        id: uuid(),
        subject: user.name,
        topic: schedule.name,
        message: parseMessage(count, 'en'),
        type: newImage.__typename,
        timestamp,
        entityId: schedule.id, 
        image: user.avatar,
        extraData: {
          pictureUrl: user.pictureUrl
        }
      };
      notifications.push(notification);
    }
  }
  return notifications;
}

function parseMessage(count, lang) {
  const others = count - 1;
  let message = 'started following';
  if (others > 0) {
    message = `and ${others} other${others > 1 ? 's' : ''} ${message}`;
  }
  return message;
}

module.exports = processUpdates;