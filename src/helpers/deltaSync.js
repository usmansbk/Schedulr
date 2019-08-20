import moment from 'moment';
const BUFFER_MILLISECONDS = 2000;

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
  
  const timestamp = moment.now() - BUFFER_MILLISECONDS;
  stores.appState.updateLastSyncTimestamp(timestamp);
}
