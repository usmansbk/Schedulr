const uuid = require('uuid/v1');
const moment = require('moment');
const { transformFollowing } = require('./utils');

const USER_TABLE_NAME = process.env.USER_TABLE_NAME;
const DELETE = 'DELETE';

async function processUpdates({
  followingScheduleEventsUpdates,
  bookmarkedEventsUpdates,
  getItemById
}) {
  let allNotifications = [];
  const followingEvents = transformFollowing(followingScheduleEventsUpdates);
  const allUpdates = [...followingEvents, ...bookmarkedEventsUpdates];
  for (let update of allUpdates) {
    notifications = await processChanges(update, getItemById);
    allNotifications = [...allNotifications, ...notifications];
  }
  return allNotifications;
}

async function processChanges(update, getItem) {
  let notifications = [];
  const { items } = update;
  const count = items.length;
  if (count) {
    const oldest = items[0];
    const latest = items[count - 1];
    const diffs = await processDifference({ oldest, latest, getItem });
    notifications = [...notifications, ...diffs];
  }
  return notifications;
}

async function processDifference({ oldest, latest, getItem }) {
  let diffs = [];
  const { oldImage } = oldest;
  const { newImage, timestamp, eventAuthorId, aws_ds, id } = latest;
  if (aws_ds !== DELETE) {
    if (!(oldImage && oldImage.__typename)) {
      const notification = {
        id: uuid(),
        type: newImage.__typename,
        subject: newImage.title,
        message: 'was scheduled for',
        topic: moment(newImage.startAt).add(1, 'hour').calendar(),
        image: newImage.banner,
        timestamp,
        entityId: id,
      };
      diffs.push(notification);
    } else {
      if (newImage.isCancelled) {
        const user = await getItem({
          TableName: USER_TABLE_NAME,
          id: eventAuthorId
        });
        if (user) {
          const notification = {
            id: uuid(),
            type: newImage.__typename,
            subject: user.name,
            message: 'cancelled',
            topic: newImage.title,
            image: user.avatar,
            timestamp,
            entityId: id,
            extraData: {
              pictureUrl: user.pictureUrl
            }
          };
          diffs.push(notification);
        }
      } else {
        if (oldImage.startAt !== newImage.startAt) {
          const notification = {
            id: uuid(),
            type: newImage.__typename,
            subject: newImage.title,
            message: 'was rescheduled for',
            topic: moment(newImage.startAt).add(1, 'hour').calendar(),
            image: newImage.banner,
            timestamp,
            entityId: id,
          };
          diffs.push(notification);
        }
        if ((oldImage.venue !== newImage.venue) && newImage.venue) {
          const notification = {
            id: uuid(),
            type: newImage.__typename,
            subject: newImage.title,
            message: 'venue changed to',
            topic: newImage.venue,
            image: newImage.banner,
            timestamp,
            entityId: id,
          };
          diffs.push(notification);
        }
        if ((oldImage.title !== newImage.title) && newImage.title) {
          const notification = {
            id: uuid(),
            type: newImage.__typename,
            subject: oldImage.title,
            message: 'was renamed as',
            topic: newImage.title,
            image: newImage.banner,
            timestamp,
            entityId: id,
          };
          diffs.push(notification);
        }
        const oldCancelledDates = oldImage.cancelledDates || [];
        const newCancelledDates = newImage.cancelledDates || [];
        if (newCancelledDates.length !== oldCancelledDates.length) {
          const cancelledDate = newCancelledDates.find(date => !oldCancelledDates.includes(date));
          const user = await getItem({
            TableName: USER_TABLE_NAME,
            id: eventAuthorId
          });
          if (user) {
            const category = newImage.category ? newImage.category.toLowerCase() : 'event';
            const article = ['a','e','i','o','u'].includes(category[0]) ? 'an' : 'a';
            const notification = {
              id: uuid(),
              type: newImage.__typename,
              subject: user.name,
              message: `cancelled ${article} ${category} scheduled for`,
              topic: moment(cancelledDate).add(1, 'hour').calendar(),
              image: user.avatar,
              timestamp,
              entityId: id,
              extraData: {
                pictureUrl: user.pictureUrl,
                ref: cancelledDate
              }
            };
            diffs.push(notification);
          }
        }
        if (newImage.category && (newImage.category !== oldImage.category)) {
          const notification = {
            id: uuid(),
            type: newImage.__typename,
            subject: newImage.title,
            message: `changed to`,
            topic: newImage.category,
            image: newImage.banner,
            timestamp,
            entityId: id,
          };
          diffs.push(notification);
        }
      }
    }
  }
  return diffs;
}

module.exports = processUpdates;
