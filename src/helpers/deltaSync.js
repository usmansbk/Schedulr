export default function updateBaseCache({
  cache,
  result,
  cacheUpdateQuery,
  variables,
  stores
}) {
  console.log(cache);
  console.log('using base query helper', result);
  if (result && result.data) {
    const { data } = result;
    cache.writeQuery({
      query: cacheUpdateQuery,
      variables,
      data
    });
    stores.appState.setSync(false);
  }
}

export function updateDeltaCache({
  cache,
  result,
  cacheUpdateQuery,
  variables,
  stores
}) {
  console.log('using delta query helper');
  console.log('delta', result);
  if (result && result.data) {
    const { data } = result;
    cache.writeQuery({
      query: cacheUpdateQuery,
      variables,
      data
    });
    stores.appState.setSync(false);
  }
}