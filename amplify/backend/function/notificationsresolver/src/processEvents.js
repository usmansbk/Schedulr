const uuid = require('uuid/v1');
const I18n = require('./i18n');
const { transformFollowing, formatDate } = require('./utils');

const USER_TABLE_NAME = process.env.USER_TABLE_NAME;
const DELETE = 'DELETE';

async function processUpdates({
  followingScheduleEventsUpdates,
  bookmarkedEventsUpdates,
  getItemById,
  language
}) {
  let allNotifications = [];
  const followingEvents = transformFollowing(followingScheduleEventsUpdates);
  const allUpdates = [...followingEvents, ...bookmarkedEventsUpdates];
  for (let update of allUpdates) {
    notifications = await processChanges(update, getItemById, language);
    allNotifications = [...allNotifications, ...notifications];
  }
  return allNotifications;
}

async function processChanges(update, getItem, language) {
  let notifications = [];
  const { items } = update;
  const count = items.length;
  if (count) {
    const oldest = items[0];
    const latest = items[count - 1];
    const diffs = await processDifference({ oldest, latest, getItem, language });
    notifications = [...notifications, ...diffs];
  }
  return notifications;
}

async function processDifference({ oldest, latest, getItem, language }) {
  let diffs = [];
  const { oldImage } = oldest;
  const { newImage, timestamp, eventAuthorId, aws_ds, id } = latest;
  if (aws_ds !== DELETE) {
    if (!(oldImage && oldImage.__typename)) {
      const notification = {
        id: uuid(),
        type: newImage.__typename,
        subject: newImage.title,
        message: I18n.get('EVENT_scheduled', language),
        topic: formatDate(newImage.startAt, language),
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
            message: I18n.get('EVENT_cancelled', language),
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
            message: I18n.get('EVENT_rescheduled', language),
            topic: formatDate(newImage.startAt, language),
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
            message: I18n.get('EVENT_venueChanged', language),
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
            message: I18n.get('EVENT_renamed', language),
            topic: newImage.title,
            image: newImage.banner,
            timestamp,
            entityId: id,
          };
          diffs.push(notification);
        }

        const oldAlbum = oldImage.album || [];
        const newAlbum = newImage.album || [];
        if (newAlbum.length > oldAlbum.length) {
          const user = await getItem({
            TableName: USER_TABLE_NAME,
            id: eventAuthorId
          });
          if (user) {
            const count = newAlbum.length - oldAlbum.length;

            const notification = {
              id: uuid(),
              type: newImage.__typename,
              subject: user.name,
              message: I18n.get('EVENT_newPhoto', language)(count),
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
            const notification = {
              id: uuid(),
              type: newImage.__typename,
              subject: user.name,
              message: I18n.get('EVENT_cancelledDate', language)(category),
              topic: formatDate(cancelledDate, language),
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
            message: I18n.get('EVENT_categoryChanged', language),
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
