const uuid = require('uuid/v1');
const I18n = require('./i18n');
const { uniqueFlat } = require('./utils');

const USER_TABLE_NAME = process.env.USER_TABLE_NAME;
const EVENT_TABLE_NAME = process.env.EVENT_TABLE_NAME;

async function processUpdates({ bookmarksUpdates, getItemById, language }) {
  let allNotifications = [];
  for (let schedule of bookmarksUpdates) {
    const { items } = schedule;
    const bookmarks = uniqueFlat(items);
    const notifications = await processBookmarks(bookmarks, getItemById, language);
    allNotifications = [...allNotifications, ...notifications];
  }
  return allNotifications; 
}

async function processBookmarks(bookmarks, getItem, language) {
  let notifications = [];
  const count = bookmarks.length;
  if (count) {
    const firstBookmark = bookmarks[0];
    const {
      bookmarkUserId,
      bookmarkEventId,
      newImage,
      timestamp
    } = firstBookmark;
    const user = await getItem({
      TableName: USER_TABLE_NAME,
      id: bookmarkUserId
    });
    const event = await getItem({
      TableName: EVENT_TABLE_NAME,
      id: bookmarkEventId
    });
    if (user && event) {
      const notification = {
        id: uuid(),
        subject: user.name,
        topic: event.title,
        message: I18n.get('EVENT_bookmarked', language)(count),
        type: newImage.__typename,
        timestamp,
        entityId: event.id, 
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