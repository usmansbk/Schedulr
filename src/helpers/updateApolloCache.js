import gql from 'graphql-tag';
import {
  getScheduleEvents,
  getUserData,
  getEventComments
} from 'api/queries';
import stores from 'stores';
import {
  ADD,
  EVENT_TYPE,
  SCHEDULE_TYPE,
  COMMENT_TYPE,
  BOOKMARK_TYPE,
  FOLLOW_TYPE
} from 'lib/constants';

function updateData({
  cache,
  cacheUpdateQuery,
  connectionField,
  rootField,
  updatedItem,
  operationType,
  id
}) {
  const query = gql(cacheUpdateQuery);
  const data = cache.readQuery({ query, variables: { id } });
  const { items } = data[rootField][connectionField];
  const removeDuplicate = items.filter(item => item.id !== updatedItem.id);
  let newItems;
  if (operationType === ADD) {
    newItems = [...removeDuplicate, updatedItem];
  } else {
    newItems = removeDuplicate;
  }
  const newData = Object.assign({}, data, {
    [rootField]: Object.assign({}, data[rootField], {
      [connectionField]: Object.assign({}, data[rootField][connectionField], {
        items: newItems
      })
    })
  });
  cache.writeQuery({ query, variables: { id }, data: newData });
}

export default function(cache, result, operationType) {
  if (!result) return;
  switch(result.__typename) {
    case EVENT_TYPE:
      updateData({
        cache,
        operationType,
        updatedItem: result,
        connectionField: 'events',
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
        connectionField: 'created',
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
        connectionField: 'bookmarks',
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
        connectionField: 'comments',
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
        connectionField: 'following',
        id: stores.appState.userId,
        cacheUpdateQuery: getUserData
      });
      break;
  }
}