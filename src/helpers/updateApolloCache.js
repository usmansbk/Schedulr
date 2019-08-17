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
  const query = gql(cacheUpdateQuery);
  const data = cache.readQuery({
    query,
    variables: {
      id
    }
  });
  const { items } = data[rootField][idField];
  const removeDuplicate = items.filter(item => item.id !== updatedItem.id);
  switch (operationType) {
    case 'ADD':
      data[rootField][idField].items = [...removeDuplicate, updatedItem];
      break;
    case 'DELETE':
      data[rootField][idField].items = removeDuplicate;
      break;
  }
  cache.writeQuery({
    query,
    variables: {
      id
    },
    data
  });
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