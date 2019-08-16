import gql from 'graphql-tag';
import {
  getScheduleEvents
} from 'api/queries';

const EVENT_TYPE = 'Event';
const SCHEDULE_TYPE = 'Schedule';
const COMMENT_TYPE = 'Comment';
const BOOKMARK_TYPE = 'Bookmark';
const FOLLOW_TYPE = 'Follow';

function updateEvents(cache, event, operationType) {
  const query = gql(getScheduleEvents);
  const id = event.schedule.id;
  const data = cache.readQuery({
    query,
    variables: {
      id
    }
  });
  const { items } = data.getScheduleEvents.events;
  const removeDuplicate = items.filter(item => item.id !== event.id);
  switch(operationType.toLowerCase()) {
    case 'add':
      data.getScheduleEvents.events.items = [...removeDuplicate, event];
      break;
    case 'delete':
      data.getScheduleEvents.events.items = removeDuplicate;
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

function updateSchedules(cache, result, operationType) {

}

function updateComments(cache, result, operationType) {

}

function updateBookmarks(cache, result, operationType) {

}

function updateFollows(cache, result, operationType) {

} 

export default function(cache, result, operationType) {
  switch(result.__typename) {
    case EVENT_TYPE:
      updateEvents(cache, result, operationType);
      break;
    case SCHEDULE_TYPE:
      updateSchedules(cache, result, operationType);
      break;
    case COMMENT_TYPE:
      updateComments(cache, result, operationType);
      break;
    case BOOKMARK_TYPE:
      updateBookmarks(cache, result, operationType);
      break;
    case FOLLOW_TYPE:
      updateFollows(cache, result, operationType);
      break;
  }
}