const { unique } = require('./utils');

const USER_TABLE_NAME = process.env.USER_TABLE_NAME;
const EVENT_TABLE_NAME = process.env.EVENT_TABLE_NAME;

async function processUpdates({ bookmarksUpdates, getItemById }) {
  let allNotifications = [];
  for (let user of bookmarksUpdates) {
    const { items } = user;
    const bookmarks = items;
    const notifications = await parseNotifications(bookmarks, getItemById);
    allNotifications =  [...allNotifications, ...notifications];
  }
  return allNotifications; 
}

async function parseNotifications(deltas, getItem) {
  let notifications = [];
  if (deltas.length) {
  }
  return notifications;
}

module.exports = processUpdates;