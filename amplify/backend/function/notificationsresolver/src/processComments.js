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
    const notifications = await processNotification({ items, currentUserId, getItemById });
    allNotifications = [...allNotifications, ...notifications];
  }
  return allNotifications;
}

async function processNotification({ items, currentUserId, getItemById }) {
  const notifications = [];
  if (items.length) {
    const replies = items.filter(item => item.commentAtId === currentUserId);
    if (replies.length) {
      const at = replies[0];
      const { timestamp, commentAuthorId, commentEventId, newImage: { __typename, content, attachment } } = at;
      const author = await getItemById({ TableName: USER_TABLE_NAME, id: commentAuthorId});
      const event = await getItemById({ TableName: EVENT_TABLE_NAME, id: commentEventId });

      let extraContent = content;
      if (attachment && attachment.length) {
        const { type } = attachment[0];
        extraContent = `[${type.slice(0, type.indexOf('/'))}]`;
      }
      const others = replies.length - 1;
      let message = 'replied to your comment on';
      if (others > 0) {
        message = `and ${others} other${others > 1 ? 's' : ''} ${message}`;
      }
      if (author && event) {
        const notification = {
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
            content: content || extraContent
          }
        };
        notifications.push(notification);
      }
    }

    const newComments = items.filter(item => item.commentAtId !== currentUserId);
    if (newComments.length) {
      const firstComment = newComments[0];
      const { timestamp, commentAuthorId, commentEventId,newImage: { __typename, content, attachment } } = firstComment;
      const author = await getItemById({ TableName: USER_TABLE_NAME, id: commentAuthorId});
      const event = await getItemById({ TableName: EVENT_TABLE_NAME, id: commentEventId });
      if (author && event) {
        const others = newComments.length - 1;
        let message = 'commented on';
        if (others > 0) {
          message = `and ${others} other${others > 1 ? 's' : ''} ${message}`;
        }
        let extraContent = content;
        if (attachment && attachment.length) {
          const { type } = attachment[0];
          extraContent = `[${type.slice(0, type.indexOf('/'))}]`;
        }
        const notification = {
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
            content: content || extraContent
          }
        };
        notifications.push(notification);
      }
    }
  }
  return notifications;
}


module.exports = processUpdates;
