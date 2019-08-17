import gql from 'graphql-tag';
import {
  getScheduleEvents,
  getUserData,
  getEventComments
} from 'api/queries';
import stores from 'stores';

const EVENT_TYPE = 'Event';
const SCHEDULE_TYPE = 'Schedule';
const COMMENT_TYPE = 'Comment';
const BOOKMARK_TYPE = 'Bookmark';
const FOLLOW_TYPE = 'Follow';

function updateData({
  cache,
  cacheUpdateQuery,
  idField,
  rootField,
  updatedItem,
  operationType,
  id
}) {
  if (!updatedItem) return;
  console.log(updatedItem);
  const query = gql(cacheUpdateQuery);
  const data = cache.readQuery({ query, variables: { id } });
  const { items } = data[rootField][idField];
  const removeDuplicate = items.filter(item => item.id !== updatedItem.id);
  let newItems;
  if (operationType === 'ADD') {
    newItems = [...removeDuplicate, updatedItem];
  } else {
    newItems = removeDuplicate;
  }
  const newData = Object.assign({}, data, {
    [rootField]: Object.assign({}, data[rootField], {
      [idField]: Object.assign({}, data[rootField][idField], {
        items: newItems
      })
    })
  });
  cache.writeQuery({ query, variables: { id }, data: newData });
}

export default function(cache, result, operationType) {
  switch(result.__typename) {
    case EVENT_TYPE:
      updateData({
        cache,
        operationType,
        updatedItem: result,
        idField: 'events',
        rootField: 'getScheduleEvents',
        id: result.schedule.id,
        cacheUpdateQuery: getScheduleEvents
      });
      break;
    case SCHEDULE_TYPE:
      updateData({
        cache,
        operationType,
        updatedItem: result,
        rootField: 'getUserData',
        idField: 'created',
        id: stores.appState.userId,
        cacheUpdateQuery: getUserData
      });
      break;
    case BOOKMARK_TYPE:
      updateData({
        cache,
        operationType,
        updatedItem: result,
        rootField: 'getUserData',
        idField: 'bookmarks',
        id: stores.appState.userId,
        cacheUpdateQuery: getUserData
      });
      break;
    case COMMENT_TYPE:
      updateData({
        cache,
        operationType,
        updatedItem: result,
        rootField: 'getEventComments',
        idField: 'comments',
        id: result.event.id,
        cacheUpdateQuery: getEventComments
      });
      break;
    case FOLLOW_TYPE:
      updateData({
        cache,
        operationType,
        updatedItem: result,
        rootField: 'getUserData',
        idField: 'following',
        id: stores.appState.userId,
        cacheUpdateQuery: getUserData
      });
      break;
  }
}