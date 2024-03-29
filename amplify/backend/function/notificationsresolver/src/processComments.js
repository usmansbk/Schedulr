const uuid = require('uuid/v1');
const I18n = require('./i18n');
const { groupCommentsByEvent } = require('./utils');

const EVENT_TABLE_NAME = process.env.EVENT_TABLE_NAME;
const USER_TABLE_NAME = process.env.USER_TABLE_NAME;


async function processUpdates({
  followingSchedulesComments,
  createdSchedulesComments,
  currentUserId,
  getItemById,
  language
}) {
  const set = ([...followingSchedulesComments, ...createdSchedulesComments]);
  let allNotifications = [];
  for (let schedule of set) {
    const { items } = schedule;
    const notifications = await processComments({items, currentUserId, getItemById, language });
    allNotifications = [...allNotifications, ...notifications];
  }
  return allNotifications;
}

async function processComments({ items, currentUserId, getItemById, language }) {
  let allNotifications = [];
  const commentsByEvent = groupCommentsByEvent({ comments: items });
  for (let event of commentsByEvent) {
    const { items } = event;
    const notifications = await processNotification({ items, currentUserId, getItemById, language });
    allNotifications = [...allNotifications, ...notifications];
  }
  return allNotifications;
}

async function processNotification({ items, currentUserId, getItemById, language }) {
  const notifications = [];
  const uniqAuthorIds = Array.from(new Set(items.map(item => item.commentAuthorId)));
  const uniqItems = uniqAuthorIds.map(id => {
    const item = items.find(elem => elem.commentAuthorId === id);
    return item;
  });
  if (uniqItems.length) {
    const replies = uniqItems.filter(item => item.commentAtId === currentUserId);
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

      if (author && event) {
        const notification = {
          id: uuid(),
          type: __typename,
          subject: author.name,
          message: I18n.get('COMMENT_reply', language)(others),
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

    const newComments = uniqItems.filter(item => item.commentAtId !== currentUserId);
    if (newComments.length) {
      const firstComment = newComments[0];
      const { timestamp, commentAuthorId, commentEventId,newImage: { __typename, content, attachment } } = firstComment;
      const author = await getItemById({ TableName: USER_TABLE_NAME, id: commentAuthorId});
      const event = await getItemById({ TableName: EVENT_TABLE_NAME, id: commentEventId });
      if (author && event) {
        const others = newComments.length - 1;

        let extraContent = content;
        if (attachment && attachment.length) {
          const { type } = attachment[0];
          extraContent = `[${type.slice(0, type.indexOf('/'))}]`;
        }
        const notification = {
          id: uuid(),
          type: __typename,
          subject: author.name,
          message: I18n.get('COMMENT_new', language)(others),
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
