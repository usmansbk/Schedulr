const uuid = require('uuid/v1');

const USER_TABLE_NAME = process.env.USER_TABLE_NAME;

const CLOSED = 'CLOSED';

async function processUpdates({ followingSchedulesUpdates, getItemById }) {
  let allNotifications = [];
  for (let schedule of followingSchedulesUpdates) {
    const { items } = schedule;
    const notifications = await processChanges(items, getItemById);
    allNotifications = [...allNotifications, ...notifications];
  }
  return allNotifications; 
}

async function processChanges(changes, getItemById) {
  let notifications = [];
  const count = changes.length;
  if (count) {
    const oldest = changes[0];
    const latest = changes[count - 1];
    const { oldImage } = oldest;
    const { newImage, timestamp } = latest;
    if (oldImage.__typename && newImage.__typename) {
      const diffs = await processDifference({ oldImage, newImage, timestamp, getItemById });
      notifications = [...notifications, ...diffs];
    }
  }
  return notifications;
}

async function processDifference({ oldImage, newImage, getItemById, timestamp }) {
  let diffs = [];
  if (oldImage.name !== newImage.name) {
    const notification = {
      id: uuid(),
      subject: oldImage.name,
      message: 'was renamed as',
      topic: newImage.name,
      entityId: newImage.id,
      type: newImage.__typename,
      timestamp,
      image: newImage.picture
    };
    diffs.push(notification);
  }
  if (oldImage.status !== newImage.status) {
    const { scheduleAuthorId } = newImage;
    const user = await getItemById({
      id: scheduleAuthorId,
      TableName: USER_TABLE_NAME 
    });
    if (user) {
      const notification = {
        id: uuid(),
        subject: user.name,
        message: newImage.status === CLOSED ? 'archived' : 'unarchived',
        topic: newImage.name,
        entityId: newImage.id,
        type: newImage.__typename,
        timestamp,
        image: user.avatar,
        extraData: {
          pictureUrl: user.pictureUrl
        }
      };
      diffs.push(notification);
    }
  }
  return diffs;
}

module.exports = processUpdates;