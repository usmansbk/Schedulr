const uuid = require('uuid/v1');
const I18n = require('./i18n');
const { uniqueFlat } = require('./utils');

const USER_TABLE_NAME = process.env.USER_TABLE_NAME;
const SCHEDULE_TABLE_NAME = process.env.SCHEDULE_TABLE_NAME;

async function processUpdates({ followersUpdates, getItemById, language }) {
  let allNotifications = [];
  for (let schedule of followersUpdates) {
    const { items } = schedule;
    const followers = uniqueFlat(items);
    const notifications = await processFollowers(followers, getItemById, language);
    allNotifications = [...allNotifications, ...notifications];
  }
  return allNotifications; 
}

async function processFollowers(followers, getItem, language) {
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
        message: I18n.get('FOLLOW_new', language)(count),
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

module.exports = processUpdates;