export default function updateBaseCache({
  cache,
  result,
  cacheUpdateQuery,
  variables,
}) {
  console.log('using base query helper');
  if (result && result.data) {
    const { data } = result;
    cache.writeQuery({
      query: cacheUpdateQuery,
      variables,
      data
    });
  }
}

export function updateDeltaCache({
  cache,
  result,
  cacheUpdateQuery,
  variables,
}) {
  if (result && result.data) {
    const { data } = result;
    cache.writeQuery({
      query: cacheUpdateQuery,
      variables,
      data
    });
  }
}