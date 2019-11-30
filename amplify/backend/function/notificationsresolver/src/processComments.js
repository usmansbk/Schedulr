const uuid = require('uuid/v1');
const { groupCommentsByEvent } = require('./utils');

const EVENT_TABLE_NAME = process.env.EVENT_TABLE_NAME;
const USER_TABLE_NAME = process.env.USER_TABLE_NAME;


async function processUpdates({
  followingSchedulesComments,
  createdSchedulesComments,
  currentUserId,
  getItemById
}) {
  const set = ([...followingSchedulesComments, ...createdSchedulesComments]);
  let allNotifications = [];
  for (let schedule of set) {
    const { items } = schedule;
    const notifications = await processComments({items, currentUserId, getItemById });
    allNotifications = [...allNotifications, ...notifications];
  }
  return allNotifications;
}

async function processComments({ items, currentUserId, getItemById }) {
  let allNotifications = [];
  const commentsByEvent = groupCommentsByEvent({ comments: items });
  for (let event of commentsByEvent) {
    const { items } = event;
    const notification = await processNotification({ items, currentUserId, getItemById });
    if (notification) allNotifications.push(notification);
  }
  return allNotifications;
}

async function processNotification({ items, currentUserId, getItemById }) {
  let notification = null;
  if (items.length) {
    const at = items.find(item => item.commentAtId === currentUserId);
    if (at) {
      const { timestamp, commentAuthorId, commentEventId, newImage: { __typename, content } } = at;
      const author = await getItemById({ TableName: USER_TABLE_NAME, id: commentAuthorId});
      const event = await getItemById({ TableName: EVENT_TABLE_NAME, id: commentEventId });
      if (author && event) {
        notification = {
          id: uuid(),
          type: __typename,
          subject: author.name,
          message: 'replied to your comment on',
          topic: event.title,
          timestamp,
          image: author.avatar,
          entityId: commentEventId,
          extraData: {
            pictureUrl: author.pictureUrl,
            content
          }
        };
      }
    } else {
      const firstComment = items[0];
      const { timestamp, commentAuthorId, commentEventId,newImage: { __typename, content } } = firstComment;
      const author = await getItemById({ TableName: USER_TABLE_NAME, id: commentAuthorId});
      const event = await getItemById({ TableName: EVENT_TABLE_NAME, id: commentEventId });
      if (author && event) {
        const others = items.length - 1;
        let message = 'commented on';
        if (others > 0) {
          message = `and ${others} other${others > 1 ? 's' : ''} ${message}`;
        }
        notification = {
          id: uuid(),
          type: __typename,
          subject: author.name,
          message,
          topic: event.title,
          timestamp,
          image: author.avatar,
          entityId: commentEventId,
          extraData: {
            pictureUrl: author.pictureUrl,
            content
          }
        };
      }

    }
  }
  return notification;
}


module.exports = processUpdates;
