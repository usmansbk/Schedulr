import moment from 'moment';
const DEFAULT_UPPER_BOUND_TIME_MS = 2000;

export default function updateBaseCache({
  prev,
  result,
  stores,
  lastSyncTimestamp,
}) {
  if (!result) return prev;
  console.log('update base query helper');
  console.log(prev, result);

  // if (result && result.data) {
  //   const { data } = result;
  //   cache.writeQuery({
  //     query: cacheUpdateQuery,
  //     data
  //   });
  // }
  
  const timestamp = moment.now() - DEFAULT_UPPER_BOUND_TIME_MS;
  console.log(timestamp);
  stores.appState.setLastSyncTimestamp(timestamp)
}
