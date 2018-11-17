import eventQueries from './event';
import groupQueries from './group';
import searchQueries from './search';

export default {
  ...eventQueries,
  ...groupQueries,
  ...searchQueries
}