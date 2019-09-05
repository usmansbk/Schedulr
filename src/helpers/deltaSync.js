export default function updateBaseCache({
  prev,
  fetchMoreResult,
  stores,
}) {
	console.log(fetchMoreResult);
	if (!fetchMoreResult) return prev;
	stores.appState.updateLastSyncTimestamp();
	if (!fetchMoreResult) return prev;
	return prev;
}

